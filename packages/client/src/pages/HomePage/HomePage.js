import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { backEndApi } from 'util/api';
import { useRequest } from 'hooks/useRequest';
import LoadingSpinner from 'components/LoadingSpinner';
import { FaCodeBranch } from 'react-icons/fa';


//constants
import {BTN_TYPES, BTN_STYLES} from 'util/constants'

//components
import HeroImage from 'assets/img/hero-image-1.jpg';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './HomePage.module.css';

const HomePage = (props) => {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heading}>Album Keeper</h2>
          <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat deserunt totam fugiat nobis tempore sunt sequi expedita quas, consectetur blanditiis!</p>
          <CustomButton action={()=>console.log('sign up')} btnType={BTN_TYPES.button} btnStyle={BTN_STYLES.fill}>Sign Up</CustomButton>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
