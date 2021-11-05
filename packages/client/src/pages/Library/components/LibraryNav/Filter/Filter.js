import React, { useState, useEffect, useContext } from 'react';

import { BsSearch } from 'react-icons/bs';

//components

//context
import AddItemContext from 'context/addItem/addItemContext';

//styles
import styles from './Filter.module.css';

const Filter = ({ showItem }) => {
  const initialState = {
    searchInput: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);
  const addItemContext = useContext(AddItemContext);

  useEffect(() => {
    addItemContext.setFilterValue(data.searchInput);

  }, [data.searchInput])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.filter}>
      <div className='formGroup'>
        <input
          className={`input ${data.searchInput && 'hasValue'}`}
          value={data.searchInput}
          onChange={handleChange}
          type='text'
          name='searchInput'
          id='searchInput'
        />
        <label className='label' htmlFor='searchInput'>
          Search
        </label>
      </div>
    </div>
  );
};

export default Filter;
