---
layout: post
section-type: post
title: Dynamic User Creation MSSQL
category: tech
tags: [ 'mssql']
---

So I had the unfortunate privelege of creating a feature to dynamically create users via a web GUI and a cron job recently.

I'm going to keep this quite succint because my eyes are still literally bleeding from all the hacky bullshit I've had to do to get this to work.

Problems you won't find out until you get cracking:

1. CREATE USER, CREATE LOGIN etc. Do not accept parameterised variables. String literals only
2. The Sprocs sp_adduser etc. Do accept parameterised variables but are soon to be deprecated, and you can't specifiy the database as a parameter.
3. Dynamic sql is the only ~~hacky~~ way to do this. But make sure you use quotename() to avoid sql injection attacks.




