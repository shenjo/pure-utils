import useEvent from '../useEvent';
import useToggle from '../useToggle';

export default function useSingleClick (handler: any, options?: any) {
  const [disabled, { setTrue, setFalse }] = useToggle(false);
  const wrapperHandler = useEvent(() => {
    if (disabled) {
      return;
    }
    setTrue();
    try {
      const result = handler();
      if (result instanceof Promise) {
        result.then((res) => {
          setFalse();
          return res;
        });
      } else {
        setFalse();
      }
    } catch (e) {

    }
  });

  return { handler: wrapperHandler };
}
