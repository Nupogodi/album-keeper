import React, { useState } from 'react';

//hooks
import { useProvideAuth } from 'hooks/useAuth';
import useRouter from 'hooks/useRouter';
import { setAuthToken } from 'util/api';

import { toast } from 'react-toastify';

//styles
import styles from './SignIn.module.css';
import 'index.css';

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
    <div className='container'>
      <form onSubmit={handleSignin} className={styles.registerForm}>
        <h2 className={styles.title}>Sign in</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <input
            className={styles.input}
            value={data.username}
            type='text'
            name='username'
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <input
            className={styles.input}
            value={data.password}
            type='password'
            name='password'
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='btn btn-light'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
