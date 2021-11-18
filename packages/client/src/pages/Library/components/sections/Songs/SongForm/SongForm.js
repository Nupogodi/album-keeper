import React, { useState } from 'react';
import { toast } from 'react-toastify';

// api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES, BTN_COLORS } from 'util/constants';
import { calculateSeconds } from 'util/calculations';

// components
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomButton from 'components/CustomButton/CustomButton';
import Input from 'components/Input/Input';

// styles
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
      songDuration: calculateSeconds(
        data.songDurationMinutes,
        data.songDurationSeconds,
      ),
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
        <Input
          inputClassName={data.songTitle && styles.hasValue}
          type="text"
          name="songTitle"
          id="songTitle"
          inputValue={data.songTitle}
          onChange={handleInputChange}
          labelValue="Title"
          htmlFor="songTitle"
        />

        <Input
          step="1"
          min="0"
          inputClassName={data.songDurationMinutes && styles.hasValue}
          type="number"
          name="songDurationMinutes"
          id="songDurationMinutes"
          inputValue={data.songDurationMinutes}
          onChange={handleInputChange}
          labelValue="Minutes"
          htmlFor="songDurationMinutes"
        />

        <Input
          step="1"
          min="0"
          inputClassName={data.songDurationSeconds && styles.hasValue}
          type="number"
          name="songDurationSeconds"
          id="songDurationSeconds"
          inputValue={data.songDurationSeconds}
          onChange={handleInputChange}
          labelValue="Seconds"
          htmlFor="songDurationSeconds"
        />

        <Input
          inputClassName={data.artistTitle && styles.hasValue}
          type="text"
          name="artistTitle"
          id="artistTitle"
          inputValue={data.artistTitle}
          onChange={handleInputChange}
          labelValue="Artist"
          htmlFor="artistTitle"
        />

        <Input
          inputClassName={data.albumTitle && styles.hasValue}
          type="text"
          name="albumTitle"
          id="albumTitle"
          inputValue={data.albumTitle}
          onChange={handleInputChange}
          labelValue="Album"
          htmlFor="albumTitle"
        />

        <Input
          inputClassName={data.releaseYear && styles.hasValue}
          type="number"
          min="1900"
          name="releaseYear"
          id="releaseYear"
          inputValue={data.releaseYear}
          onChange={handleInputChange}
          labelValue="Album Release Year"
          htmlFor="releaseYear"
        />

        <CustomButton
          className={styles.btnSubmit}
          btnStyle={BTN_STYLES.fillLight}
          btnType={BTN_TYPES.submit}
          btnColor={BTN_COLORS.dark}
        >
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </CustomButton>
      </form>
    </div>
  );
};

export default SongForm;
