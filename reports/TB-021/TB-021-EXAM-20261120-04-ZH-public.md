# 单事件安全分析报告：JetBrains Junie 项目文件终端环境设置致代码执行（CVE-2026-133198）

**墨言审计 Moyan Audit · 单事件报告线 · 个案卷宗**

| 项 | 内容 |
|---|---|
| 报告编号 | TB-021（任务卡）／ EXAM-20261120-04（考卷库条目） |
| 报告日期 | 2026-11-20 |
| 版本状态 | **内部版 · L2 返工修订重送**（2026-11-20 出稿；小语 L2 返工后按其逐项意见修订，改直引 CNA 原件并补 5.1 可复核附表；内部版不外发，公开须另过官网级加严门＋liu 逐篇批准） |
| 证件性质 | **文档考证件 · 无实跑数据**（事件事实取一手源文档，覆盖结论为规则覆盖级静态核验；本案例未实跑，无实跑回执） |
| 验收安排 | 验收人：小语（L2：2A 证据审计＋2B 主张／语言口径；分诊评分本身可在 L2 提异议） |
| 作者 | 统筹（Muse，loop/AG 供溯源材料） |
| 分诊 | A 级（必报），总分 15／18（逐项评分原表随任务卡 TB-021 存档，本轮重送随信附原文供复核） |
| 四点时戳 | 收录 2026-11-20 07:30 CST／立项 2026-11-20 08:20 CST／出稿 2026-11-20（本稿）／送审 2026-11-20（初稿随信送审）／L2 返工后修订重送 2026-11-20（仍回原送审串复核，message_ts 以任务卡登记为准）／定稿 — |

## 执行摘要

本报告分析 AI 编码智能体 JetBrains Junie 的一起项目文件配置驱动代码执行事件：据 JetBrains CNA 记录原件，受影响版本中经项目文件中的终端环境设置可致代码执行（CVE-2026-133198），记录标有用户交互（UI:R）；设置的具体字段、触发时点、执行权限与沙箱状态均未披露，本稿不写「打开即执行」类确定句。据 CNA 记录原件（cvelistV5，复核轮 2026-11-20 直读）：受影响为两条版本线（253 线 before 253.819.35／252 线 before 252.819.35），CWE-15，CVSS 3.1 评分 7.8（向量 AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H），记录发布时间 2026-11-19T14:50:15.806Z。

对 V19 规则面的覆盖判定为**未覆盖**：考卷核验钉（主链头 4fcf68b4，历史核验钉、非当前头）下 20 个在册插件中，没有任何一条对「项目文件执行配置可信边界」做判定；全文检索 terminal 命中 1 处（行尾符术语注释）、environment 命中 1 处（源环境文档字符串），均无配置可信主题命中，逐件清单、哈希与检索计数见 5.1 附表。两条相邻检查——命令注入检查只判命令构造摘要的中和面、命令通道检查只判发送方身份——经逐项对表均装不下项目文件配置面，不计覆盖。本缺口为考卷库未覆盖的新类别，已立为新缺口 **SE23** 入 loop backlog 在队区。

本稿为**文档考证件**：全部事件事实以 JetBrains CNA 记录原件为据（复核轮直读 cvelistV5 原件）；考卷库所列聚合页链接实读返回无关内容，不作事实依据（见第八节 G-02），覆盖结论为静态对表，**无实跑数据**，不得表述为实跑检出。

**关键数字**：受影响 253 线 before 253.819.35／252 线 before 252.819.35｜CWE-15｜CVSS 3.1 7.8（CNA 原件载明，我方未复算）｜核验钉在册插件 20 件、装下本展品的检查 0 件｜分诊 A 级 15／18｜缺口编号 SE23（新缺口，已入 loop backlog 在队区）｜端到端实跑回执 0。

## 关键发现

