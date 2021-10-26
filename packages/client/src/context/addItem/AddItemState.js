import React, { useReducer, useContext } from 'react';

import AddItemReducer from './addItemReducer';
import AddItemContext from './addItemContext';

const AddItemState = ({ children }) => {
  const initialState = {};

  const [state, dispatch] = useReducer(AddItemReducer, initialState);

  return (
    <AddItemContext.Provider value={{ state, dispatch }}>
      {children}
    </AddItemContext.Provider>
  );
};

export default AddItemState;
