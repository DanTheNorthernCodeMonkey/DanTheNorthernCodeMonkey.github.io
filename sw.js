(function () {

    var self = this;
	// These cache names need incrementing on changes happening, make part of a build script.
	var cacheName = 'appShellV1',
        appShellFiles = [
            // CDNd files, this is fucking horrible, cloudflare CDNs my assets anyway anyway.
            // TODO: Make a gulp build script to consolidate all CSS into one file and all js into one file.
            //'/offline/index.html',
            // 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
            // 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
            // '/css/rrssb.css',
            // '/css/grayscale.css',
            // '/css/timeline.css',
            "/"
        ];


	self.addEventListener('install', function (e) {
		console.log('Started', self);

		function onInstall() {
			return caches.open(cacheName)
                .then(function (cache) {
                	cache.addAll(appShellFiles); // Atomic, one fails, it all fails
                }).then(self.skipWaiting()); // Older service workers will cause this one to "wait". This skips the waiting stage.
		}
		e.waitUntil(onInstall(e));
	});

	self.addEventListener('activate', function (e) {
		console.log('[ServiceWorker] Activate');
		e.waitUntil(caches.keys().then(function (keyList) {
            	// Flushing the old cache here
            	// As it's a static site, a post is the only change, which also updates the index, therefore
            	// updating the cache name via versioning will remove the old cache and replace with the new.
            	return Promise.all(keyList.map(function (key) {
            		console.log('[ServiceWorker] Removing old cache', key);
            		if (key !== cacheName) {
            			return caches.delete(key);
            		}
            	}));
            }).catch(function (e) {
            	console.log('[ServiceWorker] Error removing old cache, error message: ' + e);
                return null;
            })
        );
	});

	// As the site is static and will not use a proper "App cache" I've opted for 
	// a simple try cache, if not get then cache strategy. A more complex app will need
	// a much more complex caching strategy, e.g. per file type, per domain, request type etc.
	self.addEventListener('fetch', function (e) {

		var fetchRequest = e.request.clone();
		console.log('[ServiceWorker] Fetch', fetchRequest.url);
		e.respondWith(
            caches.match(fetchRequest).then(function (response) {

            	// If cached return straight away
            	if (response)
            		return response;

            	// If not get it, then cache it
            	return fetch(fetchRequest).then(function (response) {
            		return caches.open(cacheName).then(function (cache) {

            			// On error return the offline page.
            			if (!response || response.status !== 200) {
            				caches.match('/').then(function (response) {
            					return response;
            				});
            			}

            			cache.put(fetchRequest.url, response.clone());
            			console.log('[ServiceWorker] Fetched & Cached Data');
            			return response;
            		});
            	});
            })
        );
	});
}());
