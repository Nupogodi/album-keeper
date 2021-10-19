import React, { useContext, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// auth and rerouting
import useRouter from 'hooks/useRouter';
import { useProvideAuth } from 'hooks/useAuth';
import { setAuthToken } from 'util/api';

//styles
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
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      const res = await auth.signup(
        data.username,
        data.password,
      );
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
    <div className='container'>
      <form onSubmit={handleSignup} className={styles.registerForm}>
        <h2 className={styles.title}>Register</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <input
            className={styles.input}
            value={data.username}
            type='text'
            name='username'
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-light'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
