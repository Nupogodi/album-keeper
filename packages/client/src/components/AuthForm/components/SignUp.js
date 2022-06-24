import React, { useState, memo } from 'react';

// Utility
import { toast } from 'react-toastify';

// Constants
import { BTN_TYPES } from 'util/constants';
// import { BTN_TYPES, BTN_COLORS, BTN_STYLES } from 'util/constants';

// Auth
import { useProvideAuth } from 'hooks/useAuth';

// Components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

// styles
import styles from '../AuthForm.module.css';

const SignUp = () => {
  const { signup } = useProvideAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await signup(username, password, confirmPassword);
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
    <form onSubmit={handleSignup} className={styles.authForm}>
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
      <Input
        type='password'
        name='confirmPassword'
        id='confirmPassword'
        labelValue='Confirm Password'
        htmlFor='confirmPassword'
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
        btnType={BTN_TYPES.submit}
        // btnStyle={BTN_STYL cv
        bold
        className={styles.submitBtn}
      >
        {isSubmitting ? <LoadingSpinner /> : 'Sign Up'}
      </Button>
    </form>
  );
};

export default memo(SignUp);
