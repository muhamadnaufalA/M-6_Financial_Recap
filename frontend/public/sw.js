// let cacheData = "appV1";

// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             return cache.addAll([
//                 '/',
//                 'index.html'
//             ]);
//         })
//     );
// });


// this.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((cachedResponse) => {
//             // Return the cached response if it exists
//             if (cachedResponse) {
//                 return cachedResponse;
//             }

//             // If not in the cache, make a network request and cache the response
//             return fetch(event.request).then((networkResponse) => {
//                 // Open the cache and store the new response
//                 caches.open(cacheData).then((cache) => {
//                     cache.put(event.request, networkResponse.clone());
//                 });
//                 return networkResponse;
//             }).catch((error) => {
//                 // Handle errors during fetch
//                 console.error   ("Fetch error:", error);
//             });
//         })
//     );
    
// });

// this.addEventListener("fetch", (event) => {
//     if (!navigator.onLine) {
//         event.respondWith(
//             caches.match(event.request).then((resp) => {
//                 if (resp) {
//                     return resp;
//                 }
//                 let requestUrl = event.request.clone();
//                 return fetch(requestUrl).then((fetchResp) => {
//                     if (!fetchResp || fetchResp.status !== 200 || fetchResp.type !== "basic") {
//                         return fetchResp;
//                     }

//                     let responseToCache = fetchResp.clone();

//                     caches.open(cacheData).then((cache) => {
//                         cache.put(event.request, responseToCache);
//                     });

//                     return fetchResp;
//                 });
//             })
//         );
//     }
// });


let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/dashboard',
                '/budgetrule',
                '/category',
                '/wallets',
                '/incomes',
                '/outcomes',
                '/recap',
                '/report',
                '/recap'
            ]);
        })
    );
});

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // Return the cached response if it exists
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If not in the cache, make a network request and cache the response
                return fetch(event.request).then((networkResponse) => {
                    return networkResponse;
                
                }).catch((error) => {
                    // Handle errors during fetch
                    console.error("Fetch error:", error);
                });
            })
        );
    }
});

