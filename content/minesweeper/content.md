Title: Minesweeper
Date: 2020-02-18 11:43
Category: Blog
Tags: Minesweeper
Authors: Nagarajan
Disqus_Identifier: minesweeper
Summary: The classic Minesweeper game implemented with Javascript, React and CSS. <br /> <div style="display: flex; justify-content: center"><img style="width: 320px; border: 2px solid gray; padding: 12px; box-sizing: border-box" src="/images/Minesweeper screenshot.webp" /></div>


The classic Minesweeper game implemented with Javascript, React and CSS.

<div id="minesweeper"></div>

Rules, Controls and Tips

- **Left clicking** on a closed square opens it, possibly revealing a number, a mine or an empty square.
- The number in a square denotes the number of mines that are in the neighboring squares (horizontal, vertical and diagonal neighbors). An empty square has no mines neighboring it (hence its neighbors are automatically opened).
- **Right clicking** a square marks it with a flag (used to denote a mine). Left clicking on a flagged square will not open it. Double clicking a flagged square will remove the flag.
- Exposing a mine detonates all unflagged mines. As a side effect, you also lose the game (in addition to dying). Thankfully, a click of a button reincarnates you to fight another day.
- **Double clicking** on a numbered square, which has an equal number of neighboring flagged squares, will open all the unflagged neighboring closed squares. This speeds up the process considerably.
- If a square has been incorrectly flagged, it will be highlighted with an <span style="background-color: red">&nbsp;x&nbsp;</span> at the end of the game.
- The first square to be opened in a game will never be a mine.

All the best!

The source code for the game is available under my github page [here](https://github.com/nagarajan/motleytechpy3/blob/master/content/js/minesweeper/app.js).

<link rel="stylesheet" href="/css/minesweeper/app.css">

<script src="/js/react.production.min.js"></script>
<script src="/js/react-dom.production.min.js"></script>

<!-- Uncomment lines below to make changes-->
<!-- <script src="/js/babel.min.js"></script>
<script type="text/babel" src="/js/minesweeper/app.js"></script> -->

<!-- Comment the line below to make changes-->
<script src="/js/minesweeper/app-transpiled.js"></script>
