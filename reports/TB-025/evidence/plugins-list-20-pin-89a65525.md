# 核验钉 20 件固定清单（TB-025 §5.1 固定指针）

- 核验钉：主链头 `89a655254f247a95dbf24fb4213c0e33076b018a`（cursor/production-did-labels-e95a，顶提交为 #498 合并）
- 清单出处：2026-11-21 每日安全考卷经 GitHub 连接器 get_file_contents 实读 `research/audit_pipeline/plugins` 目录；20 件 blob sha 与大小与 2026-11-20 钉版逐件全等、无新增检查合入。
- 本文件随 TB-025 载体（Draft PR #537，分支 cursor/carrier-tb025-1121）同头送达，为 §5.1「20 件固定清单」的可读固定指针。

| # | 文件 | blob sha | 大小（B） |
|---|---|---|---|
| 1 | archive_byte_plan.py | d4b6b831f74a978eeccad24c6d87a3245abd11df | 3579 |
| 2 | archive_plan.py | ca253ccdcb2655874992776fb9a62d55c500f0a4 | 5834 |
| 3 | authorization_specificity.py | 516379664288f961c780a2c49b3da107c150b12b | 10822 |
| 4 | cache_replay_admission.py | af76062ef542366e461e95dfdb657766a54dbfef | 21329 |
| 5 | caller_parameter_resource_limit.py | e5dc46f827863d58bf192d3a63214da09bca7913 | 11247 |
| 6 | channel_sender_verification.py | b476281a78cb86b29dc0abba562d5af27ea4f786 | 9741 |
| 7 | command_injection.py | 266042c9c1a59daef5044f7e25971f3b122208b4 | 7999 |
| 8 | gateway_credential_override.py | e7660e1788a5242bd640f8fea83d1fa4c85d8fa2 | 11206 |
| 9 | identity_assertion_propagation.py | 7e5c3c73678054a8f57734b15dd00918469d54f5 | 10099 |
| 10 | index_absence.py | 04a7f35138364562b564ca205164aad216275bce | 7397 |
| 11 | measured_zero_normal.py | e2752cb6d5738bac41361e0744c5fae80d6bf66d | 6290 |
| 12 | missing_authentication.py | 16299e5cec1fd8781bcd6fdac2e2faaf3bfe9679 | 7774 |
| 13 | missing_authorization.py | f93c67516729c1b007418797583650e8bc53c56c | 8741 |
| 14 | model_artifact_integrity.py | cd7332825e95ed1061b30f989ba968bde57e10af | 14277 |
| 15 | nonfinite_score.py | eaa25549468100c08376cf758283869189e8dbf1 | 8096 |
| 16 | outbound_trace.py | 210df3c018e0d25270556205bd5735a22d0fef2d | 8269 |
| 17 | path_validation_pinning.py | d919f98c97c24df5e1abab7444d6e41924fc8f4a | 9797 |
| 18 | sql_construction_neutralization.py | 9a0b3e40c6577f4fce383108647b9541ccdc1863 | 9983 |
| 19 | statement_boundary_enforcement.py | 20561be748c096ba4216f54c68f5274ae1030465 | 11084 |
| 20 | supplied_pattern_filter_guard.py | 6515f390c4445bf2b4a0429d81abd2f2f43f63a3 | 10876 |
