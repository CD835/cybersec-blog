"use client";

interface MDXRendererProps {
  html: string;
}

export default function MDXRenderer({ html }: MDXRendererProps) {
  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
