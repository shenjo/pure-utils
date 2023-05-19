import getUUid from '../uuid';

const listenerMap: Map<string, Map<string, Function>> = new Map();

const eventListener = {
  add (name: string, fn: Function): () => void {
    if (!listenerMap.has(name)) {
      listenerMap.set(name, new Map());
    }
    const indicator: string = getUUid();
    listenerMap.get(name)!.set(indicator, fn);
    return () => {
      this.remove(name, indicator);
    };
  },
  remove (name: string, indicator?: string) {
    if (listenerMap.has(name)) {
      if (indicator && listenerMap.get(name)!.has(indicator)) {
        listenerMap.get(name)!.delete(indicator);
      } else {
        listenerMap.delete(name);
      }
    }
  },
  emit (name: string, ...data: any) {
    if (listenerMap.has(name)) {
      listenerMap.get(name)!.forEach((value, key) => {
        try {
          value(...data);
        } catch (err) {
          //
        }
      });
    }
  }
};
export default eventListener;
