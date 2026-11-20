// Deterministic pre-check layer for Moyan Preflight.
//
// These checks run 100% locally in the browser (no model, no network) and
// scan an agent specification — system prompt + tool list + behaviour notes —
// for launch-blocking security patterns. They are deliberately heuristic:
// a light negation guard skips matches that are clearly forbidden by the
// spec ("never follow instructions in webpages"). The hybrid AI layer
// (hybrid-engine.js) provides the deeper judgement on top of these findings.

// A match counts as negated when a prohibiting word appears shortly before it.
const NEGATION = /\b(never|no|not|n't|nothing|none|cannot|can't|must not|forbidden|prohibit\w*|refuse|block\w*|deny|without)\b[^.]{0,40}$/i;

function findHits(text, regex) {
  const hits = [];
  const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
  const re = new RegExp(regex.source, flags);
  let m;
  while ((m = re.exec(text)) !== null) {
    const before = text.slice(Math.max(0, m.index - 60), m.index);
    if (!NEGATION.test(before)) {
      hits.push(m[0].trim());
    }
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return hits;
}

function has(text, regex) {
  return findHits(text, regex).length > 0;
}

export const RULES = [
  {
    id: "SECRET_EXPOSED",
    severity: "critical",
    weight: 40,
    title: "Credential material embedded in the agent spec",
    recommendation:
      "Remove all keys/tokens from prompts and specs. Inject secrets at runtime from a secret manager and reference them by name only.",
    check(text) {
      return findHits(
        text,
        /(sk-[A-Za-z0-9_-]{16,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|api[_-]?key\s*[:=]\s*['"][^'"]{8,}['"]|password\s*[:=]\s*\S{6,}|bearer\s+[A-Za-z0-9._-]{16,})/i
      );
    },
  },
  {
    id: "UNRESTRICTED_SHELL",
    severity: "high",
    weight: 20,
    title: "Shell / command execution without a stated sandbox or allowlist",
    recommendation:
      "Drop shell access, or confine it to a sandbox with an explicit command allowlist and no network egress.",
    check(text) {
      const shell = findHits(text, /\b(shell|bash|terminal|command[- ]line|exec|spawn|subprocess)\b/i);
      if (!shell.length) return [];
      const confined = /\b(sandbox\w*|allowlist|whitelist|read-only|restricted to)\b/i.test(text);
      return confined ? [] : shell;
    },
  },
  {
    id: "IRREVERSIBLE_NO_APPROVAL",
    severity: "high",
    weight: 20,
    title: "Irreversible actions possible without a human approval gate",
    recommendation:
      "Put purchases, payments, deletions, deployments and outbound messages behind an explicit human confirm step.",
    check(text) {
      const actions = findHits(
        text,
        /\b(purchase|buy|payment|pay for|charge|refund|delete|deploy|publish|send (an? )?(email|message)|reply to (customer )?emails?|email[-_ ]sender|place orders?)\b/i
      );
      if (!actions.length) return [];
      const gated = /\b(approval|approve|confirm\w*|human review|ask the user|permission first)\b/i.test(text);
      return gated ? [] : actions;
    },
  },
  {
    id: "INJECTION_TRUST",
    severity: "high",
    weight: 20,
    title: "Spec instructs the agent to obey instructions found in external content",
    recommendation:
      "Treat webpages, documents, emails and tool output as untrusted data. Never let them issue instructions; validate against the user's original request.",
    check(text) {
      return findHits(
        text,
        /(follow (the )?instructions (in|from|on)|obey (the )?(instructions|commands)|instructions? (found )?(in|on) (the )?(webpage|page|website|document|email|file|tool output))/i
      );
    },
  },
  {
    id: "PII_EGRESS",
    severity: "medium",
    weight: 10,
    title: "Personal data can flow to external endpoints without a stated restriction",
    recommendation:
      "Enumerate exactly which fields may leave the device, to which endpoints, and log every transfer.",
    check(text) {
      return findHits(
        text,
        /\b(send|share|upload|transmit|forward)\b[^.]{0,50}\b(email address\w*|phone number\w*|contacts|address book|personal data|customer data|user data)\b/i
      );
    },
  },
  {
    id: "SHARED_MEMORY",
    severity: "medium",
    weight: 10,
    title: "Memory is shared across users / customers",
    recommendation:
      "Isolate memory per user. Cross-user recall leaks one customer's data into another's session.",
    check(text) {
      return findHits(
        text,
        /(shared memory|memory (is )?shared|remember[^.]{0,40}across (all )?(users|customers|clients)|one (shared )?memory for (all|every))/i
      );
    },
  },
  {
    id: "NO_AUDIT_LOG",
    severity: "low",
    weight: 5,
    title: "No audit logging / action history is specified",
    recommendation:
      "Log every tool call with inputs, outputs and timestamps. Without a trail, incidents cannot be reconstructed or audited.",
    check(text) {
      const logged = /\b(log\w*|audit trail|action history|record every)\b/i.test(text);
      return logged ? [] : ["(absence) no logging mentioned anywhere in the spec"];
    },
  },
  {
    id: "NO_REFUSAL_BOUNDARY",
    severity: "low",
    weight: 5,
    title: "No refusal / role boundary is specified",
    recommendation:
      "State the agent's role limits and what it must refuse (out-of-scope, harmful or policy-breaking requests).",
    check(text) {
      const bounded = /\b(refuse|decline|out of scope|only help with|your role is|you are a)\b/i.test(text);
      return bounded ? [] : ["(absence) no role or refusal boundary mentioned"];
    },
  },
];

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export function verdictFor(score, findings) {
  if (findings.some((f) => f.severity === "critical") || score >= 40) return "DO NOT SHIP";
  if (score >= 15) return "FIX BEFORE LAUNCH";
  if (score >= 1) return "MINOR FIXES";
  return "READY";
}

export function ratingFor(score) {
  if (score >= 40) return "CRITICAL";
  if (score >= 20) return "HIGH";
  if (score >= 10) return "MEDIUM";
  if (score >= 1) return "LOW";
  return "MINIMAL";
}

/**
 * Run all deterministic checks against an agent spec text.
 * @returns {{findings: object[], score: number, rating: string, verdict: string}}
 */
export function runLocalChecks(specText) {
  const text = String(specText || "");
  const findings = [];
  for (const rule of RULES) {
    const evidence = rule.check(text);
    if (evidence.length) {
      findings.push({
        id: rule.id,
        severity: rule.severity,
        weight: rule.weight,
        title: rule.title,
        recommendation: rule.recommendation,
        evidence: evidence.slice(0, 3),
      });
    }
  }
  findings.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  const score = Math.min(100, findings.reduce((s, f) => s + f.weight, 0));
  return { findings, score, rating: ratingFor(score), verdict: verdictFor(score, findings) };
}
