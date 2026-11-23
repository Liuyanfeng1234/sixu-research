# 20 插件逐件入口／判据排除表（TB-027 §5，返修补件）

- 核验钉：主链头 `afde544787d274db45491dc4796510b8e4501f40`（cursor/production-did-labels-e95a），规则面 `research/audit_pipeline/plugins` 20 件。
- 取证方法：本轮（2026-11-23）经 `~/workspace/v19-r90/fetch.py` 以核验钉逐件实取 20 件全文，blob SHA 与钉版清单（plugins-list-20-pin-afde5447.txt）逐件全等；逐件实读文件头判据自述与 RULE_ID／VERSION 后对表。
- 版本清单：下表 VERSION 列即各插件在核验钉下的版本；字节与 blob 见 plugins-list-20-pin-afde5447.txt。
- 本展品需要的判据：对「位置操作数标志注入防护（标志形值拒收／-- 终止符隔离）」做判定、且引用操作数处理证据。

| # | 文件 | RULE_ID | VERSION | 判据入口／主题 | 排除依据 |
|---|---|---|---|---|---|
| 1 | archive_byte_plan.py | v19.archive.original_byte_plan_consistency | 0.1.1 | 归档成员原始字节计划一致性（EvidenceStore 适配） | 判归档字节计划，不接收命令构造／操作数处理证据 |
| 2 | archive_plan.py | v19.archive.member_plan_consistency | 0.1.0 | 归档成员清单／计划一致性 | 计划一致性面，与参数构造无关 |
| 3 | authorization_specificity.py | v19.authorization.insufficient_enforcement_specificity | 0.1.0 | 授权执行特异性（令牌交换缓存键绑定、批量导入所有权检查粒度） | 授权面，不判参数构造 |
| 4 | cache_replay_admission.py | v19.cache.unversioned_replay | 0.2.0 | 缓存重放准入的版本绑定 | 缓存面，不判命令构造 |
| 5 | caller_parameter_resource_limit.py | v19.resource.caller_parameter_without_server_limit | 0.1.0 | 调用方参数的服务端资源上限（尺寸／计数类参数） | 判参数的资源量级，不判参数被被调用程序作标志解析 |
| 6 | channel_sender_verification.py | v19.channel.unverified_command_sender | 0.1.0 | 命令通道发送方身份核验 | 判谁可发命令，不判命令参数语义 |
| 7 | command_injection.py | v19.command_injection.unneutralized_construction | 0.1.0 | 命令构造中和（shell 字符串插值与行分隔符处理）；文件头明示 argv 分离不在其模式 | 相邻检查：判定函数（源码第 92–117 行）先核证据来源（inspection_source）与字段一致性（枚举／模式-中和一致性），前置不合即 inconclusive；argv_list 分支的通过只及 shell 语法面，不覆盖被调用程序的参数语义——不计覆盖 |
| 8 | gateway_credential_override.py | v19.gateway.caller_overridable_managed_credential | 0.1.0 | 网关托管上游凭证可被调用方覆盖 | 凭证面 |
| 9 | identity_assertion_propagation.py | v19.identity.unchecked_assertion_propagation | 0.1.0 | 身份断言传播的单次绑定／新鲜度与逐接收方核对 | 身份面 |
| 10 | index_absence.py | v19.authorization.incomplete_index_negative | 0.1.1 | 不完整索引上的确定性否定授权主张 | 证据声明面 |
| 11 | measured_zero_normal.py | v19.authorization.measured_zero_normal | 0.1.0 | 「实测零」声明的口径核对 | 声明面 |
| 12 | missing_authentication.py | v19.authentication.missing_for_critical_function | 0.1.0 | 关键功能认证存在性 | 认证面 |
| 13 | missing_authorization.py | v19.authorization.missing_for_management_operation | 0.1.0 | 管理操作授权执行与特权范围自赋 | 授权面 |
| 14 | model_artifact_integrity.py | v19.supply_chain.model_artifact_integrity | 0.1.5 | 模型工件权重差分与来源哈希声明 | 供应链面 |
| 15 | nonfinite_score.py | v19.numeric.nonfinite_score | 0.1.3 | 非有限数值冒充有限评分输入 | 数值面 |
| 16 | outbound_trace.py | v19.outbound.trace_policy_consistency | 0.1.0 | 出站请求轨迹的 origin／peer 策略一致性 | 网络轨迹面 |
| 17 | path_validation_pinning.py | v19.filesystem.path_validation_without_pinning | 0.1.0 | 文件系统路径校验-使用对象钉住一致性 | 判路径对象在校验与使用间的一致性，不判 CLI 位置操作数的标志解析 |
| 18 | sql_construction_neutralization.py | v19.sql_injection.unneutralized_parameter_interpolation | 0.1.0 | SQL 构造参数插值中和 | SQL 面，非被调用程序标志面 |
| 19 | statement_boundary_enforcement.py | v19.boundary.declared_statement_boundary_not_enforced | 0.1.0 | 声明语句边界（只读／限权）的执行 | 语句边界执行面 |
| 20 | supplied_pattern_filter_guard.py | v19.guard.user_supplied_pattern_filter_incomplete_guard | 0.1.0 | 用户供给 pattern／jq 过滤构造的防护完整性 | 模式／过滤表达式面，非位置操作数 |

结论：20 件逐件对表，无一以「位置操作数标志注入防护」为判据入口——在已核规则面未找到直接覆盖，判定未覆盖（静态核验）成立。全文检索 operand／end_of_options／dash 零命中（2026-11-20 实取树）仅为辅助证据，不单独成证。
