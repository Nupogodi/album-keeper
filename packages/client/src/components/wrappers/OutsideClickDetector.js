import React, {useRef} from 'react';

//hooks
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';

const OutsideClickDetector = (props) => {
  const wrapperRef = useRef(null);
   const {outsideClickAction} = props;
  useOutsideClickDetector(wrapperRef, outsideClickAction);

  return <div ref={wrapperRef}>{props.children}</div>;
};
export default OutsideClickDetector;
