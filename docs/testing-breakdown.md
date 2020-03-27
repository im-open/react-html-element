# Testing ReactHTMLElement

The `ReactHTMLElement` ensures that, when a React app is used as the content of a Web Component, it retains its functionality. The "normal" connection of a Web Component using the built-in `HTMLElement` does not allow React apps to work as expected. We want to test that utilizing the `ReactHTMLElement` does, indeed, allow a React app to retain its functionality.

Here is the test in full. (If you want to, or if it's more comfortable, you can skip this section and come back to it again after we've gone through the individual pieces to see it all together):

```typescript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getByText, waitFor, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ReactHTMLElement from '../ReactHTMLElement';

function ReactTest({ onUnmount = (): void => undefined }): React.ReactElement {
  const [increment, setIncrement] = useState(0);
  useEffect(() => (): void => onUnmount());
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

class ReactTestComponent extends ReactHTMLElement {
  connectedCallback(): void {
    ReactDOM.render(<ReactTest />, this.mountPoint);
  }
}

customElements.define('react-test', ReactTestComponent);

function getDocument(onUnmount = (): void => undefined): HTMLElement {
  const testElement = document.createElement(
    'react-test'
  ) as ReactTestComponent;
  testElement.onUnmount = onUnmount;
  document.body.appendChild(testElement);
  return (testElement.shadowRoot as unknown) as HTMLElement;
}

it('renders interactable react', async () => {
  const container = getDocument();
  getByText(container, 'Iterate').click();
  await waitFor(() => {
    expect(queryByTestId(container, 'iteration')).toHaveTextContent('1');
  });
});

it('unmounts when it is removed', async () => {
  let unmounted = false;
  getDocument(() => {
    unmounted = true;
  });
  const testElement = document.querySelector('react-test');
  testElement?.remove();
  await waitFor(() => expect(unmounted).toBeTruthy());
});

afterEach(() => {
  document.body.innerHTML = '';
});
j;
```

Let's talk about the actual tests first:

## The 'renders interactable react' Test

```typescript
it('renders interactable react', async () => {
  const container = getDocument();
  getByText(container, 'Iterate').click();
  await waitFor(() => {
    expect(queryByTestId(container, 'iteration')).toHaveTextContent('1');
  });
});
```

This is the test that checks the actual behavior of `ReactHTMLElement` and the [`<react-test>`](#reacttestcomponent-web-component-setup) element.

```typescript
it('renders interactable react', async () => {
  // ...
});
```

This section defines the name of the test, and should be read like a sentence. "it" refers to the `ReactHTMLElement`, since that's the target of our test. So the sentence would read "It renders interactable react."

```typescript
	const container = getDocument();
```

This line uses the `getDocument` function ([we talk about that later](#the-getdocument-function)) to render the `<react-test>` element to the DOM, and get its `shadowRoot` as our target `container` for this test.

```typescript
	getByText(container, 'Iterate').click();
```

This line uses the `getByText` helper function to search within our container to find an element that has the text "Iterate." We search for the element by its text and not by another method like using an HTML lookup because a user with eyeballs would look for the text to know how to interact with the page, and would not look for an abstract code structure. We're trying to imitate a real user in our tests, rather than a "computer user" that knows how to traverse the page inside the browser.

Once we've found the element with the correct text, we click it.

```typescript
	await waitFor(() => {
  	expect(queryByTestId(container, 'iteration')).toHaveTextContent('1');
	});
```

After we click the element, we wait for the element that houses the current value of our iteration to update. In this case, we use a `data-testid` attribute to search on because our target element has no other distinguishing features besides the content itself, which is dynamic. If we were searching by content (`getByText(container, '1')`), and for some reason this element did not update or updated to the wrong value (like '0' or '2'), our `waitFor` would never find the correct thing. We're using the `data-testid` attribute so that we always quickly find the correct element, and can quickly test against its content.

Once we find the correct element, we check that it has the correct value ('1'). If the content of the element never updates to the correct value, our test will fail.

## The 'unmounts when it is removed' Test

```typescript
it('unmounts when it is removed', async () => {
  let unmounted = false;
  getDocument(() => {
    unmounted = true;
  });
  const testElement = document.querySelector('react-test');
  testElement?.remove();
  await waitFor(() => expect(unmounted).toBeTruthy());
});
```

Since Web Components are supposed to be self-isolated and ignorant of the rest of the page around them, it's possible that the DOM could remove our Web Component external to our controlled code. If our Web Component gets removed, we want to be sure that React unmounts the app so we don't get memory leaks or see other issues.

```typescript
	let unmounted = false;
```

We'll use this `unmounted` variable to determine if the [`ReactTest` React app](#reacttest-react-app-setup)  has been unmounted when the Web Component gets removed from the DOM. It is set to `false` initially.

```typescript
  getDocument(() => {
    unmounted = true;
  });
```

We call the [getDocument function](#the-getdocument-function) to render our Web Component, and we pass it a function that will set our local variable `unmounted` to true when the React app has been unmounted.

```typescript
  const testElement = document.querySelector('react-test');
  testElement?.remove();
```

In order to cause the unmount to occur, we find our [`<react-test>`](#reacttestcomponent-web-component-setup) element on the page, and remove it.

```typescript
	await waitFor(() => expect(unmounted).toBeTruthy());
```

Once the element has been romeved, we expect our `unmounted` variable to switch to `true`, indicating that the `ReactTest` app has effectively been unmounted. If this variable never changes from `false`, it indicates that the unmount is not happening properly, and our test will fail.

---

Now we'll talk about the other pieces around the tests.

_*NOTE*: The rest of the sections get a little more technical, but don't worry! We've already talked about the most important piece! The rest will just help you understand how it all comes together._

## Imports

```typescript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getByText, waitFor, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ReactHTMLElement from '../ReactHTMLElement';
```

The large majority of these are dependencies in order for the rest of it to work. The last line (`import ReactHTMLElement from '../ReactHTMLElement';`) imports the actual code we want to test.

## `ReactTest` React App Setup

```typescript
function ReactTest({ onUnmount = (): void => undefined }): React.ReactElement {
  const [increment, setIncrement] = useState(0);
  useEffect(() => (): void => onUnmount());
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

This React app generates a `button` that can be clicked to increment a number, and a `div` that displays the current value of that number.

## `ReactTestComponent` Web Component Setup

```typescript
class ReactTestComponent extends ReactHTMLElement {
  connectedCallback(): void {
    ReactDOM.render(<ReactTest />, this.mountPoint);
  }
}

customElements.define('react-test', ReactTestComponent);
```

This section utilizes the above [`ReactTest` React app](#reacttest-react-app-setup) and the `ReactHTMLElement` class as the content of a new [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) that the browser will recognize as `<react-test>`.

## The `getDocument` Function

```typescript
function getDocument(onUnmount = (): void => undefined): HTMLElement {
  const testElement = document.createElement(
    'react-test'
  ) as ReactTestComponent;
  testElement.onUnmount = onUnmount;
  document.body.appendChild(testElement);
  return (testElement.shadowRoot as unknown) as HTMLElement;
}
```

This function creates a [`<react-test>`](#reacttestcomponent-web-component-setup) element, and adds it to the DOM. It then returns the `shadowRoot`as an `HTMLElement` that we can refer to [in our tests as a container](#the-renders-interactable-react-test).

And that's everything! From here, if you'd like, you can [check out the full test again](#testing-reacthtmlelement) where it's all put together.
