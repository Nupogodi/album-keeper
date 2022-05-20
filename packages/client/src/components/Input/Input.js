import React from 'react';

// styles
import styles from './Input.module.css';

const Input = ({
  type,
  name,
  id,
  onChange,
  inputValue,
  labelValue,
  disabled,
  htmlFor,
}) => (
  <div className={styles.formGroup}>
    <label className={`${styles.label} smaller`} htmlFor={htmlFor}>
      {labelValue}
    </label>
    <input
      type={type}
      disabled={disabled}
      className={styles.input}
      value={inputValue}
      name={name}
      id={id}
      onChange={onChange}
    />
  </div>
);

export default Input;
