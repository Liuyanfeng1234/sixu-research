# Single-Event Security Analysis Report: Argument Injection via Flag-Shaped Positional Operands in mcp-server-kubernetes (CVE-2026-134817)

**Moyan Audit （墨言审计） · Single-Event Report Line · Case File**

**Documentary evidence · No live-run data** (event facts are taken from primary-source documents; the coverage verdict is a static coverage level check; this case was not live-run and there is no live-run receipt)

| Item | Content |
|---|---|
| Report ID | TB-027 (task card) / EXAM-20261123-01 (exam-bank entry) |
| Report date | 2026-11-23 |
| Version status | **Internal version · Revised draft** (first draft produced and submitted on 2026-11-23; revised the same day after the L2 first review returned it, with an item-by-item disposition attached to the resubmission letter; internal version, not for external distribution; publication requires the website-level gate plus per-article approval by liu) |
| Evidence nature | **Documentary evidence · No live-run data** |
| Reviewer | Xiaoyu (L2: 2A evidence audit + 2B claim/language review; the triage score itself may be challenged at L2) |
| Author | Coordinator (Muse; loop/AG supplied tracing material) |
| Triage | Grade A (must-report), total 15/18 (the triage original table is published with this report in the public repository sixu-research, at `reports/TB-027/evidence/triage-score-table-15of18.md`; also archived with task card TB-027) |
| Timestamps | Collected 2026-11-23 07:30 UTC+08:00 (Beijing time) / Filed 2026-11-23 08:20 UTC+08:00 (Beijing time) / Drafted 2026-11-23 / Submitted — (backfilled on the task card) / Finalised — |

## Executive Summary

This report analyses an argument-injection event in mcp-server-kubernetes, a Kubernetes-management MCP server: tools such as exec_in_pod, kubectl_patch, and kubectl_logs pass values supplied by remote MCP clients to kubectl as positional operands without rejecting values that begin with a dash, so an attacker can inject kubectl flags such as --filename and make kubectl read files from the server host, bypassing file-read restrictions (CVE-2026-134817, CWE-88). According to the CNA (VulnCheck) advisory and record (the mechanism and impact are as stated in the advisory and were not reproduced here; the NVD record carries the same CNA description and is not an independent corroboration), versions before 4.2.0 are affected (the NVD affected range is 0 < 4.2.0, semver) and 4.2.0 is the fix; the CNA CVSS 4.0 vector is AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:L/VA:N/SC:N/SI:N/SA:N with a CNA-stated score of 7.1 (quoted as recorded, not independently recalculated), and NVD's own assessment has not yet been provided (N/A). Dates are stated separately: the public date (CNA datePublic) is 2026-10-26 — the project's v4.2.0 release page listed the related hardening on the same day; the CVE record publication (datePublished) is 2026-11-22 UTC (2026-11-23 Beijing time); 2026-11-22 is called the CVE record publication date only, not the first public disclosure.

The verdict on the V19 rule surface is **Not covered**: under the exam verification pin (main-chain head afde544787d274db45491dc4796510b8e4501f40), none of the 20 registered plugins judges "positional-operand flag-injection protection (rejecting flag-shaped values / isolating operands after a -- terminator)" — a plugin-by-plugin cross-check of entry points and criteria (the entry-point/criteria exclusion table is published with this report in the public repository sixu-research, at `reports/TB-027/evidence/plugins-exclusion-table-20.md`) found no direct coverage in the reviewed rule surface; a full-text search for operand / end_of_options / dash returned zero hits and is supporting evidence only, not proof on its own. The adjacent check v19.command_injection.unneutralized_construction explicitly excludes argv-separated constructions in its own file header; its decision order as read in source (lines 92–117) first checks the evidence source and field consistency — failing those gates yields inconclusive — and the applicable branch's pass for argv_list constructions is a pass on the shell-syntax surface only: a construction may pass that rule when its preconditions are met, but that pass does not cover the invoked program's argument semantics, which is exactly where this case injects, so it does not count as coverage. The gap is the new gap **SE26** (already queued in the loop backlog).

This draft is **documentary evidence**: event facts rest on the VulnCheck advisory and the CNA record (read in this round; the mechanism and impact are as stated in the advisory and were not reproduced here); the coverage verdict is a static cross-check, with **no live-run data**, and must not be described as a live-run detection.

