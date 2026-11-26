---
title: "Robots.txt ile Google ve AI Botlarını Doğru Yönetin"
description: "Robots.txt dosyası artık yalnızca Googlebot'u değil, GPTBot, ClaudeBot ve PerplexityBot gibi yapay zekâ botlarını da yönetiyor. Yanlış tek bir satır markanızı AI yanıtlarından tamamen silebilir."
h1: "Robots.txt ile Google ve AI Botlarını Doğru Yönetin"
ogImage: "/blog/aralik-2026/robots-txt-arama-ve-ai-crawler-yonetimi-dark.png"
ogImageLight: "/blog/aralik-2026/robots-txt-arama-ve-ai-crawler-yonetimi-light.png"
keywords:
  - "robots.txt"
  - "AI crawler yönetimi"
  - "GPTBot"
  - "ClaudeBot"
  - "PerplexityBot"
  - "AEO teknik SEO"
published: 2026-12-01
updated: 2026-11-26
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
tags: ["robots-txt", "ai-crawler", "teknik-seo", "aeo", "llms-txt"]
readingMinutes: 6
draft: false
mizanpaj: "D"
ozetMaddeleri:
  - "Robots.txt artık yalnızca Googlebot'u değil GPTBot, ClaudeBot ve PerplexityBot gibi yapay zekâ tarayıcılarını da ayrı kurallarla yönetir."
  - "Arama indeksleme botu ile model eğitim botunu ayırmamak, sitenizin yapay zekâ yanıtlarında görünürlüğünü tamamen kapatabilir."
  - "Robots.txt erişim iznini belirlerken llms.txt dosyası AI motorlarına hangi sayfaların öncelikli okunacağını gösterir."
infografikler:
  - tip: "kontrol-listesi"
    baslik: "Robots.txt Yayın Öncesi 5 Kritik İzin ve Yasak Kontrolü"
    maddeler:
      - baslik: "User-agent: * altındaki genel Disallow kurallarını denetleyin"
        aciklama: "Güvenlik gerekçesiyle konulan genel yasaklar GPTBot ve ClaudeBot'u yanlışlıkla engelleyebilir."
      - baslik: "Arama botları ile eğitim botlarını ayrı gruplara ayırın"
        aciklama: "OAI-SearchBot ve PerplexityBot canlı yanıt üretirken GPTBot model eğitimi için veri toplar."
      - baslik: "Filtre, sepet ve oturum URL'lerini kapatın"
        aciklama: "Düşük değerli parametre sayfalarını engellemek hem tarama bütçesini hem AI veri kalitesini korur."
      - baslik: "Kök dizinde llms.txt rehberini ekleyin"
        aciklama: "Robots.txt teknik erişimi yönetirken llms.txt öncelikli içerik haritasını sunar."
      - baslik: "Değişikliği canlı ortamda test edin"
        aciklama: "Gonet Ücretsiz SEO Analizi veya Search Console ile kritik sayfaların HTTP 200 döndüğünü doğrulayın."
karsilastirmaTablosu:
  baslik: "Arama ve AI Tarayıcı Yönetimi Karşılaştırması"
  sutunlar:
    - "Kural / Araç"
    - "Temel İşlevi"
    - "Yanlış Yapılandırma Riski"
  satirlar:
    - ["robots.txt (Allow/Disallow)", "Bot bazlı teknik tarama izni verir", "Tüm AI yanıtlarından tamamen silinme"]
    - ["llms.txt", "LLM'lere öncelikli içerik haritası sunar", "Önemli hizmet sayfalarının gözden kaçması"]
    - ["Crawl-delay / Yol Kısıtı", "Sunucu yükünü ve tarama sıklığını dengeler", "Yüksek bot trafiğinde kaynak tüketimi"]
ozelCta:
  eyebrow: "30 SANİYEDE ÜCRETSİZ TEŞHİS"
  h2a: "Botlarınız sitenizi"
  h2b: "doğru okuyor mu?"
  btn: "Ücretsiz SEO Analizi Başlat →"
  href: "/araclar/seo-analiz"
