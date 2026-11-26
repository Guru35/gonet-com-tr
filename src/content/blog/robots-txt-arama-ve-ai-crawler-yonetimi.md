---
title: "Robots.txt Artık İki Kapı Yönetiyor: Arama ve AI Crawleri"
description: "Robots.txt dosyası artık yalnızca Googlebot'u değil, GPTBot, ClaudeBot ve Perplexity gibi LLM crawlerlarını da yönetiyor. Hangi botu engellemek içeriğinizi AI motorlarından siliyor, hangisini serbest bırakmak crawl bütçesini tüketiyor? Search Engine Journal'ın kapsamlı rehberi, 2025 sonrası için kritik bir ayrımı gün yüzüne çıkardı."
published: 2026-12-01
updated: 2026-11-19
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 6
draft: true
ozetMaddeleri:
  - "Robots.txt artık yalnızca Googlebot'u değil GPTBot, ClaudeBot ve PerplexityBot gibi AI tarayıcılarını da ayrı kurallarla yönetir."
  - "Arama indeksleme botu ile model eğitim botunu ayırmamak, sitenizin yapay zekâ yanıtlarında görünürlüğünü tamamen kapatabilir."
  - "Robots.txt erişim iznini belirlerken llms.txt dosyası AI motorlarına hangi sayfaların öncelikli okunacağını gösterir."
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
sss:
  - soru: "GPTBot'u robots.txt ile engellemek ne anlama gelir?"
    cevap: "GPTBot'u `Disallow` ile engellerseniz OpenAI'ın web tarama süreçleri sitenizden içerik çekemez. Bu, içeriğinizin gelecekteki ChatGPT model güncellemelerinde eğitim verisi olarak yer almayacağı anlamına gelir. Mevcut modellerde zaten olan içerikler etkilenmez; ancak uzun vadede markanızın LLM bilgi tabanındaki temsili zayıflar."
  - soru: "Robots.txt ile llms.txt arasındaki fark nedir?"
    cevap: "Robots.txt, belirtilen bot için erişim teknik olarak kısıtlar veya açar — bot uyumlu olduğu sürece bağlayıcıdır. llms.txt ise teknik bir engel değil, editoryal bir rehberdir: LLM'lere sitenizin hangi bölümlerini öncelikle okumaları gerektiğini söyler. İkisi birbirini tamamlar; biri erişim kontrolü, diğeri içerik yönlendirmesi yapar."
  - soru: "Crawl bütçesi küçük siteler için de önemli mi?"
    cevap: "Binlerce sayfanın altında kalan siteler için crawl bütçesi genellikle kritik değildir. Ancak AI crawlerları farklı davranır — sık güncellenmeyen küçük bir site, GPTBot tarafından gereksiz sıklıkta ziyaret edilebilir. Bu durumda crawl frekansını sınırlamak (Crawl-delay direktifi veya Disallow ile düşük değerli bölümleri kapatmak) sunucu yükünü azaltır."
---
## Olay: Robots.txt Rehberi Neden Şimdi Güncellendi?

Search Engine Journal, teknik SEO'nun en temel dosyası olan robots.txt için kapsamlı bir güncelleme yayımladı. Güncellemenin zamanlaması rastlantı değil: 2024-2025 döneminde GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot ve Google'ın Gemini crawlerları web'i taramaya başladıkça, site yöneticileri tek bir robots.txt dosyasıyla birbirinden çok farklı amaçlara sahip crawler türlerini aynı anda yönetmek zorunda kaldı.

Sonuç: Yanlış yapılandırılmış bir robots.txt, sitenizi hem arama sonuçlarından hem de AI motor yanıtlarından aynı anda dışarıda bırakabiliyor. Ya da tam tersi — gereksiz URL'leri açık bırakarak değerli crawl bütçesini boşa harcatabiliyor.

---

## Mekanizma: Robots.txt AI Çağında Nasıl Çalışıyor?

### Temel Direktifler ve Öncelik Sırası

