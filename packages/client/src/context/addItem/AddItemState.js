import React, { useState } from 'react';
import AddItemContext from './addItemContext';

const AddItemState = ({ children }) => {
  const [currentActiveFormPathname, setCurrentActiveFormPathname] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  return (
    <AddItemContext.Provider
      value={{
        setCurrentActiveFormPathname,
        currentActiveFormPathname,
        setFilterValue,
        filterValue,
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export default AddItemState;
