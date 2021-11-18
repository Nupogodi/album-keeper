import React from 'react';

// styles
import styles from './Input.module.css';

const Input = ({
  type,
  name,
  id,
  onChange,
  min,
  max,
  htmlFor,
  inputClassName,
  inputValue,
  labelValue,
  step,
}) => (
  <div className={styles.formGroup}>
    <input
      className={`${styles.input} ${inputClassName} ${
        !!inputValue && styles.hasValue
      }`}
      type={type}
      value={inputValue}
      name={name}
      id={id}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
    />
    <label className={styles.label} htmlFor={htmlFor}>
      {labelValue}
    </label>
  </div>
);

export default Input;
