const CACHE_NAME = "pro-coach-ia-v1";

// Ao instalar, não precisa cachear nada — o app real está no Streamlit
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Estratégia: network first — sempre busca do Streamlit, nunca serve cache
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
