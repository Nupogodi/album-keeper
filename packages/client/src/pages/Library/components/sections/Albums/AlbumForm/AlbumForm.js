import React, { useState } from 'react';
import { toast } from 'react-toastify';

//api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES } from 'util/constants';


//components
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './AlbumForm.module.css';

const AlbumForm = ({ onSuccess }) => {
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

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const body = {
      artist_name: data.artist,
      album_title: data.albumTitle,
      album_release_year: data.releaseYear,
    };

    try {
      const response = await api.post(API_ROUTES.albums.post, body);
      console.log(response);

      toast.success(response.data.msg);
      onSuccess(response.data.album);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
      console.log(error);
      toast.error(error.response.error);
    }
  };

  return (
    <div>
      <form className={styles.albumForm} onSubmit={handleSubmitAlbum}>
        <h3 className={styles.formTitle}>Add New Album</h3>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.artist && styles.hasValue}`}
            type='text'
            name='artist'
            id='artist'
            value={data.artist}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='artist'>
            Artist
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.albumTitle && styles.hasValue}`}
            type='text'
            name='albumTitle'
            id='albumTitle'
            value={data.albumTitle}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='albumTitle'>
            Album Title
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.releaseYear && styles.hasValue}`}
            type='number'
            min='1900'
            name='releaseYear'
            id='releaseYear'
            value={data.releaseYear}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='releaseYear'>
            Release Year
          </label>
        </div>
        <CustomButton className={styles.btnSubmit} btnStyle={BTN_STYLES.fillLight} btnType={BTN_TYPES.submit}>
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </CustomButton>
      </form>
    </div>
  );
};

export default AlbumForm;
