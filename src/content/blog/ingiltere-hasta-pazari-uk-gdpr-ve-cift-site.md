---
title: "İngiltere Hasta Pazarında UK GDPR ve Çift Site Stratejisi"
description: "Birleşik Krallık hasta pazarında güven kazanmak için Türkçe sitenin çevirisi yetmez. .co.uk alan adı, UK GDPR açık rıza akışı ve ortak Directus CRM ile çift site mimarisini nasıl kurduğumuzu Nano Dental vakasıyla anlatıyoruz."
published: 2026-12-09
updated: 2026-11-26
author:
  name: "Gonet"
  role: "Web Mimarisi & Sağlık Ekibi"
category: "Sağlık Turizmi"
tags:
  - "ingiltere sağlık turizmi"
  - "uk gdpr"
  - "çift site mimarisi"
  - "directus crm"
  - "nano dental"
readingMinutes: 6
draft: false
ogImage: "/blog/aralik-2026/ingiltere-hasta-pazari-uk-gdpr-ve-cift-site-dark.png"
ogImageLight: "/blog/aralik-2026/ingiltere-hasta-pazari-uk-gdpr-ve-cift-site-light.png"
mizanpaj: "A"
ozetMaddeleri:
  - "İngiltere hasta pazarında yerel .co.uk alan adı ve UK GDPR uyumu, dönüşüm oranını belirleyen birincil güven sinyalidir."
  - "Nano Dental projesinde .com.tr ve .co.uk siteleri ayrı ön yüzlerle çalışırken tek Directus CRM ve otomatik Coolify derleme hattına bağlandı."
  - "Şube bazlı rol izolasyonu ve sıkı CSP/HSTS başlıkları, hasta verisinin yetkisiz erişime veya üçüncü taraf eklentilere sızmasını önler."
karsilastirmaTablosu:
  baslik: "Tek Site Çeviri vs. Çift Domain + Ortak CRM Mimarisi"
  sutunlar:
    - "Kriter"
    - "Tek Site Otomatik Çeviri"
    - "Çift Domain (.co.uk + .com.tr) + Ortak CRM"
  satirlar:
    - ["Yerel Güven Algısı", "Düşük (yabancı uzantı ve çeviri tonu)", "Yüksek (yerel .co.uk uzantısı ve kültür)"]
    - ["Yasal Uyum", "Yalnız KVKK varsayımı, çerez riski", "UK GDPR açık rıza ve şeffaf çerez yönetimi"]
    - ["Operasyon Yükü", "Tek panel ama karışık dil yönetimi", "Tek Directus panelinden çift siteye otomatik yayın"]
    - ["Hasta Verisi Güvenliği", "Ortak form e-postası, şube sızıntısı riski", "Şube rolüyle izole edilmiş crm_leads akışı"]
infografikler:
  - tip: "surec"
    baslik: "Çift Site + UK GDPR + Directus CRM Akışı"
    adimlar:
      - no: "01"
        baslik: "Yerel Ön Yüz (.co.uk)"
        aciklama: "İngiltere hastası hızlı WebP arayüzde UK GDPR açık rızasını onaylar ve fiyat hesaplayıcıyı doldurur."
      - no: "02"
        baslik: "Güvenli İletim (CSP/HSTS)"
        aciklama: "Form verisi harici üçüncü taraf form servislerine uğramadan doğrudan şifreli API'ye gider."
      - no: "03"
        baslik: "Şube İzoleli Directus CRM"
        aciklama: "Talep crm_leads tablosuna düşer; Didim ve Bornova şubeleri yalnız kendi hastasını görür."
      - no: "04"
        baslik: "Otomatik Yayın (Directus Flow)"
        aciklama: "Paneldeki fiyat veya duyuru güncellemesi her iki siteyi Coolify üzerinden otomatik yeniden derler."
ozelCta:
  eyebrow: "İNGİLTERE PAZARINA GÜVENLİ AÇILIM"
  h2a: "UK GDPR uyumlu çift site"
  h2b: "mimarisiyle hasta güveni kazanın."
  btn: "Sağlık Turizmi Altyapısını Gör →"
  href: "/saglik-turizmi-performans-pazarlama"
