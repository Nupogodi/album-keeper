import React, { useReducer, useEffect, useContext, createContext } from 'react';
import useRouter from 'hooks/useRouter';
import api from 'util/api';
import { API_ROUTES, ROUTES } from 'util/constants';

const initialState = {
  isAuthenticated: null,
  user: null,
};

// constants
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem('AlbumKeeperUser');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  const signin = async (username, password) => {
    try {
      const response = await api.post(API_ROUTES.auth.signIn, {
        username,
        password,
      });
      localStorage.setItem('AlbumKeeperUser', JSON.stringify(response.data));
      dispatch({
        type: LOG_IN,
        payload: response.data,
      });
      router.push(ROUTES.library.url);
      return response;
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signup = async (username, password) => {
    try {
      await api.post(API_ROUTES.auth.register, {
        username,
        password,
      });
      router.push(ROUTES.library.url);
      return await signin(username, password);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signout = () => {
    dispatch({
      type: LOG_OUT,
    });
    router.push(ROUTES.home.url);
  };

  const getCurrentUser = () =>
    JSON.parse(localStorage.getItem('AlbumKeeperUser'));

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem('AlbumKeeperUser')) || false;
    if (savedUser) {
      dispatch({
        type: LOG_IN,
        payload: savedUser,
      });
    } else {
      dispatch({
        type: LOG_OUT,
      });
    }
  }, [dispatch]);

  // Return the user object and auth methods
  return {
    state,
    getCurrentUser,
    signin,
    signup,
    signout,
  };
}
