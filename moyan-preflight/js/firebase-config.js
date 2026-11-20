// Firebase project configuration for the cloud fallback path (Firebase AI Logic).
//
// INTEGRATED 2026-11-20 (main line, console session):
//   Project "Moyan Preflight" (projectId: moyan-preflight), Spark free plan.
//   Firebase AI Logic enabled with the Gemini Developer API (free tier) backend.
//   Web app "moyan-preflight-web" registered; its config is pasted below.
//   App Check is ENFORCED for AI Logic on this project (debug-token flow,
//   see the App Check section below).

export const FIREBASE_CONFIGURED = true;

export const firebaseConfig = {
  apiKey: "AIzaSyBWs52fhz5FlxiMtIcREz2kqKsQAXFRBb8",
  authDomain: "moyan-preflight.firebaseapp.com",
  projectId: "moyan-preflight",
  storageBucket: "moyan-preflight.firebasestorage.app",
  messagingSenderId: "788075366233",
  appId: "1:788075366233:web:e35bf90635a3fe7ce06e48",
};

// App Check: REQUIRED by the hackathon, and ENFORCED for AI Logic on this
// project (console, 2026-11-20). For the submission build the debug token
// flow is accepted: with APPCHECK_DEBUG = true the SDK uses the debug token
// registered in Firebase Console -> App Check -> Apps -> Manage debug tokens.
// The registered token value is recorded in the production status file only —
// never commit it here (this file ships in the public repo).
// For a production build, replace with a reCAPTCHA Enterprise site key.
export const APPCHECK_DEBUG = true;
export const APPCHECK_SITE_KEY = "REPLACE_ME_RECAPTCHA_ENTERPRISE_SITE_KEY";

// Cloud model used through Firebase AI Logic when the on-device path is
// unavailable or returns an error.
// 2026-11-20 console check: gemini-2.5-flash and gemini-2.0-flash both return
// "no longer available to new users"; the console recommends gemini-3.8-flash.
// That model did not respond in two console template tests, so its
// availability is UNCONFIRMED — verify with a real call before submission.
export const CLOUD_MODEL = "gemini-3.8-flash";

// Ordered cloud-model candidates: the engine tries each in turn and uses the
// first that answers (see js/hybrid-engine.js). Availability of EVERY entry
// is UNCONFIRMED for this project as of 2026-11-20 — the console recommended
// gemini-3.8-flash but it did not respond in two template tests, and
// gemini-2.5-flash is closed to new users on this account (it stays in the
// list because it remains enabled on many other accounts — e.g. if you fork
// this repo against your own Firebase project). If every candidate fails,
// the deterministic local verdict stands on its own; the UI says so.
// Override without editing code: open the app with ?cloudModels=a,b (or
// ?cloudModel=a), or set localStorage "moyan-preflight.cloudModels".
export const CLOUD_MODEL_CANDIDATES = ["gemini-3.8-flash", "gemini-2.5-flash"];

// Per-attempt cloud timeout (ms). The observed 2026-11-20 failure mode was a
// long non-response rather than a fast error — without a timeout the demo
// would hang instead of falling through to the next candidate / local-only.
export const CLOUD_TIMEOUT_MS = 30000;
