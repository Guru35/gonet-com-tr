/**
 * Model Kılavuzu — interaktif blog yazısı veri modülü.
 *
 * Sektör seçiciye göre kartlardaki ÖRNEK GÖREV listeleri değişir. Yazının geri
 * kalanı (model açıklamaları, Thinking tavsiyeleri, token ekonomisi) sabittir.
 *
 * AEO notu: tüm sektör varyantları sunucuda HTML'e basılır (hidden bloklar);
 * JS yalnızca görünürlüğü değiştirir. LLM crawler'ı JS çalıştırmaz → tüm
 * varyantlar kaynakta okunabilir.
 *
 * "Diğer" sektörü: kullanıcı kendi sektörünü yazar → engine LLM ile örnek üretir
 * → onaydan sonra `model-kilavuzu-ek-sektorler.json`'a eklenir (Faz 2).
 */

export interface Sector {
  id: string;
  label: string;
  short: string; // chip + blok etiketi için kısa ad
}

/** Genel = varsayılan (her zaman görünür). Ardından İzmir'de en yaygın 10 sektör. */
export const SECTORS: Sector[] = [
  { id: 'genel', label: 'Genel', short: 'Genel' },
  { id: 'insaat', label: 'İnşaat & Gayrimenkul', short: 'İnşaat' },
  { id: 'eticaret', label: 'E-ticaret & Perakende', short: 'E-ticaret' },
  { id: 'saglik', label: 'Sağlık & Klinik', short: 'Sağlık' },
  { id: 'turizm', label: 'Turizm & Otelcilik', short: 'Turizm' },
  { id: 'gida', label: 'Restoran & Kafe', short: 'Restoran' },
  { id: 'uretim', label: 'Üretim & Sanayi', short: 'Üretim' },
  { id: 'otomotiv', label: 'Otomotiv', short: 'Otomotiv' },
  { id: 'egitim', label: 'Eğitim & Kurslar', short: 'Eğitim' },
  { id: 'hukuk', label: 'Hukuk & Danışmanlık', short: 'Hukuk' },
  { id: 'tekstil', label: 'Tekstil & Moda', short: 'Tekstil' },
];

/**
 * Kart bazında örnek görevler. `genel` her kartta zorunlu (varsayılan görünür).
 * Diğer sektör anahtarları opsiyonel override; yoksa o sektörde genel gösterilir.
 *
 * Kart id'leri ModelKilavuzu.astro'daki data-card değerleriyle eşleşir.
 * Yalnızca "İdeal" rozetli 10 kart sektöre uyarlanır; geri kalan kartlar
 * (uyarı/kaçış/Ultracode/token) sektör-nötr kalır.
 */
