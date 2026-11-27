export const VARSAYILAN_LEADS_API_UCU = 'https://cms.gonet.com.tr/api/vitrin/teklif';

export const TEKLIF_FORM_MESAJLARI = {
  yukleniyor: 'Teklif talebiniz güvenle gönderiliyor, lütfen bekleyin...',
  basari: 'Teklif talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
  kvkkHata: 'Devam etmek için KVKK Aydınlatma Metni onay kutusunu işaretlemelisiniz.',
  adHata: 'Lütfen adınızı ve soyadınızı en az 2 karakter olacak şekilde yazın.',
  epostaHata: 'Lütfen geçerli bir e-posta adresi girin.',
  telefonHata: 'Telefon numarası girdiyseniz en az 7 rakam içermelidir.',
  mesajHata: 'Lütfen projeniz veya talebiniz hakkında en az 10 karakterlik kısa bir özet yazın.',
  sunucuHata:
    'Talebiniz şu anda iletilemedi. Lütfen daha sonra tekrar deneyin veya gonet@gonet.com.tr adresine yazın.',
  agHata: 'Bağlantı hatası oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.',
} as const;

export interface TeklifFormVerisi {
  adSoyad: string;
  eposta: string;
  telefon?: string;
  sirket?: string;
  hizmet?: string;
  mesaj: string;
  kvkkOnay: boolean;
  /** Honeypot bot tuzağı alanı: gerçek kullanıcılar boş bırakır. */
  website?: string;
  kaynak?: string;
}

export interface TeklifDogrulamaSonucu {
  gecerli: boolean;
  botEngellendi: boolean;
  hataAlani?: 'adSoyad' | 'eposta' | 'telefon' | 'mesaj' | 'kvkkOnay';
  mesaj?: string;
}

export interface TeklifGonderimSecenekleri {
  endpoint?: string;
  fetchFn?: typeof fetch;
  nowFn?: () => Date;
  search?: string;
}

export interface TeklifGonderimSonucu {
  ok: boolean;
  durum: 'basari' | 'dogrulama_hatasi' | 'bot_engellendi' | 'sunucu_hatasi' | 'ag_hatasi';
  mesaj: string;
  apiyeGonderildi: boolean;
  hataAlani?: TeklifDogrulamaSonucu['hataAlani'];
  kvkkOnayZamani?: string;
  statusCode?: number;
}

const EPOSTA_DESENI = /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/;

/**
 * Sayfa adresindeki utm_source / utm_campaign parametrelerinden güvenli kaynak etiketi üretir.
 */
export function teklifKaynakEtiketi(search = ''): string {
  const VARSAYILAN = 'gonet.com.tr/teklif-al';
  if (!search) return VARSAYILAN;
  try {
    const params = new URLSearchParams(search);
    const etiket = ['utm_source', 'utm_campaign']
      .map((anahtar) => (params.get(anahtar) ?? '').trim())
      .filter((deger) => /^[a-z0-9_-]{1,64}$/i.test(deger))
      .join('-');
    return etiket && etiket.length <= 64 ? etiket : VARSAYILAN;
  } catch {
    return VARSAYILAN;
  }
}

/**
 * Teklif formunu KVKK onayı, honeypot bot tuzağı ve temel alan kurallarına göre doğrular.
 */
