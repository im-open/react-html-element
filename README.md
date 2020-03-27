# react-html-element

[![Build Status](https://travis-ci.org/WTW-IM/react-html-element.svg?branch=master)](https://travis-ci.org/github/WTW-IM/react-html-element)

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

This will allow us to utilize our Web Component as an element in any HTML:

```html
<html>
  <head>
    <title>Incrementer Example</title>
    <script src="./path/to/incrementer.js"></script>
  </head>
  <body>
    <h1>
      Behold: An Incrementer
    </h1>
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
