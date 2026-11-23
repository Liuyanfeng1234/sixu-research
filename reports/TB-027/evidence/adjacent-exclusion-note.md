# 相邻检查排除依据（TB-027 §5.2；2026-11-23 返修更新）

- command_injection.py：blob 266042c9c1a59daef5044f7e25971f3b122208b4，7,999 B，VERSION 0.1.0，RULE_ID v19.command_injection.unneutralized_construction。文件头自述：Argument-list / parameterized execution, where each input stays a separate argument and never becomes command syntax, is not this pattern。本件为 argv 分离下成立的标志形操作数注入，落在其自述排除范围。
  - 判定序实读（核验钉 afde5447 字节，源码第 92–117 行 `_decision`）：先核证据来源（inspection_source 须以 inspected 开头）与字段一致性（枚举合法性、shell_string 与 argv_separation 等模式-中和一致性），前置不合即 inconclusive；之后才进入适用分支，其中 argv_list 分支（argv_separated_construction）给出的是 shell 语法面的通过。
  - 口径：满足前置条件时，该构造可通过本规则，但该通过只及 shell 语法面，不覆盖被调用程序的参数语义；本件注入面正在参数语义，故不计覆盖（首稿「一律 pass／误判」表述已删改）。
- 其余 19 插件：逐件入口／判据排除表见 plugins-exclusion-table-20.md（本轮补件，含 VERSION 版本清单）；主题为授权／身份／凭证／SQL 构造／路径钉住／模型工件／资源上限等，判据入口均不接收位置操作数处理证据，逐件对表后均不装下本展品。
- 全文检索：实取树（2026-11-20）operand／end_of_options／dash 零命中——仅为辅助证据，关键词零命中不能单独证明全部规则未覆盖；覆盖判定以逐件排除表为准。
