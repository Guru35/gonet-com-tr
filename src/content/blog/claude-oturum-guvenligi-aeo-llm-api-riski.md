---
title: "Claude Oturumu Çalınırsa AEO Altyapınız Ne Kadar Güvende?"
description: "Anthropic, infostealer zararlı yazılımların Claude oturumlarını çalarak hesapları ele geçirdiğini duyurdu. Ajanslar ve pazarlama ekipleri için asıl mesele hesap güvenliğinin ötesinde: AEO/GEO iş akışlarında kullanılan LLM API erişimlerini kim denetliyor, credential yönetimi nasıl kurgulanmış? Bu olay, LLM tabanlı içerik ve optimizasyon süreçlerindeki kör noktaları gün yüzüne çıkarıyor."
published: 2026-09-07
updated: 2026-09-07
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 6
draft: true
---
## Olay: Claude Oturumları İnfostealer ile Ele Geçirildi

Anthropik, kullanıcılarına gönderdiği bir e-posta bildirimi ile hesap güvenliğine yönelik ciddi bir tehdit konusunda uyarıda bulundu. Olayın merkezinde **infostealer** (bilgi çalan zararlı yazılım) adı verilen bir kötücül yazılım türü var. Bu yazılımlar, kullanıcı farkında bile olmadan bilgisayarda oturum açık olan uygulamalara ait kimlik bilgilerini, tarayıcı çerezlerini ve aktif oturum token'larını arka planda toplayıp saldırganlara iletiyor.

Bir Reddit kullanıcısının paylaştığı Anthropic e-postasına göre, ele geçirilen oturumlar Claude API token'larına erişmek ve kullanım kotasını tüketmek amacıyla kullanıldı. Anthropic'in müdahalesi; etkilenen hesapları otomatik olarak sistemden çıkarmak ve kayıtlı ödeme yöntemlerini kaldırmak şeklinde oldu. Bu proaktif adım takdire değer olmakla birlikte, olay patlak vermeden önce kaç API isteğinin yetkisiz biçimde gönderildiği bilinmiyor.

Ransomware'den (fidye yazılımı) farklı olarak infostealer'lar sessiz çalışır: Dosyaları kilitlemez, ekranda mesaj göstermez. Amacı zamandır — ele geçirilen bilgileri mümkün olduğunca uzun süre kullanabilmek ya da başka saldırganlara satmak.

---

## Mekanizma: API Token Hırsızlığı Neden Bu Kadar Kritik?

Klasik şifre hırsızlığından çok daha tehlikeli bir senaryo söz konusu. Çünkü modern LLM iş akışlarında kullanıcılar genellikle Claude'a şifre ile değil, kalıcı **API key** veya tarayıcı oturum token'ı ile bağlanır. Bu token'lar uzun ömürlüdür ve çok faktörlü doğrulamayı (MFA) devre dışı bırakır — çünkü sistem zaten "doğrulanmış" bir oturumla karşılaşıyor.

Bir saldırgan bu token'ı ele geçirdiğinde şunları yapabilir:

- Mevcut kullanım kotasını (ve ücretli bakiyeyi) tüketebilir.
- Ajansın veya markanın prompt geçmişini, özel sistem talimatlarını (system prompt) okuyabilir.
- İçerik üretim pipeline'larına sahte ya da manipülatif prompt'lar enjekte edebilir.
- Rakiplere veya dark web'e API erişimini kiralayabilir.

