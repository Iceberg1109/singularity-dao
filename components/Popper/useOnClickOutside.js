import {useEffect} from 'react';

const useOnClickOutside = (ref, handler, options = {}) => {
  const {excluded} = options;

  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      if (Array.isArray(excluded)) {
        const isExcluded = excluded.some(r => {
          if (!r || !r.current) return;
          return r.current.contains(event.target);
        });

        if (isExcluded) return;
      }
      handler(event);
    };

    document.addEventListener('mouseup', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mouseup', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, options.excluded]);
};

export default useOnClickOutside;
