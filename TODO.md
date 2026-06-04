# Yapılacaklar

## Admin panel kontrolleri

- [ ] **Galeri görsel davranışı admin'den seçilebilir**
  - `/galeri` ve `/sergi` sayfalarındaki sayfa görselleri için "tıklayınca büyür / tam ekran açar" özelliği opsiyonel olacak
  - Admin panelinde toggle: "Görsele tıklanabilir mi?" + "Tam ekran modal mı, yoksa ham görseli yeni sekmede mi?"
  - Şu an default: `<a href={image} target="_blank">` ile ham görseli yeni sekmede açar
  - Karar: zorunlu değil, opsiyonel feature olarak admin'den açılıp kapanabilir
  - İlgili dosyalar: `src/pages/galeri.astro`, `src/pages/sergi.astro`
