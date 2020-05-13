# react-html-element

[![Build Status](https://travis-ci.com/WTW-IM/react-html-element.svg?branch=master)](https://travis-ci.com/github/WTW-IM/react-html-element)
[![npm version](https://badge.fury.io/js/react-html-element.svg)](https://badge.fury.io/js/react-html-element)

## The Problem

The [React documentation around using React in Web Components](https://reactjs.org/docs/web-components.html#using-react-in-your-web-components) presents a case where you can create Web Components using React, but when explored, utilizing React in Web Components presents some significant functionality issues, as detailed in [this issue](https://github.com/facebook/react/issues/9242). Namely, complex React apps rendered in Web Components lose their functionality.

## The Solution

`react-html-element` seamlessly creates the glue needed to utilize React in your Web Components without losing functionality.

## Installation

To install, simply run:

```bash
npm install --save react-html-element
```

## Usage

Here is a simple example React App (using Typescript):

```typescript
function Incrementer(): React.ReactElement {
  const [increment, setIncrement] = useState(0);
  return (
    <>
      <button
        id="iterate-button"
        type="button"
        onClick={(): void => setIncrement(prevIncrement => prevIncrement + 1)}
      >
        Increment
      </button>
      <div data-testid="current-increment">{increment}</div>
    </>
  );
}
```

To utilize `Incrementer` as a Web Component, we'll use `react-html-element`:

```typescript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactHTMLElement from 'react-html-element';

class IncrementerComponent extends ReactHTMLElement {
  connectedCallback(): void {
    ReactDOM.render(<Incrementer />, this.mountPoint);
  }
}

customElements.define('incrementer', ReactTestComponent);
```

The key pieces of code are `... extends ReactHTMLElement` and `this.mountPoint`.

> ### Polyfills
> One thing to remember is that you will need to load [the webcomponentsjs polyfills](https://www.webcomponents.org/polyfills) for `ReactHTMLElement` to work in all browsers. Be sure to include [the ES5 adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs), as we currently transpile `ReactHTMLElement` down to ES5. The polyfills should be in the `<head>`, and should look something like this:
>
> ```html
> <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
> <script>
>   if (!window.customElements) {
>     document.write('<!--');
>   }
> </script>
> <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
> <!--- We use the closing bracket of this comment to close off the above opening comment, if it gets written -->
> ```
>
> There are many ways to implement these polyfills, and you can explore them in the [webpcomponentsjs README](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#how-to-use).

This will allow us to utilize our Web Component as an element in any HTML:

```html
<html>
  <head>
    <title>Incrementer Example</title>
    <!-- Load the polyfills -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
    <script>
      if (!window.customElements) {
        document.write('<!--');
      }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
    <!--- We use the closing bracket of this comment to close off the above opening comment, if it gets written -->
    <!-- load your web component -->
    <script src="./path/to/incrementer.js"></script>
  </head>
  <body>
    <h1>
      Behold: An Incrementer
    </h1>
    <!-- put your web component in your html -->
    <incrementer></incrementer>
  </body>
</html>
```

### this.mountPoint And Using Custom Templates

`this.mountPoint` is a getter that establishes the Shadow DOM for your Web Component and provides a DOM element to mount to. By default, this is just a `div`, but you can utilize a template and target a specific mount position within it by passing the template and a CSS selector into `ReactHTMLElement`'s constructor. Our example from above would look like this, with a custom template and mount point:

```typescript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactHTMLElement from 'react-html-element';

class IncrementerComponent extends ReactHTMLElement {
  connectedCallback(): void {
    ReactDOM.render(<Incrementer />, this.mountPoint);
  }

  constructor(): void {
    super(
      // The first parameter is your template.
      "<h2>I am the incrementer</h2><article id="react-mount"><article>",
      // The second parameter is the CSS selector for your mount point.
      "#react-mount"
    )
  }
}

customElements.define('incrementer', ReactTestComponent);
```

## Styled Components

Using styled-components with ReactHTMLElement seems tricky, but there's actually a very simple way to implement it: the [`StyleSheetManager`](https://styled-components.com/docs/api#stylesheetmanager). An app rendered with `StyleSheetManager` might look like this:

```react
class ReactWebComponent extends ReactHTMLElement {
  connectedCallback() {
    ReactDOM.render((
      <StyleSheetManager target={this.mountPoint.parentNode}>
        <App />
      </StyleSheetManager>
    ), this.mountPoint);
  }
}
```

We use `this.mountPoint.parentNode` for the styles instead of simply using `this.mountPoint` for the case of unmounting. If stylesheets are a child of `this.mountPoint`, ReactDOM will throw an error when you try to unmount. (`unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.`) This error is a little cryptic, but the bottom line is that ReactDOM expects that everything inside the mounted node was generated by React itself. When we use the same node to place our styles, it breaks that expectation. Using the `parentNode` will cause the styles to be placed within the Shadow DOM, but not inside the same component where our app is mounted.

If you're using a [custom template](#thismountpoint-and-using-custom-templates), you can find a node for your `StyleSheetManager` target by searching through the `shadowRoot` in the same way you might search through `document.body`. Often, simply using `this.mountPoint.parentNode` will still work as expected, even with custom templates.

# Contributing

This package uses `semantic-release`. Changes will be compiled into a changelog and the package versioned, tagged and published automatically.
Please ensure your commit messages adhere to the following structure:

```
<type>: <subject>
<BLANK LINE>
<body>
```

Only the header is mandatory. The supported types are based off of the [ESLint Convention](https://github.com/conventional-changelog/conventional-changelog/tree/35e279d40603b0969c6d622514f5c0984c5bf309/packages/conventional-changelog-eslint).
