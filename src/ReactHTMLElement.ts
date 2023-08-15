import type ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';
import { getCreateRoot } from './react-dom-client';

type Renderable = Parameters<ReactDOM.Renderer>[0][number];
type ReactHTMLElementDOMRoot = Pick<Root, 'render' | 'unmount'>;

const awaitValue = <T>(awaiter: () => T): Promise<T> => new Promise((resolve) => {
    const result = awaiter();
    if (result) {
      resolve(result);
    } else {
      setTimeout(() => resolve(awaitValue(awaiter)), 100);
    }
  });

class ReactHTMLElement extends HTMLElement {
  private _initialized?: boolean;

  private _mountPoint?: Element;

  private _root?: ReactHTMLElementDOMRoot;

  private _awaitingRoot = false;

  private _app: Renderable | undefined;

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

  async root(): Promise<ReactHTMLElementDOMRoot> {
    if (this._awaitingRoot) {
      await awaitValue(() => this._root);
    }
    if (this._root) return this._root;

    this._awaitingRoot = true;
    this._root = (await getCreateRoot())(this.mountPoint);
    this._awaitingRoot = false;
    return this._root;
  }

  render(app: Renderable): void {
    if (!this.isConnected) return;

    void this.renderRoot(app);
  }

  async renderRoot(app: Renderable): Promise<void> {
    this._app = app; // this value may change while we wait for root...
    const root = await this.root();
    root.render(this._app); // always render current app
  }

  disconnectedCallback(): void {
    if (!this._mountPoint) return;

    // setTimeout to avoid synchronous unmount
    setTimeout(() => this._root?.unmount(), 0);
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
  }
}

export default ReactHTMLElement;
