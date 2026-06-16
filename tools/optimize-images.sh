#!/usr/bin/env bash
# GONET görsel optimizasyonu — SEO / Core Web Vitals / AEO için dosya boyutu küçültme,
# minimal kalite kaybıyla. Siteye eklenen HER görsel önce bundan geçmeli.
#
# Kullanım:
#   tools/optimize-images.sh public/blog            # bir dizindeki tüm jpg/png
#   tools/optimize-images.sh public/blog/foo.jpg    # tek dosya
#   JPEG_QUALITY=82 tools/optimize-images.sh ...     # kalite override (varsayılan 80)
#
# Yöntem:
#   JPG → mozjpeg (cjpeg) q80 progressive + optimize  (foto için ideal)
#   PNG → renk sayısı ≤4096 ise PNG8 palet (flat grafik/kart, görsel-kayıpsız),
#         değilse foto kabul edilir: sadece metadata strip + max zlib (kayıpsız).
# Bağımlılık: ImageMagick (magick), mozjpeg (cjpeg). Sadece daha küçükse üzerine yazar.
set -uo pipefail
Q="${JPEG_QUALITY:-80}"

opt_jpg() {
  local f="$1" t; t="$(mktemp /tmp/optimg.XXXXXX).jpg"
  if magick "$f" -strip ppm:- 2>/dev/null | cjpeg -quality "$Q" -progressive -optimize > "$t" 2>/dev/null && [ -s "$t" ]; then
    local o n; o=$(stat -f%z "$f"); n=$(stat -f%z "$t")
    if [ "$n" -lt "$o" ]; then mv "$t" "$f"; printf "  jpg %-44s %5dKB -> %4dKB\n" "$(basename "$f")" $((o/1024)) $((n/1024)); else rm -f "$t"; printf "  jpg %-44s zaten optimal\n" "$(basename "$f")"; fi
  else rm -f "$t"; printf "  jpg %-44s SKIP (hata)\n" "$(basename "$f")"; fi
}

opt_png() {
  local f="$1" t colors; t="$(mktemp /tmp/optimg.XXXXXX).png"
  colors=$(magick "$f" -format "%k" info: 2>/dev/null || echo 999999)
  if [ "$colors" -le 4096 ] 2>/dev/null; then
    magick "$f" -strip -define png:compression-level=9 PNG8:"$t" 2>/dev/null
  else
    magick "$f" -strip -define png:compression-level=9 "$t" 2>/dev/null   # foto: kayıpsız
  fi
  if [ -s "$t" ]; then
    local o n; o=$(stat -f%z "$f"); n=$(stat -f%z "$t")
    if [ "$n" -lt "$o" ]; then mv "$t" "$f"; printf "  png %-44s %5dKB -> %4dKB  (%s renk)\n" "$(basename "$f")" $((o/1024)) $((n/1024)) "$colors"; else rm -f "$t"; printf "  png %-44s zaten optimal\n" "$(basename "$f")"; fi
  else rm -f "$t"; printf "  png %-44s SKIP\n" "$(basename "$f")"; fi
}

collect() { for a in "$@"; do if [ -d "$a" ]; then find "$a" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \); elif [ -f "$a" ]; then echo "$a"; fi; done; }

[ $# -eq 0 ] && { echo "kullanım: $0 <dosya|dizin> ..."; exit 1; }
echo "Optimize ediliyor (jpeg q=$Q)…"
while IFS= read -r f; do
  case "$f" in
    *.png|*.PNG) opt_png "$f" ;;
    *.jpg|*.JPG|*.jpeg|*.JPEG) opt_jpg "$f" ;;
  esac
done < <(collect "$@")
echo "Bitti."
