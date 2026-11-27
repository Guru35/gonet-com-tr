import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { DIST, metin, sayfa } from './yardimci.mjs';

test('GW-Q14: /kvkk/winner-club derlenen HTML sayfası Canlı Faz 1 içeriğini içerir ve aktif olmayan sağlayıcı/süre uydurması içermez', () => {
  const html = sayfa('/kvkk/winner-club');
  assert.ok(html, 'dist/kvkk/winner-club/index.html üretilmiş olmalı');

  const duzMetin = metin(html);
  for (const zorunlu of [
    'Gonet Winner Club',
    'Pigme Proje',
    'Gonet Sosyal Medya',
    'winner-club-bekleme-listesi',
    'panel.gonet.com.tr/giris',
    'Hetzner Online GmbH',
    'Cloudflare, Inc.',
    'Google LLC',
    '5/2-(c)',
    '5/2-(f)',
    '5/2-(e)',
  ]) {
    assert.ok(duzMetin.includes(zorunlu), `Winner Club metninde bekleniyor: ${zorunlu}`);
  }

  for (const aktifOlmayan of [
    'WhatsApp',
    'İleti Merkezi',
    'Verimor',
    'İleti Yönetim Sistemi',
    'İYS',
    '7 gün',
    '180 gün',
    '3 yıl',
    '6563 sayılı Kanun md. 6',
  ]) {
    assert.equal(duzMetin.includes(aktifOlmayan), false, `Canlı Faz 1 metninde bulunmamalı: ${aktifOlmayan}`);
  }
});

test('GW-Q14: /kvkk/winner-club yer tutucu ve K13 yasaklı hesap silme vaadi içermez', () => {
  const html = sayfa('/kvkk/winner-club');
  assert.ok(html, 'dist/kvkk/winner-club/index.html üretilmiş olmalı');

  const duzMetin = metin(html);
  assert.equal(duzMetin.includes('[['), false, 'Çift köşeli yer tutucu kalmamalı');
  assert.equal(/\[MERSİS|\[KEP|\[SUNUCU|\[SAKLAMA/i.test(duzMetin), false, 'Eski tip yer tutucu kalmamalı');

  for (const yasakDesen of [
    /\bkendiniz\s+(?:de\s+)?silebilirsiniz\b/i,
    /\bistediğiniz\s+zaman\s+silebilirsiniz\b/i,
    /\b30\s+gün\s+içinde\s+silinir\b/i,
  ]) {
    assert.equal(yasakDesen.test(duzMetin), false, `K13 yasaklı cümle bulunmamalı: ${yasakDesen}`);
  }
});

test('GW-Q14: /kvkk ve /merhaba derlenen sayfaları /kvkk/winner-club bağlantısı içerir', () => {
  const kvkkHtml = sayfa('/kvkk');
  assert.ok(kvkkHtml, 'dist/kvkk/index.html üretilmiş olmalı');
  assert.ok(kvkkHtml.includes('href="/kvkk/winner-club"'), '/kvkk içinde /kvkk/winner-club bağlantısı olmalı');

  const merhabaHtml = sayfa('/merhaba');
  assert.ok(merhabaHtml, 'dist/merhaba/index.html üretilmiş olmalı');
  assert.ok(merhabaHtml.includes('href="/kvkk/winner-club"'), '/merhaba içinde /kvkk/winner-club bağlantısı olmalı');
  assert.ok(merhabaHtml.includes('Winner Club Aydınlatma Metni'), '/merhaba içinde güncel bağlantı etiketi olmalı');
});

test('GW-Q14: /iletisim resmi sicil adreslerini taşır ve mobil footer linkleri 44px min-height kuralına uyar', () => {
  const iletisimHtml = sayfa('/iletisim');
  assert.ok(iletisimHtml, 'dist/iletisim/index.html üretilmiş olmalı');
  const duzMetin = metin(iletisimHtml);
  assert.ok(duzMetin.includes('DEÜ Tınaztepe Kampüsü'), '/iletisim çalışma ofisi adresini taşımalı');
  assert.ok(duzMetin.includes('Adatepe Mah. Doğuş Cad. No: 207Z İç Kapı No: 1, Buca / İzmir'), 'Pigme sicil adresi görünür olmalı');
  assert.ok(duzMetin.includes('Yenigün Mah. 268 Sk. No: 33/7, Buca / İzmir'), 'Gonet Ltd. sicil adresi görünür olmalı');

  const globalCss = readFileSync(join(process.cwd(), 'src/styles/global.css'), 'utf8');
  assert.match(globalCss, /#site-footer ul a\s*\{[^}]*min-height:\s*44px;/, '#site-footer ul a mobil 44px olmalı');
});

test('GW-Q14: /teklif-al sayfası güncel API ucunu, e-posta özniteliklerini ve aria-invalid mantığını içerir', () => {
  const teklifHtml = sayfa('/teklif-al');
  assert.ok(teklifHtml, 'dist/teklif-al/index.html üretilmiş olmalı');
  assert.ok(
    teklifHtml.includes('https://cms.gonet.com.tr/api/vitrin/teklif'),
    'Teklif formu data-endpoint yeni adresi taşımalı',
  );
  assert.ok(teklifHtml.includes('autocorrect="off"'), 'E-posta alanında autocorrect="off" olmalı');
  assert.ok(teklifHtml.includes('autocapitalize="none"'), 'E-posta alanında autocapitalize="none" olmalı');
  assert.ok(teklifHtml.includes('spellcheck="false"'), 'E-posta alanında spellcheck="false" olmalı');

  const betikEslesmesi = teklifHtml.match(/<script[^>]+src="(\/_astro\/KvkkTeklifFormu[^"]+\.js)"/);
  assert.ok(betikEslesmesi, 'KvkkTeklifFormu istemci betiği derlenmiş olmalı');

  const betikYolu = join(DIST, betikEslesmesi[1].replace(/^\//, ''));
  const betikIcerigi = readFileSync(betikYolu, 'utf8');
  assert.ok(betikIcerigi.includes('aria-invalid'), 'İstemci betiğinde aria-invalid yönetimi bulunmalı');
});
