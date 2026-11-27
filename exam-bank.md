# V19 安全考卷库（公开版）

> 公开版说明：本文件为 V19 智能体安全审计项目「每日安全考卷」库的公开快照。
> - 版本：2026-11-28 版（新增 EXAM-20261127-01 至 EXAM-20261127-05 五条、均判「未覆盖」；EXAM-20261120-05 经增刊补核改判「未核→事后覆盖」、公开日锚订正为 2026-07-08；EXAM-20261120-02／-03 来源链接错位勘误（同一错位链接）、EXAM-20261120-03 补核维持「未核」；勘误 ERR-20261117-01／ERR-20261117-02 沿用在册；EXAM-20261114-02 首公开日勘误 2026-11-13→2026-11-12（ERR-20261126-01）、EXAM-20261112-03 来源列改指一手 GHSA（ERR-20261126-02）；正文与内部正本逐字节一致，差异仅本头部注记）
> - 勘误（2026-11-17）：EXAM-20261117-01 原判「预测命中」撤销、改判「事后覆盖」（GHSA-jq3q-62jc-fqq9 首次发布日为 2026-07-06，原记 2026-11-16 系全球库收录/CVE 发布日误作首发日）；详见正本该条勘误注记。
> - 勘误二（2026-11-17，ERR-20261117-02）：EXAM-20261114-01 原判「预测命中」撤销、改判「事后覆盖」（GHSA-pj75-r769-qjv2 首次发布日为 2026-07-05，原记 2026-11-13 系 CVE 记录发布日误作首发日，与勘误一同型）；全库预测命中归零，详见正本该条勘误注记。
> - 勘误三（2026-11-20，ERR-20261120-01）：EXAM-20261120-02 所列 noroxi 来源链接错位（指向 CVE-2026-123315、公开日 2026-11-06，与本条事件 CVE-2026-133196 不符），原链接留痕保留、-02 事实依据以 JetBrains CNA 批次 CVE 记录为准；EXAM-20261120-03 所列为同一错位链接、同日补同型勘误注记（原链接留痕保留、事实依据以 CVE 记录全文实读为准、状态「未核」不受影响）；同日增刊补核：EXAM-20261120-05 改判「事后覆盖」（仓库级首发 2026-07-08、SE9 检查引入晚于公开日）、EXAM-20261120-03 维持「未核」；详见正本各条注记。
> - 勘误四（2026-11-26，ERR-20261126-01／ERR-20261126-02）：EXAM-20261114-02 首公开日由 2026-11-13 更正为 2026-11-12（原记系 CVE 记录发布日；一手源 IBM 支持页 node/7296490 载 2026-11-12；外部验证者 Steven Zhao 2026-11-26 复算指出；核验状态「事后覆盖」不变）；EXAM-20261112-03 来源列由 patchwire 镜像改指仓库级一手公告 GHSA-7m4x-rv66-mxhh 与 GHSA-p9cv-8g75-4xcg；详见正本各条勘误注记。
> - 勘误五（2026-11-27，ERR-20261126-03）：EXAM-20261125-11 所记「CVE 记录 2026-11-24T21:18:20Z 发布」系 NVD 入库时刻误植，CVE 记录 datePublished 一手值为 2026-11-24T20:52:56.616Z，已更正；公开日（2026-11-24）与核验状态（未覆盖）不变；详见正本该条勘误注记。
> - 统计时点：2026-11-28 01:23 CST
> - 条目数：66 条（EXAM-20261111-01 至 EXAM-20261127-05）
> - 核验状态分布（按条目「核验状态」字段计）：预测命中 1／事后覆盖 16／未覆盖 46／未核 3
> - 成熟度标注：数据集（持续更新中）。覆盖核验为规则覆盖级静态核验，非端到端实跑；统计深度有限，不构成统计结论。
> - 许可：CC-BY-4.0（署名 Sixu AI / V19 智能组织）
> - 源文件 sha256（内部正本）：3c9b87a369224c3ff75e10a3d7d2417fe1e632ee870e6155fd57d450c318582f

---

# V19 安全考卷库

记账规则：每条含事件与类别｜考题（可核的期望）｜标准（期望的检出方式）｜核验状态｜核验证据落点。核验状态只用四档原词：未核／预测命中／事后覆盖／未覆盖。
诚实口径（写死）：覆盖核验是规则覆盖级静态核验，不是实跑；V19 尚未端到端实跑，任何条目不得表述为「实跑通过」。「预测命中」须检查引入时点（PR 号/合并日期）早于事件公开日且证据齐备，才写入战绩表「预测中了什么」栏。
成文教训（2026-11-17 立，ERR-20261117-01／ERR-20261117-02 两度同型勘误后写死）：「公开日」一律以一手源首次发布日为准——事件在仓库级公告（如仓库 GHSA）早于全球库收录（GitHub 全球公告库／CVE 记录）公开的，以仓库级首次发布日为准；全球库收录日与 CVE 记录发布日不得作公开日。判「预测命中」前必须实读一手源首次发布时点，不得只锚全球库/CVE 日期。勘误编号体系 ERR-YYYYMMDD-NN 与《公开面维护规范》（agent-ops/public-channel-maintenance-2026-11-17.md）对齐。
库内累计（2026-11-27 正刊后）：66 条——预测命中 1／事后覆盖 16／未覆盖 46／未核 3。

---

## EXAM-20261111-01

- 事件与类别：Microsoft「Lazarus」休眠神经元权重后门（Lazare, veni foras）｜供应链｜公开日 2026-11-10（厂商博客 2026-11-10T23:00:00Z）｜来源 https://www.microsoft.com/en-us/security/blog/2026/11/10/detecting-sleeper-agents-hiding-in-ai-model-neurons/
- 考题：给定案例——模型 checkpoint 相对其声明的基座模型仅有少于 10 个神经元的权重向量大幅偏离、余部为弥散小幅变化，该模型通过全部行为评测，但上下文出现触发串时输出攻击者命令并由智能体以自身权限执行——V19 应判定为供应链完整性失败（fail），不得因行为评测通过而放行；期望 finding 引用被检 checkpoint 的权重差分证据。
- 标准：应有一条在册检查对模型工件做「与声明基座的权重差分异常检测／来源校验」并命中。现头四插件与管线校验面无此检查：管线输入模式无模型工件类型；rules.py 的插件 sha256 钉只核规则代码字节与声明哈希一致，属相邻的代码完整性面，不核模型权重。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：AI 模型供应链——第三方模型 checkpoint 的分发、下载与加载链，以及加载后以智能体权限执行的部署面｜受影响人群：模型部署方与智能体运营者（引入带后门工件）、其下游终端用户（触发串出现时命令以智能体权限执行）｜国内相关性：同型推断——国内智能体部署同样经模型仓库引入第三方 checkpoint，同型面存在；未见国内同型公开披露。
- 核验证据落点：主链现头 fbd6efc8481073f1dad415d7d791e172131cf46e（cursor/production-did-labels-e95a）下 research/audit_pipeline 经 fetch.py 实取 11 件全文检索（字节存 hidden_files/security-exam-2026-11-11/tree/）：grep weight/checkpoint/provenance 仅命中评分权重语义（nonfinite_score 的 numeric-weight-input），无模型工件检查。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-11」）。
- 复核注记（2026-11-13）：SE1 原版插件已随 PR #311 合入主链（合并提交 73cf5658、2026-11-12T12:53:37Z；现头 418efeb3 实取 plugins/model_artifact_integrity.py 8,274 B、sha256 a0ced410… 与原钉版全等），但 loop 第 77 轮在主链实跑证实其两项阻断（矛盾摘要构造仍 PASS、巨值 outliers 致 Overflow 逃逸判定），修复版 0.1.1 未合入；按 SE1 残余口径，本条状态维持「未覆盖」，修复 PR 合入后另核。
- 复核（2026-11-14，loop 第 106 轮，backlog N23 残余）：修复版已随 PR #331 合入主链（合并提交 463bf2f4f7fff7f61e42182b3be4a68af5a13630、2026-11-13T13:06:32Z，list_commits 实读；同头 harness run 43427509089 success 在协作图 loop-se1 节点在册）。主链现头 463bf2f4 实取确认 plugins/model_artifact_integrity.py 在册（VERSION 0.1.5、RULE_ID v19.supply_chain.model_artifact_integrity，14,115 B、sha256 28c9191d…）；组装闭包实跑：作者套件 37/37 通过、独立探针 16/16 与第 88 轮修复预期逐格全等（原两项阻断——矛盾摘要单神经元/全离群、巨值 Overflow 逃逸——均判 inconclusive 不逃逸；集中偏离构造判 fail 并引用差分证据、弥散变化判 pass 不误报）、负对照（0.1.0 旧插件＋新套件）14 例失败判别成立、全目录回归坏名集与基线逐名全等、acceptance 输出与基线逐字一致。检查引入时点（原版 2026-11-12、修复版 2026-11-13）均晚于事件公开日（2026-11-10），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-106/work/（fetch_main 三件、probe_main_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑。

## EXAM-20261111-02

- 事件与类别：CVE-2026-83953 GitHub Copilot for JetBrains 插件命令注入（CWE-77）｜其他（命令注入）｜公开日 2026-11-10（微软 11 月发布批）｜来源 https://theinjection.dev/items/github-copilot-jetbrains-cve-2026-83953/
- 考题：给定案例——AI 编程插件把未经中和的输入拼入本地命令，低权限本地攻击者可读取插件可达的本地信息——V19 应检出「命令构造未中和特殊元素」并判 fail，finding 须引用被检命令构造证据。
- 标准：应有一条在册检查对被审工件/展品中的命令构造与特殊元素中和做判定。现头四插件（cache 回放准入／授权索引缺失／实测零／非有限分数）均不覆盖；tests/test_command_safety.py 是管线自身 CLI 的输出安全测试、不是对案例的检查规则，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：AI 编程插件/IDE 集成（JetBrains 系 IDE 的 Copilot 类插件）命令构造面｜受影响人群：使用该插件的开发者（低权限本地攻击者可读取插件可达的本地信息，波及其代码与凭据资产）｜国内相关性：同型推断——JetBrains 系 IDE 在国内开发者人群中使用广泛，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261111-01 的现头实取面全文检索：grep subprocess/shell/allowlist/newline 在规则面仅命中 manifest 的 path_escape（路径逃逸校验）与插件的转义控制符扫描（针对证据字段、非命令构造），无命令注入检查。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-11」）。
- 复核（2026-11-13，backlog N23）：主链现头 418efeb3e9f35e2864c37f0a2729159192ab9a80 实取确认 plugins/command_injection.py 在册（RULE_ID v19.command_injection.unneutralized_construction，7,999 B、sha256 00375e26…，与 SE2 第 58 轮钉版全等），经 PR #312 合入（合并提交 7576007e、2026-11-12T10:20:43Z，list_commits 实读）；检查引入时点（2026-11-12）晚于事件公开日（2026-11-10），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/security-exam-2026-11-13/tree/plugins/command_injection.py。

## EXAM-20261111-03

- 事件与类别：CVE-2026-119990 Azure OpenAI 关键功能缺失认证（CWE-306，CVSS 9.8）｜权限越界｜公开日 2026-11-10（微软 11 月发布批）｜来源 https://theinjection.dev/items/azure-openai-missing-authentication-cve/
- 考题：给定案例——托管 AI 服务的关键功能缺失认证，未授权网络攻击者可提权——V19 应检出「关键功能无认证检查」并判 fail（权限越界），finding 须引用被检功能的认证缺失证据。
- 标准：应有一条在册检查对被审对象的认证存在性做判定。现头两条 authorization 主题规则只核「供给的授权声明」：v19.authorization.incomplete_index_negative 核索引完整性与 reported_authorized 的一致性、v19.authorization.measured_zero_normal 核 ceiling 声明表；两者文件头均明示不核目标代码或实时授权，证据模式无认证存在性字段，故不覆盖本类别。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：云端托管大模型服务 API（Azure OpenAI 类）的关键功能调用面｜受影响人群：该云服务的租户与运营者（未认证即可调用关键功能）、经其构建应用的终端用户｜国内相关性：同型推断——国内云厂商同类托管大模型 API 存在同型面（关键功能认证缺失类）；未见国内同型公开披露。
- 核验证据落点：同上现头实取面：plugins/index_absence.py 文件头「This checks supplied evidence declarations, never an index on disk, target code, or live authorization」；plugins/measured_zero_normal.py 字段集（declared_principal/ceiling_value/value_source/principal_status/undeclared_status）无认证存在性字段。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-11」）。
- 复核（2026-11-13，backlog N23）：主链现头 418efeb3e9f35e2864c37f0a2729159192ab9a80 实取确认 plugins/missing_authentication.py 在册（RULE_ID v19.authentication.missing_for_critical_function，7,774 B、sha256 cedab4c5…，与 SE3 第 59 轮钉版全等），经 PR #313 合入（合并提交 ce9e83aa、2026-11-12T10:15:55Z，list_commits 实读）；检查引入时点（2026-11-12）晚于事件公开日（2026-11-10），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/security-exam-2026-11-13/tree/plugins/missing_authentication.py。

## EXAM-20261112-01

- 事件与类别：CVE-2026-100307 Amazon mcp-gateway-registry 外部管理 API 缺失授权｜权限越界｜公开日 2026-11-11（AWS 披露，受影响版本 1.0.9–1.24.7）｜来源 https://www.itsecuritynews.info/it-security-news-roundup-2026-11-11-evening/
- 考题：给定案例——已认证的普通用户经外部管理 API 给自己赋予 registry 管理员 scope 并接管全部已注册网关资产，被审对象的授权强制在该操作上缺失——V19 应判定为权限越界失败（fail），不得因调用方已认证而放行；期望 finding 引用被检管理操作的授权缺失证据。
- 标准：应有一条在册检查对被审对象的「管理操作授权强制／scope 授予不可自赋」做判定。现头两条 authorization 主题规则只核供给的授权声明（v19.authorization.incomplete_index_negative 核索引完整性与 reported_authorized 一致性、字段集仅 index_complete/reported_authorized；v19.authorization.measured_zero_normal 核 ceiling 声明表），文件头明示不核目标代码或实时授权，证据模式无管理操作授权字段；本地已建未合入的 SE3 检查核的是关键功能认证「存在性」（authentication），与本件的已认证后授权自赋（authorization）不是同一缺陷，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 网关注册表/网关资产管理面（外部管理 API）｜受影响人群：网关运营者（普通已认证用户可自赋管理员 scope 接管全部网关资产）、经网关接入的工具提供方｜国内相关性：同型推断——国内 MCP 网关与注册类部署存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 61abb0d27892f054e725da4094e0bddc4d3645aa（cursor/production-did-labels-e95a）下 research/audit_pipeline 经 fetch.py 实取 11 件全文检索（字节存 hidden_files/security-exam-2026-11-12/tree/）：grep scope/administrator/self-assign 在插件与 rules.py/contract.py/evidence.py 中无管理授权命中（仅有 inconclusive 理由串中的 scope 词）；plugins/index_absence.py 字段集与文件头自述如上。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-12」，SE4）。
- 复核（2026-11-14，loop 第 107 轮，backlog N31）：SE4 检查已随 PR #327 合入主链（落地提交 cb16d21e、2026-11-12T19:26:47Z；合并提交 d8ebc5593f4a5202d9836ee6999aed84824b1fb1、2026-11-13T07:08:13Z，list_commits 实读）。主链现头 463bf2f4 实取确认 plugins/missing_authorization.py 在册（VERSION 0.1.0、RULE_ID v19.authorization.missing_for_management_operation，8,741 B、sha256 0ceca36c…，与 SE4 第 72 轮钉版逐字节全等；套件 9,086 B 4303b31c…、文档 4,736 B b83bfda1… 同全等）；组装闭包实跑：作者套件 17/17 通过、独立探针 16/16 合预期（管理操作授权 absent 判 fail 并引用操作证据、可自赋 scope 判 fail、强制完备三机制判 pass 不误报、未检视/证据缺失/枚举非法/状态机制矛盾均判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（self_assignable fail→pass）恰红 1、全目录回归坏名集与第 106 轮基线逐名全等、acceptance 输出与基线逐字一致。检查引入时点（2026-11-12/13）晚于事件公开日（2026-11-11），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-107/work/（fetch_main 三件、probe_new_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视操作摘要、不解析目标源码、不探活服务。

## EXAM-20261112-02

- 事件与类别：CVE-2026-125926 Amazon mcp-gateway-registry 服务器注册/更新 API SSRF｜其他（SSRF）｜公开日 2026-11-11（AWS 公告 2026-180-AWS，11/11/2026 13:00 PST；受影响 >=1.0.3 且 <=1.34.0，1.35.0 修复）｜来源 https://www.itsecuritynews.info/cve-2026-125926-server-side-request-forgery-in-the-server-registration-and-update-api-in-mcp-gateway-registry/
- 考题：给定案例——已认证远程用户经服务器注册/更新 API 提交构造请求，使网关服务端向内网服务与云实例元数据端点发请求并把响应读回——V19 应检出「服务端按调用方指定目标发起请求且无目标约束」并判 fail，finding 须引用被检请求目标证据。
- 标准：应有一条在册检查对被审对象的出站请求目标约束（内网/元数据端点拦截或目标 allowlist）做判定。现头四插件无一涉及出站请求或 URL 目标；管线校验面全文检索 ssrf/urllib/requests/http.client/169.254 零命中（metadata 仅命中 contract.py 的失败缓冲元数据常量，与网络无关）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：MCP 网关注册服务（服务器注册/更新 API）的出站请求面，及其可达的内网服务与云实例元数据端点｜受影响人群：网关运营者、与网关同云/同内网部署的其他租户（内网响应可被读回）｜国内相关性：同型推断——国内 MCP 网关部署若开放注册/更新类 API，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261112-01 的现头实取面全文检索（hidden_files/security-exam-2026-11-12/tree/）：上述关键词在 11 件中除 contract.py 缓冲元数据常量外无命中；四插件 RULE_ID 清单（cache/authorization×2/numeric）无网络面规则。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-12」，SE5）。

## EXAM-20261112-03

- 事件与类别：MCP 参考服务器 @modelcontextprotocol/server-filesystem 校验后符号链接交换竞态（GHSA-7m4x-rv66-mxhh move_file 源路径未钉住／GHSA-p9cv-8g75-4xcg read_text_file 校验后符号链接交换，同批发布合并为一条）｜沙箱逃逸｜公开日 2026-11-11（维护者公告 07:24/07:28 UTC；受影响 <2.3.0 及日期版 <=2026.8.31，2.3.0 修复）｜来源 https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-7m4x-rv66-mxhh 与 https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-p9cv-8g75-4xcg（原指 patchwire 镜像，勘误 ERR-20261126-02 改指一手公告）
- 考题：给定案例——文件工具先校验路径落在 allowedDirectories 内、随后使用时不钉住已校验对象，本地进程在校验与使用之间把父目录换成外指符号链接，读/移操作最终落在允许目录之外——V19 应检出「校验与使用非同一对象（check/use 竞态）致目录边界逃逸」并判 fail，finding 须引用被检路径处理证据；校验后钉住同一描述符/实路径的构造应不误报。
- 标准：应有一条在册检查对被审案例的路径校验—使用一致性做判定。现头四插件无路径处理主题；管线自身读取面确有同族自护（manifest.py 单 fd O_NOFOLLOW 有界读、rules.py realpath 钉住、manifest/pipeline 拒绝符号链接），但那是管线保护自身输入的机制、不是对被审案例作判定的检查规则，按 EXAM-20261111-02 对 test_command_safety 的同一口径不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 参考文件系统服务器（server-filesystem 类）的智能体文件访问面｜受影响人群：部署该服务器的智能体运营者（allowedDirectories 外文件可被读出/移入）、其主机上的数据主体｜国内相关性：同型推断——该参考服务器在国内智能体开发中常被用作文件访问模板，同型面存在；未见国内同型公开披露。
- 核验证据落点：同上现头实取面全文检索：symlink/realpath/NOFOLLOW 命中全部落在 manifest.py、rules.py、pipeline.py、acceptance.py 与 cache_replay_admission.py 的管线自护代码（拒绝/钉住管线自己的文件），四插件字段集无路径校验—使用一致性字段、无对应 RULE_ID。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-12」，SE6）。
- 复核（2026-11-17，loop 第 189 轮，backlog SE6）：SE6 检查已随 PR #333 合入主链（合并提交 3602900291157218133626b475f69d175bffc54a、2026-11-17T03:04:01Z，list_commits 实读；批准依据 DEC-20261117-W001）。主链现头 cf0c293709134df2879ac5b671ebe5ad9fdde4f7 实取确认 plugins/path_validation_pinning.py 在册（RULE_ID v19.filesystem.path_validation_without_pinning，9,797 B、sha256 e72499c2…，与 SE6 第 80 轮钉版逐字节全等；套件 9,831 B cf8c10eb…、文档 5,548 B 46dc83d9… 同全等）；组装闭包实跑：作者套件 18/18 通过、独立探针 18 命名格＋B 组 24 格全枚举与第 90/175 轮逐格全等（GHSA 未钉住重开格判 fail 并引用路径证据、钉住同一对象判 pass 不误报、未校验/证据缺失判 inconclusive 不冒充、判定步 8 出现 0 次）、负对照（删插件）收集期 1 ERROR 判别成立、突变（fail→pass）恰红 5 条、全目录回归 Ran 961→979（恰 +18）坏名集 7 名逐名全等、acceptance 两树逐字一致。检查引入时点（2026-11-17 合入）晚于事件公开日 2026-11-11，故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-189/work/（fetch_main 三件、probe_main_out.json、se6/discover/acc 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视操作摘要、不解析目标源码、不打开目标文件系统、不观察实际操作。
- 勘误（2026-11-26，ERR-20261126-02）：本条「事件与类别」行来源列原指 patchwire 镜像（https://patchwire.monowire.dev/alerts/GHSA-7m4x-rv66-mxhh 与 https://patchwire.monowire.dev/alerts/GHSA-p9cv-8g75-4xcg），系镜像而非一手源；已改指仓库级一手公告 https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-7m4x-rv66-mxhh 与 https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-p9cv-8g75-4xcg（事件行原已列两 GHSA 编号、仅来源列滞后）。外部验证者 Steven Zhao 2026-11-26 独立复算指出（其自述今晨自其网络两次未能打开 GHSA 页、仅指出引用应指一手，不作链接失效断言）。本条核验状态（事后覆盖）与公开日（2026-11-11）不因本勘误变更。

