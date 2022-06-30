import React from 'react';
import classnames from 'classnames/bind';

// styles
import btnStyles from './Button.module.css';

const cx = classnames.bind(btnStyles);

const Button = ({
  isWrapper = false,
  btnType = 'button',
  outline = false,
  transparent = false,
  fullWidth = false,
  onClick,
  children,
}) => (
  <button
    type={btnType}
    onClick={onClick}
    className={cx({
      btn: !isWrapper,
      outline: !!outline,
      fullWidth: !!fullWidth,
      transparent: !!transparent,
      isWrapper: !!isWrapper,
    })}
  >
    {children}
  </button>
);

export default Button;
