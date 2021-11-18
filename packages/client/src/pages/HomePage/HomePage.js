import React, { useState, useEffect } from 'react';

// constants
import { API_ROUTES } from 'util/constants';

// api
import api from 'util/api';

// hooks
import { useAuth } from 'hooks/useAuth';

// components
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import Register from 'components/Register/Register';
import SignIn from 'components/SignIn/SignIn';

// styles
import styles from './HomePage.module.css';

const HomePage = () => {
  const {
    state: { isAuthenticated, user },
  } = useAuth();

  const initialState = {
    artistCount: 0,
    albumCount: 0,
    songCount: 0,
  };

  const [libraryStats, setLibraryStats] = useState(initialState);

  useEffect(() => {
    const getLibraryStats = async () => {
      const artistRequest = await api.get(API_ROUTES.artists.getArtists);
      const artistCount = artistRequest.data.length;

      const albumRequest = await api.get(API_ROUTES.albums.getAlbums);
      const albumCount = albumRequest.data.length;

      const songRequest = await api.get(API_ROUTES.songs.getSongs);
      const songCount = songRequest.data.length;

      setLibraryStats({
        ...libraryStats,
        albumCount,
        artistCount,
        songCount,
      });
    };

    getLibraryStats();
  }, []);

  const [currentTab, setCurrentTab] = useState('signup');
  return (
    <main className={` ${styles['mainBg']} pageFixer`}>
      <div className={`container ${styles.pageWrap}`}>
        {!isAuthenticated ? (
          <div className={styles.grid}>
            <section className={styles.gridItem}>
              <div className={styles.heroContent}>
                <h2 className={styles.heading}>Album Keeper</h2>
                <p className={styles.subtitle}>
                  A single place for your music collection!
                </p>
              </div>
            </section>
            <section className={`${styles.gridItem} ${styles.sectionRight}`}>
              <div className={styles.tabs}>
                <ButtonWrapper
                  className={styles.tab}
                  action={() => setCurrentTab('signin')}
                >
                  Sign In
                </ButtonWrapper>
                <ButtonWrapper
                  className={styles.tab}
                  action={() => setCurrentTab('signup')}
                >
                  Sign Up
                </ButtonWrapper>
              </div>
              {currentTab === 'signin' ? <SignIn /> : <Register />}
            </section>
          </div>
        ) : (
          <section className={styles.welcomeBack}>
            <h3 className={styles.heading}>Welcome Back, {user.username}!</h3>
            <div className={styles.libraryDetails}>
              <h4 className={styles.subHeading}>Library Stats</h4>
              <p
                className={styles.stat}
              >{`Artists: ${libraryStats.artistCount}`}</p>
              <p
                className={styles.stat}
              >{`Albums:  ${libraryStats.albumCount}`}</p>
              <p
                className={styles.stat}
              >{`Songs:  ${libraryStats.songCount}`}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default HomePage;
