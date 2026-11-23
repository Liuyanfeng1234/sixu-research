# TB-027 分诊原表（15/18，A 级）——摘自任务卡 TB-027（task-board.md）与考卷库 EXAM-20261123-01

①重大性 2——Kubernetes 管理类 MCP 服务器 mcp-server-kubernetes，exec_in_pod／kubectl_patch／kubectl_logs 等工具可注入 --filename 等标志使 kubectl 读取服务器主机文件、绕过文件读取限制，CVSS 4.0 高危、<4.2.0 受影响，无在野利用报告
②新颖性 3——考卷库未覆盖的新类别「标志形位置操作数参数注入」，新缺口 SE26，argv 分离下仍成立
③规则相关性 3——暴露高价值未覆盖缺口 SE26，相邻检查 v19.command_injection.unneutralized_construction 按其自身口径明确不覆盖 argv 分离构造、误装会判 pass
④时效热度 2——披露 2026-11-22（NVD Published Date 2026-11-22，VulnCheck CNA），≤72h 属实、行业热议未见实证
⑤可分析性 2——一手源齐（VulnCheck advisory＋NVD 记录）、机理与受影响／修复版本已述，无 PoC／可复现材料引文
⑥受众相关性 3——智能体／MCP 工具链核心面（MCP 驱动 kubectl 工具调用面）
⑦风险折扣 0——两源一致、无点名争议
总分 15；硬门：重大性 2≥2、可分析性 2≥2，无 −3 暂缓。

---
返修注记（2026-11-23，L2 退修后加注；上表原表逐字保留、分数不动）：
- ④时效热度「披露 2026-11-22」口径已在返修稿中更正为分列：公开时点 CNA datePublic＝2026-10-26（v4.2.0 发布页同日列出加固）、CVE 记录发布 datePublished＝2026-11-22 UTC（北京时间 11-23）；11-22 不称首次公开。考卷采样以记录发布为锚的规则已写入返修稿表 2 表头注。
- ⑦「两源一致」注：NVD 记录与 VulnCheck 公告同源于 CNA 描述，多处转列不构成独立复证；返修稿已按此改口径。
