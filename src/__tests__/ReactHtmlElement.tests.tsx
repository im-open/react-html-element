import React, { useState, useEffect } from 'react';
import {
  findByText,
  waitFor,
  queryByTestId,
  findByTestId,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ReactHTMLElement from '../ReactHTMLElement';

function ReactTest({ onUnmount = (): void => undefined }): React.ReactElement {
  const [increment, setIncrement] = useState(0);
  useEffect(() => (): void => onUnmount(), []);
  return (
    <div data-testid="container">
      <button
        id="iterate-button"
        type="button"
        onClick={(): void => setIncrement((prevIncrement) => prevIncrement + 1)}
      >
        Increment
      </button>
      <div data-testid="current-increment">{increment}</div>
    </div>
  );
}

class ReactTestComponent extends ReactHTMLElement {
  public onUnmount = (): void => undefined;

  connectedCallback(): void {
    this.render(<ReactTest onUnmount={this.onUnmount} />);
  }
}

customElements.define('react-test', ReactTestComponent);

async function getDocument(
  onUnmount = (): void => undefined
): Promise<HTMLElement> {
  const testElement = document.createElement(
    'react-test'
  ) as ReactTestComponent;
  testElement.onUnmount = onUnmount;
  document.body.appendChild(testElement);
  await waitFor(() => expect(testElement.shadowRoot).toBeTruthy());
  return findByTestId(
    (testElement.shadowRoot as unknown) as HTMLElement,
    'container'
  );
}

it('renders interactable react', async () => {
  const container = await getDocument();
  (await findByText(container, 'Increment')).click();
  await waitFor(() => {
    expect(queryByTestId(container, 'current-increment')).toHaveTextContent(
      '1'
    );
  });
});

it('unmounts when it is removed', async () => {
  let unmounted = false;
  await getDocument(() => {
    unmounted = true;
  });
  const testElement = document.querySelector('react-test');
  testElement?.remove();
  await waitFor(() => expect(unmounted).toBeTruthy());
});

afterEach(() => {
  document.body.innerHTML = '';
});
