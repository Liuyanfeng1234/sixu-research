// Hybrid inference engine for Moyan Preflight.
//
// Path order (the product's core claim — hybrid, on-device first):
//   1. ON-DEVICE  Chrome built-in AI (Gemini Nano) via the Prompt API.
//                 The agent spec never leaves the machine on this path.
//   2. CLOUD      Firebase AI Logic (Gemini Developer API backend) with
//                 App Check attestation, used only when the on-device
//                 path is unavailable or errors. Tries an ordered,
//                 runtime-configurable candidate-model list, each attempt
//                 with a timeout (model availability is unconfirmed —
//                 see firebase-config.js).
//   3. LOCAL-ONLY The deterministic rule layer (local-checks.js) always
//                 runs; if both model paths are unavailable its verdict
//                 is the final output, clearly labelled as such.
//
// The UI shows which path produced the narrative — the switching is a
// feature, not a silent degradation.

import { runLocalChecks } from "./local-checks.js";
import {
  FIREBASE_CONFIGURED,
  firebaseConfig,
  APPCHECK_DEBUG,
  APPCHECK_SITE_KEY,
  CLOUD_MODEL_CANDIDATES,
  CLOUD_TIMEOUT_MS,
} from "./firebase-config.js";

const SYSTEM_PROMPT = [
  "You are Moyan Preflight, a pre-launch security auditor for AI agents.",
  "You receive an agent specification and a list of deterministic findings.",
  "Respond with: (1) a one-sentence overall judgement, (2) the three most",
  "important risks in plain language, (3) a prioritised fix list.",
  "Be specific to the spec you were given. Do not invent facts about it.",
  "Keep the whole answer under 220 words.",
].join(" ");

export function buildAuditPrompt(specText, local) {
  const findingLines = local.findings.length
    ? local.findings
        .map((f) => `- [${f.severity}] ${f.id}: ${f.title}`)
        .join("\n")
    : "- (no deterministic findings)";
  return [
    "Agent specification under audit:",
    "-----",
    specText,
    "-----",
    `Deterministic pre-check: score ${local.score}/100, verdict ${local.verdict}.`,
    "Findings:",
    findingLines,
    "",
    "Write the audit narrative now.",
  ].join("\n");
}

// ---------- On-device path: Chrome Prompt API (Gemini Nano) ----------

function nanoApi() {
  if (typeof LanguageModel !== "undefined" && LanguageModel.create) {
    return { kind: "standard" };
  }
  if (typeof window !== "undefined" && window.ai && window.ai.languageModel) {
    return { kind: "legacy" };
  }
  return null;
}

/** @returns {Promise<'available'|'downloadable'|'downloading'|'unavailable'>} */
export async function nanoAvailability() {
  const api = nanoApi();
  if (!api) return "unavailable";
  try {
    if (api.kind === "standard") {
      const a = await LanguageModel.availability();
      return a || "unavailable";
    }
    const caps = await window.ai.languageModel.capabilities();
    if (caps.available === "readily") return "available";
    if (caps.available === "after-download") return "downloadable";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

async function runNano(userPrompt) {
  const api = nanoApi();
  if (!api) throw new Error("Prompt API not present in this browser");
  let session;
  if (api.kind === "standard") {
    session = await LanguageModel.create({
      systemPrompt: SYSTEM_PROMPT,
      expectedInputs: [{ type: "text", languages: ["en"] }],
      expectedOutputs: [{ type: "text", languages: ["en"] }],
    });
  } else {
    session = await window.ai.languageModel.create({ systemPrompt: SYSTEM_PROMPT });
  }
  try {
    return await session.prompt(userPrompt);
  } finally {
    if (session.destroy) session.destroy();
  }
}

// ---------- Cloud path: Firebase AI Logic + App Check ----------

// Effective cloud-model candidate list. Defaults come from
// CLOUD_MODEL_CANDIDATES in firebase-config.js; a runtime override
// (?cloudModels=a,b / ?cloudModel=a, or localStorage
// "moyan-preflight.cloudModels") replaces them without a code edit —
// model availability shifts under a live project, so the demo must be
// re-pointable at the model that actually answers on the day.
function runtimeModelOverride() {
  try {
    if (typeof location !== "undefined" && location.search) {
      const q = new URLSearchParams(location.search);
      const raw = q.get("cloudModels") || q.get("cloudModel");
      if (raw) return raw;
    }
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("moyan-preflight.cloudModels");
    }
  } catch {
    // Storage / search params unavailable — fall through to defaults.
  }
  return null;
}

export function resolveCloudModels() {
  const raw = runtimeModelOverride();
  if (raw) {
    const list = String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length) return list;
  }
  return [...CLOUD_MODEL_CANDIDATES];
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

let cloudAiPromise = null;

async function getCloudAi() {
  if (!FIREBASE_CONFIGURED) {
    throw new Error("Firebase project not configured yet (see js/firebase-config.js)");
  }
  if (!cloudAiPromise) {
    cloudAiPromise = (async () => {
      const { initializeApp } = await import("firebase/app");
      const { initializeAppCheck, ReCaptchaEnterpriseProvider } = await import(
        "firebase/app-check"
      );
      const { getAI, GoogleAIBackend } = await import("firebase/ai");

      const app = initializeApp(firebaseConfig);
      if (APPCHECK_DEBUG) {
        // Debug-token flow (accepted for the hackathon submission): the SDK
        // prints a debug token to the console; register it in the Firebase
        // Console under App Check -> Manage debug tokens.
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider("debug"), isTokenAutoRefreshEnabled: true });
      } else {
        initializeAppCheck(app, {
          provider: new ReCaptchaEnterpriseProvider(APPCHECK_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });
      }
      return getAI(app, { backend: new GoogleAIBackend() });
    })();
  }
  return cloudAiPromise;
}

