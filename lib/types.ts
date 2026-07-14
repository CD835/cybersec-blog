export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  author: string;
  image?: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
}
