// Code came from https://github.com/spring-media/react-shadow-dom-retarget-events/blob/516dafb756d8e3daaadaf9f8b48f85c6811e93e7/index.js
/* eslint-disable no-param-reassign */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const reactEvents = [
  'onMouseDown',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
];

function findReactProperty(item: any, propertyPrefix: string): any {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in item) {
    // eslint-disable-next-line no-prototype-builtins
    if (item.hasOwnProperty(key) && key.includes(propertyPrefix)) {
      return item[key];
    }
  }
  return null;
}

function findReactEventHandlers(item: any): any {
  return findReactProperty(item, '__reactEventHandlers');
}

function findReactComponent(item: any): any {
  return findReactProperty(item, '_reactInternal');
}

function findReactProps(component: any): any {
  if (!component) return undefined;
  if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber
  if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15
  return null;
}

function dispatchEvent(
  event: any,
  eventType: string,
  componentProps: any,
): any {
  event.persist = function() {
    event.isPersistent = function() {
      return true;
    };
  };

  if (componentProps[eventType]) {
    componentProps[eventType](event);
  }
}

function composedPath(el: HTMLElement | null): any {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
  return [el];
}

export default function retargetEvents(shadowRoot: Node): () => void {
  const removeEventListeners: (() => void)[] = [];

  reactEvents.forEach((reactEventName) => {
    const nativeEventName = reactEventName.replace(/^on/, '').toLowerCase();

    function retargetEventListener(event: Event | any): void {
      const path = event.path
        || (event.composedPath && event.composedPath())
        || composedPath(event.target);

      for (let i = 0; i < path.length; i += 1) {
        const el = path[i];
        let props = null;
        const reactComponent = findReactComponent(el);
        const eventHandlers = findReactEventHandlers(el);

        if (!eventHandlers) {
          props = findReactProps(reactComponent);
        } else {
          props = eventHandlers;
        }

        if (reactComponent && props) {
          dispatchEvent(event, reactEventName, props);
        }

        if (event.cancelBubble) {
          break;
        }

        if (el === shadowRoot) {
          break;
        }
      }
    }

    shadowRoot.addEventListener(nativeEventName, retargetEventListener, false);
    removeEventListeners.push(() => shadowRoot.removeEventListener(
        nativeEventName,
        retargetEventListener,
        false,
      ));
  });

  return () => {
    removeEventListeners.forEach((removeEventListener) => {
      removeEventListener();
    });
  };
}
