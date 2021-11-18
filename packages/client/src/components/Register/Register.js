import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// constants
import { BTN_STYLES, BTN_TYPES } from 'util/constants';

// auth and rerouting
import useRouter from 'hooks/useRouter';
import { useProvideAuth } from 'hooks/useAuth';
import { setAuthToken } from 'util/api';

// components
import CustomButton from 'components/CustomButton/CustomButton';
import Input from 'components/Input/Input';

// styles
import styles from './Register.module.css';
import 'index.css';

const Register = () => {
  const initialState = {
    username: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);
  const auth = useProvideAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      const res = await auth.signup(data.username, data.password);
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      });
      setAuthToken(res.token);
      router.push('/');
    } catch (error) {
      toast.error(error);
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.registerForm}>
      <h2 className={styles.title}>Register</h2>
      <Input
        inputClassName={data.username && styles.hasValue}
        inputValue={data.username}
        type='text'
        name='username'
        id='username'
        onChange={handleChange}
        labelValue='Username'
        htmlFor='username'
      />

      <Input
        inputClassName={data.password && styles.hasValue}
        inputValue={data.password}
        type='password'
        name='password'
        id='password'
        onChange={handleChange}
        labelValue='Password'
        htmlFor='password'
      />

      <CustomButton
        btnType={BTN_TYPES.button}
        btnStyle={BTN_STYLES.outlineLight}
        className={styles.btnSubmit}
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default Register;
