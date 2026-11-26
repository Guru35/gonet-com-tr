---
title: "llms.txt ve Schema.org: Yapay Zekânın Okuduğu 5 Kritik Sinyal"
description: "Yapay zekâ botları sitenizi tararken karmaşık JavaScript arayüzlerini değil; ham HTML hiyerarşisini, /llms.txt haritasını, JSON-LD @graph bağlarını, FAQPage bloklarını ve canonical kimliği okur. 5 teknik sinyalin derin analizi."
published: 2026-12-14
updated: 2026-11-26
author:
  name: "Gonet"
  role: "Teknik AEO & Mühendislik Ekibi"
category: "AEO/GEO"
tags:
  - "llms.txt"
  - "schema.org"
  - "json-ld"
  - "teknik aeo"
  - "canonical"
readingMinutes: 6
draft: false
ogImage: "/blog/aralik-2026/llms-txt-ve-schema-org-yapay-zekanin-5-sinyali-dark.png"
ogImageLight: "/blog/aralik-2026/llms-txt-ve-schema-org-yapay-zekanin-5-sinyali-light.png"
mizanpaj: "D"
ozetMaddeleri:
  - "Yapay zekâ tarayıcıları (OAI-SearchBot, ClaudeBot, PerplexityBot) çoğu zaman ağır JavaScript çalıştırmaz; sitenizin okunabilirliği ham HTML ve yapısal sinyallere bağlıdır."
  - "HTML-first içerik, /llms.txt indeks dosyası, JSON-LD @graph varlık ağı, tek kaynaklı FAQPage şeması ve tutarlı Canonical etiketi AI alıntılanmasının 5 temel direğidir."
  - "Bu 5 sinyali Nano Dental ve gonet.com.tr üzerinde canlı olarak uygulayarak sıfır JavaScript bağımlılığıyla tam bot erişimi ve varlık doğrulaması sağladık."
karsilastirmaTablosu:
  baslik: "Yapay Zekânın Okuduğu 5 Kritik Teknik Sinyalin Etkisi"
  sutunlar:
    - "Teknik Sinyal"
    - "Çözdüğü Sorun"
    - "Eksikliğinde Ne Olur?"
  satirlar:
    - ["1. Ham HTML-First Yapı", "JS çalıştırmayan botların içeriği tam okuması", "Boş sayfa veya eksik paragraf indekslenmesi"]
    - ["2. /llms.txt Haritası", "Sitenin en önemli sayfalarını ve özetini sunma", "Botların gereksiz sayfalarda tarama bütçesi yakması"]
    - ["3. JSON-LD @graph", "Kurum, yazar, hizmet ve adres bağlarını kurma", "Markanın anonim veya alakasız varlıklarla karışması"]
    - ["4. FAQPage Şeması", "Soru-cevap çiftlerini doğrudan alıntıya hazırlama", "Yapay zekânın cevabı rakip siteden çekmesi"]
    - ["5. Tutarlı Canonical", "Tekrar URL'leri tek kanonik adreste toplama", "Atıf gücünün bölünmesi ve eski URL'lerin önerilmesi"]
infografikler:
  - tip: "surec"
    baslik: "AI Botunun Sitenizi Okuma ve Doğrulama Zinciri"
    adimlar:
      - no: "01"
        baslik: "Ham HTML İsteği"
        aciklama: "Bot HTTP 200 yanıtıyla ilk HTML belgesini çeker; başlık ve ilk paragrafta doğrudan yanıtı arar."
      - no: "02"
        baslik: "/llms.txt Keşfi"
        aciklama: "Kök dizindeki /llms.txt dosyasından sitenin ana hizmetlerini ve kanonik doküman haritasını okur."
      - no: "03"
        baslik: "JSON-LD @graph"
        aciklama: "Organization, Service ve Person düğümlerini @id üzerinden birbirine bağlayarak kimliği doğrular."
      - no: "04"
        baslik: "FAQPage ve Canonical"
        aciklama: "Soruların net yanıtlarını çıkarır ve alıntı linkini canonical URL üzerine sabitler."
ozelCta:
  eyebrow: "TEKNİK AEO/GEO DENETİMİ"
  h2a: "Siteniz bu 5 sinyali"
  h2b: "hatasız veriyor mu?"
  btn: "AEO/GEO Denetimini İncele →"
  href: "/aeo-geo-denetimi"