## EXAM-20261113-01

- 事件与类别：CVE-2026-123139 Opera Neon MCP Hub 通信通道来源未验证（CWE-940，GHSA-2f45-6797-cj93）｜权限越界｜公开日 2026-11-12（Opera 厂商公告，GitHub Advisory Database 同日收录）｜来源 https://security.opera.com/en/improper-verification-of-source-of-a-communication-channel-opera-security-advisories/
- 考题：给定案例——智能体浏览器的命令通道（MCP Hub）不验证命令发送方身份，同一浏览器内已安装的任意扩展都能冒充合法 MCP 客户端、向内置 Browser Operator 发命令并接管实时浏览会话——V19 应判定为通道来源验证失败（fail），不得因发送方「在浏览器内部」而放行；期望 finding 引用被检通道的来源验证证据；通道对发送方身份做验证且未验证来源被拒的构造应不误报。
- 标准：应有一条在册检查对被审对象的「工具/命令通道发送方身份验证」做判定。现头 7 插件无一涉及命令通道来源：全文检索 extension/channel/sender/origin 在 14 件实取面零命中（origin 仅无关词面）；相邻的 v19.authentication.missing_for_critical_function 核的是关键功能的认证存在性、不是通道内发送方冒充，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：AI 浏览器内置 MCP Hub 与浏览器操作员（Browser Operator 类）的命令通道｜受影响人群：该浏览器用户（同浏览器内任意已安装扩展可冒充 MCP 客户端接管会话）、其登录态与会话资产｜国内相关性：同型推断——国内 AI 浏览器与 MCP 客户端的通道来源验证同型面存在；本产品国内用户面较小，未见国内同型公开披露。
- 核验证据落点：主链现头 418efeb3e9f35e2864c37f0a2729159192ab9a80（cursor/production-did-labels-e95a）下 research/audit_pipeline 经 fetch.py 实取 14 件全文检索（字节存 hidden_files/security-exam-2026-11-13/tree/）：上述关键词零命中，7 插件 RULE_ID 清单无通道来源主题。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-13」，SE8）。
- 复核（2026-11-15，loop 第 137 轮，backlog N44）：SE8 检查已随 PR #351 合入主链（合并提交 f7d3382e7d23707b5f07c81baaf6700668576119、2026-11-14T23:52:35Z，list_commits 实读）。主链现头 09b708943e12c641d5a57fa8087ff979f4be78ab 实取确认 plugins/channel_sender_verification.py 在册（RULE_ID v19.channel.unverified_command_sender，9,741 B、sha256 8a73e03a…，与 SE8 第 97 轮钉版逐字节全等；套件 10,964 B 39e679d3…、文档 5,597 B a9ff9498… 同全等）；组装闭包实跑：作者套件 23/23 通过、独立探针 12/12 合预期（absent 本体格判 fail 并引用来源验证证据、verified∧accepted 判 fail、verified∧rejected 判 pass 不误报、四 unknown 与两矛盾格及未检视来源格判 inconclusive 不冒充）、全枚举 864 格 fail 54／pass 36／inconclusive 774 与第 96 轮冻结原型逐项全等、负对照（删插件）收集期 1 ERROR 判别成立、突变（absent fail→pass）恰红 5 条记录、全目录回归 Ran 823/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-14 合入）晚于事件公开日（2026-11-12），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-137/work/（fetch_main 三件、probe_se8_out.json、probe_enum_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视通道摘要、不解析目标源码、不探活通道。

## EXAM-20261113-02

- 事件与类别：CVE-2026-126197 pgEdge Postgres MCP Server 自定义 pl-do 工具参数 SQL 注入（CWE-89，GHSA-r5pp-jx86-r6r9）｜其他（SQL 注入）｜公开日 2026-11-12（CVE 记录 2026-11-12T18:17:24Z 发布；受影响 <1.1.0、1.1.0 修复）｜来源 https://github.com/pgEdge/pgedge-postgres-mcp/security/advisories/GHSA-r5pp-jx86-r6r9
- 考题：给定案例——MCP 工具把调用方 JSON 参数以固定分隔标签（dollar-quote）插值拼入 SQL DO 块且不校验参数是否含该标签，参数可闭合 DO 块、注入任意 SQL 语句并绕过 read_only、以连接角色权限读写——V19 应检出「参数插值进 SQL 构造且分隔符/特殊元素未中和」并判 fail，finding 须引用被检 SQL 构造证据；参数走绑定参数（bind parameters）传递的构造应不误报。
- 标准：应有一条在册检查对被审对象的 SQL 构造参数中和/绑定做判定。现头全文检索 sql/postgres/statement 在 14 件实取面零命中；相邻的 v19.command_injection.unneutralized_construction 只判 shell 命令构造（字段集 execution_mode=shell_string/argv_list、executable_id），其证据模式装不下 SQL 插值构造，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 数据库服务器（Postgres 类）的自定义工具 SQL 构造面及其连接的业务数据库｜受影响人群：数据库运营者与数据主体（参数可闭合构造块注入任意 SQL、绕过只读预期）｜国内相关性：同型推断——国内 MCP 数据库连接器类产品存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261113-01 的现头实取面全文检索（hidden_files/security-exam-2026-11-13/tree/）：sql 相关关键词零命中；plugins/command_injection.py 文件头与字段集自述限于 command construction（shell string/argv list）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-13」，SE9）。
- 复核（2026-11-15，loop 第 138 轮，backlog N45）：SE9 检查已随 PR #352 合入主链（合并提交 8e6a3bf887e7a0a71afe4dab550d75bba137ca34、2026-11-15T00:17:33Z，list_commits 实读）。主链现头 71baeecbfce9b0146fcf0e4805753fe26f66c94a 实取确认 plugins/sql_construction_neutralization.py 在册（RULE_ID v19.sql_injection.unneutralized_parameter_interpolation，9,983 B、sha256 261e69d9…，与 SE9 第 100 轮钉版逐字节全等；套件 10,608 B 8e971a99…、文档 5,888 B 07f52725… 同全等）；组装闭包实跑：作者套件 22/22 通过、独立探针 12/12 合预期（CVE 分隔符格与无中和格判 fail 并引用 SQL 构造证据、绑定参数格判 pass 不误报、矛盾与四 unknown 格判 inconclusive 不冒充）、全枚举 288 格 fail 6／pass 60／inconclusive 222 与第 99 轮冻结原型逐项全等、负对照（删插件）收集期 1 ERROR 判别成立、突变（delimiter fail→pass）恰红 2 条、全目录回归 Ran 856/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-15 合入）晚于事件公开日（2026-11-12），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-138/work/（fetch_main 三件、probe_se9_out.json、probe_enum_se9_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视 SQL 构造摘要、不解析目标源码、不连数据库、不执行 SQL。

## EXAM-20261113-03

- 事件与类别：CVE-2026-126196 pgEdge Postgres MCP Server query_database 语句走私绕过 read_only（CWE-89/CWE-693，GHSA-j7mp-839j-jrm7）｜权限越界｜公开日 2026-11-12（CVE 记录 2026-11-12T18:17:24Z 发布；受影响 <1.1.0、1.1.0 修复）｜来源 https://github.com/pgEdge/pgedge-postgres-mcp/security/advisories/GHSA-j7mp-839j-jrm7
- 考题：给定案例——工具声称 read_only 边界，但未识别语句走无绑定参数的简单查询协议、一次请求可塞多条分号分隔语句，调用方结合事务/会话状态变更即可写库，且连接池会话状态可使后续调用保持可写——V19 应检出「只读/权限边界的强制可被多语句走私绕过」并判 fail，finding 须引用被检边界强制证据；单语句协议＋写模式语句拒收＋会话状态回池复位的构造应不误报。
- 标准：应有一条在册检查对被审对象的「声明边界（只读/限权）的实际强制完整性——多语句/状态变更通道是否被关死」做判定。现头全文检索 read_only/readonly 在 14 件实取面零命中；两条 authorization 规则只核供给的授权声明、missing_authentication 只核关键功能认证存在性，均不核边界强制面，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 数据库服务器（Postgres 类）声明只读连接的语句执行面与连接池会话状态｜受影响人群：以只读预期接入的运营者与数据主体（多语句走私可写库、后续调用可保持可写）｜国内相关性：同型推断——国内同类只读数据库访问面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261113-01 的现头实取面全文检索（hidden_files/security-exam-2026-11-13/tree/）：read_only 相关关键词零命中，7 插件无边界强制主题。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-13」，SE10）。
- 复核（2026-11-15，loop 第 138 轮，backlog N45）：SE10 检查已随 PR #353 合入主链（合并提交 09b708943e12c641d5a57fa8087ff979f4be78ab、2026-11-15T00:46:21Z，list_commits 实读）。主链现头 71baeecbfce9b0146fcf0e4805753fe26f66c94a 实取确认 plugins/statement_boundary_enforcement.py 在册（RULE_ID v19.boundary.declared_statement_boundary_not_enforced，11,084 B、sha256 3f3ad55d…，与 SE10 第 102 轮钉版逐字节全等；套件 11,472 B 620056d4…、文档 6,672 B 39ff2e3a… 同全等）；组装闭包实跑：作者套件 25/25 通过、独立探针 16/16 合预期（CVE 未识别语句格与多语句走私格判 fail 并引用边界强制证据、单语句＋拒收＋会话复位构造判 pass 不误报、五 unknown 与两一致性格及未检视来源格判 inconclusive 不冒充）、全枚举 432 格 fail 30／pass 10／inconclusive 392 与第 101 轮冻结原型逐项全等、负对照（删插件）收集期 1 ERROR 判别成立、突变（multi_statement fail→pass）恰红 3 条、全目录回归 Ran 856/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-15 合入）晚于事件公开日（2026-11-12），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-138/work/（fetch_main 三件、probe_se10_out.json、probe_enum_se10_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视边界强制摘要、不解析目标源码、不连数据库、不执行语句、不探活连接池。

## EXAM-20261114-01

- 事件与类别：CVE-2026-68905 Hugo Blog 未认证 AI 代理滥用服务端 API 密钥（CWE-306，GHSA-pj75-r769-qjv2）｜权限越界｜公开日 2026-11-13（CVE 记录 2026-11-13T19:21:26Z 发布）｜来源 https://github.com/lanshi17/hugo_blog/security/advisories/GHSA-pj75-r769-qjv2
- 考题：给定案例——AI 助手代理把三个端点（POST /api/blog-assistant、/api/blog-search-embedding、/api/blog-search-rerank）以运营方服务端 API 密钥转发上游 LLM/embedding/rerank 接口、且端点无任何认证检查，未认证远程调用方即可无限消耗运营方配额——V19 应判定为关键功能缺失认证失败（fail），不得因端点「只是代理转发」而放行；期望 finding 引用被检端点的认证缺失证据；端点认证存在（present）的构造应不误报，认证证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的认证存在性做判定。现头在册 v19.authentication.missing_for_critical_function（plugins/missing_authentication.py，VERSION 0.1.0）正是此检查：已检视摘要中关键功能＋exposure internet/internal_network＋authentication_status absent＋method none 判 fail（missing_authentication_for_critical_function），字段集（function_id/endpoint_id/criticality/exposure/authentication_status/authentication_method/inspection_source）装得下本案例的端点级摘要；本案例端点以服务端密钥行使付费上游调用、属关键功能口径与 EXAM-20261111-03（Azure OpenAI CWE-306）同型。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：个人博客站点（Hugo Blog 类）的 AI 代理功能与服务端托管的上游 API 密钥｜受影响人群：站点运营者（未认证者可滥用其服务端 API 密钥、产生费用与滥用风险）、站点访客｜国内相关性：同型推断——国内个人站点与博客的 AI 功能同型面存在、单体规模较小；未见国内同型公开披露。
- 核验证据落点：主链现头 0f56f92b4f8288fa2ffc8ad2ab324861c2cb1656（cursor/production-did-labels-e95a）下经连接器实取 plugins/missing_authentication.py 在册（7,774 B、sha256 cedab4c5…，与 SE3 第 59 轮钉版全等，字节存 hidden_files/security-exam-2026-11-14/tree/plugins/）；检查引入时点＝PR #313 合入（合并提交 ce9e83aa、2026-11-12T10:15:55Z，见本库 EXAM-20261111-03 复核注记），早于事件公开日 2026-11-13；事件来源＝GHSA-pj75-r769-qjv2／CVE 记录 2026-11-13T19:21:26Z。已写入战绩表「预测中了什么」栏（2026-11-14 条）。诚实口径不变：此为规则覆盖级静态核验（在册检查＋字段/判定口径对表），非实跑。
- 勘误（2026-11-17，ERR-20261117-02）：原判「预测命中」撤销，改判「事后覆盖」。依据：本条原记公开日 2026-11-13 系 CVE 记录发布日（datePublished 2026-11-13T19:21:26.887Z），并非首次公开日；仓库级 GHSA 官方页（lanshi17/hugo_blog，GHSA-pj75-r769-qjv2）首次发布为 2026-07-05（仓库 advisory API 实读 published_at 2026-07-05T09:12:20Z、updated_at 2026-08-03T12:33:02Z）。与 EXAM-20261117-01（ERR-20261117-01）同型错误：只锚全球库/CVE 日期、漏了早约 4 个月的仓库级首发。统筹 2026-11-17 独立查一手源（CVE 官方记录＋仓库级 GHSA API）复核坐实。检查引入时点（PR #313 合入、2026-11-12T10:15:55Z）晚于首次公开日 2026-07-05，按本库写死规则（引入时点早于事件公开日方记「预测命中」），原判不成立、改判「事后覆盖」；战绩表 2026-11-14 条该行同步标撤销。库内汇总计数随本条更正：预测命中 1→0、事后覆盖 14→15（未覆盖 9 不变），全库预测命中归零。上方原记文字不删，以本注记为准。

## EXAM-20261114-02

- 事件与类别：CVE-2026-110279 IBM ContextForge MCP Gateway 上游凭据被调用方请求头覆盖（CWE-287）｜权限越界｜公开日 2026-11-12（IBM 支持页 node/7296490 所载一手公开日；原记 2026-11-13 系 CVE 记录发布日，勘误 ERR-20261126-01）｜来源 https://www.ibm.com/support/pages/node/7296490
- 考题：给定案例——网关始终把调用方 X-Upstream-Authorization 请求头改名为 Authorization 转发上游，已认证用户可替换网关托管的上游凭据、使上游请求以另一凭据发出并绕过逐用户权限与审计归属——V19 应检出「网关托管凭据可被调用方供给值覆盖」并判 fail，finding 须引用被检凭据处理证据；调用方供给的凭据头被剥离/忽略、只用网关托管凭据的构造应不误报。
- 标准：应有一条在册检查对被审对象的「上游凭据来源不可被调用方覆盖」做判定。现头 10 插件无此检查：全文检索 credential/override 在实取面零命中（header 仅命中各插件的展品头格式校验）；相邻的 v19.authentication.missing_for_critical_function 核的是认证「存在性」（absent 才 fail），本件认证存在、缺陷在覆盖，不计覆盖；v19.authorization.missing_for_management_operation 核管理操作授权强制，亦装不下凭据覆盖面。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的托管上游凭据处理面｜受影响人群：网关运营者与逐用户权限主体（调用方请求头可替换托管凭据、绕过逐用户权限与审计归属）、上游服务提供方｜国内相关性：同型推断——国内 MCP 网关类产品存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 0f56f92b4f8288fa2ffc8ad2ab324861c2cb1656 下 research/audit_pipeline 经连接器实取 15 件全文检索（字节存 hidden_files/security-exam-2026-11-14/tree/）：10 插件 RULE_ID 清单无凭据处理主题，上述关键词零命中。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE11）。
- 复核（2026-11-15，loop 第 136 轮，backlog N43）：SE11 检查已随 PR #365 合入主链（落地提交 70e497a3552f873d9815b266535416185647d4f5、2026-11-14T10:06:37Z；合并提交 f3503e5f25ceef7ed508d42fde97c093f1941374、2026-11-14T14:28:28Z，list_commits 实读）。主链现头 f7d3382e 实取确认 plugins/gateway_credential_override.py 在册（RULE_ID v19.gateway.caller_overridable_managed_credential，11,206 B、sha256 c6223c92…，与 SE11 第 118 轮钉版逐字节全等；套件 11,571 B 7dce106a…、文档 7,011 B d0b00292… 同全等）；组装闭包实跑：作者套件 25/25 通过、独立探针 12/12 合预期（renamed 改名转发本体格判 fail 并引用凭据处理证据、forwarded 判 fail、stripped＋managed_only 判 pass 不误报、absent 判 pass、三 unknown 与两一致性矛盾格判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（renamed fail→pass）恰红 5 条记录、全目录回归 Ran 776/坏名集 64 与基线逐名全等、acceptance 输出与基线逐字一致。检查引入时点（2026-11-14）晚于事件公开日（2026-11-13），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-136/work/（fetch_main 三件、probe_se11_out.txt、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视凭据处理摘要、不解析目标源码、不探活网关、不发凭据请求。
- 勘误（2026-11-26，ERR-20261126-01）：本条首公开日原记 2026-11-13 系 CVE 记录发布日（datePublished 2026-11-13T21:43:43Z），并非一手源首次公开日；一手源 IBM 支持页（https://www.ibm.com/support/pages/node/7296490）所载为 2026-11-12。外部验证者 Steven Zhao 2026-11-26 独立复算（自选五条首公开日核对）指出，「事件与类别」行公开日已更正为 2026-11-12 并注明依据。与 ERR-20261117-01／ERR-20261117-02 同型错误（只锚 CVE 日期、未以一手源为准），适用本库卷首写死口径。核验状态不因本勘误变更：覆盖检查引入时点（2026-11-14 合入）晚于更正后公开日（2026-11-12），仍判「事后覆盖」，全库汇总计数不变。

## EXAM-20261114-03

- 事件与类别：CVE-2026-110195＋CVE-2026-110178 IBM ContextForge MCP Gateway 授权强制 specificity 不足绕过（CWE-287／CWE-284，同批发布合并为一条）｜权限越界｜公开日 2026-11-13（CVE 记录 2026-11-13T21:43:18Z／21:44:00Z 发布）｜来源 https://www.ibm.com/support/pages/node/7296695 与 https://www.ibm.com/support/pages/node/7296701
- 考题：给定案例——授权强制存在但键/范围不够具体：①token 交换缓存键未绑足凭据维度，同一用户的缓存上游 token 可跨其不同凭据复用、绕过凭据级授权策略；②批量导入只核 team 级权限、不核被改对象的租户归属，持 admin.import 者可覆写他租户公开工具/资源/提示的端点与凭据——V19 应检出「授权强制的键/范围 specificity 不足」并判 fail，finding 须引用被检缓存键/导入范围证据；缓存键绑定完整凭据维度、导入按对象归属逐项核权的构造应不误报。
- 标准：应有一条在册检查对被审对象的「授权缓存键 specificity／跨租户对象级范围核权」做判定。现头无此检查：v19.authorization.missing_for_management_operation 只判授权 absent 与 scope 可自赋两格，本两件均为 enforced 但 specificity 不足、按其判定序会 pass，不计覆盖；v19.cache.unversioned_replay 判的是审计报告缓存的版本绑定（字段集 cache_entry_version_field/served_idempotent/分数面），与上游 token 缓存键无关，不计覆盖；全文检索 tenant 在插件面零命中。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的 token 交换缓存键与批量导入授权面｜受影响人群：多租户网关的各租户（缓存 token 跨凭据复用、他租户工具/资源/提示可被覆写）、网关运营者｜国内相关性：同型推断——国内多租户 MCP 网关部署存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）：missing_authorization.py 判定序与 cache_replay_admission.py 文件头/字段集自述如上。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE12）。
- 复核（2026-11-15，loop 第 136 轮，backlog N43）：SE12 检查已随 PR #364 合入主链（落地提交 e98f2055284535d41593195cd931a8fb83f6ba59、2026-11-14T10:04:50Z；合并提交 fb5a7cd6f18bf98bd42de43e95b1f8a1b032c1bf、2026-11-14T16:44:38Z，list_commits 实读）。主链现头 f7d3382e 实取确认 plugins/authorization_specificity.py 在册（RULE_ID v19.authorization.insufficient_enforcement_specificity，10,822 B、sha256 9ff8a0bf…，与 SE12 第 120 轮钉版逐字节全等；套件 10,696 B 21896293…、文档 6,720 B 201d9d0f… 同全等）；组装闭包实跑：作者套件 25/25 通过、独立探针 16/16 合预期（缓存键 user_only 本体格判 fail 并引用键证据、partial 判 fail、full 判 pass 不误报；导入面 team_level_only 本体格判 fail、none 判 fail、per-object 判 pass；unknown/跨面污染/not_applicable 矛盾格判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（user_only fail→pass）恰红 3 条记录、全目录回归 Ran 776/坏名集 64 与基线逐名全等、acceptance 输出与基线逐字一致。检查引入时点（2026-11-14）晚于事件公开日（2026-11-13），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-136/work/（fetch_main 三件、probe_se12_out.txt、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视 specificity 摘要、不解析目标源码、不探活网关、不执行 token 交换/批量导入。

## EXAM-20261114-04

