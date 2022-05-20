import React from 'react';

// Styles
import styles from './Container.module.css';

const Container = ({ className, children }) => <div className={`${className} ${styles.container}`}>{children}</div>;

export default Container;
