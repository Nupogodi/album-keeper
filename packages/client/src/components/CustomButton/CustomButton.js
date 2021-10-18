import React from 'react';

//constants
import { BTN_TYPES, BTN_STYLES } from 'util/constants';

//styles
import btnStyles from './CustomButton.module.css';

const CustomButton = ({
  btnType = 'button',
  text,
  btnStyle,
  action,
  className = {},
  children,
}) => {
  return (
    <button
      value={text}
      type={btnType}
      onClick={action}
      className={`${btnStyles[btnStyle]} ${btnStyles.btn} ${className}`}
    >
      {children} {text}
    </button>
  );
};

export default CustomButton;