sss:
  - soru: "GPTBot'u robots.txt ile engellemek ne anlama gelir?"
    cevap: "GPTBot'u Disallow ile engellerseniz OpenAI'ın eğitim tarayıcıları sitenizden içerik çekemez. Bu durum uzun vadede markanızın gelecekteki dil modellerinin bilgi tabanındaki temsilini zayıflatır. Canlı arama yanıtları için ise OAI-SearchBot erişiminin ayrıca açık tutulması gerekir."
  - soru: "Robots.txt ile llms.txt arasındaki fark nedir?"
    cevap: "Robots.txt belirtilen bot için erişimi teknik olarak açar veya kısıtlar ve uyumlu botlar için bağlayıcıdır. llms.txt ise teknik bir engel değil editoryal bir rehberdir; yapay zekâ motorlarına sitenizin en değerli sayfalarını öncelikle okumaları için yol gösterir."
  - soru: "Küçük veya orta ölçekli siteler için bot yönetimi neden önemlidir?"
    cevap: "Sayfa sayısı az olsa bile yapay zekâ tarayıcıları gereksiz filtre ve parametre sayfalarını sıkça ziyaret ederek sunucu yükünü artırabilir. Doğru robots.txt kurgusu botların yalnızca temiz hizmet, ürün ve blog sayfalarını okumasını sağlayarak alıntı kalitesini yükseltir."
---

**`robots.txt` dosyası artık yalnızca Google'ın arama sonuçlarını değil, ChatGPT, Claude ve Perplexity gibi yapay zekâ motorlarının markanızı önerip önermeyeceğini belirleyen ana kapıdır.** Yanlış yazılmış tek bir `Disallow` satırı, sitenizi arama motorlarında açık tutarken yapay zekâ yanıtlarından tamamen silebilir.

Türkiye'deki kurumsal sitelerin ve e-ticaret platformlarının büyük bölümü hâlâ 2018–2020 yıllarından kalma kopya `robots.txt` şablonlarını kullanıyor. Arama motoru optimizasyonu (SEO) ile yapay zekâ motoru optimizasyonunun (AEO) birleştiği bu dönemde, geleneksel botlar ile yeni nesil AI tarayıcılarını aynı kural sepetine koymak ciddi görünürlük kaybına yol açıyor.

## Üç Farklı Bot Türü, Üç Farklı İş Sonucu

Modern web trafiğinde karşınıza üç ayrı tarayıcı ailesi çıkar ve her birinin amacı farklıdır. Hepsini tek bir engelleme kuralıyla durdurmak, sitenizin dijital vitrinini kilitlemek anlamına gelir:

1. **Klasik Arama Botları (`Googlebot`, `Bingbot`):** Sayfalarınızı indeksleyerek Google ve Bing sonuç sayfalarında sıralar. `Bingbot` engellendiğinde yalnızca Bing aramalarından değil, doğrudan Microsoft Copilot yanıtlarından da dışarıda kalırsınız.
2. **AI Eğitim Botları (`GPTBot`, `ClaudeBot`, `Google-Extended`):** Büyük dil modellerinin gelecekteki sürümlerini eğitmek için web içeriğini toplar. Bu botları engellemek, markanızın uzun vadeli bilgi tabanındaki varlığını zayıflatır.
3. **Canlı RAG / Arama Botları (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`):** Kullanıcı bir soru sorduğunda web'den gerçek zamanlı kanıt çekip yanıtın altına kaynak linki ekler. Satış ve trafik getiren doğrudan alıntılar bu botlar üzerinden oluşur.

## Kötü ve İyi `robots.txt` Yapılandırması

Aşağıdaki iki örnek, sahada en sık karşılaştığımız kritik farkı açıkça gösteriyor. Birinci örnekteki "her şeyi kilitle" yaklaşımı yapay zekâ görünürlüğünü sıfırlarken, ikinci örnek botları amacına göre yönlendirir:

```txt
# KÖTÜ: Tüm bilinmeyen ve AI botlarını körlemesine engeller
User-agent: *
Disallow: /
```

```txt
# İYİ: Arama ve AI botlarına temiz sayfaları açar, gereksiz yolları kapatır
User-agent: Googlebot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: *
Disallow: /arama?
Disallow: /sepet/
Disallow: /filtre/
Sitemap: https://siteniz.com/sitemap-index.xml
```

Gereksiz filtre sayfalarını, oturum parametrelerini ve arama URL'lerini tüm botlara kapatmak iki katlı fayda sağlar. Hem sunucunuzun tarama bütçesini korursunuz hem de yapay zekâ motorlarının düşük kaliteli sayfalar yerine doğrudan hizmet ve vaka sayfalarınızı okumasını garantilersiniz.

## Gonet Sahadan Kanıt: 21/21 Bot Erişimi ve Haftalık 708 Ziyaret

Biz bu disiplini anlatmadan önce kendi sitemizde ölçerek doğruluyoruz. Kasım 2026'da `gonet.com.tr` üzerinde gerçekleştirdiğimiz Otterly.ai teknik tarama denetiminde, **21/21 yapay zekâ botunun tamamının** (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` dahil) hem `robots.txt` hem de sunucu yanıtı (`HTTP 200 OK`) açısından sorunsuz erişime sahip olduğunu doğruladık.

