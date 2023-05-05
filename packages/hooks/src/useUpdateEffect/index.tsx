import { DependencyList, useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';

export default function useUpdateEffect (effect: EffectCallback, deps: DependencyList) {
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
  }, deps);

}