- **KF-01 机理成立（记录口径）：受影响版本可能经项目文件中的终端环境设置导致代码执行。** CNA 记录原文记 Junie 受影响版本中 code execution was possible via terminal environment settings in project files，并标 UI:R（须用户交互）；设置的具体字段、触发时点、执行权限与沙箱状态未披露（见 KF-02）。（已验证，一手源：CNA 记录原件直读）
- **KF-02 利用前提与触发细节未披露。** 所据材料未述被植入设置的具体字段、触发须否用户进一步操作、以及执行权限与沙箱状态；三项均标未知，不以同类产品惯例填充。（未知，见第八节 G-01）
- **KF-03 覆盖判定为未覆盖：核验钉下无项目文件配置可信类检查。** 20 插件全文检索 terminal／environment 无配置可信主题命中，20 条 RULE_ID 清单无项目文件配置主题。（已验证，静态核验，核验钉 4fcf68b4）
- **KF-04 两条相邻检查逐项排除，均不计覆盖。** v19.command_injection.unneutralized_construction 的展品是命令构造摘要，v19.channel.unverified_command_sender 的展品是命令通道发送方身份，均不以「项目文件供给的配置是否经可信确认才生效」为判定对象。（已验证，静态对表，考卷库标准段）
- **KF-05 这是新类别新缺口，不是已知缺口的复现。** 考卷库定性为未覆盖的新类别「项目文件配置驱动代码执行」，缺口编号 SE23；与同批 Junie 三件（文件工具越界／shell 重定向／文件名命令注入，分别归 SE20 与已有命令注入检查）机理面不同，不合并记账。（已验证，考卷库标准／证据段）
- **KF-06 在野利用：ADP 在所列时点评估为 none，实际在野状态未知。** CISA ADP SSVC 时点 2026-11-19T16:00:33.246734Z 记 exploitation＝none——此为时点评估，不证明从未在野利用。CWE-15 与 CVSS 向量已据 CNA 原件补明（见表 1）；国内具体受影响主体未见公开披露，不作推断填充。（见第八节）

## 一、事件概要

**表 1　事件要素表**

| 要素 | 内容 | 来源／口径 |
|---|---|---|
| 漏洞编号 | CVE-2026-133198 | JetBrains CNA 批次 CVE 记录／考卷库条目 |
| 漏洞类型 | 项目文件配置驱动代码执行（考卷库事件类别）；CWE-15（外部控制的系统或配置设置） | CNA 记录原件（problemTypes）／考卷库条目 |
| 事件类别 | 其他（项目文件配置驱动代码执行） | 考卷库条目 |
| 受影响产品 | JetBrains Junie（AI 编码智能体，IDE 集成面）的项目文件终端配置加载面 | 一手源／考卷库影响面段 |
| 受影响版本（253 线） | Junie 253 线 before 253.819.35（原件 affected 记 version 253、lessThan 253.819.35） | CNA 记录原件（affected 段） |
| 受影响版本（252 线） | Junie 252 线 before 252.819.35（原件 affected 记 version 0、lessThan 252.819.35） | CNA 记录原件（affected 段） |
| 修复版本 | 记录未单列『修复版本』字段；两线均 defaultStatus unaffected，即 253.819.35／252.819.35 起不受影响（据原件版本界线）；修复版行为未实测 | CNA 记录原件（口径注，见第八节 G-03） |
| 缺陷面 | 项目文件中的终端环境设置可致代码执行（记录原文口径）；设置生效是否经可信确认，记录未述 | CNA 记录原件 |
| 攻击路径 | 项目文件供给终端环境设置 → 受影响版本加载后可能达成代码执行；触发的具体交互与时点未披露（考卷库考题段的场景描述为假设口径、非一手证实） | CNA 记录原件＋考卷库考题段（假设标明；触发细节未披露，见 KF-02） |
| 严重度评分 | CVSS 3.1 7.8，向量 AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H | CNA 记录原件（cvssV3_1 字段直读；我方未独立复算） |
| 公开日 | 2026-11-19（记录 datePublished 2026-11-19T14:50:15.806Z） | CNA 记录原件 |

## 二、事件时间线

**表 2　时间线明细表**（公开日口径：以 JetBrains CNA CVE 记录发布日为准；本件无仓库级公告指针，CVE 记录即一手源）

| 时点 | 事实 | 来源 |
|---|---|---|
| 2026-11-19 | JetBrains 以 CNA 发布 CVE-2026-133198 记录——本件公开日；同批另发 Junie CLI 三件（CVE-2026-133195／133196／133197） | CVE 记录／考卷库条目 |
| 2026-11-20 07:30 CST | 每日安全考卷收录 EXAM-20261120-04，判定未覆盖，新缺口 SE23 入 loop backlog 在队区 | 当日总结／考卷库条目 |
| 2026-11-20 08:20 CST | 单事件线分诊立卡 TB-021（A 级，15 分） | 任务卡 TB-021 |
| 2026-11-20 | 本稿出稿并送小语 L2（生产驱动 event-report-producer 本拍挑件：同日三件 A 级到期件中取分诊总分最高且为新缺口件） | 本稿／任务卡 |

