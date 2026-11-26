---
title: "ChatGPT Hangi Sayfayı Alıntılıyor? API ile Tahmin Etmek Düşündüğünüzden Zor"
description: "Singapur ve Xi'an Jiaotong Üniversitesi araştırmacıları, Google sonuçları ile OpenAI Responses API'nin ChatGPT'nin gerçekte alıntıladığı sayfaların yalnızca yüzde 26'sını yakalayabildiğini gösterdi. Bu bulgu, AEO ve GEO stratejilerinde 'görünür olmak' ile 'alıntılanmak' arasındaki derin uçurumu bir kez daha gündeme taşıyor."
published: 2026-10-26
updated: 2026-10-26
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 6
draft: true
---
## Olay: Araştırmacılar ChatGPT'nin Kaynak Seçimini Taklit Etmeye Çalıştı

Ekim 2026'nın ortasında yayımlanan bir ön baskı çalışma (preprint), LLM SEO dünyasında önemli bir soruyu mercek altına aldı: ChatGPT'nin web uygulaması hangi sayfaları alıntılıyorsa, bu sayfaları başka yollarla —Google arama sonuçları veya OpenAI'nin Responses API'si aracılığıyla— tahmin edebilir miyiz?

Araştırmacılar GPT-5.2 Instant'tan GPT-5.5 Instant'a uzanan dört farklı model sürümünü, Mart-Temmuz 2026 tarihleri arasında test etti. Search Arena'dan derlenen 80 gerçek kullanıcı sorusunu her iki vekil sisteme (Google + API) ve doğrudan ChatGPT web uygulamasına yöneltti. Sonuç tartışmaya açık değil: İki vekil sistem birlikte çalışırken ChatGPT'nin alıntıladığı **sayfaların yalnızca yüzde 26,2'sini**, alıntılanan **sitelerin ise yüzde 48,7'sini** yakalayabildi.

Başka bir deyişle: Site düzeyinde görünürlük sayfa düzeyinden yaklaşık iki kat daha kolay taklit ediliyor; ama gerçek alıntı başarısının yarısından fazlası hâlâ karanlıkta kalıyor.

## Mekanizma: ChatGPT Neden Bu Kadar Öngörülmez?

### ChatGPT'nin Kaynak Seçimi Bir Kara Kutudur

Araştırmacılar, ChatGPT web uygulamasının çalışma sırasında aldığı veri akışını —kendi oturumlarının ağ trafiğini kaydederek— izledi. Bu yöntemle ChatGPT'nin hangi aramaları yaptığını, bu aramalardan hangi sayfaların geldiğini ve model tarafından nihai kaynak olarak hangisinin seçildiğini görebildiler.

İşte kritik nokta: ChatGPT bir sayfayı **arama sonuçlarında görmüş olmak** ile **gerçekte o sayfayı kaynak olarak seçmek** arasında bağımsız bir eleme katmanı işletiyor. Bu katmanı ne Google sıralaması ne de API çıktısı tam olarak yansıtıyor. Sistemin bu seçim davranışı birkaç faktörü birden içeriyor olabilir: içerik kalitesi, alıntılanabilir parçaların (citation surface) yoğunluğu, sayfa yapısının anlam katmanlı taranabilirliği (semantic chunking) ve model sürümüne göre değişen ağırlıklar.

### Neden Şimdi Bu Bulgu Önemli?

LLM SEO ve [AEO/GEO stratejileri](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) geliştiren ekipler bugüne kadar şu varsayımla çalışıyordu: "Google'da görünürsem, AI'da da alıntılanırım." Bu çalışma o varsayımı kırıyor. Siteye trafik getiren klasik SEO sinyalleri ile bir LLM'in kaynak olarak seçtiği sinyaller farklı kümelere ait. İki kümenin örtüşme oranı yüzde ellinin altında.

Araştırmacıların önerileri bu gerçekliği kabul etmekle başlıyor: Tam sayfa eşleşmesi yerine site bazında takip yapın, promtları farklı zamanlarda tekrar çalıştırın ve model güncellemelerinin ardından testleri yenileyin.

## Türk Pazarı için Ne Anlama Geliyor?

Türkçe içerik üreticileri ve ajanslar için bu çalışma iki katmanlı bir uyarı niteliği taşıyor.

**Birincisi, ölçüm boşluğu:** Türkiye'deki çoğu marka, Google Search Console ve sıralama takip araçlarıyla SEO başarısını ölçüyor. Ama bu araçlar ChatGPT veya Perplexity alıntılarını göstermiyor. Sahip olduğunuz veri, sahip olmadığınız kanalı ölçmüyor.

