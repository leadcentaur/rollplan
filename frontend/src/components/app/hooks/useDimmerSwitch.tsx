import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDimmerSwitch = () => {
  const [dimMode, setDimMode] = useLocalStorage('dimmerSwitch', 'false');

  useEffect(() => {
    const className = 'false';
    const bodyClass = window.document.body.classList;

    dimMode === 'true'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [dimMode]);

  return [dimMode, setDimMode];
};

export default useDimmerSwitch;
