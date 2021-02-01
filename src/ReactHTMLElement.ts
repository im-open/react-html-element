import ReactDOM from 'react-dom';

class ReactHTMLElement extends HTMLElement {
  private _initialized?: boolean;

  private _mountPoint?: Element;

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

  render(
    app: Parameters<ReactDOM.Renderer>[0][number]
  ): ReturnType<ReactDOM.Renderer> {
    // eslint-disable-next-line react/no-render-return-value
    return ReactDOM.render(app, this.mountPoint);
  }

  disconnectedCallback(): void {
    if (!this._mountPoint) return;
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
  }
}

export default ReactHTMLElement;
