import type { createRoot as createRootOriginal } from 'react-dom/client';

type CreateRootFunc = typeof createRootOriginal;

//*---
// this function should never be used
// it is only here to satisfy webpack
//*---

// eslint-disable-next-line import/prefer-default-export
export const createRoot: CreateRootFunc = (
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  ...args: Parameters<CreateRootFunc>
) => ({
  render: () => {},
  unmount: () => {},
});