Robots.txt'in çalışma mantığı değişmedi; ancak uygulanacak `User-agent` (hangi bot için kural yazıldığını belirten direktif) listesi önemli ölçüde genişledi. Dosya, sitenizdeki hangi URL yollarının taranabileceğini veya taranamayacağını belirtir. `Allow` ve `Disallow` direktifleri çakıştığında, daha spesifik kural önce gelir.

### Üç Farklı Crawler Türü, Üç Farklı Amaç

Burada kritik ayrım şu: Geleneksel arama crawlerları (Googlebot, Bingbot) içeriği indeksleyerek SERP'lerde (arama sonuç sayfası) göstermek için tarar. AI eğitim botları (GPTBot, ClaudeBot) ise içeriği LLM'lerin (büyük dil modeli) eğitim verisine katmak amacıyla çeker. Üçüncü kategori ise kullanıcının bir AI arama motorunda arama yaptığında gerçek zamanlı bilgi almak için tetiklenen RAG (Retrieval-Augmented Generation — üretimde gerçek zamanlı bilgi getirme) crawlerlarıdır; Perplexity ve Bing'in AI modu bu kategoride değerlendirilebilir.

Bu üç türü aynı `Disallow` kuralıyla engellemek, çok farklı sonuçlar doğurur:

- GPTBot'u engellerseniz içeriğiniz ChatGPT'nin gelecekteki modellerine girmiyor.
- Bingbot'u engellerseniz Bing SERP'ten ve Microsoft Copilot'tan dışarıda kalıyorsunuz.
- PerplexityBot'u engellerseniz Perplexity AI'ın doğrudan yanıtlarında görünmüyorsunuz.

### Crawl Bütçesi ve AI Erişimi Dengesi

