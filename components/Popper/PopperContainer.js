/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui';

const PopperContainer = ({
  popperElement,
  style,
  popper,
  popperVisible,
  children,
  ...props
}) => {
  return (
    <div
      ref={popperElement}
      style={style}
      {...popper}
      sx={{
        mt: 2,
        bg: 'white',
        userSelect: 'none',
        zIndex: 10,
        opacity: popperVisible ? 1 : 0,
        visibility: popperVisible ? 'visible' : 'hidden',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 'rgba(21, 21, 31, 0.06) 0px 8px 16px 0px'
      }}
      {...props}>
      {children}
    </div>
  );
};

export default PopperContainer;
