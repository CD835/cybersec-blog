"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="mb-8">
        <div className="text-6xl sm:text-8xl font-bold text-[var(--accent)] font-mono mb-4 inline-block px-6 py-2">
          404
        </div>
        <div className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          Page Not Found
        </div>
        <p className="text-[var(--text-muted)] font-mono text-sm">
          The requested resource could not be located on this server.
        </p>
      </div>

      <div className="terminal-box inline-block p-6 pt-10 mb-8 text-left">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <div className="font-mono text-sm space-y-1">
          <p>
            <span className="text-[var(--text-muted)]">$</span>{" "}
            <span className="text-[var(--accent)]">curl</span>{" "}
            <span className="text-[var(--text-primary)]">{pathname || "/unknown"}</span>
          </p>
          <p className="text-red-400">Error: 404 - Resource not found</p>
          <p className="text-[var(--text-muted)]">
            Possible causes:
          </p>
          <p className="text-[var(--text-muted)] ml-4">
            - The page may have been moved or deleted
          </p>
          <p className="text-[var(--text-muted)] ml-4">
            - The URL may contain a typo
          </p>
          <p className="text-[var(--text-muted)] ml-4">
            - You may have followed a broken link
          </p>
          <p>
            <span className="text-[var(--text-muted)]">$</span>{" "}
            <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-sm font-mono"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
            />
          </svg>
          cd /home
        </Link>
      </div>
    </div>
  );
}
