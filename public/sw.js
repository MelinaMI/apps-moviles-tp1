const CACHE_NAME = 'gamebox-shell'; 
const API_CACHE = 'gamebox-api'

const SHELL_RESOURCES = [ 
  '/', 
  '/manifest.json',
  '/icons/web-app-manifest-192x192.png',
  '/icons/web-app-manifest-512x512.png'
]; 


self.addEventListener('install', event => { 
  event.waitUntil( 
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_RESOURCES)) 
  ); 
});



self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME && k !== API_CACHE)
        .map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});



self.addEventListener('fetch', event => { 
  
    if (event.request.method !== 'GET') return;
  
    event.respondWith(     
        fetch(event.request)
            .then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then(cached => {
                    if (!cached && event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                    return cached;
                });
            })
    ); 
}); 

