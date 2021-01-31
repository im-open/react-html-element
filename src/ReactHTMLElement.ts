import ReactDOM from 'react-dom';

class ReactHTMLElement extends HTMLElement {
  private _mountPoint?: Element;

  private template: string;

  private mountSelector: string;

  get mountPoint(): Element {
    if (this._mountPoint) return this._mountPoint;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template;
    this._mountPoint = shadow.querySelector(this.mountSelector) as Element;

    return this._mountPoint;
  }

  set mountPoint(mount: Element) {
    this._mountPoint = mount;
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
