import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//constants
import { API_ROUTES, LIBRARY_ROUTES } from 'util/constants';

//api
import api from 'util/api';

//components
import Artist from '../Artist/Artist';
import LoadingSpinner from 'components/LoadingSpinner/index';
import DefaultImg from 'assets/img/default_album.jpg';

//styles
import styles from './ArtistsGrid.module.css';
import 'index.css';

const ArtistsGrid = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { path } = useRouteMatch();

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
        console.log(error);
        toast.error(error.response.error);
      }
    };

    getArtists();
  }, []);

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.artistsGrid}>
      {artists?.length > 0
        ? artists.map((artist) => {
            return (
              <Artist
                key={artist._id}
                artistId={artist._id}
                artistName={artist.artist_name}
                image={artist.artist_image}
                songList={artist.song_list}
              />
            );
          })
        : 'No artists'}
    </div>
  );
};

export default ArtistsGrid;
