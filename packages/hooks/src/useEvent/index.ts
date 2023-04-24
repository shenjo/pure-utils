import { useCallback, useImperativeHandle, useRef } from 'react';

export default function useEvent (cb: any) {
  const ref = useRef<any>(cb);

  useImperativeHandle(ref, () => {
    ref.current = cb;
  });

  return useCallback((...args: any) => ref.current(...args), []);
}
