const CACHE_NAME = 'zainabiyya-db-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './student.html',
  './staff.html',
  './library.html',
  './style.css',
  './app.js',
  './staff.js',
  './library.js',
  './tailwindcss.js',
  './chart.js',
  './logo.png.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
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
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
