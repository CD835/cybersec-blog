import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div>
            <div className="font-mono font-bold text-lg mb-2">
              <span className="text-[var(--accent)]">&gt;_</span>
              <span className="gradient-text">累了</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              网络安全研究、CTF Writeup、安全工具分享。
              探索信息安全的攻防世界。
            </p>
          </div>

          {/* 快捷链接 */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">
              快捷链接
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">首页</Link></li>
              <li><Link href="/search" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">搜索文章</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">关于</Link></li>
              <li><a href="/rss.xml" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">RSS 订阅</a></li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "Tailwind", "MDX", "Shiki"].map((tech) => (
                <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            &copy; {new Date().getFullYear()} 累了 Blog. 保留所有权利。
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            由好奇心和咖啡驱动
          </p>
        </div>
      </div>
    </footer>
  );
}
