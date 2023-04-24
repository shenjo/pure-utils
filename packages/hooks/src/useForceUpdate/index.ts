import { useCallback, useState } from 'react';

export default function useForceUpdate () {
  const [, setCount] = useState<number>(0);
  return useCallback(() => setCount(prevState => prevState + 1), []);
}
