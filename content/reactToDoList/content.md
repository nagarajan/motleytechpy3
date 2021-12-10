Title: Todo list with React and LocalStorage
Date: 2020-02-26 03:45
Category: Blog
Tags: Javascript, React, CSS, LocalStorage
Authors: Nagarajan
Disqus_Identifier: reactToDoList


Some time ago, I had built a simple standalone ToDo list in React, which stores its data in the browser localstorage, and I thought it came together quite neatly. Its actually less than 200 lines of javascript code (wasn't deliberately trying to play golf with the line count - link to the code near the bottom).

The use of local storage allows the list to retain its data across client restarts. So it kind of works like the apps of old days, when we didn't have a backend server syncing the data on different devices.

Try it out below...

Some features : You can click on an item text to modify it. You can also move items across lists by clicking on the arrows. Item deletion uses the red 'x'.


<div id='appContainer'>You need Javascript to run this program</div>

<script src="/js/react.production.min.js"></script>
<script src="/js/react-dom.production.min.js"></script>

<script src="/js/reactToDoList/index.js"> </script>

<link rel='stylesheet' type='text/css' href="/css/reactToDoList/app.css" />

The source code for the todo list is [here](https://gitlab.com/motleytech/mtOnPelican/-/raw/master/motleytechnet/content/js/reactToDoList/index.js) (or view source in dev tools - its unminified). Also, this is without using webpack, so all the components are in a single file. Its terrible... I know (the horror :-)). I am also loading React and Babel from CDNs - probably the laziest way to get up and runnning with React ;-)).
