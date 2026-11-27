export type DepartmanKodu =
  | 'yonetim'
  | 'pazarlama-kreatif'
  | 'web-yazilim'
  | 'kalite-arastirma-hukuk'
  | 'altyapi-operasyon';

export type KariyerBasamagi = 'aday' | 'yetkin' | 'kidemli' | 'usta';

export interface LokalMetin {
  tr: string;
  en: string;
}

export interface DepartmanTanimi {
  kod: 'all' | DepartmanKodu;
  tr: string;
  en: string;
}

export interface AjanVitrinKaydi {
  kod: string;
  slug: string;
  personaAdi: string;
  aiBeyani: LokalMetin;
  departmanKodu: DepartmanKodu;
  departmanEtiketi: LokalMetin;
  rolUnvani: LokalMetin;
  gorevOzeti: LokalMetin;
  sinir: LokalMetin;
  raporHatti: LokalMetin;
  basamak: {
    kod: KariyerBasamagi;
    tr: string;
    en: string;
    kanitOlcegi: 0 | 1 | 2 | 3;
  };
  ybfIlkesi: string;
}

export const KURUCU_LIDERLIK = {
  ad: 'Gökhan Kazancı',
  unvan: {
    tr: 'Kurucu, Baş Stratejist & Tek Onay Makamı',
    en: 'Founder, Principal Strategist & Sole Approval Authority',
  },
  schemaId: 'https://gonet.com.tr/#founder',
} as const;

export const DEPARTMANLAR: readonly DepartmanTanimi[] = [
  {
    kod: 'all',
    tr: 'Tümü',
    en: 'All',
  },
  {
    kod: 'yonetim',
    tr: 'Yönetim & Kurmay',
    en: 'Governance & Strategy',
  },
  {
    kod: 'pazarlama-kreatif',
    tr: 'Pazarlama & Kreatif',
    en: 'Marketing & Creative',
  },
  {
    kod: 'web-yazilim',
    tr: 'Web & Yazılım',
    en: 'Web & Software',
  },
  {
    kod: 'kalite-arastirma-hukuk',
    tr: 'Kalite, Araştırma & Hukuk',
    en: 'QA, Research & Legal',
  },
  {
    kod: 'altyapi-operasyon',
    tr: 'Altyapı, Hafıza & Operasyon',
    en: 'Infrastructure, Memory & Ops',
  },
] as const;

const ORTAK_AI_BEYANI: LokalMetin = {
  tr: 'Yapay Zekâ Ajanı · Anayasal Sınırlı',
  en: 'AI Agent · Constitution-Bound',
};

const BASLANGIC_BASAMAGI = {
  kod: 'aday' as const,
  tr: 'Aday',
  en: 'Candidate',
  kanitOlcegi: 1 as const,
};

const DEPT_ETIKETLERI: Record<DepartmanKodu, LokalMetin> = {
  yonetim: { tr: 'Yönetim & Kurmay', en: 'Governance & Strategy' },
  'pazarlama-kreatif': { tr: 'Pazarlama & Kreatif', en: 'Marketing & Creative' },
  'web-yazilim': { tr: 'Web & Yazılım', en: 'Web & Software' },
  'kalite-arastirma-hukuk': {
    tr: 'Kalite, Araştırma & Hukuk',
    en: 'QA, Research & Legal',
  },
  'altyapi-operasyon': {
    tr: 'Altyapı, Hafıza & Operasyon',
    en: 'Infrastructure, Memory & Ops',
  },
};

