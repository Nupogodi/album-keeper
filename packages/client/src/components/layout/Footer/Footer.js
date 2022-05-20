import React from 'react';
// Styles
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        Made with
        {' '}
        <span className={styles.red}>❤</span>
        {' '}
        by Alex Sherbin
      </p>
      <p>
        &#169;
        {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
