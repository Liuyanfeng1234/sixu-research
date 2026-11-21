# 相邻检查逐件排除表（TB-025 §5.2 固定指针）

口径：本展品（CVE-2026-133710）所需检查形态＝对模型文件加载面的元数据派生边界摘要判定（派生尺寸可回绕/溢出且分配与写入边界不一致＝fail／派生尺寸经溢出检查且边界一致＝pass／边界处理证据缺失＝inconclusive）。下表逐件列核验钉（89a65525）20 插件的判定面与排除理由；判定面取各插件源码 RULE_ID 与模块自述（2026-11-20 钉版实取树字节，其 blob 与 2026-11-21 钉版逐件全等）。结论：20 件无一装下本展品。

| # | 插件 | RULE_ID | 判定面（源码自述） | 排除理由 |
|---|---|---|---|---|
| 1 | archive_byte_plan.py | v19.archive.original_byte_plan_consistency | 归档原始字节计划一致性（EvidenceStore 适配） | 归档面，与模型加载面无关 |
| 2 | archive_plan.py | v19.archive.member_plan_consistency | 归档成员清单与计划一致性，非解包器 | 归档面，与模型加载面无关 |
| 3 | authorization_specificity.py | v19.authorization.insufficient_enforcement_specificity | 授权强制具体性证据 | 授权面，不判加载器边界 |
| 4 | cache_replay_admission.py | v19.cache.unversioned_replay | 缓存版本化回放准入 | 缓存面，不判加载器边界 |
| 5 | caller_parameter_resource_limit.py | v19.resource.caller_parameter_without_server_limit | 调用方参数的服务端资源上限证据 | 相邻（同属尺寸/上限语义）：对象是调用方请求参数的服务端限额，不判加载器按模型文件元数据派生的分配/写入边界 |
| 6 | channel_sender_verification.py | v19.channel.unverified_command_sender | 命令通道发送者核验 | 通道身份面，不判加载器边界 |
| 7 | command_injection.py | v19.command_injection.unneutralized_construction | 命令构造中和证据 | 判命令构造摘要，不判加载器边界 |
| 8 | gateway_credential_override.py | v19.gateway.caller_overridable_managed_credential | 网关托管凭证可被调用方覆盖 | 凭证面，不判加载器边界 |
| 9 | identity_assertion_propagation.py | v19.identity.unchecked_assertion_propagation | 身份断言传播核查 | 身份面，不判加载器边界 |
| 10 | index_absence.py | v19.authorization.incomplete_index_negative | 索引不完整时的否定授权断言 | 授权证据面，不判加载器边界 |
| 11 | measured_zero_normal.py | v19.authorization.measured_zero_normal | 实测零声明的证据口径 | 声明口径面，不判加载器边界 |
| 12 | missing_authentication.py | v19.authentication.missing_for_critical_function | 关键功能认证存在性 | 认证面，不判加载器边界 |
| 13 | missing_authorization.py | v19.authorization.missing_for_management_operation | 管理操作授权强制存在性 | 授权面，不判加载器边界 |
| 14 | model_artifact_integrity.py | v19.supply_chain.model_artifact_integrity | 模型工件权重差分证据（权重差分与来源哈希声明） | **重点相邻项**：工件面而非加载面——回答「工件是否被换、来源是否对得上」，不判加载器消费元数据时派生尺寸溢出与分配/写入边界一致性，不构成覆盖 |
| 15 | nonfinite_score.py | v19.numeric.nonfinite_score | 数值评分输入的有限性表示 | 相邻（同属数值面）：对象是评分输入的有限/非有限表示，不判整数派生溢出与写入边界 |
| 16 | outbound_trace.py | v19.outbound.trace_policy_consistency | 出站请求轨迹的来源/对端策略一致性 | 网络面，不判加载器边界 |
| 17 | path_validation_pinning.py | v19.filesystem.path_validation_without_pinning | 路径校验—使用对象一致性（TOCTOU） | **重点相邻项**：判同一路径对象在校验与使用之间未被替换，不判元数据派生边界 |
| 18 | sql_construction_neutralization.py | v19.sql_injection.unneutralized_parameter_interpolation | SQL 构造参数中和 | 注入面，不判加载器边界 |
| 19 | statement_boundary_enforcement.py | v19.boundary.declared_statement_boundary_not_enforced | 声明语句边界的强制执行 | 语句边界面，不判加载器边界 |
| 20 | supplied_pattern_filter_guard.py | v19.guard.user_supplied_pattern_filter_incomplete_guard | 用户供给模式/过滤器守卫完整性 | 判模式守卫覆盖与资源上限，非模型加载器元数据边界 |
