self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Network only. The handler exists so Chrome can offer install.
// Do not cache diary, vault, or recovery responses.
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
