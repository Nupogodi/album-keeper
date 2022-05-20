import React from 'react';

// Components
import AuthForm from 'components/AuthForm/AuthForm';

//  Styles
import styles from './Auth.module.css';

const AuthPage = () => (
  <div className={styles.authPage}>
    <AuthForm />
  </div>
);

export default AuthPage;
