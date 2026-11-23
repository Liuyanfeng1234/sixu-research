# TB-027 — mcp-server-kubernetes Argument Injection (CVE-2026-134817)

Single-event security analysis report: tools in mcp-server-kubernetes (e.g. exec_in_pod, kubectl_patch, kubectl_logs) pass remote-client-supplied values to kubectl as positional operands without rejecting flag-shaped values, allowing injection of kubectl flags such as --filename to read server-host files (CVE-2026-134817, CWE-88; affected < 4.2.0, fixed in 4.2.0).

## Report (public edition, bilingual)

- [TB-027-EXAM-20261123-01-ZH-public.md](TB-027-EXAM-20261123-01-ZH-public.md) — sha256 `f4cb485780b5fbab3a242ec362f1c4205cc0fe00d12cd37ae7187d8519513362`
- [TB-027-EXAM-20261123-01-EN-public.md](TB-027-EXAM-20261123-01-EN-public.md) — sha256 `405dac6eeb14dec2ff059fa189241e17e812774c44a92806aec5a9a93ad3adbc`

## Verdict

**Not covered （未覆盖） · static coverage level** — under the exam verification pin (main-chain head afde544787d274db45491dc4796510b8e4501f40), no check in the reviewed V19 rule surface judges positional-operand flag-injection protection. Documentary evidence only; this case was not live-run and carries no live-run receipt.

## Evidence (evidence/)

| File | Bytes | sha256 |
|---|---|---|
| adjacent-exclusion-note.md | 1682 | `654e88fe7f3426b80b59dfa1c3af3ffdcf13dd7b5423aa0b11a36b23ddddf244` |
| plugins-exclusion-table-20.md | 5009 | `8164eae8c10597c7ddacf27fba7a10422f020855df5e568116d7ee8eec86a007` |
| plugins-list-20-pin-afde5447.txt | 1978 | `1f6f19c748245b553af1dc72cdcb53bdc47035cb7d0dffb0edf895bc0a9227e7` |
| se26-backlog-excerpt.md | 1120 | `5dfc325470335d1a868c66ac35c153025dab60d7338b6be61517e892a3df3bdf` |
| triage-score-table-15of18.md | 1853 | `6d5e7c2fbfe058ca4c0ff377261d5a7311d54689a8c83305b607422370384f75` |

Published: 2026-11-23 17:16 CST. Publisher: Moyan Audit （墨言审计） single-event report line.
