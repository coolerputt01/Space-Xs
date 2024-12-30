const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/landing.html',
  './styles/index.css', // Add your CSS file
  './scripts/index.js',  // Add your JavaScript file
  './styles/landing.css', // Add your CSS file
  './scripts/landing.js',  // Add your JavaScript file
  './assets/rocket.glb',
  './assets/telescope.svg',
 './assets/rocket.svg',
 '/assets/world.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

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