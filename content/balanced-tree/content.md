Title: Balanced binary tree animated
Date: 2020-04-8 18:45
Category: Blog
Tags: Javascript, CSS, Balanced Binary Tree, AVL, Animation
Authors: Nagarajan
Disqus_Identifier: balancedAVLTree
Summary: The balanced binary tree is an exremely useful data structure which promises excellent **insert**, **find** and **delete** performance guarantees. <div style="display: flex; justify-content: center; margin-bottom: 15px"><img style="width: 640px; border: 2px solid gray; box-sizing: border-box" src="/images/Balanced tree screenshot.png" /></div> The key to this performance is the balancing property which makes sure that the tree does not get too lopsided (leading to bad performance) - and the key to balancing the tree are the rotation operations.

The balanced binary tree is an exremely useful data structure which promises excellent **insert**, **find** and **delete** performance guarantees. The key to this performance is the balancing property which makes sure that the tree does not get too lopsided (leading to bad performance) - and the key to balancing the tree are the rotation operations. The animation below gives a visual demonstration of insertions, rotations, and tree balancing at work.

There are a few slightly different varieties of a balanced tree... we use an [AVL tree](https://en.wikipedia.org/wiki/AVL_tree) for this particular example.

The number in the subscript is the height of a node (its distance from its deepest descendent leaf). The tree uses the height detail to balance itself. Essentially, balancing in the tree is achieved by making sure that for each node, the heights of its child nodes do not differ by more than one. If they do, the tree performs rotations to lower this difference. The animation shows some typical rotations as the tree balances itself. If you look closely, you might notice that some insertions end up requiring 2 rotations for balancing the tree.

Using the input data field, you can try your own numbers to see how items are inserted into the tree. Enter your custom values (comma separated), and hit enter to restart the animation with the new data.


<div id='root'>You need Javascript to run this program</div>

<link rel='stylesheet' type='text/css' href="/css/balancedTree/app.css" />

<script src="/js/react.production.min.js"></script>
<script src="/js/react-dom.production.min.js"></script>

<script src="/js/balancedTree/app_transpiled.js"> </script>

The source code for this animation/demo can be found [here](https://gitlab.com/motleytech/mtOnPelican/-/raw/master/motleytechnet/content/js/balancedTree/app_transpiled.js). Kindly request permission before using / copying.
