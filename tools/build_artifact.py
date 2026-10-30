#!/usr/bin/env python3
"""Claude Artifact için gövde-only paket üretir.

bundle.py --body-only çıktısını alır ve gömülü görüntüleyiciye uyarlar:
  - <title> dosyanın başına konur (görüntüleyici yalnızca ilk 8 KB'ı tarar),
  - window.EMBEDDED_MODE açılır (indirme / yazdırma yerine JSON kopyalama),
  - kurum logosu ve marka adı nötr bir başlıkla değiştirilir; yayınlanan
    sayfa resmî bir kurum sayfası gibi görünmemelidir.

Kullanım:
    python3 tools/build_artifact.py build/artifact.html
"""
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import bundle  # noqa: E402

out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "build/artifact.html")
html, _ = bundle.build(body_only=True)

html, n = re.subn(
    r'<img\s+class="brand__mark"[^>]*/>\s*<span class="brand__text">\s*<span class="brand__name">[^<]*</span>\s*<span class="brand__sub">[^<]*</span>',
    '<span class="brand__text"><span class="brand__name">Program Akreditasyonu</span>'
    '<span class="brand__sub">Rapor formu · Taslak 0.1</span>',
    html,
)
if n != 1:
    sys.exit("HATA: marka bloğu bulunamadı")

head = (
    "<title>Program Akreditasyon Raporu</title>\n"
    "<script>window.EMBEDDED_MODE = true;</script>\n"
)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(head + html, encoding="utf-8")
print("çıktı: %s (%s bayt)" % (out, format(out.stat().st_size, ",d")))
