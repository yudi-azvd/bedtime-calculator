let cacheName = 'bedtime-calculator'
let filesToCache = [
  './',
  './public/index.html',
  './public/favicon.png',
  './public/styles/global.css',
  './public/styles/index.css',
  './public/styles/input-time-bootstraped.css',
  './public/styles/tab.css',
  './public/styles/tab.css',
]

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil((async() => {
    const cache = await caches.open(cacheName)
    console.log('[Service Worker] caching content');
    await cache.addAll(filesToCache)
  })())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})