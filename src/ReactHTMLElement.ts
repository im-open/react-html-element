import type ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';
import { getCreateRoot } from './react-dom-client';

type Renderable = Parameters<ReactDOM.Renderer>[0][number];
type ReactHTMLElementDOMRoot = Pick<Root, 'render' | 'unmount'>;

class ReactHTMLElement extends HTMLElement {
  private _initialized?: boolean;

  private _mountPoint?: Element;

  private _root?: ReactHTMLElementDOMRoot;

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
    if (this._root) return this._root;

    this._root = (await getCreateRoot())(this.mountPoint);
    return this._root;
  }

  render(app: Renderable): void {
    if (!this.isConnected) return;

    void this.renderRoot(app);
  }

  async renderRoot(app: Renderable): Promise<void> {
    const root = await this.root();
    root.render(app);
  }

  disconnectedCallback(): void {
    if (!this._mountPoint) return;

    this._root?.unmount();
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
  }
}

export default ReactHTMLElement;