Aynı hafta içinde sitemizi **176 farklı sayfada toplam 708 yapay zekâ botu** ziyaret etti. Bu ziyaretlerin 146'sı `ClaudeBot`, 90'ı `OAI-SearchBot` ve 33'ü `PerplexityBot` tarafından gerçekleşti. Sonuç olarak teknik tarama puanımız **100/100** seviyesine ulaştı ve yapay zekâ yanıtlarında göründüğümüz sorgularda ortalama **1,36. sırada** konumlandık.

Türkçe web içeriği, İngilizce kaynaklara kıyasla dil modellerinin veri setlerinde zaten daha sınırlı yer alıyor. Türk markalarının `robots.txt` üzerinden yapay zekâ botlarını engellemesi, bu boşluğu daha da büyüterek rakiplerin ücretsiz biçimde otorite kazanmasına zemin hazırlıyor.

## `robots.txt` ve `llms.txt` Birlikte Nasıl Çalışır?

`robots.txt` dosyasını binanın güvenlik kapısı gibi düşünebilirsiniz; kimin içeri girip kimin girmeyeceğine teknik olarak karar verir. `llms.txt` ise kapıdan içeri giren yapay zekâ botuna uzatılan rehber broşürdür.

Kök dizininize ekleyeceğiniz `/llms.txt` dosyası, yapay zekâ motorlarına sitenizin en güncel hizmet sayfalarını, vaka çalışmalarını ve SSS kaynaklarını özet olarak sunar. Bu sayede botlar karmaşık menüler arasında kaybolmadan doğrudan karar verici bilgileri çeker. Teknik altyapınızı bu iki dosyayla uyumlu hale getirmek için [AEO/GEO denetim sürecimizi](/aeo-geo-denetimi) ve [klasik teknik SEO hizmetlerimizi](/yetenekler/seo-klasik-arama) inceleyebilirsiniz.

## E-Ticaret ve Kurumsal Sitelerde Sık Yapılan 3 `robots.txt` Hatası

Uygulamada yalnızca `Allow` veya `Disallow` yazmak her zaman yeterli olmaz. Özellikle büyük ürün kataloglarına veya çok dilli yapıya sahip sitelerde şu üç hata yapay zekâ taramalarını sessizce bozar:

1. **CSS ve JavaScript Dosyalarını Engellemek:** Eski SEO rehberlerinden kalan `/assets/` veya `/_astro/` engellemeleri, Googlebot ve AI tarayıcılarının sayfa düzenini doğrulamasını zorlaştırır. Yalnızca veri ve oturum uç noktalarını kapatın.
2. **Site Haritasını (`Sitemap`) Belirtmemek:** `robots.txt` dosyasının en altına tam URL ile `Sitemap:` satırı eklememek, yeni yayınlanan blog ve vaka sayfalarının keşfini günlerce geciktirir.
3. **WAF / Güvenlik Duvarı Çatışması:** `robots.txt` içinde izin verseniz bile Cloudflare veya sunucu güvenlik duvarınız `OAI-SearchBot` ve `PerplexityBot` IP aralıklarını otomatik engelliyor olabilir. Sunucu erişim kayıtlarında `403 Forbidden` yanıtlarını mutlaka kontrol edin.

## Hemen Uygulayabileceğiniz Kontrol Adımları

1. **Canlı Dosyanızı Okuyun:** Tarayıcınızdan `siteniz.com/robots.txt` adresini açın ve `User-agent: *` altında tüm botları kesen bir `Disallow: /` kuralı olup olmadığını kontrol edin.
2. **Arama ve Eğitim Botlarını Ayırın:** Canlı yanıt üreten `OAI-SearchBot` ve `PerplexityBot` için açık izin tanımlayın; eğitim botları konusundaki şirket politikanızı bilinçli belirleyin.
3. **Parametre ve Sepet Yollarını Kapatın:** Filtre kombinasyonları ve kullanıcı oturum URL'lerini kapatarak tarayıcıların yalnızca temiz, indekslenebilir sayfalara odaklanmasını sağlayın.
4. **Sitenizi Anında Test Edin:** Yapılandırmanızın Google ve yapay zekâ botları tarafından hatasız okunduğundan emin olmak için [Ücretsiz SEO Analizi aracımızla](/araclar/seo-analiz) 30 saniyede teknik tarama başlatabilirsiniz.

---

*Bu rehber Gonet mühendislik ekibi tarafından `gonet.com.tr` canlı bot logları (708 haftalık AI bot ziyareti) ve Search Engine Journal teknik tarama standartları referans alınarak hazırlanmıştır. Gonet, 2000'den beri arama motoru optimizasyonu yapan İzmir'in ilk AI ajansıdır.*
