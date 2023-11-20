//////////////////////////////////////////////////// COBA COBA ////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////// NGIKUTIN TUTOR 2 ////////////////////////////////////////////////////////////////

// const staticCacheName = 'site-static'
// const assets = [
//       '/',
//       '/src/App.js',
//       '/src/pages/Dashboard.js',
//       '/adminkit/js/app.js',
//       '/adminkit/css/app.css',
//       '/adminkit/js/charts.js',
//       '/static/js/bundle.js',
//       '/manifest.json',
//       '/favicon.ico',
//       'index.html',
//       '/register',
//       '/dashboard',
//       '/budgetrule',
//       '/category',
//       '/wallets',
//       '/income',
//       '/outcome',
//       '/recap'
// ]

// self.addEventListener('install', evt=>{
//     // console.log('service work ke install');
//     evt.waitUntil(
//         caches.open(staticCacheName).then(cache => {
//             console.log("cache semua asset");
//             cache.addAll(assets);
//         })
//     );
// });

// self.addEventListener('activate', evt=>{
//     console.log('service work active');
// });

// self.addEventListener('fetch', evt=>{
//     // console.log('fetch event', evt);
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             if (cacheRes){
//                 return cacheRes || fetch(evt.request);
//             }
//             // If not in the cache, make a network request and cache the response
//             return fetch(evt.request).then((networkResponse) => {
//                 return networkResponse;
            
//             }).catch((error) => {
//                 // Handle errors during fetch
//                 console.error("Fetch error:", error);
//             });
//         })

//     )
// });


//////////////////////////////////////////////////// NGIKUTIN TUTOR 1 ////////////////////////////////////////////////////////////////
// let cacheData = "appV1";

// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             return cache.addAll([
//                 '/',
//                 '/src/App.js',
//                 '/src/pages/Dashboard.js',
//                 '/adminkit/js/app.js',
//                 '/adminkit/css/app.css',
//                 '/adminkit/js/charts.js',
//                 '/static/js/bundle.js',
//                 '/manifest.json',
//                 '/favicon.ico',
//                 'index.html',
//                 '/register',
//                 '/dashboard',
//                 '/budgetrule',
//                 '/category',
//                 '/wallets',
//                 '/income',
//                 '/outcome',
//                 '/recap'
//             ]);
//         })
//     );
// });

// this.addEventListener("fetch", (event) => {
    
//         event.respondWith(
//             caches.match(event.request).then((cachedResponse) => {
//                 // Return the cached response if it exists
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }

//                 // If not in the cache, make a network request and cache the response
//                 return fetch(event.request).then((apiResponse) => {
//                     const responseClone = apiResponse.clone();
//                     caches.open(cacheData).then((cache)=>{
//                         cache.put(event.request, responseClone);
//                     })
//                     return apiResponse;
                
//                 }).catch((error) => {
//                     // Handle errors during fetch
//                     console.error("Fetch error:", error);
//                 });
//             })
//         );
    
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.open(cacheData).then((cache) => {
//         return cache.match(event.request).then((response) => {
//           const fetchPromise = fetch(event.request).then((apiResponse) => {
//             // Periksa apakah respons API yang baru berbeda dengan yang ada di cache
//             if (!response || (response && response.status === 200 && response !== apiResponse)) {
//               // Salin response dari API ke dalam cache
//               const responseClone = apiResponse.clone();
//               cache.put(event.request, responseClone);s
//             }
//             return apiResponse;
//           });
  
//           // Jika online, lakukan fetch dari API dan update cache
//           return navigator.onLine ? fetchPromise : response;
//         });
//       })
//     );
//   });


//////////////////////////////////////////////////// PUSH NOTIFICATION ////////////////////////////////////////////////////////////////

self.addEventListener('push', (event) => {
  const options = {
    body: 'Welcome', // Pesan notifikasi disetel ke "Welcome"
  };

  event.waitUntil(
    self.registration.showNotification('Budget Buddy', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Tambahkan logika untuk menangani tindakan ketika notifikasi diklik
  // Misalnya, membuka halaman tertentu atau melakukan tugas lainnya.
  const dashboardUrl = '/dashboard'; // Ganti dengan URL dashboard yang sesuai
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === dashboardUrl && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(dashboardUrl);
    })
  );
});


// self.addEventListener('install', (event) => {
//   console.log('Service Worker installed');
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activated');
// });

// self.addEventListener('fetch', (event) => {
//   console.log('capek');
// });





