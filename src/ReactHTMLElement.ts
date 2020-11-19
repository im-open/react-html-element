import ReactDOM from 'react-dom';
import forceRetarget from './forcedRetargeting';

interface LooseShadowRoot extends ShadowRoot {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// See https://github.com/facebook/react/issues/9242#issuecomment-543117675
function retargetReactEvents(
  container: Node,
  shadow: LooseShadowRoot,
): () => void {
  Object.defineProperty(container, 'ownerDocument', { value: shadow });
  /* eslint-disable no-param-reassign */
  shadow.defaultView = window;
  shadow.createElement = (
    tagName: string,
    options?: ElementCreationOptions,
  ): HTMLElement => document.createElement(tagName, options);
  shadow.createElementNS = (
    ns: string,
    tagName: string,
    options: ElementCreationOptions,
  ): Element => document.createElementNS(ns, tagName, options);
  shadow.createTextNode = (text: string): Text => document.createTextNode(text);
  return forceRetarget(shadow);
  /* eslint-enable no-param-reassign */
}

class ReactHTMLElement extends HTMLElement {
  private _mountPoint?: Element;

  private template: string;

  private mountSelector: string;

  private retargetCleanupFunction: () => void;

  get mountPoint(): Element {
    if (this._mountPoint) return this._mountPoint;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template;
    this._mountPoint = shadow.querySelector(this.mountSelector) as Element;

    this.retargetCleanup = retargetReactEvents(this._mountPoint, shadow);

    return this._mountPoint;
  }

  set mountPoint(mount: Element) {
    this._mountPoint = mount;
    if (this.shadowRoot) {
      this.retargetCleanup = retargetReactEvents(mount, this.shadowRoot);
    }
  }

  get retargetCleanup(): () => void {
    return this.retargetCleanupFunction;
  }

  set retargetCleanup(cleanupFunction: () => void) {
    // Ensure that we cleanup an old listeners before we forget the cleanup function.
    this.retargetCleanup();
    this.retargetCleanupFunction = cleanupFunction;
  }

  disconnectedCallback(): void {
    if (!this._mountPoint) return;
    this.retargetCleanup();
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  constructor(template = '<div></div>', mountSelector = 'div') {
    super();
    this.template = template;
    this.mountSelector = mountSelector;
    this.retargetCleanupFunction = () => {};
  }
}

export default ReactHTMLElement;
