import { useSyncExternalStore } from 'use-sync-external-store/shim';

function attributeStoreFactory(
  initialState: Record<string, string | null> = {}
) {
  const attributes = initialState;
  const listeners = new Set<() => void>();

  const getAttributes = () => attributes;
  const getAttribute = (key: string) => attributes[key];
  const setAttribute = (key: string, value: string | null) => {
    attributes[key] = value;
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    getAttributes,
    getAttribute,
    setAttribute,
    subscribe,
  };
}

export const attributeStore = attributeStoreFactory();

export function useWebComponentAttribute(attribute: string) {
  return useSyncExternalStore(
    (listener: () => void) => attributeStore.subscribe(listener),
    () => attributeStore.getAttribute(attribute)
  );
}