sss:
  - soru: "llms.txt dosyası robots.txt veya sitemap.xml'in yerini mi alıyor?"
    cevap: "Hayır, llms.txt bu iki standart dosyanın yerini almaz, onları tamamlar. robots.txt tarama izinlerini, sitemap.xml ise tüm URL listesini verir. llms.txt ise yapay zekâ modellerine ve ajanlarına 'bu sitenin en önemli sayfaları, sunduğu hizmetler ve güvenilir bilgi kaynakları şunlardır' diyen sade Markdown formatında bir yönetici özetidir."
  - soru: "JSON-LD içinde neden tek tek bloklar yerine @graph kullanmalıyız?"
    cevap: "Sayfaya birbirinden kopuk birden fazla JSON-LD bloğu koyduğunuzda arama motorları bunları ayrı adacıklar olarak görür. @graph yapısı ise Organization, WebSite, Service, Article ve Person varlıklarını @id referanslarıyla tek bir bilgi grafiğine bağlar. Böylece yapay zekâ içeriği kimin yazdığını ve hangi kurumun sunduğunu kesin olarak anlar."
  - soru: "Tek sayfa uygulamalar (SPA / ağır React) AEO için neden dezavantajlıdır?"
    cevap: "Googlebot JavaScript'i gecikmeli de olsa işleyebilir; ancak OAI-SearchBot, ClaudeBot ve PerplexityBot gibi birçok yapay zekâ tarayıcısı hız ve maliyet nedeniyle JavaScript yürütmez. İçeriğiniz yalnızca istemci tarafında (CSR) yükleniyorsa bu botlar sayfanızı boş bir kabuk olarak görür ve sizi hiçbir yapay zekâ yanıtında kaynak olarak göstermez."
  - soru: "Canonical etiketi yapay zekâ alıntılarını nasıl etkiler?"
    cevap: "Aynı içeriğe parametrelerle veya farklı uzantılarla (www / non-www, sondaki eğik çizgi farkı) erişilebiliyorsa AI indeksleri otoriteyi böler. Net bir rel='canonical' etiketi, 301 yönlendirmeleri ve tutarlı iç linkleme, yapay zekâ modelinin her zaman temiz ve doğru tek URL'yi kullanıcıya kaynak linki olarak sunmasını güvence altına alır."
---

Yapay zekâ arama motorları ve otonom ajanlar bir web sitesini görsel tasarımına göre değil, kaynak kodunda sunduğu beş teknik sinyale göre okur ve alıntılar: **ham HTML hiyerarşisi**, **`/llms.txt` haritası**, **birbirine bağlı `JSON-LD @graph` şeması**, **temiz `FAQPage` verisi** ve **tutarlı `Canonical` etiketi**. Bu beş katmandan biri eksik olduğunda siteniz insanlara kusursuz görünse bile yapay zekâ yanıtlarında görünmez kalır.

Gonet olarak kendi sitemizde (`gonet.com.tr`) ve [Nano Dental](/case-studies/nano-dental-saglik-turizmi-ve-aeo-mimarisi) gibi canlı müşteri projelerinde bu beş sinyali standart bir mühendislik paketi olarak uyguluyoruz. Kasım 2026'da Otterly.ai üzerinden yaptığımız ölçümler, teknik sinyal temizliği olmayan sitelerin Copilot ve Claude gibi motorlarda sıfıra yakın ses payında kaldığını açıkça gösterdi.

## Sinyal 1: Ham HTML-First (Sıfır JS Bağımlılığı)

Modern web geliştirme dünyasında birçok ajans, basit kurumsal siteleri bile ağır istemci tarafı JavaScript (CSR) ile kuruyor. Ancak `OAI-SearchBot`, `ClaudeBot` ve `PerplexityBot` gibi tarayıcıların büyük bölümü ilk taramada JavaScript çalıştırmaz.

İçeriğiniz sunucu tarafında veya statik (SSG) olarak ham HTML içinde gelmiyorsa, botun gördüğü şey boş bir `<div>` etiketidir. Bu yüzden ana başlık (`<h1>`), özet yanıt, vaka metinleri ve tablolar sayfanın ilk HTML yanıtında eksiksiz yer almalıdır.

## Sinyal 2: `/llms.txt` ile Yönetici Özeti

`sitemap.xml` dosyası arama motoruna yüzlerce URL'nin ham listesini verir; ancak hangisinin sitenin ana hizmeti, hangisinin eski bir arşiv olduğunu söylemez. Kök dizine yerleştirilen `/llms.txt` dosyası ise sade Markdown formatında şu üç soruyu yanıtlar:

- Bu kurum kimdir ve hangi alanlarda uzmandır?
- En güncel hizmet, vaka ve araç sayfaları hangi URL'lerdedir?
- Kurumun resmi iletişim ve doğrulama kanalları nelerdir?

Bu yapı, yapay zekâ ajanının tarama bütçesini boşa harcamadan doğrudan en yüksek otoriteli sayfalarınıza ulaşmasını sağlar.

## Sinyal 3: `JSON-LD @graph` ile Varlık Ağı

Schema.org işaretlemesi artık yalnızca "Google'da yıldızlı sonuç çıksın" diye yapılan bir eklenti değildir; yapay zekâ modellerine sunulan kimlik kartıdır. Ancak birbirinden kopuk şema blokları yerine tek bir `@graph` dizisi kullanmak gerekir.

Örneğin bir hizmet veya vaka sayfasında `Organization` (`#organization`), `WebSite` (`#website`), `WebPage` ve `Service` (veya sağlıkta `MedicalOrganization`) düğümleri `@id` üzerinden birbirine bağlanmalıdır. Böylece model, okuduğu içeriğin kime ait olduğunu sıfır belirsizlikle çözer.

## Sinyal 4: Tek Kaynaklı `FAQPage` ve Atomik Yanıtlar

