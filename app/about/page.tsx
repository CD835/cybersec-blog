import { type Metadata } from "next";
import TagCloud from "@/components/TagCloud";

export const metadata: Metadata = {
  title: "关于",
  description: "关于累了 Blog — 网络安全研究、CTF Writeup、安全工具分享。",
};

const skills = [
  "逆向工程",
  "二进制漏洞利用",
  "Web 安全",
  "渗透测试",
  "CTF 竞赛",
  "恶意软件分析",
  "密码学",
  "Python 脚本",
  "Kali Linux",
  "Burp Suite",
  "Ghidra / IDA Pro",
  "Wireshark",
  "Metasploit",
  "Docker 安全",
];

const tools = [
  { name: "Kali Linux", desc: "渗透测试发行版" },
  { name: "Burp Suite", desc: "Web 应用安全测试" },
  { name: "Ghidra", desc: "逆向工程与二进制分析" },
  { name: "Wireshark", desc: "网络协议分析" },
  { name: "Metasploit", desc: "漏洞利用框架" },
  { name: "Nmap", desc: "网络发现与安全审计" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 终端卡片 */}
      <section className="mb-12">
        <div className="terminal-box p-8 pt-12 relative">
          <div className="terminal-dots">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>

          <div className="font-mono text-sm text-[var(--accent)] mb-4">
            <span className="text-[var(--text-muted)]">$</span> whoami
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--text-primary)]">
            安全研究员 & CTF 爱好者
          </h1>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            欢迎来到 <span className="text-[var(--accent)] font-mono">累了</span> —— 一个专注于
            网络安全的博客。在这里我记录 CTF 竞赛的解题过程、逆向工程挑战、
            漏洞研究和安全工具开发。
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            我对系统如何工作（以及如何崩溃）充满热情，通过研究攻击面来更好地防御
            真实世界的威胁。这个博客既是个人知识库，也是安全社区的学习资源。
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed">
            不搞 CTF 或逆向分析的时候，我在折腾新的安全工具、参与开源安全项目，
            或者写一些关于最新漏洞和利用技术的文章。
          </p>
        </div>
      </section>

      {/* 技能 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> 技能与专长
        </h2>
        <div className="cyber-card p-6">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill}
                className="px-3 py-1.5 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 工具箱 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> 工具箱
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="cyber-card p-4 group">
              <h3 className="font-mono font-semibold text-sm text-[var(--accent)] mb-1 group-hover:glow-text transition-all">
                {tool.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 博客话题 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">#</span> 博客话题
        </h2>
        <div className="cyber-card p-6">
          <TagCloud />
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> 联系我
        </h2>
        <div className="cyber-card p-6">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            想合作、有问题、或者想讨论安全相关的话题？欢迎通过这些方式联系我：
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "GitHub", href: "https://github.com/CD835", icon: "gh" },
              { label: "邮箱", href: "mailto:admin@example.com", icon: "@" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-mono text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                <span className="text-[var(--accent)]">[{link.icon}]</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 声明 */}
      <section>
        <div className="border border-[var(--border-color)] border-l-[3px] border-l-red-500 rounded-lg p-4 bg-[var(--bg-secondary)]">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            <strong className="text-red-400">免责声明：</strong>
            本博客所有内容仅供教育研究目的。所讨论的技术和工具仅应在
            拥有授权的系统上使用。请始终遵循负责任的披露实践和相关法律。
          </p>
        </div>
      </section>
    </div>
  );
}
