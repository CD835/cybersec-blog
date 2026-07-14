# >_ 0xSec Blog

A modern, production-ready cybersecurity blog built with Next.js 14, TypeScript, Tailwind CSS, and MDX. Features dark/light mode, full-text search, syntax highlighting, RSS feed, and static export for GitHub Pages.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4)

## Features

- **Dark/Light Mode** -- Toggle between cyberpunk dark theme and clean light mode
- **MDX Content** -- Write posts in MDX with full Markdown support and JSX components
- **Syntax Highlighting** -- Beautiful code blocks with Shiki and rehype-pretty-code (One Dark Pro)
- **Full-Text Search** -- Search across all posts by title, description, tags, and categories
- **Table of Contents** -- Auto-generated TOC with scroll tracking for longer posts
- **Tag System** -- Organize content with tags and filter by category
- **RSS Feed** -- Auto-generated RSS feed for subscribers
- **SEO Optimized** -- Metadata, Open Graph, Twitter Cards, sitemap, and robots.txt
- **Responsive Design** -- Mobile-first layout that looks great on all devices
- **Static Export** -- Pre-built HTML output for GitHub Pages or any static hosting
- **Reading Time** -- Estimated reading time for each post
- **Related Posts** -- Smart suggestions based on tag overlap
- **Keyboard Shortcuts** -- `Ctrl+K` to focus search, smooth navigation

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS + @tailwindcss/typography |
| Content | MDX with gray-matter |
| Code Highlight | Shiki + rehype-pretty-code |
| Markdown | remark + rehype pipeline |
| Search | Client-side Fuse.js-style search |
| Icons | Custom SVG + Heroicons |

## 📂 Project Structure

```
secblog/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page (blog listing)
│   ├── globals.css         # Tailwind + custom styles
│   ├── about/page.tsx      # About page
│   ├── posts/[slug]/page.tsx  # Individual post pages
│   └── search/page.tsx     # Search page
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── PostCard.tsx        # Blog post card
│   ├── SearchBar.tsx       # Search input
│   ├── ThemeToggle.tsx     # Dark/light toggle
│   ├── ThemeProvider.tsx   # Theme context provider
│   ├── TableOfContents.tsx # Post TOC
│   ├── TagCloud.tsx        # Tag visualization
│   └── MDXRenderer.tsx     # MDX HTML renderer
├── content/posts/          # MDX blog posts
├── lib/                    # Utility functions
├── scripts/                # Build scripts (MDX compilation)
├── public/                 # Static assets
└── data/                   # Generated metadata
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
cd secblog
npm install
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Build

```bash
npm run build
# Output in out/ directory
```

### Writing Posts

Create `.mdx` files in `content/posts/` with frontmatter:

```yaml
---
slug: my-first-ctf-writeup
title: "My First CTF Writeup"
description: "Solving a reverse engineering challenge"
date: "2026-07-15"
tags: ["CTF", "Reverse Engineering"]
category: "Writeups"
author: "Your Name"
image: "/images/post-cover.png"
---

# Content here...

Markdown with **bold**, *italic*, `code`, and code blocks.

```python
# Code blocks get automatic syntax highlighting
def solve_challenge():
    print("Hello, CTF!")
```
```

## Customization

### Theme Colors

Edit CSS variables in `app/globals.css` in the `:root` (light) and `.dark` blocks:

```css
:root {
  --accent: #00b894;
  --accent-glow: #00ff41;
  /* ... other variables */
}
```

### Site URL

Update the `SITE_URL` constant in `scripts/compile-posts.mjs` before deploying:

```javascript
const SITE_URL = "https://cd835.github.io/cybersec-blog";
```

### Adding OG Images

Replace `public/images/default-og.svg` with your own 1200x630 PNG image, or set a per-post image in the frontmatter `image` field.

### Custom Components

The MDX pipeline compiles content to HTML at build time. To add interactive MDX components, extend the unified pipeline in `scripts/compile-posts.mjs`.

## 📦 Deployment

### GitHub Pages

This blog is configured for GitHub Pages deployment. Push to the `main` branch and GitHub Actions will automatically build and deploy.

The workflow is in `.github/workflows/deploy.yml`.

### Manual Deployment

```bash
npm run build
# Deploy the out/ directory to any static hosting
```

## 📄 License

MIT License
