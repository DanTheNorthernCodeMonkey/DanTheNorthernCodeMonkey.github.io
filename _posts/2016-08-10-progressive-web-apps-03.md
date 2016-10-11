---
layout: post
section-type: post
title: Progressive Web Apps Part 3 - Caching
category: Progressive Web Apps
tags: [ 'service-workers', 'PWA',  ]
---

## 2. Caching

The service worker offer amazing functionality and control over network requests, but as always, great power requires great responsibility.

The caching strategy you decide upon will affect the UX, but can also have detrimental effects, getting caught in a state whereby you cannot update your own website properly.

If you followed the earlier tasks and set your service worker to delete the old caches when the service worker file changes then you can at least force a reset if you remember to update that file.

There are many, many, many different caching strategies that you can decide to use. Most of them have pros and cons. If you are going to use this on an proper production application then my advice would be to think long and hard about them, pick a mixture that suit per file type, status code, area of your application, perhaps even with multiple caches so that you can have the most control.

For the purposes of learning however I have shown the strategy I adopted for this website. I have opted for responding from the cache first. If the requested file is not there then do a network request. Cache the response and serve it.

This will mean that if the user navigates around my whole site they will eventually cache everything. This means return visits will be mega quick, and everything will work offline.

However updates will never be served to the user. Since this is a static jekyll site running on github pages, I run scripts before pushing new content. My strategy has been to simply modify the scripts so that they also change the version number in the service worker file, therefore forcing a wipe on content update.

This strategy works for this site as it's updated fairly infrequently. However it's still overkill to purge the whole cache. Ideally I would have multiple caches for different content. So that I only purge what's needed.

{% highlight javascript %}

/***** Service Worker Registration ****/

    //************ Network Intercept  ************/
        // Try the cache, if not there then network request for it, cache it then return response to user. A more complex app will need
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
     
{% endhighlight %}

If you're doing the workshop the code here will help with completing 002_Caching

Workshop code: [https://github.com/DanTheNorthernCodeMonkey/ProgressiveWebAppsQuest](https://github.com/DanTheNorthernCodeMonkey/ProgressiveWebAppsQuest)


