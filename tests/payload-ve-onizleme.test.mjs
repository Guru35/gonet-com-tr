import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  buildPayloadPostsUrl,
  createPayloadBlogLoader,
  mapPayloadPostToBlogData,
  payloadKaydiYayindaMi,
} from '../src/lib/payloadLoader.ts';
import {
  ONIZLEME_YANIT_BASLIKLARI,
  onizlemeJetonuDogrula,
  onizlemeJetonuOlustur,
} from '../src/lib/onizlemeHmac.ts';

test('GW-D03: Payload sorgu URL’si published ve publishedAt <= now kilidi taşır', () => {
  const simdi = new Date('2026-12-05T10:00:00.000Z');
  const url = new URL(buildPayloadPostsUrl('https://cms.gonet.com.tr/', simdi, 50, 2));

  assert.equal(url.pathname, '/api/posts');
  assert.equal(url.searchParams.get('where[status][equals]'), 'published');
  assert.equal(
    url.searchParams.get('where[publishedAt][less_than_equal]'),
    '2026-12-05T10:00:00.000Z',
  );
  assert.equal(url.searchParams.get('limit'), '50');
  assert.equal(url.searchParams.get('page'), '2');
});

test('GW-D03: createPayloadBlogLoader taslak/gelecek tarihli kayıtları eler ve Aralık alanlarını eşler', async () => {
  const simdi = new Date('2026-12-05T10:00:00.000Z');
  let istekUrl = '';

  const sahteFetch = async (url) => {
    istekUrl = String(url);
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({
        hasNextPage: false,
        nextPage: null,
        docs: [
          {
            id: 1,
            slug: 'aralik-yayin-yazisi',
            title: 'Aralık 1 AEO Rehberi',
            description: 'Kısa açıklama',
            status: 'published',
            publishedAt: '2026-12-01T08:00:00.000Z',
            category: { name: 'AEO' },
            tags: [{ tag: 'aeo' }, 'seo'],
            ozetMaddeleri: [
              'Birinci özet maddesi',
              'İkinci özet maddesi',
              'Üçüncü özet maddesi',
            ],
            karsilastirmaTablosu: {
              baslik: 'Özet Tablo',
              sutunlar: ['Kriter', 'Eski', 'Yeni'],
              satirlar: [['Hız', 'Yavaş', 'Hızlı']],
            },
            sss: [
              { soru: 'Soru 1?', cevap: 'Cevap 1.' },
            ],
            markdown: 'Gövde metni',
          },
          {
            id: 2,
            slug: 'gelecek-tarihli-yazi',
            title: 'Gelecek Yazı',
            description: 'Sızmamalı',
            status: 'published',
            publishedAt: '2026-12-20T08:00:00.000Z',
          },
          {
            id: 3,
            slug: 'taslak-yazi',
            title: 'Taslak Yazı',
            description: 'Sızmamalı',
            status: 'draft',
            publishedAt: '2026-12-01T08:00:00.000Z',
          },
        ],
      }),
    };
  };

  const kaydedilenler = new Map();
  let temizlendi = false;

  const loader = createPayloadBlogLoader({
    apiUrl: 'https://cms.gonet.com.tr',
    fetchFn: sahteFetch,
    nowFn: () => simdi,
  });

  await loader.load({
    store: {
      clear: () => {
        temizlendi = true;
        kaydedilenler.clear();
      },
      set: (entry) => {
        kaydedilenler.set(entry.id, entry);
      },
    },
    parseData: async ({ data }) => data,
    renderMarkdown: async (md) => ({ html: `<p>${md}</p>` }),
    generateDigest: (d) => JSON.stringify(d).length.toString(),
    logger: { info: () => {} },
  });

  assert.equal(temizlendi, true);
  assert.match(istekUrl, /where%5Bstatus%5D%5Bequals%5D=published/);
  assert.equal(kaydedilenler.size, 1);
  assert.equal(kaydedilenler.has('aralik-yayin-yazisi'), true);
  assert.equal(kaydedilenler.has('gelecek-tarihli-yazi'), false);
  assert.equal(kaydedilenler.has('taslak-yazi'), false);

  const yazi = kaydedilenler.get('aralik-yayin-yazisi');
  assert.deepEqual(yazi.data.ozetMaddeleri, [
    'Birinci özet maddesi',
    'İkinci özet maddesi',
    'Üçüncü özet maddesi',
  ]);
  assert.deepEqual(yazi.data.karsilastirmaTablosu, {
    baslik: 'Özet Tablo',
    sutunlar: ['Kriter', 'Eski', 'Yeni'],
    satirlar: [['Hız', 'Yavaş', 'Hızlı']],
  });
  assert.deepEqual(yazi.data.sss, [{ soru: 'Soru 1?', cevap: 'Cevap 1.' }]);

  assert.equal(
    payloadKaydiYayindaMi(
      { status: 'published', publishedAt: '2026-12-05T10:00:00.000Z' },
      simdi,
    ),
    true,
  );
  assert.equal(
    payloadKaydiYayindaMi(
      { status: 'published', draft: true, publishedAt: '2026-12-01T10:00:00.000Z' },
      simdi,
    ),
    false,
  );

  const eslenen = mapPayloadPostToBlogData({
    title: 'Test',
    description: 'Açıklama',
    publishedAt: '2026-12-02T00:00:00.000Z',
    ozetMaddeleri: ['Eksik liste'],
  });
  assert.equal(eslenen.ozetMaddeleri, undefined);
});

