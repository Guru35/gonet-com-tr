// gonet.com.tr — Tek Gezinti (Navigasyon) Veri Kaynağı
// Üst Mega Menü (MainHeaderNav), Sağ Alt Göz Akordiyonu (EyeAccordionMenu)
// ve Alt Bilgi (SiteFooterNav) tarafından ortak tüketilir.

export type Dil = 'tr' | 'en';

export type NavKokId = 'hizmetler' | 'calismalar' | 'labs' | 'kurumsal' | 'iletisim';

export interface NavOge {
  readonly href: string;
  readonly label: string;
  readonly aciklama: string;
  readonly rozet?: string;
  readonly oneCikan?: boolean;
  readonly aktifEkYollar?: readonly string[];
}

export interface NavAltGrup {
  readonly id: string;
  readonly baslik: string;
  readonly ogeler: readonly NavOge[];
}

export interface NavKok {
  readonly id: NavKokId;
  readonly numara: string;
  readonly label: string;
  readonly href: string;
  readonly ozet: string;
  readonly tumunuGorEtiket: string;
  readonly megaMenuVar: boolean;
  readonly akordiyondaGoster: boolean;
  readonly gruplar: readonly NavAltGrup[];
}

export interface NavAksiyonlar {
  readonly merhaba: NavOge;
  readonly gorusme: NavOge;
  readonly teklif: NavOge;
  readonly seoAnaliz: NavOge;
}

export interface NavEtiketler {
  readonly anaNavAria: string;
  readonly logoAria: string;
  readonly temaDegistirAria: string;
  readonly hizliGezBaslik: string;
  readonly hizliGezAria: string;
  readonly menuyuKapatAria: string;
  readonly geriDugmesi: string;
  readonly mobilMenuDugmesi: string;
  readonly temaBaslik: string;
  readonly temaAcik: string;
  readonly temaKoyu: string;
  readonly megaMenuVurguBaslik: string;
  readonly altBilgiKimBaslik: string;
  readonly altBilgiGezBaslik: string;
  readonly altBilgiIletisimBaslik: string;
  readonly altBilgiSosyalBaslik: string;
  readonly altBilgiCerezDugmesi: string;
  readonly altBilgiWordmarkAria: string;
  readonly yeniSekmeEkranOkuyucu: string;
}

export interface DilNavigasyonPaketi {
  readonly dil: Dil;
  readonly kokler: readonly NavKok[];
  readonly aksiyonlar: NavAksiyonlar;
  readonly etiketler: NavEtiketler;
  readonly rastgeleSayfalar: readonly string[];
}

export interface DilEslesmesi {
  readonly tr: string;
  readonly en: string;
}

export interface KarsitDilBilgisi {
  readonly hedefDil: Dil;
  readonly etiket: string;
  readonly kisaEtiket: string;
  readonly href: string;
  readonly ariaLabel: string;
}

// ---------------------------------------------------------------------------
// TR <-> EN Karşılıklı Sayfa Eşlemeleri (yalnız gerçek mevcut sayfalar)
// ---------------------------------------------------------------------------
export const DIL_ESLESMELERI: readonly DilEslesmesi[] = [
  { tr: '/', en: '/en' },
  { tr: '/aeo-geo-denetimi', en: '/en/aeo-geo-audit' },
  { tr: '/yapay-zeka-dijital-ajans', en: '/en/ai-digital-agency' },
  { tr: '/saglik-turizmi-performans-pazarlama', en: '/en/medical-tourism-marketing' },
  { tr: '/case-studies', en: '/en/case-studies' },
  { tr: '/ekibimiz', en: '/en/team' },
  { tr: '/ik', en: '/en/ai-culture' },
];

