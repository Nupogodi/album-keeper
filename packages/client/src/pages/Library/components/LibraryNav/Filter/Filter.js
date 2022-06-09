import React, { useState, useEffect, useContext } from 'react';

// Components
import Input from 'components/Input/Input';

// Context
import AddItemContext from 'context/addItem/addItemContext';

// Styles
import styles from './Filter.module.css';

const Filter = () => {
  const initialState = {
    searchInput: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);
  const addItemContext = useContext(AddItemContext);

  useEffect(() => {
    addItemContext.setFilterValue(data.searchInput);
  }, [data.searchInput]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.filter}>
      <div className='formGroup'>
        <Input
          className={`input ${data.searchInput && 'hasValue'}`}
          inputValue={data.searchInput}
          onChange={handleChange}
          type='text'
          name='searchInput'
          id='searchInput'
        />
        {/* eslint-disable-next-line */}
      </div>
    </div>
  );
};

export default Filter;
