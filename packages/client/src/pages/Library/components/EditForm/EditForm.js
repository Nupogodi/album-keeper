import React, { useState } from 'react';
import { toast } from 'react-toastify';

//styles
import styles from './EditForm.module.css';

const EditForm = ({onSuccess}) => {
    
  const initialState = {
    modalOpen: false,
    artist: '',
    albumTitle: '',
    releaseYear: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);
  
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

    return (
        <div>
           hi 
        </div>
    )
}

export default EditForm
