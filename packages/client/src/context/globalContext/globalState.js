import React, { useReducer } from 'react';
import axios from 'util/api';
import { toast } from 'react-toastify';

import useRequest from '../../hooks/useRequest';
import { backEndApi } from 'util/api';
import { API_ROUTES } from 'util/constants';

import GlobalContext from './globalContext';
import GlobalReducer from './globalReducer';

import { UPDATE_LIBRARY, LOAD_LIBRARY, SET_LOADING } from '../types';

const GlobalState = (props) => {
  const initialState = {
    albums: [],
    artists: [],
    songs: [],
    username: '',
    userId: '', 
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const loadLibrary = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('AlbumKeeperUser'));
      if (!user) {
      }

      const uid = user.uid;

      const response = await axios.get(API_ROUTES.loadLibrary);

      console.log(response);

      // grab uid and fetch user data
      // dispatch get_library
      dispatch({ type: LOAD_LIBRARY, payload: response.data });
    } catch (error) {
      toast.error('OOOPS');
      console.log(error);
    }
    // check if the user is logged in
  };

  //* Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GlobalContext.Provider
      value={{
        username: state.username,
        userId: state.userId,
        artists: state.artists,
        albums: state.albums,
        songs: state.songs,
        loadLibrary,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