- 事件与类别：CVE-2026-110278 IBM ContextForge MCP Gateway 身份传播声明可重放／敏感身份信息暴露给第三方 MCP 服务器（CWE-294）｜数据泄露｜公开日 2026-11-13（CVE 记录 2026-11-13T21:43:09Z 发布）｜来源 https://www.ibm.com/support/pages/node/7296489
- 考题：给定案例——网关向第三方 MCP 服务器传播身份时使用静态签名载荷且工具调用时缺逐网关配置检查，攻击者可重放身份传播声明签名、或使敏感用户身份信息被暴露给第三方服务器——V19 应检出「身份声明可重放／身份信息向非预期接收方暴露」并判 fail，finding 须引用被检身份传播证据；签名载荷绑一次性/时效与逐网关检查完备的构造应不误报。
- 标准：应有一条在册检查对被审对象的「身份声明防重放／身份信息暴露面」做判定。现头 10 插件无此主题：全文检索 replay 仅命中 v19.cache.unversioned_replay（审计报告缓存回放准入，与身份声明无关）、exposure 仅命中 missing_authentication 的 exposure 字段（网络暴露面枚举，非信息暴露判定），均不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的身份声明传播面与第三方 MCP 服务器接收面｜受影响人群：被传播身份的用户（静态声明可被重放、敏感身份信息可暴露给第三方服务器）、网关运营者｜国内相关性：同型推断——国内智能体网关的身份传播设计存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE13）。
- 复核（2026-11-15，loop 第 146 轮，backlog N52）：SE13 检查已随 PR #371 合入主链（合并提交 7d81581b516fae8b1fc4a5aa21a664278940dbe1、2026-11-15T07:12:34Z，list_commits 实读）。主链现头 9ad4cbe978afd63006fc7b61ded6bd1464cee2f5 实取确认 plugins/identity_assertion_propagation.py 在册（RULE_ID v19.identity.unchecked_assertion_propagation，10,099 B、sha256 92faa3a0…，与 SE13 第 122 轮钉版逐字节全等；套件 11,117 B 43b2524c…、文档 6,217 B 89a9829f… 同全等）；组装闭包实跑：作者套件 25/25 通过、全枚举 81 格 fail 14／pass 2／inconclusive 65 与第 121 轮冻结原型逐格全等失配 0（静态可重放载荷判 fail 并引用身份传播证据、绑一次性/时效＋逐接收方检查＋最小披露＋预期接收方判 pass 不误报、证据缺失判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（static_reusable fail→pass）恰红 3 条、全目录回归 Ran 928/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-15 合入）晚于事件公开日（2026-11-13），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-146/work/（fetch_main 三件、probe_se13_out.txt、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视身份传播摘要、不解析目标源码、不探活网关、不实际重放声明。

## EXAM-20261114-05

- 事件与类别：CVE-2026-110194 IBM ContextForge MCP Gateway SSRF（CWE-918）｜其他（SSRF）｜公开日 2026-11-13（CVE 记录 2026-11-13T21:44:24Z 发布）｜来源 https://www.ibm.com/support/pages/node/7296696
- 考题：给定案例——已认证攻击者可使 MCP 网关系统向未授权目标发出请求（厂商描述未给具体端点与目标约束细节）——V19 应检出「服务端按调用方影响的目标发起请求且无目标约束」并判 fail，finding 须引用被检请求目标证据；带目标 allowlist/内网拦截的构造应不误报。
- 标准：应有一条在册检查对被审对象的出站请求目标约束做判定，即 EXAM-20261112-02 的 SE5 检查（v19.network.ssrf_unconstrained_egress）。该检查至今未合入主链：现头 10 插件无 ssrf_egress.py（实取插件清单坐实），其落地 PR #332 仍未合并；相邻的 v19.outbound.trace_policy_consistency（SE7）按 backlog N25 既定归属自述不担 SSRF 覆盖、不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的出站请求面及其可达内网/云元数据端点｜受影响人群：网关运营者、与网关同网部署的其他系统与租户｜国内相关性：同型推断——国内 MCP 网关部署存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面（hidden_files/security-exam-2026-11-14/tree/plugins/ 清单无 ssrf_egress.py）。缺口与 EXAM-20261112-02 同一缺口、已在 loop backlog 在队区 SE5，本条不重复入队，仅在 SE5 条下补记本事件为新增同型实证。

## EXAM-20261114-06

- 事件与类别：CVE-2026-94407＋CVE-2026-110189 IBM ContextForge MCP Gateway 守卫名单不完整致拒绝服务（CWE-1333／CWE-184，同批发布合并为一条）｜其他（拒绝服务）｜公开日 2026-11-13（CVE 记录 2026-11-13T21:43:35Z／21:43:26Z 发布）｜来源 https://www.ibm.com/support/pages/node/7296667 与 https://www.ibm.com/support/pages/node/7296697
- 考题：给定案例——网关对用户供给的可执行模式/过滤器只做名单式守卫且名单不完整：①工具 JSON Schema 的 pattern 字段可嵌入灾难性回溯正则、参数校验时无界耗 CPU；②jq jsonpath_filter 的禁用名单漏 halt/halt_error/无界循环内建函数，可终止 worker 或持续耗资源——V19 应检出「用户供给模式/过滤器的守卫完整性不足（危险构造未被拒且无复杂度/资源上限）」并判 fail，finding 须引用被检守卫证据；守卫完备且带复杂度/执行上限的构造应不误报。
- 标准：应有一条在册检查对被审对象的「用户供给模式/过滤器守卫完整性＋资源上限」做判定。现头 10 插件无此主题：全文检索 regex/jq/halt/denial 在实取面零命中；各插件自身的输入字节上限是管线自护、不是对被审案例的判定，按 EXAM-20261112-03 同一口径不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的工具 JSON Schema pattern 与 jq 过滤器守卫执行面｜受影响人群：网关运营者与全部经网关调用的终端用户（灾难性回溯/无界循环致服务拒绝）｜国内相关性：同型推断——国内采用名单式守卫的用户供给模式/过滤器面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE14）。
- 复核（2026-11-15，loop 第 146 轮，backlog N52）：SE14 检查已随 PR #369 合入主链（合并提交 abc0e3dd1e5c61a407a645c277561d5a47709d89、2026-11-15T06:22:33Z，list_commits 实读）。主链现头 9ad4cbe978afd63006fc7b61ded6bd1464cee2f5 实取确认 plugins/supplied_pattern_filter_guard.py 在册（RULE_ID v19.guard.user_supplied_pattern_filter_incomplete_guard，10,605 B、sha256 bf181a86…，与 SE14 第 125 轮钉版逐字节全等；套件 11,620 B ebfbfdfa…、文档 6,568 B 223c384a… 同全等）；组装闭包实跑：作者套件 26/26 通过、全枚举 108 格 fail 10／pass 2／inconclusive 96 与第 123 轮冻结原型逐格全等失配 0（危险构造被不完整名单守卫放行判 fail 并引用守卫证据、守卫完备＋资源上限判 pass 不误报、证据缺失判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（at_least_one_allowed fail→pass）恰红 4 条、全目录回归 Ran 928/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-15 合入）晚于事件公开日（2026-11-13），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-146/work/（fetch_main 三件、probe_se14_out.txt、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视模式/过滤器守卫摘要、不解析目标源码、不执行供给模式。

## EXAM-20261114-07

- 事件与类别：CVE-2026-127214 Flowise Custom Function 沙箱 SSRF 保护绕过（CWE-918）｜其他（SSRF）｜公开日 2026-11-13（CVE 记录 2026-11-13T19:27:24Z 发布）｜来源 https://github.com/soovwv/cve/blob/main/research/flowise-ssrf-bypass-via-subpath-import.md
- 考题：给定案例——已认证攻击者以 allowlist 包的子路径 require 模块（axios/dist/node/axios.cjs 等），绕过沙箱 mock 表拿到未包装的 HTTP 客户端、跳过 deny-list 校验，可达环回/内网与云元数据端点——V19 应检出「SSRF 保护可被同包子路径导入绕过（保护只覆盖被包装的客户端、未覆盖同等可达的出站通道）」并判 fail，finding 须引用被检出站通道证据；全部出站通道均经同一 deny-list 校验的构造应不误报。
- 标准：应有一条在册检查对被审对象的出站目标约束做判定，即 SE5 检查（v19.network.ssrf_unconstrained_egress）——但须注记本件的子型：SE5 冻结口径判的是「无约束出站」，本件是「有保护但保护覆盖面不完整」，其 mixed/拦截后可达类格能否装下「子路径客户端拦截后仍可达私网」须在 SE5 落地复核时一并核；SE5 至今未合入主链（同 EXAM-20261114-05），本条仍判未覆盖。outbound_trace（SE7）不担 SSRF 覆盖、不计。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：低代码智能体编排平台（Flowise 类）的自定义函数沙箱出站面｜受影响人群：平台运营者（沙箱 SSRF 保护被绕过直达内网/元数据端点）、平台多租户用户与同机资产｜国内相关性：同型推断——Flowise 类低代码编排平台在国内有实际部署，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-05 的现头插件清单实证（hidden_files/security-exam-2026-11-14/tree/plugins/ 无 ssrf_egress.py）。缺口与 EXAM-20261112-02 同一缺口、已在 loop backlog 在队区 SE5，本条不重复入队，仅在 SE5 条下补记本事件与「保护覆盖面不完整」子型。

## EXAM-20261114-08

- 事件与类别：vLLM 调用方多媒体参数无服务端上限致资源耗尽/崩溃五件（CVE-2026-126399 CWE-770／CVE-2026-126397 CWE-400／CVE-2026-126396 CWE-770／CVE-2026-126394 CWE-770／CVE-2026-126398 CWE-617，同批发布合并为一条）｜其他（资源耗尽/拒绝服务）｜公开日 2026-11-13（CVE 记录 2026-11-13T09:35:48–52Z 同批发布）｜来源 https://github.com/vllm-project/vllm/security/advisories/GHSA-vxqj-p4gw-9h4c（余 GHSA-9g3c-x747-c6wr／GHSA-w4cg-mhc7-mgw3／GHSA-894j-wg8m-63h8／GHSA-5q78-j82c-2vr2）
- 考题：给定案例——推理服务把请求级多媒体参数（num_frames=-1/巨值、max_patches、min_pixels）无服务端上限/范围校验地转发给解码与预处理，或对仅含 prompt_embeds 的请求形状不校验即触发可达断言崩溃——V19 应检出「调用方控制的尺寸/计数参数缺服务端上限（及请求形状缺校验）致资源耗尽/崩溃」并判 fail，finding 须引用被检参数处理证据；参数带服务端上限与范围校验、异常形状被拒的构造应不误报。
- 标准：应有一条在册检查对被审对象的「调用方参数资源上限/范围校验」做判定。现头 10 插件无此主题：全文检索 resource/exhaustion/num_frames/max_patches 在实取面零命中；v19.numeric.nonfinite_score 只判分数有限性、不是资源上限判定，不计覆盖。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：开源大模型推理服务（vLLM 类）的多媒体请求参数处理面（帧数/图块/像素计数与请求形状）｜受影响人群：推理服务运营者与共享同一服务的终端用户（无上限参数致资源耗尽、异常形状致崩溃、服务不可用）｜国内相关性：同型推断——vLLM 在国内推理部署中使用广泛，同型面存在且面广；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE15）。
- 复核（2026-11-15，loop 第 147 轮，backlog N53）：SE15 检查已随 PR #375 合入主链（合并提交 9ad4cbe978afd63006fc7b61ded6bd1464cee2f5、2026-11-15T08:34:30Z，list_commits 实读）。主链现头 9ad4cbe978afd63006fc7b61ded6bd1464cee2f5 实取确认 plugins/caller_parameter_resource_limit.py 在册（RULE_ID v19.resource.caller_parameter_without_server_limit，10,977 B、sha256 972af3d2…，与 SE15 第 129 轮钉版逐字节全等；套件 11,768 B e38d9093…、文档 6,327 B ebcc7dc0… 同全等）；组装闭包实跑：作者套件 21/21 通过、全枚举 192 格 fail 6／pass 6／inconclusive 180 与第 128 轮冻结原型逐格全等失配 0（size 面无上限判 fail 并引用参数处理证据、shape 面异常形状未校验判 fail、带上限与范围校验且异常形状被拒判 pass 不误报、证据缺失判 inconclusive 不冒充）、负对照（删插件）收集期 1 ERROR 判别成立、突变（size 面 unbounded fail→pass）恰红 3 条、全目录回归 Ran 928/坏名集 64 与基线逐名全等、acceptance 产出与基线逐字一致。检查引入时点（2026-11-15 合入）晚于事件公开日（2026-11-13），故改判「事后覆盖」（非预测命中）。证据面：hidden_files/loop/round-147/work/（fetch_main 三件、probe_enum_out.json、discover 日志）。诚实口径不变：此为规则覆盖级核验（静态在册＋套件/探针组装闭包实跑），非端到端实跑；插件只判供给的已检视参数处理摘要、不解析目标源码、不向目标服务发请求、不做资源耗尽实测，pass 不认证上限数值本身合理性。

## EXAM-20261114-09

- 事件与类别：CVE-2026-126395 vLLM 错误信息清洗不完整泄露堆地址（CWE-532，GHSA-m9fg-w9qh-67pc）｜数据泄露｜公开日 2026-11-13（CVE 记录 2026-11-13T09:35:51Z 发布）｜来源 https://github.com/vllm-project/vllm/security/advisories/GHSA-m9fg-w9qh-67pc
- 考题：给定案例——错误信息清洗函数 sanitize_message() 的正则只处理小写形式，大写 PIL 图像地址漏清洗，未认证攻击者以特制 PNG 触发处理器错误即可从外返错误信息中读到实时堆地址——V19 应检出「外返错误信息的敏感内容清洗不完整（大小写/变体漏网）」并判 fail，finding 须引用被检清洗证据；清洗覆盖全部变体或错误信息不外返细节的构造应不误报。
- 标准：应有一条在册检查对被审对象的「错误信息外返清洗完整性」做判定。现头 10 插件无此主题：全文检索 sanitize/heap/disclosure 在实取面零命中；管线自身对证据字段的控制符转义扫描是自护、不是对被审案例的判定，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：开源大模型推理服务（vLLM 类）的错误信息外返面｜受影响人群：推理服务运营者（清洗漏网泄露实时堆地址、成为 ASLR 绕过材料）、服务调用方｜国内相关性：同型推断——vLLM 在国内推理部署中使用广泛，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE16）。

## EXAM-20261114-10

- 事件与类别：CVE-2026-110199 IBM ContextForge MCP Gateway Web UI DOM 型 XSS（CWE-79）｜其他（XSS）｜公开日 2026-11-13（CVE 记录 2026-11-13T21:43:52Z 发布）｜来源 https://www.ibm.com/support/pages/node/7296694
- 考题：给定案例——MCP 网关 Web UI 未中和特权用户供给的内容，任意 JavaScript 可被嵌入页面并在可信会话内执行、可能致凭据披露——V19 应检出「Web UI 对供给内容的脚本中和缺失」并判 fail，finding 须引用被检渲染/中和证据；供给内容经转义/中和后渲染的构造应不误报。
- 标准：应有一条在册检查对被审对象的「UI 渲染内容中和」做判定。现头 10 插件无此主题：全文检索 xss/cross-site 在实取面零命中；相邻的 v19.command_injection.unneutralized_construction 只判 shell 命令构造、不是 UI 脚本中和，不计覆盖。本条为通用 Web 面缺口、优先级低于智能体/工具面各条，照实入队待 loop 排期定夺。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：MCP 网关（ContextForge 类）的 Web 管理 UI 渲染面｜受影响人群：特权用户/管理员（DOM 型 XSS 在可信会话内可致凭据披露）、网关运营者｜国内相关性：同型推断——国内智能体网关的 Web UI 渲染面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261114-02 的现头实取面全文检索（hidden_files/security-exam-2026-11-14/tree/）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-14」，SE17）。

## EXAM-20261116-01

- 事件与类别：CVE-2026-125771 AtlasAiDev MCP Server for WordPress 权限分配错误致提权（CWE-266）｜权限越界｜公开日 2026-11-15（CVE 记录 2026-11-15T15:09:09Z 发布，Patchstack CNA；CNA datePublic 字段记 2026-11-13T14:06:53Z、Patchstack 条目页标 13 Nov，本库一贯以 CVE 记录发布时间为公开日口径收录，口径差异记名于此）｜来源 https://patchstack.com/database/wordpress/plugin/ai-workflow-automation-ai-agent-hub/vulnerability/wordpress-mcp-server-for-wordpress-plugin-2-0-3-privilege-escalation-vulnerability?_s_id=cve
- 考题：给定案例——MCP 插件把权限分配给主体时分配本身错误（被授予的权限集超出该主体应得范围），用户借此提权至管理员级接管站点（受影响 <=2.0.3、2.0.4 修复；Patchstack 泛述低权用户可变管理员，CVE 向量 PR:H，两说并记，公开面无具体端点/机制细节）——V19 应检出「权限分配正确性失败（授予主体的权限集与应得范围不符）」并判 fail，finding 须引用被检权限分配证据；分配与既定应得范围一致的构造应不误报，分配证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「权限分配正确性（授予时点的主体—权限集对应关系）」做判定。现头相邻检查均不担此面：v19.authorization.missing_for_management_operation 判的是单个管理操作的授权强制缺失（authorization_status absent）与 scope 可自赋（scope_assignment=self_assignable），字段集（operation_id/endpoint_id/operation_class/authorization_status/authorization_mechanism/scope_assignment/inspection_source）核的是操作时点的强制、不是授予时点的分配正确性，且本件公开面无任何操作/强制细节可映射入该字段集；v19.authorization.insufficient_enforcement_specificity 只判 token 交换缓存键与批量导入范围两面；v19.authorization.incomplete_index_negative／measured_zero_normal 只核供给的授权声明；v19.authentication.missing_for_critical_function 只核认证存在性。19 插件全文检索 privilege/assign 命中仅 missing_authorization 文件头的「privileged scope 可自赋」自述与 statement_boundary 的 limited-privilege 声明面，无权限分配正确性主题、无对应 RULE_ID，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：WordPress 插件型 MCP 服务器的权限分配面｜受影响人群：站点运营者（低权用户可提权至管理员级接管站点）、站点注册用户与访客数据｜国内相关性：同型推断——WordPress 在国内有存量部署、插件型智能体接入存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 9ad4cbe978afd63006fc7b61ded6bd1464cee2f5（cursor/production-did-labels-e95a）下 research/audit_pipeline 经 fetch.py 实取 19 插件全文检索（字节存 hidden_files/security-exam-2026-11-16/tree/plugins/；missing_authorization.py 8,741 B、sha256 0ceca36c… 与 SE4 钉版全等，文件头与字段集自述如上）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-16」，SE18）。

## EXAM-20261116-02

- 事件与类别：CVE-2026-129356 vLLM Common Prefix KV 缓存管理器竞态条件（CWE-362）｜其他（竞态条件）｜公开日 2026-11-15（CVE 记录 2026-11-15 发布，VulDB CNA；受影响 0.30.0/0.31.0，0.32.0 修复）｜来源 https://cve.blacktree.nl/cve/CVE-2026-129356
- 考题：给定案例——推理服务的 KV 缓存管理器（single_type_kv_cache_manager.py，Common Prefix 组件）中需要临时独占访问共享资源的并发代码序列缺同步，时序窗口内共享缓存状态可被另一并发序列改写，远程低权调用方在高复杂度条件下可利用（利用已公开）——V19 应检出「共享资源并发访问缺同步（竞态条件）」并判 fail，finding 须引用被检同步证据；共享资源访问有完备同步/锁保护的构造应不误报，同步证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「共享资源并发同步」做判定。现头 19 插件无此检查：全文检索 race/toctou/synchron/concurren/kv-cache/lock 在 19 件中零命中。相邻面不计覆盖：v19.cache.unversioned_replay 判的是审计报告缓存条目的版本绑定与回放准入（字段集为缓存条目版本/幂等面），与并发同步无关；SE6 路径校验—使用一致性（TOCTOU）检查至今未合入主链（现头插件清单无 path_validation_pinning.py），且其口径只判文件路径校验后钉住、装不下 KV 缓存共享状态同步面。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：开源大模型推理服务（vLLM 类）的 Common Prefix KV 缓存管理面｜受影响人群：推理服务运营者与并发调用方（共享缓存状态在时序窗口内可被另一并发序列改写）｜国内相关性：同型推断——vLLM 在国内推理部署中使用广泛，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261116-01 的现头实取面全文检索（hidden_files/security-exam-2026-11-16/tree/plugins/）：上述竞态关键词零命中，19 插件 RULE_ID 清单无并发/同步主题，插件目录清单（hidden_files/security-exam-2026-11-16/plugins_list.txt）无 path_validation_pinning.py。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-16」，SE19）。

## EXAM-20261117-01

