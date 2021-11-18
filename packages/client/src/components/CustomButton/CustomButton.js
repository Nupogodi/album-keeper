import React from 'react';

// styles
import btnStyles from './CustomButton.module.css';

const CustomButton = ({
  btnType = 'button',
  text,
  btnStyle = 'outline',
  btnColor = 'light',
  action,
  className = {},
  children,
}) => (
  <button
    value={text}
    type={btnType}
    onClick={action}
    className={`${btnStyles[btnStyle]} ${btnStyles[btnColor]} ${btnStyles.btn} ${className}`}
  >
    {children}
    {' '}
    {text}
  </button>
);

export default CustomButton;
