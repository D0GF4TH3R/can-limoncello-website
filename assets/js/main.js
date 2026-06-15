/* ============================================================
   Can Limoncello — Interaktionen
   Sprachumschalter, Newsletter-Formular, Scroll-Effekte.
   Setzt voraus, dass i18n.js vorher geladen wurde (Objekt I18N).
   ============================================================ */

(function(){
  "use strict";

  let current = 'de';

  function setLang(lang){
    const dict = (typeof I18N !== 'undefined') && I18N[lang];
    if(!dict) return;
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      const k = el.getAttribute('data-i18n');
      if(dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      const k = el.getAttribute('data-i18n-ph');
      if(dict[k] != null) el.placeholder = dict[k];
    });
    document.querySelectorAll('#lang button').forEach(function(b){
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    try{ localStorage.setItem('cl_lang', lang); }catch(e){}
  }

  // Sprachschalter verdrahten
  document.querySelectorAll('#lang button').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });

  // Gespeicherte Sprache wiederherstellen, sonst Browser-Sprache, sonst DE
  let saved;
  try{ saved = localStorage.getItem('cl_lang'); }catch(e){}
  const initial = saved || (navigator.language || 'de').slice(0,2);
  setLang((typeof I18N !== 'undefined' && I18N[initial]) ? initial : 'de');

  // Newsletter — Shopify-Kundenformular.
  // Sobald die Shop-Domain des Vertragspartners (The Cocktail) bekannt ist, hier eintragen,
  // z. B. 'the-cocktail.myshopify.com' oder die Live-Shop-Domain. Dann sendet das Formular
  // den Eintrag nativ an Shopifys /contact-Endpoint (Tag „newsletter").
  // Solange leer, bleibt der Prototyp aktiv (zeigt nur eine Bestätigung, kein Backend).
  const SHOPIFY_DOMAIN = '';
  const form = document.getElementById('briefForm');
  if(form){
    form.addEventListener('submit', function(e){
      if(SHOPIFY_DOMAIN){
        form.action = 'https://' + SHOPIFY_DOMAIN + '/contact#newsletter';
        return; // kein preventDefault → Browser sendet das Formular an Shopify
      }
      e.preventDefault();
      const msg = (typeof I18N !== 'undefined' && I18N[current].b_success) || 'Danke!';
      this.innerHTML = '<p style="font-style:italic;padding:.9rem 0">' + msg + '</p>';
    });
  }

  // Navigation: Hintergrund nach dem Hero einblenden
  const nav = document.getElementById('nav');
  if(nav){
    const onScroll = function(){
      nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Elemente beim Hereinscrollen sanft einblenden
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    },{threshold:.15});
    reveals.forEach(function(el){ io.observe(el); });
  }
})();
