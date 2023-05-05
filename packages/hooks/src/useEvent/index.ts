import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';

export default function useEvent (cb: any) {
  const ref = useRef<any>(cb);

  ref.current = useMemo(() => cb, [cb]);

  return useCallback((...args: any) => ref.current(...args), []);
}
