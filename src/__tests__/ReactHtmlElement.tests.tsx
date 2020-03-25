import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getByText, waitFor, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ReactHTMLElement from '../ReactHTMLElement';

function ReactTest(): React.ReactElement {
  const [iteration, setIteration] = useState(0);
  return (
    <>
      <button
        id="iterate-button"
        type="button"
        onClick={(): void => setIteration((prevIteration) => prevIteration + 1)}
      >
        Iterate
      </button>
      <div data-testid="iteration">{iteration}</div>
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
  getByText(container, 'Iterate').click();
  await waitFor(() => {
    expect(queryByTestId(container, 'iteration')).toHaveTextContent('1');
  });
});
