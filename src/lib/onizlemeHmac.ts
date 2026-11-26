import crypto from 'node:crypto';

export const ONIZLEME_YANIT_BASLIKLARI = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
} as const;

export interface OnizlemeJetonYuk {
  slug: string;
  tenantId: string;
  exp: number;
}

export interface OnizlemeAyrikGirdi {
  slug: string;
  tenantId: string;
  exp: number | string;
  sig: string;
}

export type OnizlemeDogrulamaSonucu =
  | {
      gecerli: true;
      yuk: OnizlemeJetonYuk;
    }
  | {
      gecerli: false;
      neden: 'eksik_anahtar' | 'gecersiz_jeton' | 'gecersiz_imza' | 'suresi_dolmus';
      mesaj: string;
    };

function kanonikMesaj(slug: string, tenantId: string, exp: number): string {
  return `${slug}:${tenantId}:${exp}`;
}

function expMsCoz(exp: number): number {
  // 1e12 altı değerler saniye cinsinden Unix timestamp kabul edilir.
  return exp < 1_000_000_000_000 ? exp * 1000 : exp;
}

function guvenliImzaEslesiyorMu(beklenenHex: string, gelenImza: string): boolean {
  const temizGelen = gelenImza.trim().toLowerCase();
  if (!/^[0-9a-f]+$/.test(temizGelen)) return false;
  const a = Buffer.from(beklenenHex, 'hex');
  const b = Buffer.from(temizGelen, 'hex');
  if (a.length === 0 || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * İmzalı önizleme jetonu üretir (`<base64url(payload)>.<hmac-sha256-hex>`).
 */
export function onizlemeJetonuOlustur(
  yuk: OnizlemeJetonYuk,
  gizliAnahtar: string,
): string {
  if (!gizliAnahtar) {
    throw new Error('Önizleme HMAC gizli anahtarı boş olamaz.');
  }
  const temizYuk: OnizlemeJetonYuk = {
    slug: yuk.slug.trim(),
    tenantId: yuk.tenantId.trim(),
    exp: Number(yuk.exp),
  };
  const payloadB64 = Buffer.from(JSON.stringify(temizYuk), 'utf8').toString('base64url');
  const imza = crypto
    .createHmac('sha256', gizliAnahtar)
    .update(kanonikMesaj(temizYuk.slug, temizYuk.tenantId, temizYuk.exp))
    .digest('hex');
  return `${payloadB64}.${imza}`;
}

/**
 * Tek string (`payloadB64.imza`) veya ayrık parametreler (`slug`, `tenantId`, `exp`, `sig`)
 * üzerinden gelen HMAC-SHA256 önizleme jetonunu `crypto.timingSafeEqual` ile doğrular.
 */
export function onizlemeJetonuDogrula(
  girdi: string | OnizlemeAyrikGirdi,
  gizliAnahtar: string,
  simdi: Date = new Date(),
): OnizlemeDogrulamaSonucu {
  if (!gizliAnahtar || !gizliAnahtar.trim()) {
    return {
      gecerli: false,
      neden: 'eksik_anahtar',
      mesaj: 'Önizleme doğrulama anahtarı sunucuda yapılandırılmamış.',
    };
  }

  let slug = '';
  let tenantId = '';
  let exp = Number.NaN;
  let imza = '';

  if (typeof girdi === 'string') {
    const parcalar = girdi.trim().split('.');
    if (parcalar.length !== 2 || !parcalar[0] || !parcalar[1]) {
      return {
        gecerli: false,
        neden: 'gecersiz_jeton',
        mesaj: 'Önizleme jetonu biçimi geçersiz.',
      };
    }
    try {
      const cozulmus = JSON.parse(
        Buffer.from(parcalar[0], 'base64url').toString('utf8'),
      ) as Partial<OnizlemeJetonYuk>;
      slug = typeof cozulmus.slug === 'string' ? cozulmus.slug.trim() : '';
      tenantId = typeof cozulmus.tenantId === 'string' ? cozulmus.tenantId.trim() : '';
      exp = Number(cozulmus.exp);
      imza = parcalar[1];
    } catch {
      return {
        gecerli: false,
        neden: 'gecersiz_jeton',
        mesaj: 'Önizleme jetonu çözümlenemedi.',
      };
    }
  } else if (girdi && typeof girdi === 'object') {
    slug = typeof girdi.slug === 'string' ? girdi.slug.trim() : '';
    tenantId = typeof girdi.tenantId === 'string' ? girdi.tenantId.trim() : '';
    exp = Number(girdi.exp);
    imza = typeof girdi.sig === 'string' ? girdi.sig : '';
  }

  if (!slug || !tenantId || !Number.isFinite(exp) || exp <= 0 || !imza) {
    return {
      gecerli: false,
      neden: 'gecersiz_jeton',
      mesaj: 'Önizleme jetonu eksik veya bozuk alanlar içeriyor.',
    };
  }

  const beklenenImza = crypto
    .createHmac('sha256', gizliAnahtar)
    .update(kanonikMesaj(slug, tenantId, exp))
    .digest('hex');

  if (!guvenliImzaEslesiyorMu(beklenenImza, imza)) {
    return {
      gecerli: false,
      neden: 'gecersiz_imza',
      mesaj: 'Önizleme imzası doğrulanamadı.',
    };
  }

  if (expMsCoz(exp) <= simdi.getTime()) {
    return {
      gecerli: false,
      neden: 'suresi_dolmus',
      mesaj: 'Önizleme bağlantısının geçerlilik süresi dolmuş.',
    };
  }

  return {
    gecerli: true,
    yuk: { slug, tenantId, exp },
  };
}