**Key numbers**: affected <4.2.0 | fixed in 4.2.0 | CWE-88 | 20 plugins under the verification pin, 0 checks that fit this exhibit | triage Grade A 15/18 | gap SE26 (new gap) | end-to-end live-run receipts 0.

## Key Findings

- **KF-01 Mechanism established: positional operands did not reject dash-prefixed values, and flag injection holds under argv separation.** Values supplied by remote MCP clients are passed to kubectl as positional operands; flag-shaped values (beginning with a dash) were neither rejected nor isolated after a -- terminator, so kubectl parses such a value as one of its own flags. (Verified at document level: as stated in the advisory, not reproduced here; primary sources: CNA record and VulnCheck advisory description)
- **KF-02 Impact is reading server-host files and bypassing file-read restrictions.** The advisory gives --filename as the example: injecting that flag can make kubectl read files from the server host, bypassing file-read restrictions. The CVSS 4.0 vector records VC:H / VI:L / VA:N; this is vector language and is not extrapolated to the permission shape of any actual deployment. (Verified at document level: as stated in the advisory, not reproduced here; advisory description and NVD metrics)
- **KF-03 Verdict Not covered: the current head has no positional-operand flag-injection protection check.** A plugin-by-plugin cross-check of the 20 plugins under the verification pin found none that fits this exhibit (the zero-hit keyword search is supporting evidence only); the adjacent command_injection check excludes argv-separated constructions by its own stated scope, and its argv_list pass covers the shell-syntax surface only, not the invoked program's argument semantics. (Verified, static check, pin afde5447)
- **KF-04 This case is a new category and the new gap SE26, not a new event under an existing gap.** The exam bank previously had no "flag-shaped positional operand argument injection" category; the proposed check is queued in the loop backlog, and this draft does not prejudge its landed form or coverage. (Verified; exam-bank standard section + loop backlog SE26 entry)
- **KF-05 The fix path is explicit and has primary-source pointers.** Upgrade to 4.2.0; the NVD references list fix commit 588d4949b0233974c3966a7d24d532be11e56d0d, PR #390, and the v4.2.0 release. (Verified as listed in the NVD references; the v4.2.0 release page was read back in this round, the remaining target pages were not opened one by one, see Section 7)
- **KF-06 Exploitation in the wild: none reported (time-point basis; actual status unknown).** Triage and the daily summary both record no report of in-the-wild exploitation as of the 2026-11-23 triage time; this is a "none reported" statement, the actual status is unknown, and it does not prove there will be none later. (Unverified, see G-04)

## 1. Event Overview

**Table 1 — Event elements**

| Element | Content | Source / basis |
|---|---|---|
| CVE ID | CVE-2026-134817 | VulnCheck advisory and NVD record |
| Weakness | Argument injection (CWE-88, Improper Neutralization of Argument Delimiters in a Command) | NVD Weakness Enumeration (source: VulnCheck) |
| Event category | Other (argument injection) | Exam-bank entry |
| Affected product | Flux159 mcp-server-kubernetes | NVD Affected Products (source: VulnCheck) |
| Affected versions | <4.2.0 (NVD records 0 < 4.2.0, semver) | NVD affected section, verbatim |
| Fixed version | 4.2.0 | VulnCheck advisory title and NVD reference to the v4.2.0 release |
| Defect surface | Tools such as exec_in_pod / kubectl_patch / kubectl_logs pass remote-client values to kubectl as positional operands without rejecting dash-prefixed values | Advisory and NVD description, verbatim |
| Attack path | A remote MCP client connected over SSE or Streamable HTTP supplies a flag-shaped value such as --filename, making kubectl read files from the server host and bypassing file-read restrictions | Advisory and NVD description, verbatim |
| Severity | CNA (VulnCheck): CVSS 4.0 vector CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:L/VA:N/SC:N/SI:N/SA:N, score 7.1 (as recorded); NVD's own assessment: not yet provided (N/A) — the two are stated separately | CNA record metrics and NVD record metrics, verbatim (read in this round; the score is quoted from the CNA record and was not independently recalculated, see G-02) |
| Public date | 2026-10-26 (CNA datePublic); the project's v4.2.0 release page listed the related hardening the same day (including the #390 flag-shaped operand checks) | CNA record date fields; v4.2.0 release page (published 2026-10-26) |
| CVE record publication | 2026-11-22 UTC (datePublished 2026-11-22T21:22Z; NVD Published Date 2026-11-22; 2026-11-23 Beijing time) — the record publication date only, not the first public disclosure | CNA record cveMetadata; NVD Quick Info |

