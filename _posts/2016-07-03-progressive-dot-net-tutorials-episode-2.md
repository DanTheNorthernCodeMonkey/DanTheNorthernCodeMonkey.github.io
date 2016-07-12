---
layout: post
section-type: post
title: Quest For Knowledge - Review of Progressive .Net Tutorials 2016 Episode 2
category: tech
tags: [ 'Progressive .NET' ]
---

![Prog Net 2016 Banner](/img/progressive-dot-net-tutorials/prog-net-banner-01.jpg)

---
<h1 class="brand-heading">&nbsp;</h1>

## The Fundamentals of Machine Learning with F# - Mark Gray
 
![Prog Net 2016 Banner](/img/progressive-dot-net-tutorials/mark-gray.jpg)

<h1 class="brand-heading">&nbsp;</h1>

 F# seems to be the cool thing these days. A lot of conference talks are on F# and this conference was no different. Not that it's a bad thing, I'm definitely intriqued to learn another language especially when it's in a different paradigm, I'm all about the hipster dev cred.
 
 The session had a scenario wherein we had a robot on Mars that was malfunctioning. It was up to us to get him to send a message through machine learning techniques. This was broken down into 3 solutions, the speaker gave a brief intro before each one and then got us working on them. The format was really engaging, each soluction had a scenario file with code that had blanks that we had to fill in to complete the mission, almost like the comprehension tasks you did back in school: 

{% highlight csharp %}

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

{% highlight haskell %}
let bestCandidate current getElevation = 
    neighbours current
    |> List.map (fun x -> newState current getElevation x)
    |> List.maxBy (fun s -> s.Elavation)

{% endhighlight %}

After completing a task you ran the F# tests, using F# interactive (think console in developer tools), giving immediate feedback on your progress:

{% highlight haskell %}

let Calling findHigherPoint should elevate Freddy to 2847.257974 (metres) () =
    let expected = 2847.257974
    let bestCandidate = findHigherPoint initialState getElevation
    let bestElevation = bestCandidate.Elevation
    
AreSame expected bestElevation "See Task (e) line 79 of ClimbHill.fs"

{% endhighlight %}

I thoroughly enjoyed this format. It's broken down well, has an engaging narrative and builds up in complexity to the point where you are doing some cool stuff, moving onto linear regression and genetic algorithms.

Some of the other attendees had trouble with aspects of the talk. I think this was a combination of:

1. Using F# which for most will be a new language 
2. Engaging in machine learning from a relatively high level 
3. Some of the tutorial text was a little vague, which with the two points above made some exercises more difficult than they really were.

My advice to the speaker would be to really fill out the comment blocks further, especially considering the amount of code surrounding the tasks that acted as workflow/helpers. I got the impression that the speaker was slightly concerned that the verbosity of the comments would be detrimental. That's certainly true for an experienced F# / machine learning developer, however that is certainly not the target market for this talk.

Overall I felt that this talk was fun, informative, well structured and a great chance to dabble in F#. I'd definitely recommend attending this talk if it happens at a local meetup for you.

Finally the speaker also opened up his training company's private repository for us to download source code tutorials from. This was an excellent move, as the attendees who do the training should have great things to say about FSharp tv.

---
<h1 class="brand-heading">&nbsp;</h1>

## Build a compiler in hours - Phil Trelford

![Prog Net 2016 Banner](/img/progressive-dot-net-tutorials/trelford.jpg)

The afternoon was with Phil Trelford, [Dominic Finn](https://twitter.com/CleverFinn?lang=en-gb "Dominic Finn twitter") had told me to absorb all of the knowledges from Trelford. I instantly understood why when I went into his talk, he comes across as very intelligent but also a bit of a joker, someone that you definitely want to learn from.

Trelford's inspiration for this project was when he was trying to teach his son programming with Microsoft's Small Basic and he got frustrated that it did not support arguments in functions. So he decided to make his own Small Basic programming languge with more features, as you do

He brought this completely foreign concept of building a compiler and made it seems ridicously easy. He had us implementing a basic parser in minutes, I was in, 100% well and truely hooked, I wanted all the knowledges, I'd climb Mt. Doom, put up with Sam whining like a bitch the whole way and throw the ring in the lava without a second thought to absorb every ounce of knowledge in this guy's brain.

The whole premise behind it being so simple was that Trelford had broken down the problem into smaller subsets, something we all should be doing in our day to day jobs, but is often easier said than done. He also kept breaking down the barriers with statement's like "This stuff is easy, what we do day in day out, UI, networks, users is hard.".

The whole underlying principle is the abstract syntax tree, which represents the syntactic structure of the langage. Below is the simple turtle tutorial AST:

{% highlight haskell %}

module AST

type arg = int
type command =
   | Forward of arg
   | Turn of arg
   | Repeat of arg * command list

{% endhighlight %} 

The talk started with a making an abstract turtle move, then later draw to a form:

{% highlight haskell %}

let pforward = (pstring "fd" <|> pstring "forward") >>. spaces1 >>. pfloat
               |>> fun n -> Forward(int n)

test pforward "forward 10"
test pforward "fd 10"

{% endhighlight %}

This greatly aided by the [FParsec library](http://www.quanttec.com/fparsec “FParsec link”) Building upon these components we moved on to using the AST & interpreter to output javascript, IL and finally Trelford’s Small Basic Compiler that did indeed have more functionality than Microsoft’s.

He has also built an IDE with many samples on the windows store, but sadly I was not able to find it. If you want to check it out give him a shout on twitter.

Also the source code to these library’s are not available on his github, he gave us them via usb in the talk so I cannot unfortunately link to them. You can of course attend one of his talks on this topc to get your hands on them :P

After this Trelford told us a story how he was stuck on a train for three hours, so he extended his Small Basic AST & Parser to [implement the C# language](http://trelford.com/blog/post/parsecsharp.aspx), including features that Microsoft started but later dropped. His friend then also [built a compiler for this](https://neildanson.wordpress.com/2014/02/11/building-a-c-compiler-in-f/). 

WTF, like really wtf. I felt the massive need to level up after this talk. It was like I walked in at level 59, dinged to 60 and was asked if I want to prestige. 

Then Trelford told us how his son, who is a youngster had also given a talk on something relatively complex...

[Phil's blog post on Sean's talk](http://trelford.com/blog/post/ndcoslo.aspx "Phil's blog post on Sean's talk")

FML, really? Screw prestiging I may as well reboot, regress into a fetus and start from the beginning at this rate.

If haven't inferred already I was pretty blown away by this talk, and Trelford's energy in general. I genuinely love meeting people like this, I've had the pleasure to have worked with other talented engineers who just exude enthusiasm for the craft and they all made me want to code more, learn more, be a better me. This talk left me with that.

## Conclusion 
