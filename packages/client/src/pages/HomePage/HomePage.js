import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { backEndApi } from 'util/api';
import { useRequest } from 'hooks/useRequest';
import LoadingSpinner from 'components/LoadingSpinner';
import { FaCodeBranch } from 'react-icons/fa';

//constants
import { BTN_TYPES, BTN_STYLES } from 'util/constants';

//components
import HeroImage from 'assets/img/hero-image-1.jpg';
import CustomButton from 'components/CustomButton/CustomButton';
import ButtonWrapper from 'components/wrappers/ButtonWrapper';
import Register from 'components/Register/Register';
import SignIn from 'components/SignIn/SignIn';

//styles
import styles from './HomePage.module.css';

const HomePage = (props) => {
  const [currentTab, setCurrentTab] = useState();
  return (
    <main className={` ${styles['main-bg']} page-fixer`}>
      <div className={`container ${styles.pageWrap}`}>
        <div className={styles['grid']}>
          <section className={styles.gridItem}>
            <div className={styles.heroContent}>
              <h2 className={styles.heading}>Album Keeper</h2>
              <p className={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat deserunt totam fugiat nobis tempore sunt sequi expedita
                quas, consectetur blanditiis!
              </p>
              <CustomButton
                action={() => console.log('sign up')}
                btnType={BTN_TYPES.button}
                btnStyle={BTN_STYLES.fill}
              >
                Sign Up
              </CustomButton>
            </div>
          </section>
          <section className={styles.gridItem}>
            <div className={styles.tabs}>
              <ButtonWrapper>Sign In</ButtonWrapper>
              <ButtonWrapper>Sign Up</ButtonWrapper>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