## 2. Timeline

**Table 2 — Timeline** (dates stated separately: the public date follows the CNA datePublic field and the record publication follows datePublished; the two are not conflated. Exam sampling rule: the daily exam anchors collection on the CVE record publication (datePublished, UTC day boundary) and lists the public date separately)

| Time | Event | Source |
|---|---|---|
| 2026-10-26 | Public date (CNA datePublic 2026-10-26T00:00Z); the project releases v4.2.0 (2026-10-26T17:32Z), whose notes list kubectl argument-handling hardening, items #387–#392, with #390 being "flag-shaped operand checks in the remaining tools" | CNA record date fields; v4.2.0 release page (read back in this round) |
| 2026-11-22 UTC (2026-11-23 Beijing time) | CVE record published (datePublished 2026-11-22T21:22Z; NVD Published Date 2026-11-22, Last Modified 2026-11-22, Source VulnCheck) | CNA record cveMetadata; NVD Quick Info |
| 2026-11-23 07:30 UTC+08:00 (Beijing time) | The daily security exam collects this case (search window 2026-11-22 07:30 – 2026-11-23 07:30 UTC+08:00 (Beijing time)); verification status recorded as Not covered; gap SE26 queued in the loop backlog | Daily security exam summary of 2026-11-23 and exam-bank entry EXAM-20261123-01 |
| 2026-11-23 08:20 UTC+08:00 (Beijing time) | Triage files task card TB-027: Grade A, total 15/18 | Task card TB-027 |
| 2026-11-23 | This draft is produced and submitted to Xiaoyu for L2 review | This draft (submission timestamp backfilled on the task card) |

Note: the introduction time of the affected code lines is not given item by item in the primary-source text read in this round, and this draft does not infer it (see G-01); the v4.2.0 release time has been added above from the release page.

## 3. Technical Analysis

### 3.1 Mechanism: a positional operand is parsed as a flag of the invoked program

The construction point of this case is not shell-string concatenation but the argument list itself: the MCP tools place a value supplied by a remote client in a positional-operand position of a kubectl invocation, and kubectl processes that value under its own argument-parsing rules — a value beginning with a dash is treated as a kubectl flag (such as --filename), not as an ordinary operand. The injection therefore holds even though each input remains a separate argv element (argv separation): what is injected is not shell syntax but the invoked program's own flag surface. The correct protection shape is either or both of: rejecting flag-shaped (dash-prefixed) operand values, or placing operands after a -- terminator so later values are no longer parsed as flags. Versions before 4.2.0 did neither (per the advisory description: dash-prefixed values supplied as positional operands were not rejected). The primary sources do not disclose the construction details or a complete list of injectable flags item by item, so this draft states the mechanism only at a high level and includes no reproduction commands or operating details.

### 3.2 Exploitation conditions

- The attacker must be able to connect as a remote MCP client to the target mcp-server-kubernetes (over SSE or Streamable HTTP transport); the CVSS 4.0 vector records PR:L (low privileges required), UI:N (no user interaction), AV:N / AC:L / AT:N.
- The target version is <4.2.0, and the relevant tools (exec_in_pod / kubectl_patch / kubectl_logs, among others) pass client values to kubectl as positional operands.
- The effect is as stated in the advisory: making kubectl read files from the server host, bypassing file-read restrictions; effects beyond this (such as writing or execution) are not recorded in the primary sources and are not extrapolated here.

### 3.3 Relation to similar events

This case is adjacent to, but distinct from, the known command-injection category: conventional command-injection checks watch for untrusted input interpolated into a shell string without neutralisation; here the input never enters a shell string and stays argv-separated, and the injection surface is the invoked program's flag parsing. The exam bank previously had no such category; this case establishes the new category "flag-shaped positional operand argument injection" and the new gap SE26.

## 4. Impact Assessment

