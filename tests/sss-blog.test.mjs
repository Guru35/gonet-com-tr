// WEBDV-SSS kabul testleri — SSS bölümü + 11 blog sayfası + FAQPage yapısal verisi.
// Çalıştırma: npm test  (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { DIST, oku, varMi, sayfa, jsonLd, gorunurSss, basliklar, metin } from './yardimci.mjs';

const SSS = JSON.parse(varMi('src/data/sss.json') ? oku('src/data/sss.json') : '[]');
const SLUGLAR = SSS.map((s) => s.slug);
const ONKOSUL = () => assert.equal(SSS.length, 11, 'src/data/sss.json 11 soru taşımıyor');
const IMLEC = /\[[A-ZÇĞİÖŞÜ]/; // [DOĞRULA] [TEYİT] [SONRA-NE-YAPTIK] [AEOV2: …] [Düğme] …

test('kaynak: 11 soru (S1–S11), her biri soru + cevap + slug taşır', () => {
  assert.equal(SSS.length, 11);
  for (const s of SSS) {
    assert.ok(s.slug && s.question && s.answer, `eksik alan: ${JSON.stringify(s).slice(0, 80)}`);
  }
});

test('her slug için blog sayfası kaynağı ve derlenmiş sayfa var', () => {
  assert.ok(SLUGLAR.length > 0, 'slug listesi boş');
  for (const slug of SLUGLAR) {
    assert.ok(varMi(`src/content/blog/${slug}.md`), `src/content/blog/${slug}.md yok`);
    assert.ok(sayfa(`/blog/${slug}`), `dist/blog/${slug}/index.html yok`);
  }
});

test('işaret yok: yayına giren metinde «[» + büyük harf kalıbı SIFIR', () => {
  assert.ok(SLUGLAR.length > 0);
  const hedefler = [['src/data/sss.json', oku('src/data/sss.json')]];
  const duzMetin = (md) => md.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); // [metin](adres) → metin
  for (const slug of SLUGLAR) hedefler.push([`blog md ${slug}`, duzMetin(oku(`src/content/blog/${slug}.md`))]);
  for (const slug of SLUGLAR) hedefler.push([`dist blog ${slug}`, metin(sayfa(`/blog/${slug}`) ?? '')]);
  hedefler.push(['dist /sss', metin(sayfa('/sss') ?? '')]);
  hedefler.push(['dist /sss JSON-LD', JSON.stringify(jsonLd(sayfa('/sss') ?? ''))]);
  for (const slug of SLUGLAR) hedefler.push([`dist blog ${slug} JSON-LD`, JSON.stringify(jsonLd(sayfa(`/blog/${slug}`) ?? ''))]);
  for (const [ad, icerik] of hedefler) {
    const m = icerik.match(IMLEC);
    assert.equal(m, null, `${ad}: işaret kalmış → ${m && icerik.slice(m.index, m.index + 40)}`);
  }
});

test('«Denetim notları» hiçbir sayfada yok', () => {
  assert.ok(SLUGLAR.length > 0);
  for (const slug of SLUGLAR) {
    assert.doesNotMatch(oku(`src/content/blog/${slug}.md`), /Denetim notları/i, `md ${slug}`);
    assert.doesNotMatch(metin(sayfa(`/blog/${slug}`) ?? ''), /Denetim notları/i, `dist ${slug}`);
  }
  assert.doesNotMatch(metin(sayfa('/sss') ?? ''), /Denetim notları/i);
});

test('FAQPage: görünür soru/cevap ile yapısal veri BİREBİR aynı (sayı ve metin)', () => {
  ONKOSUL();
  const html = sayfa('/sss');
  assert.ok(html, 'dist/sss yok');
  const faqler = jsonLd(html).filter((n) => n['@type'] === 'FAQPage');
  assert.equal(faqler.length, 1, 'sayfada tam bir FAQPage olmalı');
  const yapisal = faqler[0].mainEntity.map((q) => ({ soru: q.name, cevap: q.acceptedAnswer.text }));
  const gorunur = gorunurSss(html).map(({ soru, cevap }) => ({ soru, cevap }));
  assert.equal(yapisal.length, 15 + 11, `yapısal soru sayısı ${yapisal.length}`);
  assert.equal(yapisal.length, gorunur.length, 'yapısal ve görünür sayı farklı');
  for (let i = 0; i < gorunur.length; i++) {
    assert.equal(yapisal[i].soru, gorunur[i].soru, `soru #${i + 1}`);
    assert.equal(yapisal[i].cevap, gorunur[i].cevap, `cevap #${i + 1}`);
  }
});

test('11 SSS cevabı kaynak metinle aynı ve sayfada var', () => {
  ONKOSUL();
  const html = sayfa('/sss');
  assert.ok(html);
  const gorunur = gorunurSss(html);
  for (const s of SSS) {
    const g = gorunur.find((x) => x.soru === s.question);
    assert.ok(g, `görünür soru yok: ${s.question}`);
    assert.equal(g.cevap, s.answer, `cevap farklı: ${s.slug}`);
  }
});

