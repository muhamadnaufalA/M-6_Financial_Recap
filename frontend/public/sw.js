let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                '/localhost:5000/login',
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
                '/recap',
                '/budgetrule',
                '/category',
                '/',
            ]);
        })
    );
});

// // this.addEventListener("fetch", (event) => {
// //     if (!navigator.onLine) {
// //         event.respondWith(
// //             caches.match(event.request).then((resp) => {
// //                 if (resp) {
// //                     return resp;
// //                 }
// //                 let requestUrl = event.request.clone();
// //                 return fetch(requestUrl).then((fetchResp) => {
// //                     if (!fetchResp || fetchResp.status !== 200 || fetchResp.type !== "basic") {
// //                         return fetchResp;
// //                     }

// //                     let responseToCache = fetchResp.clone();

// //                     caches.open(cacheData).then((cache) => {
// //                         cache.put(event.request, responseToCache);
// //                     });

// //                     return fetchResp;
// //                 });
// //             })
// //         );
// //     }
// // });


this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached response if it exists
            if (cachedResponse) {
                return cachedResponse;
            }

            // If not in the cache, make a network request and cache the response
            return fetch(event.request).then((networkResponse) => {
                // Open the cache and store the new response
                return caches.open(cacheData).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch((error) => {
                // Handle errors during fetch
                console.error   ("Fetch error:", error);
            });
        })
    );
    
});

