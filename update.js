/* Automatic update notice for the SYSHHB IT Helpdesk.
   When a new version is published, the phone or computer downloads it in the background
   (sw.js). This file then shows a small banner so the person can reload with one tap.
   Nothing is reloaded automatically, so work in progress is never lost. */
(function () {
  if (!("serviceWorker" in navigator)) return;
  if (!(location.protocol === "https:" || location.hostname === "localhost")) return;

  var malay = document.documentElement.lang === "ms";
  var hadController = !!navigator.serviceWorker.controller;
  var shown = false;

  function banner() {
    if (shown) return;
    shown = true;
    var box = document.createElement("div");
    box.setAttribute("role", "status");
    box.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));" +
      "z-index:9999;max-width:560px;margin:0 auto;display:flex;gap:10px;align-items:center;justify-content:space-between;" +
      "background:#13241A;color:#fff;border-radius:12px;padding:12px 14px;box-shadow:0 10px 30px rgba(0,0,0,.28);" +
      "font:500 14px/1.4 system-ui,'Segoe UI',sans-serif";

    var text = document.createElement("span");
    text.textContent = malay ? "Versi baharu helpdesk sudah sedia." : "A new version of the helpdesk is ready.";

    var reload = document.createElement("button");
    reload.textContent = malay ? "Muat semula" : "Reload";
    reload.style.cssText = "background:#1D8A3A;color:#fff;border:0;border-radius:8px;padding:8px 14px;font:650 14px system-ui,sans-serif;cursor:pointer;white-space:nowrap";
    reload.onclick = function () { location.reload(); };

    var later = document.createElement("button");
    later.textContent = malay ? "Kemudian" : "Later";
    later.style.cssText = "background:transparent;color:#B4CBB8;border:0;padding:8px 6px;font:600 14px system-ui,sans-serif;cursor:pointer;white-space:nowrap";
    later.onclick = function () { box.remove(); shown = false; };

    box.appendChild(text);
    var btns = document.createElement("span");
    btns.style.cssText = "display:flex;gap:6px;align-items:center";
    btns.appendChild(later);
    btns.appendChild(reload);
    box.appendChild(btns);
    document.body.appendChild(box);
  }

  /* A new service worker has taken over. Only show the banner if this page was already
     controlled (so the very first install does not show a banner). */
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (hadController) banner();
    hadController = true;
  });

  /* Ask the browser to look for a new sw.js: when the page opens, every 30 minutes,
     and when the person comes back to the tab. */
  function check() {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) reg.update();
    }).catch(function () {});
  }
  window.addEventListener("load", function () {
    check();
    setInterval(check, 30 * 60 * 1000);
  });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") check();
  });
})();
