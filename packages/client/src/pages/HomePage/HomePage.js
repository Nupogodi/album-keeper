import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { backEndApi } from 'util/api';
import { useRequest } from 'hooks/useRequest';
import LoadingSpinner from 'components/LoadingSpinner';
import { FaCodeBranch } from 'react-icons/fa';

export default function HomePage(props) {
  return (
    <main>
      <h1>Welcome to my app!</h1>
      <button className='btn'>
        <Link to=''>Sign Up</Link>
      </button>
      {/* { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>} */}
      {/* { isLoading &&  <LoadingSpinner></LoadingSpinner>} */}
      {/* { !error && response && (
        // <div>Username: {response.username}</div>
      )} */}
    </main>
  );
}
