import { getCollection } from 'astro:content';
import { SITE_URL } from '../lib/schema';
import { blogYayindaMi } from '../lib/blog-yayin';

// Blog RSS 2.0 — <link rel="alternate" href="/rss.xml"> (BaseLayout) bu dosyaya gider.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const yazilar = (await getCollection('blog'))
    .filter((e) => blogYayindaMi(e))
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

  const ogeler = yazilar
    .map((e) => {
      const link = `${SITE_URL}/blog/${e.id}`;
      return `    <item>
      <title>${esc(e.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${e.data.published.toUTCString()}</pubDate>
      <description>${esc(e.data.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GONET Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Gonet blogu: AEO/GEO, SEO ve dijital pazarlama yazıları.</description>
    <language>tr</language>
${ogeler}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
