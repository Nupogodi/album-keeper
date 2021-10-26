import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//api
import api from 'util/api';
import {
  API_ROUTES,
  SONG_GRID_VIEWS,
  BTN_STYLES,
  BTN_TYPES,
} from 'util/constants';

//calculations
import { AlbumLength, secondsToTimestamp } from 'util/calculations';

//components
import ViewControls from '../../../LibraryNav/ViewControls/ViewControls';
import LoadingSpinner from 'components/LoadingSpinner/index';
import SongGrid from '../../Songs/SongsGrid/SongsGrid';
import AlbumEditForm from '../AlbumEditForm/AlbumEditForm';
import DefaultImg from 'assets/img/default_album.jpg';
import CustomModal from 'components/CustomModal/CustomModal';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './AlbumDetails.module.css';

//global styles
import 'index.css';

const AlbumDetails = (props) => {
  const { id } = useRouteMatch().params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [album, setAlbum] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getAlbumDetails = async () => {
      try {
        setIsSubmitting(true);
        const response = await api.get(`${API_ROUTES.albums.getAlbum}/${id}`);

        if (response.data) {
          setAlbum(response.data);
        } else {
          toast.error(response.data.error);
          console.log(response);
        }
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
        toast.error(error.response.error);
      }
    };

    getAlbumDetails();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
  }

  if (isSubmitting) return <LoadingSpinner />;

  const { album_title, description, artist, release_year, song_list } = album;
  return (
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <AlbumEditForm
            onSuccess={toggleModal}
            album={album}
          />
        </CustomModal>
      )}
      <div className={styles.detailsHeader}>
        <div className={styles.imgWrapper}>
          <img src={DefaultImg} alt='default album cover' />
        </div>
        <div className={styles.detailsBox}>
          <h3 className={styles.albumTitle}>{album_title}</h3>
            <p className={styles.textDetails}>{album.description}</p>
          <div className={styles.albumDetails}>
            {artist && (
              <p
                className={styles.textDetails}
              >{`Album • ${artist.artist_name} ${release_year}`}</p>
            )}
            <p className={styles.textDetails}>
              {song_list && <AlbumLength songsArr={song_list} />}
            </p>
          </div>
          <div className={styles.controls}>
            <CustomButton
              btnType={BTN_TYPES.button}
              btnStyle={BTN_STYLES.outlineDark}
              action={toggleModal}
              text='Edit Album'
            ></CustomButton>
          </div>
        </div>
      </div>
      <SongGrid view={SONG_GRID_VIEWS.albumView} songList={song_list} />
    </div>
  );
};

export default AlbumDetails;