sss:
  - soru: "İngiltere pazarı için neden ayrı bir .co.uk alan adı öneriliyor?"
    cevap: "Birleşik Krallık'taki hastalar sağlık hizmeti ararken kendi ülkelerinin alan adı uzantısına ve doğal İngilizce anlatıma çok daha yüksek güven duyar. Ayrıca Google ve yapay zekâ motorları .co.uk uzantılı ve İngiltere odaklı yapılandırılmış bir siteyi yerel arama niyetiyle daha güçlü eşleştirir. Bu sayede hem reklam kalite puanı yükselir hem de organik görünürlük hızlanır."
  - soru: "UK GDPR uyumu Türkiye'deki klinik siteleri için gerçekten zorunlu mu?"
    cevap: "İngiltere'de ikamet eden hastalara doğrudan pazarlama yapıyor, fiyat teklifi veriyor ve kişisel sağlık/iletişim verisi topluyorsanız UK GDPR kurallarına tabisiniz. Açık rıza kutucukları olmadan çalışan formlar veya önceden işaretli onaylar hukuki risk doğurur. Aynı zamanda İngiliz hastalar gizlilik politikası ve çerez şeffaflığını bir kalite göstergesi olarak okur."
  - soru: "İki ayrı web sitesini yönetmek klinik ekibine ek iş yükü getirmez mi?"
    cevap: "Doğru mimari kurulduğunda kesinlikle ek yük getirmez. Nano Dental projesinde kurduğumuz Directus CMS altyapısında ekip tek bir yönetim panelinden içerik, fiyat veya duyuru günceller. Directus Flow tetikleyicisi değişikliği anında algılar ve hem Türkiye hem de Birleşik Krallık sitesini Coolify üzerinden otomatik olarak yeniden derleyip yayına alır."
  - soru: "Harici form eklentileri yerine neden kendi CRM akışımızı kurmalıyız?"
    cevap: "Üçüncü taraf form araçları hasta verisini farklı sunucularda tutar, sayfa hızını yavaşlatır ve güvenlik başlıklarında açıklar yaratabilir. Kendi sunucunuzda çalışan Directus tabanlı crm_leads akışı ise veriyi tamamen sizin kontrolünüzde tutar. Şube bazlı yetkilendirme sayesinde her klinik ekibi yalnızca kendi hastasının verisine ve iletişim geçmişine erişebilir."
---

Birleşik Krallık hasta pazarında yüksek dönüşüm elde etmek için Türkiye sitenizi İngilizceye çevirmek yetmez. İngiliz hastaya güven veren yerel bir `.co.uk` deneyimi, sıkı UK GDPR açık rıza akışı ve tüm talepleri tek merkezde toplayan şube izoleli bir CRM mimarisi gerekir.

Aydın Didim ve İzmir Bornova'da iki şubeyle hizmet veren [Nano Dental kliniğiyle](/case-studies/nano-dental-saglik-turizmi-ve-aeo-mimarisi) çalışırken tam olarak bu sorunla karşılaştık. Kliniğin hem Türkiye'deki hastalara hem de Birleşik Krallık'tan gelen sağlık turizmi taleplerine yanıt vermesi gerekiyordu. Eski dağınık formlar ve birbirinden kopuk içerik süreçleri yerine, iki ayrı ön yüzü tek bir mühendislik çekirdeğinde birleştirdik.

## Tek Sitede Çeviri Neden Yeterli Olmuyor?

Türkiye'deki kliniklerin çoğu yurt dışı pazarına açılırken `.com.tr` adresinin yanına `/en/` klasörü ekler. Ancak İngiltere'den implant veya gülüş tasarımı arayan bir hasta için bu yapı üç noktada sürtünme yaratır.

Birincisi, çeviri eklentileri tıbbi terimleri ve hasta psikolojisini İngiliz kültürüne uygun aktaramaz. İkincisi, yerel `.co.uk` uzantısı Google Birleşik Krallık aramalarında ve yapay zekâ önerilerinde doğrudan yerel otorite sinyali taşır. Üçüncüsü, Türkiye KVKK metinleri ile Birleşik Krallık'ın UK GDPR beklentileri birbirinden farklıdır; tek bir genel çerez bandı İngiliz hastada güven kaybına yol açar.

Bu nedenle [sağlık turizmi performans pazarlama](/saglik-turizmi-performans-pazarlama) stratejimizde pazar bazlı ayrışmayı temel ilke olarak benimsiyoruz. Ön yüzler hedef ülkeye göre özelleşirken, arka plandaki veri ve operasyon omurgası tek elde toplanır.

## Nano Dental Mimarisini Nasıl Kurduk?

Projenin kalbine açık kaynaklı ve yüksek hızlı bir içerik/veri merkezi olarak Directus yerleştirdik. `nanodental.com.tr` ve `nanodental.co.uk` sitelerini ise Astro statik site üreticisiyle (SSG) inşa ettik.

### Tek Panelden Çift Siteye Otomatik Yayın

Klinik ekibi bir duyuru bandını, tedavi açıklamasını veya fiyat bilgisini değiştirmek istediğinde iki ayrı panele girmek zorunda kalmıyor. `panel.nanodental.com.tr` üzerinden yapılan tek bir güncelleme, Directus Flow otomasyonunu tetikliyor. Sistem, Coolify dağıtım hattı üzerinden hem Türkiye hem de Birleşik Krallık sitesini saniyeler içinde yeniden derleyip güncelliyor.

### Şube İzoleli `crm_leads` Akışı

Sağlık turizminde en büyük operasyonel zafiyetlerden biri, gelen hasta formlarının ortak bir e-posta kutusuna düşmesidir. Bu durum hem yanıt süresini uzatır hem de şubeler arası veri karmaşasına yol açar.

