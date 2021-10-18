import React, { useReducer, useEffect, useContext, createContext } from 'react';
import useRouter from 'hooks/useRouter';
import api from 'util/api';
import { API_ROUTES } from 'util/constants';
import { LOG_IN, LOG_OUT } from 'context/types';

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOG_OUT:
      localStorage.clear();
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
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  const signin = async (username, password) => {
    try {
      const response = await api.post(API_ROUTES.auth.signIn, {
        username: username,
        password: password,
      });
      localStorage.setItem('AlbumKeeperUser', JSON.stringify(response.data));
      dispatch({
        type: 'LOGIN',
        payload: response.data,
      });
      return response;
    } catch (error) {
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
        username: username,
        password: password,
      });
      return await signin(username, password);
    } catch (error) {
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
      type: 'LOGOUT',
    });
    router.push('/');
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('AlbumKeeperUser'));
  };

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem('AlbumKeeperUser')) || false;
    if (savedUser) {
      dispatch({
        type: 'LOGIN',
        payload: savedUser,
      });
    } else {
      dispatch({
        type: 'LOGOUT',
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
