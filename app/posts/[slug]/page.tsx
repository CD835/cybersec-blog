import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import MDXRenderer from "@/components/MDXRenderer";
import TableOfContents from "@/components/TableOfContents";
import { type Heading } from "@/lib/types";

// Import compiled post data
import fs from "fs";
import path from "path";

interface PostPageProps {
  params: { slug: string };
}

function getCompiledPost(slug: string) {
  const filePath = path.join(process.cwd(), ".compiled", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.image || "/images/default-og.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image || "/images/default-og.png"],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const compiled = getCompiledPost(params.slug);
  if (!compiled) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);
  const headings: Heading[] = compiled.headings || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-xs font-mono text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/search" className="hover:text-[var(--accent)] transition-colors">
              Posts
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text-secondary)]">{post.title}</span>
          </nav>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-[var(--accent)] bg-[var(--code-bg)] px-2.5 py-1 rounded border border-[var(--border-color)]">
                {post.category}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {formatDate(post.date)}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                by {post.author}
              </span>
              <span className="text-[var(--text-muted)]">&middot;</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?tag=${encodeURIComponent(tag)}`}
                  className="tag-badge"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="cyber-card p-6 sm:p-8 mb-8">
            <MDXRenderer html={compiled.contentHtml} />
          </div>

          {/* Post Footer */}
          <div className="border-t border-[var(--border-color)] pt-6 mb-12">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <Link
                href="/search"
                className="text-sm font-mono text-[var(--accent)] hover:underline"
              >
                &larr; Back to all posts
              </Link>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(
                    `https://yourusername.github.io/posts/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag-badge hover:border-[var(--accent)]"
                >
                  Share on X
                </a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                <span className="text-[var(--accent)]">&gt;</span> Related Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/posts/${related.slug}`}
                    className="cyber-card p-4 group"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar - Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
