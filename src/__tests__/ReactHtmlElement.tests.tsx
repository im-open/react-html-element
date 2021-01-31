import React, { useState, useEffect } from 'react';
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
        onClick={(): void => setIncrement((prevIncrement) => prevIncrement + 1)}
      >
        Increment
      </button>
      <div data-testid="current-increment">{increment}</div>
    </>
  );
}

class ReactTestComponent extends ReactHTMLElement {
  public onUnmount = (): void => undefined;

  connectedCallback(): void {
    this.render(<ReactTest onUnmount={this.onUnmount} />);
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
  getByText(container, 'Increment').click();
  await waitFor(() => {
    expect(queryByTestId(container, 'current-increment')).toHaveTextContent(
      '1'
    );
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
