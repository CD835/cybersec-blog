import { type BlogPostMeta, type BlogPost, type TagCount } from "./types";

// These are loaded from pre-compiled JSON files
import postsData from "@/data/posts.json";
import tagsData from "@/data/tags.json";
import categoriesData from "@/data/categories.json";

export function getAllPosts(): BlogPostMeta[] {
  return postsData as BlogPostMeta[];
}

export function getPostBySlug(slug: string): BlogPostMeta | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllTags(): TagCount[] {
  return tagsData as TagCount[];
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  return categoriesData as string[];
}

export function getRecentPosts(count: number = 3): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}

export function getRelatedPosts(
  currentSlug: string,
  count: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aCommon = a.tags.filter((t) => currentPost.tags.includes(t)).length;
      const bCommon = b.tags.filter((t) => currentPost.tags.includes(t)).length;
      return bCommon - aCommon;
    })
    .slice(0, count);
}
