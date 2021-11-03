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

//styles
import styles from './AlbumEditForm.module.css';

const GeneralTab = ({
  handleInputChange,
  handleSubmit,
  albumTitle,
  description,
  releaseYear,
  onSuccess,
  isSubmitting,
}) => {

  const handleconfirmDelete = () => {};

  return <></>;
};

// const AddSongTab = ({
//   handleInputChange,
//   handleSubmit,
//   songTitle,
//   songDurationMinutes,
//   songDurationSeconds,
//   isSubmitting,
//   onSuccess,
// }) => {
//   return (
//     <>
//       <div className={styles.formBody}>
//         <div className={styles.formGroup}>
//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor='songTitle'>
//               Song Title
//             </label>
//             <input
//               className={styles.input}
//               type='text'
//               name='songTitle'
//               id='songTitle'
//               value={songTitle}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <h4 className={styles.sectionTitle}>Song Duration</h4>
//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor='songDurationMinutes'>
//               Minutes
//             </label>
//             <input
//               step='1'
//               min='0'
//               className={styles.input}
//               type='number'
//               name='songDurationMinutes'
//               id='songDurationMinutes'
//               value={songDurationMinutes}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor='songDurationSeconds'>
//               Seconds
//             </label>
//             <input
//               step='1'
//               min='0'
//               className={styles.input}
//               type='number'
//               name='songDurationSeconds'
//               id='songDurationSeconds'
//               value={songDurationSeconds}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <CustomButton
//               btnType={BTN_TYPES.button}
//               btnStyle={BTN_STYLES.outlineDark}
//               action={handleSubmit}
//             >
//               {isSubmitting ? (
//                 <LoadingSpinner />
//               ) : (
//                 <CustomIcon text={'add'} iconType={ICON_TYPES.addSong} />
//               )}
//             </CustomButton>
//           </div>
//         </div>
//       </div>
//       <div className={styles.formFooter}>
//         <CustomButton
//           btnType={BTN_TYPES.button}
//           btnStyle={BTN_STYLES.fillDark}
//           className={styles.mx10}
//           action={onSuccess}
//         >
//           Done
//         </CustomButton>
//       </div>
//     </>
//   );
// };

const AlbumEditForm = ({ onSuccess, album }) => {
  const [albumTitle, setAlbumTitle] = useState(album.album_title);
  const [description, setDescription] = useState(album.description);
  const [releaseYear, setReleaseYear] = useState(album.release_year);
  const [songTitle, setSongTitle] = useState('');
  const [songDurationMinutes, setSongDurationMinutes] = useState('');
  const [songDurationSeconds, setSongDurationSeconds] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
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
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='albumTitle'>
              Title
            </label>
            <input
              className={styles.input}
              type='text'
              name='albumTitle'
              id='albumTitle'
              value={albumTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='releaseYear'>
              Release Year
            </label>
            <input
              className={styles.input}
              min='1900'
              type='number'
              name='releaseYear'
              id='releaseYear'
              value={releaseYear}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='description'>
              Description
            </label>
            <input
              className={styles.input}
              type='text'
              name='description'
              id='description'
              value={description}
              onChange={handleInputChange}
            />
          </div>
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
