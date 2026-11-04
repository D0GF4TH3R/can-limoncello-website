/* ============================================================
   Can Limoncello — Shopify-Kaufbereich, gemeinsam für alle Seiten.
   Erwartet im HTML: #buyBox mit #buyFallback/#buyFallbackBtn und
   #product-component-1784379987175 sowie das im <head> asynchron
   geladene SDK (<script async id="shopifySdk" ...>).
   ============================================================ */

/* ============================================================
   SHOPIFY BUY BUTTON — Init. Selbe Produkt-ID/Domain/Token wie
   im Snippet, Design (Outfit/Ink/Gold, zentriert) angepasst.
   ============================================================ */
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    // Das SDK wird schon im <head> asynchron geladen — nur noch auf dessen Ende warten.
    var early = document.getElementById('shopifySdk');
    if (early) {
      early.addEventListener('load', ShopifyBuyInit);
      early.addEventListener('error', function () { early.removeAttribute('id'); loadScript(); });
      return;
    }
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var domain = 'xy311a-ax.myshopify.com';
    var token = 'acfef6dc81a838c3c5ceb0c46d0a569f';
    var client = ShopifyBuy.buildClient({
      domain: domain,
      storefrontAccessToken: token,
    });

    // Die SDK merkt sich die Cart-ID dauerhaft in localStorage und versucht,
    // sie bei jedem Seitenaufruf wiederzuverwenden. Ein Cart, der bereits
    // einmal zur Kasse gebracht wurde, bleibt dabei manchmal als Objekt
    // abrufbar, aber der "Checkout"-Button funktioniert dann nicht mehr
    // (kein Fehler, einfach keine Reaktion). Statt zu prüfen, ob der alte
    // Cart noch gültig ist, daher die gespeicherte ID verwerfen, wenn
    //  (a) ein neuer Besuch beginnt (neue Browser-Sitzung), oder
    //  (b) seit dem letzten Seitenaufruf "Checkout" geklickt wurde.
    // Innerhalb eines Besuchs bleibt der Warenkorb erhalten, damit er beim
    // Wechsel Startseite <-> Produktseite nicht verloren geht.
    var storageKey = token + '.' + domain + '.checkoutId';
    try {
      if (!sessionStorage.getItem('cl-visit') || sessionStorage.getItem('cl-checkout-started')) {
        window.localStorage.removeItem(storageKey);
      }
      sessionStorage.setItem('cl-visit', '1');
      sessionStorage.removeItem('cl-checkout-started');
    } catch (e) {
      try { window.localStorage.removeItem(storageKey); } catch (e2) {}
    }

    ShopifyBuy.UI.onReady(client).then(startComponent);

    function startComponent(ui) {
      ui.createComponent('product', {
        id: '15833442255222',
        node: document.getElementById('product-component-1784379987175'),
        moneyFormat: 'CHF%20%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0",
          "margin-bottom": "0"
        },
        "text-align": "left"
      },
      "title": {
        "font-family": "Poppins, sans-serif",
        "font-weight": "400",
        "font-size": "1.7rem",
        "color": "#2A271F"
      },
      "price": {
        "font-family": "Poppins, sans-serif",
        "font-size": "1.1rem",
        "color": "#2A271F"
      },
      "description": {
        "font-family": "Poppins, sans-serif",
        "font-size": ".95rem",
        "line-height": "1.6",
        "color": "#55503F"
      },
      "compareAt": {
        "font-family": "Poppins, sans-serif",
        "font-size": ".85rem",
        "color": "#55503F"
      },
      "unitPrice": {
        "font-family": "Poppins, sans-serif",
        "font-size": ".85rem",
        "color": "#55503F"
      },
      "button": {
        "font-family": "Poppins, sans-serif",
        "font-size": "12px",
        "font-weight": "400",
        "letter-spacing": "0.25em",
        "text-transform": "uppercase",
        "padding-top": "16px", "padding-bottom": "16px",
        "padding-left": "34px", "padding-right": "34px",
        "color": "#F4EFE3",
        "background-color": "#2A271F",
        "border-radius": "0",
        "margin-top": "1.4rem",
        "width": "100%",
        ":hover": { "color": "#2A271F", "background-color": "#B08F45" },
        ":focus": { "background-color": "#B08F45" }
      }
    },
    "contents": {
      "img": false,
      "imgWithCarousel": false,
      "title": false,
      "description": false
    },
    "width": "100%",
    "text": {
      "button": "Add to cart"
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Poppins, sans-serif",
        "text-transform": "uppercase",
        "letter-spacing": "0.2em",
        "color": "#F4EFE3",
        "background-color": "#2A271F",
        "border-radius": "0",
        ":hover": { "color": "#2A271F", "background-color": "#B08F45" },
        ":focus": { "background-color": "#B08F45" }
      },
      "title": {
        "font-family": "Poppins, sans-serif",
        "font-weight": "500",
        "font-size": "26px",
        "color": "#2A271F"
      },
      "price": {
        "font-family": "Poppins, sans-serif",
        "font-weight": "normal",
        "font-size": "18px",
        "color": "#2A271F"
      },
      "compareAt": {
        "font-family": "Poppins, sans-serif",
        "font-weight": "normal",
        "font-size": "15.3px",
        "color": "#55503F"
      },
      "unitPrice": {
        "font-family": "Poppins, sans-serif",
        "font-weight": "normal",
        "font-size": "15.3px",
        "color": "#55503F"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "cart": {
    "styles": {
      "button": {
        "font-family": "Poppins, sans-serif",
        "font-size": "12px",
        "letter-spacing": "0.2em",
        "text-transform": "uppercase",
        "color": "#F4EFE3",
        "background-color": "#2A271F",
        "border-radius": "0",
        ":hover": { "color": "#2A271F", "background-color": "#B08F45" },
        ":focus": { "background-color": "#B08F45" }
      }
    },
    "text": { "total": "Subtotal", "button": "Checkout" }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Poppins, sans-serif",
        "background-color": "#2A271F",
        ":hover": { "background-color": "#4a4636" },
        ":focus": { "background-color": "#4a4636" }
      },
      "count": { "color": "#F4EFE3", ":hover": { "color": "#F4EFE3" } },
      "iconPath": { "fill": "#F4EFE3" }
    }
  }
},
      });
    }
  }
})();

