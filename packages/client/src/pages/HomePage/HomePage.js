import React, { useState } from 'react';

//constants
import { BTN_TYPES, BTN_STYLES } from 'util/constants';

//hooks
import { useAuth } from 'hooks/useAuth';

//components
import CustomButton from 'components/CustomButton/CustomButton';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import Register from 'components/Register/Register';
import SignIn from 'components/SignIn/SignIn';

//styles
import styles from './HomePage.module.css';

const HomePage = (props) => {
  const {
    state: { isAuthenticated, user },
  } = useAuth();

  console.log(user);

  const [currentTab, setCurrentTab] = useState('signup');
  return (
    <main className={` ${styles['main-bg']} page-fixer`}>
      <div className={`container ${styles.pageWrap}`}>
        {!isAuthenticated ? (
          <div className={styles['grid']}>
            <section className={styles.gridItem}>
              <div className={styles.heroContent}>
                <h2 className={styles.heading}>Album Keeper</h2>
                <p className={styles.subtitle}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Placeat deserunt totam fugiat nobis tempore sunt sequi
                  expedita quas, consectetur blanditiis!
                </p>
              </div>
            </section>
            <section className={`${styles.gridItem} ${styles.sectionRight}`}>
              <div className={styles.tabs}>
                <ButtonWrapper
                  className={styles.tab}
                  action={() => setCurrentTab('signin')}
                >
                  Sign In
                </ButtonWrapper>
                <ButtonWrapper
                  className={styles.tab}
                  action={() => setCurrentTab('signup')}
                >
                  Sign Up
                </ButtonWrapper>
              </div>
              {currentTab === 'signin' ? <SignIn /> : <Register />}
            </section>
          </div>
        ) : (
          <section className={styles.welcomeBack}>
            <h3 className={styles.heading}>Welcome Back, {user.username}!</h3>
          </section>
        )}
      </div>
    </main>
  );
};

export default HomePage;
