insert into users
(id, first_name, last_name, email, nickname, password, avatar, verified_email)
values
('db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'Anayah', 'Lawson', 'lawson@gmail.com', 'anayahLawson1999', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200', true),
('a9212bcd-9410-4f2c-a51e-cad095d6982b', 'Asa', 'Yu', 'avleen@gmail.com', 'allManleen', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.unsplash.com/photo-1514161955277-4ea47eef2ff9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', true),
('8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'Arwa', 'Bain', 'barwa@gmail.com', 'niabawra', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', true),
('e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'Lilli', 'Guerra', 'lillirra@gmail.com', 'guelli', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200', true),
('b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'Kali', 'Chan', 'channi@gmail.com', 'kan-Chankali', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', true),
('1934406d-e088-4a28-8c44-ccfdd5125b90', 'Derren', 'Mask', 'dayNomeister@gmail.com', 'deePHPEm', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200', true),
('22be7f78-037c-11ec-9a03-0242ac130003', 'Kim', 'Lu', 'kimLu1986@gmail.com', 'kimDe-Luk', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://uifaces.co/our-content/donated/CVYUarcq.jpg', true),
('28856520-037c-11ec-9a03-0242ac130003', 'Atlanta', 'Mohamed', 'Dank-atlant@gmail.com', 'crappyAtlant1', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200', true),
('2e04946c-037c-11ec-9a03-0242ac130003', 'Hryhoriy', 'Vasylenko', 'hryhoriy_vasylenko@ukr.net', 'awesomeHryhoriy93', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://uifaces.co/our-content/donated/FRdmYcK0.jpg', true),
('31d94cea-037c-11ec-9a03-0242ac130003', 'Anastasia', 'Shinkarenko', 'might_delight@gmail.com', 'crazyHTML', '{bcrypt}$2a$12$Om61m0o67.vHSAE3XoR0mefn0Fegq7bGJTlCf.oG.gzrabKLZhbxm', 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200', true);

insert into posts
(id, author_id, draft, title, text, cover_image, markdown)
values
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'Top JavaScript VSCode Extensions for Faster Development 🔥', '<p><a href="https://code.visualstudio.com/" class="cd fv" rel="noopener">VSCode</a> is an open-source, cross-platform editor that has become a favourite of programmers, particularly in the Web Development community. It’s fast, extensible, customisable, and has tons of features. You should check it out if you haven’t already done it.Thousands of extensions have been made for VSCode. I am going to list a few extensions that I use on a day-to-day basis. <strong class="io jk">Let’s begin</strong>!</p>
<br>
<h2>Quokka.js</h2>
<br>
<p><a href="https://quokkajs.com/" class="cd fv" rel="noopener">Quokka.js</a> is a rapid prototyping playground for JavaScript and TypeScript. What that means is that it runs your code immediately as you type  and displays various execution results in your code editor. Try it yourself.</p>
<br>
<p>After installing this <a href="https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode">extension</a>, you can press <em class="km">Ctrl/Cmd(⌘) + Shift + P</em> to display the editor’s command palette, and then type <em class="km">Quokka</em> to see the list of the available commands. Select and run the <strong>New JavaScript File</strong> command. You can also press (⌘ + K + J) to open the file directly. Anything you type in this file is executed immediately.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation"
      "src="https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif" srcset="https://miro.medium.com/max/345/1*ukcsChGYEreBhhAksiYceA.gif 276w, https://miro.medium.com/max/690/1*ukcsChGYEreBhhAksiYceA.gif 552w, https://miro.medium.com/max/800/1*ukcsChGYEreBhhAksiYceA.gif 640w, https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif 700w" sizes="800px">
</figure>
<br>
<h2>Bracket Pair Colorizer and Indent Rainbow🌈</h2>
<br>
<p>Brackets and parentheses are an inseparable part many programming languages. In a language such as JavaScript, <strong>a single page can have a barrage these characters with no easy mechanism to identify opening and closing pairs.</strong> Welcome <a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer">Bracket Pair Colorizer</a> and <a href="https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow">Indent Rainbow</a>. These are two different extensions. However, they really make a good and beautiful couple. These extensions will fill your editor with a flurry of colours, and make the code blocks easily discernible and pleasing to the eyes. Once you get used to them, VSCode feels insipid, and bland without them.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="412" height="147" role="presentation" src="https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png" srcset="https://miro.medium.com/max/345/1*tTp3nnHAfOJVRjc5mCa3fA.png 276w, https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png 412w" sizes="412px">
   <figcaption data-selectable-paragraph="">Without Indent Rainbow and Bracket Pair Colouriser</figcaption>
</figure>
<br>
<figure style="text-align: center;">
   <img alt="" class="re ue t u v ku aj c" width="412" height="147" role="presentation" src="https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png" srcset="https://miro.medium.com/max/345/1*fmd009UJSyiC3ZtsOgN3qA.png 276w, https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png 443w" sizes="443px">
   <figcaption data-selectable-paragraph="">🔥🔥 With Indent Rainbow and Bracket Pair Colorizer 🔥🔥</figcaption>
</figure>
<br>
<h2>Snippets</h2>
<br>
<p>Snippets are shorthands in an editor. So instead of writing <i>import React from ''react'';</i>, you can type <i>imr</i> and press Tab to expand this snippet. Similarly, <i>clg</i> becomes <i>console.log</i>.</p>
<p>There exists a lot of snippets for all sorts of things:</strong> Javascript(or any other language), React, Redux, Angular, Vue, Jest. I personally find Javascript snippets really useful since I work mostly with JS.</p>
<br>
<h3>Some good snippet extensions are —</h3>
<ul>
   <a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets">JavaScript (ES6) code snippets</a></li>
   <li><a href="https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux">React-Native/React/Redux snippets for es6/es7</a></li>
   <li><a href="https://marketplace.visualstudio.com/items?itemName=TimonVS.ReactSnippetsStandard">React Standard Style code snippets</a></li>
</ul>
<br>
<h2>Dracula (Theme)</h2>
<br>
<p>One <a href="https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula">theme</a> that I like.</p>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation" src="https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png" srcset="https://miro.medium.com/max/345/1*VXgT4EFpAKtPfXTgi00BqA.png 276w, https://miro.medium.com/max/690/1*VXgT4EFpAKtPfXTgi00BqA.png 552w, https://miro.medium.com/max/800/1*VXgT4EFpAKtPfXTgi00BqA.png 640w, https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png 700w" sizes="443px">
</figure>
<p>These were some of the VSCode extensions that I use regularly. What other <strong >extensions and themes</strong> do you like? Respond to this article and mention them. 😀</p>
<br>
<p><strong >Reach out to me on @ </strong><a href="https://www.facebook.com/arfat.salman"><strong>Facebook</strong></a><strong > @ </strong><a href="https://www.linkedin.com/in/arfatsalman/"><strong>Linkedin</strong></a><strong> @ </strong><a href="https://twitter.com/salman_arfat"><strong>Twitter</strong></a><strong>.</strong></p>', 'https://scotch-res.cloudinary.com/image/upload/w_1500,q_auto:good,f_auto/v1548644228/hiwdtcshey9kcvh4k9r2.png', false),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', false, 'The Best Programming Languages to Learn in 2021', 'Coding languages are ever-evolving just like any other professional area. Some technologies become top-rated, some loose their prime positions and it’s no longer wise to spend time learning them. For a tech newbie striving to learn programming, it might be a bit complicated to figure out which technology to choose. Let me help you out. As a Senior Java developer and a long-term tutor, I can share some advice on the most popular programming languages. Here’s my shortlist of the winners.

---
&nbsp;

Java
====

![](https://miro.medium.com/max/475/1*a8bjeSGesJDxO14YjFwvfQ.png)

**Platform**: Web, Mobile, Desktop

**Annual Salary Projection**: around $79,000 (as [Glassdoor](https://www.glassdoor.com/Salaries/java-developer-salary-SRCH_KO0,14.htm) claims)

What‘s the technology about
===========================

This is one of the top programming languages in the world. Java was created back in 1995 and now it’s owned by the global tech giant Oracle. It’s an object-oriented language that is widely used virtually everywhere. What makes it stand out is that this is the technology for large server-side enterprise-level applications. It is very secure and portable as well as highly structured. Java is widely used by huge IT corporations, including Google, Amazon, and Twitter, just to mention a few. Java coding skills have been in high demand for several years running and still are.

Where to learn
==============

[1\. CodeGym](https://codegym.cc/) a gamified Java learning platform. It is a well-organized course that is focused on learning by doing. And very fun to play with! The platform has over 1200 tasks of various levels. When you complete a task you get immediate verification of your solution. You can take a desktop version but also there’s a mobile version so you can code from your smartphone wherever you are. During the course, you move from level to level just like in a game. And at a certain point, you can start creating a game on your own. Try and see yourself.

[2\. Java Fundamentals by Pluralsight](https://www.pluralsight.com/courses/java-fundamentals-language). The platform provides a great insight into design patterns. This is one of the stumbling blocks for a neophyte programmer. Here in this course, you can set up this knowledge in the right way from the very start. Along with the many other great learning features the platform is worth trying.

[3\. Codecademy](https://www.codecademy.com/) is another resource I would suggest checking out. The project is free and neatly structured. So you can create your own curriculum and follow your own learning path. Each course contains over 50 lectures and interactive quizzes. And besides, there is an opportunity to ask someone from the community for a personal code review.

---
&nbsp;

Python
======

![](https://miro.medium.com/max/475/1*wp_FMn_NT4Eny0mGWLoktg.png)

**Platform**: Web, Desktop

**Annual Salary Projection**: [$76,500](https://www.glassdoor.com/Salaries/python-developer-salary-SRCH_KO0,16.htm)

What‘s the technology about
===========================

There are three core things that make Python a rock star technology to learn. First, it’s free and open-source. Second, it’s readable which makes it one of the easiest programming languages to learn. And third, this is the technology behind the high-demanded areas of Data Science and Machine Learning. The shortage of skills and professionals here is very high. Moreover, Python has powerful modules for GUI-based apps which is quite handy for visually loaded projects.

Where to learn
==============

1.  [Learnpython.org](https://www.learnpython.org/). This resource is a great option for mastering Python from scratch. It’s an interactive tutorial with over 500,000 learners worldwide. The courses are meticulously structured and it’s easy to grasp what the platform is about.

[2\. Learn Python the Hard Way](https://learnpythonthehardway.org/book/). Though the project title can sound quite challenging the reality is quite different. Here you can also start learning Python with no experience in coding. Moreover, it teaches you to see the outcome of your code right from the start. A kind of a problem-solving approach implemented in the code tasks.

[3\. Invent with Python](https://inventwithpython.com/). The course is aimed at giving you the power of creation together with coding proficiency. Besides learning the language itself (for free, by the way) you can invent your own games with the help of your newly acquired skills.

---
&nbsp;

Kotlin
======

![](https://miro.medium.com/max/475/1*9yVyi2seGlDZGRlkEp6dSA.png)

**Platform**: Web, Mobile, Desktop, Server

**Annual Salary Projection**: around [$136,000](https://www.ziprecruiter.com/Salaries/Kotlin-Salary)

What‘s the technology about
===========================

Kotlin is a relatively new programming language. It was first officially released in 2016 and it’s much like a junior brother of Java. It was actually aimed at outperforming the elder one. But I would say there’s still a way to go. Kotlin is widely used for Android development. And it is highly supported by Google. But it’s quite a recent story so some tools that Java already has are still to be re-created for Kotlin. Nevertheless, some major companies like Coursera or Pinterest prefer Kotlin over anything else. A newbie might find Kotlin a little complicated. But if you learn Java first and then polish your skills with Kotlin you’ll be much higher than the average developer.

Where to learn
==============

1.  [Kotlin for Java Developers at Udemy](https://www.udemy.com/course/kotlin-for-java-developers/). The course is a great option to enhance Java skills with cutting-edge technology for mobile development. It was specially created in a way that helps Java devs master the language in no time.

[2\. The Complete Kotlin Developer Course](https://www.udemy.com/course/kotlin-for-java-developers/). This is another Udemy course that will get you into the insights of Android mobile development. It digs into the general OOP concepts also which is quite essential for those at the starting point.

[3\. Kotlin for beginners: Learn Programming With Kotlin](https://www.udemy.com/course/kotlin-course/). Here you can actually start with the basics of programming and walk through the path into confident mobile apps development.

---
&nbsp;

Swift
=====

![](https://miro.medium.com/max/475/1*M4rqUV6zE9nQ02w9KO2y7Q.png)

**Platform**: Mobile (iOS and macOS apps, specifically)

**Annual Salary Projection**: [$96,000](https://www.glassdoor.com/Salaries/ios-developer-salary-SRCH_KO0,13.htm)

What‘s the technology about
===========================

This programming language is a successor to the well-known Objective-C, the technology behind the Apple world. The company released Swift in 2014, just like Kotlin it’s a relatively new code language but it is already very much in demand. Tech giants like WordPress, SoundCloud, or Mozilla FireFox use Swift for their iOS apps. With the decay of Objective-C, Swift became the official language for iOS and macOS development.

Where to learn
==============

1.  [Complete iOS 14, Swift 5 and Machine Learning with CoreML](https://www.udemy.com/course/coreml-course-for-everyone/). The creators of the course promise that by the end of the studies you will be able to build any app you want. Well, maybe not that fast. But you will definitely learn Swift basic, gain some useful coding experience and get a grasp of Machine Learning.

[2\. SwiftUI Masterclass 2021 — iOS 14 App Development & Swift 5](https://www.udemy.com/course/swiftui-masterclass-course-ios-development-with-swift/). This one is a bit more profound and complicated. Here you’ll master the basics of prototyping, create apps with great UI and learn how to publish your apps on the AppStore.

[3\. Cracking Coding Interview & Algorithm Design in Swift (2021)](https://www.udemy.com/course/cracking-coding-interview-algorithm-design-in-swift-2020/). This course is made in the form of an interview. Step by step you figure out how to overcome obstacles and gradually learn new approaches to coding.

---
&nbsp;

C#
==

![](https://miro.medium.com/max/475/1*m8kYhi-eiiwsBM5DVPMmcA.png)

**Platform**: Cross-platform, including mobile and enterprise software applications

**Annual Salary Projection**: [$68,500](https://www.glassdoor.com/Salaries/c-net-developer-salary-SRCH_KO0,15.htm)

What‘s the technology about
===========================

This is a programming language with a history and reputation. It’s a to-go option for Windows development and anything based on the .NET platform. It was created by Microsoft and it is still one of the best ever technologies for enterprise-level development. But not only that! C# is also used in the Unity game engine which in its turn is a top development environment for the gaming industry.

Where to learn
==============

1.  [C# Basics by Treehouse](https://teamtreehouse.com/library/c-basics-2). Here you can learn the basic concepts and code practices, complete challenges and create your first simple programs. Or maybe not that simple if you decide to dig deeper.

[2\. C# Basics for Beginners: Learn C# Fundamentals by Coding](https://www.udemy.com/course/csharp-tutorial-for-beginners/). The course creator explains everything and in a detail and in a very clear way. This makes the promise to learn C# basics in just 6 hours sound reasonable. Be ready to go beyond that time though: it is still adult-level programming.

[3\. C# Fundamentals by Scott Allen (Pluralsight)](https://www.pluralsight.com/courses/csharp-fundamentals-dev). Here you’ll get into the fundamentals of the C# and .NET platform. Step by step the course tutor walks you through the essentials of coding and creating your first C# projects. You’ll also learn about debugging your apps and testing the workability of your code.

---
&nbsp;

Wrap Up
=======

There are many options for a newbie to learn programming. As well as there are hundreds of code languages to start with. But the ones reviewed here are the world’s top-rated technologies and they remain this way for years. As a seasoned Java tutor, I believe these are the best programming languages to learn.

For a person who considers starting a career as a software developer, any of the five is a great option. They are in high demand globally and will obviously remain so in the future. If you already have coding skills you can refresh the knowledge or start learning new adjacent technology. Whatever you choose, the important thing is actually to devote regular time to learning. And ask for help when you need it. At a certain moment, you will find yourself coding easily and effortlessly. It might not seem so now at the beginning of the way. But I used to be just like you. So believe me, it is quite achievable to become a great software developer.', 'https://res.cloudinary.com/adaface/image/upload/v1625607925/blog/images/sql1.png', true),
('e2eceb99-7388-47bb-9f14-339f3392efbd', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', false, 'Introduction to .NET Core', '<p>I decided to start a series about .NET Core which has got remarkable attention in recent years and is increasing its popularity day by day as well as moving very fast. In this post, I will give general information about .NET Core and demonstrate how to build a console application using the framework. In the following posts, I am planning to write about ASP.NET Core MVC and build a web application and a REST API using this framework.</p>', 'https://miro.medium.com/max/1400/1*Nzql75yGFnBOXZVJzIgA3g.jpeg', false),
('e1ad9dc5-a631-485b-a68f-9c4106558b9f', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', false, 'Science Confirms That the Vagus Nerve Is Key to Well-being', 'Introduction
====

The vagus nerve, also called the “10th cranial nerve,” is the longest, largest, and most complex of the cranial nerves, and in some ways it’s also the least understood. Experts have linked its activity to symptom changes in people with migraine headaches, inflammatory bowel disease, depression, epilepsy, arthritis, and many other common ailments. The more science learns about the nerve, the more it seems like a better understanding of the vagus nerve function could unlock new doors to treating all manner of human suffering.

Vagus is Latin for “wandering,” which is apt when one considers all the different parts of the body the vagus nerve reaches. “It seems like every year somebody finds a new organ or system that it talks with,” says Tiffany Field, PhD, director of the Touch Research Institute at the University of Miami School of Medicine.

---
&nbsp;

> “There’s a massive bioelectrical and biochemical series of events that the vagus nerve is responsible for, and all that is almost impossible to map.”

Field says that branches of the vagus nerve are connected to the face and voice. “We know that depressed people have low vagal activity, and this is associated with less intonation and less-active facial expressions,” she explains. A separate branch of the vagus nerve runs down to the gastrointestinal tract. Here, low vagal activity is associated with slowed gastric motility, which interferes with proper digestion, she says.

Still other branches of the vagus nerve are connected to the heart, the lungs, and the immune system. The vagus nerve’s activation or deactivation is tied to the ebb or flow of hormones such as cortisol and the digestive hormone ghrelin, the amount of inflammation the immune system produces, and many other internal processes that shape human health and experience. “There’s a massive bioelectrical and biochemical series of events that the vagus nerve is responsible for, and all that is almost impossible to map,” Field says.

How could one nerve system control so much? While some aspects of vagal activity are inscrutable, it’s clear that the nerve is the governor of the parasympathetic nervous system, which helps control the body’s relaxation responses. In simple terms, heightened vagal activity counteracts the stress response, which involves the sympathetic nervous system. “The sympathetic nervous system is fight or flight, while the parasympathetic nervous system is more chill out,” says Stephen Silberstein, MD, a professor of neurology and director of the Headache Center at Philadelphia’s Thomas Jefferson University Hospitals.

Silberstein co-wrote [a comprehensive 2016 review](https://www.ncbi.nlm.nih.gov/pubmed/26364692) of the research on the vagus nerve. He says that heightened vagal activity slows heart rate and also switches off inflammation, in part by triggering the release of immune system calming chemicals. There’s also evidence that activating the vagus nerve through electronic stimulation can produce a range of health benefits. “Depending on the frequency of the stimulation, we know it can turn off an asthma attack or an epileptic seizure,” Silberstein says. “It can turn off a migraine or cluster headache, and it can decrease the perception of acid reflux.”', 'https://miro.medium.com/max/2953/1*ObK-3JOx8OkU8CiYQN1ZyQ.jpeg', true),
('0bee5886-cf57-4d9f-b8b2-f3dec68cecdc', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', false, 'Why I left Mac for Windows: Apple has given up', '<p>If you ask anyone who knows me, I’m probably the biggest Apple fan they know. Ask for a suggestion of what computer to get, and I’ll almost certainly either tell you the MacBook Pro, or to wait, because Apple is about to update its hardware finally.</p>
<p><strong><em>Update:</em></strong><em class="ig"> since this post was published I’ve tested a number of Windows laptops as alternatives to MacBooks. Find results at the end!</em></p>
<p>But recently, I realized I’d gotten tired of Apple’s attitude toward the desktop. The progress in macOS land has basically been dead since Yosemite, two years ago, and Apple’s updates to the platform have been incredibly small. I’m a developer, and it seems to me Apple doesn’t pay any attention to its software or care about the hundreds of thousands of developers that have embraced the Mac as their go-to platform.</p>
<p>Take a look at <a href="http://www.apple.com/macos/sierra/">Sierra</a>: the only feature of note is Siri, which is half-baked as it is, and the things that <em>did</em> get ported over from iOS are half-done too. On the developer side? Nothing, unless you use XCode — the same story it’s been for years.</p>', 'https://miro.medium.com/max/2000/1*gBjaApzP8O4V-DyPHl1Gwg.png', false),
('91b5debe-0398-11ec-9a03-0242ac130003', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'Amazon is the biggest threat to bitcoin right now', '<p>Over the past year, a growing number of people have leapt to take part in bitcoin’s meteoric rise. Teenagers have invested their college funds. Some families have mortgaged their homes and placed everything on the table. Even billionaires have suggested putting 10% of all assets into the digital currency.</p>', 'https://miro.medium.com/max/1400/0*kTjYeD6Mv-4aFGG2.', false),
('12c94050-70a2-432d-a5ca-efb870be34a2', '1934406d-e088-4a28-8c44-ccfdd5125b90', false, '100 Days of 3D Design', 'It was a rainy weekend in Seattle. I drank some tea, watched a YouTube tutorial, and downloaded Blender 2.79. A year later, I completed my 6th 100-day-project — 100 Days of 3D.
Since 2015, I have been doing the 100-day-project. My past projects include 100 Days of Doodle, 100 Days of Lettering, 100 Days of Watercolor, 100 Days of Vector Illustration, and 100 Days of Motion Design.', 'https://miro.medium.com/max/2000/1*RotgJRGOEdfybMgbix9w1w.png', true),
('6dd35066-4b3b-4321-a576-dd249c45603d', '1934406d-e088-4a28-8c44-ccfdd5125b90', false, 'CRUD RESTful API with Go, GORM, JWT, Postgres, Mysql, and Testing', '<p>Golang is a general-purpose programming language built for the multi-core reality of today’s computers (upwork).</p>', 'https://miro.medium.com/max/1400/1*1dzH5UxzoQS7LDpMUOOm6A.png', false),
('4baf517c-0396-11ec-9a03-0242ac130003', '22be7f78-037c-11ec-9a03-0242ac130003', false, 'Exploring 2D differential growth with JavaScript', '<p>In the natural world there is a seemingly endless array of shapes and forms produced by a myriad of mechanical and chemical processes acting upon materials in complex ways, often through what turn out to be simple rules.
One such example is that of differential growth, a process that produces winding, undulating, buckling forms that remind one of meandering rivers, rippled surface textures of fruits and seeds, foliose lichen, and the space-filling behaviors of worms, snakes, intestines, and perhaps even the brain!</p>', 'https://miro.medium.com/max/1400/1*1d0E2S2Do0cgd5tN8MSyAg.gif', false),
('5195acee-0396-11ec-9a03-0242ac130003', '28856520-037c-11ec-9a03-0242ac130003', false, 'How to make your HTML responsive by adding a single line of CSS', '<p>In this article I’ll teach you how to use CSS Grid to create a super cool image grid which varies the amount of columns with the width of the screen.
And the most beautiful part: the responsiveness will be added with a single line of CSS.</p>', 'https://miro.medium.com/max/2000/1*Bx0gNW69lAXaSRqRw0_8dw.jpeg', false),
('5a278f6c-0396-11ec-9a03-0242ac130003', '2e04946c-037c-11ec-9a03-0242ac130003', false, 'Machine Learning Basics with the K-Nearest Neighbors Algorithm', '<p>The k-nearest neighbors (KNN) algorithm is a simple, easy-to-implement supervised machine learning algorithm that can be used to solve both classification and regression problems. Pause! Let us unpack that.</p>', 'https://miro.medium.com/max/1400/1*Zo9t7i-x7tyuzk3l0T5w6g.jpeg', false),
('648bb9ec-0396-11ec-9a03-0242ac130003', '31d94cea-037c-11ec-9a03-0242ac130003', false, 'How I used a simple Google query to mine passwords from dozens of public Trello boards', '<p>A few days ago on 25th April, while researching, I found that a lot of individuals and companies are putting their sensitive information on their public Trello boards. Information like unfixed bugs and security vulnerabilities, the credentials of their social media accounts, email accounts, server and admin dashboards — you name it, is available on their public Trello Boards which are being indexed by all the search engines and anyone can easily find them.</p>', 'https://miro.medium.com/max/1400/1*6PO4cITaemxEBISjKuRimg.png', false),
('8bb3259e-0398-11ec-9a03-0242ac130003', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'How to send an Email in Laravel using Gmail SMTP Server', '<p>Have you been wondering how to send an email in Laravel using its default SMTP settings without having an SMTP account or purchasing an SMTP Plan?
Have the PHP default mail() functions, failed you due to some server settings and configurations?</p>', 'https://miro.medium.com/max/1400/1*wUndlASGx4En3uV2-eIOGg.jpeg', false),
('87b436e0-0398-11ec-9a03-0242ac130003', '28856520-037c-11ec-9a03-0242ac130003', false, 'Creating user, database and adding access on PostgreSQL', '<p>One nice thing about PGSQL is it comes with some utility binaries like createuser and createdb. So we will be making use of that.
As the default configuration of Postgres is, a user called postgres is made on and the user postgres has full superadmin access to entire PostgreSQL instance running on your OS.</p>', 'https://miro.medium.com/max/1400/1*IW4iIzJdAX0kAmUGmZApnQ.png', false);

insert into post2tag
(post_id, tag_id)
values
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'a099b732-23ba-49aa-9b94-a9541b1c18b7'),
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'e515e04d-b5bd-4632-999d-69e4e5bf80c4'),
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'd8e00380-01f1-4df7-93d0-23ec46fcaa1e'),
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'a9bd986b-aabd-433e-9d00-8255ad113198'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'b280ecd5-243f-4b55-ba4e-4777ef49453b'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'a099b732-23ba-49aa-9b94-a9541b1c18b7'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'b7df6f05-e3e5-4236-8da1-81c4babe37e4'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', '73ef71c4-ff2d-4c6b-8a4e-b83fdd593ce1'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', '1087aa78-5223-4e69-995c-0f08ba355ac8'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', '37588855-c43a-408e-9fa4-ddcad9e7c4c1'),
('e2eceb99-7388-47bb-9f14-339f3392efbd', 'b6c3b74f-b7e6-4718-92fc-e9491ee51d0b'),
('12c94050-70a2-432d-a5ca-efb870be34a2', '6b1a086a-6fc9-426e-9514-ac67d508fb7c'),
('e1ad9dc5-a631-485b-a68f-9c4106558b9f', '6b1a086a-6fc9-426e-9514-ac67d508fb7c'),
('0bee5886-cf57-4d9f-b8b2-f3dec68cecdc', 'd554417f-9226-4336-9496-342ecb2b3a7f'),
('0bee5886-cf57-4d9f-b8b2-f3dec68cecdc', 'd84bc12d-dcfd-4274-90a6-a31eaaa972f1'),
('91b5debe-0398-11ec-9a03-0242ac130003', 'f88d298b-56f1-4a75-b09d-6ea290ab7243'),
('12c94050-70a2-432d-a5ca-efb870be34a2', '702b6a04-f420-47ff-b6e2-cb069c05480e'),
('12c94050-70a2-432d-a5ca-efb870be34a2', '4df9cf43-0144-4892-a5da-ac858ff28145'),
('6dd35066-4b3b-4321-a576-dd249c45603d', 'bfed82f5-9b40-48ff-853c-cc43d822ed8d'),
('6dd35066-4b3b-4321-a576-dd249c45603d', '0fa8098a-696f-428b-9293-135e047ceed3'),
('6dd35066-4b3b-4321-a576-dd249c45603d', '4df9cf43-0144-4892-a5da-ac858ff28145'),
('6dd35066-4b3b-4321-a576-dd249c45603d', '1980ff08-cd8e-40a4-a53d-f76ec481e106'),
('6dd35066-4b3b-4321-a576-dd249c45603d', 'c708b5b6-9bcc-4034-adaa-df95d746daee'),
('4baf517c-0396-11ec-9a03-0242ac130003', '7163a77f-122b-4abe-9379-c212beb6253c'),
('4baf517c-0396-11ec-9a03-0242ac130003', 'a099b732-23ba-49aa-9b94-a9541b1c18b7'),
('5195acee-0396-11ec-9a03-0242ac130003', '00285fd0-8cd0-4e1a-9d7e-fd4ee3cfe771'),
('5195acee-0396-11ec-9a03-0242ac130003', 'a4744be5-ff78-4a35-b920-1b4d4b28e58e'),
('5a278f6c-0396-11ec-9a03-0242ac130003', 'a2cf0961-f384-46d3-b586-ea068fd9f439'),
('5a278f6c-0396-11ec-9a03-0242ac130003', 'af84ce7d-304e-4388-aeb9-9bb9d01cfc3f'),
('648bb9ec-0396-11ec-9a03-0242ac130003', 'dd669275-2a27-4ce4-83a8-b3f7200070c6'),
('8bb3259e-0398-11ec-9a03-0242ac130003', 'bcde81b5-c7a1-4d46-b03b-c7ae8ff1c950'),
('87b436e0-0398-11ec-9a03-0242ac130003', '1980ff08-cd8e-40a4-a53d-f76ec481e106');

insert into comments
(id, author_id, post_id, comment_id, text)
values
('953f401c-7ba7-4523-805e-6fee70e2cb14', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '95a46088-b143-483d-a86c-3d6be6fd2e6d', null, 'I totally agree! Lovely post'),
('5d538bc8-0644-42de-b1eb-d8afaf47871e', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', null, 'Expected. No wonder'),
('6ec4bcdc-7121-4dcf-b186-616cbb5c488c', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'e2eceb99-7388-47bb-9f14-339f3392efbd', null, 'I had all these mistakes XD'),
('2591bf93-d4e4-4fce-95b6-c730c7ef5fdd', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', '953f401c-7ba7-4523-805e-6fee70e2cb14', 'I think it''s too early to say that'),
('99abe5fc-8a24-4d2e-91b7-af68cb67fb5e', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '95a46088-b143-483d-a86c-3d6be6fd2e6d', '2591bf93-d4e4-4fce-95b6-c730c7ef5fdd', 'I don’t know, but it’s very interesting.'),
('cb621b68-e648-4bdb-9a06-a6395a1ca22d', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', null, 'Ho-ho-ho! strength of fortune.'),
('f6fe32fa-72a4-4ec1-8626-d57c9a22956c', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', 'cb621b68-e648-4bdb-9a06-a6395a1ca22d', 'All great gurus hurt each other, only outer creators have a volume.');

insert into post_reactions
(id, author_id, liked, post_id)
values
('d393d58e-3940-42fb-bd9e-8a3f2161fe2e', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', false, 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('7ac6106e-03db-11ec-9a03-0242ac130003', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('7f3c19fe-03db-11ec-9a03-0242ac130003', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('7e46f950-03dc-11ec-9a03-0242ac130003', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', true, 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9'),
('82a9f204-03dc-11ec-9a03-0242ac130003', '28856520-037c-11ec-9a03-0242ac130003', true, 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9'),
('7d9df9e7-845c-470c-b481-5b08bddaeae3', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('d602b076-03dc-11ec-9a03-0242ac130003', '31d94cea-037c-11ec-9a03-0242ac130003', false, 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('754375e4-0acc-49f3-922e-db29837d7f82', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('df14aac7-861e-42e0-a6ed-49b9713d4d11', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('5422df61-f6dc-496d-a9bf-5c7352275d24', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('263172fa-81d3-4c67-ad63-89d3596ba42f', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, '12c94050-70a2-432d-a5ca-efb870be34a2'),
('a614745f-2fdc-4e87-afce-369133d3ab2d', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, '6dd35066-4b3b-4321-a576-dd249c45603d');

insert into comment_reactions
(id, author_id, liked, comment_id)
values
('bfed9e9e-34c1-436a-9e7e-1a1dfc6d87b7', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', false, '2591bf93-d4e4-4fce-95b6-c730c7ef5fdd'),
('b179cb7d-0c99-4a27-92b3-069bf6cd3036', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', true, '5d538bc8-0644-42de-b1eb-d8afaf47871e'),
('f06a9e20-9328-48f1-bc50-502edc951bba', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', false, '953f401c-7ba7-4523-805e-6fee70e2cb14'),
('6942b4e2-275a-470a-ba13-47c56b8bebab', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', true, '953f401c-7ba7-4523-805e-6fee70e2cb14'),
('b204debc-4773-443c-a352-5a1eb97eb8ec', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, 'f6fe32fa-72a4-4ec1-8626-d57c9a22956c');

insert into post_versions
(id, post_id, title, text, draft, markdown, author_id)
values
('57de387c-d076-422a-9c6c-361f38681fcd', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'Top 5 programming languages to learn in 2020-2021', 'Coding languages are ever-evolving just like any other professional area. Some technologies become top-rated, some loose their prime positions and it’s no longer wise to spend time learning them. For a tech newbie striving to learn programming, it might be a bit complicated to figure out which technology to choose. Let me help you out. As a Senior Java developer and a long-term tutor, I can share some advice on the most popular programming languages. Here’s my shortlist of the winners.

---
&nbsp;
Python
======

![](https://miro.medium.com/max/475/1*wp_FMn_NT4Eny0mGWLoktg.png)

**Platform**: Web, Desktop

**Annual Salary Projection**: [$76,500](https://www.glassdoor.com/Salaries/python-developer-salary-SRCH_KO0,16.htm)

What‘s the technology about
===========================

There are three core things that make Python a rock star technology to learn. First, it’s free and open-source. Second, it’s readable which makes it one of the easiest programming languages to learn. And third, this is the technology behind the high-demanded areas of Data Science and Machine Learning. The shortage of skills and professionals here is very high. Moreover, Python has powerful modules for GUI-based apps which is quite handy for visually loaded projects.

Where to learn
==============

1.  [Learnpython.org](https://www.learnpython.org/). This resource is a great option for mastering Python from scratch. It’s an interactive tutorial with over 500,000 learners worldwide. The courses are meticulously structured and it’s easy to grasp what the platform is about.

[2\. Learn Python the Hard Way](https://learnpythonthehardway.org/book/). Though the project title can sound quite challenging the reality is quite different. Here you can also start learning Python with no experience in coding. Moreover, it teaches you to see the outcome of your code right from the start. A kind of a problem-solving approach implemented in the code tasks.

[3\. Invent with Python](https://inventwithpython.com/). The course is aimed at giving you the power of creation together with coding proficiency. Besides learning the language itself (for free, by the way) you can invent your own games with the help of your newly acquired skills.

---
&nbsp;
Java
====

![](https://miro.medium.com/max/475/1*a8bjeSGesJDxO14YjFwvfQ.png)

**Platform**: Web, Mobile, Desktop

**Annual Salary Projection**: around $79,000 (as [Glassdoor](https://www.glassdoor.com/Salaries/java-developer-salary-SRCH_KO0,14.htm) claims)

What‘s the technology about
===========================

This is one of the top programming languages in the world. Java was created back in 1995 and now it’s owned by the global tech giant Oracle. It’s an object-oriented language that is widely used virtually everywhere. What makes it stand out is that this is the technology for large server-side enterprise-level applications. It is very secure and portable as well as highly structured. Java is widely used by huge IT corporations, including Google, Amazon, and Twitter, just to mention a few. Java coding skills have been in high demand for several years running and still are.

Where to learn
==============

[1\. CodeGym](https://codegym.cc/) a gamified Java learning platform. It is a well-organized course that is focused on learning by doing. And very fun to play with! The platform has over 1200 tasks of various levels. When you complete a task you get immediate verification of your solution. You can take a desktop version but also there’s a mobile version so you can code from your smartphone wherever you are. During the course, you move from level to level just like in a game. And at a certain point, you can start creating a game on your own. Try and see yourself.

[2\. Java Fundamentals by Pluralsight](https://www.pluralsight.com/courses/java-fundamentals-language). The platform provides a great insight into design patterns. This is one of the stumbling blocks for a neophyte programmer. Here in this course, you can set up this knowledge in the right way from the very start. Along with the many other great learning features the platform is worth trying.

[3\. Codecademy](https://www.codecademy.com/) is another resource I would suggest checking out. The project is free and neatly structured. So you can create your own curriculum and follow your own learning path. Each course contains over 50 lectures and interactive quizzes. And besides, there is an opportunity to ask someone from the community for a personal code review.

---
&nbsp;

Kotlin
======

![](https://miro.medium.com/max/475/1*9yVyi2seGlDZGRlkEp6dSA.png)

**Platform**: Web, Mobile, Desktop, Server

**Annual Salary Projection**: around [$136,000](https://www.ziprecruiter.com/Salaries/Kotlin-Salary)

What‘s the technology about
===========================

Kotlin is a relatively new programming language. It was first officially released in 2016 and it’s much like a junior brother of Java. It was actually aimed at outperforming the elder one. But I would say there’s still a way to go. Kotlin is widely used for Android development. And it is highly supported by Google. But it’s quite a recent story so some tools that Java already has are still to be re-created for Kotlin. Nevertheless, some major companies like Coursera or Pinterest prefer Kotlin over anything else. A newbie might find Kotlin a little complicated. But if you learn Java first and then polish your skills with Kotlin you’ll be much higher than the average developer.

Where to learn
==============

1.  [Kotlin for Java Developers at Udemy](https://www.udemy.com/course/kotlin-for-java-developers/). The course is a great option to enhance Java skills with cutting-edge technology for mobile development. It was specially created in a way that helps Java devs master the language in no time.

[2\. The Complete Kotlin Developer Course](https://www.udemy.com/course/kotlin-for-java-developers/). This is another Udemy course that will get you into the insights of Android mobile development. It digs into the general OOP concepts also which is quite essential for those at the starting point.

[3\. Kotlin for beginners: Learn Programming With Kotlin](https://www.udemy.com/course/kotlin-course/). Here you can actually start with the basics of programming and walk through the path into confident mobile apps development.

---
&nbsp;

Swift
=====

![](https://miro.medium.com/max/475/1*M4rqUV6zE9nQ02w9KO2y7Q.png)

**Platform**: Mobile (iOS and macOS apps, specifically)

**Annual Salary Projection**: [$96,000](https://www.glassdoor.com/Salaries/ios-developer-salary-SRCH_KO0,13.htm)

What‘s the technology about
===========================

This programming language is a successor to the well-known Objective-C, the technology behind the Apple world. The company released Swift in 2014, just like Kotlin it’s a relatively new code language but it is already very much in demand. Tech giants like WordPress, SoundCloud, or Mozilla FireFox use Swift for their iOS apps. With the decay of Objective-C, Swift became the official language for iOS and macOS development.

Where to learn
==============

1.  [Complete iOS 14, Swift 5 and Machine Learning with CoreML](https://www.udemy.com/course/coreml-course-for-everyone/). The creators of the course promise that by the end of the studies you will be able to build any app you want. Well, maybe not that fast. But you will definitely learn Swift basic, gain some useful coding experience and get a grasp of Machine Learning.

[2\. SwiftUI Masterclass 2021 — iOS 14 App Development & Swift 5](https://www.udemy.com/course/swiftui-masterclass-course-ios-development-with-swift/). This one is a bit more profound and complicated. Here you’ll master the basics of prototyping, create apps with great UI and learn how to publish your apps on the AppStore.

[3\. Cracking Coding Interview & Algorithm Design in Swift (2021)](https://www.udemy.com/course/cracking-coding-interview-algorithm-design-in-swift-2020/). This course is made in the form of an interview. Step by step you figure out how to overcome obstacles and gradually learn new approaches to coding.

---
&nbsp;

C#
==

![](https://miro.medium.com/max/475/1*m8kYhi-eiiwsBM5DVPMmcA.png)

**Platform**: Cross-platform, including mobile and enterprise software applications

**Annual Salary Projection**: [$68,500](https://www.glassdoor.com/Salaries/c-net-developer-salary-SRCH_KO0,15.htm)

What‘s the technology about
===========================

This is a programming language with a history and reputation. It’s a to-go option for Windows development and anything based on the .NET platform. It was created by Microsoft and it is still one of the best ever technologies for enterprise-level development. But not only that! C# is also used in the Unity game engine which in its turn is a top development environment for the gaming industry.

Where to learn
==============

1.  [C# Basics by Treehouse](https://teamtreehouse.com/library/c-basics-2). Here you can learn the basic concepts and code practices, complete challenges and create your first simple programs. Or maybe not that simple if you decide to dig deeper.

[2\. C# Basics for Beginners: Learn C# Fundamentals by Coding](https://www.udemy.com/course/csharp-tutorial-for-beginners/). The course creator explains everything and in a detail and in a very clear way. This makes the promise to learn C# basics in just 6 hours sound reasonable. Be ready to go beyond that time though: it is still adult-level programming.

[3\. C# Fundamentals by Scott Allen (Pluralsight)](https://www.pluralsight.com/courses/csharp-fundamentals-dev). Here you’ll get into the fundamentals of the C# and .NET platform. Step by step the course tutor walks you through the essentials of coding and creating your first C# projects. You’ll also learn about debugging your apps and testing the workability of your code.

---
&nbsp;

Wrap Up
=======

There are many options for a newbie to learn programming. As well as there are hundreds of code languages to start with. But the ones reviewed here are the world’s top-rated technologies and they remain this way for years. As a seasoned Java tutor, I believe these are the best programming languages to learn.

For a person who considers starting a career as a software developer, any of the five is a great option. They are in high demand globally and will obviously remain so in the future. If you already have coding skills you can refresh the knowledge or start learning new adjacent technology. Whatever you choose, the important thing is actually to devote regular time to learning. And ask for help when you need it. At a certain moment, you will find yourself coding easily and effortlessly. It might not seem so now at the beginning of the way. But I used to be just like you. So believe me, it is quite achievable to become a great software developer.'', ''https://res.cloudinary.com/adaface/image/upload/v1625607925/blog/images/sql1.png'', true),
(''e2eceb99-7388-47bb-9f14-339f3392efbd'', ''e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'', false, ''Introduction to .NET Core'', ''<p>I decided to start a series about .NET Core which has got remarkable attention in recent years and is increasing its popularity day by day as well as moving very fast. In this post, I will give general information about .NET Core and demonstrate how to build a console application using the framework. In the following posts, I am planning to write about ASP.NET Core MVC and build a web application and a REST API using this framework.</p>'', ''https://miro.medium.com/max/1400/1*Nzql75yGFnBOXZVJzIgA3g.jpeg'', false),
(''e1ad9dc5-a631-485b-a68f-9c4106558b9f'', ''8a29bd6d-9c90-44e5-87ea-493618aa1f6b'', false, ''Science Confirms That the Vagus Nerve Is Key to Well-being'', ''Introduction
====

The vagus nerve, also called the “10th cranial nerve,” is the longest, largest, and most complex of the cranial nerves, and in some ways it’s also the least understood. Experts have linked its activity to symptom changes in people with migraine headaches, inflammatory bowel disease, depression, epilepsy, arthritis, and many other common ailments. The more science learns about the nerve, the more it seems like a better understanding of the vagus nerve function could unlock new doors to treating all manner of human suffering.

Vagus is Latin for “wandering,” which is apt when one considers all the different parts of the body the vagus nerve reaches. “It seems like every year somebody finds a new organ or system that it talks with,” says Tiffany Field, PhD, director of the Touch Research Institute at the University of Miami School of Medicine.

---
&nbsp;

> “There’s a massive bioelectrical and biochemical series of events that the vagus nerve is responsible for, and all that is almost impossible to map.”

Field says that branches of the vagus nerve are connected to the face and voice. “We know that depressed people have low vagal activity, and this is associated with less intonation and less-active facial expressions,” she explains. A separate branch of the vagus nerve runs down to the gastrointestinal tract. Here, low vagal activity is associated with slowed gastric motility, which interferes with proper digestion, she says.

Still other branches of the vagus nerve are connected to the heart, the lungs, and the immune system. The vagus nerve’s activation or deactivation is tied to the ebb or flow of hormones such as cortisol and the digestive hormone ghrelin, the amount of inflammation the immune system produces, and many other internal processes that shape human health and experience. “There’s a massive bioelectrical and biochemical series of events that the vagus nerve is responsible for, and all that is almost impossible to map,” Field says.

How could one nerve system control so much? While some aspects of vagal activity are inscrutable, it’s clear that the nerve is the governor of the parasympathetic nervous system, which helps control the body’s relaxation responses. In simple terms, heightened vagal activity counteracts the stress response, which involves the sympathetic nervous system. “The sympathetic nervous system is fight or flight, while the parasympathetic nervous system is more chill out,” says Stephen Silberstein, MD, a professor of neurology and director of the Headache Center at Philadelphia’s Thomas Jefferson University Hospitals.

Silberstein co-wrote [a comprehensive 2016 review](https://www.ncbi.nlm.nih.gov/pubmed/26364692) of the research on the vagus nerve. He says that heightened vagal activity slows heart rate and also switches off inflammation, in part by triggering the release of immune system calming chemicals. There’s also evidence that activating the vagus nerve through electronic stimulation can produce a range of health benefits. “Depending on the frequency of the stimulation, we know it can turn off an asthma attack or an epileptic seizure,” Silberstein says. “It can turn off a migraine or cluster headache, and it can decrease the perception of acid reflux.”', false, true, 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('1371bb37-d3c5-4a3b-9d06-184479900392', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'Top 4 VSCode Extensions for Faster Development in JavaScript', '<p><a href="https://code.visualstudio.com/" class="cd fv" rel="noopener">VSCode</a> is an open-source, cross-platform editor that has become a favourite of programmers, particularly in the Web Development community. It’s fast, extensible, customisable, and has tons of features. You should check it out if you haven’t already done it.Thousands of extensions have been made for VSCode. I am going to list a few extensions that I use on a day-to-day basis. <strong class="io jk">Let’s begin</strong>!</p>
<br>
<h2>Quokka.js</h2>
<br>
<p><a href="https://quokkajs.com/" class="cd fv" rel="noopener">Quokka.js</a> is a rapid prototyping playground for JavaScript and TypeScript. What that means is that it runs your code immediately as you type  and displays various execution results in your code editor. Also Quokka.js is a developer productivity tool for rapid JavaScript / TypeScript prototyping. Runtime values are updated and displayed in your IDE next to your code, as you type.</p>
<br>
<p>After installing this <a href="https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode">extension</a>, you can press <em class="km">Ctrl/Cmd(⌘) + Shift + P</em> to display the editor’s command palette, and then type <em class="km">Quokka</em> to see the list of the available commands. Select and run the <strong>New JavaScript File</strong> command. You can also press (⌘ + K + J) to open the file directly. Anything you type in this file is executed immediately.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation"
      "src="https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif" srcset="https://miro.medium.com/max/345/1*ukcsChGYEreBhhAksiYceA.gif 276w, https://miro.medium.com/max/690/1*ukcsChGYEreBhhAksiYceA.gif 552w, https://miro.medium.com/max/800/1*ukcsChGYEreBhhAksiYceA.gif 640w, https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif 700w" sizes="800px">
</figure>
<br>
<h2>Bracket Pair Colorizer and Indent Rainbow🌈</h2>
<br>
<p>Brackets and parentheses are an inseparable part many programming languages. In a language such as JavaScript, <strong>a single page can have a barrage these characters with no easy mechanism to identify opening and closing pairs.</strong> Welcome <a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer">Bracket Pair Colorizer</a> and <a href="https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow">Indent Rainbow</a>. These are two different extensions. However, they really make a good and beautiful couple. These extensions will fill your editor with a flurry of colours, and make the code blocks easily discernible and pleasing to the eyes. Once you get used to them, VSCode feels insipid, and bland without them.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="412" height="147" role="presentation" src="https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png" srcset="https://miro.medium.com/max/345/1*tTp3nnHAfOJVRjc5mCa3fA.png 276w, https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png 412w" sizes="412px">
   <figcaption data-selectable-paragraph="">Without Indent Rainbow and Bracket Pair Colouriser</figcaption>
</figure>
<br>
<figure style="text-align: center;">
   <img alt="" class="re ue t u v ku aj c" width="412" height="147" role="presentation" src="https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png" srcset="https://miro.medium.com/max/345/1*fmd009UJSyiC3ZtsOgN3qA.png 276w, https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png 443w" sizes="443px">
   <figcaption data-selectable-paragraph="">🔥🔥 With Indent Rainbow and Bracket Pair Colorizer 🔥🔥</figcaption>
</figure>
<br>
<h2>Snippets</h2>
<br>
<p>Snippets are shorthands in an editor. So instead of writing <i>import React from ''react'';</i>, you can type <i>imr</i> and press Tab to expand this snippet. Similarly, <i>clg</i> becomes <i>console.log</i>.</p>
<p>There exists a lot of snippets for all sorts of things:</strong> Javascript(or any other language), React, Redux, Angular, Vue, Jest. I personally find Javascript snippets really useful since I work mostly with JS.</p>
<br>
<h3>Some good snippet extensions are —</h3>
<ul>
   <a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets">JavaScript (ES6) code snippets</a></li>
   <li><a href="https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux">React-Native/React/Redux snippets for es6/es7</a></li>
   <li><a href="https://marketplace.visualstudio.com/items?itemName=TimonVS.ReactSnippetsStandard">React Standard Style code snippets</a></li>
</ul>
<br>
<h2>Dracula (Theme)</h2>
<br>
<p>One <a href="https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula">theme</a> that I like.</p>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation" src="https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png" srcset="https://miro.medium.com/max/345/1*VXgT4EFpAKtPfXTgi00BqA.png 276w, https://miro.medium.com/max/690/1*VXgT4EFpAKtPfXTgi00BqA.png 552w, https://miro.medium.com/max/800/1*VXgT4EFpAKtPfXTgi00BqA.png 640w, https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png 700w" sizes="443px">
</figure>
<p>These were some of the VSCode extensions that I use regularly. What other <strong >extensions and themes</strong> do you like? Respond to this article and mention them. 😀</p>
<br>
<p><strong >Reach out to me on @ </strong><a href="https://www.facebook.com/arfat.salman"><strong>Facebook</strong></a><strong > @ </strong><a href="https://www.linkedin.com/in/arfatsalman/"><strong>Linkedin</strong></a><strong> @ </strong><a href="https://twitter.com/salman_arfat"><strong>Twitter</strong></a><strong>.</strong></p>', false, false, '1934406d-e088-4a28-8c44-ccfdd5125b90'),
('232a0ec6-266d-4403-8eba-10309858e574', '6dd35066-4b3b-4321-a576-dd249c45603d', 'CRUD RESTful API with Go, JWT, Postgres, Mysql', '<p>Golang(Go) is a general-purpose programming language built of today’s computers (upwork).CRUD stands for Create, Read, Update, and Delete. But put more simply, in regards to its use in RESTful APIs, CRUD is the standardized use of HTTP Action Verbs. This means that if you want to create a new record you should be using “POST.” If you are trying to read a record, you should be using “GET.” To update a record utilizing “PUT” or “PATCH.” And to delete a record, using “DELETE.”</p>', false, false, '28856520-037c-11ec-9a03-0242ac130003');

insert into post_pr
(id, contributor_id, post_id, closed, text, title)
values
('99a568b0-ac71-458c-8e5e-b94902947b88', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', false, 'The first place is JavaScript, the second is Java, the third .NET', 'List of 3 The Best Programming Languages to Learn in 2021'),
('b73234a4-7bb8-471b-9a2e-cfc29c490e24', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'e2eceb99-7388-47bb-9f14-339f3392efbd', false, '<p>I decided to start a series about .NET Core which has got right attention in recent years and is increasing its popularity day.', 'Introduction to .NET'),
('d3e17128-1480-42c7-b4c3-94f6d46db179', '1934406d-e088-4a28-8c44-ccfdd5125b90', '95a46088-b143-483d-a86c-3d6be6fd2e6d', true, '<p><a href="https://code.visualstudio.com/" class="cd fv" rel="noopener">VSCode</a> is an open-source, cross-platform editor that has become a favourite of programmers, particularly in the Web Development community. It’s fast, extensible, customisable, and has tons of features. You should check it out if you haven’t already done it.Thousands of extensions have been made for VSCode. I am going to list a few extensions that I use on a day-to-day basis. <strong class="io jk">Let’s begin</strong>!</p>
<br>
<h2>Quokka.js</h2>
<br>
<p><a href="https://quokkajs.com/" class="cd fv" rel="noopener">Quokka.js</a> is a rapid prototyping playground for JavaScript and TypeScript. What that means is that it runs your code immediately as you type  and displays various execution results in your code editor. Also Quokka.js is a developer productivity tool for rapid JavaScript / TypeScript prototyping. Runtime values are updated and displayed in your IDE next to your code, as you type.</p>
<br>
<p>After installing this <a href="https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode">extension</a>, you can press <em class="km">Ctrl/Cmd(⌘) + Shift + P</em> to display the editor’s command palette, and then type <em class="km">Quokka</em> to see the list of the available commands. Select and run the <strong>New JavaScript File</strong> command. You can also press (⌘ + K + J) to open the file directly. Anything you type in this file is executed immediately.It also works with JSX and many other languages such as XML, PHP, Vue, JavaScript, TypeScript, TSX.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation"
      "src="https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif" srcset="https://miro.medium.com/max/345/1*ukcsChGYEreBhhAksiYceA.gif 276w, https://miro.medium.com/max/690/1*ukcsChGYEreBhhAksiYceA.gif 552w, https://miro.medium.com/max/800/1*ukcsChGYEreBhhAksiYceA.gif 640w, https://miro.medium.com/max/875/1*ukcsChGYEreBhhAksiYceA.gif 700w" sizes="800px">
</figure>
<br>
<h2>Bracket Pair Colorizer and Indent Rainbow🌈</h2>
<br>
<p>Brackets and parentheses are an inseparable part many programming languages. In a language such as JavaScript, <strong>a single page can have a barrage these characters with no easy mechanism to identify opening and closing pairs.</strong> Welcome <a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer">Bracket Pair Colorizer</a> and <a href="https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow">Indent Rainbow</a>. These are two different extensions. However, they really make a good and beautiful couple. These extensions will fill your editor with a flurry of colours, and make the code blocks easily discernible and pleasing to the eyes. Once you get used to them, VSCode feels insipid, and bland without them.</p>
<br>
<figure style="text-align: center;">
   <img alt="" width="412" height="147" role="presentation" src="https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png" srcset="https://miro.medium.com/max/345/1*tTp3nnHAfOJVRjc5mCa3fA.png 276w, https://miro.medium.com/max/515/1*tTp3nnHAfOJVRjc5mCa3fA.png 412w" sizes="412px">
   <figcaption data-selectable-paragraph="">Without Indent Rainbow and Bracket Pair Colouriser</figcaption>
</figure>
<br>
<figure style="text-align: center;">
   <img alt="" class="re ue t u v ku aj c" width="412" height="147" role="presentation" src="https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png" srcset="https://miro.medium.com/max/345/1*fmd009UJSyiC3ZtsOgN3qA.png 276w, https://miro.medium.com/max/554/1*fmd009UJSyiC3ZtsOgN3qA.png 443w" sizes="443px">
   <figcaption data-selectable-paragraph="">🔥🔥 With Indent Rainbow and Bracket Pair Colorizer 🔥🔥</figcaption>
</figure>
<br>
<h2>Snippets</h2>
<br>
<p>Snippets are shorthands in an editor. So instead of writing <i>import React from ''react'';</i>, you can type <i>imr</i> and press Tab to expand this snippet. Similarly, <i>clg</i> becomes <i>console.log</i>.</p>
<p>There exists a lot of snippets for all sorts of things:</strong> Javascript(or any other language), React, Redux, Angular, Vue, Jest. I personally find Javascript snippets really useful since I work mostly with JS.</p>
<br>
<h2>Dracula (Theme)</h2>
<br>
<p>One <a href="https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula">theme</a> that I like.</p>
<figure style="text-align: center;">
   <img alt="" width="500" height="338" role="presentation" src="https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png" srcset="https://miro.medium.com/max/345/1*VXgT4EFpAKtPfXTgi00BqA.png 276w, https://miro.medium.com/max/690/1*VXgT4EFpAKtPfXTgi00BqA.png 552w, https://miro.medium.com/max/800/1*VXgT4EFpAKtPfXTgi00BqA.png 640w, https://miro.medium.com/max/875/1*VXgT4EFpAKtPfXTgi00BqA.png 700w" sizes="443px">
</figure>
<p>These were some of the VSCode extensions that I use regularly. What other <strong >extensions and themes</strong> do you like? Respond to this article and mention them. 😀</p>
<br>
<p><strong >Reach out to me on @ </strong><a href="https://www.facebook.com/arfat.salman"><strong>Facebook</strong></a><strong > @ </strong><a href="https://www.linkedin.com/in/arfatsalman/"><strong>Linkedin</strong></a><strong> @ </strong><a href="https://twitter.com/salman_arfat"><strong>Twitter</strong></a><strong>.</strong></p>', 'Top JavaScript VSCode Extensions'),
('c120ce78-03e0-11ec-9a03-0242ac130003', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', false, 'Paralysis at the alpha quadrant was the core of mind, accelerated to a fantastic sonic shower.', 'Top 5 programming languages to learn in 2020-2021'),
('c5719476-03e0-11ec-9a03-0242ac130003', '2e04946c-037c-11ec-9a03-0242ac130003', 'e2eceb99-7388-47bb-9f14-339f3392efbd', false, 'This article describes how Web API binds parameters, and how you can customize the binding process. When Web API calls a method on a controller, it must set values for the parameters, a process called binding.', 'Introduction to .NET Core');

insert into achievements
(id, title, text, level, type)
values
('1d1a158f-bda4-4083-a38f-22265d35abe5', 'Kid', 'Be on the project for 1 year', 1, 'Time'),
('36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878', 'Boy', 'Be on the project for 2 year', 2, 'Time'),
('ab1f68c2-186a-4b37-bbc2-ebb1670605a6', 'Man', 'Be on the project for 3 year', 3, 'Time'),
('8b6c07b0-fc5d-4914-a584-6738d5bcf963', 'Old', 'Be on the project for 5 year', 4, 'Time'),
('206a26d4-14ae-45d3-baa4-dc21de2d9c80', 'Writer', 'Write 50 posts', 3, 'Write'),
('80bf1604-f394-42ca-af1d-2ab8dc551c45', 'Talkative', 'Write 100 comments', 3, 'Write');

insert into favorites
(id, user_id, post_id)
values
('54fdfaf8-7ec8-476a-9124-8cfccf7d3260', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9'),
('47ac3b41-df0a-4403-a281-3f0a7443efce', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('c6f26b8e-fd6d-4e82-a620-916d0edbd376', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'e1ad9dc5-a631-485b-a68f-9c4106558b9f'),
('e13f43c9-edab-44d5-94a2-4451bab7c0ac', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '0bee5886-cf57-4d9f-b8b2-f3dec68cecdc'),
('81dafdf8-d16a-4080-a088-daa72e96ba1e', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '6dd35066-4b3b-4321-a576-dd249c45603d'),
('141ccea8-d3ed-4cef-8099-5499927cb61a', '1934406d-e088-4a28-8c44-ccfdd5125b90', '6dd35066-4b3b-4321-a576-dd249c45603d');

insert into followers
(id, follower_id, followed_id)
values
('d5c4c669-3fb4-4524-aacb-1afeedf344af', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa'),
('f734237f-4313-440c-b4b6-a859d92428e3', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('dc957096-063b-4372-af47-af0c6c26dd5a', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1'),
('69b638e4-559c-4c27-8f97-dabc10bbe8d8', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b'),
('89bf6aef-64a1-48bb-af1e-5956d859d04f', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa'),
('a7734beb-d026-49c7-8d56-887bff4095f8', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', '1934406d-e088-4a28-8c44-ccfdd5125b90'),
('4d83d1ec-6b7b-4b83-ac4a-75cc6fe682be', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('e67113d2-b165-4904-88bc-3a58ea19ff2d', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '1934406d-e088-4a28-8c44-ccfdd5125b90');

insert into highlights
(id, user_id, post_id, text)
values
('aa7d54b8-3b5a-4cf2-80da-2a38f7baa115', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '6dd35066-4b3b-4321-a576-dd249c45603d' ,'rub broccoli'),
('7f30d383-6b8d-4cbf-94e2-73efdb795b10', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'e2eceb99-7388-47bb-9f14-339f3392efbd' ,'1) Exeptions'),
('234e7f12-5796-4132-8055-367ff04a0622', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '0bee5886-cf57-4d9f-b8b2-f3dec68cecdc' ,'Confucius says: purpose and om.'),
('f54c9bd1-3667-4a0c-8ea9-3c767d416303', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '6dd35066-4b3b-4321-a576-dd249c45603d' ,'chicken lard and peppermint tea with it in a wok.'),
('dfe4e5ee-a475-4d26-9e7a-d862991c4ff5', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', 'The machine is more particle'),
('953b990f-a828-40cd-81a8-6713a5a4dea4', '1934406d-e088-4a28-8c44-ccfdd5125b90', '6dd35066-4b3b-4321-a576-dd249c45603d', 'tea with it in a wok');

insert into notifications
(id, receiver_id, source_id, text, is_read, type)
values
('a36acb71-850a-47ab-b60e-1c2311603f7a', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'Congratulations on your registration', true, 'New follower'),
('c7cec6ad-6b04-4beb-ba92-33d354bb2c5c', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'Your post has been published', true, 'New follower'),
('d14a0c7b-5e91-4e3b-980e-4043f5a0daa8', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'Congratulations on your registration', true, 'New post'),
('7e5616f3-8b8b-4c41-9fcc-672cd98a70e0', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'Congratulations on your registration', true, 'New post'),
('b00c8e87-702d-40b4-943d-4124b0f821c5', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'You have a new follower', false, 'New follower'),
('0ea40bb8-054b-4b63-91a6-8acccf835eb4', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'You have a new follower', false, 'New follower'),
('b4309d34-84ea-42c5-a3a6-fc7468208a4f', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e2eceb99-7388-47bb-9f14-339f3392efbd', 'New post published', false, 'New post'),
('10c9058a-c93a-4254-91ce-6558e786c6d1', '1934406d-e088-4a28-8c44-ccfdd5125b90', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'New post published', false, 'New post');

insert into pr_comments
(id, author_id, pr_id, comment_id, text)
values
('e22b79f8-a831-426b-aeeb-7145a0aec0ae', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'Urgent need to accept'),
('6b2cb140-fd98-4c4f-8ccb-9692ca5b1b2c', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'b73234a4-7bb8-471b-9a2e-cfc29c490e24', null, 'And what are the changes?'),
('51c618ce-702e-46db-9b08-42bba3564842', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'Good change'),
('f428e458-2a2a-40be-a568-a7371ed6b493', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'b73234a4-7bb8-471b-9a2e-cfc29c490e24', null, 'Mmm... Seems good :)'),
('ef5901fa-0d79-483c-ae8f-25fe491cb951', '1934406d-e088-4a28-8c44-ccfdd5125b90', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'A great man wrote it');

insert into users_achievements
(id, user_id, achievement_id)
values
('45d6f180-2ddd-4a67-95ea-0fa5d5f094fb', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '1d1a158f-bda4-4083-a38f-22265d35abe5'),
('dac52716-ec2d-4435-912c-de0cd849e1f7', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', '206a26d4-14ae-45d3-baa4-dc21de2d9c80'),
('ea6f96a7-88d5-455d-812e-7520a498d3be', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '80bf1604-f394-42ca-af1d-2ab8dc551c45'),
('8c11996d-d896-4eff-894e-17794c10f390', '1934406d-e088-4a28-8c44-ccfdd5125b90', '1d1a158f-bda4-4083-a38f-22265d35abe5'),
('9137468e-437a-4f88-91f7-d9dedbda0c24', '1934406d-e088-4a28-8c44-ccfdd5125b90', '36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878'),
('338ead3b-2185-46d7-82ec-4799003be89c', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'ab1f68c2-186a-4b37-bbc2-ebb1670605a6'),
('483dfdb8-9e1c-4ee0-9f14-23a79eb2c6d6', '1934406d-e088-4a28-8c44-ccfdd5125b90', '8b6c07b0-fc5d-4914-a584-6738d5bcf963'),
('edb35a52-ba00-45e7-a5b2-9c35633ec4f5', '1934406d-e088-4a28-8c44-ccfdd5125b90', '206a26d4-14ae-45d3-baa4-dc21de2d9c80'),
('d547f8ff-9d12-4b12-9757-669475ab7e57', '1934406d-e088-4a28-8c44-ccfdd5125b90', '80bf1604-f394-42ca-af1d-2ab8dc551c45');
