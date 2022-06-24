import React, { useState, memo, useMemo } from 'react';

// Constants

// Components
import Button from 'components/Button/Button';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// styles
import styles from './AuthForm.module.css';

const AuthForm = ({ onSuccess = () => {} }) => {
  const TAB_CONFIG = {
    signin: 'signin',
    signup: 'signup',
  };

  const [currentTab, setCurrentTab] = useState(TAB_CONFIG.signin);

  const CurrentTabComponent = useMemo(() => {
    const TAB_COMPONENTS_CONFIG = {
      [TAB_CONFIG.signin]: SignIn,
      [TAB_CONFIG.signup]: SignUp,
    };

    return TAB_COMPONENTS_CONFIG[currentTab];
  }, [currentTab]);

  return (
    <div className={styles.frame}>
      <div className={styles.formNav}>
        <ul className={styles.tabs}>
          <li
            className={`${styles.tab} ${
              currentTab === 'signup' && styles.active
            } large`}
          >
            <Button isWrapper onClick={() => setCurrentTab(TAB_CONFIG.signup)}>
              Sign Up
            </Button>
          </li>
          <li
            className={`${styles.tab} ${
              currentTab === 'signin' && styles.active
            } large`}
          >
            <Button isWrapper onClick={() => setCurrentTab(TAB_CONFIG.signin)}>
              Sign In
            </Button>
          </li>
        </ul>
      </div>
      <CurrentTabComponent onSuccess={onSuccess} />
    </div>
  );
};

export default memo(AuthForm);
