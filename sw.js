
var self = this,
	version = 46;

//************ App Shell & Versioning ************/

// These cache names need incrementing on changes happening, make part of a build script.
var cacheName = 'danCodeMonkeyV' + version,
	appShellFiles = [
		"/",
		"/assets/prod/js/all.min.js",
		"/assets/prod/css/all.min.css"
	],
	doNotCacheUrls = [
		"www.google-analytics.com"
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

//************ Destroy old caches ************/
self.addEventListener('activate', function (e) {

	console.log('[ServiceWorker] Activate');

	e.waitUntil(caches.keys().then(function (keyList) {

		// Flushing the old cache here
		return Promise.all(keyList.map(function (key) {
			console.log('[ServiceWorker] Removing old cache', key);

			if (key !== cacheName) {
				return caches.delete(key);
			}
		}));

	}).then(function () {
		self.clients.claim(); // Force claim all tabs
	}));
});

//************ Network Intercept  ************/
self.addEventListener('fetch', function (e) {

	var fetchRequest = e.request.clone();

	console.log('[ServiceWorker] Fetch', fetchRequest.url);

	e.respondWith(
		caches.match(fetchRequest).then(function (response) {

			if (CheckDoNotCacheUrls(fetchRequest.url)) {
				console.log('[ServiceWorker] Do not cache url' + fetchRequest.url);
				fetch(fetchRequest);
			}

			// If not online return from cache immediately.
			if (!navigator.onLine) {
				if (response) {
					return response;
				}
			}

			if (e.request.cache === 'only-if-cache') {
				e.request.mode = 'same-origin';
			}

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

//************ Push Notifications ************/
self.addEventListener('push', function (e) {
	console.log('Push message', e);

	var title = 'New Blog Post';

	e.waitUntil(
		self.registration.showNotification(title, {
			'body': 'A new blog post is up, check it out!',
			'icon': 'img/icons/icon144.png'
		}));
});

self.addEventListener('notificationclick', function (e) {
	console.log('Notification click: tag', e.notification.tag);
	// Android doesn't close the notification when you click it
	// See http://crbug.com/463146
	e.notification.close();
	var url = 'https://dancodemonkey.com#latest-post';
	// Check if there's already a tab open with this URL.
	// If yes: focus on the tab.
	// If no: open a tab with the URL.
	e.waitUntil(
		clients.matchAll({
			type: 'window'
		}).then(function (windowClients) {
			console.log('WindowClients', windowClients);
			for (var i = 0; i < windowClients.length; i++) {
				var client = windowClients[i];
				console.log('WindowClient', client);
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});

//************ Background Sync ************/
self.addEventListener('sync', function (e) {
	console.log('Push message', e);

	var title = 'New Blog Post';

	self.registration.showNotification(title, {
		'body': 'A new blog post is up, check it out!',
		'icon': 'img/icons/icon144.png'
	});
});


function CheckDoNotCacheUrls(requestUrl) {

	var regex = new RegExp(requestUrl, "g");

	var matched = doNotCacheUrls.filter(function (url) {

		return url.match(regex);
	});

	return matched.length > 0;
}


