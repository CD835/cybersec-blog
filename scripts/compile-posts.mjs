import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const postsDir = path.join(rootDir, "content", "posts");
const outputDir = path.join(rootDir, ".compiled");
const dataOutputDir = path.join(rootDir, "data");

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(dataOutputDir)) {
  fs.mkdirSync(dataOutputDir, { recursive: true });
}

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

async function compileMdxToHtml(mdxContent) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, rehypePrettyCodeOptions)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(mdxContent);

  return String(result);
}

function extractHeadings(mdxContent) {
  const headings = [];
  const lines = mdxContent.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9一-鿿]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

async function compileAllPosts() {
  if (!fs.existsSync(postsDir)) {
    console.log("No posts directory found. Skipping compilation.");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  if (files.length === 0) {
    console.log("No MDX files found. Skipping compilation.");
    return;
  }

  const allPostsMeta = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(rawContent);
    const slug = data.slug || file.replace(/\.mdx$/, "");

    console.log(`Compiling: ${slug}`);

    const html = await compileMdxToHtml(content);
    const headings = extractHeadings(content);
    const stats = readingTime(content);

    const meta = {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      category: data.category || "Uncategorized",
      author: data.author || "Security Researcher",
      image: data.image || "/images/default-og.png",
      readingTime: data.readingTime || stats.text,
      headings,
    };

    // Save individual compiled post
    const compiled = {
      ...meta,
      contentHtml: html,
    };

    fs.writeFileSync(
      path.join(outputDir, `${slug}.json`),
      JSON.stringify(compiled, null, 2)
    );

    allPostsMeta.push(meta);
  }

  // Sort by date descending
  allPostsMeta.sort((a, b) => (a.date < b.date ? 1 : -1));

  // Save metadata index
  fs.writeFileSync(
    path.join(dataOutputDir, "posts.json"),
    JSON.stringify(allPostsMeta, null, 2)
  );

  // Extract all tags
  const tagMap = new Map();
  allPostsMeta.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  fs.writeFileSync(
    path.join(dataOutputDir, "tags.json"),
    JSON.stringify(tags, null, 2)
  );

  const categories = [...new Set(allPostsMeta.map((p) => p.category))].sort();

  fs.writeFileSync(
    path.join(dataOutputDir, "categories.json"),
    JSON.stringify(categories, null, 2)
  );

  console.log(`\nCompiled ${files.length} posts successfully.`);
  console.log(`Tags: ${tags.map((t) => `${t.tag}(${t.count})`).join(", ")}`);
  console.log(`Categories: ${categories.join(", ")}`);
}

compileAllPosts().catch(console.error);