export function teklifFormuDogrula(veri: TeklifFormVerisi): TeklifDogrulamaSonucu {
  const tuzak = (veri.website ?? '').trim();
  if (tuzak.length > 0) {
    return {
      gecerli: false,
      botEngellendi: true,
      mesaj: TEKLIF_FORM_MESAJLARI.basari,
    };
  }

  const adSoyad = (veri.adSoyad ?? '').trim();
  if (adSoyad.length < 2) {
    return {
      gecerli: false,
      botEngellendi: false,
      hataAlani: 'adSoyad',
      mesaj: TEKLIF_FORM_MESAJLARI.adHata,
    };
  }

  const eposta = (veri.eposta ?? '').trim();
  if (!EPOSTA_DESENI.test(eposta)) {
    return {
      gecerli: false,
      botEngellendi: false,
      hataAlani: 'eposta',
      mesaj: TEKLIF_FORM_MESAJLARI.epostaHata,
    };
  }

  const telefon = (veri.telefon ?? '').trim();
  if (telefon.length > 0) {
    const rakamSayisi = telefon.replace(/[^\d]/g, '').length;
    if (rakamSayisi < 7) {
      return {
        gecerli: false,
        botEngellendi: false,
        hataAlani: 'telefon',
        mesaj: TEKLIF_FORM_MESAJLARI.telefonHata,
      };
    }
  }

  const mesaj = (veri.mesaj ?? '').trim();
  if (mesaj.length < 10) {
    return {
      gecerli: false,
      botEngellendi: false,
      hataAlani: 'mesaj',
      mesaj: TEKLIF_FORM_MESAJLARI.mesajHata,
    };
  }

  if (veri.kvkkOnay !== true) {
    return {
      gecerli: false,
      botEngellendi: false,
      hataAlani: 'kvkkOnay',
      mesaj: TEKLIF_FORM_MESAJLARI.kvkkHata,
    };
  }

  return {
    gecerli: true,
    botEngellendi: false,
  };
}

/**
 * Doğrulanmış teklif talebini kvkkOnayZamani ISO damgası ile leads API ucuna POST eder.
 */
export async function teklifFormuGonder(
  veri: TeklifFormVerisi,
  secenekler: TeklifGonderimSecenekleri = {},
): Promise<TeklifGonderimSonucu> {
  const dogrulama = teklifFormuDogrula(veri);

  if (dogrulama.botEngellendi) {
    return {
      ok: false,
      durum: 'bot_engellendi',
      mesaj: TEKLIF_FORM_MESAJLARI.basari,
      apiyeGonderildi: false,
    };
  }

  if (!dogrulama.gecerli) {
    return {
      ok: false,
      durum: 'dogrulama_hatasi',
      mesaj: dogrulama.mesaj ?? TEKLIF_FORM_MESAJLARI.mesajHata,
      apiyeGonderildi: false,
      hataAlani: dogrulama.hataAlani,
    };
  }

  const nowFn = secenekler.nowFn ?? (() => new Date());
  const kvkkOnayZamani = nowFn().toISOString();
  const endpoint = (secenekler.endpoint ?? VARSAYILAN_LEADS_API_UCU).trim() || VARSAYILAN_LEADS_API_UCU;
  const fetchFn = secenekler.fetchFn ?? fetch;

  const govde = {
    adSoyad: veri.adSoyad.trim(),
    eposta: veri.eposta.trim(),
    telefon: (veri.telefon ?? '').trim() || undefined,
    sirket: (veri.sirket ?? '').trim() || undefined,
    hizmet: (veri.hizmet ?? '').trim() || undefined,
    mesaj: veri.mesaj.trim(),
    kvkkOnay: true,
    kvkkOnayZamani,
    kaynak: (veri.kaynak ?? '').trim() || teklifKaynakEtiketi(secenekler.search),
  };

  try {
    const yanit = await fetchFn(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(govde),
    });

    const veriJson = await yanit.json().catch(() => ({} as Record<string, unknown>));

    if (yanit.ok && (veriJson.ok === undefined || veriJson.ok === true)) {
      return {
        ok: true,
        durum: 'basari',
        mesaj: TEKLIF_FORM_MESAJLARI.basari,
        apiyeGonderildi: true,
        kvkkOnayZamani,
        statusCode: yanit.status,
      };
    }

    return {
      ok: false,
      durum: 'sunucu_hatasi',
      mesaj: TEKLIF_FORM_MESAJLARI.sunucuHata,
      apiyeGonderildi: true,
      kvkkOnayZamani,
      statusCode: yanit.status,
    };
  } catch {
    return {
      ok: false,
      durum: 'ag_hatasi',
      mesaj: TEKLIF_FORM_MESAJLARI.agHata,
      apiyeGonderildi: true,
      kvkkOnayZamani,
    };
  }
}
