import React, { useState } from 'react';
import { toast } from 'react-toastify';

// hooks
import { useProvideAuth } from 'hooks/useAuth';
import useRouter from 'hooks/useRouter';
import { setAuthToken } from 'util/api';

// constants
import { BTN_TYPES, BTN_STYLES, BTN_COLORS } from 'util/constants';

// components
import CustomButton from 'components/CustomButton/CustomButton';
import Input from 'components/Input/Input';

// styles
import styles from './SignIn.module.css';

const initialState = {
  username: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
};
const SignIn = () => {
  const [data, setData] = useState({ initialState });
  const auth = useProvideAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    e.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      const response = await auth.signin(data.username, data.password);
      setAuthToken(response.token);
      router.push('/');

      toast.success(`Welcome back, ${response.data.username}!`);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
    }
  };

  return (
    <form onSubmit={handleSignin} className={styles.registerForm}>
      <h2 className={styles.title}>Sign in</h2>
      <Input
        inputClassName={styles.input}
        value={data.username}
        type='text'
        name='username'
        onChange={handleInputChange}
        labelValue='Username'
        htmlFor='username'
      />

      <Input
        inputClassName={styles.input}
        value={data.password}
        type='password'
        name='password'
        onChange={handleInputChange}
        labelValue='Password'
        htmlFor='password'
      />

      <CustomButton
        action={handleSignin}
        btnType={BTN_TYPES.submit}
        btnStyle={BTN_STYLES.outlineLight}
        btnColor={BTN_COLORS.light}
        className={styles.btnSubmit}
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default SignIn;
