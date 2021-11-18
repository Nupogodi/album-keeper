import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// api
import api from 'util/api';
import {
  API_ROUTES,
  ICON_TYPES,
  BTN_STYLES,
  BTN_TYPES,
  BTN_COLORS,
  SONG_GRID_VIEWS,
} from 'util/constants';

// components
import LoadingSpinner from 'components/LoadingSpinner/index';
import DefaultImg from 'assets/img/default_album.jpg';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import CustomModal from 'components/CustomModal/CustomModal';
import CustomButton from 'components/CustomButton/CustomButton';
import ArtistForm from '../ArtistEditForm/ArtistEditForm';
import SongGrid from '../../Songs/SongsGrid/SongsGrid';

// styles
import styles from './ArtistDetails.module.css';
import 'index.css';

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
          <ArtistForm
            artistTitle={artist.artist_name}
            artistId={artist._id}
            description={artist.artist_description}
            bandMembers={artist.band_members}
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
          {artist.band_members !== undefined
           && artist.band_members.length > 0 ? (
            <div className={styles.bandMembers}>
              <h5 className={styles.subTitle}>Band Members</h5>
              {artist.band_members.map((bandMember, index) => (
                <p key={index} className={styles.bandMember}>
                  {bandMember}
                </p>
              ))}
            </div>
          ) : null}

          <CustomButton
            type={BTN_TYPES.button}
            action={toggleModal}
            btnStyle={BTN_STYLES.outlineDark}
            btnColor={BTN_COLORS.dark}
          >
            <CustomIcon className={styles.icon} iconType={ICON_TYPES.edit} />
            Edit Artist
          </CustomButton>
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
