import { type BlogPostMeta, type SearchResult } from "./types";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function searchPosts(
  posts: BlogPostMeta[],
  query: string
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const terms = query.toLowerCase().trim().split(/\s+/);

  return posts
    .filter((post) => {
      const searchText = [
        post.title,
        post.description,
        post.category,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => searchText.includes(term));
    })
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

export function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  if (minutes < 1) return "Less than 1 min read";
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}
