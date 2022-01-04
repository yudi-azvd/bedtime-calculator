let cacheName = 'bedtime-calculator'
let filesToCache = [
  './dist/',
  './dist/index.html',
  './dist/favicon.png',
  './dist/styles/global.css',
  './dist/styles/index.css',
  './dist/styles/input-time-bootstraped.css',
  './dist/styles/tab.css',
  './dist/dist/main.js',
  './dist/dist/util/dateToTimeString.js',
  './dist/dist/services/.js',
  './dist/presentation/TabAbout.js',
  './dist/presentation/Tab.js',
  './dist/presentation/TabManager.js',
  './dist/presentation/TabManagerMenu.js',
  './dist/presentation/TabSleep.js',
  './dist/presentation/TabWakeUp.js',
  './dist/service/CalculateOneSleepCycleBeforeService.js',
  './dist/service/CalculateOneSleepCycleLaterService.js',
  './dist/service/CalculateOneSleepCycleService.js',
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