## 三、技术分析

### 3.1 机理：项目文件终端环境设置与代码执行的关联（确认与触发细节未披露）

据 CNA 记录原文：Junie 受影响版本中，经项目文件中的终端环境设置可达成代码执行（code execution was possible via terminal environment settings in project files），记录标 UI:R（须用户交互）。考卷库考题段的场景描述（植入设置、打开项目）属假设口径、非一手证实，本稿只作场景假设引用。定性要点在可信边界：项目文件是**不可信输入**（可由任意仓库、模板或第三方分发），而终端环境设置是**执行面配置**（决定终端启动时的环境与随之执行的命令面）；当后者由前者供给时，数据面与执行面的边界即受考验：记录只证终端环境设置与代码执行相关联，是否经用户确认、于何时触发、执行何种内容均未披露（未知）；开发者打开不可信项目的风险因此不能按「只读代码」估计。

本稿对机理的陈述以 CNA 记录描述为限：设置的具体字段名、文件位置、触发时点与执行上下文，记录均未披露（G-01），故不写「打开即执行」抑或「运行终端时执行」的确定句；触发时点标未知，考卷库场景描述只作假设引用、不标一手证实。

### 3.2 与同批 Junie 三件的区分

同批披露的 Junie 事件共四件，写出／执行通道各不相同，覆盖判定亦不同，不合并：① CVE-2026-133195 文件工具直写越出项目目录（SE20 未覆盖，TB-018）；② CVE-2026-133196 shell 输出重定向覆写项目外文件（SE20 同缺口＋子型分歧，TB-019）；③ CVE-2026-133197 代码审查经文件名命令注入（类别命中已有命令注入检查，但构造细节未披露、记未核，TB-020 候选）；④ 本件 CVE-2026-133198 项目文件终端配置驱动执行（新类别、新缺口 SE23）。四件的共同面是「编码智能体的输入可信边界」，但检查形态各异：路径限制、重定向通道、命令构造中和、配置可信确认——任一检查合入都不自动覆盖其余三件。

### 3.3 利用条件

- 场景假设：攻击者须能使目标开发者接触含相关设置的项目文件（项目分发面：考卷库考题段的构造前提，假设口径、非一手证实）。
- 目标须使用受影响版本 Junie 并加载该项目的终端环境设置；记录标 UI:R（须用户交互），具体交互形态与触发时点未披露（未知）。
- 实际账号、部署与触发条件：记录未述，标未知；向量 PR:N 只为向量记法，不替代对实际账号与触发条件的证明，本稿不据此断言「不需要本机账号」（原稿推断性表述已删，见证据分级表）。

## 四、影响评估

**表 3　影响面评估表**

| 维度 | 评估 | 口径／证据级 |
|---|---|---|
| 受影响系统类型 | AI 编码智能体 IDE 集成（JetBrains Junie 类）的项目文件终端配置加载面 | 考卷库影响面段 |
| 受影响人群 | 使用受影响版本打开不可信项目的开发者；执行是否发生、其组织代码与凭据资产是否受影响，记录未披露（未知） | 考卷库影响面段 |
| 国内相关性 | 同型推断——国内 AI IDE／编码智能体普遍加载项目级配置，同型面存在；未见国内同型公开披露 | 考卷库影响面段（推断标明） |
| 严重度评分 | CVSS 3.1 7.8 | CNA 记录原件载明；我方未独立复算（见第八节） |
| 在野利用状态 | ADP 在所列时点评估为 none，实际在野状态未知 | CISA ADP SSVC 时点 2026-11-19T16:00:33.246734Z（评估口径，不证明从未在野利用） |

## 五、覆盖判定

> **覆盖判定：未覆盖。** 判据：考卷核验时点主链头（历史核验钉 4fcf68b4，非当前头）20 个在册插件中，无任何一条检查对被审对象的「项目文件执行配置可信边界」做判定；相邻两条检查经逐项对表均不装下本展品。缺口立为 SE23。
>
> **实跑状态：未实跑。** 下述判定为规则覆盖级静态核验（核验钉插件全文检索＋RULE_ID 清单对表）；本稿无 V19 端到端实跑回执，不得表述为实跑检出。本稿为文档考证件，无实跑数据。

