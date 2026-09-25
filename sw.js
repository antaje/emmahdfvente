// EmmaHdfVente : garde l'application disponible même sans réseau.
// Change le numéro de version quand tu modifies un fichier, pour forcer la mise à jour sur les téléphones.
const VERSION = "emmahdf-v5";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./firebase-config.js",
  "./icons/logo.png", "./icons/icon-192.png", "./icons/icon-512.png",
  "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"
];
const CDN = [/^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/xlsx\//, /^https:\/\/www\.gstatic\.com\/firebasejs\//, /^https:\/\/fonts\.(googleapis|gstatic)\.com\//];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fichiers de l'application : réseau d'abord (mises à jour), cache si pas de réseau
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }
  // Bibliothèque Firebase et polices : cache d'abord
  if (CDN.some(r => r.test(req.url))) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; }))
    );
  }
  // Tout le reste (base de données, connexion) n'est pas touché : Firebase gère lui-même le hors-ligne.
});
