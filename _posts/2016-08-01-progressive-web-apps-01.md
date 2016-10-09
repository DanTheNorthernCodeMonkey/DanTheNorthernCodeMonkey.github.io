---
layout: post
section-type: post
title: Progressive Web Apps Part 1
category: Progressive Web Apps
tags: [ 'service-workers', 'PWA',  ]
---

Progressive Web Apps are the hot new thing going around at web conferences. So I've jumped on the band wagon and given my own talk on them, hopefull with more practicality.

This series of blog posts will be the written accompiantment for the talks/workshops.

In short the series will emcompass the following:

1. Manifest - Save to home screen
2. Service Worker - App Shell
3. Service Worker - Caching
4. Service Worker - Push Notifications
5. Service Worker - Background Sync

## 1. Manifest 

Apps get prime real estate on the users homescreen(s) by having a shiny icon that a user sees very, very easily. Web until relatively recently had the browser icon, then a bookmark or pocket link. 

This should immediately shout out that this UX is shit. Not only does the user have no immediate way of getting to your content, they also have the amazing ease of forgetting all about your web app now.

Fear not, the browser devs have done us a solid. Add a manifest file to your web app/site, a few images, link elements, meta element and wala! You can have your very own icon on the users desktop. You even get a nice shiny banner popup asking the user if they would like to add the site to their home screen. However you do not get to control when this will show, you can only delay the popup. The popup will show up on chrome after users visits your site again after 5 minutes.

Example Manifest File:

{% highlight json %}

{
  "name": "{{site.title}}",
  "icons": [
    {
      "src": "{{site.baseurl}}{{site.icon-36p}}",
      "sizes": "36x36",
      "type": "image/png"
    },
    {
      "src": "{{site.baseurl}}{{site.icon-48p}}",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "{{site.baseurl}}{{site.icon-72p}}",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "{{site.baseurl}}{{site.icon-96p}}",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "{{site.baseurl}}{{site.icon-144p}}",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "{{site.baseurl}}{{site.icon-192p}}",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "{{site.url}}",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "gcm_sender_id": "4029370580"
}

{% endhighlight %}

Which should look like this in the browsers dev tools:

![browser manifest](/img/progressive-web-apps/manifest.PNG)

If you have fallen to the dark side and also have an native/hybrid app then you can also get a banner which will link to the play store to download. Simply add code below into the manifest:

{% highlight json %}
{
    "prefer_related_applications": true,
    "related_applications": [
      {
        "platform": "play",
        "id": "com.google.samples.apps.iosched"
      }
    ]
}

{% endhighlight %}

If you are doing my workshop now is the time to implement this manifest in the sample project in folder 001_manifest. The code above deliberately has the mustache sytnax in, so that you actually have to do some work and not just blindly copy and paste. We're all devs here, we all know that you only learn by paying the pain tax!!!