export const UZMAN_AJANLAR: AjanVitrinKaydi[] = [
  {
    kod: 'CEOYNG1',
    slug: 'ceo-g1',
    personaAdi: 'Kaan Demirsoy',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'yonetim',
    departmanEtiketi: DEPT_ETIKETLERI.yonetim,
    rolUnvani: {
      tr: 'Ajans Planlama & İş Dağıtım Orkestratörü',
      en: 'Agency Planning & Task Orchestrator',
    },
    gorevOzeti: {
      tr: 'Büyük hedefleri iş paketlerine böler, uzman ajanlara görev dağıtır ve teslimi koordine eder.',
      en: 'Breaks complex goals into work packages, assigns tasks to specialist agents, and coordinates delivery.',
    },
    sinir: {
      tr: 'Müşteriye doğrudan yayın yapmaz; strateji dışı kod veya tasarım üretmez.',
      en: 'Never publishes directly to clients; does not produce production code or visual assets.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır + Özgürlük',
  },
  {
    kod: 'INSKNG1',
    slug: 'ik-g1',
    personaAdi: 'Selim Atakul',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'yonetim',
    departmanEtiketi: DEPT_ETIKETLERI.yonetim,
    rolUnvani: {
      tr: 'AI İnsan Kaynakları & Gelişim Yöneticisi',
      en: 'AI HR & Capability Lead',
    },
    gorevOzeti: {
      tr: '27 uzman ajanın kadro kayıtlarını, yetkinlik planlarını ve sürekli eğitim kalibrasyonunu yönetir.',
      en: 'Maintains roster records, capability development plans, and continuous training calibration for all 27 specialist agents.',
    },
    sinir: {
      tr: 'Başka birime doğrudan görev dağıtmaz; işe alım veya bütçe kararı vermez.',
      en: 'Does not assign tasks to other units; makes no hiring or budget decisions.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Onur + Saygı',
  },
  {
    kod: 'DRKTRG1',
    slug: 'direktor-g1',
    personaAdi: 'Levent Aksungur',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'yonetim',
    departmanEtiketi: DEPT_ETIKETLERI.yonetim,
    rolUnvani: {
      tr: 'Bağımsız Denetim & Haftalık Özet Kurmayı',
      en: 'Independent Oversight Staff',
    },
    gorevOzeti: {
      tr: 'Tüm birimlerin çıktılarını salt-okunur tarar, riskleri erkenden işaretler ve kurucuya haftalık rapor sunar.',
      en: 'Audits unit outputs in read-only mode, flags risks early, and delivers weekly briefings to the founder.',
    },
    sinir: {
      tr: 'Üretim işine karışmaz; hiçbir birimin belgesini doğrudan değiştirmez.',
      en: 'Never intervenes in production; never modifies any unit document directly.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Sınır',
  },
  {
    kod: 'CMOPZG1',
    slug: 'cmo-g1',
    personaAdi: 'Nilüfer Gökalan',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'Pazarlama Stratejisi Departman Başı',
      en: 'Head of Marketing Strategy',
    },
    gorevOzeti: {
      tr: 'Marka konumlandırma, kanal planı, B2B dönüşüm hunisi ve büyüme stratejilerini yönetir.',
      en: 'Directs brand positioning, channel planning, B2B conversion funnels, and structured growth strategies.',
    },
    sinir: {
      tr: 'Onaysız kampanya veya reklam bütçesi başlatmaz; gerçek dışı vaat yazmaz.',
      en: 'Never launches unapproved campaigns or ad spend; writes zero unverified claims.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Sınır',
  },
  {
    kod: 'AEOGEG1',
    slug: 'aeo-geo-g1',
    personaAdi: 'Tolga Aramacı',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'SEO / AEO / GEO Görünürlük Uzmanı',
      en: 'SEO, AEO & GEO Specialist',
    },
    gorevOzeti: {
      tr: 'Yapay zekâ yanıt motorlarında ve arama sonuçlarında doğru temsil ve ölçüm standartlarını kurar.',
      en: 'Establishes entity accuracy and citation measurement standards across search and AI answer engines.',
    },
    sinir: {
      tr: 'Sıralama veya yapay zekâ yanıt garantisi vermez; kaynaksız istatistik üretmez.',
      en: 'Never guarantees search rankings or AI citations; produces zero unsourced statistics.',
    },
    raporHatti: {
      tr: 'Nilüfer Gökalan (CMO-G1)',
      en: 'Nilüfer Gökalan (CMO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik',
  },
  {
    kod: 'KRDRKG1',
    slug: 'kreatif-direktor-g1',
    personaAdi: 'Defne Erkanlı',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'Kreatif Direktör',
      en: 'Creative Director',
    },
    gorevOzeti: {
      tr: 'Ana fikri, marka ses kilidini ve kreatif ekibin görsel-metinsel bütünlüğünü yönetir.',
      en: 'Guides core creative concepts, brand voice lock, and visual-verbal consistency across creative outputs.',
    },
    sinir: {
      tr: 'Kurucu onayı olmadan kampanya konseptini yayına almaz.',
      en: 'Never clears a campaign concept for publication without founder approval.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Onur + Sınır',
  },
  {
    kod: 'ARTDRG1',
    slug: 'art-direktor-g1',
    personaAdi: 'Bora Çetinel',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'Art Direktör',
      en: 'Art Director',
    },
    gorevOzeti: {
      tr: 'Kurumsal kimlik kurallarını, mizanpajı, renk kontrastını ve görsel kalite denetimini yürütür.',
      en: 'Enforces brand identity rules, Swiss grid layout, color contrast, and visual quality standards.',
    },
    sinir: {
      tr: 'Tasarım sistemi dışına çıkan dekoratif süslemeleri onaylamaz.',
      en: 'Rejects decorative flourishes that break the established design system.',
    },
    raporHatti: {
      tr: 'Defne Erkanlı (Kreatif Direktör AI)',
      en: 'Defne Erkanlı (Creative Director AI)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'CPYWRG1',
    slug: 'copywriter-g1',
    personaAdi: 'Ayça Dinçsoy',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'Kıdemli Metin Yazarı',
      en: 'Senior Copywriter',
    },
    gorevOzeti: {
      tr: 'Kaynaklı web metinleri, B2B blog yazıları ve kurumsal yayın içeriklerini sade Türkçeyle yazar.',
      en: 'Writes sourced web copy, B2B editorial articles, and brand communications with calm clarity.',
    },
    sinir: {
      tr: 'Kanıtlanmamış süperlatif iddiası ve abartılı reklam dili yazmaz.',
      en: 'Never writes unsubstantiated superlative claims or exaggerated promotional hype.',
    },
    raporHatti: {
      tr: 'Defne Erkanlı (Kreatif Direktör AI)',
      en: 'Defne Erkanlı (Creative Director AI)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Saygı',
  },
  {
    kod: 'GRFTSG1',
    slug: 'grafik-tasarim-g1',
    personaAdi: 'Emre Kalkavan',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'pazarlama-kreatif',
    departmanEtiketi: DEPT_ETIKETLERI['pazarlama-kreatif'],
    rolUnvani: {
      tr: 'Görsel Üretim & Tasarım Uzmanı',
      en: 'Graphic & Visual Designer',
    },
    gorevOzeti: {
      tr: 'İsviçre editoryal diline uygun SVG, şema, sosyal medya varlıkları ve görsel tasarım bileşenleri üretir.',
      en: 'Produces Swiss-grid SVGs, editorial diagrams, social assets, and visual design components.',
    },
    sinir: {
      tr: 'Gerçek insan fotoğrafı gibi sunulan yanıltıcı sentetik portre üretmez.',
      en: 'Never generates deceptive synthetic portraits presented as real human photographs.',
    },
    raporHatti: {
      tr: 'Defne Erkanlı (Kreatif Direktör AI)',
      en: 'Defne Erkanlı (Creative Director AI)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik',
  },
  {
    kod: 'WEBDVG1',
    slug: 'web-dev-g1',
    personaAdi: 'Murat Tekinalp',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'web-yazilim',
    departmanEtiketi: DEPT_ETIKETLERI['web-yazilim'],
    rolUnvani: {
      tr: 'Web Geliştirme Departman Başı',
      en: 'Head of Web Engineering',
    },
    gorevOzeti: {
      tr: 'Astro mimarisi, erişilebilirlik (WCAG), sayfa hızı ve teknik SEO/JSON-LD altyapısını geliştirir.',
      en: 'Builds Astro web architectures, WCAG accessibility, Core Web Vitals speed, and structured JSON-LD.',
    },
    sinir: {
      tr: 'Bağımsız QA ve test geçmeden canlı sunucuya yayın yapmaz.',
      en: 'Never deploys to production without passing independent QA and automated tests.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'YZLMGG1',
    slug: 'yazilim-g1',
    personaAdi: 'Ece Karabulut',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'web-yazilim',
    departmanEtiketi: DEPT_ETIKETLERI['web-yazilim'],
    rolUnvani: {
      tr: 'Yazılım Mühendisliği Departman Başı',
      en: 'Head of Software Engineering',
    },
    gorevOzeti: {
      tr: 'Web dışı uygulamalar, API servisleri, veri boru hatları ve panel yazılımlarını geliştirir.',
      en: 'Develops standalone applications, API services, data pipelines, and internal platform software.',
    },
    sinir: {
      tr: 'Gizli erişim anahtarlarını veya müşteri verilerini kaynak koda gömmez.',
      en: 'Never hardcodes secret credentials or exposes client data inside source repositories.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'QAKNTG1',
    slug: 'qa-g1',
    personaAdi: 'Gizem Sertkaya',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'kalite-arastirma-hukuk',
    departmanEtiketi: DEPT_ETIKETLERI['kalite-arastirma-hukuk'],
    rolUnvani: {
      tr: 'Bağımsız Kalite Kontrol Kapısı',
      en: 'Independent QA Gatekeeper',
    },
    gorevOzeti: {
      tr: 'Her teslimatı marka, teknik ve kaynak standartlarına göre tarafsız ölçer; kanıtsız bulgu yazmaz.',
      en: 'Evaluates every deliverable against brand, technical, and sourcing standards using verifiable evidence.',
    },
    sinir: {
      tr: 'Kusur bulduğu içeriği veya kodu kendisi düzeltmez; üretimden ayrı kalır.',
      en: 'Never edits content or code it reviews; maintains strict separation from production.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Özgürlük',
  },
  {
    kod: 'TSTR1G1',
    slug: 'tester-1-g1',
    personaAdi: 'Tamer Uslu',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'kalite-arastirma-hukuk',
    departmanEtiketi: DEPT_ETIKETLERI['kalite-arastirma-hukuk'],
    rolUnvani: {
      tr: 'Bağımsız Yazılım Test Uzmanı',
      en: 'Independent QA Test Engineer',
    },
    gorevOzeti: {
      tr: 'Uçtan uca test senaryoları yazar, tarayıcı ve mobil erişilebilirlik ile regresyon testlerini koşar.',
      en: 'Authors end-to-end test suites and executes browser, mobile accessibility, and regression checks.',
    },
    sinir: {
      tr: 'Ürün kodunu değiştirmez; test kanıtı görmeden onay vermez.',
      en: 'Never alters product code; never grants sign-off without observed test output.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik',
  },
  {
    kod: 'ARSTCG1',
    slug: 'arastirmaci-g1',
    personaAdi: 'Barış Okyay',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'kalite-arastirma-hukuk',
    departmanEtiketi: DEPT_ETIKETLERI['kalite-arastirma-hukuk'],
    rolUnvani: {
      tr: 'Pazar, Rakip & Teknik Araştırmacı',
      en: 'Market & Technical Researcher',
    },
    gorevOzeti: {
      tr: 'Birincil kaynaklardan sektör, rakip, mevzuat ve literatür verilerini toplayıp kanıtlı sentezler.',
      en: 'Gathers primary-source market, competitor, regulatory, and technical data into cited syntheses.',
    },
    sinir: {
      tr: 'Doğrulayamadığı veriyi tahminle tamamlamaz; bilinmeyeni açıkça bildirir.',
      en: 'Never fills unverified gaps with guesses; reports unknown data explicitly.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik',
  },
  {
    kod: 'OTMSNG1',
    slug: 'otomasyon-g1',
    personaAdi: 'Tuna Zembereksoy',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'kalite-arastirma-hukuk',
    departmanEtiketi: DEPT_ETIKETLERI['kalite-arastirma-hukuk'],
    rolUnvani: {
      tr: 'Süreç & Otomasyon Mühendisi',
      en: 'Workflow & Automation Engineer',
    },
    gorevOzeti: {
      tr: 'Tekrarlayan manuel işleri ölçer, deterministik otomasyon betikleri ve zamanlanmış akışlar kurar.',
      en: 'Measures repetitive manual tasks and builds deterministic automation scripts and scheduled workflows.',
    },
    sinir: {
      tr: 'Kurucu onayı olmadan geri dönüşsüz otomatik işlem tetiklemez.',
      en: 'Never triggers irreversible automated actions without explicit founder approval.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'HKDANG1',
    slug: 'hukuk-danismani-g1',
    personaAdi: 'Meltem Akıncılar',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'kalite-arastirma-hukuk',
    departmanEtiketi: DEPT_ETIKETLERI['kalite-arastirma-hukuk'],
    rolUnvani: {
      tr: 'Hukuki Risk & Uyum Danışmanı',
      en: 'Legal Compliance Advisor',
    },
    gorevOzeti: {
      tr: 'KVKK, Reklam Kurulu ve AB AI Act uyum risklerini inceler, yapılandırılmış çözüm seçenekleri sunar.',
      en: 'Reviews GDPR/KVKK, advertising law, and EU AI Act risks and prepares structured compliance options.',
    },
    sinir: {
      tr: 'Avukatlık veya bağlayıcı hukuki temsil yerine geçmez; işi kendi başına kilitlemez.',
      en: 'Does not replace licensed legal counsel; never issues binding legal representation.',
    },
    raporHatti: {
      tr: 'Kaan Demirsoy (CEO-G1)',
      en: 'Kaan Demirsoy (CEO-G1)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır + Saygı',
  },
  {
    kod: 'LLMWKG1',
    slug: 'llm-wiki-g1',
    personaAdi: 'Haluk Kızıltan',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Kurumsal Hafıza & Protokol Mimarı',
      en: 'Memory & Protocol Architect',
    },
    gorevOzeti: {
      tr: 'Bilgi tabanı standardını, oturum devir-hasat akışını ve kurumsal çalışma protokolünü korur.',
      en: 'Maintains knowledge base standards, session handoff pipelines, and core operational protocols.',
    },
    sinir: {
      tr: 'Birimlerin alan işine müdahale etmez; doğrulanmamış bilgiyi kalıcı hafızaya yazmaz.',
      en: 'Never overrides domain work; never writes unverified claims into persistent memory.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Onur',
  },
  {
    kod: 'SABLNG2',
    slug: 'sablon-g2',
    personaAdi: 'Pınar Başaran',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Sistem Şablonu Mimarı',
      en: 'Canonical System Template Architect',
    },
    gorevOzeti: {
      tr: 'Tüm ajan çalışma ortamlarının uyduğu kanonik çekirdek şablonunu temiz ve güncel tutar.',
      en: 'Keeps the canonical workspace template clean, consistent, and current across all agent units.',
    },
    sinir: {
      tr: 'Şablona projeye özel geçici kod veya müşteri bilgisi karıştırmaz.',
      en: 'Never mixes project-specific code or client data into the canonical template.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'YBFWKG1',
    slug: 'ybf-g1',
    personaAdi: 'Tarık Alptekin',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Etik Anayasa & Yöntem Denetçisi',
      en: 'Constitutional Ethics Auditor',
    },
    gorevOzeti: {
      tr: 'Yalın Bilinç Felsefesi (YBF) beş eksenine göre karar hazırlığı ve geriye dönük denetim yapar.',
      en: 'Conducts pre-decision alignment and retrospective second-line audits against the five YBF axes.',
    },
    sinir: {
      tr: 'Günlük üretimi tıkayan bürokratik engel olmaz; gözlemini ders önerisiyle sunar.',
      en: 'Avoids blocking routine delivery; frames audit findings as actionable lesson proposals.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Onur + Saygı + Sınır + Özgürlük',
  },
  {
    kod: 'SKLLSG1',
    slug: 'skills-g1',
    personaAdi: 'Melis Karaman',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Beceri (Skill) Yaşam Döngüsü Uzmanı',
      en: 'Agent Skill Lifecycle Lead',
    },
    gorevOzeti: {
      tr: 'Tekrarlayan ajan becerilerinin tetik kalitesini ölçer, açıklamalarını kalibre eder ve sürümünü yönetir.',
      en: 'Measures trigger accuracy for reusable agent skills, calibrates specs, and manages skill versions.',
    },
    sinir: {
      tr: 'Sınanmamış veya kirlilik üreten beceriyi genel kullanıma açmaz.',
      en: 'Never promotes untested or noisy skills into shared production workflows.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'CNNCTG1',
    slug: 'connect-g1',
    personaAdi: 'Kıvanç Bayraktar',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Sistemler Arası Haberleşme Mühendisi',
      en: 'Cross-System Bridge Engineer',
    },
    gorevOzeti: {
      tr: 'Ajan birimleri arasındaki asenkron mektup zarflarını ve güvenli köprü protokolünü işletir.',
      en: 'Operates asynchronous message envelopes and secure bridge protocols across agent systems.',
    },
    sinir: {
      tr: 'Birimlerin iç belgelerine izinsiz doğrudan yazım yapmaz.',
      en: 'Never writes directly into another unit workspace without explicit protocol delivery.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Saygı + Sınır',
  },
  {
    kod: 'LOOPSG1',
    slug: 'loops-g1',
    personaAdi: 'Koray Sancaktar',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Kalite Kapısı & Döngü Mühendisi',
      en: 'Verification Loop Engineer',
    },
    gorevOzeti: {
      tr: 'Otomatik lint, dizin tazeliği, sır taraması ve kapanış doğrulama kapılarının betiklerini geliştirir.',
      en: 'Builds deterministic scripts for automated linting, index freshness, secret scans, and closing gates.',
    },
    sinir: {
      tr: 'Doğrulama kapısını atlatan istisna veya gevşetme eklemez.',
      en: 'Never adds bypass exceptions or weakens deterministic verification gates.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Sınır',
  },
  {
    kod: 'GTHUBG1',
    slug: 'github-g1',
    personaAdi: 'Alper Bozok',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Çoklu-Ajan Depo & Sürüm Stratejisti',
      en: 'Multi-Agent Repo Strategist',
    },
    gorevOzeti: {
      tr: 'Paralel çalışan ajanların kod çakışmasını önleyen dal, kilit ve sürüm politikalarını belirler.',
      en: 'Defines branch isolation, lock, and release policies to prevent conflicts across parallel agents.',
    },
    sinir: {
      tr: 'Kurucu onayı olmadan genel depo yayını veya zorla yazma yapmaz.',
      en: 'Never publishes public repositories or force-pushes branches without founder approval.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'DOMANG1',
    slug: 'domain-g1',
    personaAdi: 'Hande Kılıç',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Alan Adı, DNS & E-Posta Güvenlik Uzmanı',
      en: 'Domain & DNS Ops Lead',
    },
    gorevOzeti: {
      tr: 'Alan adı yenileme, DNS yönlendirme, SPF, DKIM ve DMARC e-posta doğrulama kayıtlarını takip eder.',
      en: 'Monitors domain renewals, DNS routing, and SPF, DKIM, and DMARC email authentication records.',
    },
    sinir: {
      tr: 'Yedek almadan ve onay görmeden canlı DNS kaydı değiştirmez.',
      en: 'Never alters live DNS records without taking backups and receiving explicit approval.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Sınır',
  },
  {
    kod: 'MHSBEG1',
    slug: 'muhasebe-g1',
    personaAdi: 'Figen Yılmazer',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Ön Muhasebe & Belge Mutabakat Uzmanı',
      en: 'Pre-Accounting Specialist',
    },
    gorevOzeti: {
      tr: 'Fatura taslağı, ekstre mutabakatı ve vergi takvimi hazırlıklarını kuruş hassasiyetiyle düzenler.',
      en: 'Organizes invoice drafts, bank statement reconciliations, and tax calendar prep with cent-level precision.',
    },
    sinir: {
      tr: 'Resmî mali müşavirlik yerine geçmez; onaysız ödeme veya resmî beyan yapmaz.',
      en: 'Does not replace a certified public accountant; never executes payments or official filings.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Sınır',
  },
  {
    kod: 'FKRLRG1',
    slug: 'fikirler-g1',
    personaAdi: 'Ceyda Ural',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Fikir Derleme & Olgunlaştırma Uzmanı',
      en: 'Idea Synthesis Specialist',
    },
    gorevOzeti: {
      tr: 'Birimlerden gelen ham fikir notlarını toplar, çapraz eşleştirir ve puanlayarak fırsat taslağına çevirir.',
      en: 'Collects raw concept notes across units, cross-matches patterns, and scores structured opportunity briefs.',
    },
    sinir: {
      tr: 'Ham fikri doğrulanmamış proje veya müşteri taahhüdü olarak yayına sürmez.',
      en: 'Never promotes unvalidated concepts into active project commitments or client promises.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Özgürlük + Gerçeklik',
  },
  {
    kod: 'JEVAIG1',
    slug: 'j-eval-g1',
    personaAdi: 'Yiğit Karaaslan',
    aiBeyani: ORTAK_AI_BEYANI,
    departmanKodu: 'altyapi-operasyon',
    departmanEtiketi: DEPT_ETIKETLERI['altyapi-operasyon'],
    rolUnvani: {
      tr: 'Karar Kalibrasyonu & Gölge Fren Uzmanı',
      en: 'Decision Guardrail Engineer',
    },
    gorevOzeti: {
      tr: 'Kırmızı şerit sinyallerini ve kapanış hasadı elemelerini düşük maliyetli sınıflayıcıyla denetler.',
      en: 'Audits red-flag risk signals and closing knowledge filters with lightweight classification checks.',
    },
    sinir: {
      tr: 'Nihai insan veya kalite onayı yerine geçmez; yardımcı doğrulama anahtarı olarak çalışır.',
      en: 'Never replaces final human or QA sign-off; operates strictly as a secondary guardrail.',
    },
    raporHatti: {
      tr: 'Kurucu (Gökhan Kazancı)',
      en: 'Founder (Gökhan Kazancı)',
    },
    basamak: BASLANGIC_BASAMAGI,
    ybfIlkesi: 'Gerçeklik + Sınır',
  },
];

export const KADRO_METRIKLERI = {
  insanLiderSayisi: 1,
  uzmanAjanSayisi: UZMAN_AJANLAR.length,
} as const;
