import React, {useEffect} from 'react';

//styles
import styles from './Input.module.css';

const Input = ({type, name, id, onChange, min, max, htmlFor, inputClassName, inputValue, labelValue, step}) => {

  useEffect(() => {
    console.log('change')
  }, [ inputValue])


  return (
    <div className={styles.formGroup}>
      <input className={`${styles.input} ${inputClassName} ${styles.hasValue && inputValue}`} type={type} value={inputValue} name={name} id={id} onChange={onChange} value={inputValue} min={min} max={max} step={step}  />
      <label className={styles.label} htmlFor={htmlFor}>{labelValue}</label> 
      
    </div>
  );
};

export default Input;