// ---------------------------------------------------------------------------
// Türkçe ('tr') Navigasyon Ağacı
// ---------------------------------------------------------------------------
const TR_KOKLER: readonly NavKok[] = [
  {
    id: 'hizmetler',
    numara: '01',
    label: 'Hizmetler',
    href: '/uzmanlik',
    ozet: 'Yapay zekâ görünürlüğü, sektörel büyüme ve teknik performans disiplinleri.',
    tumunuGorEtiket: 'Tüm Uzmanlık Alanları →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'yapay-zeka-gorunurluk',
        baslik: 'Yapay Zekâ & Görünürlük',
        ogeler: [
          {
            href: '/aeo-geo-denetimi',
            label: 'AEO / GEO Denetimi',
            aciklama: 'Yapay zekâ görünürlük denetimi',
          },
          {
            href: '/aeo-geo-denetimi/ornek-rapor',
            label: 'Örnek Denetim Raporu',
            aciklama: 'Beş katmanlı örnek inceleme',
          },
          {
            href: '/yapay-zeka-dijital-ajans',
            label: 'Yapay Zekâ Ajansı',
            aciklama: 'Performans pazarlama ve AI entegrasyonu',
          },
          {
            href: '/creative-ai',
            label: 'Creative AI',
            aciklama: 'İnsan sezgisi ve yapay zekâ sentezi',
          },
          {
            href: '/ai-sohbet-asistani-gelistirme',
            label: 'AI Sohbet Asistanı',
            aciklama: 'Kurumsal ve KVKK uyumlu asistan',
          },
          {
            href: '/araclar/seo-analiz',
            label: 'Ücretsiz SEO & AEO Analizi',
            aciklama: '25 noktada görünürlük analizi',
            rozet: 'Öne Çıkan',
            oneCikan: true,
          },
        ],
      },
      {
        id: 'sektorel-buyume-disiplinler',
        baslik: 'Sektörel Büyüme & Disiplinler',
        ogeler: [
          {
            href: '/saglik-turizmi-performans-pazarlama',
            label: 'Sağlık Turizmi Pazarlama',
            aciklama: 'Klinikler için uluslararası hasta kazanımı',
          },
          {
            href: '/insaat-dijital-pazarlama',
            label: 'İnşaat Dijital Pazarlama',
            aciklama: 'Konut projeleri için talep üretimi',
          },
          {
            href: '/siyasi-dijital-kampanya',
            label: 'Siyasi Dijital Kampanya',
            aciklama: 'Seçim iletişimi ve itibar yönetimi',
          },
          {
            href: '/uzmanlik',
            label: 'Uzmanlık Alanları',
            aciklama: 'Temel strateji ve performans disiplinleri',
          },
          {
            href: '/yetenekler',
            label: 'Tüm Yetenekler',
            aciklama: '14 kategoride teknik ajans yetkinliği',
          },
        ],
      },
    ],
  },
  {
    id: 'calismalar',
    numara: '02',
    label: 'Çalışmalar',
    href: '/case-studies',
    ozet: '26 yıllık marka arşivi, vaka incelemeleri ve görsel üretim seçkisi.',
    tumunuGorEtiket: 'Tüm Vaka Çalışmaları →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'portfoy-ve-arsiv',
        baslik: 'Projeler & Görsel Seçki',
        ogeler: [
          {
            href: '/case-studies',
            label: 'Vaka Çalışmaları',
            aciklama: 'Ölçülmüş proje süreçleri ve sonuçlar',
          },
          {
            href: '/markalar',
            label: 'Markalar · 190+',
            aciklama: '26 yılda çalışılan marka arşivi',
          },
          {
            href: '/deneyimler',
            label: 'Deneyimler',
            aciklama: 'Ajans tarihçesi ve dönüm noktaları',
          },
          {
            href: '/galeri',
            label: 'Görsel Galeri',
            aciklama: 'Tasarım ve marka üretimleri seçkisi',
          },
          {
            href: '/sosyal-medya-galeri',
            label: 'Sosyal Medya Galerisi',
            aciklama: 'Kampanya görselleri ve dijital içerikler',
          },
          {
            href: '/sergi',
            label: 'Dijital Sergi',
            aciklama: 'Sayfa tasarımları tam ekran sergi',
          },
        ],
      },
    ],
  },
  {
    id: 'labs',
    numara: '03',
    label: 'Labs & İçerik',
    href: '/labs',
    ozet: 'Araştırma ürünleri, yayın arşivi ve çalışma modeline dair rehberler.',
    tumunuGorEtiket: 'Labs Genel Bakış →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'gonet-labs',
        baslik: 'Gonet Labs',
        ogeler: [
          {
            href: '/labs',
            label: 'Labs Genel Bakış',
            aciklama: 'Ar-Ge projeleri ve deneysel çalışmalar',
          },
          {
            href: '/labs/ybf',
            label: 'YBF Standardı',
            aciklama: 'Çok eksenli yapay zekâ etik modeli',
          },
          {
            href: '/labs/dupia',
            label: 'Dupia',
            aciklama: 'Dijital ekosistem ve topluluk girişimi',
          },
          {
            href: '/labs/sosyalmedya-org-tr',
            label: 'sosyalmedya.org.tr',
            aciklama: 'Yapay zekâ ve sosyal medya yayını',
          },
        ],
      },
      {
        id: 'yayinlar-rehber',
        baslik: 'Yayınlar & Rehber',
        ogeler: [
          {
            href: '/blog',
            label: 'Blog',
            aciklama: 'Strateji, SEO ve AI yazıları',
          },
          {
            href: '/haberler',
            label: 'Haberler',
            aciklama: 'Kronolojik yayın arşivi ve duyurular',
          },
          {
            href: '/sss',
            label: 'Sık Sorulan Sorular',
            aciklama: 'Çalışma modeli hakkında net yanıtlar',
          },
          {
            href: '/guncellemeler',
            label: 'Güncellemeler',
            aciklama: 'Site sürüm ve geliştirme kayıtları',
          },
        ],
      },
    ],
  },
  {
    id: 'kurumsal',
    numara: '04',
    label: 'Kurumsal',
    href: '/hakkimizda',
    ozet: 'Tek insan liderliği, 27 uzman AI ajanı, tasarım kuralları ve KVKK şeffaflığı.',
    tumunuGorEtiket: 'Ajansı Tanıyın →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'kurumsal-yapi',
        baslik: 'Ajans, Kadro & Yönetişim',
        ogeler: [
          {
            href: '/hakkimizda',
            label: 'Hakkımızda',
            aciklama: 'Kuruluş hikayesi ve ajans yaklaşımı',
          },
          {
            href: '/ekibimiz',
            label: 'Ekibimiz · 1 İnsan + 27 AI',
            aciklama: 'Kurucu liderlik ve şeffaf kadro',
          },
          {
            href: '/ik',
            label: 'İK & AI Kültürü',
            aciklama: 'Anayasal ajan yönetişimi ve kültür',
          },
          {
            href: '/yaratici-manifesto',
            label: 'Yaratıcı Manifesto',
            aciklama: 'Tasarım ve üretim ilkelerimiz',
          },
          {
            href: '/kurumsal-kimlik',
            label: 'Kurumsal Kimlik',
            aciklama: 'Tipografi, renk ve görsel kurallar',
          },
          {
            href: '/kvkk',
            label: 'KVKK Aydınlatma',
            aciklama: 'Kişisel veri ve gizlilik aydınlatması',
          },
        ],
      },
    ],
  },
  {
    id: 'iletisim',
    numara: '05',
    label: 'İletişim',
    href: '/iletisim',
    ozet: 'Görüşme talebi, proje ön değerlendirmesi ve doğrudan iletişim kanalları.',
    tumunuGorEtiket: 'İletişime Geçin →',
    megaMenuVar: false,
    akordiyondaGoster: false,
    gruplar: [
      {
        id: 'iletisim-kanallari',
        baslik: 'Doğrudan İletişim',
        ogeler: [
          {
            href: '/iletisim',
            label: 'İletişim',
            aciklama: 'Adres, telefon ve iletişim formu',
          },
          {
            href: '/teklif-al',
            label: 'Teklif Al',
            aciklama: 'Proje kapsamı ve ön değerlendirme',
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// İngilizce ('en') Navigasyon Ağacı (yalnız gerçek /en sayfaları + etiketli ortak araç/iletişim)
// ---------------------------------------------------------------------------
const EN_KOKLER: readonly NavKok[] = [
  {
    id: 'hizmetler',
    numara: '01',
    label: 'Services',
    href: '/en/ai-digital-agency',
    ozet: 'Evidence-based AEO/GEO audits, AI performance marketing, and medical tourism growth.',
    tumunuGorEtiket: 'AI Agency Overview →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'en-ai-visibility',
        baslik: 'AI Visibility & Agency',
        ogeler: [
          {
            href: '/en/aeo-geo-audit',
            label: 'AEO / GEO Audit',
            aciklama: 'Five-layer AI visibility audit',
          },
          {
            href: '/en/ai-digital-agency',
            label: 'AI Digital Agency',
            aciklama: 'Human and AI performance marketing',
          },
          {
            href: '/araclar/seo-analiz',
            label: 'Free SEO & AEO Audit (TR)',
            aciklama: 'Twenty-five point readiness scan',
            rozet: 'TR Tool',
            oneCikan: true,
          },
        ],
      },
      {
        id: 'en-sector-growth',
        baslik: 'Sector Growth',
        ogeler: [
          {
            href: '/en/medical-tourism-marketing',
            label: 'Medical Tourism Marketing',
            aciklama: 'International patient acquisition campaigns',
          },
        ],
      },
    ],
  },
  {
    id: 'calismalar',
    numara: '02',
    label: 'Work',
    href: '/en/case-studies',
    ozet: 'Verified enterprise education, healthcare, and bilingual AEO case studies.',
    tumunuGorEtiket: 'View Case Studies →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'en-selected-work',
        baslik: 'Selected Projects',
        ogeler: [
          {
            href: '/en/case-studies',
            label: 'Case Studies',
            aciklama: 'Selected digital and AI projects',
          },
        ],
      },
    ],
  },
  {
    id: 'labs',
    numara: '03',
    label: 'Overview & Tools',
    href: '/en',
    ozet: 'Agency heritage since 2000, key track record, and automated visibility checks.',
    tumunuGorEtiket: 'English Overview →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'en-overview-tools',
        baslik: 'Hub & Assessment',
        ogeler: [
          {
            href: '/en',
            label: 'English Overview',
            aciklama: 'Agency background and track record',
          },
          {
            href: '/araclar/seo-analiz',
            label: 'SEO & AEO Analyzer (TR)',
            aciklama: 'Automated twenty-five point check',
            rozet: 'TR Tool',
            oneCikan: true,
          },
        ],
      },
    ],
  },
  {
    id: 'kurumsal',
    numara: '04',
    label: 'Company',
    href: '/en/team',
    ozet: 'Human founder sign-off, 27 specialist AI agents, and ethical constitution.',
    tumunuGorEtiket: 'Meet the Team →',
    megaMenuVar: true,
    akordiyondaGoster: true,
    gruplar: [
      {
        id: 'en-leadership-governance',
        baslik: 'Team & Governance',
        ogeler: [
          {
            href: '/en/team',
            label: 'Team · 1 Human + 27 AI',
            aciklama: 'Human founder and AI roster',
          },
          {
            href: '/en/ai-culture',
            label: 'AI Governance & Culture',
            aciklama: 'Ethical constitution and growth scale',
          },
        ],
      },
    ],
  },
  {
    id: 'iletisim',
    numara: '05',
    label: 'Contact',
    href: '/iletisim',
    ozet: 'Direct agency contact and project scope pre-assessment forms.',
    tumunuGorEtiket: 'Contact Page →',
    megaMenuVar: false,
    akordiyondaGoster: false,
    gruplar: [
      {
        id: 'en-contact-channels',
        baslik: 'Direct Channels',
        ogeler: [
          {
            href: '/iletisim',
            label: 'Contact (TR / EN)',
            aciklama: 'Direct message to agency team',
            rozet: 'TR / EN',
          },
          {
            href: '/teklif-al',
            label: 'Request Proposal (TR)',
            aciklama: 'Project scope and initial review',
            rozet: 'TR Form',
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Dil Paketleri
// ---------------------------------------------------------------------------
export const NAVIGASYON_PAKETLERI: Record<Dil, DilNavigasyonPaketi> = {
  tr: {
    dil: 'tr',
    kokler: TR_KOKLER,
    aksiyonlar: {
      merhaba: {
        href: '/merhaba',
        label: 'Merhaba',
        aciklama: 'Yöneticiler için AI kulübü',
      },
      gorusme: {
        href: '/iletisim',
        label: 'Görüşme isteyin',
        aciklama: 'Doğrudan ajans ekibine ulaşın',
      },
      teklif: {
        href: '/teklif-al',
        label: 'Teklif Al',
        aciklama: 'Proje kapsamı ve ön değerlendirme',
      },
      seoAnaliz: {
        href: '/araclar/seo-analiz',
        label: 'Ücretsiz SEO & AEO Analizi',
        aciklama: '25 noktada görünürlük analizi',
        rozet: 'Ücretsiz',
        oneCikan: true,
      },
    },
    etiketler: {
      anaNavAria: 'Ana navigasyon',
      logoAria: 'Gonet anasayfa',
      temaDegistirAria: 'Koyu / açık tema değiştir',
      hizliGezBaslik: 'Gez',
      hizliGezAria: 'Hızlı gez menüsü',
      menuyuKapatAria: 'Menüyü kapat',
      geriDugmesi: '← Geri',
      mobilMenuDugmesi: 'Menü',
      temaBaslik: 'Tema',
      temaAcik: 'Açık',
      temaKoyu: 'Koyu',
      megaMenuVurguBaslik: 'Hızlı Başlangıç',
      altBilgiKimBaslik: 'Kim',
      altBilgiGezBaslik: 'Gez',
      altBilgiIletisimBaslik: 'İletişim',
      altBilgiSosyalBaslik: 'Sosyal',
      altBilgiCerezDugmesi: 'Çerez ayarları',
      altBilgiWordmarkAria: 'Rastgele sayfaya git',
      yeniSekmeEkranOkuyucu: ' (yeni sekmede açılır)',
    },
    rastgeleSayfalar: [
      '/',
      '/uzmanlik',
      '/case-studies',
      '/markalar',
      '/deneyimler',
      '/yetenekler',
      '/yaratici-manifesto',
      '/hakkimizda',
      '/ekibimiz',
      '/ik',
      '/kurumsal-kimlik',
      '/blog',
      '/sss',
      '/iletisim',
    ],
  },
  en: {
    dil: 'en',
    kokler: EN_KOKLER,
    aksiyonlar: {
      merhaba: {
        href: '/merhaba',
        label: 'Merhaba (TR)',
        aciklama: 'Executive AI marketing club page',
        rozet: 'TR',
      },
      gorusme: {
        href: '/iletisim',
        label: 'Book a Call',
        aciklama: 'Direct message to agency team',
      },
      teklif: {
        href: '/teklif-al',
        label: 'Request Proposal (TR)',
        aciklama: 'Project scope and initial review',
        rozet: 'TR',
      },
      seoAnaliz: {
        href: '/araclar/seo-analiz',
        label: 'Free SEO & AEO Audit (TR)',
        aciklama: 'Twenty-five point readiness scan',
        rozet: 'TR Tool',
        oneCikan: true,
      },
    },
    etiketler: {
      anaNavAria: 'Main navigation',
      logoAria: 'Gonet home',
      temaDegistirAria: 'Toggle dark or light theme',
      hizliGezBaslik: 'Explore',
      hizliGezAria: 'Quick navigation menu',
      menuyuKapatAria: 'Close menu',
      geriDugmesi: '← Back',
      mobilMenuDugmesi: 'Menu',
      temaBaslik: 'Theme',
      temaAcik: 'Light',
      temaKoyu: 'Dark',
      megaMenuVurguBaslik: 'Quick Start',
      altBilgiKimBaslik: 'About',
      altBilgiGezBaslik: 'Explore',
      altBilgiIletisimBaslik: 'Contact',
      altBilgiSosyalBaslik: 'Social',
      altBilgiCerezDugmesi: 'Cookie settings',
      altBilgiWordmarkAria: 'Go to a random page',
      yeniSekmeEkranOkuyucu: ' (opens in a new tab)',
    },
    rastgeleSayfalar: [
      '/en',
      '/en/aeo-geo-audit',
      '/en/ai-digital-agency',
      '/en/medical-tourism-marketing',
      '/en/case-studies',
      '/en/team',
      '/en/ai-culture',
    ],
  },
};

// ---------------------------------------------------------------------------
// Yardımcı Fonksiyonlar
// ---------------------------------------------------------------------------

/** Verilen URL veya path değerini temiz, göreceli path biçimine çevirir. */
export function yoluNormalizeEt(hamYol: string): string {
  if (!hamYol) return '/';
  let yol = hamYol.trim();
  if (/^https?:\/\//i.test(yol)) {
    try {
      yol = new URL(yol).pathname;
    } catch {
      return '/';
    }
  }
  yol = yol.split('#')[0]?.split('?')[0] ?? '/';
  yol = yol.replace(/\/{2,}/g, '/');
  if (!yol.startsWith('/')) {
    yol = `/${yol}`;
  }
  if (yol.length > 1) {
    yol = yol.replace(/\/+$/, '');
  }
  return yol || '/';
}

/** Verilen path'ten aktif dili ('tr' | 'en') tespit eder. */
export function yolDiliniBul(currentPath: string): Dil {
  const temiz = yoluNormalizeEt(currentPath);
  return temiz === '/en' || temiz.startsWith('/en/') ? 'en' : 'tr';
}

/** Dil koduna göre tam navigasyon paketini döndürür. */
export function navigasyonGetir(dil: Dil = 'tr'): DilNavigasyonPaketi {
  return NAVIGASYON_PAKETLERI[dil] ?? NAVIGASYON_PAKETLERI.tr;
}

/** Üst mega menüde açılır paneli bulunan ana kökleri döndürür (01..04). */
export function megaMenuKokleriniGetir(dil: Dil = 'tr'): readonly NavKok[] {
  return navigasyonGetir(dil).kokler.filter((kok) => kok.megaMenuVar);
}

/** Sağ alt göz akordiyonunda gruplanacak kökleri döndürür (01..04). */
export function akordiyonKokleriniGetir(dil: Dil = 'tr'): readonly NavKok[] {
  return navigasyonGetir(dil).kokler.filter((kok) => kok.akordiyondaGoster);
}

/** Tekil bir hedefin mevcut sayfa yoluyla eşleşip eşleşmediğini kontrol eder. */
export function yolAktifMi(
  currentPath: string,
  href: string,
  extraPrefixes?: readonly string[],
): boolean {
  const mevcut = yoluNormalizeEt(currentPath);
  const hedef = yoluNormalizeEt(href);

  // Kök yollar yalnız tam eşleşmede aktif sayılır
  if (hedef === '/' || hedef === '/en') {
    return mevcut === hedef;
  }

  if (mevcut === hedef || mevcut.startsWith(`${hedef}/`)) {
    return true;
  }

  if (extraPrefixes && extraPrefixes.length > 0) {
    return extraPrefixes.some((onEk) => {
      const temizEk = yoluNormalizeEt(onEk);
      return mevcut === temizEk || mevcut.startsWith(`${temizEk}/`);
    });
  }

  return false;
}

/** Bir ana kökün kendisi veya alt öğelerinden herhangi biri aktif mi kontrol eder. */
export function kokAktifMi(currentPath: string, kok: NavKok): boolean {
  if (yolAktifMi(currentPath, kok.href)) {
    return true;
  }
  for (const grup of kok.gruplar) {
    for (const oge of grup.ogeler) {
      if (yolAktifMi(currentPath, oge.href, oge.aktifEkYollar)) {
        return true;
      }
    }
  }
  return false;
}

/** Mevcut sayfanın ait olduğu ilk ana kökün ID'sini bulur (akordiyon başlangıç açılışı için). */
export function aktifKokIdBul(currentPath: string, dil: Dil = 'tr'): NavKokId | null {
  const kokler = navigasyonGetir(dil).kokler;
  for (const kok of kokler) {
    if (kokAktifMi(currentPath, kok)) {
      return kok.id;
    }
  }
  return null;
}

/**
 * TR <-> EN karşılıklı dil geçiş hedefini hesaplar.
 * Sayfa özel `overrideHref` (alternates içinden) verilmişse öncelikle onu kullanır;
 * aksi halde `DIL_ESLESMELERI` tablosu ve alt-dizin kurallarıyla gerçek sayfaya yönlendirir.
 */
export function dilDegistirHref(
  currentPath: string,
  hedefDil: Dil,
  overrideHref?: string,
): string {
  if (overrideHref && overrideHref.trim().length > 0) {
    return yoluNormalizeEt(overrideHref);
  }

  const mevcut = yoluNormalizeEt(currentPath);

  if (hedefDil === 'en') {
    const tamEslesme = DIL_ESLESMELERI.find((e) => e.tr === mevcut);
    if (tamEslesme) return tamEslesme.en;
    if (mevcut.startsWith('/case-studies/')) return '/en/case-studies';
    if (mevcut === '/en' || mevcut.startsWith('/en/')) return mevcut;
    return '/en';
  }

  const tersEslesme = DIL_ESLESMELERI.find((e) => e.en === mevcut);
  if (tersEslesme) return tersEslesme.tr;
  if (mevcut === '/en' || mevcut.startsWith('/en/')) return '/';
  return mevcut;
}

/** Dil geçiş düğmesi/bağlantısı için tüm metin ve hedef URL bilgisini üretir. */
export function karsitDilBilgisi(
  currentPath: string,
  mevcutDil?: Dil,
  alternateEnHref?: string,
  alternateTrHref?: string,
): KarsitDilBilgisi {
  const dil = mevcutDil ?? yolDiliniBul(currentPath);
  const hedefDil: Dil = dil === 'tr' ? 'en' : 'tr';
  const override = hedefDil === 'en' ? alternateEnHref : alternateTrHref;
  return {
    hedefDil,
    etiket: hedefDil === 'en' ? 'English' : 'Türkçe',
    kisaEtiket: hedefDil === 'en' ? 'EN' : 'TR',
    href: dilDegistirHref(currentPath, hedefDil, override),
    ariaLabel: hedefDil === 'en' ? 'Switch to English' : 'Türkçe sürüme geç',
  };
}
