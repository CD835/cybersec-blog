import Link from "next/link";
import { type BlogPostMeta } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

interface PostCardProps {
  post: BlogPostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="cyber-card p-5 sm:p-6 group animate-fade-in">
      <div className="flex flex-col h-full">
        {/* Meta Row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-[var(--accent)] bg-[var(--code-bg)] px-2 py-0.5 rounded border border-[var(--border-color)]">
            {post.category}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {formatDateShort(post.date)}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-mono ml-auto">
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/posts/${post.slug}`}
          className="group/link"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-primary)] group-hover/link:text-[var(--accent)] transition-colors duration-200 leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed flex-1">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?tag=${encodeURIComponent(tag)}`}
              className="tag-badge hover:border-[var(--accent)]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
