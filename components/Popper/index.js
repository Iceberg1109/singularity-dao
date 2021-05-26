/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import {useRef} from 'react';
import usePoppable from './usePoppable.js';
import PopperContainer from './PopperContainer.js';

const Popper = ({children, Content}) => {
  const referenceElement = useRef();
  const popperElement = useRef();

  const {styles, attributes, popperVisible, togglePopper} = usePoppable({
    reference: referenceElement,
    popper: popperElement,
    options: {
      placement: 'bottom-end'
    }
  });

  return (
    <>
      <div onClick={togglePopper} ref={referenceElement}>
        {children}
      </div>
      <PopperContainer
        popperVisible={popperVisible}
        popperElement={popperElement}
        style={styles.popper}
        popper={attributes.popper}>
        <Content />
      </PopperContainer>
    </>
  );
};

export default Popper;
