---
layout: post
section-type: post
title: Progressive Web Apps
category: Progressive Web Apps
tags: [ 'service-workers', 'PWA',  ]
---

Progressive Web Apps are the hot new thing going around at web conferences. So I've jumped on the band wagon and given my own talk on them, hopefull with more practicality.

This series of blog posts will be the written accompiantment for the talks/workshops.

## Manifest 

Apps get prime real estate on the users homescreen(s) by having a shiny icon that a user sees very, very easily. Web until relatively recently had the browser icon, then a bookmark or pocket link. 

This should immediately shout out that this UX is shit. Not only does the user have no immediate way of getting to your content, they have the amazing ease of forgetting all about your web app.

Fear not, the browser devs have done us a solid. Add a manifest file to your web app/site, a few images, link elements, meta element and wala! You can have your very own icon on the users desktop. You even get a nice shiny banner popup asking the user if they would like to add the site to their home screen. However you do not get to control when this will show, you can only delay the popup.