### 5.1 核验方法与核验钉

- 核验钉：主链头 `4fcf68b47c7892cb3e5eded732b33046ddca85e0`（cursor/production-did-labels-e95a）——此为考卷核验时点钉，不得称当前头。规则面为该钉下 research/audit_pipeline 现头 20 插件，经 fetch.py 实取全文检索（字节存 `考卷轮（2026-11-20）实取插件树目录`，清单 `考卷轮（2026-11-20）插件清单`）。
- 检索结果：全文检索 terminal／environment 在实取面无配置可信主题命中（计数与逐件清单见下附表）；20 条 RULE_ID 清单无项目文件配置主题。

#### 附表　核验钉规则面 20 插件清单（可复核，补 L2 2A②）

- 固定指针：核验钉 `4fcf68b47c7892cb3e5eded732b33046ddca85e0`；实取面 `考卷轮（2026-11-20）实取插件树目录`，清单 `考卷轮（2026-11-20）插件清单`。哈希算法＝git blob SHA-1（`blob <字节数>\0`＋文件字节），下表哈希值与字节数与清单载明值逐件复算对平（复核轮 2026-11-20）。
- 检索计数（对 20 件全文、不区分大小写子串计数）：`terminal` 命中 1 处——nonfinite_score.py 第 85 行注释 terminal-newline（行尾符术语）；`environment` 命中 1 处——archive_byte_plan.py 第 5 行文档字符串 trusted Python source environment（源环境表述）。两处均非配置可信主题。仅关键词零主题命中不足以单独证明全规则面未覆盖：本判定同时据下表 20 条 RULE_ID 主题清单无项目文件配置主题、及 5.2 对两条相邻检查的逐项排除，读者可按本表逐件复核。
- 相邻检查固定指针：command_injection.py（RULE_ID v19.command_injection.unneutralized_construction，blob 266042c9c1a59daef5044f7e25971f3b122208b4）与 channel_sender_verification.py（RULE_ID v19.channel.unverified_command_sender，blob b476281a78cb86b29dc0abba562d5af27ea4f786）——排除理由见 5.2。
- SE23 入队指针：loop backlog `loop backlog 在队区清单` SE23 条（2026-11-20 立项；验收标准＝项目文件供给的终端环境设置未经可信确认即生效并可达执行的构造判 fail 并引用配置证据、项目文件设置被拒／须用户确认的构造不误报、配置证据缺失判 inconclusive）。

