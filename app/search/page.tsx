"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { getAllPosts } from "@/lib/posts";
import { searchPosts, formatDateShort } from "@/lib/utils";
import { type SearchResult } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const tagParam = searchParams.get("tag") || "";

  const [query, setQuery] = useState(queryParam);
  const allPosts = useMemo(() => getAllPosts(), []);

  const results = useMemo<SearchResult[]>(() => {
    if (tagParam) {
      return allPosts
        .filter((post) =>
          post.tags.some((t) => t.toLowerCase() === tagParam.toLowerCase())
        )
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          tags: post.tags,
          category: post.category,
          excerpt:
            post.description.slice(0, 150) +
            (post.description.length > 150 ? "..." : ""),
        }));
    }
    return searchPosts(allPosts, queryParam);
  }, [allPosts, queryParam, tagParam]);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const clearTag = () => {
    router.push("/search");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        <span className="text-[var(--accent)]">&gt;</span> 搜索文章
      </h1>
      <p className="text-sm text-[var(--text-muted)] mb-8 font-mono">
        {tagParam
          ? `按标签筛选: #${tagParam}`
          : `在 ${allPosts.length} 篇文章中搜索标题、描述、标签和分类。`}
      </p>

      <SearchBar initialQuery={queryParam} className="mb-8" />

      {tagParam && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-[var(--text-muted)] font-mono">当前筛选:</span>
          <span className="tag-badge !border-[var(--accent)]">#{tagParam}</span>
          <button
            onClick={clearTag}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            [清除]
          </button>
        </div>
      )}

      {/* Results */}
      {(queryParam || tagParam) && (
        <div className="mb-4">
          <p className="text-sm text-[var(--text-muted)] font-mono">
            找到 {results.length} 条结果
        </div>
      )}

      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((result) => (
            <Link
              key={result.slug}
              href={`/posts/${result.slug}`}
              className="cyber-card p-5 group block"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-[var(--accent)] bg-[var(--code-bg)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                  {result.category}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {formatDateShort(result.date)}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                {result.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                {result.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-badge text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (queryParam || tagParam) ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 font-mono text-[var(--text-muted)]">404</div>
            <p className="text-[var(--text-muted)] font-mono mb-4">没有找到匹配的文章。</p>
            <button onClick={clearTag} className="text-sm font-mono text-[var(--accent)] hover:underline">
              清除筛选重试
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 font-mono text-[var(--text-muted)]">&gt;_</div>
            <p className="text-[var(--text-muted)] font-mono">输入搜索关键词或选择标签来查找文章。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-[var(--text-muted)] font-mono">Loading search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