- 事件与类别：CVE-2026-68934 code-review-mcp-server 命令注入（CWE-78，GHSA-jq3q-62jc-fqq9）｜其他（命令注入）｜公开日 2026-11-16（GHSA／CVE 记录 2026-11-16 发布；受影响 <1.5.3、1.5.3 修复）｜来源 https://github.com/Orcus2021/code-review-mcp-server/security/advisories/GHSA-jq3q-62jc-fqq9
- 考题：给定案例——代码评审 MCP 服务器的 getLocalGitDiff／codeReview／createPR／getPRTemplate 工具把调用方控制的 folderPath／baseBranch 字符串参数直接插值进 child_process.execSync 经 /bin/sh 执行的命令串、无任何中和，shell 元字符／命令替换／引号逃逸输入可任意命令执行——V19 应检出「命令构造未中和特殊元素」并判 fail，finding 须引用被检命令构造证据；参数以 argv 数组直传（execFileSync、不过 shell，1.5.3 修复法）的构造应不误报，命令构造证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审工件中的命令构造与特殊元素中和做判定。现头在册 v19.command_injection.unneutralized_construction（plugins/command_injection.py，VERSION 0.1.0）正是此检查：文件头明定 fail 模式为「untrusted 输入插值进 shell string 且无中和（或中和漏行分隔符）」、argv 参数化执行不属此模式；字段集（construction_id/executable_id/execution_mode=shell_string|argv_list/input_source/neutralization_method/line_separator_handling/inspection_source）装得下本案例的 execSync shell 串摘要；本案例与 EXAM-20261111-02（Copilot 命令注入 CWE-77）同型。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 代码审查服务器（code-review-mcp-server 类）的本地命令执行面｜受影响人群：部署该服务器的开发者与审查运营者（命令注入以服务权限执行）、其代码资产｜国内相关性：同型推断——国内智能体代码审查类 MCP 工具存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 9960b9a5d981716556b603c29bc0c0a701ac82f0（cursor/production-did-labels-e95a）下经 fetch.py 实取 plugins/command_injection.py 在册（7,999 B、sha256 00375e26…，与 SE2 第 58 轮钉版全等，字节存 hidden_files/security-exam-2026-11-17/tree/plugins/）；检查引入时点＝PR #312 合入（合并提交 7576007e、2026-11-12T10:20:43Z，见本库 EXAM-20261111-02 复核注记），早于事件公开日 2026-11-16；事件来源＝GHSA-jq3q-62jc-fqq9／NVD CVE-2026-68934（描述与 GHSA 逐字同）。已写入战绩表「预测中了什么」栏（2026-11-17 条）。诚实口径不变：此为规则覆盖级静态核验（在册检查＋字段/判定口径对表），非实跑。
- 勘误（2026-11-17）：原判「预测命中」撤销，改判「事后覆盖」。依据：本条原记公开日 2026-11-16 系 GitHub 全球公告库收录日（published_at 2026-11-16T22:09:06Z）与 CVE 记录发布日（datePublished 2026-11-16T21:26:05Z），并非首次公开日；仓库级 GHSA 官方页（Orcus2021/code-review-mcp-server）首次发布为 2026-07-06（仓库 advisory API 实读 published_at 2026-07-06T05:04:10Z、updated_at 2026-08-03T15:36:10Z）。小语 2026-11-17 独立读回该页反证、统筹同日以 API 复核坐实。检查引入时点（PR #312 合入、2026-11-12T10:20:43Z）晚于首次公开日 2026-07-06，按本库写死规则（引入时点早于事件公开日方记「预测命中」），原判不成立、改判「事后覆盖」；战绩表 2026-11-17 条该行同步标撤销。库内汇总计数随本条更正：预测命中 2→1、事后覆盖 13→14（未覆盖 9 不变）。上方原记文字不删，以本注记为准。

## EXAM-20261117-02

- 事件与类别：CVE-2026-126816 AWS Pricing MCP Server 成本报告生成器路径遍历任意文件写（CWE-22）｜其他（路径遍历）｜公开日 2026-11-16（AWS 公告 2026-184-AWS，Publication Date 11/16/2026 12:00 PM PST；受影响 awslabs.aws-pricing-mcp-server <1.0.31、awslabs.cost-analysis-mcp-server <=1.0.5）｜来源 https://www.itsecuritynews.info/cve-2026-126816-path-traversal-and-arbitrary-file-write-in-the-cost-report-generator-of-aws-pricing-mcp-server/
- 考题：给定案例——MCP 工具的报告输出路径未限制在预期输出目录内，能影响 MCP 智能体者可经绝对路径或目录遍历序列把调用方可控内容写到预期目录之外的任意位置——V19 应检出「工具文件写出路径未限制在预期目录内」并判 fail，finding 须引用被检写出路径证据；写出路径经规范化后钉在预期目录内、越界路径被拒的构造应不误报，写出路径证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「文件写出路径目录限制」做判定。现头 19 插件无此检查：全文检索 traversal 在 19 件中零命中；相邻面均不计覆盖——v19.archive.member_plan_consistency／archive_byte_plan 只判供给的归档成员计划（成员名与解包计划一致性），不是工具写出路径判定；SE6 路径校验—使用一致性（TOCTOU 钉住）检查口径不同且至今未合入主链（现头插件清单无 path_validation_pinning.py）；管线自身 manifest 的 path_escape 校验是管线自护、不是对被审案例的判定，按 EXAM-20261111-02 同一口径不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：云成本分析类 MCP 服务器（AWS Pricing/Cost Analysis 类）的报告生成与文件写出面｜受影响人群：部署运营者（路径遍历致任意文件写）、与该服务器同机的其他服务｜国内相关性：同型推断——国内云成本分析类 MCP 工具存在同型面；本产品属 AWS 生态、国内直用面较小，未见国内同型公开披露。
- 核验证据落点：主链现头 9960b9a5d981716556b603c29bc0c0a701ac82f0 下经 fetch.py 实取 19 插件全文检索（字节存 hidden_files/security-exam-2026-11-17/tree/plugins/，清单 hidden_files/security-exam-2026-11-17/plugins_list.txt）：traversal 零命中、19 插件 RULE_ID 清单无路径写出限制主题。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-17」，SE20）。

## EXAM-20261117-03

- 事件与类别：CVE-2026-126681 AWS Labs Timestream for InfluxDB MCP Server 预期端点限制不足（CWE-923）｜其他（端点限制不足）｜公开日 2026-11-16（AWS 公告 2026-185-AWS，Publication Date 11/16/2026 12:30 PM PST；受影响 0.0.12–<0.0.19、0.0.19 修复）｜来源 https://rdintel.com/cve/CVE-2026-126681
- 考题：给定案例——MCP 服务器的连接配置处理不限制预期端点，未认证者经提示注入把 InfluxDB URL 引入 MCP 客户端上下文，服务器即向攻击者构造端点发起连接并把自身配置的 InfluxDB API 令牌发往该端点——V19 应检出「带凭据的出站连接目标未限制到预期端点（调用方供给端点可达且凭据随连接外送）」并判 fail，finding 须引用被检连接目标证据；连接端点被限制在预期端点集内、调用方供给端点被拒的构造应不误报，目标证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的出站请求目标约束做判定，即 EXAM-20261112-02 的 SE5 检查（v19.network.ssrf_unconstrained_egress）。该检查至今未合入主链：现头 19 插件无 ssrf_egress.py（实取插件清单坐实），其落地 PR #332 仍未合并；相邻的 v19.outbound.trace_policy_consistency（SE7）按 backlog N25 既定归属自述不担 SSRF 覆盖、只判供给 trace 的来源/对端策略一致性，不计覆盖。须注记本件子型：SE5 冻结口径判的是「无约束出站」，本件是「带凭据连接发往调用方供给端点致令牌外送」，其判定格能否装下「凭据随连接发往未预期端点」须在 SE5 落地复核时一并核。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：MCP 时序数据库服务器（Timestream for InfluxDB 类）的出站连接配置面｜受影响人群：部署运营者（服务端配置的数据库 API 令牌被发往调用方供给的攻击者端点）、可达该服务器的未认证调用方链｜国内相关性：同型推断——国内 MCP 数据库服务器的「带凭据连向调用方端点」同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261117-02 的现头实取面（hidden_files/security-exam-2026-11-17/tree/plugins/ 清单无 ssrf_egress.py；outbound_trace.py 文件头自述为 SE7 trace 策略一致性）。缺口与 EXAM-20261112-02 同一缺口、已在 loop backlog 在队区 SE5，本条不重复入队，仅在 SE5 条下补记本事件与「带凭据端点外送」子型。

## EXAM-20261118-01

- 事件与类别：CVE-2026-130796 Flowise 公开 chatflow 端点泄露 MCP 服务器 bearer token（CWE-212；全球库条目 GHSA-g34g-582q-rw8g 为 NVD 转录）｜数据泄露｜公开日 2026-11-17（CVE 记录 2026-11-17T19:47:59Z 发布，VulnCheck CNA；仓库级 GHSA 无——Flowise 仓库 2026-08-13 已归档、SECURITY.md 明示停收报告，仓库公告检索无此件、全球库条目 repository_advisory_url 为 null 且发布时间 2026-11-17T21:31:57Z 晚于 CVE 记录，故以 CVE 记录为首次公开；受影响 3.1.3–3.1.4、无修复版）｜来源 https://www.vulncheck.com/advisories/flowise-3.1.3-through-3.1.4-mcp-server-token-disclosure-via-public-chatflow-endpoint 与 CVE 记录 https://www.cve.org/CVERecord?id=CVE-2026-130796
- 考题：给定案例——公开（免认证）端点 GET /api/v1/public-chatflows/:id 返回的 chatflow 记录在返回前未移除敏感信息，mcpServerConfig 中的 MCP 服务器 bearer token 随响应泄露，未认证者以该 token 调 POST /api/v1/mcp/:chatflowId 绕过 API key 保护调用 chatflow 并消耗所有者模型配额——V19 应检出「免认证可达的响应面含凭据类敏感材料且返回前未移除」并判 fail，finding 须引用被检响应／净化证据；公开响应经净化（凭据引用与 token 材料均已移除）的构造应不误报，响应内容证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「公开／免认证响应面敏感材料移除（净化）」做判定。现头 20 插件无此检查：全文检索 sanitize 在 20 件中仅命中 cache_replay_admission.py（其自身缓存展品处理、与公开端点响应无关）；相邻面均不计覆盖——v19.authentication.missing_for_critical_function 只判关键功能认证「存在性」（本件公开端点系设计上免认证、缺陷不在认证缺失而在响应未净化）；v19.gateway.caller_overridable_managed_credential 判调用方供给值覆盖网关托管凭据（方向相反）；v19.identity.unchecked_assertion_propagation 判网关向接收方传播的签名身份断言（展品为传播摘要、非端点响应内容）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 应用构建平台（Flowise 类）的公开 chatflow 端点与 MCP 服务器令牌面｜受影响人群：部署运营者（MCP bearer token 泄露后 chatflow 可被未认证调用、模型配额被消耗）、其 API key 保护预期｜国内相关性：同型推断——国内低代码智能体平台的公开分享端点同型面存在；未见国内同型公开披露。
- 核验证据落点：主链现头 79851ec9c7aaf05de795a2ddca07ddd4c50fdb8a（cursor/production-did-labels-e95a）下经 fetch.py 实取 20 插件全文检索（字节存 hidden_files/security-exam-2026-11-18/tree/plugins/，清单 hidden_files/security-exam-2026-11-18/plugins_list.txt）：sanitize 命中如上，三相邻插件文件头自述（认证存在性／调用方覆盖／断言传播）均不装下本展品。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-18」，SE22；编号注记：SE21 经 backlog N93 核重关闭时明定留空不派用，本件顺延 SE22）。

## EXAM-20261118-02

- 事件与类别：CVE-2026-130615 Flowise Playwright/Puppeteer 加载器 DNS 重绑定 SSRF（CVE 记录 CWE-367 TOCTOU、缺陷类 CWE-918；全球库条目 GHSA-249c-w5mg-rj35 为 NVD 转录）｜其他（SSRF）｜公开日 2026-11-17（CVE 记录 2026-11-17T13:52:09Z 发布，VulnCheck CNA；仓库级 GHSA 无，口径同 EXAM-20261118-01；受影响 <=3.1.4、无修复版）｜来源 https://www.vulncheck.com/advisories/flowise-through-3.1.4-ssrf-via-dns-rebinding-in-playwright-and-puppeteer-loaders 与 CVE 记录 https://www.cve.org/CVERecord?id=CVE-2026-130615
- 考题：给定案例——文档加载器（Playwright/Puppeteer）的出站抓取经 checkDenyList() 做 DNS 校验，但校验解析结果未钉住到实际连接，攻击者以 DNS 重绑定域名使校验时解析为公网地址、连接时解析为内网地址，无头 Chromium 抓取内网服务与云元数据端点并把响应作为文档内容返回——V19 应检出「服务端按调用方影响的目标发起请求且目标约束可被校验后重绑定绕过」并判 fail，finding 须引用被检请求目标／校验钉住证据；校验结果钉住同一解析地址连接、或内网/元数据目标被拒的构造应不误报，目标证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的出站请求目标约束做判定，即 EXAM-20261112-02 的 SE5 检查（v19.network.ssrf_unconstrained_egress）。该检查至今未合入主链：现头 20 插件无 ssrf_egress.py（实取插件清单坐实），其落地 PR #332 仍未合并（且有 N57/N67/N75 修订在途）。另须注记子型：本件为「DNS 校验未钉住（重绑定 TOCTOU）」子型，SE5 冻结口径的已知限制明记不做 DNS 解析、解析时点竞态不在判定面（见 backlog N22），故 SE5 即使按现口径合入，本子型能否覆盖须在落地复核时一并核，不得预判覆盖。相邻的 v19.outbound.trace_policy_consistency（SE7）按既定归属自述不担 SSRF 覆盖，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 应用构建平台（Flowise 类）的无头浏览器文档加载面，及其可达的内网服务与云元数据端点｜受影响人群：部署运营者（内网/元数据响应以文档内容回读）、与部署同网的其他系统｜国内相关性：同型推断——国内同类加载器/抓取面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261118-01 的现头实取面（hidden_files/security-exam-2026-11-18/tree/plugins/ 清单无 ssrf_egress.py；全文检索 ssrf 仅命中 outbound_trace.py 文件头自述、rebind 与 169.254 零命中）。缺口与 EXAM-20261112-02 同一缺口、已在 loop backlog 在队区 SE5，本条不重复入队，仅在 SE5 条下补记本事件与「DNS 重绑定未钉住」子型。

## EXAM-20261119-01

- 事件与类别：CVE-2026-130121 AI Puffer 经 AI 生成评论回复的未认证存储型 XSS（CWE-79；全球库条目 GHSA-x362-9jrm-3rmc 为 CVE 转录）｜其他（XSS／内容中和）｜公开日 2026-11-18（CVE 记录 2026-11-18T03:32:13Z 发布，Wordfence CNA；Wordfence 披露页 Publicly Published 记 November 17, 2026 系美东日期、与 CVE 时点 03:32Z＝美东 11-17 22:32 为同一时刻，故以 CVE 记录时点为首次公开；无仓库级 GHSA——WordPress 插件无 GitHub 仓库公告，全球库条目发布时间 2026-11-18T06:30:36Z 晚于 CVE 记录；受影响 <=2.5.28、2.5.29 修复；研究者 crow）｜来源 https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/gpt3-ai-content-generator/ai-puffer-2528-unauthenticated-stored-cross-site-scripting-via-ai-generated-comment-replies 与 CVE 记录 https://www.cve.org/CVERecord?id=CVE-2026-130121
- 考题：给定案例——未认证攻击者提交评论、诱使 AI 模型在自动回复中复现 HTML 载荷，插件 insert_comment_reply_logic() 对模型输出净化不足，即经 wp_insert_comment() 存储并绕过 WordPress 正常对评论内容施加的 kses 过滤，存储的脚本在任何用户访问被注入页面时执行（利用前提：管理员已配置 Comment Auto-Reply 自动化且 Action on reply=Approve、攻击者评论已获批准）——V19 应检出「（模型生成等）不可信内容未经中和即存储并在页面渲染」并判 fail，finding 须引用被检内容中和证据；内容经中和／过滤后才存储渲染的构造应不误报，中和证据缺失（unknown）应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「存储／渲染内容中和（来源无关）」做判定。现头 20 插件无此检查：全文检索 xss／cross-site／sanitiz／kses／innerhtml／dom／render／html 在 20 件中全零命中（neutraliz 命中仅 command_injection 与 sql_construction_neutralization 的命令／SQL 构造面，装不下页面内容渲染面，不计覆盖）。相邻的 SE17 检查（v19.web_ui.unneutralized_supplied_content_rendering，EXAM-20261114-10）至今未合入主链（现头插件清单无 web_ui_rendering_neutralization.py）；且其冻结口径的 fail 门以内容来源＝用户供给为条件、系统／模型生成内容未中和属 pass 格——本件内容来源为模型生成（经攻击者评论间接影响），即使 SE17 按现口径合入亦不判 fail，子型分歧须在 SE17 落地复核时一并核，不得预判覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：WordPress AI 聊天／MCP 插件（AI Puffer 类）的 AI 自动回复内容存储与页面渲染面｜受影响人群：站点访客与管理员（存储脚本在访问被注入页面时于其浏览器执行）、站点运营者｜国内相关性：同型推断——国内 WordPress 站点与 AI 评论／客服插件存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 4a0db58440fb31c6ad5ee7425fcac7cb5785cef8（cursor/production-did-labels-e95a）下经 fetch.py 实取 20 插件全文检索（字节存 hidden_files/security-exam-2026-11-19/tree/plugins/，清单 hidden_files/security-exam-2026-11-19/plugins_list.txt）：上述关键词计数如上，20 条 RULE_ID 清单无渲染／XSS 主题。缺口与 EXAM-20261114-10 同一缺口、已在 loop backlog 在队区 SE17，本条不重复入队，仅在 SE17 条下补记本事件与「模型生成内容来源」子型分歧。

## EXAM-20261120-01

- 事件与类别：CVE-2026-133195 JetBrains Junie CLI 智能体文件工具可改项目目录外文件（CWE-73）｜其他（路径限制失效）｜公开日 2026-11-19（JetBrains 以 CNA 发布 CVE 记录；<26.6.29 受影响、26.6.29 修复、CVSS 3.1 7.5）｜来源 https://theinjection.dev/items/jetbrains-junie-cli-file-tools-path-escape/
- 考题：给定案例——编码智能体的文件工具未把写目标限制在当前项目目录内，项目外路径的文件可被修改——V19 应检出「工具写出路径未限制在预期目录内」并判 fail，finding 须引用被检写出路径证据；写出路径经规范化后钉在项目目录内、越界写出被拒的构造应不误报，写出路径证据缺失应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「工具文件写出路径目录限制」做判定，即 EXAM-20261117-02 的 SE20 检查（v19.filesystem.unconfined_tool_write_path）。该检查至今未合入主链：现头 20 插件清单无 output_path_confinement.py（实取清单坐实），其 carrier-stage 三件仍待推（第二十八批候选）；相邻的 v19.filesystem.path_validation_without_pinning（SE6）判的是校验—使用钉住（TOCTOU）、按 EXAM-20261117-02 同一口径不计本面覆盖；归档成员计划面与管线自护 path_escape 亦不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：AI 编码智能体 CLI（JetBrains Junie CLI 类）的文件工具写出面｜受影响人群：使用该 CLI 的开发者（项目外文件可被智能体改写，波及本机配置与凭据类文件）、其所在组织代码资产｜国内相关性：同型推断——国内开发者使用 JetBrains 系工具与同类编码智能体广泛，同型面存在；未见国内同型公开披露。
- 核验证据落点：主链现头 4fcf68b47c7892cb3e5eded732b33046ddca85e0（cursor/production-did-labels-e95a）下经 fetch.py 实取 20 插件全文检索（字节存 hidden_files/security-exam-2026-11-20/tree/plugins/，清单 hidden_files/security-exam-2026-11-20/plugins_list.txt）：清单无 output_path_confinement.py，20 条 RULE_ID 无写出路径限制主题。缺口与 EXAM-20261117-02 同一缺口、已在 loop backlog 在队区 SE20，本条不重复入队，仅在 SE20 条下补记本事件。

## EXAM-20261120-02

- 事件与类别：CVE-2026-133196 JetBrains Junie CLI 经 shell 输出重定向覆写项目外文件｜其他（路径限制失效／shell 输出重定向）｜公开日 2026-11-19（JetBrains CNA 批次 CVE 记录发布；before 26.11.1 受影响）｜来源 https://noroxi.com/en/cve/CVE-2026-123315
- 考题：给定案例——编码智能体经 shell 输出重定向把内容写到项目目录之外、覆写项目外文件，写出通道不是文件工具直写而是 shell 重定向——V19 应检出「写出路径未限制在预期目录内（重定向通道）」并判 fail，finding 须引用被检写出路径证据；重定向目标经规范化后钉在项目目录内或越界重定向被拒的构造应不误报。
- 标准：同 EXAM-20261120-01——应由 SE20 检查（v19.filesystem.unconfined_tool_write_path）判定，该检查未合入主链（现头清单无 output_path_confinement.py）。本件另带子型分歧：SE20 冻结口径的 observed 越界独立 fail 支以「工具写出路径」为面，shell 输出重定向通道能否装下，须在 SE20 落地复核时一并核，不得预判覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：AI 编码智能体 CLI（JetBrains Junie CLI 类）的 shell 执行与输出重定向写出面｜受影响人群：使用该 CLI 的开发者（项目外文件可经重定向被覆写）、其本机与组织资产｜国内相关性：同型推断——同 EXAM-20261120-01；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261120-01 的现头实取面（hidden_files/security-exam-2026-11-20/tree/plugins/ 清单无 output_path_confinement.py）。缺口与 EXAM-20261117-02 同一缺口、已在 loop backlog 在队区 SE20，本条不重复入队，仅在 SE20 条下补记本事件与「shell 重定向写出」子型分歧。
- 勘误（2026-11-20）：本条「事件与类别」行所列来源链接 https://noroxi.com/en/cve/CVE-2026-123315 经实读（2026-11-20）指向另一 CVE——CVE-2026-123315（JetBrains Junie CLI before 26.8.24 经 Allow Similar Commands 选项命令执行、CWE-625、公开日 2026-11-06），与本条事件 CVE-2026-133196（经 shell 输出重定向覆写项目外文件、before 26.11.1、公开日 2026-11-19）不符，系入册时链接错位。原链接按留痕口径保留不删，但不作本条事实依据；本条事实依据以 JetBrains CNA 批次 CVE 记录（CVE-2026-133196）为准——该 noroxi 页内亦将 CVE-2026-133196 列为独立条目、题述与本条事件一致。本条核验状态（未覆盖）不因本勘误变更：其依据为现头插件清单无 SE20 检查，与来源链接无关。

