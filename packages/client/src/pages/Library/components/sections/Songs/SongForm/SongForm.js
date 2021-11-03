import React, { useState } from 'react';
import { toast } from 'react-toastify';

//api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES } from 'util/constants';
import { calculateSeconds } from 'util/calculations';

//components
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './SongForm.module.css';

const SongForm = ({ onSuccess }) => {
  const initialState = {
    modalOpen: false,
    songTitle: '',
    songDurationMinutes: '',
    songDurationSeconds: '',
    artistTitle: '',
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
      songTitle: data.songTitle,
      songDuration: calculateSeconds(data.songDurationMinutes, data.songDurationSeconds),
      artistName: data.artistTitle,
      albumTitle: data.albumTitle,
      albumReleaseYear: data.releaseYear,
    };

    try {
      const response = await api.post(API_ROUTES.songs.post, body);

      toast.success(response.data.msg);
      onSuccess(response.data.song);
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
        <h3 className={styles.formTitle}>New Song</h3>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.songTitle && styles.hasValue}`}
            type='text'
            name='songTitle'
            id='songTitle'
            value={data.songTitle}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='songTitle'>
            Title
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            step='1'
            min='0'
            className={`${styles.input} ${
              data.songDurationMinutes && styles.hasValue
            }`}
            type='number'
            name='songDurationMinutes'
            id='songDurationMinutes'
            value={data.songDurationMinutes}
            onChange={handleInputChange}
            required
          />
          <label className={styles.label} htmlFor='songDurationMinutes'>
            Minutes
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            step='1'
            min='0'
            className={`${styles.input} ${
              data.songDurationSeconds && styles.hasValue
            }`}
            type='number'
            name='songDurationSeconds'
            id='songDurationSeconds'
            value={data.songDurationSeconds}
            onChange={handleInputChange}
            required
          />
          <label className={styles.label} htmlFor='songDurationSeconds'>
            Seconds
          </label>
        </div>

        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.artistTitle && styles.hasValue}`}
            type='text'
            name='artistTitle'
            id='artistTitle'
            value={data.artistTitle}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='artistTitle'>
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
            Album
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
            Album Release Year
          </label>
        </div>
        <CustomButton
          className={styles.btnSubmit}
          btnStyle={BTN_STYLES.fillLight}
          btnType={BTN_TYPES.submit}
        >
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </CustomButton>
      </form>
    </div>
  );
};

export default SongForm;
