Title: Sudoku solver
Date: 2017-07-02 11:19
Category: Blog
Tags: Sudoku, Computing
Authors: Nagarajan
Disqus_Identifier: sudoku_solver

A simple sudoku solver implemented in Javascript. This is a port of my [previous Python solution](https://github.com/motleytech/pybook/blob/master/books/Sudoku_solver.ipynb).

This program uses a randomized approach... which implies that if a problem has more than one solution, this program will randomly find one of the solutions. You can even try to solve a problem with no clues... the program will respond with a random (correctly filled) sudoku - click on "Solve" to give it a try.

<div id='sudokudiv'>
</div>

<button id="btnreset" onclick="sudokuSolver.onReset()" class="btn btn-danger" type="button">Reset</button>
<button id="btnsolve" onclick="sudokuSolver.onSolve()" class="btn btn-info" type="button">Solve!</button>
<span id="statustext"></span>

<span id="errortext" style="color:red"></span>

<script src="/js/sudokuSolver.js"></script>

<script>
    window.onload = function () { sudokuSolver.initialize('#sudokudiv', '#progressbar') }
</script>

<noscript style="color:red">
  You must have javascript enabled in order to use this application.
</noscript>
