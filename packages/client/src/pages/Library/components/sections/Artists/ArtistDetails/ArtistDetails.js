import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// api
import api from 'util/api';
import {
  API_ROUTES,
  ICON_TYPES,
  BTN_TYPES,
  SONG_GRID_VIEWS,
} from 'util/constants';

// components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import DefaultImg from 'assets/img/default_album.jpg';
import Icon from 'components/Icon/Icon';
import CustomModal from 'components/CustomModal/CustomModal';
import Button from 'components/Button/Button';
import EditForm from '../../../EditForm/EditForm';
import SongGrid from '../../Songs/SongsGrid/SongsGrid';

// styles
import styles from './ArtistDetails.module.css';

const ArtistDetails = () => {
  const { id } = useRouteMatch().params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState({});

  useEffect(() => {
    const getArtistDetails = async () => {
      try {
        setIsSubmitting(true);
        const response = await api.get(`${API_ROUTES.artists.getArtist}/${id}`);

        if (response.data) {
          setArtist(response.data);
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

    getArtistDetails();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (isSubmitting) return <LoadingSpinner />;

  return (
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <EditForm
            // artistTitle={artist.artist_name}
            // artistId={artist._id}
            // description={artist.artist_description}
            // bandMembers={artist.band_members}
            utilityFunctions
            onSuccess={toggleModal}
          />
        </CustomModal>
      )}
      <div className={styles.artistDetails}>
        <div className={styles.imgWrapper}>
          <img
            src={
              artist.profile_image === undefined
                ? DefaultImg
                : artist.profile_image
            }
            alt='Artist Cover'
          />
        </div>
        <div className={styles.detailsGroup}>
          <h4 className={styles.title}>{artist.artist_name}</h4>
          {artist.description && <p>{artist.description}</p>}
          {artist.band_members !== undefined &&
          artist.band_members.length > 0 ? (
            <div className={styles.bandMembers}>
              <h5 className={styles.subTitle}>Band Members</h5>
              {artist.band_members.map((bandMember, index) => (
                // eslint-disable-next-line
                <p key={index} className={styles.bandMember}>
                  {bandMember}
                </p>
              ))}
            </div>
          ) : null}

          <Button type={BTN_TYPES.button} onClick={toggleModal}>
            <Icon className={styles.icon} iconType={ICON_TYPES.edit} />
            Edit Artist
          </Button>
        </div>
      </div>

      {artist?.song_list !== undefined ? (
        <SongGrid
          view={SONG_GRID_VIEWS.albumView}
          songList={artist.song_list}
          className={styles.songGrid}
        />
      ) : (
        'No Songs yet.'
      )}
    </div>
  );
};

export default ArtistDetails;
