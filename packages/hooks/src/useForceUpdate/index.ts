import { useCallback, useState } from 'react';

// 强制渲染组件
export default function useForceUpdate () {
  const [, setCount] = useState<number>(0);
  return useCallback(() => setCount(prevState => prevState + 1), []);
}
