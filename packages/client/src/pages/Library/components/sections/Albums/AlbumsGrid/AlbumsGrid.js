import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// constants
import {
  API_ROUTES,
  ADD_ITEM_PATHNAME_TYPES,
  ICON_TYPES,
  BTN_TYPES,
  BTN_STYLES,
} from 'util/constants';

// api
import api from 'util/api';

// context
import AddItemContext from 'context/addItem/addItemContext';

// components
import CustomModal from 'components/CustomModal/CustomModal';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';

import DefaultImg from 'assets/img/default_album.jpg';

// dependecies
import Fuse from 'fuse.js';
import AlbumForm from '../AlbumForm/AlbumForm';
import Album from '../Album/Album';

// styles
import styles from './AlbumsGrid.module.css';

const AlbumGrid = () => {
  const [albums, setAlbums] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const { path } = useRouteMatch();
  const addItemContext = useContext(AddItemContext);
  const {
    setCurrentActiveFormPathname,
    currentActiveFormPathname,
    filterValue,
  } = addItemContext;

  const toggleModal = () => {
    setCurrentActiveFormPathname(null);
    setModalOpen(!modalOpen);
  };

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
        // eslint-disable-next-line
        console.log(error);
        toast.error(error.response.error);
      }
    };

    getAlbums();
  }, []);

  useEffect(() => {
    if (currentActiveFormPathname === ADD_ITEM_PATHNAME_TYPES.albums) {
      toggleModal();
    }
  }, [currentActiveFormPathname]);

  useEffect(() => {
    setFilteredAlbums(albums);

    if (
      path === ADD_ITEM_PATHNAME_TYPES.albums &&
      !isSubmitting &&
      filterValue !== ''
    ) {
      const options = {
        keys: ['album_title'],
      };

      const fuse = new Fuse(albums, options);
      const result = fuse.search(filterValue);

      setFilteredAlbums(result.map((album) => album.item));
    }
  }, [filterValue, albums]);

  const handleSuccess = (album) => {
    setAlbums([...albums, album]);

    toggleModal();
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <AlbumForm onSuccess={handleSuccess} />
        </CustomModal>
      )}

      <div className={styles.grid}>
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <Album
              albumCover={DefaultImg}
              key={album._id}
              albumId={album._id}
              albumTitle={album.album_title}
              albumYear={album.release_year}
              artist={album.artist.artist_name}
            />
          ))
        ) : (
          <Button
            btnStyle={BTN_STYLES.fillDark}
            btnType={BTN_TYPES.button}
            onClick={toggleModal}
          >
            Add New Album{' '}
            <Icon iconType={ICON_TYPES.plus} className={styles.icon} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlbumGrid;
