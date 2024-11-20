const CACHE_NAME = 'dosbox-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './game.zip',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.jsdelivr.net/npm/js-dos@8.1.16/dist/js-dos.js',
];

// Install the Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch files from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update the Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
