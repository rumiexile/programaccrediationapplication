/* ==========================================================================
   Report — rapor önizlemesi ve Word çıktısı
   Form verisini şablondaki özgün bölüm sırasıyla (Kapak, 1–7) tek bir HTML
   belgesine derler. Aynı HTML hem ekranda önizleme hem yazdırma hem de
   Word'ün açabildiği .doc dosyası için kullanılır.
   ========================================================================== */

window.Report = (function () {
  "use strict";

  var S = window.Store;
  var R = window.Rules;
  var T = window.TEMPLATE;
  var C = window.CRITERIA;
  var key = R.key;

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function g(path) {
    var v = S.get(path);
    return v === undefined || v === null ? "" : v;
  }

  var EMPTY = '<span class="doc__empty">—</span>';

  /** Serbest metin: paragraflara böler */
  function para(text) {
    if (!text || !String(text).trim()) return '<p class="doc__placeholder">[Metin girilmedi]</p>';
    return String(text)
      .split(/\n{2,}/)
      .map(function (p) {
        return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  function val(v) {
    return v === "" || v === undefined || v === null ? EMPTY : esc(v);
  }

  function box(checked, label) {
    return '<span class="doc__box">' + (checked ? "☒" : "☐") + " " + esc(label) + "</span>";
  }

  /** Şemadaki seçenek listesini ☐/☒ dizisine çevirir */
  function optionRow(fieldId, options, multi) {
    var v = S.get(fieldId);
    return options
      .map(function (o) {
        var on = multi ? (v || []).indexOf(o.value) !== -1 : v === o.value;
        return box(on, o.label);
      })
      .join(" ");
  }

  function fieldDef(id) {
    var found = null;
    window.SCHEMA.tabs.forEach(function (t) {
      t.steps.forEach(function (s) {
        s.fields.forEach(function (f) {
          if (f.id === id) found = f;
        });
      });
    });
    return found;
  }

  function opts(id, multi) {
    var f = fieldDef(id);
    return f ? optionRow(id, f.options, multi) : "";
  }

  function kv(rows) {
    return (
      '<table class="doc__kv">' +
      rows
        .map(function (r) {
          return "<tr><th>" + r[0] + "</th><td>" + r[1] + "</td></tr>";
        })
        .join("") +
      "</table>"
    );
  }

  function grid(head, rows, cls) {
    return (
      '<table class="doc__grid' + (cls ? " " + cls : "") + '"><thead><tr>' +
      head
        .map(function (h) {
          return "<th>" + h + "</th>";
        })
        .join("") +
      "</tr></thead><tbody>" +
      rows
        .map(function (r) {
          return (
            "<tr>" +
            r
              .map(function (c) {
                return "<td>" + c + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("") +
      "</tbody></table>"
    );
  }

  function evidence(path) {
    var rows = (S.get(path) || []).filter(function (r) {
      return r && r.name;
    });
    if (!rows.length) return '<p class="doc__placeholder">[Kanıt girilmedi]</p>';
    var KIND = { yururlukte: "yürürlükte", taslak: "taslak", gorusme: "görüşme", inceleme: "yerinde inceleme" };
    return (
      "<ul>" +
      rows
        .map(function (r) {
          return "<li>" + esc(r.name) + (r.kind ? " <em>(" + esc(KIND[r.kind] || r.kind) + ")</em>" : "") + (r.url ? " — " + esc(r.url) : "") + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function h(level, text, id) {
    return "<h" + level + (id ? ' id="' + id + '"' : "") + ">" + esc(text) + "</h" + level + ">";
  }

  function label(text) {
    return '<p class="doc__label">' + esc(text) + "</p>";
  }

  function dateTr(v) {
    if (!v) return "";
    var d = new Date(v);
    return isNaN(d) ? v : d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
  }

  /* ------------------------------------------------------------------ */
  function cover() {
    var qt = opts("cover.qualType") + (g("cover.qualTypeOther") ? " (" + esc(g("cover.qualTypeOther")) + ")" : "");
    var lang = opts("cover.language") + (g("cover.languageName") ? " — " + esc(g("cover.languageName")) : "");
    var entry = opts("cover.entry", true) + (g("cover.entryScore") ? " · YKS puan türü: " + esc(g("cover.entryScore")) : "") + (g("cover.entryOther") ? " · Diğer: " + esc(g("cover.entryOther")) : "");
    var rows = [
      ["Yükseköğretim kurumu", val(g("cover.institution"))],
      ["Birim (fakülte / yüksekokul / MYO)", val(g("cover.unit"))],
      ["Program adı", val(g("cover.programName"))],
      ["Diploma / derece unvanı", val(g("cover.degreeTitle"))],
      ["Yeterlilik türü<br><small>TYÇ Yeterlilik Tür Belirleyicisi</small>", qt],
      ["Yeterliliği veren kuruluş (sorumlu kurum)", val(g("cover.awardingBody"))],
      ["Yönelim", opts("cover.orientation")],
      ["Seviye", "TYÇ: " + val(g("cover.levelTyc")) + " · AYÇ: " + val(g("cover.levelAyc")) + " · QF-EHEA döngüsü: " + val(g("cover.levelQf"))],
      ["Sınıflandırma", "ISCED-F 2013 alan kodu: " + val(g("cover.isced")) + " · ISCO (meslekî ise): " + val(g("cover.isco"))],
      ["Kategori", opts("cover.category")],
      ["Normal öğrenim süresi", val(g("cover.durationYears")) + " yıl / " + val(g("cover.durationSemesters")) + " yarıyıl"],
      ["Toplam AKTS", val(g("cover.ects"))],
      ["Öğretim türü ve öğrenme ortamı", opts("cover.delivery", true)],
      ["Öğretim dili", lang],
      ["Giriş şartları", entry],
    ];
    if (g("cover.qualType") === "yukseklisans") rows.push(["Yüksek lisans programları için", opts("cover.masters", true)]);
    rows.push(
      ["İlk öğrenci alım tarihi", val(dateTr(g("cover.firstIntake")))],
      ["Kontenjan (yıllık)", val(g("cover.quota"))],
      ["Ortalama yeni kayıt sayısı*", val(g("cover.avgEnrol")) + " / yıl"],
      ["Ortalama mezun sayısı*", val(g("cover.avgGrad")) + " / yıl"]
    );
    var accType = opts("accr.type") + (g("accr.reaccrNo") ? " (kaçıncı: " + esc(g("accr.reaccrNo")) + ")" : "");
    return (
      '<section class="doc__cover">' +
      '<p class="doc__kicker">Program Akreditasyonu – Bireysel Süreç</p>' +
      '<h1 class="doc__title">Program Akreditasyon Raporu</h1>' +
      '<p class="doc__subtitle">Rapor şablonu · ' + esc(T.version) + " · YÖKAK program akreditasyon ölçütleri ve TYÇ Yeterlilik Tür Belirleyicisi esas alınmıştır</p>" +
      kv(rows) +
      '<p class="doc__foot">* Referans dönemi: ' + val(g("data.refPeriod")) + " (Bölüm 5.1)</p>" +
      kv([
        ["Akreditasyon türü", accType],
        ["Sorumlu akreditasyon kuruluşu", val(g("accr.agency"))],
        ["Kuruluş raportörü / sorumlu uzman", val(g("accr.rapporteur"))],
        ["Rapor tarihi", val(dateTr(g("accr.reportDate")))],
      ]) +
      "</section>"
    );
  }

  function section1() {
    var out = h(1, "1. Sonuçların özeti", "doc-1");
    out += h(2, "1.1 Programın kısa profili") + para(g("summary.profile"));
    out += h(2, "1.2 Değerlendirme takımının özet kalite değerlendirmesi") + para(g("summary.quality"));

    var f = R.formal();
    out += h(2, "1.3 Biçimsel inceleme raporuna göre kuruluşun karar önerisi (Bölüm 2)");
    out += label("TYÇ yeterlilik türüne ilişkin biçimsel ölçütler");
    out += "<p>" + box(f.result === "yes", "karşılanmıştır") + " " + box(f.result === "no", "karşılanmamıştır") + "</p>";
    var defs = (S.get("summary.formalDeficits") || []).filter(function (d) {
      return d && (d.text || d.criterion);
    });
    defs.forEach(function (d, i) {
      out += "<p><strong>Eksiklik " + (i + 1) + " (Ölçüt " + esc(d.criterion || "2.##") + "):</strong> " + esc(d.text) + "</p>";
    });
    if (f.notMet.length) out += "<p>" + box((S.get("summary.formalReject") || []).indexOf("yes") !== -1, "Biçimsel ölçütlerde ciddi eksiklik tespit edilmiştir: kuruluş, akreditasyonun reddini önerir.") + "</p>";

    out += h(2, "1.4 YÖKAK program akreditasyon ölçütlerine göre değerlendirme takımının karar önerisi (Bölüm 3)");
    var a = R.accreditation();
    out += grid(
      ["Ana ölçüt", "Zorunlu alt ölçütler", "Uyumlu", "Kısmen uyumlu", "Uyumsuz"],
      C.map(function (crit, i) {
        var m = a.perMain[i];
        var mand = crit.subs.filter(R.isMandatory);
        var mandCell = mand.length ? box(!m.mandatoryFail.length && m.pending === 0, "E") + " " + box(m.mandatoryFail.length > 0, "H") : "—";
        return [
          esc(crit.no + ". " + crit.title),
          mandCell,
          m.final === "uyumlu" ? "☒" : "☐",
          m.final === "kismen" ? "☒" : "☐",
          m.final === "uyumsuz" ? "☒" : "☐",
        ];
      }),
      "doc__grid--center"
    );
    out += label("Karar önerisi");
    out += "<p>" + box(g("summary.decision") === "akreditasyon", "Akreditasyon") + " " + box(g("summary.decision") === "red", "Akreditasyonun reddi") + "</p>";
    out += label("Gelişmeye açık alanlar (ölçüt numarasıyla)");
    var areas = (S.get("summary.areas") || []).filter(function (x) {
      return x && (x.text || x.sub);
    });
    out += areas.length
      ? areas
          .map(function (x, i) {
            return "<p><strong>Gelişmeye açık alan " + (i + 1) + " (Alt ölçüt " + esc(x.sub || "#.#") + "):</strong> " + esc(x.text) + "</p>";
          })
          .join("")
      : '<p class="doc__placeholder">[Girilmedi]</p>';
    out += label("Uygulanabilirse: değerlendirme takımının önerileri") + para(g("summary.recommendations"));

    out += h(2, "1.5 Mevzuatla düzenlenmiş programlar için ayrıca uygunluk");
    out += g("summary.regulatedApplies") === "hayir" ? "<p>Program mevzuatla düzenlenmiş bir program değildir.</p>" : para(g("summary.regulated"));
    return out;
  }

  function section2() {
    var out = h(1, "2. Biçimsel inceleme raporu: TYÇ yeterlilik türüne uygunluk", "doc-2");
    out += '<p class="doc__note">Bu bölüm akreditasyon kuruluşu tarafından doldurulur.</p>';
    T.formal.forEach(function (it) {
      var k = "formal." + key(it.code);
      out += h(2, it.code + " " + it.title);
      if (it.tyc) out += kv([["TYÇ değeri", val(g(k + ".tycValue"))], ["Programdaki durum", val(g(k + ".programValue"))]]);
      out += label("Kanıtlar") + evidence(k + ".evidence");
      if (it.matrix) {
        var rows = it.matrix === "tyc" ? T.tycOutcomesLisans.slice() : T.keyCompetences.slice();
        var keys = rows.map(function (_, i) {
          return String(i);
        });
        (S.get(k + ".matrix.extra") || []).forEach(function (txt, i) {
          rows.push(txt);
          keys.push("x" + i);
        });
        out += label(it.matrix === "tyc" ? "Eşleştirme matrisi" : "Anahtar yetkinlikler");
        out += grid(
          ["#", it.matrix === "tyc" ? "TYÇ yeterlilik türü öğrenme kazanımı" : "Anahtar yetkinlik (TYÇ)", it.matrix === "tyc" ? "İlişkili program çıktıları (PÇ no)" : "İlişkili PÇ / dersler", "Karşılanıyor"],
          rows.map(function (txt, i) {
            var p = k + ".matrix.rows." + keys[i];
            var met = g(p + ".met");
            return [String(i + 1), esc(txt), val(g(p + ".link")), box(met === "E", "E") + " " + box(met === "H", "H")];
          })
        );
      }
      out += label("Durum / Değerlendirme") + para(g(k + ".status"));
      var d = g(k + ".decision");
      out += label("Karar önerisi");
      out += "<p>" + box(d === "yes", "Ölçüt karşılanmıştır") + " " + box(d === "no", "Ölçüt karşılanmamıştır") + (it.optional ? " " + box(d === "na", "Uygulanamaz") : "") + "</p>";
      if (d === "no") out += para(g(k + ".remedy"));
    });
    return out;
  }

  function section3() {
    var out = h(1, "3. Değerlendirme takımı raporu: YÖKAK program akreditasyon ölçütleri", "doc-3");
    out += h(2, "3.0 Değerlendirmenin odak noktaları / kalite gelişimi") + para(g("s3.focus"));
    C.forEach(function (crit) {
      out += h(2, "Ana ölçüt " + crit.no + ". " + crit.title);
      crit.subs.forEach(function (sub) {
        var b = "crit." + key(sub.code);
        out += h(3, sub.code + ". " + sub.text);
        var mand = R.mandatoryOpen(sub) ? box(false, "Evet") + " " + box(false, "Hayır") : R.isMandatory(sub) ? "Evet" : "Hayır";
        out += kv([["Zorunlu alt ölçüt", mand], ["YÖKAK rubrik ilişkilendirmesi", esc(sub.rubric.join(", "))]]);
        var d = R.subDecision(sub);
        if (d === "na") {
          out += "<p><strong>Alt ölçüt kararı:</strong> Kapsam dışı</p>" + para(g(b + ".reason"));
          return;
        }
        out += label("Göstergeler");
        out += grid(
          ["#", "Gösterge", "Var", "Yok"],
          sub.indicators.map(function (txt, i) {
            var m = g(b + ".ind." + i);
            return [String(i + 1), esc(txt), m === "var" ? "☒" : "☐", m === "yok" ? "☒" : "☐"];
          }),
          "doc__grid--ind"
        );
        out += label("Kanıtlar") + evidence(b + ".evidence");
        out += label("Durum") + para(g(b + ".status"));
        out += label("Değerlendirme: güçlü yönler ve gelişmeye açık alanlar") + para(g(b + ".assessment"));
        out += label("Alt ölçüt kararı");
        out += "<p>" + box(d === "met", "Karşılanıyor") + " " + box(d === "notmet", "Karşılanmıyor") + "</p>";
        if (g(b + ".reason")) out += para(g(b + ".reason"));
      });
      var m = R.main(crit);
      out += h(3, "Ana ölçüt " + crit.no + " sonucu");
      out += grid(
        ["Alt ölçüt", "Zorunlu", "Karşılanıyor", "Karşılanmıyor"],
        crit.subs.map(function (sub) {
          var d = R.subDecision(sub);
          return [sub.code + ".", R.isMandatory(sub) ? "Zorunlu" : "—", d === "met" ? "☒" : d === "na" ? "k.d." : "☐", d === "notmet" ? "☒" : "☐"];
        }),
        "doc__grid--center"
      );
      out += "<p>Karşılanan alt ölçüt oranı: " + m.met + " / " + m.applicable + " (% " + (m.ratio === null ? "……" : Math.round(m.ratio * 100)) + ")" + (m.na ? " · kapsam dışı: " + m.na : "") + "</p>";
      out += "<p>Ana ölçüt sonucu: " + box(m.final === "uyumlu", "Uyumlu") + " " + box(m.final === "kismen", "Kısmen uyumlu") + " " + box(m.final === "uyumsuz", "Uyumsuz") + "</p>";
      out += label("Bütüncül gerekçe") + para(g("critMain." + crit.no + ".rationale"));
    });
    return out;
  }

  function section4() {
    var out = h(1, "4. Değerlendirme süreci", "doc-4");
    out += h(2, "4.1 Genel bilgiler") + para(g("process.general"));
    out += h(2, "4.2 Yasal dayanak");
    out += "<ul>" + T.legalBasis.map(function (l) {
      return "<li>" + esc(l) + "</li>";
    }).join("") + "</ul>";
    if (g("process.legalExtra")) out += para(g("process.legalExtra"));
    out += h(2, "4.3 Değerlendirme takımı");
    var ROLE = {
      a: "a) Öğretim üyeleri (alanla yakın)",
      b: "b) Mesleki uygulama / işveren temsilcisi",
      c: "c) Öğrenci",
      d: "d) Uygulanabilirse: düzenlenmiş programlar için ek uzman",
      e: "e) Kuruluş raportörü / koordinatör",
    };
    var team = (S.get("process.team") || []).filter(function (m) {
      return m && (m.name || m.role);
    });
    out += team.length
      ? grid(["Rol", "Ad soyad, kurum ve alan"], team.map(function (m) {
          return [esc(ROLE[m.role] || ""), esc([m.name, m.institution, m.field].filter(Boolean).join(" · "))];
        }))
      : '<p class="doc__placeholder">[Takım üyesi girilmedi]</p>';
    return out;
  }

  function section5() {
    var out = h(1, "5. Veri sayfası", "doc-5");
    out += h(2, "5.1 Program verileri");
    var years = [0, 1, 2].map(function (i) {
      return esc(g("data.years." + i) || "20…-20…");
    });
    out += grid(
      ["Gösterge"].concat(years).concat(["Ortalama"]),
      T.dataIndicators.map(function (ind) {
        var vals = [0, 1, 2].map(function (i) {
          return g("data.values." + ind.id + "." + i);
        });
        var nums = vals.map(function (v) {
          return parseFloat(String(v).replace(",", "."));
        }).filter(function (n) {
          return !isNaN(n);
        });
        var avg = ind.text || !nums.length ? "" : (nums.reduce(function (a, b) {
          return a + b;
        }, 0) / nums.length).toLocaleString("tr-TR", { maximumFractionDigits: 2 });
        return [esc(ind.label)].concat(vals.map(val)).concat([val(avg)]);
      })
    );
    out += "<p>* Kapakta belirtilen ortalamalar için referans dönemi: " + val(g("data.refPeriod")) + "</p>";
    if (g("data.extra")) out += para(g("data.extra"));
    out += h(2, "5.2 Akreditasyon verileri");
    var re = (S.get("accrData.reaccr") || []).filter(function (r) {
      return r && (r.date || r.agency);
    });
    var rows = [
      ["Kurum – akreditasyon kuruluşu sözleşme tarihi", val(dateTr(g("accrData.contract")))],
      ["Öz değerlendirme raporunun teslim tarihi", val(dateTr(g("accrData.ser")))],
      ["Yerinde ziyaret tarihi", val(dateTr(g("accrData.visit")))],
      ["İlk akreditasyon tarihi ve kuruluşu", val(g("accrData.first"))],
    ];
    re.forEach(function (r, i) {
      rows.push(["Yeniden akreditasyon (" + (i + 1) + ") tarihi ve kuruluşu", val([dateTr(r.date), r.agency].filter(Boolean).join(" · "))]);
    });
    rows.push(
      ["Varsa süre uzatması", val(g("accrData.extension"))],
      ["Görüşülen gruplar", val(g("accrData.groups"))],
      ["İncelenen fiziksel ve dijital olanaklar (isteğe bağlı)", val(g("accrData.facilities"))]
    );
    out += kv(rows);
    return out;
  }

  function section67() {
    var out = h(1, "6. Karar kuralları", "doc-6");
    out += grid(["Düzey", "Kural"], T.rules.map(function (r) {
      return [esc(r.level), esc(r.rule)];
    }));
    out += h(1, "7. Sözlük", "doc-7");
    out += grid(["Terim", "Açıklama"], T.glossary.map(function (r) {
      return [esc(r[0]), esc(r[1])];
    }));
    return out;
  }

  function html() {
    return cover() + section1() + section2() + section3() + section4() + section5() + section67();
  }

  /* Word'ün HTML'i doğrudan açabilmesi için asgari belge iskeleti */
  var WORD_CSS =
    "body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;line-height:1.4;color:#111}" +
    "h1{font-size:16pt;color:#1a4270;border-bottom:1.5pt solid #0a7080;padding-bottom:3pt;margin-top:20pt}" +
    "h2{font-size:12.5pt;color:#1a4270;margin-top:14pt}h3{font-size:11pt;margin-top:12pt}" +
    "table{border-collapse:collapse;width:100%;margin:6pt 0}th,td{border:0.75pt solid #9aa7b8;padding:3pt 5pt;vertical-align:top;text-align:left}" +
    "th{background:#eff5fb}.doc__kv th{width:34%}.doc__label{font-weight:bold;margin:8pt 0 2pt}" +
    ".doc__placeholder,.doc__empty{color:#8493ab;font-style:italic}.doc__title{font-size:22pt;border:none;color:#1a4270}" +
    ".doc__kicker{text-transform:uppercase;letter-spacing:1pt;color:#0a7080;font-weight:bold}.doc__subtitle,.doc__foot,.doc__note{color:#475569;font-style:italic}";

  function wordFile() {
    var name = (S.get("cover.programName") || "program").toString();
    var doc =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><title>Program Akreditasyon Raporu — ' + esc(name) + "</title><style>" + WORD_CSS + "</style></head><body>" +
      html() +
      "</body></html>";
    var blob = new Blob(["﻿", doc], { type: "application/msword" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = defaultName();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function defaultName() {
    var slug = String(S.get("cover.programName") || "rapor")
      .toLocaleLowerCase("tr")
      .replace(/[çğıöşü]/g, function (c) {
        return { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u" }[c];
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
    return "program-akreditasyon-raporu-" + (slug || "rapor") + "-" + new Date().toISOString().slice(0, 10) + ".doc";
  }

  return { html: html, wordFile: wordFile };
})();
