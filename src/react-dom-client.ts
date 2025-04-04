import * as ReactDOM from 'react-dom';
import type { createRoot as createRootOriginal } from 'react-dom/client';

type ReactDOM18 = ReactDOMOriginal & {
  createRoot?: CreateRoot;
};

type CreateRoot = typeof createRootOriginal;
type CreateRootParams = Parameters<CreateRoot>;
type ReactDOMOriginal = typeof ReactDOM;
type RendererProps = Parameters<typeof ReactDOM['render']>;

/* eslint-disable react/no-deprecated */
const createRootFake = (container: CreateRootParams[0]) => {
  const newRoot = {
    render: (element: RendererProps[0]) => {
      ReactDOM.render(element, container);
    },
    unmount: () => {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
  return newRoot;
};
/* eslint-enable react/no-deprecated */

let checkedFor18 = false;
let MaybeReactDOM18: ReactDOM18;
// eslint-disable-next-line import/prefer-default-export
export const getCreateRoot = async () => {
  if (!checkedFor18) {
    try {
      // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
      MaybeReactDOM18 = (await require('react-dom/client')) as ReactDOM18;
    } catch {
      MaybeReactDOM18 = ReactDOM as ReactDOM18;
    }
    checkedFor18 = true;
  }
  const { createRoot = createRootFake } = MaybeReactDOM18;
  return createRoot;
};
