let cacheName = 'bedtime-calculator'
let filesToCache = [
  './',
  './index.html',
  './js/main.js',
  './css/style.css',
]

// if (isHostedOnGithub) {
//   filesToCache = filesToCache.map(file => 'pwa-basic/' + file)
// }

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