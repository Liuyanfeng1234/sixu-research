# SE24 入队原文摘录（TB-024 §5 固定指针）

出处：loop backlog（`hidden_files/loop-backlog.md`，缺口登记区 SE24 条）原文逐字摘录，2026-11-21 立项。TB-024 L2（小语，2026-11-21 13:12）要求 SE24 已入队须有可读依据，本摘录随 TB-024 载体（Draft PR #538）返修头送达。口径注记：摘录中验收标准的 pass 表述「展示与执行逐字一致不误报」为入队原文；经 TB-024 L2 修正，报告 §5.2／D-06 的 pass 判据以「安全相关内容实质一致（允许经定义的脱敏与无歧义格式变化）」为准，SE24 施工细化（N171）同步对齐。

> - SE24 **审批展示与实际执行内容一致性检查（缺）**：新提案：GHSA-vx67-5jmh-4xq2（mcp-ssh-manager，仓库级 GHSA 2026-11-20T22:43:08Z 发布，CWE-451/CWE-78，>=3.0.0、<=4.3.0 受影响，4.3.1 修复）——ssh_deploy 的 restart 命令与部署文件在人审审批卡上只显示「(no command)」，审批人看不到实际执行内容，可被提示注入 steer 的智能体夹带任意命令以 SSH 用户身份在远端执行；主链现头 89a65525 实取 20 插件无审批展示主题，command_injection 判命令构造、channel_sender_verification 判发送方身份，均不判「人审所见＝实际执行」。验收标准＝审批展示缺失/占位而执行内容存在的构造判 fail 并引用展示与执行两面证据、展示与执行逐字一致不误报、展示证据缺失判 inconclusive。证据落点：files/research/security-exam-bank.md EXAM-20261121-02、hidden_files/security-exam-2026-11-21/plugins_list.txt。
