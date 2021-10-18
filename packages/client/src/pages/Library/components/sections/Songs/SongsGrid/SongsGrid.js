import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//constants
import { SONG_GRID_VIEWS, API_ROUTES } from 'util/constants';

//api
import api from 'util/api';

//components
import Song from '../Song/Song';

//styles
import styles from './SongsGrid.module.css';
import 'index.css';

const SongsGrid = ({ view, songList }) => {
  const [fetchedSongList, setFetchedSongList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let dataOrigin = songList || fetchedSongList;

  useEffect(() => {
    if (view === SONG_GRID_VIEWS.songsPageView) {
      const getSongs = async () => {
        try {
          setIsSubmitting(true);
          const response = await api.get(API_ROUTES.songs.getSongs);
          if (response.data) {
            setFetchedSongList(response.data);
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


  return (
    <div className={styles.songsGrid}>
      {dataOrigin?.length > 0
        ? dataOrigin.map((song, index) => {
            return (
              <Song
                view={view}
                key={song._id}
                songTitle={song.song_title}
                artistName={song.artist.artist_name}
                artistId={song.artist._id}
                albumTitle={song.album.album_title}
                albumId={song.album._id}
                albumCover={song.album.album_cover}
                songDuration={song.song_duration}
                index={index + 1}
              />
            );
          })
        : null}
    </div>
  );
};

export default SongsGrid;
