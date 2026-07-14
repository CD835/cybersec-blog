import { type Metadata } from "next";
import TagCloud from "@/components/TagCloud";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the 0xSec Blog - cybersecurity research, CTF writeups, and security tools.",
};

const skills = [
  "Reverse Engineering",
  "Binary Exploitation",
  "Web Security",
  "Network Penetration Testing",
  "CTF Competitions",
  "Malware Analysis",
  "Cryptography",
  "Python Scripting",
  "Kali Linux",
  "Burp Suite",
  "Ghidra / IDA Pro",
  "Wireshark",
  "Metasploit",
  "Docker Security",
];

const tools = [
  { name: "Kali Linux", desc: "Primary penetration testing distribution" },
  { name: "Burp Suite", desc: "Web application security testing" },
  { name: "Ghidra", desc: "Reverse engineering and binary analysis" },
  { name: "Wireshark", desc: "Network protocol analysis" },
  { name: "Metasploit", desc: "Exploitation framework" },
  { name: "Nmap", desc: "Network discovery and security auditing" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
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
            Security Researcher & CTF Enthusiast
          </h1>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Welcome to <span className="text-[var(--accent)] font-mono">0xSec</span> -- a blog
            dedicated to the art and science of cybersecurity. Here I document my
            journey through Capture The Flag competitions, reverse engineering
            challenges, vulnerability research, and security tool development.
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            With a passion for understanding how systems work (and how they
            break), I explore the offensive side of security to better defend
            against real-world threats. This blog serves as both a personal
            knowledge base and a resource for others in the infosec community.
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed">
            When I am not hacking away at CTFs or dissecting binaries, you will
            find me experimenting with new security tools, contributing to
            open-source security projects, or writing about the latest
            vulnerabilities and exploitation techniques.
          </p>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> Skills & Expertise
        </h2>
        <div className="cyber-card p-6">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> Toolkit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="cyber-card p-4 group"
            >
              <h3 className="font-mono font-semibold text-sm text-[var(--accent)] mb-1 group-hover:glow-text transition-all">
                {tool.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Topics */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">#</span> Blog Topics
        </h2>
        <div className="cyber-card p-6">
          <TagCloud />
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--accent)]">&gt;</span> Connect
        </h2>
        <div className="cyber-card p-6">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Interested in collaborating, have a question, or want to discuss
            security? Feel free to reach out through any of these channels:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "GitHub", href: "https://github.com", icon: "gh" },
              {
                label: "Twitter/X",
                href: "https://twitter.com",
                icon: "tw",
              },
              {
                label: "Email",
                href: "mailto:security@example.com",
                icon: "@",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-mono text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <span className="text-[var(--accent)]">[{link.icon}]</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="border border-[var(--border-color)] border-l-[3px] border-l-red-500 rounded-lg p-4 bg-[var(--bg-secondary)]">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            <strong className="text-red-400">Disclaimer:</strong> All content on
            this blog is for educational and research purposes only. The
            techniques and tools discussed should only be used on systems you
            own or have explicit permission to test. Always follow responsible
            disclosure practices and applicable laws.
          </p>
        </div>
      </section>
    </div>
  );
}
