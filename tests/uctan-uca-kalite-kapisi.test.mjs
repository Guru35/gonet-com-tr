import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  mapPayloadPostToBlogData,
  payloadKaydiYayindaMi,
} from '../src/lib/payloadLoader.ts';
import { faqSchema } from '../src/lib/schema.ts';
import { teklifFormuGonder } from '../src/lib/teklifFormu.ts';
import { musteriDurumuGetir, oturumJetonuOlustur } from '../src/lib/musteriPortali.ts';

test('GW-D07: Uçtan uca yayın akışında gelecek tarihli veya taslak içerik dışarı sızmaz', () => {
  const simdi = new Date('2026-11-26T09:05:00+03:00');
  const kayitlar = [
    {
      id: 'p1',
      slug: 'yayinlanan-yazi',
      title: 'Yayında Yazı',
      description: 'Özet',
      status: 'published',
      publishedAt: '2026-11-26T09:00:00+03:00',
      ozetMaddeleri: [{ madde: 'M1' }, { madde: 'M2' }, { madde: 'M3' }],
    },
    {
      id: 'p2',
      slug: 'gelecek-yazi',
      title: 'Gelecek Yazı',
      description: 'Özet',
      status: 'published',
      publishedAt: '2026-12-01T09:00:00+03:00',
      ozetMaddeleri: [{ madde: 'M1' }, { madde: 'M2' }, { madde: 'M3' }],
    },
    {
      id: 'p3',
      slug: 'taslak-yazi',
      title: 'Taslak Yazı',
      description: 'Özet',
      status: 'draft',
      publishedAt: '2026-11-20T09:00:00+03:00',
      ozetMaddeleri: [{ madde: 'M1' }, { madde: 'M2' }, { madde: 'M3' }],
    },
  ];

  const suzulen = kayitlar.filter((k) => payloadKaydiYayindaMi(k, simdi));
  assert.equal(suzulen.length, 1);
  assert.equal(suzulen[0].slug, 'yayinlanan-yazi');

  const eslenen = mapPayloadPostToBlogData(suzulen[0]);
  assert.equal(eslenen.ozetMaddeleri.length, 3);
});

test('GW-D07: FAQPage JSON-LD şeması ve derlenmiş llms-blog.txt tutarlıdır', () => {
  const sss = faqSchema([
    { question: 'AEO nedir?', answer: 'Yapay zekâ yanıt motorlarında görünürlük optimizasyonudur.' },
  ]);
  assert.equal(sss['@type'], 'FAQPage');
  assert.equal(sss.mainEntity[0].acceptedAnswer['@type'], 'Answer');

  const llmsYolu = path.resolve(process.cwd(), 'dist/llms-blog.txt');
  assert.equal(fs.existsSync(llmsYolu), true, 'dist/llms-blog.txt bulunamadı');
});

test('GW-D07: KVKK teklif formu ve müşteri portalı uçtan uca birlikte çalışır', async () => {
  const formYaniti = await teklifFormuGonder(
    {
      adSoyad: 'Zeynep Kaya',
      eposta: 'zeynep@ornek.com',
      mesaj: 'Kurumsal AEO ve web sitesi yenileme talebi.',
      kvkkOnay: true,
    },
    {
      endpoint: 'https://panel.gonet.test/api/leads',
      fetchFn: async () => new Response(JSON.stringify({ id: 'lead-1' }), { status: 201 }),
    },
  );
  assert.equal(formYaniti.ok, true);

  const sir = 'uctan-uca-kalite-kapisi-32-baytlik-gizli-anahtar';
  const simdi = new Date('2026-11-26T12:00:00Z');
  const jeton = oturumJetonuOlustur(
    { kiraciId: 'gonet', musteriId: 'cust-1', exp: Math.floor(simdi.getTime() / 1000) + 300 },
    sir,
  );
  const portalYaniti = await musteriDurumuGetir({
    jeton,
    gizliAnahtar: sir,
    simdi,
    fetchImpl: async () => new Response(JSON.stringify({ ogeler: [] }), { status: 200 }),
  });
  assert.equal(portalYaniti.ok, true);
});
