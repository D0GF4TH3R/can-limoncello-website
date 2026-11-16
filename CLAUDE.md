# CLAUDE.md — Projektkontext für Claude Code

## Was das ist
Marken-Website für **Can Limoncello** (handgemachter Limoncello, *Lemons from Ibiza · Love from Switzerland*).
Statischer One-Pager + zwei Rechtsseiten (Impressum, Datenschutz), dreisprachig **DE/EN/ES**.
Reines HTML/CSS/JS, keine Build-Tools. Vollständige Doku in `README.md` — bitte zuerst lesen.

## Vertriebsmodell & Rollen (wichtig)
- Diese Website ist reines **Marketing / Front-Präsentation**. Sie verkauft nicht selbst.
- Ein **Vertragspartner in der Schweiz** ist Hersteller, Abfüller, Versender **und rechtlicher
  Verkäufer** gegenüber dem Endkunden. Bestellung, Zahlung, Versand laufen komplett über dessen
  **Shopify-Umgebung** (Shop-Pay-Checkout).
- **Phase 1:** Dieser Partner ist zugleich Betreiber der Marke/Seite — Impressum & Datenschutz
  laufen also auf ihn. (Kann später wechseln, wenn das Produkt sich etabliert.)
- Folge für Recht: **AGB, Widerruf, Versand, Stornierungen gehören dem Partner** und liegen in
  dessen Checkout — NICHT auf dieser Seite. Diese Seite braucht nur **Impressum + Datenschutz**
  (letzteres v. a. wegen der Newsletter-Anmeldung).
- **Kauf-Button:** führt später in den Shop des Partners. Produkt-/Shop-Link liegt noch nicht vor
  (Flaschendesign nicht final). Bis dahin zeigt „Vormerken/Reserve" bewusst auf den Newsletter.
  Siehe `<!-- TODO Kauf-Anbindung -->` in `index.html`.

## Markenrichtung (wichtig fürs Design)
Edel, ruhig, „Dom Pérignon als Limoncello". Atmosphäre statt Produktwerbung. Natürliches Licht,
gedämpfte Sand-/Meer-/Zitronentöne, viel Leerraum. Die Flasche erscheint nur beiläufig.
Keine Rabatte, kein CTA-Lärm, keine Menschen beim Trinken (Schweizer Werberecht).

## Struktur
**Seit 17.11.2026: nur noch eine Kaufseite.** Die frühere, ausführliche Website (Hero-Videos,
Insel-Kapitel, Galerie, Produktseite nach Dom-Pérignon-Vorbild) ist auf GitHub gesichert:
Branch `archive/full-site`, Tag `full-site-2026-11-17`. Zurück mit z. B.
`git checkout full-site-2026-11-17 -- index.html limoncello.html assets/` und pushen.
- `index.html` — einzige Seite: Produktfoto, Preise (Einzelpreis CHF 40 + Versand; Gastropreis
  CHF 28 ab 6 Flaschen inkl. Versand), Menge + Warenkorb (Shopify), Details (26% vol.)
- `limoncello.html` — nur noch Weiterleitung auf `/` (alte Links)
- `impressum.html`, `datenschutz.html` — Rechtsseiten
- `assets/css/site.css` — Farben, Kaufbereich-Platzhalter, Footer (`style.css` = Altbestand, Klassen-Kollisionen beachten, z. B. `.price`)
- `assets/js/shop.js` — Shopify: Mengenauswahl + Button, Platzhalter-Tausch, Warenkorb-Hinweis, Checkout-Fix
- **Preise stehen an 3 Stellen und müssen mit Shopify übereinstimmen:** Preisboxen in `index.html`,
  JSON-LD in `index.html`, Warenkorb-Hinweis in `shop.js`. Gastropreis/Gratisversand selbst wird in Shopify eingestellt.
- `.htaccess` — Browser-Caching. CSS/JS werden 1 Jahr gecacht: in den HTML-Seiten mit `?v=DATUM` eingebunden — **bei jeder Änderung an CSS/JS die Nummer in allen Seiten erhöhen**.
- Fotos: WebP-Kopien in `assets/img/web/` (aus den Originalen erzeugt).

## Konventionen
- **Texte niemals direkt ins HTML** schreiben. Im HTML nur Schlüssel `data-i18n="key"`
  (bzw. `data-i18n-ph` für Placeholder). Den Text in `i18n.js` pflegen — **immer alle 3 Sprachen**.
- Farben/Abstände über die CSS-Variablen, keine hartkodierten Hex-Werte verstreuen.
- Bilder als .jpg, ~1400 px breit, Qualität ~80 %.
- Responsive Breakpoints existieren bei 900 / 820 / 640 / 480 px. Änderungen auf Mobil + Desktop prüfen.

## Offene TODOs
Siehe README. Kurz: eigenes `hero.mp4`, echtes Flaschenbild, Bild „zwei eisgekühlte Gläser",
Partner-Daten in Impressum + Datenschutz (danach EN/ES ergänzen), Kauf-Button an Partner-Shop
anbinden (sobald Produktlink vorliegt), Newsletter an ein Tool anbinden.

## Anbindung an Shopify (schlanker Weg)
Es ist **kein** vollständiges Liquid-Theme nötig. Diese Seite bleibt eigenständig; nur der Kauf
führt in den Shopify-Shop des Partners:
- **Bevorzugt — Buy-Button-Snippet:** Shopify „Buy Button"-Channel erzeugt ein JS-Snippet, das an der
  Produktstelle in `index.html` eingebettet wird; Checkout öffnet als Overlay. Backend (Zahlung/Versand)
  bleibt unverändert beim Partner.
- **Alternativ — direkter Link:** Button-`href` auf die Produkt-/Checkout-URL des Partners.
- Ein voller Liquid-Theme-Port wäre nur nötig, wenn die ganze Seite im Shopify-Admin liegen soll —
  aktuell nicht geplant.
Hinweis Domain: `canlimoncello.com` zeigt aktuell auf Shopify; falls diese Seite unter der Hauptdomain
liegen soll, ist das eine DNS-/Domain-Entscheidung. Größere Schritte erst als Plan, dann umsetzen.
