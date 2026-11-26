import crypto from 'node:crypto';

export const PORTAL_GUVENLIK_BASLIKLARI = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
} as const;

export const PORTAL_MESAJLARI = {
  eksikOturum: 'Oturum anahtarı bulunamadı. Lütfen size iletilen güvenli bağlantı ile tekrar giriş yapın.',
  suresiDolmus: 'Oturumunuzun süresi dolduğu için güvenli çıkış yapıldı. Yeni bağlantı talep edin.',
  yetkisizErisim: 'Bu müşteri kaydına erişim yetkiniz bulunmuyor.',
  gecersizImza: 'Oturum imzası doğrulanamadı. Lütfen geçerli bir bağlantı kullanın.',
  sunucuHatasi: 'Müşteri kayıtları şu anda yüklenemedi. Lütfen biraz sonra tekrar deneyin.',
} as const;

export interface PortalOturumYuku {
  kiraciId: string;
  musteriId: string;
  adSoyad?: string;
  exp: number;
}

export interface PortalLeadOzeti {
  id: string;
  adSoyad: string;
  durum: string;
  hizmet?: string;
  olusturmaTarihi: string;
}

export interface PortalDealOzeti {
  id: string;
  baslik: string;
  asama: string;
  tutar: number;
  paraBirimi: string;
  guncellemeTarihi: string;
}

export type PortalOturumDogrulamaSonucu =
  | {
      gecerli: true;
      yuk: PortalOturumYuku;
    }
  | {
      gecerli: false;
      durumKodu: 401 | 403;
      otomatikCikis: boolean;
      neden: 'eksik_anahtar' | 'gecersiz_jeton' | 'gecersiz_imza' | 'suresi_dolmus';
      mesaj: string;
    };

export interface PortalDurumSonucu {
  ok: boolean;
  durumKodu: 200 | 401 | 403 | 502;
  otomatikCikis: boolean;
  mesaj?: string;
  musteri?: {
    kiraciId: string;
    musteriId: string;
    adSoyad?: string;
  };
  leadler: PortalLeadOzeti[];
  firsatlar: PortalDealOzeti[];
}

function kanonikPortalMesaji(kiraciId: string, musteriId: string, exp: number): string {
  return `${kiraciId}:${musteriId}:${exp}`;
}

function expMsCoz(exp: number): number {
  return exp < 1_000_000_000_000 ? exp * 1000 : exp;
}

