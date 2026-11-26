import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import test from 'node:test';
import { blogYayindaMi } from '../src/lib/blog-yayin.ts';

test('blogYayindaMi: taslak, zamanlanmis ve gelecek tarihli yazilari engeller', () => {
  const simdi = new Date('2026-11-26T12:00:00Z');

  assert.equal(
    blogYayindaMi({ data: { draft: false, published: new Date('2026-11-20T09:00:00Z') } }, simdi),
    true,
    'Gecmis tarihli ve taslak olmayan yazi yayinda olmali',
  );

  assert.equal(
    blogYayindaMi({ data: { draft: true, published: new Date('2026-11-20T09:00:00Z') } }, simdi),
    false,
    'Taslak (draft: true) yazi engellenmeli',
  );

  assert.equal(
    blogYayindaMi(
      { data: { draft: false, yayinDurumu: 'zamanlanmis', published: new Date('2026-11-20T09:00:00Z') } },
      simdi,
    ),
    false,
    'yayinDurumu zamanlanmis olan yazi tarihi gelse bile yayinda olmadan acilmamali',
  );

  assert.equal(
    blogYayindaMi({ data: { draft: false, published: new Date('2026-12-01T09:00:00Z') } }, simdi),
    false,
    'Gelecek tarihli (1 Aralik) yazi engellenmeli',
  );
});

test('Astro build: gelecek tarihli yazi HTML, llms-blog.txt, rss.xml ve sitemap icinde sizmaz', () => {
  const kok = process.cwd();
  const slug = '__gw_d01_gelecek_test_yazisi';
  const yaziYol = path.join(kok, 'src', 'content', 'blog', `${slug}.md`);

  const ornekIcerik = `---
title: "GW-D01 Gelecek Tarih Sizinti Testi"
description: "Bu yazi gelecek tarihli oldugu icin hicbir ciktiya girmemelidir."
published: 2099-12-31
category: "Test"
tags: ["test"]
draft: false
---

Gelecek tarihli test icerigi.
`;

  fs.writeFileSync(yaziYol, ornekIcerik, 'utf8');
  try {
    execSync('npx astro build', { cwd: kok, stdio: 'pipe' });

    const distBlogSayfa = path.join(kok, 'dist', 'blog', slug, 'index.html');
    assert.equal(fs.existsSync(distBlogSayfa), false, 'Gelecek tarihli yazi icin HTML sayfasi uretilmemeli');

    const llms = fs.readFileSync(path.join(kok, 'dist', 'llms-blog.txt'), 'utf8');
    assert.equal(llms.includes(slug), false, 'Gelecek tarihli yazi llms-blog.txt icinde olmamali');

    const rss = fs.readFileSync(path.join(kok, 'dist', 'rss.xml'), 'utf8');
    assert.equal(rss.includes(slug), false, 'Gelecek tarihli yazi rss.xml icinde olmamali');

    const sitemapDosyalari = fs.readdirSync(path.join(kok, 'dist')).filter((f) => f.startsWith('sitemap-') && f.endsWith('.xml'));
    for (const sm of sitemapDosyalari) {
      const smIcerik = fs.readFileSync(path.join(kok, 'dist', sm), 'utf8');
      assert.equal(smIcerik.includes(slug), false, `Gelecek tarihli yazi ${sm} icinde olmamali`);
    }
  } finally {
    if (fs.existsSync(yaziYol)) fs.unlinkSync(yaziYol);
  }
});
