# GHSA 公告可读摘录（TB-024 一手源固定出处）

- 出处：仓库级 GHSA 公告 GHSA-vx67-5jmh-4xq2，https://github.com/bvisible/mcp-ssh-manager/security/advisories/GHSA-vx67-5jmh-4xq2 ，标题「ssh_deploy: the approval card hides the restart command and the files being deployed」。
- 实读：2026-11-21 本线实读正文全文（页面抓取时点 2026-11-21 09:52 UTC），六段齐：Summary／Details／Impact／Patches／Workarounds／Credits。本摘录为分段要旨＋关键短语原文，报告者构造值等可复现细节不转录（原文见出处）。
- 结构化字段说明：本次实读正文**未含**受影响版本上限、公告发布精确时点、CWE 分类与 CVSS 数值字段；该四项在报告中按考卷线 advisory API 转引口径标注（见报告第八节 G-01），不以本摘录为据。

## Summary（要旨）

`ssh_deploy` 的 `restart` 选项在服务器上以 SSH 用户身份按原文执行为 shell 命令，Deployment Guide 一贯如此记载，但工具描述称之为 service；该工具请求的审批卡不带命令行：只读「(no command)」，既不显示 `restart` 命令，也不显示部署文件与目标路径——批准者看不到自己批准的内容。

## Details（要旨）

报告者指出 `src/deploy-helper.js` 中 `restart` 未经引用处理进入远端命令（path、owner、permissions 自 3.8.6 起已引用），并给出可在服务器建文件的构造值，公告记为可复现（构造细节见公告原文，本摘录不转录）。公告同时定性：`restart` 按 Deployment Guide 一贯是命令，引用化会破坏既有部署，且同一攻击者在 `unrestricted` 服务器上本可经 `ssh_execute` 执行任意命令——使之成为漏洞的是审批：引擎把完整请求（参数齐备、秘密已移除）发给界面，界面只显示 `command` 字段，而部署请求没有该字段；开启审批时部署卡只显示工具名、「Destructive」与「(no command)」，批准即执行无人见过的 `restart` 命令；其他无命令行的请求同样如此展示。

## Impact（要旨）

仅当服务器 approval 设为 `destructive` 或 `always`、且 MCP 客户端可被 steer（例如智能体读到的内容中的提示注入）时成立：智能体可把自备命令作为部署的一部分获批，以 SSH 用户身份在服务器执行。无审批时相对 `ssh_execute` 无增益；`readonly` 与 `restricted` 服务器整体拒绝 `ssh_deploy`。

## Patches（要旨）

4.3.1 修复：审批卡对无命令行的请求展示其参数（文件、目标路径、`restart` 命令），秘密已移除；`restart` 保持命令语义，工具描述与指南已改明。

## Workarounds（要旨）

升级前：不批准卡面为「(no command)」的请求；无部署业务的服务器保持 `readonly` 或 `restricted`；或关闭 `advanced` 工具组（`ssh-manager tools disable advanced`，`ssh_deploy` 所在组）。

## Credits

Reported by @Fastyyy123。
