// scripts/aeo-sinyal-tara.mjs birim testleri (boş gün PR önleme ve tekilleştirme).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { sinyalleriTara } from '../scripts/aeo-sinyal-tara.mjs';

test('Boş gün: eşik altı öğede rapor ve gorulen.json yazılmaz', async () => {
  const geciciDizin = await mkdtemp(path.join(os.tmpdir(), 'aeo-sinyal-bos-'));
  try {
    const gorulenYolu = path.join(geciciDizin, 'gorulen.json');
    const ilkIcerik = Buffer.from(JSON.stringify(['https://ornek.test/eski-oge']), 'utf8');
    await writeFile(gorulenYolu, ilkIcerik);

    const sahteKaynaklar = [{ ad: 'Sahte RSS', url: 'https://ornek.test/rss', tip: 'endustri' }];
    const sahteTara = async (kaynak) => [
      {
        baslik: 'Genel SEO notları',
        link: 'https://ornek.test/esik-alti',
        ozet: 'ChatGPT ile kısa bir özet.',
        tarih: '2026-11-27',
        kaynak: kaynak.ad,
        kaynakTipi: kaynak.tip,
      },
    ];

    const sonuc = await sinyalleriTara({
      kuyrukDizin: geciciDizin,
      kaynaklar: sahteKaynaklar,
      kaynakTaraFn: sahteTara,
      bugun: '2026-11-27',
    });

    assert.deepEqual(sonuc, { adaySayisi: 0, raporYazildi: false, raporYolu: null });
    assert.equal(existsSync(path.join(geciciDizin, '2026-11-27.md')), false);

    const sonIcerik = await readFile(gorulenYolu);
    assert.equal(Buffer.compare(ilkIcerik, sonIcerik), 0, 'gorulen.json byte-byte değişmemiş olmalı');
  } finally {
    await rm(geciciDizin, { recursive: true, force: true });
  }
});

test('Adaylı gün ve tekilleştirme: eşik üstü öğe raporlanır, ikinci turda tekrarlanmaz', async () => {
  const geciciDizin = await mkdtemp(path.join(os.tmpdir(), 'aeo-sinyal-aday-'));
  try {
    const sahteKaynaklar = [{ ad: 'Sahte AEO RSS', url: 'https://ornek.test/rss', tip: 'birinci-el' }];
    const sahteTara = async (kaynak) => [
      {
        baslik: 'AEO ve llms.txt uygulama rehberi',
        link: 'https://ornek.test/aeo-llms-rehberi',
        ozet: 'Answer engine optimization için GEO ve llms.txt standartları.',
        tarih: '2026-11-27',
        kaynak: kaynak.ad,
        kaynakTipi: kaynak.tip,
      },
    ];

    const ilkSonuc = await sinyalleriTara({
      kuyrukDizin: geciciDizin,
      kaynaklar: sahteKaynaklar,
      kaynakTaraFn: sahteTara,
      bugun: '2026-11-27',
    });

    const beklenenRapor = path.join(geciciDizin, '2026-11-27.md');
    assert.deepEqual(ilkSonuc, {
      adaySayisi: 1,
      raporYazildi: true,
      raporYolu: beklenenRapor,
    });
    assert.equal(existsSync(beklenenRapor), true);

    const raporIcerik = await readFile(beklenenRapor, 'utf8');
    assert.ok(raporIcerik.includes('AEO ve llms.txt uygulama rehberi'));
    assert.ok(raporIcerik.includes('https://ornek.test/aeo-llms-rehberi'));

    const gorulenYolu = path.join(geciciDizin, 'gorulen.json');
    assert.equal(existsSync(gorulenYolu), true);
    const gorulen = JSON.parse(await readFile(gorulenYolu, 'utf8'));
    assert.ok(gorulen.includes('https://ornek.test/aeo-llms-rehberi'));

    const ikinciSonuc = await sinyalleriTara({
      kuyrukDizin: geciciDizin,
      kaynaklar: sahteKaynaklar,
      kaynakTaraFn: sahteTara,
      bugun: '2026-11-28',
    });

    assert.deepEqual(ikinciSonuc, { adaySayisi: 0, raporYazildi: false, raporYolu: null });
    assert.equal(existsSync(path.join(geciciDizin, '2026-11-28.md')), false);
  } finally {
    await rm(geciciDizin, { recursive: true, force: true });
  }
});
