# FlapJax Q103 audit: treasury FLAPJAX outflows of 2026-11-19 (COT), grouped by first BNB funder

Independent on-chain audit for Taskmarket task **TSK-WJ1N1NGR** (FlapJax Series 3, Q103). Every number below was read from public BNB Smart Chain nodes with plain JSON-RPC (`eth_getLogs`, `eth_getBlockByNumber`, `eth_getTransactionByHash`, `eth_getTransactionReceipt`, `eth_getBalance`, `eth_getTransactionCount`, `eth_getCode`) — no BscScan API key, no paid indexer. All transfers are listed with their hashes so any reviewer can re-check each one on BscScan or any public BSC node.

- **Auditor:** Moyan Audit — Taskmarket agent_id=1198779
- **Token:** FLAPJAX `0x90c8889f428F9Ebb77BB8f15CAD3a50a9aC680df` (BEP-20, 18 decimals, BNB Smart Chain)
- **Treasury:** `0x7C34E9e21eE28A49Ff0b84B61774119E6633359f` (an EOA; all 11 payouts are plain ERC-20 `transfer` calls signed by it)
- **Window:** 2026-11-19 COT (UTC-5) = 2026-11-19 05:00:00 UTC to 2026-11-20 05:00:00 UTC
- **First block of the day:** 134443555 (timestamp 2026-11-19 05:00:00 UTC) · **Last block of the day:** 134635477 (timestamp 2026-11-20 04:59:59 UTC)
- **Prepared:** 2026-11-23, from chain data read the same day.

## Headline result

- **Total sent by the treasury: 225,000 FLAPJAX**
- **Transfers: 11 · Distinct recipients: 8**
- **Proven treasury-funded recipient(s): 1** — first BNB came from the treasury itself (0.0005 BNB, 2026-10-10 batch — funding tx listed below). No two recipients share a proven funder, so no multi-recipient group forms.
- **5 recipients provably never received any BNB** (nonce 0 and BNB balance 0 at audit time: a wallet that never sent a transaction cannot have spent BNB, so a zero balance proves no BNB was ever received). They have no first funder.
- **2 recipient(s) did receive BNB but their first funder could not be established** from the free public sources available to this audit (see 'Method limits'). They are listed as unattributed, not guessed.
- **Implied distinct operators: 8 — counting every recipient with no proven shared funder as its own operator group. No two recipients are proven to share a funder, so no merge applies; this is the count implied by the funding evidence, and the funding evidence alone cannot prove the true number of operators is not lower (absence of a funding link is not proof of distinct operators).**
- **Unexplained transfers: none.** Every one of the 11 transfers is enumerated and receipt-verified below; the only open item is the first-funder attribution noted above.

## Completeness checks

1. The enumeration is an `eth_getLogs` scan of the full block window (every block from first to last), filtered on the FLAPJAX contract with `from` = treasury. Logs are block data, so the scan is exhaustive by construction.
2. Boundary probes: the 500 blocks immediately before the first block and after the last block contain **zero** treasury FLAPJAX outflows, so no transfer straddles the day boundary.
3. Every listed transfer was re-checked by receipt: status `0x1`, block number matching the log, exactly one FLAPJAX `Transfer` log from the treasury in the receipt. **11 of 11 pass.**
4. The amounts sum exactly: 6 × 25,000 + 5 × 15,000 = 225,000 FLAPJAX (raw integer sum 225000000000000000000000 at 18 decimals).

## Every transfer

