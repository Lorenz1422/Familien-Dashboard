const CACHE_NAME = "familienzentrale-shell-v1";
const APP_START = "./";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(APP_START, { cache: "reload" });
      if (response.ok) await cache.put(APP_START, response);
    } catch (error) {
      // Die Installation darf auch bei vorübergehend fehlender Verbindung fortfahren.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

/* Nur die Navigation zur Startseite wird als Notlösung zwischengespeichert.
   Supabase-Aufrufe, Anmeldung und persönliche Familiendaten werden NICHT gecacht. */
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.mode !== "navigate") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(APP_START, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(APP_START);
      if (cached) return cached;
      return new Response("Die Familienzentrale ist gerade nicht erreichbar. Bitte prüfe deine Internetverbindung.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
