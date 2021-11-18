import React from 'react';

// styles
import styles from './ButtonWrapper.module.css';

const ButtonWrapper = ({
  action,
  className = '',
  type = 'button',
  children,
}) => (
  <button
    type={type}
    style={styles}
    className={`${className} ${styles.defaultStyles}`}
    onClick={action}
  >
    {children}
  </button>
);

export default ButtonWrapper;