| # | 插件文件 | RULE_ID | git blob SHA-1 | 字节 |
|---|---|---|---|---|
| 1 | archive_byte_plan.py | v19.archive.original_byte_plan_consistency | d4b6b831f74a978eeccad24c6d87a3245abd11df | 3579 |
| 2 | archive_plan.py | v19.archive.member_plan_consistency | ca253ccdcb2655874992776fb9a62d55c500f0a4 | 5834 |
| 3 | authorization_specificity.py | v19.authorization.insufficient_enforcement_specificity | 516379664288f961c780a2c49b3da107c150b12b | 10822 |
| 4 | cache_replay_admission.py | v19.cache.unversioned_replay | af76062ef542366e461e95dfdb657766a54dbfef | 21329 |
| 5 | caller_parameter_resource_limit.py | v19.resource.caller_parameter_without_server_limit | e5dc46f827863d58bf192d3a63214da09bca7913 | 11247 |
| 6 | channel_sender_verification.py | v19.channel.unverified_command_sender | b476281a78cb86b29dc0abba562d5af27ea4f786 | 9741 |
| 7 | command_injection.py | v19.command_injection.unneutralized_construction | 266042c9c1a59daef5044f7e25971f3b122208b4 | 7999 |
| 8 | gateway_credential_override.py | v19.gateway.caller_overridable_managed_credential | e7660e1788a5242bd640f8fea83d1fa4c85d8fa2 | 11206 |
| 9 | identity_assertion_propagation.py | v19.identity.unchecked_assertion_propagation | 7e5c3c73678054a8f57734b15dd00918469d54f5 | 10099 |
| 10 | index_absence.py | v19.authorization.incomplete_index_negative | 04a7f35138364562b564ca205164aad216275bce | 7397 |
| 11 | measured_zero_normal.py | v19.authorization.measured_zero_normal | e2752cb6d5738bac41361e0744c5fae80d6bf66d | 6290 |
| 12 | missing_authentication.py | v19.authentication.missing_for_critical_function | 16299e5cec1fd8781bcd6fdac2e2faaf3bfe9679 | 7774 |
| 13 | missing_authorization.py | v19.authorization.missing_for_management_operation | f93c67516729c1b007418797583650e8bc53c56c | 8741 |
| 14 | model_artifact_integrity.py | v19.supply_chain.model_artifact_integrity | cd7332825e95ed1061b30f989ba968bde57e10af | 14277 |
| 15 | nonfinite_score.py | v19.numeric.nonfinite_score | eaa25549468100c08376cf758283869189e8dbf1 | 8096 |
| 16 | outbound_trace.py | v19.outbound.trace_policy_consistency | 210df3c018e0d25270556205bd5735a22d0fef2d | 8269 |
| 17 | path_validation_pinning.py | v19.filesystem.path_validation_without_pinning | d919f98c97c24df5e1abab7444d6e41924fc8f4a | 9797 |
| 18 | sql_construction_neutralization.py | v19.sql_injection.unneutralized_parameter_interpolation | 9a0b3e40c6577f4fce383108647b9541ccdc1863 | 9983 |
| 19 | statement_boundary_enforcement.py | v19.boundary.declared_statement_boundary_not_enforced | 20561be748c096ba4216f54c68f5274ae1030465 | 11084 |
| 20 | supplied_pattern_filter_guard.py | v19.guard.user_supplied_pattern_filter_incomplete_guard | 6515f390c4445bf2b4a0429d81abd2f2f43f63a3 | 10876 |

### 5.2 为何未覆盖：缺哪一类检查

本展品需要的检查形态（即考题判定要求）：对被审对象的项目文件执行配置面做判定——

- **应判 fail**：项目文件供给的终端／执行配置未经可信确认即生效、并可达执行的构造（finding 须引用被检配置证据，与 5.1 附表 SE23 验收标准同口径）；
- **应判 pass（不误报）**：项目文件设置被拒，或须经用户确认才生效；
- **应判 inconclusive**：配置证据缺失，不冒充 fail。

核验钉规则面缺的正是这一类「配置可信边界」检查。相邻检查排除理由：v19.command_injection.unneutralized_construction 只判命令构造摘要的中和面——本件记录未披露执行经何种路径达成（命令构造路径未披露、未知），该检查判的是命令构造中和面，与记录所证的配置面关联不对题；v19.channel.unverified_command_sender 只判命令通道发送方身份——本件无命令通道发送方展品。两条均不计覆盖（考卷库标准段口径）。另记明边界：已有命令与发送方检查不算本类覆盖（见上两条排除）；本「未覆盖」只绑历史核验钉，不外推到现头、部署状态或实跑结果。

### 5.3 对我方系统的同类风险映射

V19 自身与我方智能体工作面存在加载项目级配置的面（仓库内配置、任务文件等）；我方是否存在「项目文件终端环境设置未经可信确认即生效」的同类加载路径，**需核对后才可定性**——尚未核对、标未核，本节不断言同型。映射结论为待核对项（未验证）：我方尚未对自有工作面做本件同型实跑核验，不得据本节称已排查；核对动作见第六节 D-05。

## 六、检测与修复建议

| 编号 | 建议 | 证据级 |
|---|---|---|
| D-01 | 使用 Junie 的开发者升级至不受影响版本（以厂商 CVE 记录的版本界线为准：252.819.35／253.819.35 及后续） | 未验证（据受影响范围推得的处置建议，我方未实测修复版行为） |
| D-02 | 打开不可信项目之前，先离线审阅项目文件中的终端／环境设置类配置，不在未审状态下以智能体打开陌生仓库 | 未验证（我方处置建议） |
| D-03 | 产品面：项目文件供给的终端／执行配置默认不生效，须经用户逐项确认并展示将执行的设置内容后才加载 | 未验证（我方产品设计建议，面向同型产品；不声称现行任何配置可阻断本件） |
| D-04 | 检测面：对被审对象检索项目文件配置加载点——配置来源为项目文件、未经可信确认即生效并可达执行者，按 5.2 口径判 fail 并引用配置证据；配置证据缺失判 inconclusive，不冒充 fail | 未验证（SE23 检查形态建议；检查未施工、未合入） |
| D-05 | 我方自查：盘点 V19 与智能体工作面中「工作区文件自动生效执行配置」的加载点清单，逐点核有无可信确认环节，结果入 loop backlog SE23 条下 | 未知（尚未执行，不称已排查） |

