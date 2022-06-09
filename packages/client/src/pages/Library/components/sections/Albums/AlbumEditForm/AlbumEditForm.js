import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';

// constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES, BTN_COLORS } from 'util/constants';

// api
import api from 'util/api';

// components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

// styles
import styles from './AlbumEditForm.module.css';

const AlbumEditForm = ({ onSuccess, album }) => {
  const [albumTitle, setAlbumTitle] = useState(album.album_title);
  const [description, setDescription] = useState(album.description);
  const [releaseYear, setReleaseYear] = useState(album.release_year);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'albumTitle':
        return setAlbumTitle(e.target.value);
      case 'releaseYear':
        return setReleaseYear(e.target.value);
      case 'description':
        return setDescription(e.target.value);

      default:
        return null;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const body = {
        albumTitle,
        description,
        releaseYear,
      };
      const response = await api.put(
        `${API_ROUTES.albums.update}/${album._id}`,
        body
      );
      if (response.data) {
        toast.success(response.data.msg);
        onSuccess(response.data.album);
      } else {
        toast.error('Something went wrong');
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      // eslint-disable-next-line
      console.log(error);
      toast.error(error.response.error);
    }
  };

  return (
    <div>
      <form className={styles.albumForm} onSubmit={handleFormSubmit}>
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>{album.album_title}</h3>
        </div>
        <div className={styles.formBody}>
          <Input
            type='text'
            name='albumTitle'
            id='albumTitle'
            inputValue={albumTitle}
            onChange={handleInputChange}
            labelValue='Title'
            htmlFor='albumTitle'
          />

          <Input
            min='1900'
            type='number'
            name='releaseYear'
            id='releaseYear'
            inputValue={releaseYear}
            onChange={handleInputChange}
            labelValue='Release Year'
            htmlFor='releaseYear'
          />

          <Input
            type='text'
            name='description'
            id='description'
            inputValue={description}
            onChange={handleInputChange}
            labelValue='Description'
            htmlFor='description'
          />
        </div>
        <div className={styles.formFooter}>
          <Button
            btnType={BTN_TYPES.button}
            btnStyle={BTN_STYLES.outlineDark}
            btnColor={BTN_COLORS.dark}
            onClick={onSuccess}
          >
            Cancel
          </Button>
          <Button
            btnType={BTN_TYPES.button}
            btnStyle={BTN_STYLES.fillLight}
            btnColor={BTN_COLORS.dark}
            className={styles.mx10}
            onClick={handleFormSubmit}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(AlbumEditForm);
