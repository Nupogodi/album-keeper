import React, { useState, memo } from 'react';

// Auth
import { setAuthToken } from 'util/api';
import { useProvideAuth } from 'hooks/useAuth';

// Utility
import { toast } from 'react-toastify';

// Constants
import { BTN_TYPES } from 'util/constants';
// import { BTN_TYPES, BTN_COLORS, BTN_STYLES } from 'util/constants';

// Components
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import styles from '../AuthForm.module.css';

const SignIn = () => {
  const { signin } = useProvideAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await signin(username, password);

      setAuthToken(response.token);
      toast.success(response.data.msg);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      if (error.response || error.message) {
        toast.error(error.response.data.error || error.message);
      } else {
        toast.error('Something went wrong.');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSignin} className={styles.authForm}>
      <Input
        type='text'
        name='username'
        id='username'
        labelValue='Username'
        htmlFor='username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type='password'
        name='password'
        id='password'
        labelValue='Password'
        htmlFor='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        btnType={BTN_TYPES.submit}
        // btnStyle={BTN_STYLES.outlineDark}
        // btnColor={BTN_COLORS.light}
        bold
        className={styles.submitBtn}
      >
        {isSubmitting ? <LoadingSpinner /> : 'Sign In'}
      </Button>
      {/* <Button
        btnType={BTN_TYPES.submit}
        btnStyle={BTN_STYLES.fillDark}
        btnColor={BTN_COLORS.light}
        bold
        className={styles.submitBtn}
      >
        {isSubmitting ? <LoadingSpinner /> : 'Fill'}
      </Button> */}
    </form>
  );
};

export default memo(SignIn);
