import assert from 'node:assert/strict';
import test from 'node:test';

import {
  TEKLIF_FORM_MESAJLARI,
  VARSAYILAN_LEADS_API_UCU,
  teklifFormuDogrula,
  teklifFormuGonder,
  teklifKaynakEtiketi,
} from '../src/lib/teklifFormu.ts';
import { sayfa } from './yardimci.mjs';

const GECERLI_VERI = {
  adSoyad: 'Ayşe Yılmaz',
  eposta: 'ayse@ornek.com',
  telefon: '+90 532 111 22 33',
  sirket: 'Örnek A.Ş.',
  hizmet: 'AEO / GEO Denetimi',
  mesaj: 'Kurumsal sitemiz için AEO ve teknik SEO teklifi almak istiyoruz.',
  kvkkOnay: true,
  website: '',
};

test('GW-D05: KVKK onayı olmadan gönderim reddedilir ve API çağrılmaz', async () => {
  let fetchCagrildi = false;
  const sahteFetch = async () => {
    fetchCagrildi = true;
    throw new Error('KVKK onayı olmadan fetch çağrılmamalıydı');
  };

  const sonuc = await teklifFormuGonder(
    { ...GECERLI_VERI, kvkkOnay: false },
    { fetchFn: sahteFetch },
  );

  assert.equal(sonuc.ok, false);
  assert.equal(sonuc.durum, 'dogrulama_hatasi');
  assert.equal(sonuc.hataAlani, 'kvkkOnay');
  assert.equal(sonuc.apiyeGonderildi, false);
  assert.equal(fetchCagrildi, false);
  assert.equal(sonuc.mesaj, TEKLIF_FORM_MESAJLARI.kvkkHata);
});

test('GW-D05: Honeypot (website) doluysa bot sessizce engellenir ve API çağrılmaz', async () => {
  let fetchCagrildi = false;
  const sahteFetch = async () => {
    fetchCagrildi = true;
    throw new Error('Honeypot tetiklendiğinde fetch çağrılmamalıydı');
  };

  const dogrulama = teklifFormuDogrula({ ...GECERLI_VERI, website: 'https://spam.example' });
  assert.equal(dogrulama.gecerli, false);
  assert.equal(dogrulama.botEngellendi, true);

  const sonuc = await teklifFormuGonder(
    { ...GECERLI_VERI, website: 'https://spam.example' },
    { fetchFn: sahteFetch },
  );

  assert.equal(sonuc.ok, false);
  assert.equal(sonuc.durum, 'bot_engellendi');
  assert.equal(sonuc.apiyeGonderildi, false);
  assert.equal(fetchCagrildi, false);
  assert.equal(sonuc.mesaj, TEKLIF_FORM_MESAJLARI.basari);
});

test('GW-D05: Geçerli gönderim kvkkOnayZamani ISO damgasıyla leads API ucuna POST edilir', async () => {
  const sabitTarih = new Date('2026-11-26T11:40:00.000Z');
  let yakalananUrl = '';
  let yakalananInit = null;

  const sahteFetch = async (url, init) => {
    yakalananUrl = String(url);
    yakalananInit = init;
    return {
      ok: true,
      status: 201,
      json: async () => ({ ok: true, id: 42 }),
    };
  };

  const sonuc = await teklifFormuGonder(GECERLI_VERI, {
    fetchFn: sahteFetch,
    nowFn: () => sabitTarih,
    search: '?utm_source=linkedin&utm_campaign=q4_aeo',
  });

  assert.equal(sonuc.ok, true);
  assert.equal(sonuc.durum, 'basari');
  assert.equal(sonuc.apiyeGonderildi, true);
  assert.equal(sonuc.kvkkOnayZamani, '2026-11-26T11:40:00.000Z');
  assert.equal(sonuc.mesaj, TEKLIF_FORM_MESAJLARI.basari);

  assert.equal(yakalananUrl, VARSAYILAN_LEADS_API_UCU);
  assert.equal(yakalananInit.method, 'POST');
  assert.equal(yakalananInit.headers['Content-Type'], 'application/json');

  const gonderilenGovde = JSON.parse(yakalananInit.body);
  assert.equal(gonderilenGovde.adSoyad, 'Ayşe Yılmaz');
  assert.equal(gonderilenGovde.eposta, 'ayse@ornek.com');
  assert.equal(gonderilenGovde.kvkkOnay, true);
  assert.equal(gonderilenGovde.kvkkOnayZamani, '2026-11-26T11:40:00.000Z');
  assert.equal(gonderilenGovde.kaynak, 'linkedin-q4_aeo');
  assert.equal(Object.hasOwn(gonderilenGovde, 'website'), false);
});

test('GW-D05: Sunucu ve ağ hatalarında sade Türkçe mesajlar döner, yükleniyor mesajı hazırdır', async () => {
  assert.ok(TEKLIF_FORM_MESAJLARI.yukleniyor.includes('gönderiliyor'));
  assert.equal(teklifKaynakEtiketi('?utm_source=geçersiz!'), 'gonet.com.tr/teklif-al');

  const sunucuHatali = await teklifFormuGonder(GECERLI_VERI, {
    fetchFn: async () => ({
      ok: false,
      status: 500,
      json: async () => ({ ok: false }),
    }),
  });
  assert.equal(sunucuHatali.ok, false);
  assert.equal(sunucuHatali.durum, 'sunucu_hatasi');
  assert.equal(sunucuHatali.mesaj, TEKLIF_FORM_MESAJLARI.sunucuHata);

  const agHatali = await teklifFormuGonder(GECERLI_VERI, {
    fetchFn: async () => {
      throw new Error('ECONNREFUSED');
    },
  });
  assert.equal(agHatali.ok, false);
  assert.equal(agHatali.durum, 'ag_hatasi');
  assert.equal(agHatali.mesaj, TEKLIF_FORM_MESAJLARI.agHata);
});

test('GW-D05: Derlenen /teklif-al sayfası erişilebilir KVKK teklif formunu içerir', () => {
  const html = sayfa('/teklif-al');
  assert.ok(html, 'dist/teklif-al/index.html üretilmiş olmalı');
  assert.ok(html.includes('id="kvkk-teklif-formu"'));
  assert.ok(html.includes('name="kvkkOnay"'));
  assert.ok(html.includes('href="/kvkk"'));
  assert.ok(html.includes('name="website"'));
  assert.ok(html.includes('aria-live="polite"'));
});
