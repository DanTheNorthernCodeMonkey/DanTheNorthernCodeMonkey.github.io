---
layout: post
section-type: post
title: Quest For Knowledge - Review of Progressive .Net Tutorials 2016 Episode 2
category: tech
tags: [ 'Progressive .NET' ]
---
 
## The Fundamentals of Machine Learning with F# - Mark Gray
 
 F# seems to be the cool thing these days. A lot of conference talks are on F# and this conference was no different. Not that it's a bad thing, I'm definitely intriqued to learn another language especially when it's in a different paradigm.
 
 The session had a scenario wherein we had a robot on Mars that was malfunctioning. It was up to us to get him to send a message through machine learning techniques. This was broken down into 3 solutions, the speaker gave a brief intro before each one and then got us working on them. The format was really engaging, each soluction had a scenario file with code that had blanks that we had to fill in to complete the mission, almost like the comprehension tasks you did back in school: 

{% highlight fsharp %}

// c) In F# we use map, which is similar to Select
// in Linq, here you need to use map on neighbours
// and List.map them using the newState function above.
let bestCandidate current getElevation = 
    neighbours current
    |> __YOUR_IMPLEMENTION_HERE__
    // d) Look on the List type for a function
    // that will help you locate the highest
    // elevation in the data. You will have to
    // use a lambda in the form similar to:
    // (fun point -> point.Elevation)
|> __YOUR_IMPLEMENTION_HERE__
{% endhighlight %}

Here's an example of this section completed:

{% highlight fsharp %}
let bestCandidate current getElevation = 
    neighbours current
    |> List.map (fun x -> newState current getElevation x)
    |> List.maxBy (fun s -> s.Elavation)

{% endhighlight %}

After completing a task you ran the F# tests, using F# interactive (think console in developer tools), giving immediate feedback on your progress:

{% highlight fsharp %}

let ``Calling findHigherPoint should elevate Freddy to 2847.257974 (metres)`` () =
    let expected = 2847.257974
    let bestCandidate = findHigherPoint initialState getElevation
    let bestElevation = bestCandidate.Elevation
    
AreSame expected bestElevation "See Task (e) line 79 of ClimbHill.fs"

{% endhighlight %}

I thoroughly enjoyed this format. It's broken down well, has an engaging narrative and builds up in complexity to the point where you are doing some cool stuff, moving onto linear regression and genetic algorithms.

Some of the other attendees had trouble with aspects of the talk. I think this was a combination of 

1. Using F# which for most will be a new language 
2. Engaging in machine learning from a relatively high level and 
3. Some of the tutorial text was a little vague, which with the two points above made some exercises more difficult than they really were.

My advice to the speaker would be to really fill out the comment blocks further, especially considering the amount of code surrounding the tasks that acted as workflow/helpers. I got the impression that the speaker was slightly concerned that the verbosity of the comments would be detrimental. That's certainly true for an experienced F# / machine learning developer, however that is certainly not the target market for this talk.

Overall I felt that this talk was fun, informative, well structure and a great chance to dabble in F#. I'd definitely recommend attending this talk if it happens at a local meetup for you.

Finally the speaker also opened up his training company's private repository for us to download source code tutorials from. This was an excellent move, as the attendees who do the training will have great things to say about FSharp tv.







