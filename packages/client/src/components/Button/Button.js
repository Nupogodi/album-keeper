import React from 'react';

// styles
import btnStyles from './Button.module.css';

const Button = ({
  btnType = 'button',
  text,
  btnStyle,
  btnColor = 'light',
  outline = false,
  fullWidth = false,
  float = false,
  margin = false,
  onClick,
  className = {},
  children,
}) => (
  <button
    value={text}
    type={btnType}
    onClick={onClick}
    className={`${btnStyles[btnStyle]} ${btnStyles[btnColor]} ${
      btnStyles.btn
    } ${className} ${outline && btnStyles.outline} ${
      fullWidth && btnStyles.fullWidth
    } ${float && btnStyles[float]} ${margin && btnStyles[margin]}`}
  >
    {children} {text}
  </button>
);

export default Button;
