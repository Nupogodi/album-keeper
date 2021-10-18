import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

//api
import api from 'util/api';
import { API_ROUTES, ICON_TYPES, BTN_STYLES, BTN_TYPES } from 'util/constants';

//components
import Song from '../../Songs/Song/Song';
import LoadingSpinner from 'components/LoadingSpinner/index';
import DefaultImg from 'assets/img/default_album.jpg';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import ArtistForm from '../ArtistForm/ArtistForm';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import CustomModal from 'components/CustomModal/CustomModal';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './ArtistDetails.module.css';
import 'index.css';

const ArtistDetails = () => {
  const { id } = useRouteMatch().params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMode, setEditionMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getArtistDetails = async () => {
      try {
        setIsSubmitting(true);
        const response = await api.get(`${API_ROUTES.artists.getArtist}/${id}`);

        if (response.data) {
          setArtist(response.data);
          console.log(artist);
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

    getArtistDetails();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (isSubmitting) return <LoadingSpinner />;

  return (
    <div className='container'>
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
          />

          
        </div>
        <div className={styles.detailsGroup}>
          <h4 className={styles.title}>{artist.artist_name}</h4>
            {artist.description && <p>{artist.description}</p>}
          {artist.band_members !== undefined &&
          artist.band_members.length > 0 ? (
            <div className={styles.bandMembers}>
              <h5 className={styles.subTitle}>Band Members</h5>
              {artist.band_members.map((bandMember, index) => {
                return (
                  <p key={index} className={styles.bandMember}>
                    {bandMember}
                  </p>
                );
              })}
            </div>
          ) : null}

          <CustomButton
            type={BTN_TYPES.button}
            action={toggleModal}
            btnStyle={BTN_STYLES.outline}
          >
            <CustomIcon className={styles.icon} iconType={ICON_TYPES.edit} />
            Edit Artist
          </CustomButton>
          {/* <button
            type='button'
            className={styles.btnWrapper}
            onClick={toggleModal}
          >
            <CustomIcon className={styles.icon} iconType={ICON_TYPES.edit} />
            Edit Artist
          </button> */}
        </div>
      </div>
      <div className={styles.songGrid}>
        {artist?.song_list !== undefined
          ? artist.song_list.map((song) => {
              return (
                <Song
                  key={song._id}
                  songTitle={song.song_title}
                  artistName={song.artist.artist_name}
                  artistId={song.artist._id}
                  albumTitle={song.album.album_title}
                  albumId={song.album._id}
                  albumCover={song.album.album_cover}
                  songDuration={song.song_duration}
                />
              );
            })
          : 'No Songs'}
      </div>
    </div>
  );
};

export default ArtistDetails;
