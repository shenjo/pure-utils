import { useState } from 'react';
import useEvent from '../useEvent';

interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

// function useToggle (): [boolean, Actions];

function useToggle (defaultValue?:boolean): [boolean, Actions] {
  const [visible, setVisible] = useState<boolean>(!!defaultValue);

  const toggle = useEvent(() => {
    setVisible(prevState => !prevState);
  });

  const setTrue = useEvent(() => {
    setVisible(true);
  });

  const setFalse = useEvent(() => {
    setVisible(false);
  });

  return [visible, { toggle, setTrue, setFalse }];
}

export default useToggle;
