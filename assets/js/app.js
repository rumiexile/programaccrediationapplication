/* ==========================================================================
   App — sekme/adım gezinmesi, ilerleme, önizleme, kalıcılık
   ========================================================================== */

(function () {
  "use strict";

  var S = window.Store;
  var F = window.Fields;
  var R = window.Rules;
  var el = F.el;
  var icon = F.icon;

  var tabs = window.SCHEMA.tabs;
  var state = { tab: 0, step: 0 };

  /* ==================================================================
     İlerleme hesabı
     ================================================================== */
  function stepVisible(step) {
    return F.visible(step);
  }

  function stepProgress(step) {
    var p = { done: 0, total: 0 };
    if (!stepVisible(step)) return p;
    step.fields.forEach(function (f) {
      var u = F.units(f);
      p.done += u.done;
      p.total += u.total;
    });
    return p;
  }

  function stepState(step) {
    var p = stepProgress(step);
    if (p.total === 0) return "info";
    if (p.done === 0) return "empty";
    return p.done >= p.total ? "complete" : "partial";
  }

  function tabProgress(tab) {
    var p = { done: 0, total: 0 };
    tab.steps.forEach(function (s) {
      var sp = stepProgress(s);
      p.done += sp.done;
      p.total += sp.total;
    });
    return p;
  }

  function progress() {
    var p = { done: 0, total: 0 };
    tabs.forEach(function (t) {
      var tp = tabProgress(t);
      p.done += tp.done;
      p.total += tp.total;
    });
    p.percent = p.total ? Math.round((p.done / p.total) * 100) : 0;
    p.missing = p.total - p.done;
    return p;
  }

  /* ==================================================================
     Başlangıç
     ================================================================== */
  function init() {
    S.load();
    var prefs = S.getPrefs();
    var theme = prefs.theme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    if (prefs.position && typeof prefs.position.tab === "number" && tabs[prefs.position.tab]) {
      state.tab = prefs.position.tab;
      state.step = Math.min(prefs.position.step || 0, tabs[state.tab].steps.length - 1);
    }

    F.onDirty(function (field) {
      if (controlsVisibility(field)) return redrawKeepingFocus();
      refreshChrome();
    });

    buildHeader();
    render();
    bindKeys();
    S.onChange(function (path) {
      if (path === "__saved") updateSaveState();
    });
  }

  /* ==================================================================
     Üst bar
     ================================================================== */
  function buildHeader() {
    var host = document.getElementById("header-actions");
    host.innerHTML = "";

    host.appendChild(el("div", { class: "save-state", id: "save-state" }, [el("span", { class: "save-state__dot" }), el("span", { id: "save-state-text" })]));

    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var themeBtn = el("button", { type: "button", class: "btn btn--ghost btn--icon", title: isDark ? "Açık tema" : "Koyu tema", "aria-label": isDark ? "Açık temaya geç" : "Koyu temaya geç" }, [icon(isDark ? "sun" : "moon", "btn__icon")]);
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      S.setPref("theme", next);
      buildHeader();
    });
    host.appendChild(themeBtn);

    var wordBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: "Word belgesi olarak indir" }, [icon("file", "btn__icon"), el("span", { class: "btn-label", text: "Word" })]);
    wordBtn.addEventListener("click", function () {
      window.Report.wordFile();
      toast("Rapor Word belgesi olarak indirildi.", "success");
    });
    host.appendChild(wordBtn);

    var exportBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: "Dışa aktar (JSON)" }, [icon("download", "btn__icon"), el("span", { class: "btn-label", text: "Dışa aktar" })]);
    exportBtn.addEventListener("click", function () {
      S.download();
      toast("Rapor verisi JSON olarak indirildi.", "success");
    });
    host.appendChild(exportBtn);

    var fileInput = el("input", { type: "file", accept: ".json,application/json", class: "sr-only", id: "import-file" });
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          S.importJSON(String(reader.result));
          toast("Rapor verisi içe aktarıldı.", "success");
          render();
        } catch (e) {
          toast("Dosya okunamadı: geçerli bir rapor JSON dosyası değil.", "danger");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });
    var importBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: "İçe aktar (JSON)" }, [icon("upload", "btn__icon"), el("span", { class: "btn-label", text: "İçe aktar" })]);
    importBtn.addEventListener("click", function () {
      fileInput.click();
    });
    host.appendChild(importBtn);
    host.appendChild(fileInput);

    var resetBtn = el("button", { type: "button", class: "btn btn--ghost btn--icon", title: "Formu sıfırla", "aria-label": "Formu sıfırla" }, [icon("reset", "btn__icon")]);
    resetBtn.addEventListener("click", confirmReset);
    host.appendChild(resetBtn);

    updateSaveState();
  }

  function updateSaveState() {
    var text = document.getElementById("save-state-text");
    if (!text) return;
    var d = S.lastSaved();
    text.textContent = d ? "Kaydedildi " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "Henüz kaydedilmedi";
  }

  /* ==================================================================
     Sekme çubuğu
     ================================================================== */
  function buildTabs() {
    var bar = document.getElementById("tabbar");
    bar.innerHTML = "";
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", "Rapor bölümleri");

    tabs.forEach(function (tab, i) {
      var p = tabProgress(tab);
      var complete = p.total > 0 && p.done >= p.total;
      var btn = el("button", {
        type: "button",
        role: "tab",
        id: "tab_" + tab.id,
        class: "tab" + (complete ? " tab--complete" : ""),
        "aria-selected": i === state.tab ? "true" : "false",
        tabindex: i === state.tab ? "0" : "-1",
      });
      var index = el("span", { class: "tab__index" });
      if (complete) index.appendChild(icon("check"));
      else index.textContent = String(i + 1);
      btn.appendChild(index);
      btn.appendChild(
        el("span", { class: "tab__label" }, [
          el("span", { class: "tab__label-main", text: tab.label }),
          el("span", { class: "tab__label-sub", text: tab.sublabel || "" }),
        ])
      );
      btn.addEventListener("click", function () {
        go(i, 0);
      });
      bar.appendChild(btn);
    });
  }

  /* ==================================================================
     Kenar çubuğu
     ================================================================== */
  function buildSidebar() {
    var host = document.getElementById("sidebar");
    host.innerHTML = "";
    var tab = tabs[state.tab];
    var p = progress();
    var f = R.formal();
    var a = R.accreditation();
    var dc = R.decidedCount();

    var formalText = f.result === "yes" ? "Karşılanmıştır" : f.result === "no" ? "Karşılanmamıştır" : f.met + f.na + f.notMet.length + " / " + f.total + " karar";
    var accText = a.suggested === "akreditasyon" ? "Akreditasyon" : a.suggested === "red" ? "Reddi" : "Hesaplanmadı";

    host.appendChild(
      el("section", { class: "sidebar-section" }, [
        el("h2", { class: "sidebar-section__title", text: "Rapor özeti" }),
        el("div", { class: "sidebar-summary glass" }, [
          el("div", { class: "progress" }, [
            el("div", { class: "progress__meta" }, [el("span", { text: "Tamamlanma" }), el("strong", { class: "count-roll", text: p.percent + "%" })]),
            el("div", { class: "progress__track", role: "progressbar", "aria-valuenow": String(p.percent), "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": "Tamamlanma" }, [
              el("div", { class: "progress__fill", style: "width:" + p.percent + "%" }),
            ]),
          ]),
          row("Program", S.get("cover.programName") || "—"),
          row("Kurum", S.get("cover.institution") || "—"),
          row("Biçimsel inceleme", formalText, f.result === "yes" ? "success" : f.result === "no" ? "danger" : null),
          row("Alt ölçüt kararları", dc.done + " / " + dc.total),
          row("Akreditasyon önerisi", accText, a.suggested === "akreditasyon" ? "success" : a.suggested === "red" ? "danger" : null),
          row("Eksik alan", String(p.missing)),
        ]),
      ])
    );

    var steps = el("section", { class: "sidebar-section" }, [el("h2", { class: "sidebar-section__title", text: tab.label + " · Adımlar" })]);
    var stepper = el("nav", { class: "stepper", "aria-label": "Adımlar" });
    var shown = 0;
    tab.steps.forEach(function (step, i) {
      if (!stepVisible(step)) return;
      shown++;
      var st = stepState(step);
      var sp = stepProgress(step);
      var cls = "step-item";
      if (st === "complete") cls += " step-item--complete";
      else if (st === "partial") cls += " step-item--error";
      var marker = el("span", { class: "step-item__marker" });
      if (st === "complete") marker.appendChild(icon("check"));
      else marker.textContent = String(shown);

      var meta = null;
      if (step.criterion) {
        var m = R.main(step.criterion);
        meta = el("span", { class: "step-item__meta step-item__meta--crit" }, [
          el("span", { text: step.criterion.subs.filter(function (s) {
            return R.subDecision(s);
          }).length + "/" + step.criterion.subs.length + " karar" }),
          m.final ? el("span", { class: "dot-badge dot-badge--" + R.RESULT_TONE[m.final], text: R.RESULT_LABEL[m.final] }) : null,
        ]);
      } else if (st === "partial") meta = el("span", { class: "step-item__meta", text: sp.total - sp.done + " eksik alan" });

      var item = el("button", { type: "button", class: cls, "aria-current": i === state.step ? "step" : null }, [
        marker,
        el("span", { class: "step-item__body" }, [el("span", { class: "step-item__title", text: step.short || step.title }), meta]),
      ]);
      item.addEventListener("click", function () {
        go(state.tab, i);
      });
      stepper.appendChild(item);
    });
    steps.appendChild(stepper);
    host.appendChild(steps);
  }

  function row(label, value, tone) {
    return el("div", { class: "sidebar-summary__row" }, [
      el("span", { class: "sidebar-summary__label", text: label }),
      el("span", { class: "sidebar-summary__value" + (tone ? " sidebar-summary__value--" + tone : ""), text: value || "—" }),
    ]);
  }

  function buildTopProgress() {
    var host = document.getElementById("topprogress");
    var p = progress();
    host.innerHTML = "";
    host.appendChild(
      el("div", { class: "topbar-progress glass" }, [
        el("div", { class: "topbar-progress__label" }, [
          el("span", { class: "topbar-progress__title", text: "Rapor tamamlanma durumu" }),
          el("span", { class: "topbar-progress__stat" }, [el("strong", { class: "count-roll", text: p.percent + "%" }), el("span", { text: " · " + p.done + "/" + p.total })]),
        ]),
        el("div", { class: "progress__track", role: "progressbar", "aria-valuenow": String(p.percent), "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": "Tamamlanma" }, [
          el("div", { class: "progress__fill", style: "width:" + p.percent + "%" }),
        ]),
      ])
    );
  }

  /* ==================================================================
     Adım görünümü
     ================================================================== */
  function render(opts) {
    F.resetLive();
    var tab = tabs[state.tab];
    var step = tab.steps[state.step];
    if (!stepVisible(step)) {
      var vis = visibleStepIndexes(tab);
      state.step = vis.length ? vis[0] : 0;
      step = tab.steps[state.step];
    }
    var main = document.getElementById("stepview");
    main.innerHTML = "";
    var view = el("div", { class: "step-view" });

    var vis2 = visibleStepIndexes(tab);
    var head = el("header", { class: "step-head" });
    head.appendChild(
      el("p", { class: "step-head__eyebrow" }, [
        el("span", { text: tab.label + (tab.sublabel ? " · " + tab.sublabel : "") }),
        el("span", { text: "·" }),
        el("span", { text: "Adım " + (vis2.indexOf(state.step) + 1) + "/" + vis2.length }),
        step.by ? el("span", { class: "by-badge", text: "Dolduran: " + step.by }) : null,
      ])
    );
    head.appendChild(el("h1", { class: "step-head__title", text: step.title }));
    if (step.desc) head.appendChild(el("p", { class: "step-head__desc", text: step.desc }));
    view.appendChild(head);

    if (tab.intro && state.step === vis2[0]) {
      view.appendChild(el("div", { class: "alert alert--info", style: "margin-bottom:var(--space-6)" }, [icon("info", "alert__icon"), el("div", { text: tab.intro })]));
    }

    if (step.criterion) view.appendChild(criterionToolbar(step.criterion));

    if (step.review) view.appendChild(renderReview());
    else {
      var gridBox = el("div", { class: "field-grid stagger" });
      step.fields.forEach(function (f) {
        var node = F.render(f);
        if (node) gridBox.appendChild(node);
      });
      view.appendChild(gridBox);
    }

    view.appendChild(buildActions());
    main.appendChild(view);

    buildSidebar();
    buildTopProgress();
    buildTabs();
    persistPosition();
    if (!opts || opts.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Ana ölçüt adımında alt ölçütlere hızlı geçiş ve toplu aç/kapat */
  function criterionToolbar(crit) {
    var bar = el("div", { class: "crit-toolbar glass" });
    var chips = el("div", { class: "crit-toolbar__chips" });
    crit.subs.forEach(function (sub) {
      var chip = el("a", { href: "#sc_" + R.key(sub.code), class: "sub-chip", title: sub.text }, [el("span", { text: sub.code })]);
      chip.addEventListener("click", function (e) {
        e.preventDefault();
        var c = document.getElementById("sc_" + R.key(sub.code));
        if (!c) return;
        c.open = true;
        c.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      chips.appendChild(chip);
    });
    function sync() {
      chips.querySelectorAll(".sub-chip").forEach(function (chip, i) {
        var d = R.subDecision(crit.subs[i]);
        chip.className = "sub-chip" + (d ? " sub-chip--" + d : "") + (R.isMandatory(crit.subs[i]) ? " sub-chip--mand" : "");
      });
    }
    sync();
    toolbarSync = sync;

    var openAll = el("button", { type: "button", class: "btn btn--ghost btn--sm" }, [icon("expand", "btn__icon"), document.createTextNode("Tümünü aç")]);
    openAll.addEventListener("click", function () {
      document.querySelectorAll("details.sc").forEach(function (d) {
        d.open = true;
      });
    });
    var closeAll = el("button", { type: "button", class: "btn btn--ghost btn--sm" }, [icon("collapse", "btn__icon"), document.createTextNode("Tümünü kapat")]);
    closeAll.addEventListener("click", function () {
      document.querySelectorAll("details.sc").forEach(function (d) {
        d.open = false;
      });
    });
    bar.appendChild(el("span", { class: "crit-toolbar__label", text: "Alt ölçütler" }));
    bar.appendChild(chips);
    bar.appendChild(el("span", { class: "crit-toolbar__spacer" }));
    bar.appendChild(openAll);
    bar.appendChild(closeAll);
    return bar;
  }
  var toolbarSync = null;

  function redrawKeepingFocus() {
    setTimeout(function () {
      var active = document.activeElement;
      var holder = active && active.closest ? active.closest("[data-field]") : null;
      var id = holder ? holder.getAttribute("data-field") : null;
      var y = window.scrollY;
      render({ scroll: false });
      window.scrollTo(0, y);
      if (!id) return;
      var sel = '[data-field="' + id + '"] ';
      var again = document.querySelector(sel + "input:checked, " + sel + "input, " + sel + "textarea, " + sel + "select");
      if (again) again.focus({ preventScroll: true });
    }, 0);
  }

  function refreshChrome() {
    if (toolbarSync && document.querySelector(".crit-toolbar")) toolbarSync();
    buildSidebar();
    buildTopProgress();
    buildTabs();
  }

  /* Görünürlüğü denetleyen alanlar — değiştiklerinde adım yeniden çizilir */
  var CONTROLLERS = (function () {
    var set = {};
    function note(c) {
      if (!c || typeof c === "function") return;
      if (c.all) return c.all.forEach(note);
      if (c.any) return c.any.forEach(note);
      if (c.field) set[c.field] = true;
    }
    tabs.forEach(function (tab) {
      tab.steps.forEach(function (step) {
        note(step.showIf);
        step.fields.forEach(function (f) {
          note(f.showIf);
          if (f.extras && f.id) set[f.id] = true;
        });
      });
    });
    return set;
  })();

  function controlsVisibility(field) {
    if (!field || !field.id || !CONTROLLERS[field.id]) return false;
    return ["radio", "select", "checkboxes"].indexOf(field.type) !== -1;
  }

  function buildActions() {
    var box = el("div", { class: "step-actions no-print" });
    var vis = visibleStepIndexes(tabs[state.tab]);
    var isFirst = state.tab === 0 && state.step === vis[0];
    var isLast = state.tab === tabs.length - 1 && state.step === vis[vis.length - 1];

    if (!isFirst) {
      var prev = el("button", { type: "button", class: "btn btn--secondary" }, [icon("arrowLeft", "btn__icon"), document.createTextNode("Önceki")]);
      prev.addEventListener("click", goPrev);
      box.appendChild(prev);
    }
    box.appendChild(el("div", { class: "step-actions__spacer" }));
    var saveBtn = el("button", { type: "button", class: "btn btn--ghost" }, [icon("save", "btn__icon"), document.createTextNode("Kaydet")]);
    saveBtn.addEventListener("click", function () {
      S.save();
      toast("Taslak kaydedildi.", "success");
    });
    box.appendChild(saveBtn);
    if (!isLast) {
      var next = el("button", { type: "button", class: "btn btn--primary" }, [document.createTextNode("Sonraki"), icon("arrowRight", "btn__icon")]);
      next.addEventListener("click", goNext);
      box.appendChild(next);
    } else {
      var submit = el("button", { type: "button", class: "btn btn--accent btn--lg" }, [icon("send", "btn__icon"), document.createTextNode("Raporu tamamla")]);
      submit.addEventListener("click", completeReport);
      box.appendChild(submit);
    }
    return box;
  }

  /* ==================================================================
     Önizleme
     ================================================================== */
  function renderReview() {
    var host = el("div", {});
    var p = progress();

    host.appendChild(
      el("div", { class: "alert alert--" + (p.missing === 0 ? "success" : "warning"), style: "margin-bottom:var(--space-5)" }, [
        icon(p.missing === 0 ? "check" : "info", "alert__icon"),
        el("div", {}, [
          el("div", { class: "alert__title", text: "Tamamlanma: %" + p.percent }),
          el("div", { text: p.missing === 0 ? "Tüm zorunlu alanlar dolduruldu." : p.missing + " zorunlu alan eksik. Eksik adımlar aşağıda listelenmiştir." }),
        ]),
      ])
    );

    var missing = missingSteps();
    if (missing.length) {
      var list = el("div", { class: "missing-list" });
      missing.forEach(function (m) {
        var b = el("button", { type: "button", class: "missing-item" }, [
          el("span", { class: "missing-item__tab", text: tabs[m.tab].label }),
          el("span", { class: "missing-item__title", text: tabs[m.tab].steps[m.step].short || tabs[m.tab].steps[m.step].title }),
          el("span", { class: "badge badge--warning", text: m.n + " eksik" }),
        ]);
        b.addEventListener("click", function () {
          go(m.tab, m.step);
        });
        list.appendChild(b);
      });
      host.appendChild(el("details", { class: "suggest glass no-print", open: missing.length <= 6 }, [
        el("summary", { class: "suggest__head" }, [el("span", { class: "suggest__title", text: "Eksik adımlar" }), el("span", { class: "badge badge--neutral", text: String(missing.length) })]),
        el("div", { class: "suggest__body" }, [list]),
      ]));
    }

    var actions = el("div", { class: "review-actions no-print" });
    function act(label, ic, cls, fn) {
      var b = el("button", { type: "button", class: "btn " + cls }, [icon(ic, "btn__icon"), document.createTextNode(label)]);
      b.addEventListener("click", fn);
      actions.appendChild(b);
    }
    act("Yazdır / PDF", "print", "btn--secondary", function () {
      window.print();
    });
    act("Word belgesi (.doc)", "file", "btn--secondary", function () {
      window.Report.wordFile();
      toast("Rapor Word belgesi olarak indirildi.", "success");
    });
    act("JSON", "download", "btn--secondary", function () {
      S.download();
      toast("Rapor verisi JSON olarak indirildi.", "success");
    });
    host.appendChild(actions);

    var paper = el("article", { class: "doc", html: window.Report.html() });
    host.appendChild(el("div", { class: "doc-frame" }, [paper]));
    return host;
  }

  function missingSteps() {
    var out = [];
    tabs.forEach(function (tab, ti) {
      tab.steps.forEach(function (step, si) {
        var p = stepProgress(step);
        if (p.total > p.done) out.push({ tab: ti, step: si, n: p.total - p.done });
      });
    });
    return out;
  }

  /* ==================================================================
     Gezinme
     ================================================================== */
  function visibleStepIndexes(tab) {
    var out = [];
    tab.steps.forEach(function (s, i) {
      if (stepVisible(s)) out.push(i);
    });
    return out;
  }

  function go(ti, si) {
    state.tab = Math.max(0, Math.min(ti, tabs.length - 1));
    state.step = Math.max(0, Math.min(si, tabs[state.tab].steps.length - 1));
    render();
  }

  function goNext() {
    var vis = visibleStepIndexes(tabs[state.tab]);
    var after = vis.filter(function (i) {
      return i > state.step;
    });
    if (after.length) return go(state.tab, after[0]);
    if (state.tab < tabs.length - 1) go(state.tab + 1, visibleStepIndexes(tabs[state.tab + 1])[0] || 0);
  }

  function goPrev() {
    var vis = visibleStepIndexes(tabs[state.tab]);
    var before = vis.filter(function (i) {
      return i < state.step;
    });
    if (before.length) return go(state.tab, before[before.length - 1]);
    if (state.tab > 0) {
      var pv = visibleStepIndexes(tabs[state.tab - 1]);
      go(state.tab - 1, pv[pv.length - 1] || 0);
    }
  }

  function persistPosition() {
    S.setPref("position", { tab: state.tab, step: state.step });
  }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        S.save();
        toast("Taslak kaydedildi.", "success");
      }
    });
    document.getElementById("tabbar").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var n = (state.tab + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      go(n, 0);
      var t = document.getElementById("tab_" + tabs[n].id);
      if (t) t.focus();
    });
  }

  /* ==================================================================
     Bildirim, onay, tamamlama
     ================================================================== */
  function toast(message, kind) {
    var region = document.getElementById("toasts");
    var node = el("div", { class: "toast toast--" + (kind || "info"), role: "status" }, [icon(kind === "danger" ? "alert" : "check"), el("span", { text: message })]);
    region.appendChild(node);
    setTimeout(function () {
      node.style.opacity = "0";
      node.style.transform = "translateY(6px)";
      setTimeout(function () {
        node.remove();
      }, 220);
    }, 3200);
  }

  function dialog(title, bodyNodes, buttons) {
    var dlg = document.getElementById("confirm-dialog");
    dlg.innerHTML = "";
    var footer = el("div", { class: "modal__footer" });
    buttons.forEach(function (b) {
      var btn = el("button", { type: "button", class: "btn " + b.cls, text: b.label });
      btn.addEventListener("click", function () {
        dlg.close();
        if (b.fn) b.fn();
      });
      footer.appendChild(btn);
    });
    dlg.appendChild(el("div", {}, [el("div", { class: "modal__header" }, [el("h2", { class: "modal__title", text: title })]), el("div", { class: "modal__body" }, bodyNodes), footer]));
    dlg.showModal();
  }

  function confirmReset() {
    dialog("Form sıfırlansın mı?", [el("p", { text: "Tarayıcıda kayıtlı tüm rapor verisi silinecek. Bu işlem geri alınamaz; önce JSON olarak dışa aktarmanız önerilir." })], [
      { label: "Vazgeç", cls: "btn--secondary" },
      {
        label: "Sıfırla",
        cls: "btn--danger",
        fn: function () {
          S.reset();
          state.tab = 0;
          state.step = 0;
          toast("Form sıfırlandı.", "success");
          render();
        },
      },
    ]);
  }

  function completeReport() {
    var p = progress();
    if (p.missing > 0) {
      var first = missingSteps()[0];
      return dialog("Rapor henüz tamamlanmadı", [el("p", { text: p.missing + " zorunlu alan eksik. Eksik adımlar önizleme sayfasında listelenmiştir." })], [
        { label: "Kapat", cls: "btn--secondary" },
        {
          label: "İlk eksik adıma git",
          cls: "btn--primary",
          fn: function () {
            go(first.tab, first.step);
          },
        },
      ]);
    }
    var no = S.get("_meta.reportNo");
    if (!no) {
      var d = new Date();
      no = "PAR-" + d.getFullYear() + "-" + String(Math.floor(Math.random() * 1e5)).padStart(5, "0");
      S.set("_meta.reportNo", no);
      S.set("_meta.completedAt", d.toISOString());
    }
    var a = R.accreditation();
    dialog("Rapor tamamlandı", [
      el("div", { class: "completion" }, [
        el("span", { class: "completion__mark" }, [icon("check")]),
        el("p", { class: "completion__lead", text: "Tüm zorunlu alanlar dolduruldu." }),
        el("div", { class: "completion__no" }, [el("span", { class: "completion__no-label", text: "Rapor no" }), el("strong", { class: "completion__no-value", text: no })]),
        el("p", { class: "completion__note", text: "Takımın karar önerisi: " + ({ akreditasyon: "Akreditasyon", red: "Akreditasyonun reddi" }[S.get("summary.decision")] || "—") + (a.suggested ? " · Kurallara göre: " + (a.suggested === "akreditasyon" ? "Akreditasyon" : "Akreditasyonun reddi") : "") }),
      ]),
    ], [
      { label: "Kapat", cls: "btn--secondary" },
      { label: "JSON indir", cls: "btn--secondary", fn: function () {
        S.download();
      } },
      { label: "Word belgesi indir", cls: "btn--primary", fn: function () {
        window.Report.wordFile();
      } },
    ]);
  }

  /* ==================================================================
     Cam yüzeyler için imleç takibi ve buton dalgası
     ================================================================== */
  document.addEventListener("pointermove", function (e) {
    var target = e.target.closest ? e.target.closest(".glass") : null;
    if (!target) return;
    var r = target.getBoundingClientRect();
    target.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    target.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  }, { passive: true });

  document.addEventListener("pointerdown", function (e) {
    var btn = e.target.closest ? e.target.closest(".btn") : null;
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size / 2 + "px";
    ripple.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 400);
  }, { passive: true });

  window.addEventListener("beforeunload", function () {
    S.save();
  });

  window.App = {
    goTo: function (where) {
      var ti = -1;
      tabs.forEach(function (t, i) {
        if (t.id === where.tab) ti = i;
      });
      if (ti < 0) return false;
      var si = 0;
      tabs[ti].steps.forEach(function (s, k) {
        if (s.id === where.step) si = k;
      });
      go(ti, si);
      return true;
    },
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
