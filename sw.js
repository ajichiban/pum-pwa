// Asignar un nombre y version al cache

const CACHE_NAME = 'v1_cache_pum_gp',
    urlsToCache = [
        './',
        './fonts/AlexBrush-Regular.ttf',
        './fonts/HaloHAndletter.otf',
        './css/app.css',
        './css/font-awesome.css',
        './css/fonts.css',
        './img/amor.svg',
        './img/besos.svg',
        './img/corazones.svg',
        './img/enamorado.svg',
        './img/favicon-128x128.png',
        './img/flor.svg',
        './img/Foto0879.jpg',
        './img/Foto0947.jpg',
        './img/frame-2.png',
        './img/puerta.png',
        './img/te-amo.svg',
        './app.js'

    ]

/* Los ServiceWorker tiene  tres principales eventos */ 

// Install , durante este  evento , eneralmente se almacena 
// en cache los activos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>{
                return cache.addAll(urlsToCache)
                    .then(()=> self.skipWaiting())
            })
            .catch(err=> console.log('Fallo registro del cache', err))
    )
})

// Active , se  activa  el SW y busca los recursos para hecer que 
// funcione sin conexion
self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                cachesNames.map(cacheName =>{
                    //eliminamos lo que ya no se necesita en la cache
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
            })
            // le indica al SW activar la cache actual
            .then(()=> self.clients.claim()) 
    )
})

//Fetch, cuando el navegador recupera una url
self.addEventListener('fetch', e =>{
    
    e.respondWith(
        caches.match(e.request)
            .then(res =>{
                if(res){
                    // recuperar del cache
                    return res
                }
                return fetch(e.request)
            })
    )
})