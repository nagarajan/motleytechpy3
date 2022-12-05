Title: CSS Cheat Sheet
Date: 2019-04-12 11:44
Category: Technotes
Tags: CSS
Authors: Nagarajan
Disqus_Identifier: css_cheat_sheet

<b>Centering different elements in CSS</b>

* Inline element in block element

```
<div style="text-align: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="text-align: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>

<br /> <br />
* Inline element in block element using flex

```
<div style="display: flex; justify-content: center; border: 1px solid red; width: 100%">
    <span style="border: 1px solid blue">Centered element<span>
</div>
```

<div style="display: flex; justify-content: center; border: 1px solid red; width: 100%">
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
* Multiple block level elements - use flex to center them. These will be forced into inline-block elements.

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
