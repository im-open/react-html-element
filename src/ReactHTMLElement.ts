import ReactDOM from 'react-dom';

interface LooseShadowRoot extends ShadowRoot {
  [key: string]: any;
}

// See https://github.com/facebook/react/issues/9242#issuecomment-543117675
function retargetReactEvents(container: Node, shadow: LooseShadowRoot) {
  Object.defineProperty(container, 'ownerDocument', { value: shadow });
  shadow.createElement = (tagName: string, options?: ElementCreationOptions) =>
    document.createElement(tagName, options);
  shadow.createElementNS = (
    ns: string,
    tagName: string,
    options: ElementCreationOptions
  ) => document.createElementNS(ns, tagName, options);
  shadow.createTextNode = (text: string) => document.createTextNode(text);
}

class ReactHTMLElement extends HTMLElement {
  private _mountPoint?: Element;
  private template: string;
  private mountSelector: string;

  get mountPoint(): Element {
    if (this._mountPoint) return this._mountPoint;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template;
    this._mountPoint = shadow.querySelector(this.mountSelector) as Element;

    retargetReactEvents(this._mountPoint, shadow);

    return this._mountPoint;
  }

  set mountPoint(mount: Element) {
    this._mountPoint = mount;
    if (this.shadowRoot) {
      retargetReactEvents(mount, this.shadowRoot);
    }
  }

  disconnectedCallback() {
    if (!this._mountPoint) return;
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
  }
}

export default ReactHTMLElement;
