/* ==========================================================================
   RoBella — Shared site behaviour
   - Renders the shared announcement bar, header, footer, mobile menu,
     search overlay, shopping-bag drawer and product quick view
   - Renders product cards / collections from js/products.js
   - Newsletter validation
   Requires: js/products.js, js/cart.js (loaded first)
   ========================================================================== */
(function () {
  "use strict";

  var R = window.ROBELLA || { products: [], categories: {}, saleSections: [] };
  var Cart = window.RoBellaCart;
  var body = document.body;
  var page = body.getAttribute("data-page") || "";

  /* ---------------------------------------------------------------- utils */
  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  function fmt(n) { return money.format(n); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function sectionName(p) {
    var cat = R.categories[p.category];
    if (!cat) return "";
    var s = cat.sections.filter(function (x) { return x.id === p.section; })[0];
    return s ? s.name : "";
  }

  var ICON = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 12h12"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 12h12M12 6v12"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M14 7l5 5-5 5"/></svg>'
  };

  var NAV = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "clothing", label: "Clothing", href: "Clothing.html" },
    { key: "accessories", label: "Accessories", href: "Accessories.html" },
    { key: "home-goods", label: "Home Goods", href: "Home%20Goods.html" },
    { key: "toys", label: "Toys", href: "Toys.html" },
    { key: "electronics", label: "Electronics", href: "Electronics.html" },
    { key: "sale", label: "Sale", href: "Sale.html", accent: true }
  ];

  function navLinks(cls) {
    return NAV.map(function (n) {
      var current = n.key === page;
      return '<li><a class="' + cls + (n.accent ? " is-accent" : "") + (current ? " is-active" : "") + '" href="' + n.href + '"' +
        (current ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
  }

  /* ------------------------------------------------------- header/footer */
  function renderHeader() {
    var mount = $("#site-header");
    if (!mount) return;
    mount.innerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<div class="announcement" role="note"><p>Discover something beautiful at RoBella</p></div>' +
      '<header class="site-header">' +
        '<div class="site-header__bar container">' +
          '<div class="site-header__left">' +
            '<button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false" data-open-menu>' + ICON.menu + "</button>" +
            '<button class="icon-btn" type="button" aria-label="Search the shop" data-open-search>' + ICON.search + "</button>" +
          "</div>" +
          '<a class="site-logo" href="index.html" aria-label="RoBella — home">' +
            '<img src="RoBellaLogo.jpg" alt="RoBella Curated Boutique — Every Item Tells a Story" width="715" height="481">' +
          "</a>" +
          '<div class="site-header__right">' +
            '<button class="icon-btn bag-btn" type="button" aria-label="Open shopping bag" data-open-bag>' + ICON.bag +
              '<span class="bag-count" data-bag-count aria-hidden="true">0</span></button>' +
          "</div>" +
        "</div>" +
        '<nav class="site-nav" aria-label="Main"><ul class="container">' + navLinks("site-nav__link") + "</ul></nav>" +
      "</header>" +
      /* mobile menu */
      '<div class="layer drawer drawer--left" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>' +
        '<div class="drawer__panel">' +
          '<div class="drawer__head"><img class="drawer__logo" src="RoBellaLogo.jpg" alt="RoBella" width="715" height="481">' +
            '<button class="icon-btn" type="button" aria-label="Close menu" data-close-layer>' + ICON.close + "</button></div>" +
          '<nav aria-label="Mobile"><ul class="mobile-nav">' + navLinks("mobile-nav__link") + "</ul></nav>" +
          '<div class="mobile-menu__foot"><button class="btn btn--outline btn--block" type="button" data-open-search>Search the shop</button>' +
          '<p class="script-line">Every Item Tells a Story.</p></div>' +
        "</div>" +
      "</div>" +
      /* search */
      '<div class="layer search-layer" id="search-layer" role="dialog" aria-modal="true" aria-labelledby="search-title" hidden>' +
        '<div class="search-layer__panel">' +
          '<div class="container">' +
            '<div class="search-layer__head"><h2 id="search-title" class="search-layer__title">Search RoBella</h2>' +
              '<button class="icon-btn" type="button" aria-label="Close search" data-close-layer>' + ICON.close + "</button></div>" +
            '<form class="search-form" role="search" data-search-form>' +
              '<label class="visually-hidden" for="search-input">Search products</label>' +
              ICON.search +
              '<input id="search-input" type="search" placeholder="Search dresses, jewelry, candles…" autocomplete="off" data-search-input>' +
            "</form>" +
            '<p class="search-layer__status" role="status" aria-live="polite" data-search-status></p>' +
            '<div class="search-results" data-search-results></div>' +
          "</div>" +
        "</div>" +
      "</div>" +
      /* bag */
      '<div class="layer drawer drawer--right" id="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" hidden>' +
        '<div class="drawer__panel">' +
          '<div class="drawer__head"><h2 id="bag-title" class="drawer__title">Your Bag <span data-bag-count-text></span></h2>' +
            '<button class="icon-btn" type="button" aria-label="Close shopping bag" data-close-layer>' + ICON.close + "</button></div>" +
          '<div class="bag__items" data-bag-items></div>' +
          '<div class="bag__foot" data-bag-foot></div>' +
        "</div>" +
      "</div>" +
      /* quick view */
      '<div class="layer modal" id="quick-view" role="dialog" aria-modal="true" aria-labelledby="qv-title" hidden>' +
        '<div class="modal__panel" data-qv-body></div>' +
      "</div>" +
      '<div class="toast" role="status" aria-live="polite" data-toast></div>';
  }

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var year = new Date().getFullYear();
    mount.innerHTML =
      '<footer class="site-footer">' +
        (page === "home" ? "" :
        '<div class="footer-news" id="newsletter">' +
          '<div class="container footer-news__inner">' +
            '<div><p class="eyebrow">The RoBella Letter</p><h2 class="footer-news__title">Stay in the <span class="script">Loop</span></h2>' +
            '<p class="footer-news__copy">Be the first to discover new arrivals, special finds, and exclusive boutique updates.</p></div>' +
            newsletterForm("footer") +
          "</div>" +
        "</div>") +
        '<div class="container footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="index.html" class="footer-logo" aria-label="RoBella — home"><img src="RoBellaLogo.jpg" alt="RoBella Curated Boutique" width="715" height="481" loading="lazy"></a>' +
            "<p>RoBella is a woman-owned curated boutique bringing together thoughtfully selected clothing, accessories, home goods, toys and everyday tech — because every item tells a story.</p>" +
          "</div>" +
          '<div class="footer-col"><h2 class="footer-col__title">Shop</h2><ul>' +
            NAV.slice(1).map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
          "</ul></div>" +
          '<div class="footer-col"><h2 class="footer-col__title">Customer Care</h2><ul>' +
            '<li><button type="button" class="link-btn" data-open-search>Search the Shop</button></li>' +
            '<li><button type="button" class="link-btn" data-open-bag>Your Shopping Bag</button></li>' +
            '<li><a href="#contact">Contact RoBella</a></li>' +
            '<li><a href="#newsletter">Newsletter</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h2 class="footer-col__title">About RoBella</h2><ul>' +
            '<li><a href="index.html#our-story">Our Story</a></li>' +
            '<li><a href="index.html#promise">Woman-Owned</a></li>' +
            '<li><a href="index.html#curated">Curated Favorites</a></li>' +
            '<li><a href="Sale.html">Special Offers</a></li>' +
          "</ul></div>" +
          '<div class="footer-col" id="contact"><h2 class="footer-col__title">Contact</h2>' +
            "<p>We would love to hear from you. RoBella's contact details and customer service hours will be published here soon.</p>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom"><div class="container footer-bottom__inner">' +
          "<p>&copy; " + year + " RoBella Curated Boutique. All rights reserved.</p>" +
          '<p class="script-line">Every Item Tells a Story.</p>' +
        "</div></div>" +
      "</footer>";
  }

  function newsletterForm(id) {
    var inputId = "newsletter-" + id + "-email";
    return '<form class="newsletter-form" novalidate data-newsletter>' +
      '<div class="newsletter-form__row">' +
        '<label class="visually-hidden" for="' + inputId + '">Email address</label>' +
        '<input id="' + inputId + '" type="email" name="email" placeholder="Your email address" autocomplete="email" required aria-describedby="' + inputId + '-msg">' +
        '<button class="btn btn--dark" type="submit">Subscribe</button>' +
      "</div>" +
      '<p class="newsletter-form__msg" id="' + inputId + '-msg" role="status" aria-live="polite"></p>' +
    "</form>";
  }

  /* --------------------------------------------------------------- layers */
  var openLayerEl = null;
  var lastFocus = null;

  function focusables(el) {
    return $all('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', el)
      .filter(function (x) { return x.offsetParent !== null || x === document.activeElement; });
  }

  function openLayer(el, focusTarget) {
    if (!el) return;
    if (openLayerEl && openLayerEl !== el) closeLayer(true);
    lastFocus = lastFocus || document.activeElement;
    el.hidden = false;
    // allow transition
    requestAnimationFrame(function () { el.classList.add("is-open"); });
    body.classList.add("no-scroll");
    openLayerEl = el;
    var menuBtn = $("[data-open-menu]");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", el.id === "mobile-menu" ? "true" : "false");
    setTimeout(function () {
      var t = focusTarget || focusables(el)[0];
      if (t) t.focus();
    }, 60);
  }

  function closeLayer(keepFocusMemory) {
    var el = openLayerEl;
    if (!el) return;
    el.classList.remove("is-open");
    openLayerEl = null;
    body.classList.remove("no-scroll");
    var menuBtn = $("[data-open-menu]");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    setTimeout(function () { if (!el.classList.contains("is-open")) el.hidden = true; }, 320);
    if (!keepFocusMemory && lastFocus && document.contains(lastFocus)) { lastFocus.focus(); }
    if (!keepFocusMemory) lastFocus = null;
  }

  document.addEventListener("keydown", function (e) {
    if (!openLayerEl) return;
    if (e.key === "Escape") { e.preventDefault(); closeLayer(); return; }
    if (e.key === "Tab") {
      var f = focusables(openLayerEl);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* click outside panel closes */
  document.addEventListener("click", function (e) {
    if (openLayerEl && e.target === openLayerEl) closeLayer();
  });

  /* -------------------------------------------------------- product cards */
  function priceHtml(p) {
    var html = '<span class="price__now' + (p.compareAt ? " is-offer" : "") + '">' + fmt(p.price) + "</span>";
    if (p.compareAt && p.compareAt > p.price) {
      html += ' <s class="price__was"><span class="visually-hidden">Originally </span>' + fmt(p.compareAt) + "</s>";
    }
    return '<p class="price">' + html + "</p>";
  }

  function card(p, opts) {
    opts = opts || {};
    var cat = R.categories[p.category];
    var badge = p.badge ? '<span class="badge' + (p.compareAt ? " badge--offer" : "") + '">' + esc(p.badge) + "</span>" : "";
    return '<article class="product-card">' +
      '<div class="product-card__media">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.alt) + '" loading="lazy" width="800" height="1000">' +
        badge +
        (p.demo ? '<span class="sample-tag" title="Sample product for preview — not real inventory">Sample</span>' : "") +
      "</div>" +
      '<div class="product-card__body">' +
        '<p class="product-card__eyebrow">' + esc(opts.showCategory && cat ? cat.name : sectionName(p)) + "</p>" +
        '<h3 class="product-card__title">' + esc(p.name) + "</h3>" +
        (opts.hideDesc ? "" : '<p class="product-card__desc">' + esc(p.description) + "</p>") +
        priceHtml(p) +
        '<div class="product-card__actions">' +
          '<button type="button" class="btn btn--outline btn--sm" data-quick="' + esc(p.id) + '" aria-label="View details: ' + esc(p.name) + '">View Details</button>' +
          '<button type="button" class="btn btn--dark btn--sm" data-add="' + esc(p.id) + '" aria-label="Add ' + esc(p.name) + ' to bag">Add to Bag</button>' +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function demoNote() {
    return R.catalogIsDemo
      ? '<p class="demo-note"><span aria-hidden="true">✦</span> Products shown are sample items for preview only — names and prices are placeholders, not current RoBella inventory.</p>'
      : "";
  }

  /* Simple grids: <div data-product-grid="new|favorites|category:clothing" data-limit="8"> */
  function renderGrids() {
    $all("[data-product-grid]").forEach(function (el) {
      var key = el.getAttribute("data-product-grid");
      var limit = parseInt(el.getAttribute("data-limit"), 10) || 99;
      var list = R.products.filter(function (p) {
        if (key === "new") return p.isNew;
        if (key === "favorites") return p.badge === "Favorite";
        if (key.indexOf("category:") === 0) return p.category === key.slice(9);
        return false;
      }).slice(0, limit);
      el.innerHTML = list.length
        ? '<div class="product-grid">' + list.map(function (p) { return card(p, { showCategory: true, hideDesc: true }); }).join("") + "</div>" + demoNote()
        : '<p class="empty-state">New pieces are on their way — check back soon.</p>';
    });
  }

  /* Category collection: <section data-collection="clothing"> */
  function renderCollection(el) {
    var key = el.getAttribute("data-collection");
    var isSale = key === "sale";
    var groups = isSale ? R.saleSections : (R.categories[key] ? R.categories[key].sections : []);
    var pool = R.products.filter(function (p) {
      return isSale ? (p.compareAt && p.saleSection) : p.category === key;
    });
    var state = { filter: "all", sort: "featured" };

    el.innerHTML =
      '<div class="toolbar">' +
        '<div class="chips" role="group" aria-label="Filter by section">' +
          '<button type="button" class="chip is-active" aria-pressed="true" data-filter="all">All</button>' +
          groups.map(function (g) {
            return '<button type="button" class="chip" aria-pressed="false" data-filter="' + g.id + '">' + esc(g.name) + "</button>";
          }).join("") +
        "</div>" +
        '<div class="toolbar__right">' +
          '<p class="toolbar__count" aria-live="polite" data-count></p>' +
          '<label class="sort"><span>Sort</span><select data-sort>' +
            '<option value="featured">Featured</option>' +
            '<option value="price-asc">Price: Low to High</option>' +
            '<option value="price-desc">Price: High to Low</option>' +
            '<option value="name">Name: A–Z</option>' +
          "</select></label>" +
        "</div>" +
      "</div>" +
      '<div class="collection" data-groups></div>' + demoNote();

    var mount = $("[data-groups]", el);

    function sorted(list) {
      var l = list.slice();
      if (state.sort === "price-asc") l.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "price-desc") l.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "name") l.sort(function (a, b) { return a.name.localeCompare(b.name); });
      return l;
    }

    function draw() {
      var total = 0;
      mount.innerHTML = groups.map(function (g, i) {
        if (state.filter !== "all" && state.filter !== g.id) return "";
        var items = sorted(pool.filter(function (p) { return (isSale ? p.saleSection : p.section) === g.id; }));
        total += items.length;
        var n = items.length;
        /* the intro tile fills the remaining columns of the first row (4-col and 3-col layouts) */
        var span4 = n % 4 === 0 ? 4 : 4 - (n % 4);
        var span3 = n % 3 === 0 ? 3 : 3 - (n % 3);
        return '<div class="collection-group" id="' + g.id + '">' +
          '<div class="product-grid product-grid--group">' +
            '<header class="group-intro" style="--span4:' + span4 + ";--span3:" + span3 + '">' +
              '<span class="group-intro__num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
              '<h3 class="group-intro__title">' + esc(g.name) + "</h3>" +
              '<p class="group-intro__blurb">' + esc(g.blurb) + "</p>" +
              '<p class="group-intro__count">' + n + (n === 1 ? " piece" : " pieces") + "</p>" +
            "</header>" +
            (n ? items.map(function (p) { return card(p, { showCategory: isSale }); }).join("")
               : '<p class="empty-state">New pieces for this edit are on their way — check back soon.</p>') +
          "</div>" +
        "</div>";
      }).join("");
      $("[data-count]", el).textContent = total + (total === 1 ? " item" : " items");
    }

    el.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (!chip) return;
      state.filter = chip.getAttribute("data-filter");
      $all("[data-filter]", el).forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      draw();
    });
    $("[data-sort]", el).addEventListener("change", function (e) { state.sort = e.target.value; draw(); });
    draw();

    /* edit index links (data-edit-index) reset filter then scroll */
    $all("[data-edit-index] a[href^='#']").forEach(function (a) {
      a.addEventListener("click", function () {
        if (state.filter !== "all") { $("[data-filter='all']", el).click(); }
      });
    });
  }

  /* Edit index: numbered list of sections <div data-edit-index="clothing"> */
  function renderEditIndex() {
    $all("[data-edit-index]").forEach(function (el) {
      var key = el.getAttribute("data-edit-index");
      var groups = key === "sale" ? R.saleSections : (R.categories[key] ? R.categories[key].sections : []);
      el.innerHTML = '<ol class="edit-index">' + groups.map(function (g, i) {
        return '<li><a href="#' + g.id + '"><span class="edit-index__num">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="edit-index__name">' + esc(g.name) + "</span>" +
          '<span class="edit-index__blurb">' + esc(g.blurb) + "</span>" +
          '<span class="edit-index__go">Explore ' + ICON.arrow + "</span></a></li>";
      }).join("") + "</ol>";
    });
  }

  /* ------------------------------------------------------------ quick view */
  function openQuickView(id) {
    var p = Cart.product(id);
    if (!p) return;
    var cat = R.categories[p.category];
    var qv = $("#quick-view");
    $("[data-qv-body]", qv).innerHTML =
      '<button class="icon-btn modal__close" type="button" aria-label="Close product details" data-close-layer>' + ICON.close + "</button>" +
      '<div class="qv">' +
        '<div class="qv__media"><img src="' + esc(p.image) + '" alt="' + esc(p.alt) + '"></div>' +
        '<div class="qv__info">' +
          '<p class="eyebrow">' + esc(cat ? cat.name : "") + " · " + esc(sectionName(p)) + "</p>" +
          '<h2 id="qv-title" class="qv__title">' + esc(p.name) + "</h2>" +
          priceHtml(p) +
          '<p class="qv__desc">' + esc(p.description) + "</p>" +
          (p.demo ? '<p class="demo-note demo-note--inline">Sample product shown for preview only — the name and price are placeholders until RoBella’s real inventory is added.</p>' : "") +
          '<div class="qv__buy">' +
            '<div class="qty" data-qty><button type="button" aria-label="Decrease quantity" data-step="-1">' + ICON.minus + "</button>" +
            '<input type="number" min="1" max="99" value="1" aria-label="Quantity" inputmode="numeric">' +
            '<button type="button" aria-label="Increase quantity" data-step="1">' + ICON.plus + "</button></div>" +
            '<button type="button" class="btn btn--dark" data-qv-add="' + esc(p.id) + '">Add to Bag</button>' +
          "</div>" +
          (cat ? '<a class="text-link" href="' + cat.url + "#" + p.section + '">More from ' + esc(sectionName(p)) + " " + ICON.arrow + "</a>" : "") +
        "</div>" +
      "</div>";
    openLayer(qv, $(".modal__close", qv));
  }

  /* -------------------------------------------------------------- bag UI */
  function renderBag() {
    var items = Cart.items();
    var count = Cart.count();
    $all("[data-bag-count]").forEach(function (b) { b.textContent = count; b.classList.toggle("is-empty", count === 0); });
    var bagBtn = $(".bag-btn");
    if (bagBtn) bagBtn.setAttribute("aria-label", "Open shopping bag, " + count + (count === 1 ? " item" : " items"));
    var ct = $("[data-bag-count-text]");
    if (ct) ct.textContent = "(" + count + ")";

    var list = $("[data-bag-items]");
    var foot = $("[data-bag-foot]");
    if (!list) return;

    if (!items.length) {
      list.innerHTML = '<div class="bag__empty"><p class="script">Your bag is empty</p>' +
        "<p>Discover something beautiful — every item tells a story.</p>" +
        '<a class="btn btn--dark" href="index.html#new-arrivals">Explore the Collection</a></div>';
      foot.innerHTML = "";
      return;
    }

    list.innerHTML = '<ul class="bag__list">' + items.map(function (it) {
      var p = Cart.product(it.id);
      return '<li class="bag-line" data-line="' + esc(p.id) + '">' +
        '<img src="' + esc(p.image) + '" alt="" width="80" height="100">' +
        '<div class="bag-line__info">' +
          '<p class="bag-line__name">' + esc(p.name) + (p.demo ? ' <span class="sample-tag sample-tag--inline">Sample</span>' : "") + "</p>" +
          '<p class="bag-line__price">' + fmt(p.price) + "</p>" +
          '<div class="bag-line__row">' +
            '<div class="qty qty--sm" data-qty data-line-qty="' + esc(p.id) + '">' +
              '<button type="button" aria-label="Decrease quantity of ' + esc(p.name) + '" data-step="-1">' + ICON.minus + "</button>" +
              '<input type="number" min="1" max="99" value="' + it.qty + '" aria-label="Quantity of ' + esc(p.name) + '" inputmode="numeric">' +
              '<button type="button" aria-label="Increase quantity of ' + esc(p.name) + '" data-step="1">' + ICON.plus + "</button>" +
            "</div>" +
            '<button type="button" class="link-btn bag-line__remove" data-remove="' + esc(p.id) + '">Remove</button>' +
          "</div>" +
        "</div>" +
        '<p class="bag-line__total">' + fmt(p.price * it.qty) + "</p>" +
      "</li>";
    }).join("") + "</ul>";

    foot.innerHTML =
      '<div class="bag__subtotal"><span>Subtotal</span><span>' + fmt(Cart.subtotal()) + "</span></div>" +
      '<p class="bag__note">Shipping and taxes will be calculated once checkout is available.</p>' +
      '<button type="button" class="btn btn--dark btn--block" disabled aria-describedby="checkout-note">Checkout — Coming Soon</button>' +
      '<p class="bag__note bag__note--notice" id="checkout-note">Online checkout is not connected yet. A payment provider must be integrated before orders can be placed — no payment will be taken and no order is created.</p>';
  }

  function toast(msg) {
    var t = $("[data-toast]");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("is-visible"); }, 2600);
  }

  /* --------------------------------------------------------------- search */
  function searchProducts(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/);
    return R.products.map(function (p) {
      var cat = R.categories[p.category];
      var hay = [p.name, p.description, cat ? cat.name : "", sectionName(p), p.compareAt ? "sale offer" : "", p.isNew ? "new arrival" : ""].join(" ").toLowerCase();
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        if (hay.indexOf(terms[i]) === -1) return null;
        if (p.name.toLowerCase().indexOf(terms[i]) !== -1) score += 2; else score += 1;
      }
      return { p: p, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).map(function (x) { return x.p; });
  }

  function renderSearch(q) {
    var out = $("[data-search-results]");
    var status = $("[data-search-status]");
    if (!q.trim()) {
      status.textContent = "";
      out.innerHTML = '<p class="search-suggest__label">Browse by category</p><ul class="search-suggest">' +
        NAV.slice(1).map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") + "</ul>";
      return;
    }
    var res = searchProducts(q);
    status.textContent = res.length ? res.length + (res.length === 1 ? " result" : " results") + " for “" + q.trim() + "”" : "No results for “" + q.trim() + "”. Try another word, such as dress, gold or candle.";
    out.innerHTML = res.length
      ? '<ul class="search-list">' + res.slice(0, 12).map(function (p) {
          var cat = R.categories[p.category];
          return '<li><button type="button" class="search-item" data-quick="' + esc(p.id) + '">' +
            '<img src="' + esc(p.image) + '" alt="" width="64" height="80" loading="lazy">' +
            '<span class="search-item__text"><span class="search-item__cat">' + esc(cat ? cat.name : "") + "</span>" +
            '<span class="search-item__name">' + esc(p.name) + "</span>" +
            '<span class="search-item__price">' + fmt(p.price) + (p.demo ? " · Sample" : "") + "</span></span></button></li>";
        }).join("") + "</ul>"
      : "";
  }

  /* ----------------------------------------------------------- newsletter */
  function initNewsletters() {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $all("[data-newsletter]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = $("input[type=email]", form);
        var msg = $(".newsletter-form__msg", form);
        var v = input.value.trim();
        form.classList.remove("is-error", "is-success");
        if (!v) {
          form.classList.add("is-error"); input.setAttribute("aria-invalid", "true");
          msg.textContent = "Please enter your email address."; input.focus(); return;
        }
        if (!re.test(v)) {
          form.classList.add("is-error"); input.setAttribute("aria-invalid", "true");
          msg.textContent = "Please enter a valid email address, like name@example.com."; input.focus(); return;
        }
        input.removeAttribute("aria-invalid");
        form.classList.add("is-success");
        msg.textContent = "Thank you for your interest! Newsletter sign-up is not connected yet, so your email has not been saved. Please check back soon.";
        input.value = "";
      });
    });
  }

  /* --------------------------------------------------------- global events */
  function stepQty(wrap, delta) {
    var input = $("input", wrap);
    var v = Math.min(99, Math.max(wrap.hasAttribute("data-line-qty") ? 0 : 1, (parseInt(input.value, 10) || 1) + delta));
    input.value = v;
    if (wrap.hasAttribute("data-line-qty")) Cart.setQty(wrap.getAttribute("data-line-qty"), v);
  }

  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-open-menu]"))) { lastFocus = t; openLayer($("#mobile-menu")); return; }
    if ((t = e.target.closest("[data-open-search]"))) {
      lastFocus = t; openLayer($("#search-layer"), $("[data-search-input]"));
      renderSearch($("[data-search-input]").value); return;
    }
    if ((t = e.target.closest("[data-open-bag]"))) { lastFocus = t; renderBag(); openLayer($("#bag-drawer")); return; }
    if ((t = e.target.closest("[data-close-layer]"))) { closeLayer(); return; }
    if ((t = e.target.closest("[data-quick]"))) {
      if (!openLayerEl) lastFocus = t;
      openQuickView(t.getAttribute("data-quick")); return;
    }
    if ((t = e.target.closest("[data-add]"))) {
      var p = Cart.product(t.getAttribute("data-add"));
      Cart.add(p.id, 1);
      toast("“" + p.name + "” added to your bag");
      t.classList.add("is-added");
      setTimeout(function () { t.classList.remove("is-added"); }, 900);
      return;
    }
    if ((t = e.target.closest("[data-qv-add]"))) {
      var qv = $("#quick-view");
      var q = parseInt($("[data-qty] input", qv).value, 10) || 1;
      var pr = Cart.product(t.getAttribute("data-qv-add"));
      Cart.add(pr.id, q);
      closeLayer(true);
      renderBag();
      openLayer($("#bag-drawer"));
      return;
    }
    if ((t = e.target.closest("[data-step]"))) { stepQty(t.closest("[data-qty]"), parseInt(t.getAttribute("data-step"), 10)); return; }
    if ((t = e.target.closest("[data-remove]"))) {
      var name = (Cart.product(t.getAttribute("data-remove")) || {}).name;
      Cart.remove(t.getAttribute("data-remove"));
      toast("“" + name + "” removed from your bag");
      var first = focusables($("#bag-drawer"))[0]; if (first) first.focus();
      return;
    }
    /* in-page anchor links inside the mobile menu / search close the layer */
    if ((t = e.target.closest(".layer a[href]")) && openLayerEl) { closeLayer(true); }
  });

  document.addEventListener("change", function (e) {
    var wrap = e.target.closest("[data-line-qty]");
    if (wrap && e.target.matches("input")) Cart.setQty(wrap.getAttribute("data-line-qty"), e.target.value);
    var q = e.target.closest("[data-qty]:not([data-line-qty]) input");
    if (q) q.value = Math.min(99, Math.max(1, parseInt(q.value, 10) || 1));
  });

  /* ----------------------------------------------------------------- init */
  renderHeader();
  renderFooter();
  renderGrids();
  renderEditIndex();
  $all("[data-collection]").forEach(renderCollection);
  initNewsletters();
  renderBag();
  Cart.onChange(renderBag);

  var si = $("[data-search-input]");
  if (si) {
    si.addEventListener("input", function () { renderSearch(si.value); });
    $("[data-search-form]").addEventListener("submit", function (e) { e.preventDefault(); renderSearch(si.value); });
  }

  /* re-apply hash scroll after dynamic content rendered */
  if (location.hash && location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      setTimeout(function () { target.scrollIntoView(); }, 50);
      /* again once images/fonts have settled the layout */
      window.addEventListener("load", function () { target.scrollIntoView(); });
    }
  }

  /* compact header shadow on scroll */
  var hdr = $(".site-header");
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle("is-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* reveal-on-scroll */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $all(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $all(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
