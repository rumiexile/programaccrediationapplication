/* ==========================================================================
   Fields — alan render motoru
   Şemadaki her alan türü için DOM üretir, Store ile iki yönlü bağlar ve
   ilerleme hesabı için alanın "birim" sayısını (doldurulan / toplam) verir.
   ========================================================================== */

window.Fields = (function () {
  "use strict";

  var S = window.Store;
  var R = window.Rules;
  var T = window.TEMPLATE;
  var C = window.CRITERIA;

  /* ------------------------------------------------------------------
     DOM yardımcıları
     ------------------------------------------------------------------ */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2).toLowerCase(), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0z"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    expand: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    collapse: '<path d="m7 20 5-5 5 5M7 4l5 5 5-5"/>',
  };

  function icon(name, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    if (cls) svg.setAttribute("class", cls);
    svg.innerHTML = ICONS[name] || "";
    return svg;
  }

  function safeId(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
  }

  function isEmpty(v) {
    if (v === null || v === undefined) return true;
    if (typeof v === "string") return v.trim() === "";
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === "object") return Object.keys(v).length === 0;
    return false;
  }

  /* ------------------------------------------------------------------
     Değişiklik bildirimi
     Canlı göstergeler (kart başlığı, ana ölçüt paneli, özet tabloları)
     her çizimde yeniden kaydolur; her değişiklikte hepsi tazelenir.
     ------------------------------------------------------------------ */
  var onDirty = function () {};
  var liveFns = [];

  function live(fn) {
    liveFns.push(fn);
    fn();
  }

  function notify(field) {
    liveFns.forEach(function (fn) {
      try {
        fn();
      } catch (e) {
        /* bir göstergenin hatası diğerlerini durdurmasın */
      }
    });
    onDirty(field);
  }

  function put(field, value) {
    S.set(field.id, value);
    notify(field);
  }

  /* ------------------------------------------------------------------
     Görünürlük — showIf
     { field, eq } | { field, in: [] } | { field, has } | { all: [] } | fn
     ------------------------------------------------------------------ */
  function visible(node) {
    var c = node && node.showIf;
    if (!c) return true;
    return test(c);
  }

  function test(c) {
    if (typeof c === "function") return !!c(S);
    if (c.all) return c.all.every(test);
    if (c.any) return c.any.some(test);
    var v = S.get(c.field);
    if ("eq" in c) return v === c.eq;
    if ("in" in c) return c.in.indexOf(v) !== -1;
    if ("has" in c) return Array.isArray(v) && v.indexOf(c.has) !== -1;
    if ("hasAny" in c)
      return Array.isArray(v) && c.hasAny.some(function (x) {
        return v.indexOf(x) !== -1;
      });
    return !isEmpty(v);
  }

  /* ------------------------------------------------------------------
     Ortak alan sarmalayıcı
     ------------------------------------------------------------------ */
  function wrap(field, control, opts) {
    opts = opts || {};
    var cls = "field" + (field.half ? "" : " field--full") + (field.compact ? " field--compact" : "");
    var box = el("div", { class: cls, "data-field": field.id || null });

    if (field.label && !opts.noLabel) {
      var label = el(opts.legend ? "span" : "label", {
        class: "field__label",
        for: opts.legend ? null : "f_" + safeId(field.id),
      });
      label.appendChild(document.createTextNode(field.label));
      if (field.required) {
        label.appendChild(el("span", { class: "field__required", text: "*", "aria-hidden": "true" }));
        label.appendChild(el("span", { class: "sr-only", text: " (zorunlu)" }));
      } else if (!field.noOptional) {
        label.appendChild(el("span", { class: "field__optional", text: "isteğe bağlı" }));
      }
      box.appendChild(label);
    }

    if (field.hint) box.appendChild(el("p", { class: "field__hint", text: field.hint }));
    box.appendChild(control);
    return box;
  }

  /* ------------------------------------------------------------------
     Temel kontroller
     ------------------------------------------------------------------ */
  function input(field) {
    var attrs = {
      class: "input",
      id: "f_" + safeId(field.id),
      type: field.type === "number" ? "number" : field.type,
      placeholder: field.placeholder || null,
      inputmode: field.type === "number" ? "decimal" : null,
      min: field.min !== undefined ? String(field.min) : null,
      step: field.step || null,
    };
    var node = el("input", attrs);
    node.value = S.get(field.id, "") || "";
    node.addEventListener("input", function () {
      put(field, node.value);
    });
    if (!field.suffix) return wrap(field, node);
    return wrap(field, el("div", { class: "input-affix" }, [node, el("span", { class: "input-affix__suffix", text: field.suffix })]));
  }

  function textarea(field) {
    var ta = el("textarea", {
      class: "textarea" + (field.large ? " textarea--lg" : ""),
      id: "f_" + safeId(field.id),
      rows: String(field.rows || (field.large ? 7 : 4)),
      placeholder: field.placeholder || null,
    });
    ta.value = S.get(field.id, "") || "";
    var counter = el("div", { class: "field__counter" });
    function count() {
      var n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      counter.textContent = n ? n + " sözcük · " + ta.value.length + " karakter" : "";
    }
    count();
    ta.addEventListener("input", function () {
      count();
      put(field, ta.value);
    });
    var box = wrap(field, ta);
    box.appendChild(counter);
    return box;
  }

  function select(field) {
    var sel = el("select", { class: "select", id: "f_" + safeId(field.id) });
    sel.appendChild(el("option", { value: "", text: "Seçiniz…" }));
    (field.options || []).forEach(function (o) {
      sel.appendChild(el("option", { value: o.value, text: o.label }));
    });
    sel.value = S.get(field.id, "") || "";
    sel.addEventListener("change", function () {
      put(field, sel.value);
    });
    return wrap(field, sel);
  }

  /** Radyo ve onay kutuları; "other" seçeneği satır içi metin alanı açar */
  function choices(field, multi) {
    var group = el("div", {
      class: "choice-group" + (field.stack ? "" : " choice-group--row"),
      role: multi ? "group" : "radiogroup",
      "aria-label": field.label || null,
    });
    var name = "f_" + safeId(field.id);
    var cur = S.get(field.id, multi ? [] : "");

    (field.options || []).forEach(function (o, i) {
      var checked = multi ? (cur || []).indexOf(o.value) !== -1 : cur === o.value;
      var inp = el("input", {
        type: multi ? "checkbox" : "radio",
        name: name,
        id: name + "_" + i,
        value: o.value,
      });
      inp.checked = checked;
      inp.addEventListener("change", function () {
        if (multi) {
          var now = (S.get(field.id, []) || []).slice();
          if (inp.checked) {
            if (now.indexOf(o.value) === -1) now.push(o.value);
          } else
            now = now.filter(function (x) {
              return x !== o.value;
            });
          put(field, now);
        } else put(field, o.value);
      });
      group.appendChild(
        el("label", { class: "choice" + (o.tone ? " choice--" + o.tone : "") }, [
          inp,
          el("span", { class: "choice__body" }, [
            el("span", { class: "choice__label", text: o.label }),
            o.desc ? el("span", { class: "choice__desc", text: o.desc }) : null,
          ]),
        ])
      );
    });

    var box = wrap(field, group, { legend: true });

    // Seçimi kaldırılabilen radyo (ör. bütüncül karar boşsa öneri geçerli)
    if (field.clearable && !multi) {
      var clear = el("button", { type: "button", class: "btn btn--ghost btn--sm choice-clear" }, [icon("x", "btn__icon"), document.createTextNode("Seçimi kaldır, öneriyi kullan")]);
      clear.hidden = !cur;
      clear.addEventListener("click", function () {
        group.querySelectorAll("input").forEach(function (i) {
          i.checked = false;
        });
        clear.hidden = true;
        put(field, null);
      });
      group.addEventListener("change", function () {
        clear.hidden = false;
      });
      box.appendChild(clear);
    }

    // Seçeneğe bağlı ek metin alanları (ör. "Diğer: ……", "puan türü: ……")
    (field.extras || []).forEach(function (x) {
      var show = multi ? (cur || []).indexOf(x.when) !== -1 : cur === x.when;
      if (!show) return;
      var inp = el("input", { class: "input", type: "text", placeholder: x.placeholder || "", "aria-label": x.label });
      inp.value = S.get(x.id, "") || "";
      inp.addEventListener("input", function () {
        S.set(x.id, inp.value);
        notify({ id: x.id, type: "text" });
      });
      box.appendChild(el("div", { class: "choice-extra" }, [el("span", { class: "choice-extra__label", text: x.label }), inp]));
    });
    return box;
  }

  /* ------------------------------------------------------------------
     Kanıt listesi — belge adı, sürüm/tür, bağlantı
     Şablondaki örnekler tek tıkla satır olarak eklenir.
     ------------------------------------------------------------------ */
  var EVIDENCE_KINDS = {
    formal: [
      { value: "yururlukte", label: "Yürürlükte" },
      { value: "taslak", label: "Taslak" },
    ],
    team: [
      { value: "yururlukte", label: "Belge · yürürlükte" },
      { value: "taslak", label: "Belge · taslak" },
      { value: "gorusme", label: "Görüşme" },
      { value: "inceleme", label: "Yerinde inceleme" },
    ],
  };

  function evidenceList(field) {
    var kinds = EVIDENCE_KINDS[field.kinds || "formal"];
    var holder = el("div", { class: "evlist" });
    var rowsBox = el("div", { class: "evlist__rows" });
    var exBox = el("div", { class: "ex-chips" });

    function rows() {
      return (S.get(field.id, []) || []).slice();
    }
    function save(next) {
      put(field, next);
    }

    function drawRows() {
      rowsBox.innerHTML = "";
      var data = rows();
      if (!data.length) {
        rowsBox.appendChild(el("p", { class: "evlist__empty", text: "Henüz kanıt eklenmedi. Aşağıdaki örneklerden seçebilir ya da yeni satır ekleyebilirsiniz." }));
      }
      data.forEach(function (row, idx) {
        var name = el("input", { class: "input", type: "text", placeholder: "Belge / kanıt adı", "aria-label": "Kanıt adı " + (idx + 1) });
        name.value = row.name || "";
        name.addEventListener("input", function () {
          var d = rows();
          d[idx].name = name.value;
          S.set(field.id, d);
          notify(field);
        });
        name.addEventListener("change", drawExamples);

        var kind = el("select", { class: "select", "aria-label": "Sürüm / tür" });
        kinds.forEach(function (k) {
          kind.appendChild(el("option", { value: k.value, text: k.label }));
        });
        kind.value = row.kind || kinds[0].value;
        kind.addEventListener("change", function () {
          var d = rows();
          d[idx].kind = kind.value;
          save(d);
        });

        var url = el("input", { class: "input", type: "url", placeholder: "Bağlantı / referans (isteğe bağlı)", "aria-label": "Bağlantı" });
        url.value = row.url || "";
        url.addEventListener("input", function () {
          var d = rows();
          d[idx].url = url.value;
          S.set(field.id, d);
        });

        var del = el("button", { type: "button", class: "btn btn--ghost btn--icon", title: "Kaldır", "aria-label": "Kanıtı kaldır" }, [icon("trash", "btn__icon")]);
        del.addEventListener("click", function () {
          var d = rows();
          d.splice(idx, 1);
          save(d);
          drawRows();
          drawExamples();
        });

        rowsBox.appendChild(el("div", { class: "evrow" }, [el("span", { class: "evrow__no", text: String(idx + 1) }), name, kind, url, del]));
      });
    }

    function drawExamples() {
      exBox.innerHTML = "";
      var ex = field.examples || [];
      if (!ex.length) return;
      var have = rows().map(function (r) {
        return (r.name || "").trim().toLocaleLowerCase("tr");
      });
      exBox.appendChild(el("span", { class: "ex-chips__label", text: field.examplesLabel || "Örnekler" }));
      ex.forEach(function (name) {
        var on = have.indexOf(name.toLocaleLowerCase("tr")) !== -1;
        var chip = el("button", { type: "button", class: "ex-chip" + (on ? " ex-chip--on" : ""), "aria-pressed": on ? "true" : "false", disabled: on ? true : null }, [
          icon(on ? "check" : "plus"),
          el("span", { text: name }),
        ]);
        chip.addEventListener("click", function () {
          var d = rows();
          d.push({ name: name, kind: kinds[0].value, url: "" });
          save(d);
          drawRows();
          drawExamples();
        });
        exBox.appendChild(chip);
      });
    }

    var add = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [icon("plus", "btn__icon"), document.createTextNode("Kanıt ekle")]);
    add.addEventListener("click", function () {
      var d = rows();
      d.push({ name: "", kind: kinds[0].value, url: "" });
      save(d);
      drawRows();
      var inputs = rowsBox.querySelectorAll(".evrow input[type=text]");
      if (inputs.length) inputs[inputs.length - 1].focus();
    });

    drawRows();
    drawExamples();
    holder.appendChild(rowsBox);
    holder.appendChild(el("div", { class: "evlist__bar" }, [add]));
    holder.appendChild(exBox);
    return wrap(field, holder, { legend: true });
  }

  /* ------------------------------------------------------------------
     Genel tekrarlayıcı (ör. değerlendirme takımı, eksiklikler)
     ------------------------------------------------------------------ */
  function repeater(field) {
    var list = el("div", { class: "repeater" });
    function rows() {
      return (S.get(field.id, []) || []).slice();
    }
    function draw() {
      list.innerHTML = "";
      var data = rows();
      if (!data.length) list.appendChild(el("div", { class: "repeater__empty", text: field.emptyText || "Henüz kayıt eklenmedi." }));
      data.forEach(function (row, idx) {
        var item = el("div", { class: "repeater__item" });
        var del = el("button", { type: "button", class: "btn btn--ghost btn--icon repeater__remove", "aria-label": "Kaldır" }, [icon("trash", "btn__icon")]);
        del.addEventListener("click", function () {
          var d = rows();
          d.splice(idx, 1);
          put(field, d);
          draw();
        });
        item.appendChild(
          el("div", { class: "repeater__item-head" }, [el("span", { class: "repeater__item-index", text: (field.itemLabel || "Kayıt") + " " + (idx + 1) }), del])
        );
        var grid = el("div", { class: "repeater__grid" });
        field.itemFields.forEach(function (sub) {
          var sid = "f_" + safeId(field.id) + "_" + idx + "_" + sub.id;
          var control;
          if (sub.type === "textarea") control = el("textarea", { class: "textarea", id: sid, rows: String(sub.rows || 3) });
          else if (sub.type === "select") {
            control = el("select", { class: "select", id: sid });
            control.appendChild(el("option", { value: "", text: "Seçiniz…" }));
            (typeof sub.options === "function" ? sub.options() : sub.options).forEach(function (o) {
              control.appendChild(el("option", { value: o.value, text: o.label }));
            });
          } else control = el("input", { class: "input", id: sid, type: sub.type || "text", placeholder: sub.placeholder || "" });
          control.value = row[sub.id] || "";
          control.addEventListener(sub.type === "select" ? "change" : "input", function () {
            var d = rows();
            d[idx][sub.id] = control.value;
            S.set(field.id, d);
            notify(field);
          });
          grid.appendChild(
            el("div", { class: "field field--inline" + (sub.wide ? " field--wide" : "") }, [el("label", { class: "field__label", for: sid, text: sub.label }), control])
          );
        });
        item.appendChild(grid);
        list.appendChild(item);
      });
    }
    var add = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [icon("plus", "btn__icon"), document.createTextNode(field.addLabel || "Ekle")]);
    add.addEventListener("click", function () {
      var d = rows();
      var blank = {};
      field.itemFields.forEach(function (s) {
        blank[s.id] = "";
      });
      d.push(blank);
      put(field, d);
      draw();
    });
    draw();
    var holder = el("div", {}, [list, el("div", { class: "evlist__bar" }, [add])]);
    return wrap(field, holder, { legend: true });
  }

  /* ------------------------------------------------------------------
     Bilgi kutuları ve başlıklar
     ------------------------------------------------------------------ */
  function info(field) {
    var body = el("div", {}, [
      field.title ? el("div", { class: "alert__title", text: field.title }) : null,
      field.text ? el("div", { text: field.text }) : null,
      field.bullets ? el("ul", { class: "alert__list" }, field.bullets.map(function (b) {
        return el("li", { text: b });
      })) : null,
    ]);
    return el("div", { class: "alert alert--" + (field.tone || "info") }, [icon(field.icon || "info", "alert__icon"), body]);
  }

  function heading(field) {
    return el("div", { class: "section field--full" }, [
      el("h2", { class: "section__title", text: field.text }),
      field.desc ? el("p", { class: "section__desc", text: field.desc }) : null,
    ]);
  }

  /** "TYÇ değeri / Programdaki durum" karşılaştırma kutusu */
  function compare(field) {
    var box = el("div", { class: "compare field--full" });
    [
      { id: field.id + ".tycValue", label: "TYÇ değeri", ph: field.tyc },
      { id: field.id + ".programValue", label: "Programdaki durum", ph: "Programın değeri" },
    ].forEach(function (c, i) {
      var ta = el("textarea", { class: "textarea", rows: "2", id: "f_" + safeId(c.id), placeholder: c.ph });
      ta.value = S.get(c.id, "") || "";
      ta.addEventListener("input", function () {
        S.set(c.id, ta.value);
        notify({ id: c.id, type: "textarea" });
      });
      box.appendChild(
        el("div", { class: "compare__col" + (i ? " compare__col--program" : "") }, [
          el("label", { class: "compare__label", for: "f_" + safeId(c.id) }, [
            document.createTextNode(c.label),
            el("span", { class: "field__required", text: "*" }),
          ]),
          i === 0 ? el("p", { class: "compare__hint", text: field.tyc }) : null,
          ta,
        ])
      );
    });
    return box;
  }

  /* ------------------------------------------------------------------
     Eşleştirme matrisi — TYÇ kazanımları / anahtar yetkinlikler
     ------------------------------------------------------------------ */
  function matrix(field) {
    var holder = el("div", { class: "matrix" });
    var base = field.rows;
    function extra() {
      return (S.get(field.id + ".extra", []) || []).slice();
    }
    function draw() {
      holder.innerHTML = "";
      var table = el("table", { class: "table matrix__table" });
      table.appendChild(
        el("thead", {}, [
          el("tr", {}, [
            el("th", { text: "#" }),
            el("th", { text: field.rowLabel }),
            el("th", { text: field.linkLabel }),
            el("th", { class: "matrix__yn", text: "Karşılanıyor" }),
          ]),
        ])
      );
      var tb = el("tbody");
      var all = base.map(function (txt, i) {
        return { text: txt, key: String(i), fixed: true };
      });
      extra().forEach(function (txt, i) {
        all.push({ text: txt, key: "x" + i, fixed: false, xi: i });
      });
      all.forEach(function (row, n) {
        var p = field.id + ".rows." + row.key;
        var txtCell;
        if (row.fixed) txtCell = el("td", { class: "matrix__text", text: row.text });
        else {
          var ti = el("textarea", { class: "textarea", rows: "2", placeholder: "Tür belirleyicideki öğrenme kazanımı", "aria-label": "Kazanım " + (n + 1) });
          ti.value = row.text;
          ti.addEventListener("input", function () {
            var d = extra();
            d[row.xi] = ti.value;
            S.set(field.id + ".extra", d);
          });
          var rm = el("button", { type: "button", class: "btn btn--ghost btn--sm", "aria-label": "Satırı kaldır" }, [icon("trash", "btn__icon")]);
          rm.addEventListener("click", function () {
            var d = extra();
            d.splice(row.xi, 1);
            S.set(field.id + ".extra", d);
            // kaldırılan satırdan sonraki işaretleri bir yukarı kaydır
            var rows = S.get(field.id + ".rows", {}) || {};
            for (var j = row.xi; j < d.length + 1; j++) rows["x" + j] = rows["x" + (j + 1)];
            delete rows["x" + d.length];
            S.set(field.id + ".rows", rows);
            notify(field);
            draw();
          });
          txtCell = el("td", { class: "matrix__text" }, [el("div", { class: "matrix__edit" }, [ti, rm])]);
        }
        var link = el("input", { class: "input input--sm", type: "text", placeholder: field.linkPlaceholder, "aria-label": field.linkLabel + " " + (n + 1) });
        link.value = S.get(p + ".link", "") || "";
        link.addEventListener("input", function () {
          S.set(p + ".link", link.value);
        });
        tb.appendChild(el("tr", {}, [el("td", { class: "matrix__no", text: String(n + 1) }), txtCell, el("td", { class: "matrix__link" }, [link]), el("td", { class: "matrix__yn" }, [yesNo(p + ".met", field)])]));
      });
      table.appendChild(tb);
      holder.appendChild(el("div", { class: "table-wrap" }, [table]));
      if (field.allowExtra) {
        var add = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [icon("plus", "btn__icon"), document.createTextNode("Kazanım satırı ekle")]);
        add.addEventListener("click", function () {
          var d = extra();
          d.push("");
          S.set(field.id + ".extra", d);
          notify(field);
          draw();
        });
        holder.appendChild(el("div", { class: "evlist__bar" }, [add]));
      }
    }
    draw();
    return wrap(field, holder, { legend: true });
  }

  /** E / H — Var / Yok gibi ikili segment */
  function yesNo(path, field, labels) {
    labels = labels || [
      { v: "E", t: "E", tone: "yes", aria: "Evet" },
      { v: "H", t: "H", tone: "no", aria: "Hayır" },
    ];
    var seg = el("div", { class: "yn", role: "radiogroup" });
    function sync() {
      var cur = S.get(path);
      seg.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-checked", b.getAttribute("data-v") === cur ? "true" : "false");
      });
    }
    labels.forEach(function (l) {
      var b = el("button", { type: "button", role: "radio", class: "yn__btn yn__btn--" + l.tone, "data-v": l.v, "aria-label": l.aria || l.t, text: l.t });
      b.addEventListener("click", function () {
        S.set(path, S.get(path) === l.v ? null : l.v);
        sync();
        notify(field);
      });
      seg.appendChild(b);
    });
    sync();
    return seg;
  }

  /* ------------------------------------------------------------------
     Bölüm 3 — alt ölçüt kartı
     ------------------------------------------------------------------ */
  var DECISIONS = [
    { value: "met", label: "Karşılanıyor", tone: "success" },
    { value: "notmet", label: "Karşılanmıyor", tone: "danger" },
    { value: "na", label: "Kapsam dışı", tone: "neutral" },
  ];
  var DECISION_LABEL = { met: "Karşılanıyor", notmet: "Karşılanmıyor", na: "Kapsam dışı" };
  var DECISION_TONE = { met: "success", notmet: "danger", na: "neutral" };

  // Açık kartlar çizimler arasında korunur
  var openCards = {};

  function subcrit(field) {
    var sub = field.sub;
    var k = R.key(sub.code);
    var base = "crit." + k;
    var card = el("details", { class: "sc glass", id: "sc_" + k });
    if (openCards[k]) card.open = true;
    card.addEventListener("toggle", function () {
      openCards[k] = card.open;
    });

    /* --- başlık --- */
    var status = el("span", { class: "sc__status" });
    var meter = el("span", { class: "sc__meter" });
    var mandBadge = el("span", { class: "sc__mand" });
    var head = el("summary", { class: "sc__head" }, [
      el("span", { class: "sc__code", text: sub.code }),
      el("span", { class: "sc__title-wrap" }, [el("span", { class: "sc__title", text: sub.text }), el("span", { class: "sc__meta" }, [mandBadge, meter])]),
      status,
    ]);
    card.appendChild(head);

    function refreshHead() {
      var d = R.subDecision(sub);
      var tally = R.indicatorTally(sub);
      status.className = "sc__status badge badge--" + (d ? DECISION_TONE[d] : "neutral") + (d ? "" : " sc__status--pending");
      status.textContent = d ? DECISION_LABEL[d] : "Karar bekliyor";
      meter.textContent = "Göstergeler " + tally.var + " var · " + tally.yok + " yok" + (tally.open ? " · " + tally.open + " açık" : "");
      var m = R.isMandatory(sub);
      var open = R.mandatoryOpen(sub);
      mandBadge.className = "sc__mand badge " + (open ? "badge--warning" : m ? "badge--brand" : "badge--neutral");
      mandBadge.textContent = open ? "Zorunluluk belirlenmedi" : m ? "Zorunlu" : "Zorunlu değil";
      card.setAttribute("data-decision", d || "");
    }
    live(refreshHead);

    /* --- gövde --- */
    var body = el("div", { class: "sc__body" });

    // Kimlik satırı: zorunluluk ve rubrik
    var meta = el("div", { class: "sc__facts" });
    var mandBox = el("div", { class: "sc__fact" }, [el("span", { class: "sc__fact-label", text: "Zorunlu alt ölçüt" })]);
    if (sub.mandatory === null) {
      mandBox.appendChild(
        yesNo(base + ".mandatory", field, [
          { v: "evet", t: "Evet", tone: "brand" },
          { v: "hayir", t: "Hayır", tone: "neutral" },
        ])
      );
      mandBox.appendChild(el("span", { class: "sc__fact-note", text: "Şablon taslağında belirlenmemiştir." }));
    } else mandBox.appendChild(el("strong", { class: "sc__fact-value", text: sub.mandatory ? "Evet" : "Hayır" }));
    meta.appendChild(mandBox);
    meta.appendChild(
      el("div", { class: "sc__fact" }, [
        el("span", { class: "sc__fact-label", text: "YÖKAK rubrik ilişkilendirmesi" }),
        el("span", { class: "sc__rubric" }, sub.rubric.map(function (r) {
          return el("span", { class: "rubric-chip", text: r });
        })),
      ])
    );
    body.appendChild(meta);

    // Göstergeler
    var ind = el("table", { class: "table ind-table" });
    ind.appendChild(el("thead", {}, [el("tr", {}, [el("th", { text: "#" }), el("th", { text: "Gösterge" }), el("th", { class: "ind-table__yn", text: "Var / Yok" })])]));
    var tb = el("tbody");
    sub.indicators.forEach(function (txt, i) {
      tb.appendChild(
        el("tr", {}, [
          el("td", { class: "ind-table__no", text: String(i + 1) }),
          el("td", { text: txt }),
          el("td", { class: "ind-table__yn" }, [
            yesNo(base + ".ind." + i, field, [
              { v: "var", t: "Var", tone: "yes" },
              { v: "yok", t: "Yok", tone: "no" },
            ]),
          ]),
        ])
      );
    });
    ind.appendChild(tb);
    body.appendChild(el("div", { class: "sc__block" }, [el("h3", { class: "sc__h", text: "Göstergeler" }), el("div", { class: "table-wrap" }, [ind])]));

    // Beklenen kanıt örnekleri → tıklanabilir öneriler
    var examples = sub.evidence
      .replace(/\.$/, "")
      .split(/,\s*/)
      .map(function (s) {
        return s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);
      });

    var subFields = [
      {
        type: "evidence",
        id: base + ".evidence",
        kinds: "team",
        label: "Kanıtlar",
        hint: "Değerlendirmede atıf yapılan belgeler ve sürümleri; yerinde ziyarette yapılan görüşmeler ve incelemeler.",
        examples: examples,
        examplesLabel: "Beklenen kanıt örnekleri (yol göstericidir; ne bağlayıcı ne de eksiksizdir)",
        required: true,
      },
      {
        type: "textarea",
        id: base + ".status",
        label: "Durum",
        hint: "Öz değerlendirme raporundan birebir alınan ifadeler tırnak içinde belirtilir.",
        required: true,
      },
      {
        type: "textarea",
        id: base + ".assessment",
        label: "Değerlendirme: güçlü yönler ve gelişmeye açık alanlar",
        required: true,
      },
    ];
    subFields.forEach(function (f) {
      body.appendChild(render(f));
    });

    // Karar
    var decisionBox = el("div", { class: "sc__decision" });
    var suggestion = el("p", { class: "sc__suggest" });
    function refreshSuggestion() {
      var t = R.indicatorTally(sub);
      if (t.open) {
        suggestion.hidden = true;
        return;
      }
      suggestion.hidden = false;
      suggestion.innerHTML = "";
      suggestion.appendChild(icon("sparkle"));
      suggestion.appendChild(
        document.createTextNode(
          t.yok === 0
            ? "Tüm göstergeler “var” olarak işaretlendi."
            : t.yok + " gösterge “yok” olarak işaretlendi; karar verirken gerekçelendiriniz."
        )
      );
    }
    live(refreshSuggestion);
    decisionBox.appendChild(
      render({
        type: "radio",
        id: base + ".decision",
        label: "Alt ölçüt kararı",
        required: true,
        options: DECISIONS,
        hint: sub.code === "1.6" ? "Bu alt ölçüt staj ve uygulamalı eğitimin olduğu programlar için geçerlidir; değilse “Kapsam dışı” seçiniz." : null,
      })
    );
    decisionBox.appendChild(suggestion);
    body.appendChild(decisionBox);

    var reasonField = {
      type: "textarea",
      id: base + ".reason",
      label: "Gerekçe ve öneriler",
      hint: "Karşılanmıyorsa gerekçe; uygulanabilirse değerlendirme takımının önerileri. Kapsam dışı bırakıldıysa nedeni.",
      rows: 3,
    };
    var reasonNode = render(reasonField);
    live(function () {
      var d = R.subDecision(sub);
      var req = d === "notmet" || d === "na";
      reasonNode.classList.toggle("field--needed", req);
      var lab = reasonNode.querySelector(".field__optional, .field__required");
      if (lab) {
        lab.className = req ? "field__required" : "field__optional";
        lab.textContent = req ? "*" : "isteğe bağlı";
      }
    });
    body.appendChild(reasonNode);

    card.appendChild(body);
    return card;
  }

  function subcritUnits(sub) {
    var k = R.key(sub.code);
    var base = "crit." + k;
    var d = R.subDecision(sub);
    if (d === "na") {
      return { done: 1 + (isEmpty(S.get(base + ".reason")) ? 0 : 1), total: 2 };
    }
    var t = R.indicatorTally(sub);
    var total = t.total + 4;
    var done = t.var + t.yok;
    if (d) done++;
    if (!isEmpty(S.get(base + ".status"))) done++;
    if (!isEmpty(S.get(base + ".assessment"))) done++;
    if (evidenceFilled(S.get(base + ".evidence"))) done++;
    if (sub.mandatory === null) {
      total++;
      if (S.get(base + ".mandatory")) done++;
    }
    if (d === "notmet") {
      total++;
      if (!isEmpty(S.get(base + ".reason"))) done++;
    }
    return { done: done, total: total };
  }

  function evidenceFilled(v) {
    return (v || []).some(function (r) {
      return r && !isEmpty(r.name);
    });
  }

  /* ------------------------------------------------------------------
     Ana ölçüt sonucu paneli
     ------------------------------------------------------------------ */
  function mainResult(field) {
    var crit = field.crit;
    var panel = el("section", { class: "result glass field--full" });
    var tableHost = el("div", {});
    var kpis = el("div", { class: "result__kpis" });
    var verdict = el("div", { class: "result__verdict" });

    panel.appendChild(
      el("header", { class: "result__head" }, [
        el("span", { class: "result__eyebrow", text: "Ana ölçüt " + crit.no }),
        el("h2", { class: "result__title", text: "Ana ölçüt sonucu" }),
      ])
    );
    panel.appendChild(kpis);
    panel.appendChild(tableHost);
    panel.appendChild(verdict);

    function draw() {
      var m = R.main(crit);
      tableHost.innerHTML = "";
      var tbl = el("table", { class: "table result__table" });
      tbl.appendChild(el("thead", {}, [el("tr", {}, [el("th", { text: "Alt ölçüt" }), el("th", { text: "Zorunlu" }), el("th", { text: "Karar" })])]));
      var tb = el("tbody");
      crit.subs.forEach(function (sub) {
        var d = R.subDecision(sub);
        var go = el("a", { href: "#sc_" + R.key(sub.code), class: "result__link", text: sub.code });
        go.addEventListener("click", function (e) {
          e.preventDefault();
          var c = document.getElementById("sc_" + R.key(sub.code));
          if (c) {
            c.open = true;
            c.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
        tb.appendChild(
          el("tr", { class: d === "notmet" && R.isMandatory(sub) ? "result__row--fail" : null }, [
            el("td", {}, [go, el("span", { class: "result__sub-text", text: sub.text })]),
            el("td", { text: R.mandatoryOpen(sub) ? "?" : R.isMandatory(sub) ? "Zorunlu" : "—" }),
            el("td", {}, [el("span", { class: "badge badge--" + (d ? DECISION_TONE[d] : "neutral"), text: d ? DECISION_LABEL[d] : "Bekliyor" })]),
          ])
        );
      });
      tbl.appendChild(tb);
      tableHost.appendChild(el("div", { class: "table-wrap" }, [tbl]));

      kpis.innerHTML = "";
      var pct = m.ratio === null ? "—" : "%" + Math.round(m.ratio * 100);
      [
        ["Karşılanan", m.met + " / " + m.applicable],
        ["Oran", pct],
        ["Kapsam dışı", String(m.na)],
        ["Bekleyen", String(m.pending)],
      ].forEach(function (k) {
        kpis.appendChild(el("div", { class: "kpi" }, [el("span", { class: "kpi__label", text: k[0] }), el("strong", { class: "kpi__value", text: k[1] })]));
      });

      verdict.innerHTML = "";
      var sugg = m.suggested;
      verdict.appendChild(
        el("div", { class: "verdict verdict--" + (sugg ? R.RESULT_TONE[sugg] : "pending") }, [
          icon(sugg ? "scale" : "info", "verdict__icon"),
          el("div", {}, [
            el("div", { class: "verdict__label", text: "Kurallara göre önerilen sonuç" }),
            el("div", { class: "verdict__value", text: sugg ? R.RESULT_LABEL[sugg] : "Tüm alt ölçüt kararları verilince hesaplanır" }),
            m.mandatoryFail.length
              ? el("div", { class: "verdict__note", text: "Zorunlu alt ölçüt karşılanmıyor: " + m.mandatoryFail.join(", ") + " — diğer alt ölçütler karşılansa bile uyumsuz sayılır (Bölüm 6)." })
              : el("div", { class: "verdict__note", text: "%90 ve üzeri uyumlu · %30–90 kısmen uyumlu · %30’un altı uyumsuz." }),
          ]),
        ])
      );
    }
    live(draw);

    panel.appendChild(
      render({
        type: "radio",
        id: "critMain." + crit.no + ".override",
        label: "Ana ölçüt sonucu (bütüncül karar)",
        hint: "Boş bırakılırsa önerilen sonuç esas alınır. Öneriden farklı bir sonuç seçerseniz bütüncül gerekçede açıklayınız.",
        options: [
          { value: "uyumlu", label: "Uyumlu" },
          { value: "kismen", label: "Kısmen uyumlu" },
          { value: "uyumsuz", label: "Uyumsuz" },
        ],
        clearable: true,
      })
    );
    panel.appendChild(render({ type: "textarea", id: "critMain." + crit.no + ".rationale", label: "Bütüncül gerekçe", required: true, rows: 5 }));
    return panel;
  }

  /* ------------------------------------------------------------------
     5.1 Program verileri tablosu — son üç yıl + otomatik ortalama
     ------------------------------------------------------------------ */
  function dataTable(field) {
    var holder = el("div", { class: "datatable" });
    var tbl = el("table", { class: "table datatable__table" });
    var headRow = el("tr", {}, [el("th", { text: "Gösterge" })]);
    [0, 1, 2].forEach(function (i) {
      var inp = el("input", { class: "input input--sm datatable__year", type: "text", placeholder: "20…-20…", "aria-label": (i + 1) + ". eğitim-öğretim yılı" });
      inp.value = S.get("data.years." + i, "") || "";
      inp.addEventListener("input", function () {
        S.set("data.years." + i, inp.value);
      });
      headRow.appendChild(el("th", {}, [inp]));
    });
    headRow.appendChild(el("th", { text: "Ortalama" }));
    tbl.appendChild(el("thead", {}, [headRow]));
    var tb = el("tbody");
    T.dataIndicators.forEach(function (ind) {
      var avg = el("td", { class: "datatable__avg" });
      function calc() {
        if (ind.text) return (avg.textContent = "—");
        var nums = [0, 1, 2]
          .map(function (i) {
            return parseFloat(String(S.get("data.values." + ind.id + "." + i, "")).replace(",", "."));
          })
          .filter(function (n) {
            return !isNaN(n);
          });
        avg.textContent = nums.length
          ? (nums.reduce(function (a, b) {
              return a + b;
            }, 0) / nums.length).toLocaleString("tr-TR", { maximumFractionDigits: 2 })
          : "—";
      }
      var tr = el("tr", {}, [el("td", { class: "datatable__label", text: ind.label })]);
      [0, 1, 2].forEach(function (i) {
        var p = "data.values." + ind.id + "." + i;
        var inp = el("input", { class: "input input--sm", type: "text", inputmode: ind.text ? null : "decimal", placeholder: ind.text ? "ör. 4 / 2" : "", "aria-label": ind.label + " — " + (i + 1) + ". yıl" });
        inp.value = S.get(p, "") || "";
        inp.addEventListener("input", function () {
          S.set(p, inp.value);
          calc();
        });
        tr.appendChild(el("td", {}, [inp]));
      });
      calc();
      tr.appendChild(avg);
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    holder.appendChild(el("div", { class: "table-wrap" }, [tbl]));
    return wrap(field, holder, { legend: true });
  }

  /* ------------------------------------------------------------------
     Otomatik özetler — Bölüm 1.3 ve 1.4
     ------------------------------------------------------------------ */
  function formalSummary() {
    var box = el("div", { class: "field--full" });
    live(function () {
      box.innerHTML = "";
      var f = R.formal();
      var tone = f.result === "yes" ? "success" : f.result === "no" ? "danger" : "info";
      box.appendChild(
        el("div", { class: "verdict verdict--" + (f.result ? tone : "pending") }, [
          icon(f.result === "yes" ? "check" : f.result === "no" ? "alert" : "info", "verdict__icon"),
          el("div", {}, [
            el("div", { class: "verdict__label", text: "TYÇ yeterlilik türüne ilişkin biçimsel ölçütler" }),
            el("div", { class: "verdict__value", text: f.result === "yes" ? "Karşılanmıştır" : f.result === "no" ? "Karşılanmamıştır" : "Değerlendirme sürüyor" }),
            el("div", {
              class: "verdict__note",
              text:
                f.met + " karşılandı · " + f.notMet.length + " karşılanmadı · " + f.na + " uygulanamaz · " + f.pending + " bekliyor" +
                (f.notMet.length ? " — Karşılanmayan: " + f.notMet.join(", ") : ""),
            }),
          ]),
        ])
      );
      var chips = el("div", { class: "formal-grid" });
      T.formal.forEach(function (it) {
        var d = S.get("formal." + R.key(it.code) + ".decision");
        chips.appendChild(
          el("button", { type: "button", class: "formal-chip formal-chip--" + (d || "none"), title: it.title, onclick: function () {
            window.App && window.App.goTo({ tab: "formal", step: "f" + R.key(it.code) });
          } }, [el("strong", { text: it.code }), el("span", { text: it.title })])
        );
      });
      box.appendChild(chips);
    });
    return box;
  }

  function decisionSummary() {
    var box = el("div", { class: "field--full" });
    live(function () {
      box.innerHTML = "";
      var a = R.accreditation();
      var tbl = el("table", { class: "table result__table" });
      tbl.appendChild(
        el("thead", {}, [el("tr", {}, [el("th", { text: "Ana ölçüt" }), el("th", { text: "Zorunlu alt ölçütler" }), el("th", { text: "Oran" }), el("th", { text: "Sonuç" })])])
      );
      var tb = el("tbody");
      C.forEach(function (crit, i) {
        var m = a.perMain[i];
        var mand = crit.subs.filter(R.isMandatory);
        var mandState = !mand.length
          ? "—"
          : m.mandatoryFail.length
          ? "Hayır (" + m.mandatoryFail.join(", ") + ")"
          : mand.every(function (s) {
              return R.subDecision(s) === "met" || R.subDecision(s) === "na";
            })
          ? "Evet"
          : "Bekliyor";
        tb.appendChild(
          el("tr", {}, [
            el("td", {}, [
              el("a", { href: "#", class: "result__link", text: crit.no + ".", onclick: function (e) {
                e.preventDefault();
                window.App && window.App.goTo({ tab: "criteria", step: "c" + crit.no });
              } }),
              el("span", { class: "result__sub-text", text: crit.title }),
            ]),
            el("td", { text: mandState }),
            el("td", { text: m.ratio === null ? "—" : "%" + Math.round(m.ratio * 100) }),
            el("td", {}, [
              el("span", { class: "badge badge--" + (m.final ? R.RESULT_TONE[m.final] : "neutral"), text: m.final ? R.RESULT_LABEL[m.final] : "Bekliyor" }),
              m.override && m.override !== m.suggested ? el("span", { class: "result__override", text: "bütüncül" }) : null,
            ]),
          ])
        );
      });
      tbl.appendChild(tb);
      box.appendChild(el("div", { class: "table-wrap" }, [tbl]));
      var s = a.suggested;
      box.appendChild(
        el("div", { class: "verdict verdict--" + (s === "akreditasyon" ? "success" : s === "red" ? "danger" : "pending"), style: "margin:var(--space-4) 0 var(--space-6)" }, [
          icon(s ? "scale" : "info", "verdict__icon"),
          el("div", {}, [
            el("div", { class: "verdict__label", text: "Bölüm 6’ya göre önerilen akreditasyon kararı" }),
            el("div", { class: "verdict__value", text: s === "akreditasyon" ? "Akreditasyon" : s === "red" ? "Akreditasyonun reddi" : "Henüz hesaplanamıyor" }),
            el("div", { class: "verdict__note", text: a.reason + "  Uyumlu: " + a.counts.uyumlu + " · Kısmen: " + a.counts.kismen + " · Uyumsuz: " + a.counts.uyumsuz }),
          ]),
        ])
      );
    });
    return box;
  }

  /* ------------------------------------------------------------------
     Kurallar ve sözlük
     ------------------------------------------------------------------ */
  function simpleTable(head, rows) {
    var tbl = el("table", { class: "table ref-table" });
    tbl.appendChild(el("thead", {}, [el("tr", {}, head.map(function (h) {
      return el("th", { text: h });
    }))]));
    var tb = el("tbody");
    rows.forEach(function (r) {
      tb.appendChild(el("tr", {}, r.map(function (c, i) {
        return el("td", { class: i === 0 ? "ref-table__term" : null, text: c });
      })));
    });
    tbl.appendChild(tb);
    return el("div", { class: "table-wrap field--full" }, [tbl]);
  }

  /* ------------------------------------------------------------------
     Dağıtıcı ve birim hesabı
     ------------------------------------------------------------------ */
  function render(field) {
    if (!visible(field)) return null;
    switch (field.type) {
      case "text":
      case "number":
      case "date":
      case "url":
      case "email":
        return input(field);
      case "textarea":
        return textarea(field);
      case "select":
        return select(field);
      case "radio":
        return choices(field, false);
      case "checkboxes":
        return choices(field, true);
      case "evidence":
        return evidenceList(field);
      case "repeater":
        return repeater(field);
      case "info":
        return info(field);
      case "heading":
        return heading(field);
      case "compare":
        return compare(field);
      case "matrix":
        return matrix(field);
      case "subcrit":
        return subcrit(field);
      case "main-result":
        return mainResult(field);
      case "data-table":
        return dataTable(field);
      case "formal-summary":
        return formalSummary(field);
      case "decision-summary":
        return decisionSummary(field);
      case "rules":
        return simpleTable(["Düzey", "Kural"], T.rules.map(function (r) {
          return [r.level, r.rule];
        }));
      case "glossary":
        return simpleTable(["Terim", "Açıklama"], T.glossary);
      case "custom":
        return field.render();
    }
    return null;
  }

  /** Bir alanın ilerleme birimleri */
  function units(field) {
    if (!visible(field)) return { done: 0, total: 0 };
    switch (field.type) {
      case "subcrit":
        return subcritUnits(field.sub);
      case "main-result":
        return { done: isEmpty(S.get("critMain." + field.crit.no + ".rationale")) ? 0 : 1, total: 1 };
      case "compare":
        return {
          done: (isEmpty(S.get(field.id + ".tycValue")) ? 0 : 1) + (isEmpty(S.get(field.id + ".programValue")) ? 0 : 1),
          total: 2,
        };
      case "matrix": {
        var n = field.rows.length + (S.get(field.id + ".extra", []) || []).length;
        var rows = S.get(field.id + ".rows", {}) || {};
        var done = Object.keys(rows).filter(function (k) {
          return rows[k] && rows[k].met;
        }).length;
        return { done: Math.min(done, n), total: n };
      }
      case "evidence":
        return field.required ? { done: evidenceFilled(S.get(field.id)) ? 1 : 0, total: 1 } : { done: 0, total: 0 };
      default:
        if (!field.required || !field.id) return { done: 0, total: 0 };
        return { done: isEmpty(S.get(field.id)) ? 0 : 1, total: 1 };
    }
  }

  return {
    el: el,
    icon: icon,
    render: render,
    units: units,
    visible: visible,
    isEmpty: isEmpty,
    safeId: safeId,
    resetLive: function () {
      liveFns = [];
    },
    onDirty: function (fn) {
      onDirty = fn;
    },
    openAll: function (codes, open) {
      codes.forEach(function (c) {
        openCards[R.key(c)] = open;
      });
    },
    DECISION_LABEL: DECISION_LABEL,
  };
})();
