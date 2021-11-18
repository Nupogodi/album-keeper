import React, { useRef } from 'react';

// hooks
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';

const OutsideClickDetector = ({ children, outsideClickAction }) => {
  const wrapperRef = useRef(null);
  useOutsideClickDetector(wrapperRef, outsideClickAction);

  return <div ref={wrapperRef}>{children}</div>;
};
export default OutsideClickDetector;