**İkincisi, içerik yapısı farkı:** İngilizce web'e kıyasla Türkçe içerik havuzu daha sığ. Bu hem bir risk hem bir fırsat: Az rakip, doğru yapılandırılmış Türkçe içeriğin LLM'ler tarafından kaynak seçilme olasılığını artırıyor. Ancak "doğru yapılandırılmış" kelimesi kritik; blok metin yerine soru-cevap formatı, özet kutular, net iddialar ve atıf yapılabilir istatistikler içeren sayfalar bu yarışta öne çıkıyor.

KOBİ'ler için somut çıkarım: ChatGPT'nin sizi alıntılayıp alıntılamadığını Google sıralamanızdan tahmin edemezsiniz. Bunu doğrudan test etmeniz gerekiyor.

[Klasik SEO altyapınızı](https://gonet.com.tr/yetenekler/seo-klasik-arama) korurken AEO katmanını ayrıca inşa etmenin tam zamanı.

## Eylem Maddeleri

- **Site bazında alıntı haritası çıkarın:** Sektörünüzdeki 10-15 yaygın soruyu ChatGPT'ye sorun, hangi domainlerin tekrar tekrar alıntılandığını not edin. Kendi siteniz bu listede mi?
- **İçerik yapısını "alıntılanabilir" biçime dönüştürün:** Her blog yazısında en az bir net soru-cevap bloğu, bir istatistik veya özet kutu ekleyin. LLM'ler bu kısa, temiz parçaları (semantic chunk) tercih ediyor.
- **Model güncellemelerini takvimleyin:** GPT sürümü her değiştiğinde alıntı davranışı da değişiyor. Promtlarınızı 3 ayda bir yeniden test edin, özellikle büyük model geçişlerinin ardından.
- **Google görünürlüğü ≠ LLM alıntısı varsayımını ekibinizle paylaşın:** Raporlama şablonlarınıza "AI alıntı gözlemi" sütunu ekleyin; bu sütunu henüz otomatik araçlarla dolduramıyorsanız bile manuel gözlem kaydetmeye başlayın.
- **llms.txt (LLM'ler için site rehberi) ve Schema.org (yapılandırılmış veri standardı) güncellemesi yapın:** Sitenizin hangi bölümünün öncelikli okunmasını istediğinizi bot ekosistemi için açıkça işaretleyin.

## Sık Sorulan Sorular

**ChatGPT hangi sayfaları kaynak olarak seçiyor?**
ChatGPT, arama yaptıktan sonra dönen sonuçlar arasından içerik kalitesine, alıntılanabilir bölümlerin yoğunluğuna ve sayfa yapısının anlamsal taranabilirliğine göre kaynak belirliyor. Bu seçim süreci Google sıralama mantığından bağımsız çalışıyor; dolayısıyla Google'da ilk sırada olmak ChatGPT tarafından alıntılanmayı garanti etmiyor. Araştırma, iki vekil sistemin (Google + API) gerçek ChatGPT alıntılarını yüzde 26 oranında yakalayabildiğini gösterdi.

**Google API ile ChatGPT'nin alıntılarını tahmin edebilir miyim?**
Kısmi olarak evet, ama güvenilir bir eşleşme değil. Söz konusu araştırmaya göre OpenAI Responses API ve Google birlikte alıntılanan sitelerin yaklaşık yüzde 49'unu buluyor; ancak tam sayfa eşleşmesi yüzde 26'da kalıyor. Bu nedenle araştırmacılar site bazında takip yapılmasını, promtların periyodik yeniden çalıştırılmasını ve model güncellemelerinin ardından testlerin tekrarlanmasını öneriyor.

**AEO stratejisi geliştirirken bu bulgudan ne öğrenmeliyim?**
Klasik SEO'nun "sırala ve trafik kazan" mantığı LLM alıntıları için yeterli değil. AEO'da hedef, sayfanızın bir LLM tarafından kaynak seçilmesidir; bu da içeriğinizin alıntılanabilir (citation-ready) biçimde yapılandırılmasını, Schema.org işaretlemesini ve doğrudan sorulara net cevap veren bölümler içermesini gerektiriyor. Sıralama takibi kadar alıntı takibi de stratejinik öncelik haline gelmeli.

---

Bu araştırmanın gösterdiği tablo, AI arama görünürlüğünün tek bir değişkene bağlı olmadığını bir kez daha ortaya koyuyor. Sitenizin LLM'ler tarafından nasıl değerlendirildiğini anlamak ve içerik yapınızı buna göre optimize etmek istiyorsanız [Gonet ile iletişime geçebilirsiniz](https://gonet.com.tr/iletisim).

---

*İncelenen kaynak: [searchenginejournal.com](https://www.searchenginejournal.com/openais-api-only-partly-matched-chatgpts-citations-paper-finds/593304/)*