## 七、证据分级表

| 主张 | 等级 | 依据 |
|---|---|---|
| CVE-2026-133198 存在，JetBrains Junie 项目文件终端环境设置可致代码执行，公开日 2026-11-19 | 已验证 | JetBrains CNA CVE 记录原件（cvelistV5，复核轮 2026-11-20 直读，description 照录） |
| 受影响两线 before 253.819.35／before 252.819.35；CWE-15；CVSS 3.1 7.8 与向量 AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H | 已验证 | CNA 记录原件（affected／problemTypes／cvssV3_1 字段直读；我方未复算） |
| ADP 在所列时点评估为 none，实际在野状态未知 | 已验证（时点评估） | CNA 记录原件 ADP 段（SSVC 时点 2026-11-19T16:00:33.246734Z） |
| V19 判定未覆盖（静态核验，核验钉 4fcf68b4，20 插件无配置可信检查） | 已验证 | 考卷库标准／证据段：fetch.py 实取全文检索与 RULE_ID 清单对表 |
| SE23 为新缺口、已入 loop backlog 在队区 | 已验证 | 考卷库条目／当日总结 |
| 实际账号、部署与触发条件 | 未知 | 记录未述；PR:N 为向量记法、不作证明，见 3.3 |
| 第六节全部处置建议 | 未验证 | 我方建议，未实测 |
| 设置字段与触发细节 | 未知 | 记录未述，见第八节 |

## 八、缺口与未知（G 清单）

- **G-01 机理细节未披露**：被植入终端设置的具体字段、文件位置、触发时点（打开项目／运行终端）与执行权限，所据材料均未述；本稿机理陈述以 CVE 记录描述为限。
- **G-02 聚合页链接失效**：考卷库条目所列来源 https://sec.kaitan.id/news/18223895 于生产轮（2026-11-20）实读返回无关聚合内容，不作事实依据；本稿事实以 JetBrains CNA 记录原件直引为准（https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/133xxx/CVE-2026-133198.json，复核轮 2026-11-20 直读），该链接问题建议考卷线后续核订（本稿不动考卷库正本判定）。
- **G-03 修复版本口径**：CNA 原件以两条 lessThan 界线记受影响范围（253 线 lessThan 253.819.35／252 线 lessThan 252.819.35）、两线均 defaultStatus unaffected，未单列「修复版本」字段；D-01 的升级指向按界线版本表述，不另断修复版行为。
- **G-04 英文版同步状态**：英文版已于定稿后同步补齐（本轮返修的口径修改已逐处带入英文版），中英双版同审级、同口径，随本公开版同列发布；内部定稿原文此条记草稿时点状态，公开版按发布时点更新此条表述，事件事实与判定未动。
- **G-05 当前头未复核**：覆盖判定绑历史核验钉 4fcf68b4；当前头规则面是否变化，本稿未复核，不追认当前头覆盖状态。

## 一手源清单

1. JetBrains CNA CVE 记录原件 CVE-2026-133198（cvelistV5：https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/133xxx/CVE-2026-133198.json；datePublished 2026-11-19T14:50:15.806Z）——复核轮 2026-11-20 直读，本稿事件事实以此为准。
2. 考卷库正本 `考卷库正本《Agent Security Exam Bank》` EXAM-20261120-04 条（标准／证据段为覆盖判定依据，核验钉 4fcf68b4、实取面 `考卷轮（2026-11-20）实取面`）。
3. 每日安全考卷当日总结 `每日安全考卷当日总结（2026-11-20）`（收录与 SE23 入队记录）。
4. 任务卡 TB-021（分诊评分表正本，`统筹任务板`）。

---

*内部版 · 文档考证件 · 无实跑数据 · 未经 liu 逐篇批准不得公开发布*
