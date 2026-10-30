#!/usr/bin/env python3
"""Program Akreditasyon Raporu Şablonu'nun Bölüm 3'ünü (YÖKAK program
akreditasyon ölçütleri) assets/data/criteria.js dosyasına dönüştürür.

Girdi, Word şablonunun düz metin dökümüdür:
    pandoc sablon.docx -t plain --wrap=none -o sablon.txt
    python3 tools/parse_criteria.py sablon.txt assets/data/criteria.js

Şablonda ölçütler değiştiğinde bu iki komutu yeniden çalıştırmak yeterlidir.
"""
import re, json, sys
lines = open(sys.argv[1], encoding='utf-8').read().split('\n')
start = next(i for i,l in enumerate(lines) if l.startswith('Ana ölçüt 1.'))
end = next(i for i,l in enumerate(lines) if l.startswith('4. Değerlendirme süreci'))
L = [l for l in lines[start:end]]
crit = []; cur=None; sub=None; mode=None
for raw in L:
    l = raw.strip()
    m = re.match(r'^Ana ölçüt (\d+)\. (.+)$', l)
    if m:
        cur = {'no': int(m.group(1)), 'title': m.group(2), 'subs': []}; crit.append(cur); sub=None; mode=None; continue
    m = re.match(r'^(\d+)\.(\d+)\. (.{25,})$', l)
    if m and cur and int(m.group(1))==cur['no'] and mode!='result':
        sub = {'code': f"{m.group(1)}.{m.group(2)}", 'text': m.group(3), 'mandatory': None, 'rubric': [], 'indicators': [], 'evidence': ''}
        cur['subs'].append(sub); mode=None; continue
    if l.startswith('Ana ölçüt sonucu'): mode='result'; continue
    if not sub or mode=='result': continue
    m = re.match(r'^Zorunlu alt ölçüt\s+(.*)$', l)
    if m:
        v = m.group(1).strip()
        sub['mandatory'] = True if v=='Evet' else False if v=='Hayır' else None
        continue
    m = re.match(r'^YÖKAK rubrik ilişkilendirmesi\s+(.*)$', l)
    if m: sub['rubric'] = [x.strip() for x in m.group(1).split(',') if x.strip()]; continue
    if l=='Göstergeler': mode='ind'; continue
    if l=='Beklenen kanıt örnekleri': mode='ev'; continue
    if mode=='ind':
        m = re.match(r'^(\d+)\s{2,}(.+?)\s+☐\s+☐$', l)
        if m: sub['indicators'].append(m.group(2).strip()); continue
    if mode=='ev' and l.startswith('Yol göstericidir'):
        sub['evidence'] = re.sub(r'^Yol göstericidir; ne bağlayıcı ne de eksiksizdir\.\s*','',l); mode=None
with open(sys.argv[2], 'w', encoding='utf-8') as f:
    f.write("/* Otomatik üretilmiştir — tools/parse_criteria.py. Elle düzenlemeyin.\n"
            "   mandatory: true/false şablonda sabit; null ise şablonda henüz belirlenmemiştir\n"
            "   (☐ Evet ☐ Hayır) ve formda değerlendirme takımınca işaretlenir. */\n")
    f.write("window.CRITERIA = ")
    json.dump(crit, f, ensure_ascii=False, indent=1)
    f.write(";\n")
for c in crit:
    print(c['no'], c['title'], len(c['subs']), [ (s['code'], s['mandatory'], len(s['indicators']), bool(s['evidence']), len(s['rubric'])) for s in c['subs']])
