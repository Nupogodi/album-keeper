import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

//components
import LoadingSpinner from 'components/LoadingSpinner/index';
import DefaultImg from 'assets/img/default_album.jpg';

// styles
import styles from './Artist.module.css';
import 'index.css';

const Artist = ({ artistName, image, songList, artistId }) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${artistId}`}>
      <div className={styles.artist}>
        <div className={styles.imgWrapper}>
          <img src={image === undefined ? DefaultImg : image} />
        </div>
        <div className={styles.details}>
          <h4 className={styles.title}>{artistName}</h4>
          <p className={styles.subDetail}>
            {songList.length}{' '}
            {songList.length > 0 || songList.length === 0 ? 'songs' : 'song'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Artist;
