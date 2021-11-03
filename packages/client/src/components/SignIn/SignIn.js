import React, { useState } from 'react';
import { toast } from 'react-toastify';

//hooks
import { useProvideAuth } from 'hooks/useAuth';
import useRouter from 'hooks/useRouter';
import { setAuthToken } from 'util/api';

//constants
import {BTN_TYPES, BTN_STYLES} from 'util/constants';

//components
import CustomButton from 'components/CustomButton/CustomButton';


//styles
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

      toast.success(`Welcome back, ${response.data.username}!`)
    } catch (error) {
      console.log(error.response);
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
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            value={data.username}
            type='text'
            name='username'
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            value={data.password}
            type='password'
            name='password'
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
        </div>
        <CustomButton action={handleSignin} btnType={BTN_TYPES.submit} btnStyle={BTN_STYLES.outlineLight} className={styles.btnSubmit}>
          Submit
        </CustomButton>
      </form>
  );
};

export default SignIn;
