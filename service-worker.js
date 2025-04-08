const CACHE_NAME = "gesture-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/home.html",
  "/gesture2.html",
  "/offline.html",
  "/images/deafy logo.png",
  "/images/home.png",
  "/images/to-do-list.png",
  "/images/user.png",
  "/images/language.png",
  "/images/swap.png",
  // Add all other local files you want to cache
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cache => {
        if (cache !== CACHE_NAME) return caches.delete(cache);
      })
    ))
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).catch(() => caches.match('/offline.html')))
  );
});