| Surface | Assessment | Evidence grade |
|---|---|---|
| Affected systems | The kubectl tool-invocation surface of Kubernetes-management MCP servers (of the mcp-server-kubernetes kind) | Verified (exam-bank impact section + advisory) |
| Affected population | Operators and clusters connected over SSE / Streamable HTTP; flag injection can make kubectl read server-host files, bypassing file-read restrictions | Verified (exam-bank impact section) |
| Domestic relevance | Same-shape inference: deployments that drive kubectl / CLI tools via MCP have the same-shape surface (any "positional operand not isolated" construction); no domestic same-shape public disclosure has been seen | Unverified (same-shape inference, exam-bank wording) |
| In-the-wild exploitation | No report of in-the-wild exploitation seen (time-point basis: as of the 2026-11-23 triage time; actual status unknown) | Unverified (triage basis, see G-04) |

## 5. Coverage Verdict

> **Verdict: Not covered.** Basis: a plugin-by-plugin cross-check of entry points and criteria for the 20 registered plugins under the exam verification pin (main-chain head afde5447; the item-by-item exclusion table is published with this report in the public repository sixu-research, at `reports/TB-027/evidence/plugins-exclusion-table-20.md`) found no direct coverage of "positional-operand flag-injection protection (rejecting flag-shaped values / isolating operands after a -- terminator)" in the reviewed rule surface; the zero-hit full-text search for operand / end_of_options / dash is supporting evidence only and does not prove non-coverage on its own; the adjacent check v19.command_injection.unneutralized_construction does not cover argv-separated constructions by its own stated scope. The gap is the new gap SE26 (established by EXAM-20261123-01, queued in the loop backlog).
>
> **Live-run status: not live-run.** The verdict below is a static coverage level check (cross-checking the plugin list under the verification pin plus full-text search); this draft has no V19 end-to-end live-run receipt and must not be described as a live-run detection. This draft is documentary evidence, with no live-run data.

### 5.1 Method and verification pin

- Verification pin: main-chain head `afde544787d274db45491dc4796510b8e4501f40` (cursor/production-did-labels-e95a, read by the daily exam on 2026-11-23; top commit Merge PR #501, 2026-11-22T14:14:05Z). The rule surface is the 20 plugins under research/audit_pipeline/plugins at that pin; their blob SHAs and sizes match the 2026-11-21 pin item by item, with no new check merged (the list is published with this report in the public repository sixu-research, at `reports/TB-027/evidence/plugins-list-20-pin-afde5447.txt`).
- Plugin-by-plugin cross-check: all 20 plugins were retrieved at the verification pin in this round (via fetch.py; blob SHAs match the pin manifest item by item), and each plugin's decision entry point and topic were checked; the exclusion table is published with this report in the public repository sixu-research, at `reports/TB-027/evidence/plugins-exclusion-table-20.md` (including a version manifest with each plugin's VERSION). The full-text search (operand / end_of_options / dash, zero hits over the tree retrieved on 2026-11-20) is supporting evidence only — zero keyword hits alone cannot prove that all rules fail to cover, and the verdict rests on the plugin-by-plugin cross-check.
- Adjacent check read directly: the header of command_injection.py (blob 266042c9, 7,999 B, VERSION 0.1.0) states "Argument-list / parameterized execution, where each input stays a separate argument and never becomes command syntax, is not this pattern"; its RULE_ID is v19.command_injection.unneutralized_construction; its decision function (source lines 92–117) first checks the evidence source (inspection_source must be "inspected") and field consistency (enum validity and mode/neutralisation consistency) — failing those gates yields inconclusive — and only then does the applicable branch judge the shell-syntax surface.

### 5.2 Why it is not covered: which class of check is missing

