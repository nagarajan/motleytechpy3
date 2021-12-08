Title: Balanced binary tree (AVL tree) animation
Date: 2020-04-8 18:45
Category: Blog
Tags: Javascript, CSS, Balanced Binary Tree, AVL, Animation
Authors: Nagarajan
Disqus_Identifier: balancedAVLTree

I made an animation of items being added to a [balanced binary tree (specifically AVL tree)](https://en.wikipedia.org/wiki/AVL_tree), and rotations of the tree nodes as the tree balances itself.

The number in the subscript is the height of a node (its distance from its deepest descendent leaf). The tree uses the height detail to balance itself. Essentially, balancing in the tree is achieved by making sure that for each node, the heights of its child nodes do not differ by more than one. If they do, the tree performs rotations to lower this difference. The animation shows some typical rotations as the tree balances itself.

Using the input data field, you can try your own numbers to see how items are inserted into the tree. Enter your custom values (comma separated), and hit enter to restart the animation with the new data.


<div id='root'>You need Javascript to run this program</div>

<link rel='stylesheet' type='text/css' href="/css/balancedTree/app.css" />

<script src="/js/react.production.min.js"></script>
<script src="/js/react-dom.production.min.js"></script>

<script src="/js/balancedTree/app_transpiled.js"> </script>

The source code for this animation/demo can be found [here](https://gitlab.com/motleytech/mtOnPelican/-/raw/master/motleytechnet/content/js/balancedTree/app_transpiled.js). Kindly request permission before using / copying.
