import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

//constants
import { API_ROUTES, LIBRARY_ROUTES, SORT_TYPES } from 'util/constants';

//api
import api from 'util/api';

//components
import ViewControls from '../../ViewControls/ViewControls';
import Album from '../Album/Album';
import AlbumForm from '../AlbumForm/AlbumForm';
import AlbumDetails from '../AlbumDetails/AlbumDetails';
import CustomModal from 'components/CustomModal/CustomModal';
import LoadingSpinner from 'components/LoadingSpinner/index';
import DefaultImg from 'assets/img/default_album.jpg';

// styles
import styles from './AlbumsGrid.module.css';
//global
import 'index.css';

const AlbumGrid = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortedAlbums, setSortedAlbums] = useState([]);
  const [sortType, setSortType] = useState(SORT_TYPES.artist);
  const [errorMessage, setErrorMessage] = useState(null);
  const { path } = useRouteMatch();

  useEffect(() => {
    const getAlbums = async () => {
      setIsSubmitting(true);
      try {
        const response = await api.get(API_ROUTES.albums.getAlbums);
        if (response.data) {
          setAlbums(response.data);
        } else {
          toast.error(response.data.error);
        }
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
        toast.error(error.response.error);
      }
    };

    getAlbums();
  }, []);

  useEffect(() => {
    const sortedList = [...albums].sort((a, b) => {
      if (sortType === SORT_TYPES.artist) {
        return b.artist.artist_name - a.artist.artist_name;
      } else {
        return b[sortType] - a[sortType];
      }
    });
    setSortedAlbums(sortedList);
  }, [albums, sortType]);

  const handleSuccess = (album) => {
    setAlbums([...albums, album]);

    toggleModal();
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className='container'>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <AlbumForm onSuccess={handleSuccess} />
        </CustomModal>
      )}

      <ViewControls action={toggleModal} setSorted={setSortType} />
      <div className={styles.grid}>
        {sortedAlbums.length > 0 ? (
          sortedAlbums.map((album) => {
            return (
              <Album
                albumCover={DefaultImg}
                key={album._id}
                albumId={album._id}
                albumTitle={album.album_title}
                albumYear={album.release_year}
                artist={album.artist.artist_name}
              />
            );
          })
        ) : (
          <button type='button' onClick={toggleModal} className={styles.btn}>
            Add New Album <AiOutlinePlusCircle className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlbumGrid;
