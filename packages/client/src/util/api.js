import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const { API_URL } = './constants';

const REQUEST_TIMEOUT = 10000;

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem('AlbumKeeperUser'));
  return savedUser ? savedUser.token : null;
};

// configure axios instance

const token = getUserToken();

if (token) {
  api.defaults.headers.common['Authorization'] = token;
}

api.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    //applying token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && error.response.data.error) {
      toast.error(error.response.data.error);
    } else if (error.response.status === 401) {
      toast.error('Unauthorized');
      console.log(error.response.data.error);
    }
    if (error.response.status === 500) {
      toast.error('500 Server Error');
    }
    return Promise.reject(error);
  }
);

export default api;
