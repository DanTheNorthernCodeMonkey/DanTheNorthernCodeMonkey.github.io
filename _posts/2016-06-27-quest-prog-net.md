---
layout: post
section-type: post
title: Quest For Knowledge - Review of Progressive .Net Tutorials Part 1
category: tech
tags: [ 'Progressive .NET' ]
---

## Preamble

I recently attended Progressive .Net Tutorials by Skills Matter. Matt (a colleague) and I got booked into the conference at super late notice, and had to manically rush to find a decent deal for a hotel, most of which had sold out of twin rooms. We discussed broadening the search to include double rooms but sadly the prospect of spooning was not to be, as we lucked out and got a cracking deal on a twin room near kings cross, winning.

Progessive .Net was ran over 3 days, with a varying format for each day, but consistently had two talks on at once, meaning Matt and I had to split up for the majority of the blocks so that we could get the most out of the conference. [Programme details here](https://skillsmatter.com/conferences/7235-progressive-dot-net-tutorials-2016#program)

## Talks Review

### Safe at any speed: pattens of high availability - Ian Cooper

Main points where timeouts, caching fallbacks, retrys, circuit breakers, decoupling through message busses.

This talk was well delivered, well structured and useful. I didn't get as much out of the talk as some of the other attendees may have as I work for a high volume consumer facing tech company, so a lot of the patterns are already in use at UNiDAYS. 

However the retry's coupled with circuit breakers was something new that I'm definitely going to do a workshop on within the company soon. 

Ian used his own open source library throughout the talk, giving an overview, showed the code in action then took Q&A after each section. I felt that this was definitely the best structured talk of the event and that pace was on point.

<ul class="list-inline social-buttons">

<li><a target="_blank" href="https://github.com/iancooper/Availability-Tutorial"><i class="fa fa-github fa-fw"></i></a></li> 

<li><a target="_blank" href="https://twitter.com/ICooper"><i class="fa fa-twitter fa-fw"></i></a></li> 

<li><a target="_blank" href="http://codebetter.com/iancooper/"><i class="fa fa-rss fa-fw"></i></a></li>
</ul>

### The Asynchronous Age: A Developer's Illustrated Primer - Dylan Beattie

This talk was probably my favourite. 

Dylan's character provided for a geniunely enteraining delivery. He would most certainly be a bard in an rpg game. The scenarios he set for the tasks where hilarious. The .Net part was a simple clean the house analogy in code, but he soon had us randomly having the washing machine set on fire. The second part was a text adventure using javascript promises to progress. This was great, I have a colleague who loves to write hilarious text adventure games so I thoroughly enjoyed this part.

The talk was relatively high level and I would have loved a longer talk so that we could have got into the gritty stuff, like dead locks, synchronisation context, how the framework breaks up the async await code into multi-methods with call backs etc. But async await is a beast of a subject, and within the time frame it was a good level of detail.

The javascript promises part was very high level, but it's relatively simple in comparison the .Net implementation anyway.

I think I'll conclude here for part one. Watch this space for part 2 shortly.

<ul class="list-inline social-buttons">

<li><a target="_blank" href="https://github.com/dylanbeattie/ProgNet2016"><i class="fa fa-github fa-fw"></i></a></li> 

<li><a target="_blank" href="https://twitter.com/dylanbeattie"><i class="fa fa-twitter fa-fw"></i></a></li> 

<li><a target="_blank" href="http://www.dylanbeattie.net/"><i class="fa fa-rss fa-fw"></i></a></li>
</ul>


