// SSS + blog kaynak alıcı (WEBDV-SSS).
//
// Copywriter-V2 kasasındaki GÜNCEL metni depoya taşır; metni elle kopyalayıp sabitlemek yerine
// bu betik yeniden çalıştırılır (S6/S11 gibi değişen metinler için).
//
//   node scripts/sss-kaynak-al.mjs [kasa-dizini]
//   (varsayılan: ~/vaults/Copywriter-V2/outputs)
//
// Yazar:  src/data/sss.json  ·  src/content/blog/<slug>.md  (11 dosya)
//
// Kurallar (kaynak metin DEĞİŞTİRİLMEZ; yalnız şunlar yapılır):
//  · SSS cevabı = sss-cevaplari dosyasındaki ```text bloğu, aynen.
//  · Blog sayfa metni = H1'den «---» çizgisine kadar; «Denetim notları» girmez; H1 atılır
//    (şablon başlığı frontmatter `title`dan basar; başlık = soru metni).
//  · «[Düğme] Ücretsiz görüşme isteyin» → /iletisim bağlantısı.
//  · İşaret (`[` + büyük harf: [SONRA-NE-YAPTIK], [DOĞRULA], [TEYİT] …) taşıyan «##» bölümü
//    yayına girmez (bölüm BOŞ kalır; uydurma yok). Başlıksız girişte işaret kalırsa betik DURUR.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const VARSAYILAN_KASA = join(homedir(), 'vaults/Copywriter-V2/outputs');
const IMLEC = /\[[A-ZÇĞİÖŞÜ]/;
const YAYIN_TARIHI = '2026-11-20';
const KATEGORI = 'SSS';

// Sürüm = dosyaya en son dokunan commit. Kasa anlık görüntüden okunuyorsa (commit'siz düzenleme
// varken sabit bir sürümden üretmek için): SSS_SURUM_DEPO = kasanın gerçek git dizini, SSS_REV = commit.
function surum(kasa, goreli) {
  try {
    const depo = process.env.SSS_SURUM_DEPO || kasa;
    const rev = process.env.SSS_REV || 'HEAD';
    return execFileSync('git', ['-C', depo, 'log', '-1', '--format=%h', rev, '--', goreli], { encoding: 'utf8' }).trim() || 'bilinmiyor';
  } catch {
    return 'bilinmiyor';
  }
}

export function sssAyristir(md) {
  const bolumler = md.split(/\n### (?=S\d+ · )/).slice(1);
  return bolumler.map((b) => {
    const baslik = b.match(/^S(\d+) · `([^`]+)`/);
    const soru = b.match(/^Soru: \*\*(.+?)\*\*/m);
    const cevap = b.match(/```text\n([\s\S]*?)\n```/);
    if (!baslik || !soru || !cevap) throw new Error(`SSS bölümü ayrıştırılamadı: ${b.slice(0, 60)}`);
    return { n: Number(baslik[1]), slug: baslik[2], question: soru[1], answer: cevap[1].trim() };
  });
}

export function blogAyristir(md, slug) {
  const fm = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) throw new Error(`${slug}: frontmatter yok`);
  const alan = (ad) => {
    const m = fm[1].match(new RegExp(`^${ad}: "(.*)"$`, 'm'));
    if (!m) throw new Error(`${slug}: frontmatter ${ad} yok`);
    return m[1];
  };
  if (!new RegExp(`^slug: ${slug}$`, 'm').test(fm[1])) throw new Error(`${slug}: slug uyuşmuyor`);
  let govde = md.slice(fm[0].length);
  const kesim = govde.indexOf('\n---\n\n## Denetim notları');
  if (kesim === -1) throw new Error(`${slug}: «Denetim notları» ayracı bulunamadı`);
  govde = govde.slice(0, kesim);
  govde = govde.replace(/^\s*# .*\n/, ''); // H1 = soru; şablon başlığı kendisi basar
  // «[Düğme] Ücretsiz görüşme isteyin» işaret DEĞİLDİR: işaret taramasından önce yer tutucuya alınır,
  // sonda /iletisim bağlantısına çevrilir (aksi hâlde «Görüşme isteyin» bölümü yanlışlıkla düşerdi).
  const DUGME = '\u0000DUGME\u0000';
  govde = govde.replace(/^\[Düğme\] Ücretsiz görüşme isteyin\s*$/m, DUGME);
  // «##» bölümlerine ayır; işaretli bölüm düşer
  const parcalar = govde.split(/\n(?=## )/);
  const kalan = parcalar.filter((p, i) => {
    if (!IMLEC.test(p)) return true;
    if (i === 0) throw new Error(`${slug}: giriş bölümünde işaret var → metin sahibine dönmeli`);
    return false;
  });
  const dusen = parcalar.length - kalan.length;
  let temiz = kalan.join('\n').trim() + '\n';
  if (IMLEC.test(temiz)) throw new Error(`${slug}: işaret kaldı`);
  if (!temiz.includes(DUGME)) throw new Error(`${slug}: «Ücretsiz görüşme isteyin» satırı bulunamadı`);
  temiz = temiz.replace(DUGME, '[Ücretsiz görüşme isteyin](/iletisim)');
  return { title: alan('title'), description: alan('meta_description'), govde: temiz, dusenBolum: dusen };
}

export function blogDosyasi({ title, description, govde }, kaynakSurum) {
  return [
    '---',
    `# Kaynak: Copywriter-V2/outputs/sss-blog-taslaklari-20261120 (sürüm ${kaynakSurum}); betik: scripts/sss-kaynak-al.mjs`,
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `published: ${YAYIN_TARIHI}`,
    `category: ${JSON.stringify(KATEGORI)}`,
    'draft: false',
    '---',
    '',
    govde,
  ].join('\n');
}

// Dosya yolu → içerik. Yazmaz.
export function uret(kasa = VARSAYILAN_KASA) {
  const sssYolu = join(kasa, 'sss-cevaplari-gonet-20261120.md');
  const sorular = sssAyristir(readFileSync(sssYolu, 'utf8')).sort((a, b) => a.n - b.n);
  const cikti = {};
  cikti['src/data/sss.json'] = JSON.stringify(sorular, null, 2) + '\n';
  for (const s of sorular) {
    const goreli = `sss-blog-taslaklari-20261120/${s.slug}.md`;
    const blog = blogAyristir(readFileSync(join(kasa, goreli), 'utf8'), s.slug);
    if (blog.title !== s.question) throw new Error(`${s.slug}: blog başlığı SSS sorusundan farklı`);
    const ilkParagraf = blog.govde.split('\n\n')[0].trim();
    if (ilkParagraf !== s.answer) throw new Error(`${s.slug}: blog giriş paragrafı SSS cevabıyla aynı değil`);
    cikti[`src/content/blog/${s.slug}.md`] = blogDosyasi(blog, surum(kasa, goreli));
  }
  return cikti;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const kasa = process.argv[2] || VARSAYILAN_KASA;
  const dosyalar = uret(kasa);
  for (const [yol, icerik] of Object.entries(dosyalar)) {
    const hedef = join(KOK, yol);
    mkdirSync(dirname(hedef), { recursive: true });
    writeFileSync(hedef, icerik, 'utf8');
  }
  console.log(`yazıldı: ${Object.keys(dosyalar).length} dosya`);
  console.log(`SSS kaynağı sürümü: ${surum(kasa, 'sss-cevaplari-gonet-20261120.md')}`);
}
