import { version as reactVersion } from 'react';
import ReactDOM from 'react-dom';
import type { Root, createRoot as CreateRoot } from 'react-dom/client';

const [, major] = /^(\d+)\.\d+\.\d+$/.exec(reactVersion)!;
const reactMajor = Number(major);

const isPreEighteen = reactMajor < 18;

class ReactHTMLElement extends HTMLElement {
  private _initialized?: boolean;

  private _mountPoint?: Element;

  private _root?: Root;

  private getShadowRoot(): ShadowRoot {
    return this.shadowRoot || this.attachShadow({ mode: 'open' });
  }

  private template: string;

  private mountSelector: string;

  get shadow(): ShadowRoot {
    if (this._initialized) return this.getShadowRoot();

    const shadow = this.getShadowRoot();
    shadow.innerHTML = this.template;
    this._initialized = true;

    return shadow;
  }

  get mountPoint(): Element {
    if (this._mountPoint) return this._mountPoint;

    this._mountPoint = this.shadow.querySelector(this.mountSelector) as Element;

    return this._mountPoint;
  }

  set mountPoint(mount: Element) {
    this._mountPoint = mount;
  }

  get root(): Root {
    if (this._root) return this._root;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, global-require
    const createRoot = require('react-dom/client')
      .createRoot as typeof CreateRoot;
    this._root = createRoot(this.mountPoint);
    return this._root;
  }

  render(app: Parameters<ReactDOM.Renderer>[0][number]): void {
    if (!this.isConnected) return;

    if (isPreEighteen) {
      ReactDOM.render(app, this.mountPoint);
      return;
    }

    this.root.render(app);
  }

  disconnectedCallback(): void {
    if (!this._mountPoint) return;

    if (isPreEighteen) {
      ReactDOM.unmountComponentAtNode(this._mountPoint);
      return;
    }

    this._root?.unmount();
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
  }
}

export default ReactHTMLElement;
