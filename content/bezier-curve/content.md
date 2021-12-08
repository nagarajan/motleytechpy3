Title: Bezier curve playground
Date: 2020-04-16 12:59
Category: Blog
Tags: Javascript, CSS, Bezier curves
Authors: Nagarajan
Disqus_Identifier: bezierPlayground
Status: draft

Bezier curves are one of the *cooler* things in the web browser. Now, there are a huge number of descriptions, explanations and animations of bezier curves on the internet. So why make one more webpage related to them?


I didn't find many places where I could play around with bezier curves with multiple points, and make some silly curves. I could do it with an app like illustrator or inkscape, but I was looking on a browser based solution.

Then I thought that I could make one myself - specially given the svg support for cubic bezier curves.
Bezier curves are some of the *coolest* and seemingly complicate things in the web frontend. I say *seemingly* because once you see a couple of animations showing the math behind it visually at work, it starts making a lot more sense.




<div class='bezierContainer'>
    <div class="playground">
        <svg class='thecurve'>
            <path stroke-width="2px" stroke='#555' fill='transparent'></path>
        </svg>
        <svg class='thepoints'>
        </svg>
        <svg class='cpoints1'>
        </svg>
        <svg class='cpoints2'>
        </svg>
        <svg class='clines1'>
        </svg>
        <svg class='clines2'>
        </svg>
    </div>
    <div class="svgcode">
        <p>SVG Path for the curve</p>
        <div>
            <input readonly />
        </div>
    </div>
</div>

<link rel="stylesheet" href="/css/bezier/app.css">
<script src='/js/bezier/bezier.js'></script>

