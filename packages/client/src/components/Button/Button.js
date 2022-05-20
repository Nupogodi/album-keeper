import React from 'react';

// styles
import btnStyles from './Button.module.css';

const Button = ({
  btnType = 'button',
  text,
  btnStyle = 'outline',
  btnColor = 'light',
  onClick,
  className = {},
  children,
}) => (
  <button
    value={text}
    type={btnType}
    onClick={onClick}
    className={`${btnStyles[btnStyle]} ${btnStyles[btnColor]} ${btnStyles.btn} ${className}`}
  >
    {children}
    {' '}
    {text}
  </button>
);

export default Button;
