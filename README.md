# react-html-element

[![Build Status](https://travis-ci.com/WTW-IM/react-html-element.svg?branch=master)](https://travis-ci.com/github/WTW-IM/react-html-element)
[![npm version](https://badge.fury.io/js/react-html-element.svg)](https://badge.fury.io/js/react-html-element)

## NOTE:

This package works with React at version 17. For version 16, [see the react-16
branch of this repo](https://github.com/WTW-IM/react-html-element/tree/react-16).

## What is it?

`react-html-element` gives a few quality of life improvements over using React
in Web Components [as described in the React documentation](https://reactjs.org/docs/web-components.html).
Read on to find out what you can get by using it!

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
        onClick={(): void => setIncrement((prevIncrement) => prevIncrement + 1)}
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
    this.render(<Incrementer />);
  }
}

customElements.define('incrementer', ReactTestComponent);
```

The key pieces of code are `... extends ReactHTMLElement` and `this.render`,
which mounts our app to its designated `mountPoint`, [as described below](#thismountpoint-and-using-custom-templates).

> ### Polyfills
>
> One thing to remember is that you will need to load [the webcomponentsjs polyfills](https://www.webcomponents.org/polyfills) for `ReactHTMLElement` to work in all browsers.
>
> ```html
> <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
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
    <h1>Behold: An Incrementer</h1>
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
    this.render(<Incrementer />);
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

```jsx
class ReactWebComponent extends ReactHTMLElement {
  connectedCallback() {
    this.render(
      <StyleSheetManager target={this.shadow}>
        <App />
      </StyleSheetManager>
    );
  }
}
```

`this.shadow` is a getter that will initialize your Web Component, attaching a Shadow
Root with `{mode: 'open'}`, and setting the Shadow Root's innerHTML to your
template or `<div></div>`. If this initialization has already occurred, it will
simply return the previously created Shadow Root. `this.mountPoint` utilizes
`this.shadow` as part of its work to generate the Shadow Root.

We use `this.shadow` for the styles instead of simply using `this.mountPoint` because of unmounting. If stylesheets are a child of `this.mountPoint`, ReactDOM will throw an error when you try to unmount. (`unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.`) This error is a little cryptic, but the bottom line is that ReactDOM expects that everything inside the mounted node was generated by React itself. When we use the same node to place our styles, it breaks that expectation. Using the `this.shadow` will cause the styles to be placed as a first-child of the Shadow DOM, but not inside the same component where our app is mounted.

If you're using a [custom template](#thismountpoint-and-using-custom-templates), you may need to set the target for your `StyleSheetManager` differently. Often, simply using `this.mountPoint.parentNode` will work as expected, even with custom templates, but this will depend on your template. (You may run into competing styles or have a very unusual use-case where placing a `style` tag as a sibling of your application causes some other issue.)

# Contributing

This package uses `semantic-release`. Changes will be compiled into a changelog and the package versioned, tagged and published automatically.
Please ensure your commit messages adhere to the following structure:

```
<type>: <subject>
<BLANK LINE>
<body>
```

Only the header is mandatory. The supported types are based off of the [ESLint Convention](https://github.com/conventional-changelog/conventional-changelog/tree/35e279d40603b0969c6d622514f5c0984c5bf309/packages/conventional-changelog-eslint).
