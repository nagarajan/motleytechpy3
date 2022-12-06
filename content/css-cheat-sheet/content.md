Title: CSS Cheat Sheet
Date: 2019-04-12 11:44
Category: Technotes
Tags: CSS
Authors: Nagarajan
Disqus_Identifier: css_cheat_sheet

<b>Centering using Flex</b>
<p>
Flex makes it really easy to center elements
</p>

* Horizontally centering inline element in block element

```
<div style="display: flex; justify-content: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="display: flex; justify-content: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>

<br /> <br />

* Horizontally centering multiple block level elements - use flex to center them. These will be forced into inline-block elements.

```html
<div style="display: flex; justify-content: center; gap: 10px">
    <div style="border: 1px solid red">
        Div one
    </div>
    <div style="border: 1px solid green">
        Div two
    </div>
    <div style="border: 1px solid blue">
        Div three
    </div>
</div>
```

<div style="display: flex; justify-content: center; gap: 10px">
    <div style="border: 1px solid red">
        Div one
    </div>
    <div style="border: 1px solid green">
        Div two
    </div>
    <div style="border: 1px solid blue">
        Div three
    </div>
</div>

<br /> <br />

* Vertically centering element using Flex. The parent element must have a height defined.

```
<div style="display: flex; justify-content: center; border: 1px solid red; width: 100%; flex-direction: column">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="display: flex; justify-content: center; border: 1px solid red; height: 100px; flex-direction: column">
    <span style="border: 1px solid blue">Centered element<span>
</div>

<br /> <br />

* Vertically and Horizontally centering element using Flex. Again, parent element height must be specified.

```
<div style="display: flex; justify-content: center; border: 1px solid red; height: 100px; flex-direction: column; align-items: center">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="display: flex; justify-content: center; border: 1px solid red; height: 100px; flex-direction: column; align-items: center">
    <span style="border: 1px solid blue">Centered element<span>
</div>

<br /> <br />

<b>Centering elements in CSS without flex</b>

* Inline element in block element using `text-align`

```
<div style="text-align: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="text-align: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>

<br /> <br />

* Just a block level element in another block - we will have to provide some width. The `margin: 0 auto` centers the div with the width specified (it must be smaller than 100%). The `text-align: right` centers the text within the centered div.

```
<div style="border: 1px solid red; width: 50%; margin: 0 auto; text-align: right">
    Right aligned text in the centerd div
</div>
```

<div style="border: 1px solid red; width: 50%; margin: 0 auto; text-align: right">
    Right aligned text in the centerd div
</div>

<br /> <br />