/* ============================================================
   CART NOTE — Shopify rendert die Cart-Sidebar in einem eigenen
   Iframe (frame-cart), daher per MutationObserver von aussen den
   Hinweis direkt unter den Mengen-Stepper jeder Cart-Zeile setzen.
   ============================================================ */
(function () {
  function addNote(doc, container) {
    if (container.nextElementSibling && container.nextElementSibling.classList.contains('cl-shipping-note')) return;
    var note = doc.createElement('p');
    note.className = 'cl-shipping-note';
    note.textContent = 'For bars, restaurants and thirsty friends — from 6 bottles: CHF 26 per bottle + free shipping';
    note.style.cssText = 'font-family:Poppins,sans-serif;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#B08F45;margin:14px 0 0;text-align:left;';
    container.insertAdjacentElement('afterend', note);
    var li = container.closest('.shopify-buy__cart-item');
    if (li) {
      var offset = container.getBoundingClientRect().left - li.getBoundingClientRect().left;
      note.style.marginLeft = offset + 'px';
    }
  }
  function scanCart() {
    var cf = document.querySelector('iframe[name="frame-cart"]');
    if (!cf) return;
    var doc;
    try { doc = cf.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;
    doc.querySelectorAll('.shopify-buy__quantity-container').forEach(function (c) { addNote(doc, c); });
    if (!cf.__clObserved) {
      cf.__clObserved = true;
      new MutationObserver(scanCart).observe(doc.body, { childList: true, subtree: true });
    }
  }
  new MutationObserver(scanCart).observe(document.documentElement, { childList: true, subtree: true });
  scanCart();
})();

/* ============================================================
   MENGENPREIS — Shopify rendert den Preis in einem eigenen Iframe
   (frame-product). Per MutationObserver direkt unter dem Preis den
   Hinweis einfügen und die Iframe-Höhe nachziehen, damit nichts
   abgeschnitten wird. Muss mit den Shopify-Einstellungen des
   Partners übereinstimmen (CHF 26/Flasche + Gratisversand ab 6).
   ============================================================ */
(function () {
  // Textstücke, die nie umbrechen — Zeilen brechen nur zwischen den Stücken
  var LABEL = ['For bars, restaurants', 'and thirsty friends'];
  var OFFER = ['From 6 bottles: CHF 26 per bottle', '+ free shipping'];
  function fillChunks(doc, el, parts) {
    parts.forEach(function (t, i) {
      if (i) el.appendChild(doc.createTextNode(' '));
      var c = doc.createElement('span');
      c.style.whiteSpace = 'nowrap';
      c.textContent = t;
      el.appendChild(c);
    });
  }
  function addTierNote(doc, price) {
    var next = price.nextElementSibling;
    if (next && next.classList.contains('cl-tier-note')) return;
    var note = doc.createElement('p');
    note.className = 'cl-tier-note';
    note.style.cssText = 'display:block;font-family:Poppins,sans-serif;color:#B08F45;border:1px solid #B08F45;padding:10px 18px 11px;margin:14px 0 2px;text-align:left;line-height:1.35;';
    var label = doc.createElement('span');
    fillChunks(doc, label, LABEL);
    label.style.cssText = 'display:block;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:3px;';
    var offer = doc.createElement('span');
    fillChunks(doc, offer, OFFER);
    offer.style.cssText = 'display:block;font-size:15px;font-weight:500;letter-spacing:.02em;';
    note.appendChild(label);
    note.appendChild(offer);
    price.insertAdjacentElement('afterend', note);
  }
  // Echten Button einblenden, sobald Preis, Hinweis und Button im Iframe stehen.
  // Wurde der Platzhalter-Button schon geklickt, den Klick nachholen.
  var box = document.getElementById('buyBox');
  var fbBtn = document.getElementById('buyFallbackBtn');
  var pending = false;
  function markReady(doc) {
    if (box.classList.contains('ready')) return;
    var btn = doc.querySelector('.shopify-buy__btn');
    if (!btn || !doc.querySelector('.cl-tier-note')) return;
    box.classList.add('ready');
    if (pending) { pending = false; btn.click(); }
  }
  fbBtn.addEventListener('click', function () {
    pending = true;
    fbBtn.textContent = 'Adding…';
    setTimeout(function () { if (pending) { pending = false; fbBtn.textContent = 'Add to cart'; } }, 20000);
  });
  function fitFrame(pf, doc) {
    var h = doc.body.scrollHeight;
    if (h && Math.abs(pf.offsetHeight - h) > 1) pf.style.height = h + 'px';
  }
  function scanPrices() {
    document.querySelectorAll('iframe[name^="frame-product"]').forEach(function (pf) {
      var doc;
      try { doc = pf.contentDocument; } catch (e) { return; }
      if (!doc || !doc.body) return;
      doc.querySelectorAll('.shopify-buy__product__price').forEach(function (p) { addTierNote(doc, p); });
      fitFrame(pf, doc);
      markReady(doc);
      if (!pf.__clTierObserved) {
        pf.__clTierObserved = true;
        new MutationObserver(scanPrices).observe(doc.body, { childList: true, subtree: true });
        if ('ResizeObserver' in window) new ResizeObserver(function () { fitFrame(pf, doc); }).observe(doc.body);
      }
    });
  }
  new MutationObserver(scanPrices).observe(document.documentElement, { childList: true, subtree: true });
  scanPrices();
})();

/* ============================================================
   TITLE CASE FIX — Shopify liefert den Produkttitel als "CAN
   Limoncello" (Datenquelle, nicht unser Code). Im Produkt-Iframe
   per MutationObserver auf "Can" korrigieren.
   ============================================================ */
(function () {
  function fixTitle(el) {
    if (el.dataset.clFixed) return;
    el.textContent = el.textContent.replace(/^CAN\b/, 'Can');
    el.dataset.clFixed = '1';
  }
  function scanTitles() {
    document.querySelectorAll('iframe[name^="frame-product"]').forEach(function (pf) {
      var doc;
      try { doc = pf.contentDocument; } catch (e) { return; }
      if (!doc || !doc.body) return;
      doc.querySelectorAll('.shopify-buy__product__title').forEach(fixTitle);
      if (!pf.__clTitleObserved) {
        pf.__clTitleObserved = true;
        new MutationObserver(scanTitles).observe(doc.body, { childList: true, subtree: true, characterData: true });
      }
    });
  }
  new MutationObserver(scanTitles).observe(document.documentElement, { childList: true, subtree: true });
  scanTitles();
})();

/* ============================================================
   CHECKOUT FIX — Der "Checkout"-Button der von Shopify unter
   sdks.shopifycdn.com/buy-button/latest/ gehosteten SDK löst bei
   uns aus unbekanntem Grund keine Navigation mehr aus: die SDK
   loggt zwar ihr eigenes Klick-Telemetrie-Event, aber danach
   folgt weder eine Weiterleitung noch ein Fehler noch ein
   Netzwerk-Request — vermutlich ein Bug in deren Skript (das
   "latest" ist und sich ohne unser Zutun ändern kann). Die
   Storefront-API selbst funktioniert nachweislich einwandfrei.
   Daher hier den Klick selbst behandeln: den von der SDK
   verwalteten Cart frisch abrufen und direkt zu dessen webUrl
   weiterleiten, statt uns auf den kaputten SDK-Handler zu
   verlassen.
   ============================================================ */
(function () {
  var domain = 'xy311a-ax.myshopify.com';
  var token = 'acfef6dc81a838c3c5ceb0c46d0a569f';
  var storageKey = token + '.' + domain + '.checkoutId';

  function goToCheckout() {
    // Merken, dass zur Kasse gegangen wurde — beim nächsten Seitenaufruf
    // (z. B. Zurück-Button) startet dann ein frischer Warenkorb (siehe oben).
    try { sessionStorage.setItem('cl-checkout-started', '1'); } catch (e) {}
    var id;
    try { id = window.localStorage.getItem(storageKey); } catch (e) {}
    if (!id || !window.ShopifyBuy) return;
    var client = ShopifyBuy.buildClient({ domain: domain, storefrontAccessToken: token });
    client.checkout.fetch(id).then(function (checkout) {
      if (checkout && checkout.webUrl) {
        window.top.location.href = checkout.webUrl;
      }
    });
  }

  function wireButton(btn) {
    if (btn.__clWired) return;
    btn.__clWired = true;
    btn.addEventListener('click', goToCheckout);
  }

  function scanCheckoutButtons() {
    document.querySelectorAll('iframe[name="frame-cart"]').forEach(function (cf) {
      var doc;
      try { doc = cf.contentDocument; } catch (e) { return; }
      if (!doc || !doc.body) return;
      doc.querySelectorAll('.shopify-buy__btn--cart-checkout').forEach(wireButton);
      if (!cf.__clCheckoutObserved) {
        cf.__clCheckoutObserved = true;
        new MutationObserver(scanCheckoutButtons).observe(doc.body, { childList: true, subtree: true });
      }
    });
  }
  new MutationObserver(scanCheckoutButtons).observe(document.documentElement, { childList: true, subtree: true });
  scanCheckoutButtons();
})();
