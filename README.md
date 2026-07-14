# 🔐 0xSec Blog — Modern Cybersecurity Blog

> A high-performance, modern cybersecurity blog built with Next.js 14, TypeScript, MDX, and Tailwind CSS.

## ✨ Features

- **🚀 Next.js 14 App Router** — Fast page loads with static generation
- **📝 MDX Content** — Write posts in Markdown with embedded React components
- **🎨 Dark/Light Mode** — Cyberpunk-inspired design with full theme support
- **🔍 Full-Text Search** — Client-side search across all posts
- **💻 Code Highlighting** — Beautiful syntax highlighting with Shiki (One Dark Pro theme)
- **📱 Fully Responsive** — Mobile-first design, looks great on all devices
- **🏷️ Tags & Categories** — Organize content by topics
- **📖 Table of Contents** — Auto-generated TOC for each post
- **⏱️ Reading Time** — Estimated reading time for each article
- **🔗 SEO Optimized** — OpenGraph, Twitter cards, meta tags, sitemap
- **📡 RSS Feed** — Auto-generated RSS feed
- **⚡ Static Export** — Deploy anywhere (GitHub Pages, Cloudflare Pages, etc.)

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

```mdx
---
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
```

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
