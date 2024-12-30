const CACHE_NAME = 'v2'; // Update the cache name
const urlsToCache = [
  '/index.html?v=12345', // Add a version query parameter
  '/landing.html?v=12345',
  './styles/index.css?v=12345',
  './scripts/index.js?v=12345',
  './styles/landing.css?v=12345',
  './scripts/landing.js?v=12345',
  './assets/rocket.glb?v=12345',
  './assets/telescope.svg?v=12345',
  './assets/rocket.svg?v=12345',
  '/assets/world.svg?v=12345'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});