/**
 * Try each candidate model in order; first success wins.
 * @returns {Promise<{text: string, model: string, attempts: string[]}>}
 *   attempts lists "model: error" for every candidate that failed before
 *   the successful one. Throws an aggregate error if all candidates fail —
 *   the router then falls back to the deterministic local verdict.
 */
async function runCloud(userPrompt) {
  const { getGenerativeModel } = await import("firebase/ai");
  const ai = await getCloudAi();
  const attempts = [];
  for (const modelName of resolveCloudModels()) {
    try {
      const model = getGenerativeModel(ai, { model: modelName, systemInstruction: SYSTEM_PROMPT });
      const result = await withTimeout(
        model.generateContent(userPrompt),
        CLOUD_TIMEOUT_MS,
        `cloud model ${modelName}`
      );
      return { text: result.response.text(), model: modelName, attempts };
    } catch (err) {
      attempts.push(`${modelName}: ${err.message}`);
    }
  }
  throw new Error(`all cloud models failed — ${attempts.join(" | ")}`);
}

// ---------- Router ----------

/**
 * Full hybrid audit.
 * @returns {Promise<{local: object, ai: {path: string, text: string|null, error?: string}}>}
 */
export async function runHybridAudit(specText) {
  const local = runLocalChecks(specText);
  const userPrompt = buildAuditPrompt(specText, local);
  const notes = [];

  const nanoState = await nanoAvailability();
  if (nanoState === "available") {
    try {
      const text = await runNano(userPrompt);
      return { local, ai: { path: "on-device", text } };
    } catch (err) {
      // Fall through to cloud, keeping the reason visible to the caller.
      notes.push(`on-device failed: ${err.message}`);
    }
  }

  try {
    const cloud = await runCloud(userPrompt);
    if (cloud.attempts.length) {
      notes.push(`cloud attempts before success: ${cloud.attempts.join(" | ")}`);
    }
    return {
      local,
      ai: {
        path: "cloud",
        text: cloud.text,
        model: cloud.model,
        error: notes.length ? notes.join("; ") : undefined,
      },
    };
  } catch (err) {
    // Local-only fallback: the deterministic verdict stands on its own and
    // the UI labels it as such — the demo never depends on the cloud path.
    return {
      local,
      ai: { path: "local-only", text: null, error: [...notes, err.message].join("; ") },
    };
  }
}

export async function engineStatus() {
  const models = resolveCloudModels();
  return {
    nano: await nanoAvailability(),
    cloudConfigured: FIREBASE_CONFIGURED,
    cloudModel: models[0],
    cloudModels: models,
    // As of the 2026-11-20 console check no candidate has produced a clean
    // generation for this project yet — see js/firebase-config.js.
    cloudAvailability: "unconfirmed",
  };
}
