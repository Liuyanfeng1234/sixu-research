import { SAMPLES } from "./samples.js";
import { runHybridAudit, engineStatus } from "./hybrid-engine.js";

const specInput = document.getElementById("specInput");
const runButton = document.getElementById("runButton");
const resultPanel = document.getElementById("resultPanel");
const verdictCard = document.getElementById("verdictCard");
const verdictLabel = document.getElementById("verdictLabel");
const verdictMeta = document.getElementById("verdictMeta");
const pathValue = document.getElementById("pathValue");
const pathNote = document.getElementById("pathNote");
const findingsEl = document.getElementById("findings");
const narrativeEl = document.getElementById("narrative");
const nanoChip = document.getElementById("nanoChip");
const cloudChip = document.getElementById("cloudChip");
const sampleButtons = document.getElementById("sampleButtons");

for (const sample of SAMPLES) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = sample.name;
  btn.addEventListener("click", () => {
    specInput.value = sample.spec;
    specInput.focus();
  });
  sampleButtons.appendChild(btn);
}

async function refreshStatus() {
  const status = await engineStatus();
  const nanoText = {
    available: "ready",
    downloadable: "model download required",
    downloading: "model downloading…",
    unavailable: "not available in this browser",
  }[status.nano];
  nanoChip.textContent = `On-device (Gemini Nano): ${nanoText}`;
  nanoChip.classList.toggle("on", status.nano === "available");
  // FIX 2026-11-27: the cloud chip now reports the measured probe
  // result from engineStatus() instead of a static "live availability
  // unconfirmed" string that could never clear.
  if (!status.cloudConfigured) {
    cloudChip.textContent =
      "Cloud (Firebase AI Logic): not configured — local paths still work";
    cloudChip.classList.toggle("on", false);
  } else if (status.cloudAvailability === "confirmed") {
    cloudChip.textContent = `Cloud (Firebase AI Logic · ${status.cloudModel}): live — App Check attested`;
    cloudChip.classList.toggle("on", true);
  } else if (status.cloudAvailability === "failed") {
    cloudChip.textContent = `Cloud (Firebase AI Logic · ${status.cloudModel}): check failed — ${status.cloudError || "unknown error"}`;
    cloudChip.classList.toggle("on", false);
  } else {
    cloudChip.textContent = `Cloud (Firebase AI Logic · ${status.cloudModel}): checking…`;
    cloudChip.classList.toggle("on", false);
  }
}
refreshStatus();

function verdictClass(verdict) {
  if (verdict === "DO NOT SHIP") return "bad";
  if (verdict === "FIX BEFORE LAUNCH" || verdict === "MINOR FIXES") return "warn";
  return "ok";
}

function pathLabel(path) {
  return {
    "on-device": "On-device · Gemini Nano (nothing left this browser)",
    cloud: "Cloud · Firebase AI Logic (App Check attested)",
    "local-only": "Local rules only · no model path available",
  }[path];
}

function renderFindings(findings) {
  findingsEl.innerHTML = "";
  if (!findings.length) {
    const p = document.createElement("p");
    p.className = "clean";
    p.textContent = "No deterministic findings. (Heuristic layer — the narrative adds judgement, not certainty.)";
    findingsEl.appendChild(p);
    return;
  }
  for (const f of findings) {
    const div = document.createElement("div");
    div.className = `finding ${f.severity}`;
    const sev = document.createElement("div");
    sev.className = "sev";
    sev.textContent = `${f.severity} · ${f.id}`;
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = f.title;
    const rec = document.createElement("div");
    rec.className = "rec";
    rec.textContent = `Fix: ${f.recommendation}`;
    const ev = document.createElement("div");
    ev.className = "ev";
    ev.textContent = `Evidence: ${f.evidence.join(" | ")}`;
    div.append(sev, title, rec, ev);
    findingsEl.appendChild(div);
  }
}

runButton.addEventListener("click", async () => {
  const spec = specInput.value.trim();
  if (!spec) {
    specInput.focus();
    return;
  }
  runButton.disabled = true;
  runButton.textContent = "Auditing…";
  try {
    const { local, ai } = await runHybridAudit(spec);
    resultPanel.hidden = false;
    verdictCard.className = `verdict-card ${verdictClass(local.verdict)}`;
    verdictLabel.textContent = local.verdict;
    verdictMeta.textContent = `Risk score ${local.score}/100 · rating ${local.rating} · ${local.findings.length} deterministic finding(s)`;
    pathValue.textContent = pathLabel(ai.path);
    pathNote.textContent = [
      ai.model ? `Model: ${ai.model}` : "",
      ai.error ? `Note: ${ai.error}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    renderFindings(local.findings);
    narrativeEl.textContent =
      ai.text ||
      "No model path was available, so no narrative was generated. The deterministic verdict above still stands on its own.";
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    runButton.disabled = false;
    runButton.textContent = "Run preflight audit";
  }
});
