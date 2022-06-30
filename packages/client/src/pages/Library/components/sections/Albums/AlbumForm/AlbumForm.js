import React, { useState } from 'react';
import { toast } from 'react-toastify';

// api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES } from 'util/constants';

// components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

// styles
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

      toast.success(response.data.msg);
      onSuccess(response.data.album);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
      // eslint-disable-next-line
      console.log(error);
      toast.error(error.response.error);
    }
  };

  return (
    <div>
      <form className={styles.albumForm} onSubmit={handleSubmitAlbum}>
        <h3 className={styles.formTitle}>Add New Album</h3>
        <Input
          inputClassName={data.artist && styles.hasValue}
          type='text'
          name='artist'
          id='artist'
          inputValue={data.artist}
          onChange={handleInputChange}
          labelValue='Artist'
          htmlFor='artist'
        />

        <Input
          inputClassName={data.albumTitle && styles.hasValue}
          type='text'
          name='albumTitle'
          id='albumTitle'
          inputValue={data.albumTitle}
          onChange={handleInputChange}
          labelValue='Album Title'
          htmlFor='albumTitle'
        />

        <Input
          inputClassName={data.releaseYear && styles.hasValue}
          type='number'
          min='1900'
          name='releaseYear'
          id='releaseYear'
          inputValue={data.releaseYear}
          onChange={handleInputChange}
          labelValue='Release Year'
          htmlFor='releaseYear'
        />
        <Button className={styles.btnSubmit} btnType={BTN_TYPES.submit}>
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default AlbumForm;
