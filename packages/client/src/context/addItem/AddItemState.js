import React, { useState } from 'react';
import AddItemContext from './addItemContext';

const AddItemState = ({ children }) => {
  const [currentActiveFormPathname, setCurrentActiveFormPathname] =
    useState(null);

  return (
    <AddItemContext.Provider
      value={{
        setCurrentActiveFormPathname,
        currentActiveFormPathname,
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export default AddItemState;
