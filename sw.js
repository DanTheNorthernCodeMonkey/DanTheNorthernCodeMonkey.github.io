
(function () {
    var self = this;

    // These cache names need incrementing on changes happening, make part of a build script.
    var appShellCacheName = 'appShell-v1.0',
        dataCacheName = 'dataCache-v1.0',
        appShellFiles = [
            // CDNd files, this is fucking horrible, cloudflare CDNs my shit anyway.
            // TODO: Make a gulp build script to consolidate all CSS into one file and all js into one file.
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
            '/css/rrssb.css',
            '/css/grayscale.scss',
            '/css/timeline.scss',
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
        console.log('[ServiceWorker] Fetch', e.request.url);
        var dataUrl = 'https://publicdata-weather.firebaseio.com/';
        if (e.request.url.indexOf(dataUrl) === 0) {
          e.respondWith(
            fetch(e.request)
              .then(function(response) {
                return caches.open(dataCacheName).then(function(cache) {
                  cache.put(e.request.url, response.clone());
                  console.log('[ServiceWorker] Fetched&Cached Data');
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
}());
