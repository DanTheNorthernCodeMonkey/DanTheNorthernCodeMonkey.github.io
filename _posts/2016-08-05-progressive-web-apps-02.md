---
layout: post
section-type: post
title: Progressive Web Apps Part 2 - App Shell
category: Progressive Web Apps
tags: [ 'service-workers', 'PWA',  ]
---

## 2. App Shell 

The application (app) shell is the bare minimum needed to load your web application to a user. For my personal site that means the index page, js file and css file.

This application shell is cached by the service worker when it installs. This means that it can be loaded very quickly on subsequent requests, even with poor or no connection.

The actual content, within a proper web application will then be loaded asynchronously. This allows for a more native mobile application UX, as a native app will load instantly, with all the colours, branding etc, but will loaded the "content" when it's ready. 

![Application Shell](/img/progressive-web-apps/appShell.PNG)
source: [https://codelabs.developers.google.com/codelabs/your-first-pwapp/](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#2)

To achieve this we will need to write a small amount code.

2 files are needed. One to register a service worker and another to hold the service worker implementation.

{% highlight javascript %}

/***** Service Worker Registration ****/

    if ('serviceWorker' in navigator) { // Be "Progressive", check that the browser can use the sw.
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function (registration) {
            // Registration was successful :)
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            reg = registration;
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
     
{% endhighlight %}

Few things to clear up here. 

1. Always check that the browser supports service workers, most do now. Apple is massively dragging it's heels. Even Microsoft is super keen, come on Apple...
2. The service worker needs to be in another file realistically for readability. 
3. Scope is the scope that the service worker can work within, in the above example I've given it root. 
4. I've captured the registration object for use outside of this method. This is needed for other features we'll explore later.

Now let's build the service worker itself:

{% highlight javascript %}
    var self = this,
	version = 31;

	//************ App Shell & Versioning ************/

	// These cache names need incrementing on changes happening, make part of a build script.
	var cacheName = 'danCodeMonkeyV' + version,
        appShellFiles = [
            "/",
			"/assets/prod/all.min.js",
			"/assets/prod/all.min.css"
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
			// As it's a static site, a post is the only change, which also updates the index, therefore
			// updating the cache name via versioning will remove the old cache and replace with the new.
			return Promise.all(keyList.map(function (key) {
				console.log('[ServiceWorker] Removing old cache', key);

				if (key !== cacheName) {
					return caches.delete(key);
				}
			}));
		}));
	});
{% endhighlight %}

There is a lot going on here. I could have broken it down into separate functions and wrote about each, but then I thought when I was learning this I wanted a complete working example so I could mess with it. Also I didn't want to piss off the copy and paste warriors.

1. App shell, ultimately is an array of critical files. If you want to go further you can architect your app to load the content asynchronously.
2. Service worker install is an event, that is fired after the previous registration finishes.
3. You guessed it, activate fires after installing.

Now for the stuff you actually want to know, the gotchas!

1. The initial cache is atomic, one fails, they all fail. This is another reason why we keep it to crucial files only.
2. Skip waiting - the original service worker will not unregister until all the tabs with that service worker are closed, force it with this.
3. Removing the old caches - reading from the old cache will serve you outdated files, get rid of it. Tidy house tidy mind.
4. Any change in the service worker file will cause an unregister for the service worker. This might sound bad, but it's needed to control the cache.
5. I force this with the version number. I have a gulp script that will rewrite that version statement incrementing the number in the process.
6. You will get fucked by the cache. It happens at times with the normal cache. You change something, refresh, nothing changes. 20 minutes of pulling your hair out and you realise it's the cache. Service workers make this problem worse. With great power comes great responsibility.

If you're doing the workshop the code here will help with completing 001_AppShell

Workshop code: [https://github.com/DanTheNorthernCodeMonkey/ProgressiveWebAppsQuest](https://github.com/DanTheNorthernCodeMonkey/ProgressiveWebAppsQuest)


