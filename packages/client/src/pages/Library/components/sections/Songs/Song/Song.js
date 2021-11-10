import React from 'react';
import { Link } from 'react-router-dom';

// calculations
import { secondsToTimestamp } from 'util/calculations';

// constants
import { ROUTES, LIBRARY_ROUTES, SONG_GRID_VIEWS } from 'util/constants';

// components
import DefaultImg from 'assets/img/default_album.jpg';

// styles
import styles from './Song.module.css';

const Song = ({
  songTitle,
  artistName,
  artistId,
  albumTitle,
  albumId,
  albumCover,
  songDuration,
  index,
  view = SONG_GRID_VIEWS.generalView,
}) => {
  const { generalView, albumView, songsPageView } = SONG_GRID_VIEWS;

  if (view === generalView || view === songsPageView) {
    return (
      <div className={styles.songItem}>
        <div className={styles.imgWrapper}>
          <img src={albumCover === undefined ? DefaultImg : albumCover} />
        </div>
        <div className={styles.songDetails}>
          <h4 className={(styles.songTitle, styles.songDetail)}>{songTitle}</h4>
          <p className={styles.songDetail}>
            <Link
              to={`${ROUTES.library.url}${LIBRARY_ROUTES.artists.url}/${artistId}`}
              className={styles.link}
            >
              {artistName}
            </Link>
          </p>
          <p className={styles.songDetail}>
            <Link
              to={`${ROUTES.library.url}${LIBRARY_ROUTES.albums.url}/${albumId}`}
              className={styles.link}
            >
              {albumTitle}
            </Link>
          </p>
          <p className={styles.songDetail}>
            {secondsToTimestamp(songDuration)}
          </p>
        </div>
      </div>
    );
  } else if (view === albumView) {
    return (
      <div className={styles.songItem}>
        <p className={styles.songIndex}>{index}</p>
        <div className={styles.songDetails}>
          <h4 className={(styles.songTitle, styles.songDetail)}>{songTitle}</h4>
          <p className={`${styles.songDetail} ${styles.gridSpan3}`}>
            {secondsToTimestamp(songDuration)}
          </p>
        </div>
      </div>
    );
  }
};

export default Song;
