import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// constants
import { SONG_GRID_VIEWS, API_ROUTES, ADD_ITEM_PATHNAME_TYPES } from 'util/constants';

// context
import AddItemContext from 'context/addItem/addItemContext';

// api
import api from 'util/api';

// components
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomModal from 'components/CustomModal/CustomModal';

// dependecies
import Fuse from 'fuse.js';
import SongForm from '../SongForm/SongForm';
import Song from '../Song/Song';

// styles
import styles from './SongsGrid.module.css';

const SongsGrid = ({ view, songList }) => {
  const [songListToRender, setSongListToRender] = useState(songList);
  const [filteredSongListToRender, setFilteredSongListToRender] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { path } = useRouteMatch();
  const addItemContext = useContext(AddItemContext);
  const { setCurrentActiveFormPathname, currentActiveFormPathname, filterValue } = addItemContext;

  useEffect(() => {
    if (view === SONG_GRID_VIEWS.songsPageView) {
      const getSongs = async () => {
        try {
          setIsSubmitting(true);
          const response = await api.get(API_ROUTES.songs.getSongs);
          if (response.data) {
            setSongListToRender(response.data);
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

      getSongs();
    }
  }, []);

  useEffect(() => {
    if (currentActiveFormPathname === ADD_ITEM_PATHNAME_TYPES.songs) {
      toggleModal();
    }
  }, [currentActiveFormPathname]);

  useEffect(() => {
    setFilteredSongListToRender(songListToRender);

    if (
      path === ADD_ITEM_PATHNAME_TYPES.songs
      && !isSubmitting
      && filterValue !== ''
    ) {
      const options = {
        keys: ['song_title'],
      };

      const fuse = new Fuse(songListToRender, options);
      const result = fuse.search(filterValue);

      setFilteredSongListToRender(
        result.map((song) => song.item),
      );
    }
  }, [filterValue, songListToRender]);

  const toggleModal = () => {
    setCurrentActiveFormPathname(null);
    setModalOpen(!modalOpen);
  };

  const handleSuccess = (song) => {
    setSongListToRender([...songListToRender, song]);

    toggleModal();
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} toggleModal={toggleModal}>
          <SongForm onSuccess={handleSuccess} />
        </CustomModal>
      )}
      <div className={styles.songsGrid}>
        {filteredSongListToRender?.length > 0
          ? filteredSongListToRender.map((song, index) => (
            <Song
              view={view}
              key={song._id}
              songTitle={song?.song_title}
              artistName={song?.artist?.artist_name}
              artistId={song?.artist?._id}
              albumTitle={song?.album?.album_title}
              albumId={song?.album?._id}
              albumCover={song?.album?.album_cover}
              songDuration={song?.song_duration}
              index={index + 1}
            />
          ))
          : null}
      </div>
    </div>
  );
};

export default SongsGrid;