Büyük e-ticaret siteleri ve kurumsal siteler için crawl bütçesi (bir arama motorunun belirli sürede tarayabileceği sayfa sayısı) hâlâ kritik bir faktör. Ancak şimdi bu denkleme bir de AI erişim yüzeyi (citation surface — LLM'lerin içeriğinize kaç farklı noktadan atıfta bulunabileceği) eklendi. Gereksiz URL'leri (filtre sayfaları, oturum parametreleri, faceted navigation) tüm botlara açık bırakmak hem crawl bütçesini tüketir hem de AI motorlarının kalitesiz içerikleri modellerine çekmesine neden olur.

---

## Türk Pazarı İçin Ne Anlama Geliyor?

Türkiye'deki e-ticaret siteleri ve KOBİ'lerin büyük çoğunluğunun robots.txt dosyası ya 2018-2020 döneminde oluşturulmuş ve hiç güncellenmemiş ya da şablondan kopyalanmış durumda. Bu profil, özellikle iki risk barındırıyor:

**Risk 1 — Toplu AI Engeli:** Birçok Türk site, güvenlik kaygısıyla tüm bilinmeyen botları engellemek için `User-agent: * / Disallow: /` kalıbını kullanıyor. Bu yapılandırma, GPTBot ve ClaudeBot'u da kapsamına alıyor; dolayısıyla içerik hiçbir LLM'in eğitim verisine giremiyor.

**Risk 2 — Dil Avantajının Kaybı:** Türkçe web içeriği, İngilizce içeriğe kıyasla LLM eğitim veri setlerinde zaten daha az temsil ediliyor. Türkçe içerik üreten bir sitenin AI crawlerlarını engellemesi, bu boşluğu daha da büyütüyor ve rakip bir sitenin AI yanıtlarında entity authority (varlık otoritesi — bir markanın LLM bilgi tabanındaki güvenilirlik ağırlığı) kazanmasını kolaylaştırıyor.

AEO (Answer Engine Optimization — yanıt motoru optimizasyonu) stratejisinin temel adımlarından biri, sitenizin AI motorlarına açık olup olmadığını doğrulamaktır. [Gonet'in AEO/GEO hizmet sayfasında](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) bu denetimin kapsamını inceleyebilirsiniz.

---

## Eylem Maddeleri: Yarın Yapılabilecekler

- **[ ] Mevcut robots.txt'i denetleyin:** `siteniz.com/robots.txt` adresini açın. `User-agent: *` altındaki `Disallow` kurallarının GPTBot ve ClaudeBot'u yanlışlıkla engelleyip engellemediğini kontrol edin.
- **[ ] Crawler'ları amaca göre ayırın:** Arama botları (Googlebot, Bingbot), AI eğitim botları (GPTBot, ClaudeBot) ve RAG botları (PerplexityBot) için ayrı `User-agent` grupları oluşturun. Her grup için bilinçli bir `Allow`/`Disallow` kararı alın.
- **[ ] Düşük değerli URL'leri filtreleyin:** Filtre sayfaları, oturum parametreleri ve yinelenen içerik yollarını `Disallow` ile tüm botlardan kapatın — bu hem crawl bütçesini hem de AI veri kalitesini iyileştirir.
- **[ ] llms.txt dosyasını tamamlayıcı olarak ekleyin:** `llms.txt` (LLM'ler için site rehberi), robots.txt'in AI motorlarına yönelik tamamlayıcısıdır. Sitenizin hangi bölümlerinin LLM'ler için öncelikli olduğunu açıklar. Robots.txt teknik erişim kontrolü sağlarken llms.txt editoryal yönlendirme yapar.
- **[ ] Google Search Console ile doğrulayın:** Robots.txt değişikliklerinin ardından Search Console'daki "robots.txt tester" aracını kullanarak kritik sayfaların engellenip engellenmediğini teyit edin.
- **[ ] Değişiklikleri belgeleyin:** Robots.txt versiyon tarihi ve gerekçesini dahili bir dokümanda tutun. AI crawler kuralları henüz standart olmadığından, 6 ayda bir gözden geçirme takvimi belirleyin.

Klasik SEO altyapısını da gözden geçirmek istiyorsanız [teknik SEO hizmet sayfamıza](https://gonet.com.tr/yetenekler/seo-klasik-arama) bakabilirsiniz; crawl yönetimi denetimi bu kapsamda ele alınıyor.

---

## Sık Sorulan Sorular

**GPTBot'u robots.txt ile engellemek ne anlama gelir?**
GPTBot'u `Disallow` ile engellerseniz OpenAI'ın web tarama süreçleri sitenizden içerik çekemez. Bu, içeriğinizin gelecekteki ChatGPT model güncellemelerinde eğitim verisi olarak yer almayacağı anlamına gelir. Mevcut modellerde zaten olan içerikler etkilenmez; ancak uzun vadede markanızın LLM bilgi tabanındaki temsili zayıflar.

**Robots.txt ile llms.txt arasındaki fark nedir?**
Robots.txt, belirtilen bot için erişim teknik olarak kısıtlar veya açar — bot uyumlu olduğu sürece bağlayıcıdır. llms.txt ise teknik bir engel değil, editoryal bir rehberdir: LLM'lere sitenizin hangi bölümlerini öncelikle okumaları gerektiğini söyler. İkisi birbirini tamamlar; biri erişim kontrolü, diğeri içerik yönlendirmesi yapar.

**Crawl bütçesi küçük siteler için de önemli mi?**
Binlerce sayfanın altında kalan siteler için crawl bütçesi genellikle kritik değildir. Ancak AI crawlerları farklı davranır — sık güncellenmeyen küçük bir site, GPTBot tarafından gereksiz sıklıkta ziyaret edilebilir. Bu durumda crawl frekansını sınırlamak (Crawl-delay direktifi veya Disallow ile düşük değerli bölümleri kapatmak) sunucu yükünü azaltır.

---

Robots.txt artık tek katmanlı bir engel değil, farklı amaçlara sahip crawler türleri için özelleştirilmiş bir trafik yönetim sistemi. Bu ayrımı doğru yapılandırmak için sitenizin mevcut durumunu netleştirmek istiyorsanız [Gonet ile iletişime geçebilirsiniz](https://gonet.com.tr/iletisim).

---

*İncelenen kaynak: [searchenginejournal.com](https://www.searchenginejournal.com/technical-seo/robots-txt-guide-best-practices-for-search-ai-crawlers/)*
