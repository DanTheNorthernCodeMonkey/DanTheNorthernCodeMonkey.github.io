
(function () {
    var self = this;

    // These cache names need incrementing on changes happening, make part of a build script.
    var appShellCacheName = 'appShell-v1.0',
        dataCacheName = 'dataCache-v1.0',
        siteFullDomain = 'https://www.danthenortherncodemonkey.com',
        appShellFiles = [
            // CDNd files, this is fucking horrible, cloudflare CDNs my assets anyway anyway.
            // TODO: Make a gulp build script to consolidate all CSS into one file and all js into one file.
            //'/offline/index.html',
            '/'
        ];
     

    self.addEventListener('install', function(event) {
        console.log('Started', self);

        // Older service workers will cause this one to "wait". This skips the waiting stage.
        self.skipWaiting();

        console.log('Installed', event);

        function onInstall () {
            return caches.open('appShell')
                .then(function (cache) {
                    cache.addAll(appShellFiles); // Atomic, one fails, it all fails
                });
        }

        event.waitUntil(onInstall(event));
    });
    
    self.addEventListener('activate', function(e) {
        console.log('[ServiceWorker] Activate');
        e.waitUntil(
            caches.keys().then(function(keyList) {
                // Flushing the old cache here
                return Promise.all(keyList.map(function(key) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    if (key !== appShellCacheName) {
                        return caches.delete(key);
                    }
                }));
            })
        );
    });

    self.addEventListener('fetch', function(e) {

        var fetchRequest = event.request.clone();

        console.log('[ServiceWorker] Fetch', fetchRequest.url);
        if (isNotInAppShellCache(fetchRequest)) {
          e.respondWith(
            fetch(fetchRequest)
              .then(function(response) {
                return caches.open(dataCacheName).then(function(cache) {
                
                  if (!response || response.status !== 200) // On error return the offline page.
                    caches.match('/').then(function (response) {
                        return response;
                    });


                  cache.put(fetchRequest.url, response.clone());
                  console.log('[ServiceWorker] Fetched & Cached Data');
                  return response;
                });
              })
          );
        } else {
          e.respondWith(
            caches.match(e.request).then(function(response) {
              return response || fetch(e.request);
            })
          );
        }
    });

    function isNotInAppShellCache (url) {
        cache.open(appShellCacheName).then(function (cache) {
            caches.match(url).then(function (response) {
                return !response ? true : false
            });
        });
    }
}());