test('«Daha fazla»: yazı bağlantısı (düğme değil), doğru /blog/<slug>, hedef sayfa var', () => {
  ONKOSUL();
  const html = sayfa('/sss');
  assert.ok(html);
  const gorunur = gorunurSss(html);
  for (const s of SSS) {
    const g = gorunur.find((x) => x.soru === s.question);
    assert.ok(g, `soru yok: ${s.question}`);
    const dm = g.linkler.filter((l) => l.etiket.startsWith('Daha fazla'));
    assert.equal(dm.length, 1, `${s.slug}: «Daha fazla» bağlantısı sayısı ${dm.length}`);
    assert.equal(dm[0].href, `/blog/${s.slug}`);
    assert.doesNotMatch(g.govde, /<button\b/, `${s.slug}: düğme yok olmalı`);
    assert.ok(sayfa(`/blog/${s.slug}`), `hedef sayfa yok: /blog/${s.slug}`);
  }
});

test('blog sayfası: başlık = soru, giriş paragrafı = SSS cevabı, açıklama dolu', () => {
  ONKOSUL();
  for (const s of SSS) {
    const md = oku(`src/content/blog/${s.slug}.md`);
    assert.match(md, new RegExp(`^title: ${JSON.stringify(s.question).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'), `${s.slug}: title ≠ soru`);
    const govde = md.replace(/^---\n[\s\S]*?\n---\n/, '').trimStart();
    assert.equal(govde.split('\n\n')[0].trim(), s.answer, `${s.slug}: giriş paragrafı ≠ SSS cevabı`);
    assert.match(md, /^description: ".{60,}"$/m, `${s.slug}: meta açıklama eksik`);
  }
});

test('«Ücretsiz görüşme isteyin» bağlantı olur ve /iletisim\'e gider; düğme kalıbı yok', () => {
  ONKOSUL();
  for (const s of SSS) {
    const md = oku(`src/content/blog/${s.slug}.md`);
    assert.match(md, /\[Ücretsiz görüşme isteyin\]\(\/iletisim\)/, `${s.slug}: görüşme bağlantısı yok`);
    assert.doesNotMatch(md, /\[Düğme\]/);
    const html = sayfa(`/blog/${s.slug}`);
    assert.match(html, /<a [^>]*href="\/iletisim"[^>]*>\s*Ücretsiz görüşme isteyin/);
  }
});

test('Google ortaklığı cümlesi (D24) yalnız altbilgide: SSS cevaplarında, /sss ve blog ana içeriğinde SIFIR; altbilgide korunur', () => {
  ONKOSUL();
  assert.deepEqual(SSS.filter((s) => /Google Partner|2005–2017/.test(s.answer)).map((s) => s.slug), [], 'SSS cevabında olmamalı');
  for (const s of SSS) {
    assert.doesNotMatch(oku(`src/content/blog/${s.slug}.md`), /Google Partner|2005–2017/, `${s.slug}`);
  }
  // Blog gövdesi markdown (smartypants) olduğundan kesme işareti ’ olabilir; ikisi de aynı cümledir.
  const say = (m) => (m.match(/2005–2017 arasında Google['’]ın ajans programlarında/g) || []).length;
  const anaMetin = (yol) => metin((sayfa(yol) ?? '').match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '');
  assert.equal(say(anaMetin('/sss')), 0, '/sss ana içeriğinde olmamalı');
  for (const s of SSS) assert.equal(say(anaMetin(`/blog/${s.slug}`)), 0, `${s.slug}: ana içerikte olmamalı`);
  // Altbilgi (BaseLayout) cümleyi taşımaya devam eder: sayfa başına tam bir geçiş.
  assert.match(oku('src/layouts/BaseLayout.astro'), /2005–2017 arasında Google['’]ın ajans programlarında sertifikalı iş ortağıydık/);
  for (const yol of ['/sss', '/blog/seo-geo-ve-google-ads-bir-arada']) {
    assert.equal(say(metin(sayfa(yol) ?? '')), 1, `${yol}: sayfada (altbilgi) tam bir geçiş olmalı`);
  }
});

test('S2 «Kendi sitemizde ne gördük?» bölümü: işaret sızmıyor, kaynak alıntı aynen duruyor', () => {
  const md = oku('src/content/blog/ai-gorunurluk-denetimi-ve-aeo-danismanligi.md');
  assert.doesNotMatch(md, /SONRA-NE-YAPTIK/);
  assert.match(md, /ağ yönetimi ve internet altyapısı hizmetleri sağlayan kuruluşlar için kullanılan bir terimdir/);
});

test('başlık sırası atlamıyor (h1 → h2 → h3): /sss ve 11 blog sayfası, tek h1', () => {
  ONKOSUL();
  const kontrol = (ad, html) => {
    const h = basliklar(html);
    assert.ok(h.length > 0, `${ad}: başlık yok`);
    assert.equal(h.filter((x) => x === 1).length, 1, `${ad}: h1 sayısı`);
    for (let i = 1; i < h.length; i++) {
      assert.ok(h[i] - h[i - 1] <= 1, `${ad}: h${h[i - 1]} → h${h[i]} atlama`);
    }
  };
  kontrol('/sss', sayfa('/sss') ?? '');
  for (const s of SSS) kontrol(`/blog/${s.slug}`, sayfa(`/blog/${s.slug}`) ?? '');
});

test('iç bağlantılar kırık değil: /sss ve 11 blog sayfasındaki her yerel href dist\'te var', () => {
  ONKOSUL();
  const sayfalar = ['/sss', ...SLUGLAR.map((s) => `/blog/${s}`)];
  assert.ok(sayfalar.length > 1);
  for (const yol of sayfalar) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} yok`);
    const hreflar = [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)].map((m) => m[1]);
    for (const h of hreflar) {
      if (!h.startsWith('/') || h.startsWith('//')) continue;
      const temiz = h.split('#')[0].split('?')[0];
      if (!temiz || temiz === '/') continue;
      const dizin = join(DIST, temiz, 'index.html');
      const dosya = join(DIST, temiz);
      assert.ok(existsSync(dizin) || existsSync(dosya), `${yol} → ${h} bulunamadı`);
    }
  }
});

