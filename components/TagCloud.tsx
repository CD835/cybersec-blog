import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagCloud() {
  const tags = getAllTags();

  if (tags.length === 0) {
    return (
      <div className="text-sm text-[var(--text-muted)] font-mono">
        No tags yet.
      </div>
    );
  }

  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => {
        const size = 0.75 + (count / maxCount) * 0.5;
        return (
          <Link
            key={tag}
            href={`/search?tag=${encodeURIComponent(tag)}`}
            className="tag-badge"
            style={{ fontSize: `${size}rem` }}
          >
            #{tag}
            <span className="ml-1 text-[var(--text-muted)]">({count})</span>
          </Link>
        );
      })}
    </div>
  );
}
