import React, { useState, useEffect, memo } from 'react';
import { toast } from 'react-toastify';

// Api
import api from 'util/api';

// Constants
import { API_ROUTES, ICON_TYPES, BTN_TYPES } from 'util/constants';

// Components
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

// styles
import styles from './EditForm.module.css';

const EditForm = ({ onSuccess, dataObj, stateObj }) => {
  return <div>EditForm</div>;
};

export default EditForm;
