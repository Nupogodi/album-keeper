import React from 'react';

// styles
import styles from './Container.module.css';

const Container = ({ className, children }) => (
  <div className={`${className} ${styles.container}`}>{children}</div>
);

export default Container;
