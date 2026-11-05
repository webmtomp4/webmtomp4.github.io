const CACHE_VERSION = 'webmtomp4-pwa-v1.0.0';
const CORE_ASSETS = [
  '/',
  '/es/',
  '/pt/',
  '/de/',
  '/fr/',
  '/ja/',
  '/zh/',
  '/ru/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/og-image.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/ffmpeg/worker.js',
  '/ffmpeg/const.js',
  '/ffmpeg/errors.js',
  '/ffmpeg/ffmpeg-core.js',
  '/ffmpeg/ffmpeg-core.wasm',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      // Cache core shell first, then FFmpeg WASM assets without failing install if one asset is slow
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          // Continue caching remaining assets
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_VERSION) {
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Offline-first strategy for static assets, /_astro/ bundles, and /ffmpeg/ WebAssembly binaries
  if (
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/ffmpeg/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webmanifest')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cloned = networkResponse.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(request, cloned));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // Offline-capable strategy for HTML navigation routes
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, cloned));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          return caches.match('/');
        })
    );
    return;
  }

  // Default fallback: Cache first, then network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
