import React from 'react';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'inherit',
  color: '#fff',
  border: 'none',
  appearance: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
};

const ButtonWrapper = ({
  action,
  className = '',
  type = 'button',
  children,
}) => {
  return (
    <button type={type} className={className} style={styles} onClick={action}>
      {children}
    </button>
  );
};

export default ButtonWrapper;
