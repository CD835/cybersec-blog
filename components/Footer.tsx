import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-mono font-bold text-lg mb-2">
              <span className="text-[var(--accent)]">&gt;_</span>
              <span className="gradient-text">0xSec</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Cybersecurity research, CTF writeups, and security tools.
              Exploring the offensive side of information security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Search Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                Next.js
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                TypeScript
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                Tailwind
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                MDX
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                Shiki
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            &copy; {new Date().getFullYear()} 0xSec Blog. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Powered by curiosity and caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}
