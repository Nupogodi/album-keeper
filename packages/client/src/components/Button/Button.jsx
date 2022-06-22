import React from 'react';
import classnames from 'classnames/bind';

// Styles
import btnStyles from './Button.module.css';

const cx = classnames.bind(btnStyles);

const Button = ({
  isWrapper = false,
  btnType = 'button',
  outline = false,
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
      isWrapper: !!isWrapper,
    })}
  >
    {children}
  </button>
);

export default Button;