## EXAM-20261120-03

- 事件与类别：CVE-2026-133197 JetBrains Junie CLI 代码审查中经文件名命令注入｜其他（命令注入）｜公开日 2026-11-19（JetBrains CNA 批次 CVE 记录发布；before 26.9.22 受影响）｜来源 https://noroxi.com/en/cve/CVE-2026-123315
- 考题：给定案例——编码智能体的代码审查功能把文件名带入命令构造，构造得当的文件名可致命令注入——V19 应检出「不可信输入插值进命令构造且特殊元素未中和」并判 fail，finding 须引用被检命令构造证据；输入以参数列表／参数化方式传递、永不成为命令语法的构造应不误报。
- 标准：类别上应由在册检查 v19.command_injection.unneutralized_construction（plugins/command_injection.py，VERSION 0.1.0）判定：已检视摘要中 shell_string＋untrusted 输入＋neutralization none 判 fail，字段集（execution_mode/input_source/neutralization_method/line_separator_handling）为命令构造面。但本件公开记录只有 CNA 一行描述，未披露被审构造的执行模式（shell 串／参数列表）与中和方式，字段对表未齐——按 EXAM-20261117-01 的教训（构造与日期证据不齐不得判命中），本条暂记「未核」：不判预测命中、不入战绩表；待 JetBrains 固定问题页细节或构造证据可核后另核改判。
- 核验状态：未核
- 影响面：受影响系统/产品类型：AI 编码智能体 CLI（JetBrains Junie CLI 类）的代码审查命令构造面｜受影响人群：使用该 CLI 审查含构造文件名的仓库的开发者（文件名可致本机命令执行）｜国内相关性：同型推断——同类编码智能体代码审查面存在同型风险；未见国内同型公开披露。
- 核验证据落点：主链现头 4fcf68b4 经 fetch.py 实取 plugins/command_injection.py 在册（7,999 B、sha256 00375e26…，与 SE2 钉版全等，字节存 hidden_files/security-exam-2026-11-20/tree/plugins/）；检查引入时点＝PR #312 合入（合并提交 7576007e、2026-11-12T10:20:43Z，见本库 EXAM-20261111-02 复核注记），早于事件公开日 2026-11-19——时序面成立，但构造细节证据缺失、命中四要件（检查落点＋引入时点＋事件来源＋字段对表）缺其一，故未核。诚实口径不变：此为规则覆盖级静态核验，非实跑。
- 复核（2026-11-20，每日安全考卷增刊 daily-2026-11-20-S 补核）：维持「未核」。本增刊已实读 CVE 记录全文（CVE Services：JetBrains CNA 容器描述仅一行「In JetBrains Junie CLI before 26.9.22 command injection was possible via file names in code review」、CWE-78、CVSS 3.1 5.0、引用仅 JetBrains 固定问题页通用链接；CISA-ADP 容器未补描述与引用）与 NVD 条目（描述与 CNA 逐字相同、无增补），并检索公开 write-up 面（同批 -01 有专文、-03 无）——公开记录仍未披露被审构造的执行模式（shell 串／参数列表）与中和方式，命中四要件中「字段对表」仍缺，按 EXAM-20261117-01 教训（构造证据不齐不得判命中）不判命中、不入战绩表；待 JetBrains 固定问题页给出构造细节或构造证据可核后另核改判。证据面：files/research/security-exam/daily-2026-11-20-S.md。
- 勘误（2026-11-20）：本条「事件与类别」行所列来源链接 https://noroxi.com/en/cve/CVE-2026-123315 经实读（2026-11-20）指向另一 CVE——CVE-2026-123315（JetBrains Junie CLI before 26.8.24 经 Allow Similar Commands 选项命令执行、CWE-625、公开日 2026-11-06），与本条事件 CVE-2026-133197（代码审查中经文件名命令注入、before 26.9.22、公开日 2026-11-19）不符，系入册时链接错位（与 EXAM-20261120-02 同一错位链接）。原链接按留痕口径保留不删，但不作本条事实依据；本条事实依据以 CVE 记录全文实读为准（CVE Services：JetBrains CNA 容器描述、CWE-78、CVSS 3.1 5.0；NVD 条目描述与 CNA 逐字相同、无增补，见上行复核注记）。本条核验状态（未核）不因本勘误变更：其依据为命中四要件中「字段对表」证据缺失，与来源链接无关。

## EXAM-20261120-04

- 事件与类别：CVE-2026-133198 JetBrains Junie 项目文件终端环境设置致代码执行｜其他（项目文件配置驱动代码执行）｜公开日 2026-11-19（JetBrains CNA 批次 CVE 记录发布；Junie before 252.819.35, 253.819.35 受影响、CVSS 7.8）｜来源 https://sec.kaitan.id/news/18223895
- 考题：给定案例——智能体读取项目文件中的终端环境设置并据此执行，攻击者把设置植入项目文件即可在开发者打开项目时达成代码执行——V19 应检出「项目文件供给的终端／执行配置未经可信确认即生效」并判 fail，finding 须引用被检配置证据；项目文件设置被拒、或须经用户确认才生效的构造应不误报，配置证据缺失应判 inconclusive 不冒充 fail。
- 标准：应有一条在册检查对被审对象的「项目文件执行配置可信边界」做判定。现头 20 插件无此检查：全文检索 terminal/environment 在实取面无配置可信主题命中（terminal 仅无关词面）；相邻的 v19.command_injection.unneutralized_construction 只判命令构造摘要的中和面、v19.channel.unverified_command_sender 只判命令通道发送方身份，均装不下项目文件配置面，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：AI 编码智能体 IDE 集成（JetBrains Junie 类）的项目文件终端配置加载面｜受影响人群：打开不可信项目的开发者（项目文件设置可致本机代码执行）、其组织代码与凭据资产｜国内相关性：同型推断——国内 AI IDE／编码智能体普遍加载项目级配置，同型面存在；未见国内同型公开披露。
- 核验证据落点：主链现头 4fcf68b4 经 fetch.py 实取 20 插件全文检索（hidden_files/security-exam-2026-11-20/tree/plugins/）：20 条 RULE_ID 清单无项目文件配置主题。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-20」，SE23）。

## EXAM-20261120-05

- 事件与类别：CVE-2026-63129 mssql-mcp-core 写工具 SQL 注入（GHSA-2m9m-6cr5-9x25）｜其他（SQL 注入）｜公开日 2026-07-08（仓库级 GHSA 首发：ConnorBritain/mssql-mcp-core 仓库 advisory published_at 2026-07-08T20:29:46Z，2026-11-20 增刊实读；全球库 GHSA 2026-11-19T00:46:38Z 仅为收录时点。本条入册时曾暂锚 2026-11-19——当时仓库级首发日实读受 GitHub API 限流未完成、按写死口径全球库日期不得作公开日、仅为暂记、状态随之暂记未核；现已订正，以本行与下方复核注记为准；受影响 core/server <0.6.0、0.6.0 修复、CVSS 3.1 8.8）｜来源 https://www.vibevulns.com/?severity=critical
- 考题：给定案例——MCP 数据库工具把表名、列名、索引与模式标识符及自由格式 whereClause 未参数化插值拼入 T-SQL 批次、仅参数化数据值，恶意 MCP 客户端或被间接提示注入引导的智能体可在确认步（confirmUpdate/confirmDelete）触发之前运行堆叠 DDL/DML——V19 应检出「不可信输入插值进 SQL 构造且特殊元素未中和」并判 fail，finding 须引用被检 SQL 构造证据；标识符经 allowlist／引用中和、值走绑定参数传递的构造应不误报。
- 标准：类别与字段对表上应由在册检查 v19.sql_injection.unneutralized_parameter_interpolation（plugins/sql_construction_neutralization.py，VERSION 0.1.0）判定：interpolated_string＋untrusted＋neutralization none／delimiter unhandled 判 fail，本件的 whereClause 自由格式插值与标识符插值在构造模式面与该判定同型（标识符不可绑定参数、须以中和／allowlist 处置，此点原为 SE9 字段口径的待核子项，已于 2026-11-20 增刊经全球库 advisory 全文核清）。检查引入时点（PR #352 合入、2026-11-15T00:17:33Z）早于全球库收录日、但晚于事件首次公开日（仓库级 2026-07-08）——本条入册时因仓库级首发日未实读完成，按 ERR-20261117-01／02 写死规则不得据全球库日期判「预测命中」，暂记「未核」、不入战绩表，待实读仓库级 GHSA published_at 后改判；2026-11-20 增刊实读改判完成：引入时点晚于公开日，按写死规则记「事后覆盖」（见下方复核注记）。
- 核验状态：事后覆盖
- 影响面：受影响系统/产品类型：MCP 数据库服务器（Microsoft SQL Server 类 mssql-mcp reader/writer/server）的写工具 SQL 构造面及其连接的业务数据库｜受影响人群：数据库运营者与数据主体（堆叠 SQL 可读写／销毁数据，特权登录＋xp_cmdshell 时可达操作系统命令）｜国内相关性：同型推断——国内 MCP 数据库连接器类产品存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 4fcf68b4 经 fetch.py 实取 plugins/sql_construction_neutralization.py 在册（9,983 B、sha256 261e69d9…，与 SE9 钉版全等，字节存 hidden_files/security-exam-2026-11-20/tree/plugins/）；事件细节来源 VibeVulns 条目（插值面清单与确认步绕过逐项）；未核原因＝仓库级首发日实读被 GitHub API 限流（403）阻断、全球库 published_at 2026-11-19T00:46:38Z 已实读但按口径不作锚。诚实口径不变：此为规则覆盖级静态核验，非实跑。
- 复核（2026-11-20，每日安全考卷增刊 daily-2026-11-20-S 补核）：改判「事后覆盖」。依据：①公开日锚已实读——仓库级 advisory（ConnorBritain/mssql-mcp-core，state published）published_at＝2026-07-08T20:29:46Z（GitHub REST 实读），事件首次公开日为 2026-07-08，全球库 2026-11-19T00:46:38Z 仅为收录时点，上行所记未核原因（限流阻断）已解除；②字段对表已由全球库 advisory 全文坐实——update_data／delete_data／insert_data／execute_transaction／create_table 等工具把 tableName、列名等标识符与自由格式 whereClause 未参数化插值进 T-SQL 批次、仅参数化数据值，修复方式为标识符 allowlist＋方括号引用中和、whereClause 改结构化参数化过滤，与在册检查 v19.sql_injection.unneutralized_parameter_interpolation 的 fail 口径（interpolated_string＋untrusted＋neutralization none）同型，原「标识符中和待核子项」核清；③检查引入时点（PR #352 合入、2026-11-15T00:17:33Z）晚于事件首次公开日（2026-07-08），按本库写死规则（引入时点早于事件公开日方记「预测命中」）不得判命中，记「事后覆盖」。证据面：files/research/security-exam/daily-2026-11-20-S.md。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261121-01

- 事件与类别：CVE-2026-130901——Amazon awslabs.document-loader-mcp-server 路径限制失效（CWE-22）。类别：其他（路径限制失效）。公开日：2026-11-20（AWS 公告 2026-195-AWS，Publication Date 11/20/2026 10:30 AM PST）。影响：DOCUMENT_BASE_DIR 未设或为空且 CI／GITHUB_ACTIONS／PYTEST_CURRENT_TEST 环境变量在场时，工具的文件访问检查整体失效，经 MCP 客户端处理的构造文档内容可读基目录外文件；1.0.12–1.0.20 还可把 PNG 幻灯片图写到基目录之外（受影响 1.0.10–1.0.20，1.0.21 修复，CVSS 3.1 5.3）。来源：https://aws.amazon.com/security/security-bulletins/2026-195-aws/
- 考题：对文档加载型 MCP 工具的路径限制摘要，V19 应判定：①路径限制存在但在可被环境/配置触发的条件下整体失效（基目录未配置＋特定环境标记在场）＝ fail（本件本体）；②基目录明确配置且读/写均限域内 ＝ pass 不误报；③路径限制适用条件证据缺失 ＝ inconclusive。应引用路径限制适用条件与读/写方向证据。
- 标准：SE20 缺口（v19.filesystem.unconfined_tool_write_path，loop backlog SE20）须在细化时并核本件两子型——「限制适用条件可被环境触发而失效」与「读出方向不限域」；SE20 现行冻结口径只覆盖写出方向，落地复核时一并核，不得预判覆盖。现头无任何路径限域检查（候选 output_path_confinement.py 不在 20 插件清单），故未覆盖。
- 核验状态：未覆盖
- 影响面：AWS Labs 官方 MCP 服务器集群（document-loader）＋一切「路径限制带环境条件开关」的工具实现；条件性失效是限制面最易被漏检的形态（配置缺省即失效）。
- 核验证据落点：主链现头 89a655254f247a95dbf24fb4213c0e33076b018a，插件目录清单实读（hidden_files/security-exam-2026-11-21/plugins_list.txt，20 件与 2026-11-20 钉版逐件全等）；loop backlog SE20 补记（2026-11-21）；AWS 公告原文。

## EXAM-20261121-02

- 事件与类别：GHSA-vx67-5jmh-4xq2——mcp-ssh-manager ssh_deploy 审批卡隐藏实际执行命令（CWE-451 用户界面错误信息呈现＋CWE-78）。类别：其他（审批展示不完整）。公开日：2026-11-20（仓库级 GHSA 2026-11-20T22:43:08Z 发布）。影响：ssh_deploy 的 restart 命令与部署文件在人审审批卡上只显示「(no command)」，审批人看不到自己批准的实际内容；可被提示注入 steer 的智能体借部署请求夹带任意命令，在远端主机以 SSH 用户身份执行（受影响 >=3.0.0、<=4.3.0，4.3.1 修复，中危，无 CVE）。来源：https://github.com/bvisible/mcp-ssh-manager/security/advisories/GHSA-vx67-5jmh-4xq2
- 考题：对带人工审批环节的工具执行面，V19 应判定：①审批展示不含实际执行命令/关键参数全文（占位或省略）而执行面按未展示内容执行 ＝ fail（本件本体）；②审批展示与实际执行内容逐字一致 ＝ pass 不误报；③审批展示内容证据缺失 ＝ inconclusive。应引用审批展示与执行内容两面证据。
- 标准：新缺口（loop backlog SE24，拟 v19.approval.display_execution_mismatch）：主链 20 插件无审批展示完整性主题（command_injection 判命令构造、channel_sender_verification 判发送方身份，均不判「人审所见＝实际执行」），故未覆盖。验收＝审批展示缺失/占位而执行内容存在的构造判 fail 并引用两面证据、展示与执行一致不误报、展示证据缺失判 inconclusive。
- 核验状态：未覆盖
- 影响面：一切带 human-in-the-loop 审批的智能体工具面（部署、执行、发送类）；审批卡是提示注入防线的人审一环，展示不完整使该防线形同虚设。
- 核验证据落点：主链现头 89a655254f247a95dbf24fb4213c0e33076b018a，插件目录清单实读（hidden_files/security-exam-2026-11-21/plugins_list.txt）；loop backlog SE24；仓库级 GHSA 原文。

## EXAM-20261121-03

- 事件与类别：CVE-2026-133710——llama.cpp hrm_text 模型加载器整数溢出堆越界写（CWE-190 整数溢出／回绕）。类别：其他（整数溢出／加载器内存安全）。公开日：2026-11-20（CVE 记录 2026-11-20T12:17:08Z 发布，VulnCheck CNA）。影响：构造 GGUF 模型元数据使层因子对 2^32 取模回绕、绕过块数检查，load_arch_tensors() 把张量指针写出 model.layers 之外，堆内存破坏并可达代码执行（受影响 b11003–<b12556，b12556 修复，CVSS 3.1 7.8）。来源：https://www.vulncheck.com/advisories/llama-cpp-b11003-before-b12556-heap-out-of-bounds-write-via-hrm-text-model-loader
- 考题：对模型文件加载面的元数据边界摘要，V19 应判定：①加载器按模型文件自带元数据派生分配尺寸且派生运算可回绕/溢出、分配与写入边界不一致 ＝ fail（本件本体）；②元数据派生尺寸经溢出检查且写入边界与分配一致 ＝ pass 不误报；③加载器边界处理证据缺失 ＝ inconclusive。应引用元数据派生与边界检查证据。
- 标准：新缺口（loop backlog SE25，拟 v19.model.loader_metadata_bounds）：现头 model_artifact_integrity 只核权重差分与来源哈希声明、不判加载器元数据边界与整数溢出，故未覆盖。验收＝元数据派生分配可回绕构造判 fail 并引用边界证据、带溢出检查构造不误报、证据缺失判 inconclusive。诚实边界：本检查为加载面摘要级判定，不做二进制内存安全分析。
- 核验状态：未覆盖
- 影响面：llama.cpp 及其 GGUF 生态（本地推理部署面广）；模型文件即不可信输入的又一实证，与 EXAM-20261116-02（vLLM 竞态）同属推理引擎本体缺陷面。
- 核验证据落点：主链现头 89a655254f247a95dbf24fb4213c0e33076b018a，插件目录清单实读（hidden_files/security-exam-2026-11-21/plugins_list.txt）；loop backlog SE25；CVE 记录与 VulnCheck 公告原文。

## EXAM-20261122-01

- 事件与类别：CVE-2026-134540——llama.cpp llama-server 采样初始化输入验证缺陷（sampling.cpp common_sampler_init）。类别：其他（输入验证／采样面）。公开日：2026-11-21（CVE 记录 2026-11-21 发布，AI Model Vulnerability Tracker 以 GitHub Advisory Database／CVE 记录为源同日收录；无仓库级 GHSA 可锚——llama.cpp 仓库公告面未见此件，故以 CVE 记录为首次公开）。影响：公开记录仅述 llama-server 的 common_sampler_init 采样初始化路径存在输入验证问题（CVSS 3.1 5.3，Moderate），未披露触发参数、受影响版本范围与具体效果（崩溃／拒绝服务与否未明）。来源：https://axis-intelligence.com/research/ai-model-vulnerability-tracker/（条目链 NVD CVE-2026-134540；本轮 NVD 页直取超时未成，tracker 条目与多源检索一致性已核）
- 考题：对推理服务采样初始化面的参数验证摘要，V19 应判定：①调用方供给的采样参数未经验证即进入采样器初始化且可致异常状态 ＝ fail；②采样参数经范围／合法性验证、非法值被拒 ＝ pass 不误报；③参数验证证据缺失 ＝ inconclusive。应引用被检采样参数验证证据。
- 标准：类别上相邻两面均未坐实可装下本件——SE25 检查（v19.model.loader_metadata_bounds，拟合入未合入）判的是模型文件加载器元数据派生边界、非采样参数面；SE15 在册检查 v19.resource.caller_parameter_without_server_limit 判的是尺寸／计数类参数的服务端资源上限、非采样器初始化的合法性验证面。但本件公开记录只有组件／文件与「input validation」类级描述，未披露被审构造的触发参数与效果，字段对表未齐——按 EXAM-20261120-03 的教训（构造与日期证据不齐不得判命中、亦不得据类级描述虚立缺口），本条暂记「未核」：不判预测命中、不判未覆盖、不入战绩表、不入 backlog；待 CVE 记录全文／一手 write-up 给出触发参数与效果细节后另核改判。
- 核验状态：未核
- 影响面：llama.cpp／llama-server 本地与托管推理部署的采样参数面；与 EXAM-20261121-03（hrm_text 加载器溢出）同产品不同面（加载面 vs 采样面）。
- 核验证据落点：主链现头 89a655254f247a95dbf24fb4213c0e33076b018a（本轮 list_commits 实读未前进），插件目录清单实读（hidden_files/security-exam-2026-11-22/plugins_list.txt，20 件与 2026-11-21 钉版全等）；20 插件 RULE_ID 清单无采样参数验证主题（全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/：sampler/sampling 零命中）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261123-01

- 事件与类别：CVE-2026-134817——Flux159 mcp-server-kubernetes 标志形位置操作数参数注入（CWE-88 Improper Neutralization of Argument Delimiters in a Command）。类别：其他（参数注入）。公开日：2026-11-22（NVD Published Date 2026-11-22，VulnCheck CNA；无仓库级 GHSA 可锚，以 CVE 记录为首次公开）。影响：mcp-server-kubernetes <4.2.0 的 exec_in_pod／kubectl_patch／kubectl_logs 等工具把远程 MCP 客户端供给的值作位置操作数传给 kubectl，未拒绝以连字符开头的值，攻击者可注入 --filename 等 kubectl 标志使 kubectl 读取服务器主机文件、绕过文件读取限制（CVSS 4.0 高危，CNA 向量 VC:H；4.2.0 修复）。来源：https://www.vulncheck.com/advisories/mcp-server-kubernetes-before-4.2.0-argument-injection-via-flag-shaped-positional-operands 与 NVD https://nvd.nist.gov/vuln/detail/CVE-2026-134817
- 考题：对工具命令构造的参数传递摘要，V19 应判定：①不可信输入作位置操作数传递、且以连字符开头的标志形值未被拒／未以 -- 终止符隔离 ＝ fail（本件本体）；②标志形操作数被拒、或操作数置于 -- 终止符之后 ＝ pass 不误报；③操作数处理证据缺失 ＝ inconclusive。应引用被检操作数处理证据。
- 标准：应有一条在册检查对被审对象的「位置操作数标志注入防护（标志形值拒收／-- 终止符隔离）」做判定。现头 20 插件无此检查：全文检索 operand／end_of_options／dash 在实取面零命中；相邻的 v19.command_injection.unneutralized_construction（plugins/command_injection.py）文件头明示「Argument-list / parameterized execution, where each input stays a separate argument and never becomes command syntax, is not this pattern」，其判定序对 argv_list＋untrusted 一律判 pass（argv_separated_construction）——本件恰是 argv 分离下仍成立的标志形操作数注入，该检查按其自身口径不覆盖、且若以其字段装填本件会误判 pass，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：Kubernetes 管理类 MCP 服务器（mcp-server-kubernetes 类）的 kubectl 工具调用面｜受影响人群：经 SSE／Streamable HTTP 接入的运营者与集群（标志注入可使 kubectl 读服务器主机文件、绕过文件读取限制）｜国内相关性：同型推断——国内以 MCP 驱动 kubectl／CLI 工具的部署存在同型面（一切「位置操作数未隔离」构造）；未见国内同型公开披露。
- 核验证据落点：主链现头 afde544787d274db45491dc4796510b8e4501f40（cursor/production-did-labels-e95a，本轮 list_commits 实读，顶提交 Merge PR #501、2026-11-22T14:14:05Z）下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-23/plugins_list.txt，20 件与 2026-11-21 钉版逐件 blob/size 全等、无新增检查合入）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树：operand/end_of_options/dash 零命中，command_injection.py 文件头与 _decision 判定序自述如上。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-23」，SE26）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261124-01

