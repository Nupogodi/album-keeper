import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// api
import api from 'util/api';
import { API_ROUTES, SONG_GRID_VIEWS, EDIT_FORM_VIEWS } from 'util/constants';

// calculations
import { AlbumLength } from 'util/calculations';

// components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import DefaultImg from 'assets/img/default_album.jpg';
import CustomModal from 'components/CustomModal/CustomModal';
import Button from 'components/Button/Button';
import EditForm from '../../../EditForm/EditForm';
import SongGrid from '../../Songs/SongsGrid/SongsGrid';

// styles
import styles from './AlbumDetails.module.css';

const AlbumDetails = () => {
  const { id } = useRouteMatch().params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [album, setAlbum] = useState({});

  useEffect(() => {
    const getAlbumDetails = async () => {
      try {
        setIsSubmitting(true);
        const response = await api.get(`${API_ROUTES.albums.getAlbum}/${id}`);

        if (response.data) {
          setAlbum(response.data);
        } else {
          toast.error(response.data.error);
        }
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        // eslint-disable-next-line
        console.log(error);
        toast.error(error.response.error);
      }
    };

    getAlbumDetails();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSuccess = (albumObj) => {
    setAlbum(albumObj);

    toggleModal();
  };

  if (isSubmitting) return <LoadingSpinner />;

  const { album_title, artist, release_year, song_list } = album;

  const initialState = {
    albumTitle: album_title,
    description: album.description,
    releaseYear: album.release_year,
    albumId: album._id,
  };
  return (
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <EditForm
            viewType={EDIT_FORM_VIEWS.albums}
            onSuccess={handleSuccess}
            initialState={initialState}
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
              <p className={styles.textDetails}>
                {`Album • ${artist.artist_name} ${release_year}`}
              </p>
            )}
            <p className={styles.textDetails}>
              {song_list && <AlbumLength songsArr={song_list} />}
            </p>
          </div>
          <div className={styles.controls}>
            <Button onClick={toggleModal}>Edit Album</Button>
          </div>
        </div>
      </div>
      <SongGrid view={SONG_GRID_VIEWS.albumView} songList={song_list} />
    </div>
  );
};

export default AlbumDetails;
