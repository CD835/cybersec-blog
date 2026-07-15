import PostCard from "@/components/PostCard";
import TagCloud from "@/components/TagCloud";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section — 背景图 */}
      <section className="hero-bg py-16 sm:py-24 text-center relative rounded-xl overflow-hidden my-8">
        {/* 装饰光晕 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-[var(--accent)] opacity-[0.06] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-[var(--accent)] opacity-[0.06] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] mb-6 font-mono text-xs text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            系统在线
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-[var(--text-primary)]">网络安全</span>
            <br />
            <span className="gradient-text">研究与 CTF Writeup</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            探索二进制漏洞利用、逆向工程、Web 安全与 CTF 竞赛的深度世界。
            记录攻防安全的学习历程。
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="px-6 py-2.5 bg-[var(--accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-sm font-mono"
            >
              $ 搜索文章
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

      {/* 统计栏 */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "文章", value: String(posts.length) },
          { label: "分类", value: String(new Set(posts.map((p) => p.category)).size || 0) },
          { label: "标签", value: String(new Set(posts.flatMap((p) => p.tags)).size || 0) },
          { label: "CTF", value: String(posts.filter((p) => p.tags.includes("CTF")).length || 0) },
        ].map((stat) => (
          <div key={stat.label} className="cyber-card p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] font-mono">{stat.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 最近文章 */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">&gt;</span> 最近文章
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">最新的研究与 Writeup</p>
          </div>
          {posts.length > 6 && (
            <Link href="/search" className="text-sm font-mono text-[var(--accent)] hover:underline">
              查看全部 &rarr;
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
              <div className="text-4xl mb-4 font-mono text-[var(--text-muted)]">&gt;_</div>
              <p className="text-[var(--text-muted)] font-mono">还没有文章，敬请期待...</p>
            </div>
          )}
        </div>
      </section>

      {/* 标签云 */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">
          <span className="text-[var(--accent)]">#</span> 话题
        </h2>
        <TagCloud />
      </section>
    </div>
  );
}