- 事件与类别：CVE-2026-133632——astronomer astro-airflow-mcp 遥测子进程未受控搜索路径（CWE-427 Uncontrolled Search Path Element）。类别：其他（未受控搜索路径）。公开日：2026-11-23（CVE 记录 2026-11-23T15:33:56Z 发布，GitLab CNA；仓库级公告 GHSA-x6pc-xc3q-fpww 同日公开，无更早一手公开面）。影响：astro-airflow-mcp 0.5.0–0.9.1 的 af CLI 与 MCP 服务器在每次命令／工具调用后于当前工作目录启动遥测 Python 子进程，子进程的模块搜索路径含当前目录，项目目录内攻击者供给的 json.py 先于标准库同名模块被导入、以调用用户权限执行；仅在不可信项目目录内运行者受影响（0.9.2 修复；旧版设 AF_TELEMETRY_DISABLED=1 可避）。来源：https://github.com/astronomer/agents/security/advisories/GHSA-x6pc-xc3q-fpww 与 CVE 记录（GitLab CNA，2026-11-23T15:33:56.348Z）
- 考题：对工具／CLI 子进程启动摘要，V19 应判定：①子进程（如遥测／辅助子进程）的模块／代码搜索路径包含调用方工作目录等不可信位置、且不可信目录文件可先于受信库被加载执行 ＝ fail（本件本体）；②子进程搜索路径不含当前目录／不可信位置（隔离解释器、固定受信路径）＝ pass 不误报；③子进程搜索路径处理证据缺失 ＝ inconclusive。应引用被检子进程搜索路径证据。
- 标准：应有一条在册检查对被审对象的「子进程代码搜索路径不可信元素控制」做判定。现头 20 插件无此检查：全文检索 telemetry/subprocess 在实取面零命中；search_path/sys.path/cwd 唯一命中为 cache_replay_admission.py 对管线自身 helper 的自护注释（「Never cwd and never sys.path」——管线保护自身导入面、不是对被审案例作判定的检查规则，按 EXAM-20261112-03 同一口径不计覆盖）；相邻的 v19.command_injection.unneutralized_construction 只判命令构造字符串的中和、不判子进程模块搜索路径构成；未合入主链的 SE23（项目文件终端环境设置可信执行）判的是项目文件终端配置的可信确认面、与本件的解释器搜索路径面不同且不在册，均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：MCP 服务器与配套 CLI（astro-airflow-mcp／af 类）的遥测／辅助子进程启动面｜受影响人群：在不可信项目目录（新克隆仓库、未审 PR 分支）内运行该 CLI／服务器的用户（目录内恶意同名模块以其权限执行）｜国内相关性：同型推断——国内以 Python 子进程＋当前目录导入的智能体工具链存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 67906f42943782a5d67a08dc9511736bde7e8985（cursor/production-did-labels-e95a，本轮 list_commits 实读，顶提交 Merge PR #549、2026-11-23T02:13:27Z）下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-24/plugins_list.txt，20 件与 2026-11-23 钉版逐件 blob/size 全等、无新增检查合入）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树：telemetry/subprocess 零命中，cwd/sys.path 命中仅 cache_replay_admission.py 第 115/139 行管线自护注释。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-24」，SE27）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261124-02

- 事件与类别：CVE-2026-135300——Pomerium MCP 令牌端点跳过客户端密钥校验（CWE-287 Improper Authentication）。类别：权限越界。公开日：2026-11-23（CVE 记录 2026-11-23T16:57:37Z 发布，VulnCheck CNA；VulnCheck 公告日 11/23/2026；更早上游公开记录见本条勘误）。影响：Pomerium 0.30.0–<0.34.0 的 MCP 令牌端点 /.pomerium/mcp/token 对 client_secret_basic 客户端跳过 client secret 校验，持有被截获授权码或刷新令牌的攻击者可用任意密钥兑换受害者的访问令牌（VulnCheck CVSS 4.0 9.1；0.34.0 修复）。来源：https://www.vulncheck.com/advisories/pomerium-0.30.0-before-0.34.0-missing-client-secret-verification-via-mcp-token-endpoint
- 考题：对令牌端点的客户端认证摘要，V19 应判定：①端点对某种客户端认证方法（如 client_secret_basic）呈递了密钥却不做校验、任意密钥即可兑换令牌 ＝ fail（本件本体）；②各认证方法下呈递密钥均被校验、错误密钥被拒 ＝ pass 不误报；③密钥校验处理证据缺失 ＝ inconclusive。应引用被检令牌端点的密钥校验证据。
- 标准：应有一条在册检查对被审对象的「呈递凭据的实际校验（认证方法分支不得跳过校验）」做判定。现头 20 插件无此检查：全文检索 client_secret/token_endpoint 在实取面零命中（oauth 仅命中 missing_authentication.py 的认证方法枚举值）；相邻的 v19.authentication.missing_for_critical_function 只判关键功能的认证「存在性」（authentication_status absent 才 fail，字段集 function_id/endpoint_id/criticality/exposure/authentication_status/authentication_method/inspection_source 装不下「方法存在但该分支跳过校验」）；v19.gateway.caller_overridable_managed_credential 判的是调用方供给值覆盖网关托管的上游凭据（方向与对象均不同）；v19.authorization.insufficient_enforcement_specificity 判授权缓存键／导入范围 specificity、v19.identity.unchecked_assertion_propagation 判身份断言传播，均不判令牌端点密钥校验，均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：带 MCP 令牌端点的身份感知代理／网关（Pomerium 类）的 OAuth 式令牌兑换面｜受影响人群：该代理的用户与运营者（被截获的授权码／刷新令牌可被任意密钥兑换为受害者访问令牌）、其后受保护的内部应用｜国内相关性：同型推断——国内为 MCP 接入部署身份代理／令牌端点的形态存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 67906f42943782a5d67a08dc9511736bde7e8985 下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-24/plugins_list.txt，20 件与 2026-11-23 钉版逐件全等）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树：client_secret/secret_ver/token_endpoint 零命中，missing_authentication.py 字段集与判定口径自述如上。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-24」，SE28）。诚实口径不变：此为规则覆盖级静态核验，非实跑。
- 勘误（2026-11-24，小语 L2 复核补条触发）：本条事件段原记「无更早一手公开面」不成立，删除该表述。日期分列——公开日 2026-11-23 维持不变，其口径为 CVE 记录发布／CNA 公开（记录 2026-11-23T16:57:37Z 发布，VulnCheck CNA；VulnCheck 公告日 11/23/2026）；另列上游记录：厂商公开 PR https://github.com/pomerium/pomerium/pull/6787 时间线于 2026-09-18 已留有明确描述该缺陷的记录、2026-09-24 合入，厂商 v0.34.0 发布说明 https://github.com/pomerium/pomerium/releases/tag/v0.34.0 于 2026-11-04 列出该修复，CNA 正本容器 datePublic 字段同记 2026-09-18。本条据此改记：至少 2026-09-18 已有可见上游记录，最早公开是否更早未核。仅订正日期表述：核验状态「未覆盖」不改判、全库 39 案总数不变。依赖该日期的时效／分诊表述复核结果：分诊 TB-031 ④时效热度原以 CVE 记录发布日计 2 分；2026-11-25 DEC-20261125-W001 裁定量规第④项改按首次公开日计——首次公开 2026-09-18（厂商 PR #6787），第④项改判 0 分、总分 14→12、定级 A→B，此前 2 分／A 级口径作废；当日总结 daily-2026-11-24 本条日期同为 CVE 记录发布口径，与本勘误一致、不改；任务卡 TB-031 草稿指针行所记首稿 G-01 旧口径为出稿时点历史记录，以 TB-031 修订稿为准。公开镜像（sixu-research exam-bank.md）同步列为待载体后动作、未执行。

## EXAM-20261125-01

- 事件与类别：CVE-2026-136441——Bytebase DBHub MCP 服务器不正确授权致认证绕过（CWE-863，ZDI-26-1067／ZDI-CAN-27635）。类别：权限越界。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CNA 记录同日发布；ZDI 2025-07-18 私下报厂商不作公开日）。影响：DBHub 的 MCP 服务器在解析不可信 SQL 时作不正确授权决定，未认证远程攻击者可绕过认证（CVSS 3.0 9.8、无厂商修复、ZDI 0-day 口径仅建议限制交互）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1067/
- 考题：对数据库 MCP 工具的授权决定摘要，V19 应判定：①授权决定由对不可信 SQL 的解析结果驱动、且未认证调用可达受保护功能 ＝ fail（本件本体）；②授权决定独立于不可信输入解析、未认证调用被拒 ＝ pass 不误报；③授权决定证据缺失 ＝ inconclusive。应引用被检授权决定证据。
- 标准：应有一条在册检查对被审对象的「授权决定不可由不可信输入解析驱动」做判定。现头 20 插件无此检查：全文检索沿用实取树，authorization 主题三件均不判此面——missing_authentication 判认证存在性、missing_authorization 判管理操作授权 absent／scope 自赋、statement_boundary_enforcement 判只读边界多语句走私、sql_construction_neutralization 判 SQL 参数插值中和，均装不下「解析不可信 SQL 作授权决定」。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：数据库 MCP 服务器（DBHub 类）的认证/授权决定面｜受影响人群：DBHub 运营者与其后数据库的数据主体（未认证即可绕过认证）｜国内相关性：同型推断——国内数据库 MCP 网关类部署存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 2efae09ed69b4e098bed9116eb69c176be7dff55（cursor/production-did-labels-e95a，本轮 list_commits 实读，顶提交 Merge PR #472、2026-11-24T13:26:39Z）下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-25/plugins_list.txt，20 件与 2026-11-24 钉版逐件 blob/size 全等、无新增检查合入）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE29）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-02

- 事件与类别：CVE-2026-135614——Amazon ECS MCP Server 故障排查工具敏感数据脱敏绕过（GHSA-ppc7-5jf2-gcfc，AWS 公告 2026-200-AWS）。类别：数据泄露。公开日：2026-11-24（AWS 公告 Publication Date 11/24/2026 11:00 AM PST、CVE 记录同日）。影响：awslabs.ecs-mcp-server <0.1.36 在敏感数据设置默认开启时，troubleshooting 工具仍明文返回 ECS 任务定义中的容器环境变量值与 secret 引用，能影响智能体输入者（如经提示注入）可取得这些值（0.1.36 修复）。来源：https://aws.amazon.com/security/security-bulletins/2026-200-aws/
- 考题：对工具输出的敏感数据处理摘要，V19 应判定：①工具输出含本应脱敏的敏感值（环境变量/secret 引用）且脱敏设置开启仍明文返回 ＝ fail（本件本体）；②敏感值在输出前被脱敏/移除 ＝ pass 不误报；③输出处理证据缺失 ＝ inconclusive。应引用被检工具输出脱敏证据。
- 标准：应有一条在册检查对被审对象的「工具/服务输出敏感数据脱敏」做判定。现头 20 插件无此检查：全文检索 redact/redaction/mask 在实取面无输出脱敏主题命中；identity_assertion_propagation 判身份断言传播面、gateway_credential_override 判托管凭据覆盖面，均不判一般工具输出的敏感值脱敏。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：云工作负载 MCP 服务器（ECS 类）的故障排查工具输出面｜受影响人群：ECS 运营者（任务定义明文凭据可经智能体输入被读出）、其云账户资产｜国内相关性：同型推断——国内云容器平台 MCP 工具的输出脱敏同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面（hidden_files/security-exam-2026-11-25/plugins_list.txt）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE30）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-03

- 事件与类别：CVE-2026-135747——Apache IoTDB MCP Server 启动日志明文记录连接密码（CWE-532）。类别：数据泄露。公开日：2026-11-24（Apache 厂商公告邮件 2026-11-24T07:10:52Z、CVE 记录 2026-11-24T11:36:22Z 发布）。影响：iotdb-mcp-server ≤0.2.0 启动时把 IoTDB 连接密码明文写入日志，任何可读日志者可取得该凭据（0.3.0 修复、厂商定级 low）。来源：https://lists.apache.org/thread.html/4sljwhbj5lv3f3od90bjxsoztvlk49qz
- 考题：对服务日志写入摘要，V19 应判定：①连接密码等敏感凭据被明文写入日志 ＝ fail（本件本体）；②凭据在写日志前被脱敏/掩码 ＝ pass 不误报；③日志处理证据缺失 ＝ inconclusive。应引用被检日志脱敏证据。
- 标准：同 EXAM-20261125-02——应由「输出/日志敏感数据脱敏」检查判定，现头无此检查。本件为该缺口的日志汇（log sink）子面，与 -02 的工具输出子面同族。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：数据库 MCP 服务器（IoTDB 类）的启动日志面｜受影响人群：IoTDB 运营者与数据库数据主体（日志可读者可取得连接密码）｜国内相关性：同型推断——国内时序数据库 MCP 接入部署存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口与 EXAM-20261125-02 同一缺口族、已在 loop backlog 在队区 SE30，本条不重复入队，仅在 SE30 条下补记本事件与「日志汇」子面。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-04

- 事件与类别：CVE-2026-136536——LiteLLM is_request_body_safe／api_base 服务端请求伪造信息泄露（ZDI-26-1081）。类别：其他（SSRF）。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CVE 记录同日发布，CVSS 3.0 6.4；LiteLLM 1.82.3 受影响）。影响：已认证攻击者经 chat completion 请求的 api_base 参数使代理向未校验 URI 发请求并泄露服务账户上下文信息；ZDI 记厂商已发更新（PR #26518）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1081/
- 考题：对代理出站请求摘要，V19 应判定：①服务端按调用方供给 URI 发请求且无目标约束 ＝ fail（本件本体）；②目标经 allowlist/内网拦截校验 ＝ pass 不误报；③目标约束证据缺失 ＝ inconclusive。应引用被检请求目标证据。
- 标准：应有一条在册检查对被审对象的出站请求目标约束做判定，即 EXAM-20261112-02 的 SE5 检查（v19.network.ssrf_unconstrained_egress）。该检查至今未合入主链：现头 20 插件无 ssrf_egress.py（实取清单坐实），其落地 PR #332 仍未合并；相邻 outbound_trace（SE7）按既定归属不担 SSRF 覆盖，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 网关/代理（LiteLLM 类）的出站请求面｜受影响人群：网关运营者与服务账户（未校验 URI 可达内网/任意资源并泄露信息）｜国内相关性：同型推断——国内 LLM 网关部署存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面（hidden_files/security-exam-2026-11-25/plugins_list.txt 清单无 ssrf_egress.py）。缺口与 EXAM-20261112-02 同一缺口、已在 loop backlog 在队区 SE5，本条不重复入队，仅在 SE5 条下补记本事件。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-05

- 事件与类别：CVE-2026-136537——LiteLLM key_management_endpoints 缺失授权（CWE-862，ZDI-26-1082／ZDI-CAN-32342）。类别：权限越界。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CVE 记录 2026-11-24T21:18:20Z 发布；本轮检索未见该 CVE 更早的公开公告——同模块另有旧 CVE-2026-12770（≤1.63.1）属不同件、不作本件日期锚）。影响：LiteLLM 1.92.0 的 key_management_endpoints 模块在允许访问功能前缺乏授权检查，已认证低权攻击者可越权访问受保护资源（CVSS 3.0 6.5、1.104.0 修复）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1082/
- 考题：对管理端点的授权摘要，V19 应判定：①密钥管理类管理操作在访问前无授权强制（authorization absent）＝ fail（本件本体），不得因调用方已认证而放行；②管理操作授权强制完备 ＝ pass 不误报；③授权处理证据缺失 ＝ inconclusive。应引用被检管理操作的授权证据。
- 标准：在册检查 v19.authorization.missing_for_management_operation（plugins/missing_authorization.py，VERSION 0.1.0）正是此检查：已检视摘要中管理操作＋授权 absent 判 fail 并引用操作证据（见 EXAM-20261112-01 复核：作者套件 17/17、独立探针 16/16 合预期）。本件 key_management_endpoints 属密钥管理操作、公开描述明示「lack of authorization prior to allowing access to functionality」，字段对表成立。
- 核验状态：预测命中
- 影响面：受影响系统/产品类型：LLM 网关/代理（LiteLLM 类）的密钥管理端点面｜受影响人群：网关运营者与各密钥主体（低权已认证者可越权触达受保护资源）｜国内相关性：同型推断——国内 LLM 网关的密钥管理面存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 2efae09e 实取 plugins/missing_authorization.py 在册（8,741 B、sha256 f93c6751…，与 SE4 钉版全等，清单存 hidden_files/security-exam-2026-11-25/plugins_list.txt）；检查引入时点＝PR #327 合入（落地提交 cb16d21e、2026-11-12T19:26:47Z；合并提交 d8ebc559、2026-11-13T07:08:13Z，见 EXAM-20261112-01 复核注记），早于事件公开日 2026-11-24；事件来源＝ZDI-26-1082 与 CVE 记录（2026-11-24T21:18:20Z）。已写入战绩表「预测中了什么」栏（2026-11-25 条）。诚实口径不变：此为规则覆盖级静态核验（在册检查＋字段/判定口径对表），非实跑。

## EXAM-20261125-06

- 事件与类别：CVE-2026-136538——LiteLLM Virtual Key Model Alias 不正确授权提权（ZDI-26-1083）。类别：权限越界。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CVE 记录同日发布，CVSS 3.0 6.5；LiteLLM 1.95.0 受影响）。影响：虚拟密钥模型别名处理存在不正确授权，已认证攻击者可提权访问通常受保护的资源；厂商已发更新（PR #43049）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1083/
- 考题：对虚拟密钥别名授权摘要，V19 应判定：①别名解析后的实际资源授权未按调用方权限复核、别名可达未授权模型/资源 ＝ fail（本件本体）；②别名目标按调用方授权逐项复核 ＝ pass 不误报；③别名授权证据缺失 ＝ inconclusive。应引用被检别名授权证据。
- 标准：应有一条在册检查对被审对象的「别名/间接引用目标的授权复核」做判定。现头无此检查：missing_authorization 只判授权 absent（本件授权存在但不正确）；authorization_specificity 只判授权缓存键 specificity 与批量导入对象范围两面，装不下别名解析面；均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 网关/代理（LiteLLM 类）的虚拟密钥与模型别名面｜受影响人群：网关运营者与模型资源主体（别名可绕过授权达未授权模型）｜国内相关性：同型推断——国内 LLM 网关的别名/路由面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE31）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-07

- 事件与类别：CVE-2026-136539——LiteLLM Pass-Through Endpoints 代码注入（ZDI-26-1084）。类别：其他（代码注入）。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CVE 记录同日发布，CVSS 3.0 7.2；LiteLLM 1.83.14-stable.patch.3 受影响）。影响：pass_through_endpoints 处理中代码在经 module import 执行前缺乏适当校验，已认证攻击者可以服务账户上下文执行任意代码；厂商已发更新（PR #27801）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1084/
- 考题：对透传端点的代码执行摘要，V19 应判定：①调用方影响的代码未经校验即经导入/执行路径运行 ＝ fail（本件本体）；②执行前代码经校验/隔离、不可信代码被拒 ＝ pass 不误报；③代码校验证据缺失 ＝ inconclusive。应引用被检代码校验/执行证据。
- 标准：应有一条在册检查对被审对象的「不可信代码执行前校验」做判定。现头无此检查：command_injection 只判 shell 命令构造字符串的中和（字段集 execution_mode/input_source/neutralization_method 为命令面），装不下 module import 代码执行面；statement_boundary 等亦不判，均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 网关/代理（LiteLLM 类）的透传端点代码执行面｜受影响人群：网关运营者与服务账户（已认证者可以服务账户上下文执行代码）｜国内相关性：同型推断——国内 LLM 网关的透传/插件执行面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE32）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-08

- 事件与类别：CVE-2026-136540——LiteLLM Secret Manager oidc Resolver 信息泄露（ZDI-26-1085，Pwn2Own）。类别：数据泄露。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CVE 记录同日发布，CVSS 3.0 5.3）。影响：secret resolution handler 在用用户供给输入访问环境变量前缺乏适当校验，已认证攻击者可泄露敏感信息、并可与其它漏洞组合以服务账户上下文执行代码；厂商已发更新（v1.84.0）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1085/
- 考题：对秘密解析摘要，V19 应判定：①调用方供给输入可未经验校地指定/读取环境变量等秘密存储内容并回给调用方 ＝ fail（本件本体）；②秘密解析只允许固定白名单键、解析结果不回显未授权调用方 ＝ pass 不误报；③秘密解析证据缺失 ＝ inconclusive。应引用被检秘密解析证据。
- 标准：应有一条在册检查对被审对象的「秘密解析输入校验与披露面」做判定。现头无此检查：gateway_credential_override 判调用方覆盖托管上游凭据（方向不同）、identity_assertion_propagation 判身份断言传播、caller_parameter_resource_limit 判参数资源上限，均装不下。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 网关/代理（LiteLLM 类）的秘密管理/解析面｜受影响人群：网关运营者（环境变量秘密可被已认证者读出）、其上游凭据主体｜国内相关性：同型推断——国内 LLM 网关的秘密解析面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE33）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-09