Yeni mimaride her iki sitedeki iletişim formları ve tedavi fiyat hesaplayıcıları doğrudan `crm_leads` veritabanına yazıyor. Rol ve politika bazlı yetkilendirme sayesinde Didim şubesi yalnızca kendi taleplerini, Bornova şubesi ise yalnızca kendi hastalarını görebiliyor. Eski harici form bağımlılıklarının tamamı sistemden temizlendi.

### UK GDPR ve Sıfır Tarayıcı Uyarısı

Birleşik Krallık pazarına hizmet veren bir sağlık sitesi, veri güvenliğini yalnızca gizlilik politikası metninde değil, tarayıcı katmanında da kanıtlamalıdır. `nanodental.co.uk` üzerinde şu güvenlik sertleştirmelerini uyguladık:

- **Sıkı CSP ve HSTS:** Üçüncü taraf izinsiz script yüklemelerini engelleyen `Content-Security-Policy` ile tarayıcı konsolunda **0 CSP/Console uyarısı** sağlandı.
- **Açık Rıza Akışı:** Formlarda hasta verisinin hangi amaçla işleneceğine dair net ve önceden işaretlenmemiş onay mekanizması kuruldu.
- **Bot Koruması:** Sahte form gönderimlerini engelleyen görünmez doğrulama katmanı ile CRM kirlenmesi önlendi.

## AEO ve Yapay Zekâ Katmanı Nasıl Bağlandı?

İngiltere'deki bir hasta ChatGPT veya Perplexity'ye "Didim'de İngilizce konuşan diş kliniği" sorduğunda, yapay zekâ modelinin sitenizi kolayca okuyabilmesi gerekir. Her iki sitede sayfa bazlı `MedicalOrganization`, `Dentist` ve `FAQPage` JSON-LD şemalarını devreye aldık.

Ayrıca site geneli dış footer linkleri yerine Gonet'in **2 katmanlı dijital altyapı künyesi** standardını uyguladık. Hem `/llms.txt` dosyası hem de [Digital Infrastructure Colophon](https://nanodental.co.uk/digital-infrastructure/) sayfası ile yapay zekâ botlarına (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`) şeffaf ve doğrulanabilir bir teknik kimlik sunduk.

## İngiltere Hastasının Karar Yolculuğu Nasıl İşler?

Londra, Manchester veya Birmingham'dan Türkiye'ye tedavi için gelmeyi planlayan bir hasta, kararını tek bir reklam tıklamasıyla vermez. Ortalama 2 ila 4 haftalık araştırma sürecinde şu dört soruya net yanıt arar:

1. **Klinik Gerçek mi?** İngiltere uzantılı hızlı bir site, gerçek şube adresleri ve hekimlerin kayıt numaraları ilk güven eşiğini oluşturur.
2. **İletişim Nasıl Sağlanacak?** İngilizce konuşan hasta koordinatörüyle WhatsApp veya güvenli form üzerinden hızlı ve baskısız iletişim bekler.
3. **Verim Güvende mi?** Sağlık geçmişini ve fotoğrafını paylaşırken UK GDPR standartlarına uygun bir onay ve gizlilik taahhüdü görmek ister.
4. **Seyahat ve Tedavi Planı Net mi?** Havalimanı transferi, konaklama ve klinik randevu takviminin baştan şeffaf paylaşılması kararsızlığı ortadan kaldırır.

Çift site mimarisi tam olarak bu dört soruyu yerel dilde ve sıfır teknik pürüzle yanıtladığı için reklam başına maliyetleri aşağı çeker.

## İngiltere Pazarına Açılacak Klinikler İçin Kontrol Listesi

Eğer Birleşik Krallık veya Avrupa pazarına yönelik reklam bütçesi ayırıyorsanız, ilk tıklamayı satın almadan önce şu dört soruyu yanıtlayın:

1. **Alan Adı ve Dil:** Reklamlarınız `.co.uk` gibi yerel güven veren ve doğal İngilizceyle yazılmış bir sayfaya mı gidiyor?
2. **Hız Yükü:** Açılış sayfanızdaki görseller WebP formatına indirilip 15 MB altı hafif bir pakete çekildi mi?
3. **Yasal Uyum:** Formlarınızda UK GDPR açık rıza metni ve çerez tercih yönetimi eksiksiz çalışıyor mu?
4. **Veri İzolasyonu:** Gelen hasta talepleri üçüncü taraf eklentiler yerine doğrudan kendi güvenli CRM tablonuza düşüyor mu?

Bu dört adımı eksiksiz kuran klinikler, reklam maliyetleri artsa bile daha yüksek randevu dönüşümü, daha kısa satış döngüsü ve sürdürülebilir bir hasta akışı elde eder. Mevcut sitenizin hız, UK GDPR ve AEO hazırlık durumunu ölçmek için [ücretsiz denetim](/aeo-geo-denetimi) talep edebilir veya [sağlık turizmi çözümlerimizi](/saglik-turizmi-performans-pazarlama) inceleyebilirsiniz.