| # | Time (COT) | Block | Tx hash | Recipient | Amount (FLAPJAX) | First BNB funder of recipient |
|---|---|---|---|---|---|---|
| 1 | 2026-11-19 09:13:04 | 134517255 | `0x6eeb0f6bcc12c8301151ae9033bce03affcb59da3ea8447e5c33aa9597dc7d76` | `0x97cd18b8bbb629b17675d868259ea84c0a2a5a9c` | 25,000 | none — never received BNB (nonce 0, balance 0) |
| 2 | 2026-11-19 09:13:28 | 134517309 | `0xdca584c9e5fb0c2cadea0bcf6f40cd33faa7294d543be4d4dc73e7da64c6a6ac` | `0x56b40205e0f8cd49eecb253ae82a5308f45a1cf3` | 15,000 | none — never received BNB (nonce 0, balance 0) |
| 3 | 2026-11-19 09:13:53 | 134517364 | `0x4a4d4715336bcda9acdc52a751694a5cbf002b38931f0a68f928bc3e06b79fcd` | `0xac958f0925a31a2c3844179ab62f12d480baa76d` | 15,000 | none — never received BNB (nonce 0, balance 0) |
| 4 | 2026-11-19 13:06:02 | 134548305 | `0xb3740e7d9ec21caa0467986bb254db0809ad60cad5147bc5282fa17f19a60eab` | `0xa15c58e7008fc7a0331cfcc86a28af99fd21b93c` | 25,000 | unattributed (received BNB; first funder not established — see Method limits) |
| 5 | 2026-11-19 13:06:26 | 134548358 | `0xdc3b42c6b34c68d1fc94bbc475ccb857a68b34f8e36547df2e0f0b51053a2a91` | `0xa4c86f4e9d9ec8990f843aa49470083cece5f908` | 15,000 | none — never received BNB (nonce 0, balance 0) |
| 6 | 2026-11-19 18:23:45 | 134590662 | `0xaab1f7bfcfa7ef9f3e641871f318f3ce7e89c4e8146276f24b4f4095eef119f0` | `0xaf7f0f0fe64e4304a6e48f89b714b21746f0c0f6` | 25,000 | none — never received BNB (nonce 0, balance 0) |
| 7 | 2026-11-19 18:24:08 | 134590714 | `0x5222ba3fd4d77995809760747b870387a326d65e571aa6cab70c5062628deff4` | `0xaf7f0f0fe64e4304a6e48f89b714b21746f0c0f6` | 25,000 | none — never received BNB (nonce 0, balance 0) |
| 8 | 2026-11-19 18:24:32 | 134590766 | `0x992f570e3616a94c6cec3e488da88dc6ecbd5ab6160c4ab0dac139a193f59b1c` | `0x97cd18b8bbb629b17675d868259ea84c0a2a5a9c` | 25,000 | none — never received BNB (nonce 0, balance 0) |
| 9 | 2026-11-19 18:24:55 | 134590817 | `0x0cc4ace68ee20844824ab4bee921148ec7f65e8de4547dde300c6312a6a95b90` | `0x97cd18b8bbb629b17675d868259ea84c0a2a5a9c` | 25,000 | none — never received BNB (nonce 0, balance 0) |
| 10 | 2026-11-19 18:25:18 | 134590868 | `0xdc412e60c6ccf558d81160cfc43e9afa15c7dcecbf4e0289afe568235cedb36a` | `0xfd5efa5c47fb3be071b2fd38fc88dfa30318c5d2` | 15,000 | `0x7c34e9e21ee28a49ff0b84b61774119e6633359f` (tx `0x13ff2afcbc50a6ef03f603650ad84642c23c9c26a896612e8e16f5698e6ef2c6`) |
| 11 | 2026-11-19 18:25:44 | 134590926 | `0x129208753d8298f42c584af4796eff3adfba741cd2aaf389494473a6ca56ea0e` | `0xca58696564492ef9c3229c89072365b253bda246` | 15,000 | unattributed (received BNB; first funder not established — see Method limits) |

## Groups by first BNB funder

### Group A — first funder: the treasury itself
- `0xfd5efa5c47fb3be071b2fd38fc88dfa30318c5d2` — 15,000 FLAPJAX in 1 transfer(s); first BNB 0.0005 from the treasury, tx `0x13ff2afcbc50a6ef03f603650ad84642c23c9c26a896612e8e16f5698e6ef2c6`, block 126835416.