- 事件与类别：CVE-2026-136535——LiteLLM MCP 命令注入（ZDI-CAN-31815）。类别：其他（命令注入）。公开日：2026-11-24（CVE 记录 2026-11-24T21:18:20Z 发布，ZDI CNA）。影响：LiteLLM 1.88.0 的 MCP stdio 配置处理中，用户供给字符串在用于执行系统调用前缺乏适当校验，已认证攻击者可以服务账户上下文执行任意代码。来源：https://portal.vyprsec.ai/cves/CVE-2026-136535（CVE 记录转录，含 ZDI 描述全文）
- 考题：对 MCP stdio 配置的命令执行摘要，V19 应判定：①不可信字符串未经中和进入系统调用执行 ＝ fail；②参数分离/中和完备 ＝ pass 不误报；③执行构造证据缺失 ＝ inconclusive。应引用被检命令构造证据。
- 标准：类别上应由在册检查 v19.command_injection.unneutralized_construction（plugins/command_injection.py，VERSION 0.1.0）判定：shell_string＋untrusted＋neutralization none 判 fail。但本件公开记录只有「user-supplied string 未校验即用于 system call」类级描述，未披露被审构造的执行模式（shell 串/参数列表）与中和方式，字段对表未齐——按 EXAM-20261120-03 的教训（构造证据不齐不得判命中），本条暂记「未核」：不判预测命中、不入战绩表；待 ZDI 公告全文或构造证据可核后另核改判。
- 核验状态：未核
- 影响面：受影响系统/产品类型：LLM 网关（LiteLLM 类）的 MCP stdio 配置与工具启动面｜受影响人群：网关运营者与服务账户（已认证者可执行任意代码）｜国内相关性：同型推断——国内以 stdio 启动 MCP 工具的网关部署存在同型面；未见国内同型公开披露。
- 核验证据落点：主链现头 2efae09e 实取 plugins/command_injection.py 在册（7,999 B、sha256 266042c9…／文件 sha256 口径见 EXAM-20261111-02 钉版 00375e26…，清单存 hidden_files/security-exam-2026-11-25/plugins_list.txt）；检查引入时点＝PR #312 合入（2026-11-12T10:20:43Z）早于事件公开日 2026-11-24——时序面成立，但构造细节证据缺失、命中四要件缺「字段对表」，故未核。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-10

- 事件与类别：CVE-2026-133449——AutoGPT MCP 连接重定向凭据转发第三方（GHSA-hp9v-vh5x-5jv3）。类别：数据泄露。公开日：2026-11-24（CVE 记录 2026-11-24T21:18:17Z 发布，GitHub CNA）。影响：AutoGPT 0.6.1–0.10.0 在重定向 Location 头以反斜杠隐藏新主机时把凭据发往第三方；已登录用户连接 MCP 服务器 URL、或运行带主机域凭据的共享/市场工作流时，其凭据可被投递给第三方（CVSS 3.1 5.3、0.11.0 修复）。来源：https://github.com/Significant-Gravitas/AutoGPT/security/advisories/GHSA-hp9v-vh5x-5jv3
- 考题：对带凭据出站请求的重定向处理摘要，V19 应判定：①跨主机重定向时主机域凭据被转发至新主机（含解析差异隐藏主机的构造）＝ fail（本件本体）；②跨主机重定向剥离凭据、或重定向目标主机经严格同源判定 ＝ pass 不误报；③重定向凭据处理证据缺失 ＝ inconclusive。应引用被检重定向处理证据。
- 标准：应有一条在册检查对被审对象的「重定向跨主机凭据转发」做判定。现头无此检查：gateway_credential_override 判调用方供给值覆盖托管凭据（非重定向转发）、identity_assertion_propagation 判身份断言向第三方 MCP 服务器的传播检查（对象为断言载荷、非 HTTP 重定向凭据头）、outbound_trace 判追踪策略一致性，均装不下。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：智能体平台（AutoGPT 类）的 MCP 连接与工作流出站请求面｜受影响人群：连接 MCP 服务器/运行共享工作流的用户（主机域凭据可被投递第三方）｜国内相关性：同型推断——国内智能体平台的 MCP 连接面存在同型面；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE34）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-11

- 事件与类别：CVE-2026-136534——Devin Desktop 未受控搜索路径本地提权（CWE-427，ZDI-26-1045／ZDI-CAN-33385，GHSA-x466-j9xj-8886）。类别：其他（未受控搜索路径）。公开日：2026-11-24（CVE 记录 datePublished 2026-11-24T20:52:56.616Z、ZDI 协调公开同日，CVSS 3.0 7.3；原记 21:18:20Z 系 NVD 入库时刻误植，勘误 ERR-20261126-03）。影响：Devin Desktop 3.7.16 的 Electron 框架配置使产品从不安全位置加载脚本文件，已获低权本地执行能力的攻击者可提权并以目标用户上下文执行任意代码。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1045/
- 考题：对应用脚本/代码加载路径摘要，V19 应判定：①应用从攻击者可写/不受控位置加载脚本且该文件先于受信副本被执行 ＝ fail（本件本体）；②加载路径固定受信位置/带完整性校验 ＝ pass 不误报；③加载路径处理证据缺失 ＝ inconclusive。应引用被检加载路径证据。
- 标准：同 EXAM-20261124-01——应由 SE27 检查（子进程代码搜索路径不可信元素）同族判定，该检查至今未合入主链（现头清单无对应插件）。本件子型为应用级脚本搜索路径（Electron 配置），与 SE27 冻结面（子进程模块搜索路径）同属 CWE-427，子型分歧须在 SE27 落地复核时一并核，不得预判覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：AI 编程桌面应用（Devin Desktop 类）的脚本加载面｜受影响人群：该应用用户（低权本地攻击者可提权以其上下文执行代码）｜国内相关性：同型推断——国内 AI 编程桌面工具的加载路径同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口与 EXAM-20261124-01 同一缺口、已在 loop backlog 在队区 SE27，本条不重复入队，仅在 SE27 条下补记本事件与「应用级脚本搜索路径」子型。诚实口径不变：此为规则覆盖级静态核验，非实跑。
- 勘误（2026-11-27，ERR-20261126-03）：本条「事件与类别」行原记「CVE 记录 2026-11-24T21:18:20Z 发布」，该时刻系 NVD 入库时刻、非 CVE 记录发布时间；CVE 记录 datePublished 一手值为 2026-11-24T20:52:56.616Z，已更正并注明。2026-11-26 单事件报告（TB-036）复核中同族核出此误植形态。本条公开日（2026-11-24）与核验状态（未覆盖）不因本勘误变更，全库汇总计数不变。

## EXAM-20261125-12

- 事件与类别：llama.cpp GGUF/多模态投影器解析内存安全同批八件（ZDI-26-1072／1073／1074／1075／1076／1077／1078／1079，CVE-2026-131834 等，同批发布合并为一条）。类别：其他（模型文件解析内存安全）。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CNA 记录同日）。影响：多模态投影器 GGUF 文件处理/解析中用户供给数据长度与整数验证不足，致整数溢出、堆溢出、越界写与拒绝服务，部分可远程执行任意代码（CVSS 3.0 7.0–7.8）；其中 ZDI-26-1079 为 server_context_impl 销毁 vocab 的 use-after-free（CVE-2026-131837，CVSS 8.1），属同产品同批的生命周期子型。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1072/（同批各件 ZDI 公告）
- 考题：对模型文件加载/解析摘要，V19 应判定：①模型文件元数据/长度派生的分配与拷贝边界未校验（可溢出/回绕/越界）＝ fail（本批本体）；②派生尺寸经溢出检查且分配/写入边界一致 ＝ pass 不误报；③边界处理证据缺失 ＝ inconclusive。应引用被检加载器边界证据。
- 标准：同 EXAM-20261121-03——应由 SE25 检查（v19.model.loader_metadata_bounds）判定，该检查至今未合入主链（现头清单无 model_loader_metadata_bounds.py，carrier-stage 三件待推）；在册 model_artifact_integrity 只核权重差分与来源哈希、不判加载器边界，不计覆盖。ZDI-26-1079 的 UAF 子型超出 SE25 冻结面（元数据派生边界），须在 SE25 落地复核时一并核，不得预判覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：本地推理引擎（llama.cpp 类）的 GGUF 模型文件加载面｜受影响人群：加载不可信模型文件的部署方与终端用户（恶意模型文件可致代码执行/拒绝服务）｜国内相关性：同型推断——国内 llama.cpp 生态部署广泛、同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面（hidden_files/security-exam-2026-11-25/plugins_list.txt 清单无 model_loader_metadata_bounds.py）。缺口与 EXAM-20261121-03 同一缺口、已在 loop backlog 在队区 SE25，本条不重复入队，仅在 SE25 条下补记本批八件与 UAF 子型分歧。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261125-13

- 事件与类别：PyTorch 不可信模型文件加载同批八件（ZDI-26-1052–1059，CVE-2026-136426–136433，同批发布合并为一条）。类别：供应链。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CNA 记录同日，CVSS 3.0 7.0–7.8，均为 0-day 口径、ZDI 仅建议限制交互）。影响：PT2 文件解析代码注入（136426）/危险方法暴露（136429）、load_compiled_function（136428）/FileSystemReader（136432）/load_state_dict_from_url（136431）/torch_save_to_dcp（136433）不可信数据反序列化、AOTIModelPackageLoader 命令注入（136427）与目录穿越（136430）——加载/打开恶意模型文件即可在当前进程执行任意代码，受影响版本含 2.13.0。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1052/（同批各件 ZDI 公告，编号 1052–1059）
- 考题：对模型文件/包加载摘要，V19 应判定：①不可信模型文件经不安全反序列化/代码生成/危险方法/未约束路径加载且可达代码执行 ＝ fail（本批本体）；②加载走安全格式/白名单反序列化且路径限域 ＝ pass 不误报；③加载方式证据缺失 ＝ inconclusive。应引用被检模型加载证据。
- 标准：应有一条在册检查对被审对象的「不可信模型文件安全加载（反序列化/代码执行面）」做判定。现头无此检查：model_artifact_integrity 只核权重差分异常与来源哈希声明、不判加载机制本身的安全性；SE25 判的是加载器元数据派生边界（整数/分配面），装不下反序列化/代码注入面，均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：ML 框架（PyTorch 类）的模型文件/检查点加载面｜受影响人群：加载第三方模型文件的训练/推理部署方（恶意文件可致进程内代码执行）｜国内相关性：同型推断——国内 PyTorch 部署与模型仓库生态广泛、同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-25」，SE35）。诚实口径不变：此为规则覆盖级静态核验，非实跑；本检查为加载面摘要级判定，不做二进制/运行时分析。

## EXAM-20261125-14

- 事件与类别：DeepSpeed 检查点不可信反序列化同批五件（ZDI-26-1061–1065，CVE-2026-136435–136439，同批发布合并为一条）。类别：供应链。公开日：2026-11-24（ZDI 协调公开 2026-11-24、CNA 记录同日，CVSS 3.0 7.8，均为 0-day 口径）。影响：InferenceEngine（136435）、torch_checkpoint_engine（136436）、parse_optim_states（136437）、build_engine_from_ds_checkpoint（136438）、_get_zero_stage（136439）在解析检查点/模型配置数据时缺乏校验、可致不可信数据反序列化，打开恶意文件即可在当前进程执行任意代码（受影响 0.18.5/0.18.9 等）。来源：https://www.zerodayinitiative.com/advisories/ZDI-26-1065/（同批各件 ZDI 公告，编号 1061–1065）
- 考题：对检查点加载摘要，V19 应判定：①不可信检查点经不安全反序列化加载且可达代码执行 ＝ fail（本批本体）；②检查点走安全加载（weights-only/白名单）＝ pass 不误报；③加载方式证据缺失 ＝ inconclusive。应引用被检检查点加载证据。
- 标准：同 EXAM-20261125-13——应由「不可信模型文件安全加载」检查判定，现头无此检查（model_artifact_integrity 不判加载机制、SE25 不判反序列化面）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：分布式训练框架（DeepSpeed 类）的检查点加载面｜受影响人群：加载第三方检查点的训练部署方（恶意检查点可致进程内代码执行）｜国内相关性：同型推断——国内大模型训练部署的检查点共享面存在同型风险；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261125-01 的现头实取面。缺口与 EXAM-20261125-13 同一缺口、已在 loop backlog 在队区 SE35，本条不重复入队，仅在 SE35 条下补记本批五件。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-01

- 事件与类别：Pydantic AI Harness PlaywrightBrowser 出站策略覆盖不完整同批四件——CVE-2026-136641（GHSA-mj96-6529-3cpf，egress 策略不覆盖 WebRTC／WebTransport／WebSocketStream／FedCM 流量）＋CVE-2026-136638（GHSA-g87v-g79r-whvj，URL 查询串含反斜杠即被当无主机跳过策略）＋GHSA-wm3r-gc4c-q7qg（无 CVE，私网拦截漏 IPv6 site-local fec0::/10）＋GHSA-p2q8-3252-77c3（无 CVE，NAT64／ISATAP 嵌入形态的云元数据与私网地址被分类为全局单播放行），同批同族合并为一条。类别：其他（SSRF／出站策略绕过）。公开日：2026-11-25（仓库级 GHSA 四件 2026-11-25T00:42:59–00:43:02Z 同批发布，仓库 advisory API 实读；受影响 pydantic-ai-harness >=0.24.0、<=0.73.0，0.74.0 修复）。影响：出站策略存在但覆盖面不完整，智能体打开的攻击者页面可经未覆盖通道／解析歧义／地址分类漏项把请求送达私网服务与云元数据端点，含 allowlist 全量策略下亦可绕过。来源：https://github.com/pydantic/pydantic-ai/security/advisories/GHSA-mj96-6529-3cpf
- 考题：对浏览器型智能体的出站策略摘要，V19 应判定：①出站策略存在但通道覆盖不完整（存在未受策略约束的出站通道）、或 URL 解析歧义可使目标主机判定失效、或目标地址分类漏项（过渡／嵌入形态地址被当公网）＝ fail（本批四件本体）；②全部出站通道均受策略约束、目标解析无歧义、地址分类覆盖过渡形态 ＝ pass 不误报；③策略覆盖证据缺失 ＝ inconclusive。应引用被检出站策略覆盖证据。
- 标准：应有一条在册检查对被审对象的「出站策略覆盖完整性（通道全集／解析一致性／地址分类完整性）」做判定。现头 20 插件无此检查：SE5 缺口（v19.network.ssrf_unconstrained_egress，拟合入未合入）判的是「无目标约束」的出站、本批为「有策略但覆盖不完整」，面不同不计覆盖且不并入 SE5；在册 v19.outbound.trace_policy_consistency 判的是追踪策略一致性、非浏览器出站通道覆盖；全文检索沿用实取树 webrtc/webtransport/fedcm 零命中。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：带浏览器工具的智能体框架（Pydantic AI Harness 类）的出站网络策略面｜受影响人群：部署方内网服务与云元数据端点（策略绕过可达）、智能体运营者｜国内相关性：同型推断——国内浏览器型智能体框架的出站策略同型面存在；未见国内同型公开披露。
- 核验证据落点：主链现头 2efae09ed69b4e098bed9116eb69c176be7dff55 下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-26/plugins_list.txt，20 件与 2026-11-25 钉版逐件 blob/size 全等、无新增检查合入）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-26」，SE36）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-02

- 事件与类别：Pydantic AI ElevenLabs Agents 实时会话在追踪跨度中明文记录凭据（GHSA-gm2p-369w-rcgv，无 CVE）。类别：数据泄露。公开日：2026-11-25（仓库级 GHSA 2026-11-25T00:43:03Z 发布，仓库 advisory API 实读；受影响 pydantic-ai／pydantic-ai-slim >=2.58.0、<=2.73.0）。影响：开启 OpenTelemetry 埋点时，ElevenLabs Agents 实时会话把模型设置全文写入会话与每条响应 span，其中 elevenlabs_agents_dynamic_variables 含以 secret__ 前缀传递的认证令牌与 API 密钥，可读导出追踪者即可取得凭据。来源：https://github.com/pydantic/pydantic-ai/security/advisories/GHSA-gm2p-369w-rcgv
- 考题：对遥测／追踪写入摘要，V19 应判定：①会话或工具的设置／变量（含秘密类变量）被全文写入 trace span 等遥测 sink ＝ fail（本件本体）；②秘密值在写入遥测前被脱敏／剔除 ＝ pass 不误报；③遥测写入处理证据缺失 ＝ inconclusive。应引用被检遥测写入证据。
- 标准：应有一条在册检查对被审对象的「输出／日志／遥测 sink 敏感数据脱敏」做判定，即 EXAM-20261125-02／-03 的 SE30 缺口（工具输出与日志两 sink）。本件为第三个 sink（追踪／遥测），SE30 条已明记各 sink 须分别核、不得以一面代两面；现头 20 插件无此检查（全文检索沿用实取树，trace span 秘密写入主题零命中；identity_assertion_propagation 判身份断言传播、gateway_credential_override 判托管凭据覆盖，均不判遥测写入脱敏）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：带 OpenTelemetry 埋点的智能体框架（Pydantic AI 类）的追踪导出面｜受影响人群：经动态变量传凭据的用户与运营者（凭据随追踪导出扩散）、追踪后端的可读方｜国内相关性：同型推断——国内智能体框架的遥测脱敏同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口与 EXAM-20261125-02／-03 同一缺口、已在 loop backlog 在队区 SE30，本条不重复入队，仅在 SE30 条下补记本事件为遥测 sink 新增同型实证。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-03

- 事件与类别：Pydantic AI pydantic-evals 在线评测结果属性可被入站 OpenTelemetry baggage 篡改（GHSA-7xcv-6766-v6v5，无 CVE）。类别：其他（评测结果完整性）。公开日：2026-11-25（仓库级 GHSA 2026-11-25T00:43:04Z 发布，仓库 advisory API 实读；受影响 pydantic-evals >=1.85.0、<=1.107.10 与 >=2.0.0b1、<=2.73.0）。影响：在线评测为每个结果发出 gen_ai.evaluation.result 事件，当前上下文中的 OTel baggage 可设置评测本身未设的属性（error.type／gen_ai.evaluation.score.value／explanation）；服务端按默认 propagators 提取入站 baggage 时，任意客户端以 W3C baggage 头即可让失败评测被记上分数、或通过评测被记上错误类型。来源：https://github.com/pydantic/pydantic-ai/security/advisories/GHSA-7xcv-6766-v6v5
- 考题：对评测结果记录摘要，V19 应判定：①评测结果属性可由调用方供给的上下文（baggage／请求头等外部输入）设置或覆盖 ＝ fail（本件本体）；②评测结果属性只由评测本身产生、外部上下文被隔离 ＝ pass 不误报；③结果属性来源证据缺失 ＝ inconclusive。应引用被检评测结果属性来源证据。
- 标准：应有一条在册检查对被审对象的「评测／判定结果属性来源完整性（结果只能由判定过程产生）」做判定。现头 20 插件无此检查：nonfinite_score 只判分数有限性、measured_zero_normal 只判实测零的声明口径，均不判结果属性的可篡改来源；全文检索沿用实取树 baggage/evaluation 零命中（评测结果主题）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：智能体评测框架（pydantic-evals 类）的在线评测记录面｜受影响人群：以评测记录作放行／回归依据的开发与运营方（记录可被外部输入污染）、其下游决策｜国内相关性：同型推断——国内智能体评测管线的遥测上下文隔离同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-26」，SE37）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-04

- 事件与类别：CVE-2026-136267——Kiro Web 工具调用标记未净化致命令执行（CWE-78，AWS 公告 2026-202-AWS）。类别：提示注入。公开日：2026-11-25（AWS 公告 Publication Date 11/25/2026 09:00 AM PST；全球库 GHSA-qmph-ph4r-7jjr 同日收录）。影响：Kiro Web（云端 AI IDE）中，智能体会话读取的内容（仓库文件、网页等）所含的工具调用标记未被净化，特定模型（公告列 DeepSeek v3.2、GLM-5、MiniMax M2.1／M2.5、Qwen3-coder-next 等）可把标记复述出来并在订阅者的托管开发环境中无同意提示地作为命令运行；未认证远程攻击者经构造内容即可触发，厂商已服务端修复、无需用户操作（受影响为 2026-10-30 之前的处理版本口径）。来源：https://aws.amazon.com/security/security-bulletins/2026-202-aws/
- 考题：对智能体内容处理摘要，V19 应判定：①被读内容中的工具调用／命令标记未经净化与同意门即被模型复述并作为工具调用执行 ＝ fail（本件本体）；②内容侧标记被净化、或复述出的调用须经同意提示才执行 ＝ pass 不误报；③内容处理与同意门证据缺失 ＝ inconclusive。应引用被检内容净化与执行同意证据。
- 标准：应有一条在册检查对被审对象的「不可信内容中工具调用标记的净化与执行同意门」做判定。现头 20 插件无此检查：command_injection 判 shell 命令构造的中和（构造面字段）、channel_sender_verification 判命令通道发送方身份，均装不下「内容标记经模型复述转工具调用」面；全文检索沿用实取树 markup/tool-call 主题零命中。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：云端 AI IDE／编码智能体（Kiro Web 类）的内容读取与工具执行面｜受影响人群：订阅用户（托管开发环境可被构造内容无提示执行命令）、其代码与凭据资产｜国内相关性：直接相关——公告列名的受影响模型含多款国产模型（DeepSeek／GLM／MiniMax／Qwen 系），同型内容标记面在国内编码智能体产品中同样存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-26」，SE38）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-05

