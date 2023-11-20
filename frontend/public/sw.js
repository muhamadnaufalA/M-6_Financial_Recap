let cacheData = "appV1";

this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/frontend/src/App.js',
                '/adminkit/css/app.css',
                '/static/js/bundle.js',
                '/adminkit/js/app.js',
                '/adminkit/js/charts.js',
                'index.html',
                '/dashboard',
                '/income',
                '/outcome',
                '/wallet',
                '/budgetrule',
                '/category',
                '/'
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((resp)=>{
            if(resp)
            {
                return resp
            }
        })
    )
})