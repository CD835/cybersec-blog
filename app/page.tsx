import PostCard from "@/components/PostCard";
import TagCloud from "@/components/TagCloud";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 text-center relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-[var(--accent)] opacity-[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-[var(--accent)] opacity-[0.02] rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] mb-6 font-mono text-xs text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            SYSTEM ONLINE
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-[var(--text-primary)]">Cybersecurity</span>
            <br />
            <span className="gradient-text">Research & CTF Writeups</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Exploring the depths of binary exploitation, reverse engineering,
            web security, and Capture The Flag challenges. Documenting the
            journey through the offensive security landscape.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="px-6 py-2.5 bg-[var(--accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-sm font-mono"
            >
              $ search --all-posts
            </Link>
            <Link
              href="/about"
              className="px-6 py-2.5 border border-[var(--border-color)] text-[var(--text-primary)] font-medium rounded-lg hover:border-[var(--accent)] transition-all text-sm font-mono"
            >
              whoami
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Posts", value: String(posts.length) },
          { label: "Categories", value: String(new Set(posts.map((p) => p.category)).size || 0) },
          {
            label: "Tags",
            value: String(new Set(posts.flatMap((p) => p.tags)).size || 0),
          },
          { label: "CTFs", value: String(posts.filter((p) => p.tags.includes("CTF")).length || 0) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="cyber-card p-4 text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] font-mono">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1 font-mono uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Recent Posts */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">&gt;</span> Recent Posts
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">
              Latest research and writeups
            </p>
          </div>
          {posts.length > 3 && (
            <Link
              href="/search"
              className="text-sm font-mono text-[var(--accent)] hover:underline"
            >
              View all &rarr;
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.length > 0 ? (
            posts.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-4xl mb-4 font-mono text-[var(--text-muted)]">
                &gt;_
              </div>
              <p className="text-[var(--text-muted)] font-mono">
                No posts published yet. Stay tuned for cybersecurity content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tags Section */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">
          <span className="text-[var(--accent)]">#</span> Topics
        </h2>
        <TagCloud />
      </section>

      {/* Newsletter / Subscribe CTA */}
      <section className="mb-12">
        <div className="cyber-card p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent" />
          <div className="relative">
            <div className="text-2xl mb-2 font-mono">&gt; rss-subscribe</div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-primary)]">
              Stay Updated
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-md mx-auto">
              Subscribe to the RSS feed to get notified about new posts,
              CTF writeups, and security research.
            </p>
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-sm font-mono"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44m0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
              </svg>
              Subscribe via RSS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
