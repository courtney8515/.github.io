/* ==========================================================================
   RoBella — Shopping bag (front-end only)
   Persists line items in localStorage. No payment or order processing is
   performed here — checkout requires a payment provider / backend.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "robella-bag-v1";
  var listeners = [];
  var memoryFallback = [];

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      var data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return memoryFallback.slice();
    }
  }

  function write(items) {
    memoryFallback = items.slice();
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
    listeners.forEach(function (fn) { fn(items); });
  }

  function findProduct(id) {
    var list = (window.ROBELLA && window.ROBELLA.products) || [];
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  /* Only keep items that still exist in the catalog */
  function items() {
    return read().filter(function (it) { return findProduct(it.id) && it.qty > 0; });
  }

  var Cart = {
    items: items,
    product: findProduct,
    add: function (id, qty) {
      if (!findProduct(id)) return;
      qty = Math.max(1, parseInt(qty, 10) || 1);
      var list = items();
      var line = list.filter(function (it) { return it.id === id; })[0];
      if (line) { line.qty = Math.min(99, line.qty + qty); } else { list.push({ id: id, qty: qty }); }
      write(list);
    },
    setQty: function (id, qty) {
      qty = parseInt(qty, 10) || 0;
      var list = items();
      if (qty <= 0) { list = list.filter(function (it) { return it.id !== id; }); }
      else { list.forEach(function (it) { if (it.id === id) it.qty = Math.min(99, qty); }); }
      write(list);
    },
    remove: function (id) { this.setQty(id, 0); },
    clear: function () { write([]); },
    count: function () { return items().reduce(function (n, it) { return n + it.qty; }, 0); },
    subtotal: function () {
      return items().reduce(function (sum, it) { var p = findProduct(it.id); return sum + (p ? p.price * it.qty : 0); }, 0);
    },
    onChange: function (fn) { listeners.push(fn); }
  };

  /* Sync across open tabs */
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) listeners.forEach(function (fn) { fn(items()); });
  });

  window.RoBellaCart = Cart;
})();
