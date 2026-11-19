/* Keeps the app shell available and lets the phone offer "Install app".
   Data and Microsoft sign-in are never cached.

   HOW UPDATES WORK
   - Every time this file changes (the version number below), the browser downloads it
     in the background and installs the new version.
   - The new version takes over at once (skipWaiting), and the page shows a banner
     ("A new version is ready") from update.js so the person can reload.
   - To release an update: change the version number below and upload the changed files. */
var CACHE = "syshhb-helpdesk-v11";
var SHELL = ["./", "index.html", "config.js", "update.js", "manifest.json", "app-icon-192.png", "app-icon-512.png", "msal-browser.min.js"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;               /* Microsoft, OneDrive and fonts: network only */
  if (url.pathname.indexOf("/api/") === 0) return;          /* never keep the server's answers on the phone */
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
