import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';

//styles
import styles from './Filter.module.css';

const Filter = () => {
  const initialState = {
    searchInput: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.filter}>
      <input
        placeholder='Search'
        className={styles.input}
        value={data.searchInput}
        onChange={handleChange}
        type='text'
        name='searchInput'
        id='searchInput'
      />
      <button type='button' className={styles.filterBtn}>
        <BsSearch className={styles.icon}></BsSearch>
      </button>
    </div>
  );
};

export default Filter;
