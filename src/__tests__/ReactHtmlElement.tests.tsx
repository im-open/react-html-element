import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getByText, waitFor, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ReactHTMLElement from '../ReactHTMLElement';

function ReactTest(): React.ReactElement {
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

class ReactTestComponent extends ReactHTMLElement {
  connectedCallback(): void {
    ReactDOM.render(<ReactTest />, this.mountPoint);
  }
}

customElements.define('react-test', ReactTestComponent);

function getDocument(): HTMLElement {
  const testElement = document.createElement('react-test');
  document.body.appendChild(testElement);
  return (testElement.shadowRoot as unknown) as HTMLElement;
}

it('renders interactable react', async () => {
  const container = getDocument();
  getByText(container, 'Increment').click();
  await waitFor(() => {
    expect(queryByTestId(container, 'current-increment')).toHaveTextContent(
      '1',
    );
  });
});
