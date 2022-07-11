import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// constants
import {
  API_ROUTES,
  ADD_ITEM_PATHNAME_TYPES,
  EDIT_FORM_VIEWS,
} from 'util/constants';

// api
import api from 'util/api';

// context
import AddItemContext from 'context/addItem/addItemContext';

// components
// import ArtistForm from '../ArtistForm/ArtistForm';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import CustomModal from 'components/CustomModal/CustomModal';

// dependecies
import Fuse from 'fuse.js';
import EditForm from '../../../EditForm/EditForm';
import Artist from '../Artist/Artist';

// styles
import styles from './ArtistsGrid.module.css';

const ArtistsGrid = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { path } = useRouteMatch();
  const addItemContext = useContext(AddItemContext);
  const {
    setCurrentActiveFormPathname,
    currentActiveFormPathname,
    filterValue,
  } = addItemContext;

  // Initial state for the EditForm component
  const initialState = {
    // artistTitle,
    // bandMembers,
    // newBandMember: '',
    // description,
    // isSubmitting: false,
    // errorMessage: null,
    // artistId,
  };

  useEffect(() => {
    const getArtists = async () => {
      setIsSubmitting(true);
      try {
        const response = await api.get(API_ROUTES.artists.getArtists);
        if (response.data) {
          setArtists(response.data);
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

    getArtists();
  }, []);

  const toggleModal = () => {
    setCurrentActiveFormPathname(null);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (currentActiveFormPathname === ADD_ITEM_PATHNAME_TYPES.artists) {
      toggleModal();
    }
  }, [currentActiveFormPathname]);

  useEffect(() => {
    setFilteredArtists(artists);

    if (
      path === ADD_ITEM_PATHNAME_TYPES.artists &&
      !isSubmitting &&
      filterValue !== ''
    ) {
      const options = {
        keys: ['artist_name'],
      };

      const fuse = new Fuse(artists, options);
      const result = fuse.search(filterValue);

      setFilteredArtists(result.map((artist) => artist.item));
    }
  }, [filterValue, artists]);

  const handleSuccess = (artist) => {
    setArtists([...artists, artist]);

    toggleModal();
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    // <div>
    //   {modalOpen && (
    //     <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
    //       <ArtistForm onSuccess={handleSuccess} />
    //     </CustomModal>
    //   )}
    //   <div className={styles.artistsGrid}>
    //     {filteredArtists?.length > 0
    //       ? filteredArtists.map((artist) => (
    //           <Artist
    //             key={artist._id}
    //             artistId={artist._id}
    //             artistName={artist.artist_name}
    //             image={artist.artist_image}
    //             songList={artist.song_list}
    //           />
    //         ))
    //       : 'No artists'}
    //   </div>
    // </div>
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <EditForm
            onSuccess={handleSuccess}
            viewType={EDIT_FORM_VIEWS.artists}
            initialState={initialState}
            utilityFunctions
          />
        </CustomModal>
      )}
      <div className={styles.artistsGrid}>
        {filteredArtists?.length > 0
          ? filteredArtists.map((artist) => (
              <Artist
                key={artist._id}
                artistId={artist._id}
                artistName={artist.artist_name}
                image={artist.artist_image}
                songList={artist.song_list}
              />
            ))
          : 'No artists'}
      </div>
    </div>
  );
};

export default ArtistsGrid;
