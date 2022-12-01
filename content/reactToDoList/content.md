Title: Todo list with React and LocalStorage
Date: 2020-01-26 03:45
Category: Blog
Tags: Javascript, React, CSS, LocalStorage
Authors: Nagarajan
Disqus_Identifier: reactToDoList
Summary: A simple client side TODO list created using React and localstorage. Due to using localstorage, the list will retain any changes across tabs in the same browser (even after closing and opening tabs). <br /> <div style="display: flex; justify-content: center"><img style="width: 720px; border: 2px solid gray" src="/Todo list screenshot.png" /></div>


Some time ago, I had built a simple standalone ToDo list in React, which stores its data in the browser localstorage, and I thought it came together quite neatly. Its actually less than 200 lines of javascript code (wasn't deliberately trying to play golf with the line count - link to the code near the bottom).

The use of local storage allows the list to retain its data across client restarts. So it kind of works like the apps of old days, when we didn't have a backend server syncing the data on different devices.

Try it out below...

Some features : You can click on an item text to modify it. You can also move items across lists by clicking on the arrows. Item deletion uses the red 'x'. Doesn't have drag and drop as yet.


<div id='appContainer'>You need Javascript to run this program</div>

<script src="/js/react.production.min.js"></script>
<script src="/js/react-dom.production.min.js"></script>

<script src="/js/reactToDoList/index.js"> </script>

<link rel='stylesheet' type='text/css' href="/css/reactToDoList/app.css" />

The source code for the todo list is [here](https://gitlab.com/motleytech/mtOnPelican/-/raw/master/motleytechnet/content/js/reactToDoList/index.js) (or view source of this page in dev tools - its unminified). Also, all the components are in a single file (there are only a handful), but I am not using webpack, so had little option. Its terrible... I know (the horror :-)). Fair warning... the React JSX has been transpiled, so its going to look a bit different from your typical React code you are used to.
