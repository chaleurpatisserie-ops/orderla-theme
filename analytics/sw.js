/* Keeps the app shell (page, fonts, icons) for quick opening. Never caches Google data or sign-in. */
var CACHE = 'ca-analytics-v1';
var SHELL = ['./', './index.html', './dash.js', './d3.min.js', './app.css?v=1', './page.css?v=1', './calcs.js?v=1', './draws.js?v=1', './detail.js?v=1', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './fonts/montserrat-400.woff2', './fonts/montserrat-500.woff2', './fonts/montserrat-600.woff2', './fonts/montserrat-700.woff2', '../img/logo-wordmark-cream.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; /* Google APIs and sign-in go straight to the network */
  e.respondWith(fetch(e.request).then(function (r) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); return r; }).catch(function () { return caches.match(e.request); }));
});