export type CardExamples = Record<string, string[]>;
export const EXAMPLES: Record<string, CardExamples> = {
  // ─────────────── FABLE ───────────────
  // F3 · Özgün · High — kısa marka sesi kopyası
  'f-high': {
    genel: ['Marka sesini taşıyan uygulama kopyası', 'Kullanıcı karşılama ve onboarding metinleri', 'İnsancıl hata mesajları ve boş durum içerikleri'],
    insaat: ['Proje tanıtım sloganı ve afiş metni', 'Satış ofisi karşılama ve broşür metni', 'Sosyal medya proje duyuru gönderisi'],
    eticaret: ['Ürün açıklaması ve kategori metni', 'Kampanya banner sloganı', 'Sepet ve ödeme adımı mikro kopyaları'],
    saglik: ['Hasta bilgilendirme broşür metni', 'Randevu hatırlatma mesajının tonu', 'Klinik tanıtım sloganı ve karşılama metni'],
    turizm: ['Tesis ve oda tanıtım metni', 'Rezervasyon onay mesajının sıcak tonu', 'Destinasyon sosyal medya gönderisi'],
    gida: ['Menü açıklamaları ve lezzet metni', 'Günün kampanyası duyuru metni', 'Masadaki QR karşılama metni'],
    uretim: ['Ürün katalog tanıtım metni', 'Bayi ve distribütör duyurusu', 'Fuar standı tanıtım sloganı'],
    otomotiv: ['Araç ilan açıklaması', 'Servis kampanyası duyuru metni', 'Galeri tanıtım sloganı'],
    egitim: ['Kurs tanıtım ve kayıt çağrısı metni', 'Veli bilgilendirme mesajının tonu', 'Öğrenci başarısı sosyal medya gönderisi'],
    hukuk: ['Hizmet alanı tanıtım metni', 'Müvekkil bilgilendirme mesajının tonu', 'Web sitesi "hakkımızda" metni'],
    tekstil: ['Koleksiyon tanıtım metni', 'Lookbook ve katalog açıklaması', 'Toptan müşteri duyuru metni'],
  },
  // F4 · Derin Anlatı · Extra — uzun form içerik
  'f-extra': {
    genel: ['Uygulama mağazası açıklamaları (App Store/Play)', 'E-posta serisi ve kampanya metni', 'Uzun özellik duyurusu ve blog yazısı taslağı'],
    insaat: ['Proje detay blog yazısı (konum, mimari, yatırım)', 'Yatırımcıya çok adımlı e-posta serisi', 'Teslim süreci bilgilendirme rehberi'],
    eticaret: ['Ürün rehberi ve karşılaştırma yazısı', 'Sepet terk ve kampanya e-posta serisi', 'SSS, kargo ve iade sayfası metinleri'],
    saglik: ['Tedavi sürecini açıklayan blog yazısı', 'Tedavi sonrası bakım e-posta serisi', 'Sağlık turizmi paket tanıtım metni'],
    turizm: ['Destinasyon ve gezi rehberi blog yazısı', 'Rezervasyon öncesi bilgilendirme e-posta serisi', 'Paket tur detay açıklamaları'],
    gida: ['Konsept ve şefin hikayesi blog yazısı', 'Özel gün ve etkinlik kampanya serisi', 'Franchise tanıtım dokümanı'],
    uretim: ['Ürün teknik tanıtım dokümanı', 'Bayi bülteni e-posta serisi', 'Sektörel çözüm blog yazısı'],
    otomotiv: ['Model inceleme ve karşılaştırma yazısı', 'Periyodik bakım rehberi serisi', 'İkinci el alım rehberi'],
    egitim: ['Program ve müfredat detay açıklaması', 'Kayıt dönemi e-posta serisi', 'Mezun başarı hikayesi blog yazısı'],
    hukuk: ['Hukuki konuyu açıklayan genel bilgi yazısı', 'Düzenli müvekkil bülteni', 'Hizmet süreci adım adım rehberi'],
    tekstil: ['Koleksiyon hikayesi ve trend yazısı', 'Toptan katalog tanıtım serisi', 'Üretim ve sürdürülebilirlik blog yazısı'],
  },
  // F5 · Maksimum · Max — kapsamlı içerik kütüphanesi
  'f-max': {
    genel: ['Kapsamlı içerik kütüphanesi oluşturma', 'Marka ses kılavuzu taslağı + örnekler', 'Birden fazla ton/kitle için içerik varyasyonları'],
    insaat: ['Tüm projeler için tutarlı tanıtım kütüphanesi', 'Kurumsal + satış marka ses kılavuzu', 'Lansman kampanyasının tüm kanal metinleri'],
    eticaret: ['Yüzlerce ürün için açıklama kütüphanesi', 'Sezon kampanyasının tüm kanal metinleri', 'Marka ses ve ton kılavuzu'],
    saglik: ['Tüm tedaviler için hasta bilgilendirme seti', 'Çok dilli sağlık turizmi içerik kütüphanesi', 'Klinik marka ses kılavuzu'],
    turizm: ['Tüm sezon için kampanya içerik kütüphanesi', 'Çok dilli tesis ve paket içerikleri', 'Konaklama marka ses kılavuzu'],
    gida: ['Tüm şubeler için tutarlı menü ve kampanya seti', 'Marka ses kılavuzu + örnek gönderiler', 'Sezonluk kampanyaların tüm metinleri'],
    uretim: ['Tüm ürün hattı için katalog içerik kütüphanesi', 'Kurumsal marka ses ve terminoloji kılavuzu', 'Fuar + bayi + web tüm tanıtım seti'],
    otomotiv: ['Tüm envanter için ilan açıklama kütüphanesi', 'Servis + satış marka ses kılavuzu', 'Kampanya döneminin tüm kanal metinleri'],
    egitim: ['Tüm programlar için tanıtım içerik seti', 'Kurum marka ses ve iletişim kılavuzu', 'Kayıt sezonunun tüm kanal metinleri'],
    hukuk: ['Tüm hizmet alanları için tanıtım seti', 'Kurumsal dil ve iletişim kılavuzu', 'Web + bülten + sosyal tüm metin kütüphanesi'],
    tekstil: ['Tüm koleksiyonlar için katalog içerik seti', 'Marka ses + görsel dil kılavuzu', 'Sezon lansmanının tüm kanal metinleri'],
  },

  // ─────────────── OPUS ───────────────
  // O3 · Derin · High — derin analiz / kritik karar
  'o-high': {
    genel: ['Sistem tasarımı ve mimari karar', 'Performans darboğazı kök nedeni', 'Güvenlik açığı değerlendirmesi'],
    insaat: ['Proje fizibilite ve yatırım getirisi analizi', 'Sözleşme ve hakediş risk incelemesi', 'Maliyet aşımı kök neden analizi'],
    eticaret: ['Fiyatlandırma ve kâr marjı stratejisi', 'Düşük dönüşüm oranı kök neden analizi', 'Stok ve tedarik planı optimizasyonu'],
    saglik: ['Hasta akışı ve kapasite planlaması', 'Fiyatlandırma ve paket yapısı kararı', 'KVKK ve hasta verisi uyum değerlendirmesi'],
    turizm: ['Sezon doluluk ve fiyatlandırma stratejisi', 'Kanal (OTA/direkt) dağılımı analizi', 'Düşük rezervasyon kök neden incelemesi'],
    gida: ['Menü maliyet ve kârlılık analizi', 'Yeni şube konum değerlendirmesi', 'Müşteri kaybı kök neden analizi'],
    uretim: ['Üretim hattı verimlilik ve darboğaz analizi', 'Tedarik zinciri risk değerlendirmesi', 'Yatırım ve kapasite kararı'],
    otomotiv: ['Stok devir hızı ve fiyatlama analizi', 'Servis kârlılığı ve süreç darboğazı', 'Yeni şube/marka bayilik değerlendirmesi'],
    egitim: ['Program portföyü ve doluluk analizi', 'Fiyatlandırma ve burs yapısı kararı', 'Öğrenci kaybı (churn) kök neden analizi'],
    hukuk: ['Karmaşık dava strateji değerlendirmesi', 'Risk ve emsal karar analizi', 'Sözleşme risk haritası çıkarma'],
    tekstil: ['Koleksiyon kârlılık ve fiyatlama analizi', 'Tedarik ve üretim maliyet incelemesi', 'İhracat pazar fırsatı değerlendirmesi'],
  },
  // O4 · Uzun Görev · Extra — uzun, çok adımlı analiz
  'o-extra': {
    genel: ['Çok adımlı otomasyon ve süreç zincirleri', 'Büyük veri kümesi analizi ve kapsamlı öneri', 'Çapraz kaynak araştırma ve karşılaştırma'],
    insaat: ['Çok kalemli ihale ve teklif karşılaştırması', 'Bölge bazlı pazar ve rakip araştırması', 'Tüm proje için kapsamlı risk raporu'],
    eticaret: ['Tüm katalog için rekabet ve fiyat araştırması', 'Pazaryeri performans ve komisyon analizi', 'Yıllık kampanya takvimi ve bütçe planı'],
    saglik: ['Sağlık turizmi pazar ve rakip araştırması', 'Tüm hizmetler için fiyat-değer karşılaştırması', 'Hasta yolculuğu uçtan uca süreç analizi'],
    turizm: ['Bölgesel rakip ve fiyat araştırması', 'Tüm kanallar için gelir yönetimi planı', 'Sezonluk talep tahmini ve kapasite planı'],
    gida: ['Bölge restoran pazar ve rakip araştırması', 'Tüm menü için tedarikçi maliyet karşılaştırması', 'Çok şubeli operasyon verimlilik analizi'],
    uretim: ['Tedarikçi havuzu ve maliyet karşılaştırması', 'Pazar ve ihracat fırsatı araştırması', 'Tüm hat için verimlilik iyileştirme planı'],
    otomotiv: ['Marka/model envanter ve talep araştırması', 'Tüm stok için fiyat-rekabet karşılaştırması', 'Servis süreçleri uçtan uca iyileştirme planı'],
    egitim: ['Sektör ve rakip program araştırması', 'Tüm programlar için talep ve doluluk analizi', 'Yıllık kayıt ve kampanya takvimi planı'],
    hukuk: ['Kapsamlı emsal karar ve mevzuat taraması', 'Çok belgeli dosya inceleme ve özetleme', 'Müvekkil portföyü risk haritası'],
    tekstil: ['Trend, pazar ve rakip koleksiyon araştırması', 'Tüm tedarik zinciri maliyet analizi', 'Sezonluk üretim ve ihracat planı'],
  },
  // O5 · Maksimum · Max — en yüksek riskli stratejik karar
  'o-max': {
    genel: ['Teknoloji yığını seçimi ve stratejik mimari', 'Çelişen gereksinimler arasında yüksek-riskli karar', 'Güvenlik denetimi ve kapsamlı risk değerlendirmesi'],
    insaat: ['Büyük yatırım kararı (arsa/proje girişi)', 'Ortaklık ve finansman yapısı kararı', 'Geri dönülemez sözleşme öncesi tam risk denetimi'],
    eticaret: ['Yeni pazara/pazaryerine açılma kararı', 'Marka konumlandırma ve fiyat stratejisi', 'Büyük envanter yatırımı risk değerlendirmesi'],
    saglik: ['Yeni şube/klinik yatırım kararı', 'Sağlık turizmi pazara giriş stratejisi', 'Büyük cihaz yatırımı fayda-risk denetimi'],
    turizm: ['Tesis yatırımı veya yenileme kararı', 'Marka ve segment konumlandırma stratejisi', 'Sezon öncesi geri dönülemez fiyat taahhüdü'],
    gida: ['Franchise/zincir büyüme kararı', 'Yeni konsept veya marka stratejisi', 'Büyük lokasyon yatırımı risk değerlendirmesi'],
    uretim: ['Kapasite/fabrika yatırım kararı', 'İhracat pazarına giriş stratejisi', 'Büyük makine yatırımı fayda-risk denetimi'],
    otomotiv: ['Yeni bayilik/marka yatırım kararı', 'Stok ve finansman stratejisi', 'Büyük envanter alımı risk değerlendirmesi'],
    egitim: ['Yeni kampüs/şube yatırım kararı', 'Program portföyü ve konumlandırma stratejisi', 'Büyük altyapı yatırımı fayda-risk denetimi'],
    hukuk: ['Yüksek riskli dava strateji kararı', 'Büro büyüme ve uzmanlaşma stratejisi', 'Kritik müvekkil sözleşmesi tam risk denetimi'],
    tekstil: ['Yeni pazar/ihracat yatırım kararı', 'Marka konumlandırma ve segment stratejisi', 'Büyük üretim taahhüdü risk değerlendirmesi'],
  },

  // ─────────────── SONNET ───────────────
  // S1 · Hızlı · Low — günlük küçük işler
  's-low': {
    genel: ['Yapılandırma dosyasını güncelle', 'Küçük bir metni revize et', 'Kısa bir doküman bölümü yaz'],
    insaat: ['Teklif şablonunu güncelle', 'Toplantı notunu maddele', 'İlan metnini hızlıca düzenle'],
    eticaret: ['Ürün başlığını ve etiketini düzelt', 'Kısa kampanya duyurusu yaz', 'Sık sorulan soruya yanıt taslağı'],
    saglik: ['Randevu bilgi mesajını güncelle', 'Hasta SSS yanıtını yaz', 'Broşür metnini hızlıca revize et'],
    turizm: ['Oda/tesis açıklamasını güncelle', 'Rezervasyon yanıt şablonu yaz', 'Kısa kampanya duyurusu hazırla'],
    gida: ['Menü açıklamasını güncelle', 'Günün menüsü gönderisini yaz', 'Rezervasyon yanıt şablonu hazırla'],
    uretim: ['Ürün spesifikasyon metnini güncelle', 'Bayi duyurusunu kısaca yaz', 'Teklif şablonunu düzenle'],
    otomotiv: ['Araç ilan başlığını düzelt', 'Servis randevu mesajı yaz', 'Kampanya duyurusunu güncelle'],
    egitim: ['Ders programı metnini güncelle', 'Veli bilgilendirme mesajı yaz', 'Kayıt SSS yanıtını hazırla'],
    hukuk: ['Bilgi notu şablonunu güncelle', 'Randevu/yanıt mesajı yaz', 'Web sayfası metnini kısaca revize et'],
    tekstil: ['Ürün açıklamasını güncelle', 'Toptan duyuru mesajı yaz', 'Katalog başlığını düzenle'],
  },
  // S2 · Standart · Medium — günlük standart iş atı
  's-medium': {
    genel: ['Yeni bir özellik için kod yaz', 'Teknik doküman hazırla', 'Hata ayıklama ve çözüm üret'],
    insaat: ['Detaylı teklif ve fiyat tablosu hazırla', 'Aylık ilerleme raporu yaz', 'Tedarikçi karşılaştırma tablosu oluştur'],
    eticaret: ['Tam ürün açıklaması + SSS hazırla', 'Haftalık satış raporu özeti çıkar', 'Kampanya planı ve metinleri hazırla'],
    saglik: ['Hasta bilgilendirme dokümanı hazırla', 'Aylık randevu/performans özeti çıkar', 'Tedavi paketi açıklaması yaz'],
    turizm: ['Paket tur programı ve açıklaması hazırla', 'Aylık doluluk raporu özeti çıkar', 'Rezervasyon yanıt akışı hazırla'],
    gida: ['Tam menü ve fiyat dokümanı hazırla', 'Haftalık satış özeti çıkar', 'Etkinlik kampanya planı hazırla'],
    uretim: ['Ürün teknik dokümanı hazırla', 'Aylık üretim/sevkiyat raporu özeti', 'Bayi teklif paketi oluştur'],
    otomotiv: ['Araç ilanı + özellik dokümanı hazırla', 'Aylık satış/servis raporu özeti', 'Kampanya planı ve metinleri hazırla'],
    egitim: ['Program müfredat dokümanı hazırla', 'Dönemlik kayıt raporu özeti çıkar', 'Veli bilgilendirme paketi oluştur'],
    hukuk: ['Dilekçe/sözleşme taslağı hazırla (kontrol şart)', 'Dosya durum özeti çıkar', 'Müvekkil bilgilendirme dokümanı yaz'],
    tekstil: ['Koleksiyon katalog dokümanı hazırla', 'Aylık satış/üretim özeti çıkar', 'Toptan teklif paketi oluştur'],
  },
  // S3 · Derin · High — orta karmaşıklık analiz/planlama
  's-high': {
    genel: ['Orta karmaşıklık analiz ve kök neden tespiti', 'Mimari karar taslağı (uzman onayıyla)', 'Çok dosyalı kapsamlı düzenleme'],
    insaat: ['Proje bütçe sapması analiz taslağı', 'Tedarikçi seçim değerlendirmesi', 'Satış performansı kök neden taslağı'],
    eticaret: ['Dönüşüm hunisi analizi taslağı', 'Kategori kârlılık değerlendirmesi', 'Kampanya etki analizi taslağı'],
    saglik: ['Hasta akışı verimlilik taslağı', 'Hizmet kârlılığı değerlendirmesi', 'Şikâyet/kayıp kök neden taslağı'],
    turizm: ['Doluluk ve fiyat analizi taslağı', 'Kanal performansı değerlendirmesi', 'Misafir memnuniyeti kök neden taslağı'],
    gida: ['Menü kârlılığı analiz taslağı', 'Şube performans karşılaştırması', 'Müşteri yorumu kök neden taslağı'],
    uretim: ['Üretim verimliliği analiz taslağı', 'Tedarikçi performans değerlendirmesi', 'Fire/iade kök neden taslağı'],
    otomotiv: ['Stok devir analizi taslağı', 'Servis süreç değerlendirmesi', 'Satış düşüşü kök neden taslağı'],
    egitim: ['Doluluk ve talep analizi taslağı', 'Program performans değerlendirmesi', 'Öğrenci kaybı kök neden taslağı'],
    hukuk: ['Dosya strateji taslağı (kıdemli onayıyla)', 'Emsal karar değerlendirmesi', 'Risk önceliklendirme taslağı'],
    tekstil: ['Koleksiyon performans analizi taslağı', 'Tedarik maliyeti değerlendirmesi', 'İade/fire kök neden taslağı'],
  },

  // ─────────────── HAIKU ───────────────
  // H1 · Tek Mod — basit mekanik işler
  'h-tek': {
    genel: ['Dosyayı yeniden adlandır, taşı, düzenle', 'Kısa not veya commit mesajı yaz', 'Listeye madde ekle ya da kapat'],
    insaat: ['Toplantı notunu özetle', 'Malzeme/teslimat listesini düzenle', 'Kısa durum mesajı yaz'],
    eticaret: ['Ürün etiketlerini düzenle', 'Sipariş notunu özetle', 'Kısa stok güncelleme notu yaz'],
    saglik: ['Randevu notunu özetle', 'Hasta listesini düzenle', 'Kısa hatırlatma mesajı yaz'],
    turizm: ['Rezervasyon notunu özetle', 'Misafir listesini düzenle', 'Kısa karşılama mesajı yaz'],
    gida: ['Sipariş notunu özetle', 'Stok/malzeme listesini düzenle', 'Kısa duyuru mesajı yaz'],
    uretim: ['Sevkiyat notunu özetle', 'Stok listesini düzenle', 'Kısa durum güncellemesi yaz'],
    otomotiv: ['Servis kaydını özetle', 'Araç stok listesini düzenle', 'Kısa randevu mesajı yaz'],
    egitim: ['Yoklama/not listesini düzenle', 'Toplantı notunu özetle', 'Kısa duyuru mesajı yaz'],
    hukuk: ['Dosya notunu özetle', 'Belge/teslim listesini düzenle', 'Kısa hatırlatma mesajı yaz'],
    tekstil: ['Sipariş notunu özetle', 'Ürün/stok listesini düzenle', 'Kısa toptan duyuru mesajı yaz'],
  },
};
