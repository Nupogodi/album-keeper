import React, { useState } from 'react';
import { toast } from 'react-toastify';


//api
import api from 'util/api';

// constants
import { API_ROUTES } from 'util/constants';

//hooks
import useRequest from 'hooks/useRequest';

//components
import LoadingSpinner from 'components/LoadingSpinner/index';

//styles
import styles from './AlbumForm.module.css';

const AlbumForm = ({onSuccess}) => {

  const initialState = {
    modalOpen: false,
    artist: '',
    albumTitle: '',
    releaseYear: '',
    isSubmitting: false,
    errorMessage: null,
  };
  
  // const [modalOpen, setModalOpen] = useState(false);
  // const [artist, setArtist] = useState('');
  // const [albumTitle, setAlbumTitle] = useState('');
  // const [releaseYear, setReleaseYear] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

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
      console.log(response)
      
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
          <label className={styles.label} htmlFor='artist'>
            Artist
          </label>
          <input
            className={styles.input}
            type='text'
            name='artist'
            id='artist'
            value={data.artist}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='albumTitle'>
            Album Title
          </label>
          <input
            className={styles.input}
            type='text'
            name='albumTitle'
            id='albumTitle'
            value={data.albumTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='releaseYear'>
            Release Year
          </label>
          <input
            className={styles.input}
            type='number'
            min='1900'
            name='releaseYear'
            id='releaseYear'
            value={data.releaseYear}
            onChange={handleInputChange}
          />
        </div>
        <button className={styles.submitBtn} type='submit'>
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AlbumForm;
