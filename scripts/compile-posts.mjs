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
const publicDir = path.join(rootDir, "public");

const SITE_URL = "https://cd835.github.io/cybersec-blog";
const SITE_NAME = "0xSec Blog";
const SITE_DESCRIPTION =
  "A cybersecurity blog covering CTF challenges, reverse engineering, Kali Linux, web security, and penetration testing.";

// Ensure output directories exist
for (const dir of [outputDir, dataOutputDir, publicDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
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
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRSS(posts) {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/posts/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug}/</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

function generateSitemap(posts) {
  const staticPages = [
    { url: `${SITE_URL}/`, priority: "1.0", changefreq: "daily" },
    { url: `${SITE_URL}/about/`, priority: "0.8", changefreq: "monthly" },
    { url: `${SITE_URL}/search/`, priority: "0.7", changefreq: "weekly" },
  ];

  const postPages = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}/`,
    priority: "0.9",
    changefreq: "monthly",
    lastmod: post.date,
  }));

  const allPages = [...staticPages, ...postPages];

  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml

# Block compiled assets from indexing
Disallow: /.compiled/
`;
}

async function compileAllPosts() {
  if (!fs.existsSync(postsDir)) {
    console.log("No posts directory found. Creating placeholder files...");
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

  // Generate RSS feed
  const rssContent = generateRSS(allPostsMeta);
  fs.writeFileSync(path.join(publicDir, "rss.xml"), rssContent);
  console.log("Generated: public/rss.xml");

  // Generate sitemap
  const sitemapContent = generateSitemap(allPostsMeta);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);
  console.log("Generated: public/sitemap.xml");

  // Generate robots.txt
  const robotsContent = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsContent);
  console.log("Generated: public/robots.txt");

  console.log(`\nCompiled ${files.length} posts successfully.`);
  console.log(`Tags: ${tags.map((t) => `${t.tag}(${t.count})`).join(", ")}`);
  console.log(`Categories: ${categories.join(", ")}`);
}

compileAllPosts().catch(console.error);
