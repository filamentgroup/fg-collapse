---
---

<script>this.customElements||document.write('<script src="./lib/document-register-element.js" defer><\x2fscript>');</script>
<script src="../src/fg-collapse.js" type="module"></script>
<script src="./es5/fg-collapse.js" defer nomodule></script>
<link rel="stylesheet" href="../src/fg-collapse.css">




# Demo

<fg-collapse collapsed>
  <button>Show/Hide Content</button>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>



## About

This collapsible component is built to be easy to use, dependency-free (aside from feature polyfills), and accessible. It can be opened and closed programatically or via clicking the component's button. It is tested for optimal accessibility for assistive technology. 



## Documentation

To make a collapse, create a `fg-collapse` element to contain your content. This element will be recognized by this component's javascript, and allow it to be enhanced with necessary behaviors and accessibility information. 

Inside the collapse element, place a heading or button followed by one element that will be collapsed and expanded when that button is clicked. If you start with a button, the button will be hidden until it becomes interactive. If you start with a heading, the heading will always be visible and the script will append a button to the heading.


Starting with a button, state expanded:

<fg-collapse >
  <button>Show/Hide Content</button>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>

```html
<fg-collapse>
  <button>Show/Hide Content</button>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>
```

Starting with a button, collapsed to start:

<fg-collapse collapsed>
  <button>Show/Hide Content</button>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>

```html
<fg-collapse collapsed>
  <button>Show/Hide Content</button>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>
```

Starting with a heading:

<fg-collapse collapsed>
  <h2>This is a heading</h2>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>

```html
<fg-collapse collapsed>
  <h2>This is a heading</h2>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>
```

Starting with a heading with customized button text:

<fg-collapse toggletext="Toggle content">
  <h2>This is a heading</h2>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>

```html
<fg-collapse toggletext="Toggle content">
  <h2>This is a heading</h2>
  <p>This is the collapsible content. Currently, it's a <code>p</code> element, but it could be anything really, like a <code>div</code> containing other <code>p</code>'s for example.</p>
</fg-collapse>
```





## Including Scripts &amp; Styles

The collapse has two dependencies, one for the Javascript and one for the CSS, which you can find in the `src` directory:

```html
<script type="module" src="src/fg-collapse.js"></script>
<script src="demo/es5/fg-collapse.js" defer nomodule></script>
<link rel="stylesheet" href="src/fg-collapse.css">
```

Note: to support IE11, we have used Babel to create [a module-free version of the collapse](demo/es5/fg-collapse.js) in the `demo` directory, which is listed above using the module/nomodule pattern to only delivery to non-module browsers. 


## Methods and Events

The collapse has several methods you can call on it. You can find these methods on the element itself. 

- `expand`: Expand the collapse: `document.getElementById("myCollapsible").expand();`
- `collapse`: Collapse the collapse: `document.getElementById("myCollapsible").collapse();`

The collapse has several events. 
- `Init` event: When the collapse is first created, it receives an `init` event. 
- `expand` event: Runs when the expand method is called
- `Close` event: Runs when the collapse method is called

## Polyfills

To use the collapse in modern browsers, two polyfills are likely necessary (please check browser support to see how these align with your needs). 

- Custom Elements: The `fg-collapse` element uses the standard HTML custom elements feature, which are well supported but need a polyfill in IE11 and older. This project references WebReflection's [Document Register Element](https://github.com/WebReflection/document-register-element) polyfill which can be found at [demo/lib/document-register-element.js](demo/lib/document-register-element.js). It should be loaded prior to the accessible collapse script. In our demo page we use the following pattern to load it, but you could package it with <script>this.customElements||document.write('<script src=".demo/lib/document-register-element.js"><\x2fscript>');</script>
```

