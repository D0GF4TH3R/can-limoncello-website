# Can Limoncello — Website

Statische Marken-Website (One-Pager + Rechtsseiten), dreisprachig DE/EN/ES.
Reines HTML/CSS/JS, keine Build-Tools nötig — direkt in VS Code bearbeitbar.

*Lemons from Ibiza · Love from Switzerland*

---

## Ordnerstruktur

```
can-limoncello-website/
├── index.html            → Startseite (Hero, Welt, Limoncello, Ritual, Brief)
├── impressum.html        → Rechtsseite (Vorlage, auszufüllen)
├── datenschutz.html      → Rechtsseite (Vorlage, auszufüllen)
├── assets/
│   ├── css/style.css     → komplettes Styling (Farben, Layout, Animationen)
│   ├── js/i18n.js        → alle Texte in DE/EN/ES
│   ├── js/main.js        → Sprachschalter, Formular, Scroll-Effekte
│   ├── img/              → Bilder (.jpg)
│   └── video/            → hier hero.mp4 ablegen
└── README.md
```

## Lokal ansehen

In VS Code die Erweiterung **Live Server** installieren, dann Rechtsklick auf
`index.html` → *Open with Live Server*. Alternativ die Datei einfach im Browser öffnen.

## Inhalte ändern

- **Texte:** ausschließlich in `assets/js/i18n.js` — pro Sprache ein Block (`de`, `en`, `es`).
  Im HTML stehen nur Schlüssel wie `data-i18n="p_title"`; der Text kommt aus der i18n-Datei.
  Beim Bearbeiten immer **alle drei Sprachen** mitpflegen.
- **Farben/Layout:** in `assets/css/style.css`, ganz oben die Farbvariablen (`--cream`, `--gold` …).
- **Bilder austauschen:** neue Datei in `assets/img/` legen und den `src` im HTML anpassen.
  Empfohlene Größe: ~1400 px Breite, als .jpg, Qualität ~80 %.

## Offene Punkte (TODO)

- [ ] **Hero-Video:** eigenes Video als `assets/video/hero.mp4` ablegen. Solange es fehlt,
      greift automatisch der KI-Entwurf über eine externe URL (in `index.html`, Hero-Block).
      Sobald das eigene Video liegt, kann die Fallback-Zeile entfernt werden.
- [ ] **Flaschenbild** (Sektion „Der Limoncello") — Platzhalter ersetzen, siehe `<!-- TODO -->` in index.html.
- [ ] **Bild zwei eisgekühlte Gläser** (Sektion „Der Brief"/Ritual) — Platzhalter ersetzen.
- [ ] **Kauf-Anbindung:** Button führt später in den Shopify-Shop des Vertragspartners. Produktlink
      liegt noch nicht vor (Flasche nicht final). Siehe `<!-- TODO Kauf-Anbindung -->` in index.html.
- [ ] **Rechtsseiten:** `[[…]]`-Platzhalter in **Impressum + Datenschutz** mit den Daten des
      Partners füllen (Phase 1: Partner = Betreiber), danach EN-/ES-Fassungen ergänzen.
      Rechtlich von einer Fachperson prüfen lassen.
- [ ] **Newsletter-Formular** ist aktuell nur Prototyp (zeigt Bestätigung an) — später an ein
      Newsletter-Tool anbinden.
- [ ] **Footer-Links** Instagram & Kontakt mit echten Zielen verknüpfen. Die AGB-/Widerruf-Links
      zeigen auf `#` — später optional auf die entsprechenden Seiten im Partner-Checkout verlinken.

## Vertrieb & Backend (Rollen)

Diese Website ist reine **Front-Präsentation** und verkauft nicht selbst. Bestellung, Zahlung und
Versand laufen über die **Shopify-Umgebung eines Schweizer Vertragspartners**, der zugleich
Hersteller, Versender und rechtlicher Verkäufer ist (und in Phase 1 auch Betreiber der Marke).
Der Kauf-Button führt später in dessen Shop — am einfachsten per Shopify **Buy-Button-Snippet**
oder direktem Produktlink, **ohne** vollständigen Liquid-Theme-Umbau. Details in `CLAUDE.md`.