The check shape this exhibit needs (the exam question's verdict requirements) judges a summary of argument passing in tool command constructions:

- **Fail**: untrusted input is passed as a positional operand, and flag-shaped values beginning with a dash are neither rejected nor isolated after a -- terminator (this case itself);
- **Pass (no false positive)**: flag-shaped operands are rejected, or operands are placed after a -- terminator, with that construction's own parsing behaviour and wiring evidence on file; a generic practice statement without corresponding evidence does not earn a pass (it is inconclusive);
- **Inconclusive**: evidence of operand handling is missing.

The verdict must cite the inspected operand-handling evidence; in particular, the pass cell must not be earned by a generic practice statement — it requires the construction's own parsing behaviour and actual wiring evidence (rejection / isolation in effect in that construction), and insufficient evidence is inconclusive. This is exactly the class of check missing from the rule surface under the verification pin. The adjacent command_injection check answers "did the input get interpolated into a shell string and become command syntax": its decision order first checks the evidence source and field consistency, and its argv_list + untrusted branch (argv_separated_construction) returns a pass on the shell-syntax surface — a construction may pass that rule when its preconditions are met, but that pass does not cover the invoked program's argument semantics; this case falls precisely inside the scope that check describes as "not this pattern", and its injection surface is the argument semantics, so it does not count as coverage, and the SE26 refinement must record this division of labour explicitly (wording of the loop backlog SE26 entry). The per-plugin exclusion basis for the remaining 19 plugins is in the item-by-item exclusion table published with this report in the public repository sixu-research, at `reports/TB-027/evidence/plugins-exclusion-table-20.md`: their topics are authorisation, SQL construction, path pinning, model artifacts, and so on, and none of their decision entry points takes operand-handling evidence, so none fits this exhibit.

### 5.3 Same-shape risk mapping to our own systems

Our audit and tooling surfaces include constructions that drive CLI tools programmatically, but this draft has not verified whether any actual deployment of ours contains a construction of the form "a remotely supplied untrusted value passed as a positional operand to kubectl or a similar CLI" — whether a same-shape surface exists is UNKNOWN, and this section must not be read as saying we have checked or that we are affected. The mapping conclusion is at risk-notice level (unverified): any construction that passes an untrusted value as a positional operand should be checked against "reject flag-shaped values or isolate after a -- terminator"; see D-04 in Section 6.

## 6. Detection and Remediation Recommendations

**Table 4 — Recommendations** (each labelled with its evidence grade)

| ID | Recommendation | Evidence grade |
|---|---|---|
| D-01 | Upgrade mcp-server-kubernetes to 4.2.0 or later; for deployments wrapped by an upper-layer application, check whether the embedded version is inside the affected range (<4.2.0) | Verified (NVD affected range and the 4.2.0 fix) |
| D-02 | Until the upgrade is complete, restrict the remote access surface of this MCP server (only trusted clients over SSE / Streamable HTTP) and re-check the actual effective scope of its file-read restrictions | Unverified (our remediation advice, derived from this case's mechanism) |
| D-03 | Inventory every tool construction of the form "untrusted value as positional operand": check item by item whether flag-shaped value rejection or -- terminator isolation is in place, and keep a check record | Unverified (our remediation advice) |
| D-04 | Same-shape check for our own systems: inventory whether our own tooling surface contains positional-operand constructions without isolation (currently UNKNOWN) and grade separately after the check | Unverified (recommended action, not live-run) |
| D-05 | When SE26 lands, put the exam question's three cells into its decision order and suite cases: flag-shaped and unrejected with no -- isolation is fail, citing operand-handling evidence; rejected or placed after --, with that construction's parsing behaviour and wiring evidence on file, is a pass (no false positive), while the absence of such evidence is inconclusive — a generic practice statement must not auto-pass all subcommands; and record the division of labour with command_injection explicitly (argv separation is not its coverage) | Unverified (rule-surface advice, pending SE26 landing re-check) |

## 7. Evidence Grades and Primary Sources

**Table 5 — Evidence grades**

| Claim | Grade | Basis |
|---|---|---|
| Event mechanism, affected/fixed versions, CWE-88 classification, public/record dates | Verified (document level: as stated in the advisory, not reproduced here) | CNA record and VulnCheck advisory, verbatim (read in this round; the NVD record carries the same CNA description and is not an independent corroboration) |
| CVSS 4.0 vector (AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:L/VA:N/SC:N/SI:N/SA:N) and CNA score 7.1 | Verified (CNA record metrics read in this round and quoted as recorded; the numeric score was not independently recalculated; NVD's own assessment is not yet provided and is kept separate from the CNA column) | CNA record containers.cna.metrics; NVD record metrics |
| Fix commit and PR pointers (commit 588d4949…, PR #390, v4.2.0 release, exec_in_pod.ts L105 @ v4.1.9) | Verified (as listed in the NVD references; the v4.2.0 release page was read back in this round and its date and hardening items cross-check, the remaining target pages were not opened one by one) | NVD References section; v4.2.0 release page |
| Coverage verdict: Not covered (static check) | Verified (static level) | Plugin list under pin afde5447 read and cross-checked plugin by plugin (exclusion table; the zero-hit keyword search is supporting evidence only); not a live run |
| No in-the-wild exploitation reported, domestic same-shape surface, same-shape surface in our own deployments | Unverified / Unknown | Triage and exam-bank basis / not checked, see Section 8 |

**Primary sources**

1. VulnCheck advisory: https://www.vulncheck.com/advisories/mcp-server-kubernetes-before-4.2.0-argument-injection-via-flag-shaped-positional-operands (description read in full in this round)
2. NVD record CVE-2026-134817: https://nvd.nist.gov/vuln/detail/CVE-2026-134817 (read in full in this round: description, CWE-88, affected range, CVSS 4.0 vector, references, Published Date 2026-11-22; NVD's own assessment shown as N/A separately from the CNA vector, confirmed on read-back in this round)
3. CNA record (CVE Services JSON): https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/134xxx/CVE-2026-134817.json (read in this round: datePublic 2026-10-26, datePublished 2026-11-22T21:22Z, CNA CVSS 4.0 vector and score 7.1, no ADP container)
4. Project v4.2.0 release page: https://github.com/Flux159/mcp-server-kubernetes/releases/tag/v4.2.0 (read back in this round: published 2026-10-26T17:32Z; notes list hardening items #387–#392, with #390 the flag-shaped operand checks in the remaining tools)
5. Exam bank original *Agent Security Exam Bank*, entry EXAM-20261123-01, and the daily security exam summary of 2026-11-23 (the exam bank is published in sync in the public repository sixu-research and the HF dataset sixujinzhu/agent-security-exam-bank)

**Cross-check result**: the exam bank's key numbers — affected <4.2.0 ✓, fixed in 4.2.0 ✓, CWE-88 ✓, mechanism (positional operands not rejecting dash-prefixed values; --filename can be injected to read host files; as stated in the advisory) ✓, dates stated separately (datePublic 2026-10-26 ✓ / datePublished 2026-11-22 UTC, 2026-11-23 Beijing time ✓; the first draft's "publication date 2026-11-22" wording has been corrected to the CNA split fields) ✓, CVSS 4.0 vector VC:H ✓ (CNA score 7.1 quoted as recorded; NVD's own assessment not provided, stated separately) — all six items match the primary sources verbatim.

## 8. Gaps and Unknowns (G items)

- **G-01 Construction details not disclosed item by item**: the primary sources do not disclose the complete list of affected tools item by item (the advisory lists them with "such as"), the complete list of injectable flags, or a PoC; the mechanism statements in this draft are limited to the advisory and NVD descriptions and include no reproduction details.
- **G-02 CVSS numeric score not independently recalculated**: this draft quotes the CNA record's CVSS 4.0 vector and its stated score 7.1 verbatim (not independently recalculated in this round); NVD's own assessment is not yet provided (N/A) and is kept separate from the CNA column.
- **G-03 Status of the English edition**: this English edition was finalised at the same review level as the Chinese final version (both language versions were carried at the same head and passed Xiaoyu's L2 review on 2026-11-23). The two versions are of the same review level and the same scope and are published together with this public edition; the internal final text records this item as of the parallel pre-draft round, and the public edition updates its wording as of finalisation — the event facts and the verdict are unchanged.
- **G-04 In-the-wild exploitation is a "none reported" statement**: triage records no report of in-the-wild exploitation; this is "none reported" as of the triage time and does not prove there will be none later; this draft makes no whole-period assertion.
- **G-05 Internal paths removed in the public edition (executed in this edition)**: this public edition has removed all internal paths and review-carrier pointers, retaining only public primary sources such as the VulnCheck advisory and the NVD record; list- and original-table-type evidence is given public landing points (public repository sixu-research, `reports/TB-027/evidence/`). This case was not live-run and is not stated as a live run.
- **G-06 No live-run data**: all coverage conclusions in this draft are static coverage level checks, not live runs; the cover already states "Documentary evidence · No live-run data".
