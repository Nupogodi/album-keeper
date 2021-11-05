import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

//constants
import {
  API_ROUTES,
  ADD_ITEM_PATHNAME_TYPES,
  ICON_TYPES,
  BTN_TYPES,
  BTN_STYLES,
} from 'util/constants';

//api
import api from 'util/api';

//context
import AddItemContext from 'context/addItem/addItemContext';

//components
import Album from '../Album/Album';
import AlbumForm from '../AlbumForm/AlbumForm';
import CustomModal from 'components/CustomModal/CustomModal';
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import CustomButton from 'components/CustomButton/CustomButton';

import DefaultImg from 'assets/img/default_album.jpg';

//dependecies
import Fuse from 'fuse.js'

// styles
import styles from './AlbumsGrid.module.css';
//global
import 'index.css';

const AlbumGrid = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const { path } = useRouteMatch();
  const addItemContext = useContext(AddItemContext);
  const { setCurrentActiveFormPathname, currentActiveFormPathname, filterValue } =
    addItemContext;
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

  

  // write useEffect to listen to global state value and set modal open when needed
  useEffect(() => {
    if (currentActiveFormPathname === ADD_ITEM_PATHNAME_TYPES.albums) {
      console.log('useEffect hit');
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

     setFilteredAlbums(
       result.map((album) => {
         return album.item;
       })
     );
   }
 }, [filterValue, albums]);

  const handleSuccess = (album) => {
    setAlbums([...albums, album]);

    toggleModal();
  };

  const toggleModal = () => {
    setCurrentActiveFormPathname(null);
    setModalOpen(!modalOpen);
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
          filteredAlbums.map((album) => {
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
          <CustomButton btnStyle={BTN_STYLES.fillDark} btnType={BTN_TYPES.button} action={toggleModal} >
            Add New Album <CustomIcon iconType={ICON_TYPES.plus}  className={styles.icon} />
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default AlbumGrid;
