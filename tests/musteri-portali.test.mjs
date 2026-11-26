import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  PORTAL_GUVENLIK_BASLIKLARI,
  PORTAL_MESAJLARI,
  musteriDurumuGetir,
  oturumJetonuDogrula,
  oturumJetonuOlustur,
} from '../src/lib/musteriPortali.ts';

const GIZLI = 'portal-test-icin-en-az-32-baytlik-gizli-anahtar';

test('GW-D06: Geçerli oturum jetonu doğrulanır ve yalnız müşterinin kendi lead/deal kayıtları döner', async () => {
  const simdi = new Date('2026-11-26T12:00:00Z');
  const jeton = oturumJetonuOlustur(
    {
      kiraciId: 'gonet',
      musteriId: 'cust-101',
      adSoyad: 'Ahmet Yılmaz',
      exp: Math.floor(simdi.getTime() / 1000) + 600,
    },
    GIZLI,
  );

  const dogrula = oturumJetonuDogrula(jeton, GIZLI, simdi);
  assert.equal(dogrula.gecerli, true);

  const sonuc = await musteriDurumuGetir({
    jeton,
    gizliAnahtar: GIZLI,
    simdi,
    apiTabanUrl: 'https://api.gonet.test',
    fetchImpl: async (url) => {
      const u = String(url);
      if (u.includes('/v1/crm/adaylar')) {
        return new Response(
          JSON.stringify({
            ogeler: [
              { id: 'l1', musteri_id: 'cust-101', ad_soyad: 'Ahmet Yılmaz', durum: 'nitelikli' },
              { id: 'l2', musteri_id: 'cust-999', ad_soyad: 'Başka Müşteri', durum: 'yeni' },
            ],
          }),
          { status: 200 },
        );
      }
      return new Response(
        JSON.stringify({
          ogeler: [
            { id: 'd1', musteri_id: 'cust-101', baslik: 'AEO Paketi', asama: 'teklif', tahmini_tutar: 45000, para_birimi: 'TRY' },
            { id: 'd2', musteri_id: 'cust-999', baslik: 'Gizli Teklif', asama: 'pazarlik', tahmini_tutar: 99000, para_birimi: 'TRY' },
          ],
        }),
        { status: 200 },
      );
    },
  });

  assert.equal(sonuc.ok, true);
  assert.equal(sonuc.durumKodu, 200);
  assert.equal(sonuc.leadler.length, 1);
  assert.equal(sonuc.leadler[0].id, 'l1');
  assert.equal(sonuc.firsatlar.length, 1);
  assert.equal(sonuc.firsatlar[0].id, 'd1');
});

test('GW-D06: Başka müşteri kimliğine erişim veya bozuk imza 403 ve otomatik çıkış döner', async () => {
  const simdi = new Date('2026-11-26T12:00:00Z');
  const jeton = oturumJetonuOlustur(
    {
      kiraciId: 'gonet',
      musteriId: 'cust-101',
      exp: Math.floor(simdi.getTime() / 1000) + 600,
    },
    GIZLI,
  );

  const capraz = await musteriDurumuGetir({
    jeton,
    gizliAnahtar: GIZLI,
    hedefMusteriId: 'cust-202',
    simdi,
  });
  assert.equal(capraz.ok, false);
  assert.equal(capraz.durumKodu, 403);
  assert.equal(capraz.otomatikCikis, true);

  const bozuk = await musteriDurumuGetir({
    jeton: `${jeton.slice(0, -4)}0000`,
    gizliAnahtar: GIZLI,
    simdi,
  });
  assert.equal(bozuk.ok, false);
  assert.equal(bozuk.durumKodu, 403);
  assert.equal(bozuk.otomatikCikis, true);
});

test('GW-D06: Süresi dolmuş oturum 401, otomatik çıkış ve Türkçe uyarı mesajı döner', async () => {
  const simdi = new Date('2026-11-26T12:00:00Z');
  const gecmisJeton = oturumJetonuOlustur(
    {
      kiraciId: 'gonet',
      musteriId: 'cust-101',
      exp: Math.floor(simdi.getTime() / 1000) - 30,
    },
    GIZLI,
  );

  const sonuc = await musteriDurumuGetir({
    jeton: gecmisJeton,
    gizliAnahtar: GIZLI,
    simdi,
  });
  assert.equal(sonuc.ok, false);
  assert.equal(sonuc.durumKodu, 401);
  assert.equal(sonuc.otomatikCikis, true);
  assert.equal(sonuc.mesaj, PORTAL_MESAJLARI.suresiDolmus);
  assert.equal(PORTAL_GUVENLIK_BASLIKLARI['X-Robots-Tag'], 'noindex, nofollow, noarchive');
});

test('GW-D06: Derlenen /portal sayfası noindex ve otomatik çıkış uyarısını içerir', () => {
  const htmlYolu = path.resolve(process.cwd(), 'dist/portal/index.html');
  assert.equal(fs.existsSync(htmlYolu), true, 'dist/portal/index.html bulunamadı');
  const html = fs.readFileSync(htmlYolu, 'utf8');
  assert.match(html, /noindex/i);
  assert.match(html, /Müşteri Durum Portalı/);
});
