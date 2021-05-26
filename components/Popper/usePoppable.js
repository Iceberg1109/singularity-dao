import {usePopper} from 'react-popper';
import {useState} from 'react';
import useOnClickOutside from './useOnClickOutside.js';

const usePoppable = ({
  reference,
  popper,
  options = {
    placement: 'bottom-end'
  }
}) => {
  const [visible, setVisible] = useState(false);

  const {styles, attributes} = usePopper(
    reference.current,
    popper.current,
    options
  );

  useOnClickOutside(popper, () => setVisible(false), {excluded: [reference]});

  const togglePopper = () => {
    setVisible(visible => !visible);
  };

  return {
    popperVisible: visible,
    setVisiblePopper: setVisible,
    togglePopper,
    styles,
    attributes
  };
};

export default usePoppable;