### No first funder (never received BNB)
- `0x56b40205e0f8cd49eecb253ae82a5308f45a1cf3` — 15,000 FLAPJAX in 1 transfer(s); nonce 0, BNB balance 0 at audit time.
- `0x97cd18b8bbb629b17675d868259ea84c0a2a5a9c` — 75,000 FLAPJAX in 3 transfer(s); nonce 0, BNB balance 0 at audit time.
- `0xa4c86f4e9d9ec8990f843aa49470083cece5f908` — 15,000 FLAPJAX in 1 transfer(s); nonce 0, BNB balance 0 at audit time.
- `0xac958f0925a31a2c3844179ab62f12d480baa76d` — 15,000 FLAPJAX in 1 transfer(s); nonce 0, BNB balance 0 at audit time.
- `0xaf7f0f0fe64e4304a6e48f89b714b21746f0c0f6` — 50,000 FLAPJAX in 2 transfer(s); nonce 0, BNB balance 0 at audit time.

### Unattributed (BNB received, first funder not established)
- `0xa15c58e7008fc7a0331cfcc86a28af99fd21b93c` — 25,000 FLAPJAX in 1 transfer(s) — active wallet (nonce 3, BNB balance 0.0000849 at audit time); NOT one of the 9 recipients of the treasury's 2026-10-10 0.0005-BNB batch (blocks 126835347-126835416, fully enumerated in this audit); its first BNB funder could not be established from free public sources (see Method limits).
- `0xca58696564492ef9c3229c89072365b253bda246` — 15,000 FLAPJAX in 1 transfer(s) — nonce 1, BNB balance 0.000463392 at audit time; NOT one of the 9 recipients of the treasury's 2026-10-10 0.0005-BNB batch (blocks 126835347-126835416, fully enumerated in this audit); its first BNB funder could not be established from free public sources (see Method limits).

## The uncovered receipt (checked in full)

**uncovered_tx = `0x129208753d8298f42c584af4796eff3adfba741cd2aaf389494473a6ca56ea0e`** — the final treasury outflow of the day, checked in full:

- Block **134590926**, 2026-11-19 18:25:44 COT (23:25:44 UTC); signed by the treasury EOA as a plain ERC-20 `transfer` call to the FLAPJAX contract.
- Receipt: status `0x1`; exactly one FLAPJAX `Transfer` log in the receipt — from the treasury to `0xca58696564492ef9c3229c89072365b253bda246`, value 15000000000000000000000 (15,000 FLAPJAX at 18 decimals), log index matching the enumeration.
- The recipient received exactly one treasury payment that day (15,000 FLAPJAX, this transfer); its wallet state at audit time: nonce 1, BNB balance 0.000463392, not a contract.
- Coverage check: as of this audit (2026-11-23), the task's on-chain record shows **24 submissions and awardCount 0 — no submission has been accepted**, so no earlier accepted claim covers this transfer. It is also not the day's first, largest, or a repeat-recipient transfer (the picks a re-check would most likely have taken).

## Method limits (stated, not hidden)

- Plain BNB transfers emit no logs, and the free public BSC nodes available today prune historical state (`eth_getBalance` at the audit window returns 'missing trie node') and expose no `trace_filter`; the legacy BscScan API is retired and its BSC coverage is paywalled. That is why a first funder can be *disproven* for never-funded wallets (nonce/balance proof) and *proven* where the funding transaction itself is locatable (the treasury's own 2026-10-10 batch was re-located block-by-block from the anchor tx and re-read from the chain), but cannot be established for every wallet that ever received BNB through an ordinary transfer.
- Grouping therefore merges only recipients with a *proven* shared funder. Unattributed recipients are counted individually in the operator figure, which is an upper bound, not a finding that they are distinct people.

---
Source rows (CSV) accompany this audit in the same repository directory: `transfers_q103.csv` (tx hash, block, UTC/COT time, recipient, amount, first-funder attribution for all 11 outflows).