[AEO/GEO hizmet altyapısı](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) açısından ek bir risk katmanı daha var: Ajansların müşteri verisiyle özelleştirilmiş LLM pipeline'ları, çalınan bir token üzerinden manipüle edilirse üretilen içerikler yanlı, hatalı ya da zararlı hale gelebilir; bu durum hem marka itibarını hem de citation surface'i (alıntı yüzeyi — LLM'lerin markanızdan alıntı yapma olasılığı) doğrudan etkiler.

### Neden Şimdi?

LLM kullanımı kurumsal iş akışlarına hızla entegre oldukça, bu hesapların barındırdığı değer de artıyor. Saldırganlar bunu fark etti. Claude, ChatGPT ve Gemini API hesapları artık sadece "bir yazı aracı girişi" değil; pahalı token kotaları, kurumsal prompt mühendisliği birikimi ve müşteri verisine açılan kapılar.

---

## Türk Pazarı İçin Ne Anlama Geliyor?

Türkiye'deki ajanslar, e-ticaret siteleri ve KOBİ pazarlama ekipleri LLM araçlarını giderek daha yoğun kullanıyor. Ancak bu kullanımın kurumsal güvenlik prosedürleriyle henüz örtüşmediği görülüyor. Birkaç somut risk noktası:

**1. Paylaşılan hesap sorunu:** Küçük ve orta ölçekli ajanslar, maliyeti düşürmek için tek bir Claude veya ChatGPT hesabını birden fazla çalışanla paylaşıyor. Bu senaryoda bir çalışanın bilgisayarındaki infostealer tüm ekibin erişimini tehlikeye atar.

**2. Kurumsal API key yönetimi eksikliği:** Birçok şirket API key'lerini `.env` dosyalarında veya Slack kanallarında paylaşıyor; rotation (periyodik yenileme) politikası yok.

**3. Türkçe içerik pipeline'larının ifşa riski:** AEO odaklı içerik üretiminde kullanılan özelleştirilmiş sistem prompt'ları (rakip analizi, hedef kitle tanımı, içerik stratejisi) çalınırsa rekabet avantajı sıfırlanabilir.

[Klasik SEO altyapısından](https://gonet.com.tr/yetenekler/seo-klasik-arama) AEO/GEO'ya geçiş yapan ekipler bu yeni güvenlik boyutunu strateji planlarına dahil etmeli. Zira LLM'lerin markanızı nasıl temsil ettiği üzerindeki kontrol, kullandığınız araçların güvenliği kadar sağlam.

---

## Eylem Maddeleri: Yarın Uygulayabileceğiniz 6 Adım

- [ ] **API key'leri ekip hesabından ayırın:** Her çalışan veya proje için ayrı, kısıtlı yetkili API anahtarı oluşturun. Anthropic Console ve OpenAI Platform bunu destekliyor.
- [ ] **Key rotation politikası belirleyin:** API key'leri en fazla 90 günde bir yenileyin; eski key'leri derhal iptal edin.
- [ ] **Tarayıcı oturum güvenliğini gözden geçirin:** Claude.ai ve benzeri LLM arayüzlerini kişisel tarayıcı profilleriyle değil, kurumsal, yönetilen tarayıcı ortamlarında kullanın.
- [ ] **Endpoint güvenliğini denetleyin:** Özellikle uzaktan çalışan ekip üyelerinin bilgisayarlarında güncel EDR (Endpoint Detection & Response) çözümü olup olmadığını kontrol edin — infostealer tespitinin birincil hattı burası.
- [ ] **Kullanım anomalisi izleme kurun:** Anthropic Console ve diğer LLM platformlarının kullanım panellerini haftalık olarak inceleyin; olağandışı token tüketimi erken uyarı sinyalidir.
- [ ] **Sistem prompt'larını gizli varlık olarak yönetin:** Özelleştirilmiş AEO/GEO prompt'larınızı kaynak kodu gibi version control'a alın, erişimi sınırlayın ve dışarıya paylaşmayın.

---

## Sık Sorulan Sorular

### İnfostealer zararlı yazılımı nedir ve Claude'u nasıl etkiler?

Inforstealer, kullanıcı bilgisayarında arka planda çalışan, tarayıcı çerezlerini, oturum token'larını ve şifreleri sessizce çalıp saldırganlara ileten zararlı yazılımdır. Claude kullanıcıları için risk şudur: Tarayıcıdaki aktif Claude oturumu çalınırsa saldırgan, kullanıcının şifresine ihtiyaç duymadan hesaba erişir, API kotasını tüketir ve kayıtlı ödeme bilgilerine ulaşır. Anthropic bu riski tespit ettiğinde etkilenen hesapları otomatik olarak oturumu kapatarak koruyor.

### AEO/GEO iş akışlarında LLM güvenliği neden özellikle önemlidir?

AEO ve GEO süreçleri, özelleştirilmiş sistem prompt'ları, marka sesi rehberleri ve rekabet analizi içeren hassas kurumsal veriyle besleniyor. Bu pipeline'lara yetkisiz erişim; üretilen içeriklerin manipülasyonuna, rakiplere veri sızıntısına ve LLM motorlarında marka citation surface'inin zarar görmesine yol açabilir. Bu nedenle LLM hesap güvenliği, standart siber güvenlik protokollerinin ayrılmaz bir parçası olmalıdır.

### Hesabımın ele geçirildiğini nasıl anlarım?

En belirgin işaret, kullanım panosunda açıklayamadığınız ani token tüketimi artışıdır. Anthropic, şüpheli aktivite tespit ettiğinde e-posta bildirimi gönderiyor ve hesabı otomatik olarak çıkış yaptırıyor. Proaktif önlem olarak: API key kullanım loglarını düzenli inceleyin, bilinmeyen IP adreslerinden gelen erişimleri sorgulayın ve kullanım eşiklerine uyarı ayarlayın.

---

LLM araçlarını AEO/GEO altyapısının merkezine koymak doğru bir strateji — ancak bu araçlara bağımlılık arttıkça güvenlik açıkları da büyüyor. Markanızın AI motorlarındaki temsilini korumak, kullandığınız araçların güvenliğini korumakla başlıyor. AEO denetimi ve güvenli LLM iş akışı kurulumu için [Gonet ile iletişime geçebilirsiniz](https://gonet.com.tr/iletisim).

---

*İncelenen kaynak: [searchenginejournal.com](https://www.searchenginejournal.com/anthropic-warns-hackers-are-stealing-claude-sessions-to-hijack-accounts/587566/)*