Kullanıcıların yapay zekâya sorduğu soruların çoğu "Nasıl?", "Neden?", "Ne kadar?" kalıbındadır. Sayfalarınızda sık sorulan soruları hem insan okuyucunun görebileceği temiz bir akordeon yapısında hem de eşleşen `FAQPage` JSON-LD şemasında sunmak alıntı şansını katlar.

Buradaki kritik kural **atomik yanıttır**: her cevabın ilk iki cümlesi soruyu doğrudan yanıtlamalı, 45–80 kelime bandında net ve kendi başına anlaşılır olmalıdır. Uzun ve dolambaçlı paragraflar yerine doğrudan bilgi veren bloklar AI özetlerine kesilmeden alınır.

## Sinyal 5: Tutarlı `Canonical` ve HTTP Hijyeni

Yapay zekâ motorları bir kaynağı önerirken kullanıcıya tıklanabilir bir URL verir. Eğer sitenizde aynı sayfaya hem `http` hem `https`, hem `www` hem `non-www` veya parametrelerle erişilebiliyorsa indeks gücü bölünür.

Her sayfada mutlak (absolute) `rel="canonical"` etiketi tanımlanmalı, gereksiz yönlendirme zincirleri temizlenmeli ve tüm aktif sayfalar `HTTP 200` döndürmelidir. Ayrıca `robots.txt` dosyasında yapay zekâ arama botlarının yanlışlıkla engellenmediği düzenli olarak doğrulanmalıdır.

## Sahada Sık Karşılaşılan 3 Teknik Hata

Birçok kurum yukarıdaki beş sinyali kurduğunu düşünse de teknik denetimlerde tekrarlayan üç hatayla karşılaşıyoruz:

- **Çift Kaynaklı ve Çelişkili SSS:** Sayfa gövdesinde farklı sorular, `FAQPage` JSON-LD içinde farklı sorular bulunması botların güvenini kırar. Frontmatter veya tek bir veri kaynağından hem görsel akordeonu hem şemayı üretmek bu çelişkiyi tamamen ortadan kaldırır.
- **Kırık `@id` Referansları:** `Article` veya `Service` şemasının `publisher` alanında `https://site.com/#organization` yazıp sayfada o `#organization` düğümünü tanımlamamak grafiği koparır. Her referans mutlaka aynı belgede tanımlı bir düğüme işaret etmelidir.
- **Güncelliğini Yitirmiş `/llms.txt`:** Aylar önce yazılıp yeni hizmet sayfaları eklendikçe güncellenmeyen bir `/llms.txt` dosyası, yapay zekâ ajanlarını eski sayfalara hapseder. Bu dosya canlı içerik mimarisinin bir parçası olarak düzenli güncellenmelidir.

## 5 Dakikalık Teknik Kontrol Akışı

Sitenizin bu beş sinyale ne kadar hazır olduğunu görmek için geliştirici ekibinizle şu sırayı izleyin:

1. **Ham HTML Kontrolü:** Tarayıcıda "Sayfa Kaynağını Görüntüle" diyerek ana metnin, başlıkların ve tabloların JavaScript çalışmadan HTML içinde görünüp görünmediğini doğrulayın.
2. **`/llms.txt` Doğrulaması:** `siteadresiniz.com/llms.txt` yoluna giderek dosyanın `HTTP 200` ile açıldığını, hizmet sayfalarınızı ve vaka bağlantılarınızı eksiksiz listelediğini kontrol edin.
3. **`@graph` ve `@id` Testi:** Sayfa kaynağındaki `application/ld+json` bloklarında `Organization`, `WebSite` ve `Service` düğümlerinin `@id` üzerinden hatasız bağlandığını doğrulayın.
4. **Tek Kaynaklı `FAQPage` Uyumu:** `FAQPage` sorularının ve yanıtlarının sayfadaki görünür metinle birebir örtüştüğünden, çelişki taşımadığından emin olun.
5. **Canonical ve Bot İzni:** `rel="canonical"` etiketinin tam ve tekil URL'yi işaret ettiğini, `robots.txt` içinde AI arama botlarının engellenmediğini doğrulayın.

Bu beş teknik sinyal bir araya geldiğinde siteniz yalnızca klasik arama motoru sıralamalarında değil, Copilot, Claude, Perplexity ve ChatGPT yanıtlarında da kalıcı olarak alıntılanabilir ve doğrulanabilir bir yapıya kavuşur. Özellikle JavaScript bağımlılığını sıfırlayıp ham HTML içinde net yanıtlar sunmak ve `/llms.txt` ile `JSON-LD @graph` bağlarını kurmak, markanızın yapay zekâ gözündeki teknik güvenilirliğini kısa sürede ölçülebilir biçimde yukarı taşır.

Bu beş teknik sinyali sitenizde eksiksiz kurgulamak, mevcut teknik açıkları görmek ve marka varlığınızı yapay zekâ motorlarına karşı doğrulamak için [AEO/GEO denetimi](/aeo-geo-denetimi) sayfamızı inceleyebilir veya doğrudan [ücretsiz SEO & AI analiz aracımızı](/araclar/seo-analiz) çalıştırarak sitenizin ilk teknik taramasını hemen başlatabilirsiniz.
