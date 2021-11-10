import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';

//constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES, ICON_TYPES } from 'util/constants';
import { calculateSeconds } from 'util/calculations';

// api
import api from 'util/api';

//components
import LoadingSpinner from 'components/LoadingSpinner/index';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import CustomButton from 'components/CustomButton/CustomButton';
import Input from 'components/Input/Input';

//styles
import styles from './AlbumEditForm.module.css';


const AlbumEditForm = ({ onSuccess, album }) => {
  const [albumTitle, setAlbumTitle] = useState(album.album_title);
  const [description, setDescription] = useState(album.description);
  const [releaseYear, setReleaseYear] = useState(album.release_year);
  const [songTitle, setSongTitle] = useState('');
  const [songDurationMinutes, setSongDurationMinutes] = useState('');
  const [songDurationSeconds, setSongDurationSeconds] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);


  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'albumTitle':
        console.log(e.target.value);
        return setAlbumTitle(e.target.value);
      case 'releaseYear':
        return setReleaseYear(e.target.value);
      case 'description':
        return setDescription(e.target.value);
      case 'songTitle':
        return setSongTitle(e.target.value);
      case 'songDurationSeconds':
        return setSongDurationSeconds(e.target.value);
      case 'songDurationMinutes':
        return setSongDurationMinutes(e.target.value);
    }
  };

  const handleDeleteAlbum = async (e) => {
    e.preventDefault();
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        songTitle: songTitle,
        songDuration: calculateSeconds(
          songDurationMinutes,
          songDurationSeconds
        ),
        artistName: album.artist.artist_name,
        albumTitle: album.album_title,
      };

      setIsSubmitting(true);
      const response = await api.post(API_ROUTES.songs.post, body);

      if (response.data) {
        toast.success(response.data.msg);
        resetSongInputs();
        console.log(response);
      }

      if (response.data.error) {
        toast.error(response.data.error);
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast.error(error.response.error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const body = {
        albumTitle: albumTitle,
        description: description,
        releaseYear: releaseYear,
      };
      const response = await api.put(
        `${API_ROUTES.albums.update}/${album._id}`,
        body
      );
      console.log(response);
      if (response.data) {
        toast.success(response.data.msg);
        onSuccess(response.data.album);
      } else {
        toast.error('Something went wrong :(');
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);

      console.log(error);
      toast.error(error.response.error);
    }
  };

  const resetSongInputs = () => {
    setSongTitle('');
    setSongDurationMinutes('');
    setSongDurationSeconds('');
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
              labelValue={'Title'}
              htmlFor={'albumTitle'}
            />
 
            <Input
              min='1900'
              type='number'
              name='releaseYear'
              id='releaseYear'
              inputValue={releaseYear}
              onChange={handleInputChange}
              labelValue={'Release Year'}
              htmlFor={'releaseYear'}
            />
    
            <Input
              type='text'
              name='description'
              id='description'
              inputValue={description}
              onChange={handleInputChange}
              labelValue={'Description'}
              htmlFor={'description'}
            />
          <div className={styles.formGroup}>
            <CustomButton
              btnType={BTN_TYPES.button}
              btnStyle={BTN_STYLES.outlineLight}
              action={() => setConfirmDelete(true)}
            >
              Delete Album
            </CustomButton>
          </div>
        </div>
        <div className={styles.formFooter}>
          <CustomButton
            btnType={BTN_TYPES.button}
            btnStyle={BTN_STYLES.outlineDark}
            action={onSuccess}
          >
            Cancel
          </CustomButton>
          <CustomButton
            btnType={BTN_TYPES.button}
            btnStyle={BTN_STYLES.fillLight}
            className={styles.mx10}
            action={handleFormSubmit}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Save'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default memo(AlbumEditForm);
