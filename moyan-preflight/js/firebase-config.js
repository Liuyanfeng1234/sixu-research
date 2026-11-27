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
// APPCHECK_DEBUG_TOKEN below pins the token registered under the name
// "moyan-preflight-debug", so every browser presents the registered token
// instead of generating a fresh unregistered one (per-browser generation
// caused App Check 401s on 2026-11-20). The same value is also recorded
// in the production status file.
// For a production build, replace with a reCAPTCHA Enterprise site key.
export const APPCHECK_DEBUG = true;
export const APPCHECK_DEBUG_TOKEN = "19706F62-DE62-456C-B997-4FC8A482E79D";
export const APPCHECK_SITE_KEY = "6LdZLDUuAAAAAGHym_7r-XrnmS1jj8rGbUH7MNqh";

// Cloud model used through Firebase AI Logic when the on-device path is
// unavailable or returns an error.
// 2026-11-20 live verification (deployed site, ?cloudModels= override):
// gemini-3.5-flash-lite answered through the cloud path (Firebase AI Logic,
// App Check attested) on all three runs — ShopBot and SupportPilot samples
// plus a ShopBot repeat, each producing a generated cloud narrative. It is
// therefore the default below. The gemini-2.5 / gemini-2.0 series (flash
// and flash-lite) return 404 "no longer available to new users" on this
// account, and gemini-3.8-flash did not respond within the 30 s attempt
// timeout (nor in earlier console template tests).
export const CLOUD_MODEL = "gemini-3.5-flash-lite";

// Ordered cloud-model candidates: the engine tries each in turn and uses the
// first that answers (see js/hybrid-engine.js). As of the 2026-11-20 live
// verification, gemini-3.5-flash-lite is the only candidate CONFIRMED to
// answer on this project (three successful cloud runs, see above), so it
// leads the list. gemini-3.8-flash is kept as a fallback only: it never
// responded within the 30 s attempt timeout in testing. The gemini-2.5 /
// gemini-2.0 models are NOT listed: they return 404 for new users on this
// account (if you fork this repo against your own Firebase project where
// they are enabled, add them back or use the override below). If every
// candidate fails, the deterministic local verdict stands on its own; the
// UI says so.
// Override without editing code: open the app with ?cloudModels=a,b (or
// ?cloudModel=a), or set localStorage "moyan-preflight.cloudModels".
export const CLOUD_MODEL_CANDIDATES = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];

// Per-attempt cloud timeout (ms). The observed 2026-11-20 failure mode was a
// long non-response rather than a fast error — without a timeout the demo
// would hang instead of falling through to the next candidate / local-only.
export const CLOUD_TIMEOUT_MS = 30000;
