import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

/**
 * LLM-friendly blog dökümü — /llms-blog.txt
 *
 * Astro build sırasında otomatik üretilir. Her blog post için:
 * title, URL, yayın tarihi, kategori, etiketler, özet.
 *
 * Amaç: AEO — LLM motorları (ChatGPT, Claude, Perplexity, Gemini) blog
 * koleksiyonunu tek text dosyadan ekstrakte edebilsin. llms.txt'in
 * "ek kaynak" katmanı.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

  const lines: string[] = [
    '# Gonet Blog — Tüm Yazılar (LLM-friendly döküm)',
    '',
    '> AEO/GEO/SEO odaklı editöryel yazılar. Title, kısa açıklama, yayın tarihi, kategori, etiketler, URL.',
    '> Tam içerik için her yazının URL\'sini ziyaret edin.',
    '',
    `## Toplam ${posts.length} yazı (en yeniden eskiye)`,
    '',
  ];

  for (const post of posts) {
    const url = `https://gonet.com.tr/blog/${post.id}/`;
    const date = post.data.published.toISOString().slice(0, 10);
    const desc = post.data.description.replace(/\s+/g, ' ').trim();

    lines.push(`### ${post.data.title}`);
    lines.push(`- URL: ${url}`);
    lines.push(`- Yayın: ${date}`);
    if (post.data.updated) {
      lines.push(`- Güncelleme: ${post.data.updated.toISOString().slice(0, 10)}`);
    }
    if (post.data.author?.name) {
      lines.push(`- Yazar: ${post.data.author.name}${post.data.author.role ? ` (${post.data.author.role})` : ''}`);
    }
    if (post.data.category) {
      lines.push(`- Kategori: ${post.data.category}`);
    }
    if (post.data.tags && post.data.tags.length > 0) {
      lines.push(`- Etiketler: ${post.data.tags.join(', ')}`);
    }
    lines.push(`- Özet: ${desc}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('Bu dosya Astro build sırasında otomatik oluşturulur. Manuel düzenlemeyin.');
  lines.push(`Son build: ${new Date().toISOString()}`);

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
