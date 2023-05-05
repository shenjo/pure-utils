import { useEffect, useState } from 'react';

export default function useCssReactiveRule (count: number, gap: number, reactive: boolean) {
  const [style, setStyle] = useState(calcStyle(count, gap));
  useEffect(() => {
    if (reactive) {
      const handler = (ev: MediaQueryListEvent) => setStyle(calcStyle(ev.matches ? count + 1 : count, gap));
      const matches = window.matchMedia('(min-width:1770px)');
      matches.addEventListener('change', handler);
      setStyle(calcStyle(matches.matches ? count + 1 : count, gap));
      return () => matches.removeEventListener('change', handler);
    }
  }, [count, gap]);
  return style;
}

function calcStyle (count: number, gap: number) {
  const containerStyle = { gap: `${gap}px` };
  const itemStyle = { width: `calc((100% - ${(count - 1) * gap}px)/${count})` };
  return { containerStyle, itemStyle };
}