function guvenliHexEslesirMi(beklenenHex: string, gelenImza: string): boolean {
  const temiz = gelenImza.trim().toLowerCase();
  if (!/^[0-9a-f]+$/.test(temiz)) return false;
  const a = Buffer.from(beklenenHex, 'hex');
  const b = Buffer.from(temiz, 'hex');
  if (a.length === 0 || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Müşteri portalı için HMAC-SHA256 imzalı oturum jetonu üretir (`<base64url(payload)>.<hex>`).
 */
export function oturumJetonuOlustur(
  yuk: PortalOturumYuku,
  gizliAnahtar: string,
): string {
  if (!gizliAnahtar || !gizliAnahtar.trim()) {
    throw new Error('Portal oturum HMAC anahtarı boş olamaz.');
  }
  const temizYuk: PortalOturumYuku = {
    kiraciId: yuk.kiraciId.trim(),
    musteriId: yuk.musteriId.trim(),
    ...(yuk.adSoyad ? { adSoyad: yuk.adSoyad.trim() } : {}),
    exp: Number(yuk.exp),
  };
  if (!temizYuk.kiraciId || !temizYuk.musteriId || !Number.isFinite(temizYuk.exp) || temizYuk.exp <= 0) {
    throw new Error('Portal oturum yükü geçersiz.');
  }
  const payloadB64 = Buffer.from(JSON.stringify(temizYuk), 'utf8').toString('base64url');
  const imza = crypto
    .createHmac('sha256', gizliAnahtar)
    .update(kanonikPortalMesaji(temizYuk.kiraciId, temizYuk.musteriId, temizYuk.exp))
    .digest('hex');
  return `${payloadB64}.${imza}`;
}

/**
 * Müşteri portalı oturum jetonunu `timingSafeEqual` ve süre kontrolü ile doğrular.
 */
export function oturumJetonuDogrula(
  jeton: string,
  gizliAnahtar: string,
  simdi: Date = new Date(),
): PortalOturumDogrulamaSonucu {
  if (!gizliAnahtar || !gizliAnahtar.trim()) {
    return {
      gecerli: false,
      durumKodu: 403,
      otomatikCikis: true,
      neden: 'eksik_anahtar',
      mesaj: PORTAL_MESAJLARI.gecersizImza,
    };
  }
  const parcalar = (jeton ?? '').trim().split('.');
  if (parcalar.length !== 2 || !parcalar[0] || !parcalar[1]) {
    return {
      gecerli: false,
      durumKodu: 403,
      otomatikCikis: true,
      neden: 'gecersiz_jeton',
      mesaj: PORTAL_MESAJLARI.eksikOturum,
    };
  }
  let cozulmus: Partial<PortalOturumYuku>;
  try {
    cozulmus = JSON.parse(
      Buffer.from(parcalar[0], 'base64url').toString('utf8'),
    ) as Partial<PortalOturumYuku>;
  } catch {
    return {
      gecerli: false,
      durumKodu: 403,
      otomatikCikis: true,
      neden: 'gecersiz_jeton',
      mesaj: PORTAL_MESAJLARI.gecersizImza,
    };
  }

  const kiraciId = typeof cozulmus.kiraciId === 'string' ? cozulmus.kiraciId.trim() : '';
  const musteriId = typeof cozulmus.musteriId === 'string' ? cozulmus.musteriId.trim() : '';
  const adSoyad = typeof cozulmus.adSoyad === 'string' ? cozulmus.adSoyad.trim() : undefined;
  const exp = Number(cozulmus.exp);

  if (!kiraciId || !musteriId || !Number.isFinite(exp) || exp <= 0) {
    return {
      gecerli: false,
      durumKodu: 403,
      otomatikCikis: true,
      neden: 'gecersiz_jeton',
      mesaj: PORTAL_MESAJLARI.gecersizImza,
    };
  }

  const beklenenImza = crypto
    .createHmac('sha256', gizliAnahtar)
    .update(kanonikPortalMesaji(kiraciId, musteriId, exp))
    .digest('hex');

  if (!guvenliHexEslesirMi(beklenenImza, parcalar[1])) {
    return {
      gecerli: false,
      durumKodu: 403,
      otomatikCikis: true,
      neden: 'gecersiz_imza',
      mesaj: PORTAL_MESAJLARI.gecersizImza,
    };
  }

  if (expMsCoz(exp) <= simdi.getTime()) {
    return {
      gecerli: false,
      durumKodu: 401,
      otomatikCikis: true,
      neden: 'suresi_dolmus',
      mesaj: PORTAL_MESAJLARI.suresiDolmus,
    };
  }

  return {
    gecerli: true,
    yuk: {
      kiraciId,
      musteriId,
      ...(adSoyad ? { adSoyad } : {}),
      exp,
    },
  };
}

export interface PortalDurumIstekSecenekleri {
  jeton: string;
  gizliAnahtar: string;
  hedefMusteriId?: string;
  apiTabanUrl?: string;
  fetchImpl?: typeof fetch;
  simdi?: Date;
}

/**
 * Doğrulanmış müşterinin yalnız kendi lead ve deal durumunu SQL/API köprüsünden çeker.
 */
export async function musteriDurumuGetir(
  secenekler: PortalDurumIstekSecenekleri,
): Promise<PortalDurumSonucu> {
  const dogrulama = oturumJetonuDogrula(
    secenekler.jeton,
    secenekler.gizliAnahtar,
    secenekler.simdi,
  );
  if (!dogrulama.gecerli) {
    return {
      ok: false,
      durumKodu: dogrulama.durumKodu,
      otomatikCikis: dogrulama.otomatikCikis,
      mesaj: dogrulama.mesaj,
      leadler: [],
      firsatlar: [],
    };
  }

  const { kiraciId, musteriId, adSoyad } = dogrulama.yuk;
  if (
    secenekler.hedefMusteriId &&
    secenekler.hedefMusteriId.trim() !== musteriId
  ) {
    return {
      ok: false,
      durumKodu: 403,
      otomatikCikis: true,
      mesaj: PORTAL_MESAJLARI.yetkisizErisim,
      leadler: [],
      firsatlar: [],
    };
  }

  const taban = (secenekler.apiTabanUrl ?? 'https://api.gonet.com.tr').replace(/\/+$/, '');
  const fetchFn = secenekler.fetchImpl ?? fetch;

  try {
    const basliklar = {
      Accept: 'application/json',
      'X-Kiraci-Id': kiraciId,
      Authorization: `Bearer ${secenekler.jeton.trim()}`,
    };
    const [leadYanit, dealYanit] = await Promise.all([
      fetchFn(`${taban}/v1/crm/adaylar?musteri_id=${encodeURIComponent(musteriId)}`, {
        method: 'GET',
        headers: basliklar,
      }),
      fetchFn(`${taban}/v1/crm/firsatlar?musteri_id=${encodeURIComponent(musteriId)}`, {
        method: 'GET',
        headers: basliklar,
      }),
    ]);

    if (leadYanit.status === 401 || dealYanit.status === 401) {
      return {
        ok: false,
        durumKodu: 401,
        otomatikCikis: true,
        mesaj: PORTAL_MESAJLARI.suresiDolmus,
        leadler: [],
        firsatlar: [],
      };
    }

    if (leadYanit.status === 403 || dealYanit.status === 403) {
      return {
        ok: false,
        durumKodu: 403,
        otomatikCikis: true,
        mesaj: PORTAL_MESAJLARI.yetkisizErisim,
        leadler: [],
        firsatlar: [],
      };
    }

    if (!leadYanit.ok || !dealYanit.ok) {
      return {
        ok: false,
        durumKodu: 502,
        otomatikCikis: false,
        mesaj: PORTAL_MESAJLARI.sunucuHatasi,
        leadler: [],
        firsatlar: [],
      };
    }

    const leadGovde = (await leadYanit.json()) as { ogeler?: Array<Record<string, unknown>> };
    const dealGovde = (await dealYanit.json()) as { ogeler?: Array<Record<string, unknown>> };

    // Ek savunma katmanı: yalnız kendi müşteri kimliğine ait kayıtları süz
    const leadler: PortalLeadOzeti[] = (leadGovde.ogeler ?? [])
      .filter((o) => !o.musteri_id || String(o.musteri_id) === musteriId)
      .map((o) => ({
        id: String(o.id ?? ''),
        adSoyad: String(o.ad_soyad ?? adSoyad ?? 'Müşteri'),
        durum: String(o.durum ?? 'yeni'),
        ...(o.hizmet ? { hizmet: String(o.hizmet) } : {}),
        olusturmaTarihi: String(o.olusturma_zamani ?? ''),
      }));

    const firsatlar: PortalDealOzeti[] = (dealGovde.ogeler ?? [])
      .filter((o) => !o.musteri_id || String(o.musteri_id) === musteriId)
      .map((o) => ({
        id: String(o.id ?? ''),
        baslik: String(o.baslik ?? 'Teklif Çalışması'),
        asama: String(o.asama ?? 'yeni'),
        tutar: Number(o.tahmini_tutar ?? o.tutar ?? 0),
        paraBirimi: String(o.para_birimi ?? 'TRY'),
        guncellemeTarihi: String(o.guncelleme_zamani ?? ''),
      }));

    return {
      ok: true,
      durumKodu: 200,
      otomatikCikis: false,
      musteri: { kiraciId, musteriId, ...(adSoyad ? { adSoyad } : {}) },
      leadler,
      firsatlar,
    };
  } catch {
    return {
      ok: false,
      durumKodu: 502,
      otomatikCikis: false,
      mesaj: PORTAL_MESAJLARI.sunucuHatasi,
      leadler: [],
      firsatlar: [],
    };
  }
}