test('sitemap ve llms-blog.txt 11 yeni blog adresini içerir; llms.txt /sss satırı güncel', () => {
  assert.ok(SLUGLAR.length > 0);
  const harita = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  const llmsBlog = readFileSync(join(DIST, 'llms-blog.txt'), 'utf8');
  for (const slug of SLUGLAR) {
    assert.ok(harita.includes(`https://gonet.com.tr/blog/${slug}<`), `sitemap: ${slug}`);
    assert.match(llmsBlog, new RegExp(`https://gonet\\.com\\.tr/blog/${slug}$`, 'm'), `llms-blog: ${slug}`);
  }
  const llms = oku('public/llms.txt');
  assert.doesNotMatch(llms, /15 soru-cevap/, 'llms.txt eski soru sayısını taşıyor');
  assert.match(llms, /\/sss\):.*26 soru-cevap/);
});

// Üretici sağlaması: yalnız Copywriter kasası bu makinede varsa koşar (CI'da atlanır).
const KASA = process.env.SSS_KASA || join(homedir(), 'vaults/Copywriter-V2/outputs');
// Kasada SSS/blog kaynaklarında commit'siz düzenleme varsa (metin sahibi o sırada yazıyordur) karşılaştırma
// anlamsızdır: çalışma ağacı bir sonraki commit'in yarım hâlidir → atlanır, sebep yazılır.
function kasaKirli() {
  try {
    const cikti = execFileSync('git', ['-C', KASA, 'status', '--porcelain', '--', 'sss-cevaplari-gonet-20261120.md', 'sss-blog-taslaklari-20261120'], { encoding: 'utf8' });
    return cikti.trim().length > 0;
  } catch {
    return false;
  }
}
const ATLA = !existsSync(KASA) ? 'kasa yok' : kasaKirli() && !process.env.SSS_KASA ? "kasada commit'siz düzenleme var" : false;
test('üretici: depodaki dosyalar kasadaki güncel kaynaktan üretilenle aynı', { skip: ATLA }, async () => {
  const { uret } = await import('../scripts/sss-kaynak-al.mjs');
  const dosyalar = uret(KASA);
  assert.ok(Object.keys(dosyalar).length >= 12);
  for (const [yol, icerik] of Object.entries(dosyalar)) {
    const mevcut = oku(yol);
    if (yol === 'src/data/sss.json') {
      assert.equal(mevcut, icerik, `${yol} kaynaktan farklı — scripts/sss-kaynak-al.mjs yeniden çalıştırılmalı`);
      continue;
    }
    // PR #59 (AEO Paket 3) ile 11 SSS bloguna eklenen updated/Kısa özet/SSS bölümleri korunurken
    // kaynaktaki title, description, published, category, giriş paragrafı ve tüm ## başlıklarının korunduğunu doğrula.
    const satirAl = (metin, anahtar) => metin.match(new RegExp(`^${anahtar}: .+$`, 'm'))?.[0];
    for (const anahtar of ['title', 'description', 'published', 'category']) {
      assert.equal(satirAl(mevcut, anahtar), satirAl(icerik, anahtar), `${yol}: frontmatter '${anahtar}' kaynaktan sapmış`);
    }
    const govde = (metin) => metin.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
    const kaynakGovde = govde(icerik);
    const mevcutGovde = govde(mevcut);
    assert.equal(mevcutGovde.split('\n\n')[0].trim(), kaynakGovde.split('\n\n')[0].trim(), `${yol}: giriş paragrafı kaynaktan farklı`);
    const kaynakBolumler = kaynakGovde.split(/\n(?=## )/).slice(1).map((b) => b.trim());
    for (const bolum of kaynakBolumler) {
      assert.ok(mevcutGovde.includes(bolum), `${yol}: kaynak bölüm eksik -> ${bolum.split('\n')[0]}`);
    }
  }
});
