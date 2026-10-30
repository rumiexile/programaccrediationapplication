/* ==========================================================================
   Rules — Bölüm 6 karar kuralları
   --------------------------------------------------------------------------
   Alt ölçüt → ana ölçüt → akreditasyon kararı zincirini hesaplar. Hesap
   yalnızca öneridir: şablon ana ölçüt sonucunun "bütüncül" belirlendiğini
   söyler; bu yüzden takım her ana ölçütte öneriyi geçersiz kılabilir.
   ========================================================================== */

window.Rules = (function () {
  "use strict";

  var S = window.Store;
  var C = window.CRITERIA;
  var T = window.TEMPLATE;

  /* Noktalı yol içinde nokta taşıyamayan kodlar için anahtar: "2.10" → "2_10" */
  function key(code) {
    return String(code).replace(/\./g, "_");
  }

  var RESULT_LABEL = { uyumlu: "Uyumlu", kismen: "Kısmen uyumlu", uyumsuz: "Uyumsuz" };
  var RESULT_TONE = { uyumlu: "success", kismen: "warning", uyumsuz: "danger" };

  /** Alt ölçüt zorunlu mu? Şablonda sabit değilse takımın işaretine bakılır. */
  function isMandatory(sub) {
    if (sub.mandatory === true || sub.mandatory === false) return sub.mandatory;
    return S.get("crit." + key(sub.code) + ".mandatory") === "evet";
  }

  function mandatoryOpen(sub) {
    return sub.mandatory === null && !S.get("crit." + key(sub.code) + ".mandatory");
  }

  /** "met" | "notmet" | "na" | null */
  function subDecision(sub) {
    return S.get("crit." + key(sub.code) + ".decision") || null;
  }

  /** Göstergelerin var/yok dağılımı */
  function indicatorTally(sub) {
    var marks = S.get("crit." + key(sub.code) + ".ind", {}) || {};
    var out = { var: 0, yok: 0, open: 0, total: sub.indicators.length };
    sub.indicators.forEach(function (_, i) {
      var m = marks[i];
      if (m === "var") out.var++;
      else if (m === "yok") out.yok++;
      else out.open++;
    });
    return out;
  }

  /** Bir ana ölçütün alt ölçüt dökümü ve önerilen sonucu */
  function main(crit) {
    var r = { applicable: 0, met: 0, notMet: 0, na: 0, pending: 0, mandatoryFail: [], ratio: null, suggested: null };
    crit.subs.forEach(function (sub) {
      var d = subDecision(sub);
      if (d === "na") return r.na++;
      r.applicable++;
      if (d === "met") r.met++;
      else if (d === "notmet") {
        r.notMet++;
        if (isMandatory(sub)) r.mandatoryFail.push(sub.code);
      } else r.pending++;
    });

    // Oran yalnızca en az bir karar verildiyse anlamlıdır
    if (r.applicable > 0 && r.met + r.notMet > 0) r.ratio = r.met / r.applicable;

    // Zorunlu alt ölçüt karşılanmıyorsa diğer kararlar beklenmeden uyumsuz
    if (r.mandatoryFail.length) r.suggested = "uyumsuz";
    else if (r.pending === 0 && r.applicable > 0) {
      if (r.ratio >= 0.9) r.suggested = "uyumlu";
      else if (r.ratio >= 0.3) r.suggested = "kismen";
      else r.suggested = "uyumsuz";
    }

    r.override = S.get("critMain." + crit.no + ".override") || null;
    r.final = r.override || r.suggested;
    return r;
  }

  /** Bölüm 6: akreditasyon kararı önerisi */
  function accreditation() {
    var counts = { uyumlu: 0, kismen: 0, uyumsuz: 0, pending: 0 };
    var perMain = C.map(function (crit) {
      var m = main(crit);
      if (m.final) counts[m.final]++;
      else counts.pending++;
      return m;
    });
    var suggested = null;
    var reason = "";
    if (counts.uyumsuz > 0) {
      suggested = "red";
      reason = counts.uyumsuz + " ana ölçüt uyumsuz.";
    } else if (counts.kismen > 3) {
      suggested = "red";
      reason = "Üçten fazla ana ölçütte (" + counts.kismen + ") kısmi uyum var.";
    } else if (counts.pending === 0) {
      suggested = "akreditasyon";
      reason = counts.kismen
        ? counts.kismen + " ana ölçütte kısmi uyum, diğerlerinde tam uyum var."
        : "Tüm ana ölçütler uyumlu.";
    } else {
      reason = counts.pending + " ana ölçütün sonucu henüz belirlenmedi.";
    }
    return { counts: counts, perMain: perMain, suggested: suggested, reason: reason };
  }

  /** Bölüm 2: biçimsel ölçütlerin genel durumu */
  function formal() {
    var r = { met: 0, notMet: [], na: 0, pending: 0, total: T.formal.length, result: null };
    T.formal.forEach(function (f) {
      var d = S.get("formal." + key(f.code) + ".decision");
      if (d === "yes") r.met++;
      else if (d === "no") r.notMet.push(f.code);
      else if (d === "na") r.na++;
      else r.pending++;
    });
    if (r.notMet.length) r.result = "no";
    else if (r.pending === 0) r.result = "yes";
    return r;
  }

  /** Değerlendirmesi tamamlanan alt ölçüt sayısı (tüm ölçütler) */
  function decidedCount() {
    var n = 0;
    var total = 0;
    C.forEach(function (c) {
      c.subs.forEach(function (s) {
        total++;
        if (subDecision(s)) n++;
      });
    });
    return { done: n, total: total };
  }

  function findSub(code) {
    var no = parseInt(code, 10);
    var crit = C.filter(function (c) {
      return c.no === no;
    })[0];
    return crit
      ? crit.subs.filter(function (s) {
          return s.code === code;
        })[0]
      : null;
  }

  return {
    key: key,
    isMandatory: isMandatory,
    mandatoryOpen: mandatoryOpen,
    subDecision: subDecision,
    indicatorTally: indicatorTally,
    main: main,
    accreditation: accreditation,
    formal: formal,
    decidedCount: decidedCount,
    findSub: findSub,
    RESULT_LABEL: RESULT_LABEL,
    RESULT_TONE: RESULT_TONE,
  };
})();