- 事件与类别：CVE-2026-136146——Vanna FAISS AgentMemory 索引不安全反序列化（CWE-502／CWE-20，VulDB CNA，GHSA-2m89-cvqm-h564）。类别：供应链。公开日：2026-11-25（CVE 记录 2026-11-25T01:16:49Z 发布；日期分歧照实标注：VulDB 时间线另记「Advisory disclosed 2026-11-24」，本条以 CVE 记录发布日为公开日口径入册，该分歧不影响核验状态判定——无论 11-24 或 11-25，相关检查均未在册）。影响：vanna 2.0.0／2.0.1／2.0.2 的 FAISS AgentMemory 集成 agent_memory.py 中 _load_index 对索引做不安全反序列化，本地低权攻击者操纵索引文件可致代码执行（CVSS 3.1 5.3）；利用已公开、厂商被联系后未回应、无修复版。来源：https://vuldb.com/vuln/442894
- 考题：对智能体记忆索引加载摘要，V19 应判定：①记忆／索引文件经不安全反序列化加载、加载即可能执行文件内嵌代码 ＝ fail（本件本体）；②索引以安全格式／受限加载方式载入、不执行内嵌代码 ＝ pass 不误报；③加载机制证据缺失 ＝ inconclusive。应引用被检索引加载证据。
- 标准：应有一条在册检查对被审对象的「不可信文件安全加载（反序列化/代码执行面）」做判定，即 EXAM-20261125-13／-14 的 SE35 缺口（模型检查点面）。本件为记忆索引文件子面，SE35 落地细化时须并核、不得预判覆盖；现头 model_artifact_integrity 只核权重差分与来源哈希、不判加载机制，SE25 判加载器元数据派生边界、装不下反序列化面，均不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：带可持久化记忆的智能体框架（Vanna 类）的 FAISS 索引加载面｜受影响人群：加载他人分享／下载的记忆索引的部署方（加载即代码执行）｜国内相关性：同型推断——国内 RAG／记忆型智能体框架的索引文件分发同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口与 EXAM-20261125-13／-14 同一缺口、已在 loop backlog 在队区 SE35，本条不重复入队，仅在 SE35 条下补记本事件为记忆索引子面新增同型实证。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-06

- 事件与类别：CVE-2026-137057——llama.cpp 语法解析器整数下溢致拒绝服务（CWE-191，VulnCheck CNA，GHSA-f86p-wv5j-r5vj）。类别：其他（解析器整数下溢／拒绝服务）。公开日：2026-11-25（CVE 记录 2026-11-25 发布）。影响：llama.cpp b7118–<b12604 的 llama_grammar_parser::parse_sequence() 对 GBNF 重复界限校验不足，llama-server /completion 请求的 grammar 字段送入 {5,2} 类 max＜min 构造时整数下溢、n_opt 回绕生成无尽重复规则，进程挂死并耗尽内存，未认证远程攻击者可触发（CVSS 3.1 7.5）。来源：https://github.com/advisories/GHSA-f86p-wv5j-r5vj
- 考题：对推理服务供给构造（语法／模式）的解析摘要，V19 应判定：①调用方供给构造的数值界限未经一致性／溢出校验即派生展开规模、下溢回绕可致无界展开 ＝ fail（本件本体）；②界限经一致性与溢出校验、展开规模有上限 ＝ pass 不误报；③解析派生证据缺失 ＝ inconclusive。应引用被检解析派生证据。
- 标准：类别上相邻三面均不计覆盖——SE25 缺口（v19.model.loader_metadata_bounds，拟合入未合入）判模型文件加载器元数据派生边界，本件为语法解析器派生面，子型超出 SE25 冻结面，须在 SE25 落地复核时一并核、不得预判覆盖（同 EXAM-20261125-12 的 UAF 子型处置）；在册 v19.resource.caller_parameter_without_server_limit 判尺寸／计数参数值的服务端上限与异常请求形状，其字段集（参数值／请求形状枚举）装不下「供给构造内部界限下溢派生」面；v19.guard.user_supplied_pattern_filter_incomplete_guard 判网关工具 schema pattern／jq 类构造的名单守卫，亦装不下语法展开界限。现头无此检查。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 推理服务器（llama.cpp 类）的语法约束解码面｜受影响人群：对外提供 /completion 的部署方（未认证即可挂死进程）、其服务用户｜国内相关性：同型推断——llama.cpp 在国内本地推理部署中广泛使用，同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt 清单无 model_loader_metadata_bounds.py）。缺口与 EXAM-20261121-03 同族、已在 loop backlog 在队区 SE25，本条不重复入队，仅在 SE25 条下补记本事件与「语法解析器派生面子型超出冻结面」分歧。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-07

- 事件与类别：CVE-2026-137091——EverOS 跨源本地文件披露（CWE-942，仓库级 GHSA-wrfw-xrp7-7pf4，无仓库 CVE 字段、CVE 由 VulnCheck 分配）。类别：数据泄露。公开日：2026-11-25（仓库级 GHSA 2026-11-25T19:25:22Z 发布，仓库 advisory API 实读；受影响 <1.8.0、1.8.0 修复）。影响：EverOS（智能体记忆系统）API 采用通配 CORS 策略且允许凭据、file:// 摄入不限，恶意网站脚本可调用 POST /api/v2/memory/add 以 file:// URI 摄入本地文件，再经 POST /api/v2/memory/search 读出解析内容，外泄 SSH 密钥与凭据，并可改删记忆（CVSS 3.1 7.1，需用户访问恶意网站）。来源：https://github.com/EverMind-AI/EverOS/security/advisories/GHSA-wrfw-xrp7-7pf4
- 考题：对本地智能体服务的跨源受理摘要，V19 应判定：①本地服务以通配跨源策略受理任意网站请求且本地文件摄入不限、跨源调用方可读回摄入内容 ＝ fail（本件本体）；②跨源来源受限／被拒、或 file:// 类本地摄入被禁 ＝ pass 不误报；③跨源与摄入策略证据缺失 ＝ inconclusive。应引用被检跨源受理与摄入证据。
- 标准：应有一条在册检查对被审对象的「本地服务跨源请求受理与本地文件摄入限制」做判定。现头 20 插件无此检查：channel_sender_verification 判命令通道发送方身份验证（通道面）、path_validation_pinning 判路径校验—使用钉住，均装不下 HTTP 跨源策略＋file:// 摄入面；全文检索沿用实取树 cors/file:// 零命中。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：本地运行的智能体记忆／知识服务（EverOS 类）的 Web API 跨源面｜受影响人群：本地部署用户（浏览恶意网站即可被读本地文件）、其密钥与记忆数据｜国内相关性：同型推断——国内本地智能体服务的跨源配置同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-26」，SE39）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261126-08

- 事件与类别：CVE-2026-136139——R-KV FlashInfer 权重加载器路径穿越（CWE-22，VulDB CNA）。类别：其他（路径穿越）。公开日：2026-11-25（CVE 记录 2026-11-25T00:30Z 发布；全球库 GHSA-88vx-hj84-4m4r 同日收录）。影响：Zefan-Cai R-KV（LLM KV 缓存压缩库）的 FlashInfer 权重加载器 loader.py 中 _shard_files 经 weight_map 参数操纵可穿越预期目录（path traversal），攻击可远程发起、利用已公开（CVSS 低危口径；产品为滚动发布、无受影响版本区间与修复版信息）。来源：https://www.cve.org/CVERecord?id=CVE-2026-136139
- 考题：对模型权重加载器的路径处理摘要，V19 应判定：①加载器按调用方供给映射（weight_map 等）拼路径且不限域、可读预期目录外分片文件 ＝ fail（本件本体）；②加载路径被限域、越界路径被拒 ＝ pass 不误报；③路径处理证据缺失 ＝ inconclusive。应引用被检加载路径证据。
- 标准：应有一条在册检查对被审对象的「工具／加载器文件路径限域」做判定，即 EXAM-20261121-01 等的 SE20 缺口（v19.filesystem.unconfined_tool_write_path，拟合入未合入；现行冻结口径主覆盖写出方向）。本件为权重加载器读出方向子面，SE20 落地细化时须并核、不得预判覆盖；在册 path_validation_pinning 判校验—使用竞态钉住、非路径限域本身，不计覆盖。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 推理优化库（R-KV 类）的权重文件加载面｜受影响人群：加载外部权重映射的部署方（目录外文件可被读出）｜国内相关性：同型推断——国内推理优化组件的权重加载同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261126-01 的现头实取面（hidden_files/security-exam-2026-11-26/plugins_list.txt）。缺口与 EXAM-20261121-01 同族、已在 loop backlog 在队区 SE20，本条不重复入队，仅在 SE20 条下补记本事件为读出方向新增同型实证。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261127-01

- 事件与类别：CVE-2026-131688——Secure MCP Server for WordPress 作用域令牌跨端点提权（CWE-862，GHSA-5j23-2pf6-3cg8）。类别：权限越界。公开日：2026-11-26（CVE 记录 datePublished 2026-11-26T11:32:17.258Z 发布，Wordfence CNA；原记 2026-11-26T12:17Z 系 NVD 发布时间 2026-11-26T12:17:09.903Z 误植，两时点分列，勘误 ERR-20261127-02；受影响 <=1.5.8、修复版 1.5.9（Wordfence 官方公告 Patched Version；原记无修复版，勘误 ERR-20261127-01；修复来源归属订正，勘误 ERR-20261127-03）；CVSS 3.1 8.1）。影响：插件不校验令牌作用域，任一有效 MCP bearer token（含作用域受限的连接测试令牌）提交到 admin-ajax.php 等任意 WordPress 端点即以令牌所有者身份执行、绕过 NHI ability allow-list 与 scope 限制提权至 Administrator。来源：https://github.com/advisories/GHSA-5j23-2pf6-3cg8
- 考题：对令牌受理摘要，V19 应判定：①受限作用域令牌被非其作用域端点受理且按所有者全权身份执行 ＝ fail（本件本体）；②令牌作用域在每个受理端点被强制、越界使用被拒 ＝ pass 不误报；③作用域强制证据缺失 ＝ inconclusive。应引用被检令牌作用域强制证据。
- 标准：应有一条在册检查对被审对象的「令牌作用域跨端点强制」做判定。现头 20 插件无此检查：authorization_specificity 只判授权缓存键 specificity 与批量导入对象范围两面、missing_authorization 只判管理操作授权 absent 与 scope 可自赋，均装不下「已颁发令牌的作用域在使用端点被强制」面；missing_authentication 只判认证存在性。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：为 AI 智能体提供 MCP 接入的 WordPress 插件（Secure MCP Server 类）的令牌受理面｜受影响人群：站点运营者与管理员（受限令牌可提权接管站点）、经该站点的智能体调用方｜国内相关性：同型推断——国内 WordPress＋MCP 插件部署的作用域令牌强制面存在同型风险；未见国内同型公开披露。
- 核验证据落点：主链现头 2efae09ed69b4e098bed9116eb69c176be7dff55 下经连接器实读 plugins 目录清单（hidden_files/security-exam-2026-11-27/plugins_list.txt，20 件与 2026-11-26 钉版全等、无新增检查合入）；全文检索沿用 hidden_files/security-exam-2026-11-20/tree/plugins/ 实取树。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-27」，SE40）。诚实口径不变：此为规则覆盖级静态核验，非实跑。
- 勘误（2026-11-27，ERR-20261127-01）：本条「事件与类别」行原记「无修复版」不成立。据 WP.org 官方 readme 变更日志（TB-054 补件包 #807 原件 02，sha256 def53db7…），受影响 <=1.5.8 的修复版为 1.5.9；GHSA 记录（原件 03）修复栏未载系 Unknown，不等于无修复。已更正并注明。2026-11-27 单事件报告（TB-054）L2 退修复核中核出。本条公开日（2026-11-26）与核验状态（未覆盖）不因本勘误变更，全库汇总计数不变。
- 勘误（2026-11-27，ERR-20261127-02）：本条「事件与类别」行原记「CVE 记录 2026-11-26T12:17Z 发布」，该时刻系 NVD 发布时间、非 CVE 记录发布时间；NVD 记录 published 一手值为 2026-11-26T12:17:09.903Z（补件包 #807 原件 01，sha256 0c3fcb76…），CVE 记录发布时间为 CNA 原记录 datePublished 2026-11-26T11:32:17.258Z（cvelistV5 原件 04，sha256 4a951a64…，Wordfence CNA），已更正并两时点分列。2026-11-27 单事件报告（TB-054）L2 退修复核中核出。两值同日（2026-11-26），本条公开日（日粒度，2026-11-26）与核验状态（未覆盖）不因本勘误变更，全库汇总计数不变。
- 勘误（2026-11-27，ERR-20261127-03）：本条修复版 1.5.9 的来源归属订正。ERR-20261127-01 注记所据 WP.org 官方 readme 变更日志只证 1.5.9 版本存在、未把该版本绑定到本 CVE；修复版 1.5.9 的权威来源为 Wordfence 官方公告（本 CVE 条目，Patched Version 列 1.5.9，复检方直读核实；链接见 TB-054 rev2 稿一手源清单第 5 件）；CNA 原记录未明列修复版本、GHSA 修复栏为 Unknown，三口径分列保留。该公告自标公开日 2026-11-25、更新日 2026-11-26（仅日期、无时刻与时区），与 CNA datePublished 2026-11-26T11:32:17.258Z 分列并记、不混。2026-11-27 单事件报告（TB-054 rev2）L2 复检中核出（复检回执 2026-11-27 11:08 CST 与来源补齐回执同日 11:12 CST）。本条公开日（日粒度，2026-11-26）与核验状态（未覆盖）不因本勘误变更，全库汇总计数不变。

## EXAM-20261127-02

- 事件与类别：CVE-2026-131589——AI Engine WordPress 插件 create_image 端点文件类型校验分支绕过（GHSA-jh4f-pw58-rx8p）。类别：其他（文件上传类型校验绕过）。公开日：2026-11-26（CVE 记录 2026-11-26 发布，Wordfence CNA；受影响 <=3.9.4，CVSS 3.1 7.2）。影响：/mwai/v1/helpers/create_image 的 add_image_from_url() 只在自定义 filename 分支做扩展名 allow-list，省略 filename 时按 URL 基名派生扩展名落盘、响应体原样写入 uploads 目录，Editor 以上已认证用户可放置 HTML/SVG/JS 文件致存储型 XSS（下载例程只验攻击者可控的 Content-Type image/ 前缀）。来源：https://github.com/advisories/GHSA-jh4f-pw58-rx8p
- 考题：对文件上传/远程拉取落盘摘要，V19 应判定：①类型校验只覆盖部分分支、存在可绕过校验的落盘路径且落盘内容/扩展名由调用方决定 ＝ fail（本件本体）；②全部分支均做扩展名与内容类型校验、越界类型被拒 ＝ pass 不误报；③落盘校验证据缺失 ＝ inconclusive。应引用被检上传校验分支证据。
- 标准：应有一条在册检查对被审对象的「上传文件类型校验分支完整性」做判定。现头 20 插件无此检查：supplied_pattern_filter_guard 判用户供给模式/过滤器的名单守卫（pattern/jq 面）、path_validation_pinning 判路径校验—使用钉住，均装不下上传类型校验面。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：带 MCP/聊天功能的 WordPress AI 插件（AI Engine 类）的远程图片拉取落盘面｜受影响人群：站点管理员（打开附件 URL 时受存储型 XSS）、站点访客｜国内相关性：同型推断——国内 WordPress AI 插件部署广泛、同型面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261127-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-27」，SE41）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261127-03

- 事件与类别：CVE-2026-137586——LibreChat LDAP 登录密码类型未校验致进程退出（CWE-1287，仓库级 GHSA-572g-g8hc-w8c9）。类别：其他（输入类型校验／拒绝服务）。公开日：2026-11-26（CVE 记录 2026-11-26T13:39Z 发布，VulnCheck CNA；仓库维护者 2026-11-17 审计发生在草稿协调期、不作公开日；受影响 0.7.3–<0.8.9，0.8.9 修复）。影响：LDAP 启用时 /api/auth/login 的 requireLdapAuth 把非字符串 password（数字/布尔）直传 ldapjs bind，assert.optionalString 断言在 socket 回调中抛出、无人捕获，uncaughtException 处理器默认 process.exit(1)；未认证者只需一个目录内邮箱即可一请求停服、重启后可重复。来源：https://github.com/LibreChat-AI/LibreChat/security/advisories/GHSA-572g-g8hc-w8c9
- 考题：对外部输入进入敏感调用前的校验摘要，V19 应判定：①调用方供给字段未经类型校验进入会抛断言/异常的下游调用、且异常可达进程级终止 ＝ fail（本件本体）；②字段类型在进入下游前被校验、非法类型被拒且不终止进程 ＝ pass 不误报；③类型校验证据缺失 ＝ inconclusive。应引用被检输入校验与异常处理证据。
- 标准：应有一条在册检查对被审对象的「外部输入类型校验与未处理异常终止面」做判定。现头 20 插件无此检查：caller_parameter_resource_limit 判参数尺寸/计数上限与请求形状、不判类型校验；nonfinite_score 只判分数有限性；全文检索沿用实取树 type/assert 主题无对应 RULE_ID。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：多用户 LLM 聊天前端（LibreChat 类）的 LDAP 登录面｜受影响人群：启用 LDAP 的部署方全部用户（未认证即可反复停服）｜国内相关性：同型推断——国内 LibreChat 自托管部署的 LDAP 接入面存在同型风险；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261127-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-27」，SE42）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261127-04

- 事件与类别：CVE-2026-137588——LibreChat 会话导入算法复杂度拒绝服务（仓库级 GHSA-r38q-3g6w-gc58）。类别：其他（算法复杂度／拒绝服务）。公开日：2026-11-26（CVE 记录 2026-11-26 发布，VulnCheck CNA；受影响 0.7.6–<0.8.8，0.8.8 修复）。影响：已认证用户向 POST /api/convos/import 上传含大量不可解析 parentMessageId 的构造导入文件，cloneMessagesWithTimestamps／adjustTimestampsForOrdering 触发二次方处理、阻塞 Node.js 事件循环数分钟，全员不可用。来源：https://github.com/LibreChat-AI/LibreChat/security/advisories/GHSA-r38q-3g6w-gc58
- 考题：对调用方供给数据结构的处理摘要，V19 应判定：①处理成本随构造结构（如不可解析引用数）超线性增长且无复杂度/规模上限、单请求可长期占用事件循环/执行单元 ＝ fail（本件本体）；②处理带复杂度上限或线性化处理、超限被拒 ＝ pass 不误报；③处理复杂度证据缺失 ＝ inconclusive。应引用被检处理复杂度与上限证据。
- 标准：应有一条在册检查对被审对象的「调用方触发的处理量/资源生成上限」做判定。现头在册 caller_parameter_resource_limit 只判参数值尺寸/计数与请求形状，其字段集装不下「处理过程派生的计算量随输入结构超线性增长」面；supplied_pattern_filter_guard 判模式/过滤器守卫、亦装不下。缺口与 EXAM-20261127-05 同族（服务端对调用方触发的计算/资源生成无上限），合立一条。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：多用户 LLM 聊天前端（LibreChat 类）的会话导入处理面｜受影响人群：同实例全部用户（事件循环被单个导入请求长期阻塞）｜国内相关性：同型推断——国内同类导入/迁移功能的处理复杂度面存在；未见国内同型公开披露。
- 核验证据落点：同 EXAM-20261127-01 的现头实取面。缺口已入 loop backlog 在队区（来源「安全考卷 2026-11-27」，SE43 本件立案）。诚实口径不变：此为规则覆盖级静态核验，非实跑。

## EXAM-20261127-05

- 事件与类别：CVE-2026-137657——InternLM LMDeploy DistServe connection_warmup 无界资源生成（CWE-770）。类别：其他（无界资源分配／拒绝服务）。公开日：2026-11-26（CVE 记录 2026-11-26T20:17Z 发布，VulnCheck CNA；受影响 0.9.0–0.18.0、无修复版，CVSS 3.1 7.5）。影响：prefill/decode 连接 pending 时（如先经 /nodes/add 注册慢节点），未认证者反复请求 /distserve/connection_warmup 即无界生成 wait_for_conn() 任务与套接字，直至 DistServe 代理进程内存耗尽被杀。来源：https://www.cve.org/CVERecord?id=CVE-2026-137657
- 考题：对端点触发的异步资源生成摘要，V19 应判定：①单请求可重复触发且每次生成新的异步任务/连接等待对象、无并发或总量上限 ＝ fail（本件本体）；②同类触发被合并/限流、生成量有上限 ＝ pass 不误报；③资源生成上限证据缺失 ＝ inconclusive。应引用被检资源生成与上限证据。
- 标准：同 EXAM-20261127-04——应由「调用方触发的处理量/资源生成上限」检查判定，现头无此检查（caller_parameter_resource_limit 只判参数值面、装不下请求触发的任务/套接字生成面）。
- 核验状态：未覆盖
- 影响面：受影响系统/产品类型：LLM 推理服务框架（LMDeploy 类）的分离式服务（DistServe）代理面｜受影响人群：对外暴露 DistServe 代理的部署方（未认证即可耗尽代理内存）、其推理服务用户｜国内相关性：直接相关——InternLM LMDeploy 为国内产品，部署面在国内广泛存在。
- 核验证据落点：同 EXAM-20261127-01 的现头实取面。缺口与 EXAM-20261127-04 同一缺口、已在 loop backlog 在队区 SE43，本条不重复入队，仅在 SE43 条下补记本事件。诚实口径不变：此为规则覆盖级静态核验，非实跑。