test('GW-D04: HMAC-SHA256 önizleme jetonu geçerli, geçersiz ve süresi dolmuş durumları doğru ayırır', () => {
  const gizli = 'cok-gizli-onizleme-anahtari-2026';
  const simdi = new Date('2026-12-01T12:00:00.000Z');
  const gecerliExp = Math.floor(new Date('2026-12-01T13:00:00.000Z').getTime() / 1000);
  const gecmisExp = Math.floor(new Date('2026-12-01T11:00:00.000Z').getTime() / 1000);

  const jeton = onizlemeJetonuOlustur(
    { slug: 'aralik-taslak', tenantId: 'gonet', exp: gecerliExp },
    gizli,
  );

  const basarili = onizlemeJetonuDogrula(jeton, gizli, simdi);
  assert.equal(basarili.gecerli, true);
  if (basarili.gecerli) {
    assert.equal(basarili.yuk.slug, 'aralik-taslak');
    assert.equal(basarili.yuk.tenantId, 'gonet');
    assert.equal(basarili.yuk.exp, gecerliExp);
  }

  const hataliImza = onizlemeJetonuDogrula(`${jeton.split('.')[0]}.00ff11`, gizli, simdi);
  assert.equal(hataliImza.gecerli, false);
  if (!hataliImza.gecerli) {
    assert.equal(hataliImza.neden, 'gecersiz_imza');
  }

  const suresiDolmusJeton = onizlemeJetonuOlustur(
    { slug: 'aralik-taslak', tenantId: 'gonet', exp: gecmisExp },
    gizli,
  );
  const suresiDolmus = onizlemeJetonuDogrula(suresiDolmusJeton, gizli, simdi);
  assert.equal(suresiDolmus.gecerli, false);
  if (!suresiDolmus.gecerli) {
    assert.equal(suresiDolmus.neden, 'suresi_dolmus');
  }

  assert.equal(ONIZLEME_YANIT_BASLIKLARI['X-Robots-Tag'], 'noindex, nofollow, noarchive');
  assert.equal(ONIZLEME_YANIT_BASLIKLARI['Cache-Control'], 'no-store');
});

test('GW-D04 & GW-D03 derleme çıktısı: onizleme noindex/noarchive taşır ve yerel 33+ blog derlenir', () => {
  const dist = path.join(process.cwd(), 'dist');
  const onizlemeHtmlYol = path.join(dist, 'blog', 'onizleme', 'index.html');
  assert.equal(fs.existsSync(onizlemeHtmlYol), true, 'dist/blog/onizleme/index.html üretilmeli');

  const html = fs.readFileSync(onizlemeHtmlYol, 'utf8');
  assert.match(html, /<meta\s+name="robots"\s+content="noindex,\s*nofollow,\s*noarchive"\s*\/?>/i);
  assert.ok(html.includes('Önizleme Bağlantısı Geçersiz'));

  const blogDir = path.join(dist, 'blog');
  const blogKlasorleri = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'onizleme');
  assert.ok(
    blogKlasorleri.length >= 33,
    `PAYLOAD_API_URL yokken en az 33 yerel blog yazısı derlenmeli (bulunan: ${blogKlasorleri.length})`,
  );
});
