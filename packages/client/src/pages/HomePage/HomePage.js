import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// constants
import { API_ROUTES, ROUTES } from 'util/constants';

// hooks
import { useAuth } from 'hooks/useAuth';

// components
// import Button from 'components/Button/Button';
import Container from 'components/wrappers/Container/Container';
import Button from 'components/Button/Button';

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

  // eslint-disable-next-line
  const [libraryStats, setLibraryStats] = useState(initialState);

  useEffect(() => {
    // const getLibraryStats = async () => {
    //   const artistRequest = await api.get(API_ROUTES.artists.getArtists);
    //   const artistCount = artistRequest.data.length;
    //   const albumRequest = await api.get(API_ROUTES.albums.getAlbums);
    //   const albumCount = albumRequest.data.length;
    //   const songRequest = await api.get(API_ROUTES.songs.getSongs);
    //   const songCount = songRequest.data.length;
    //   setLibraryStats({
    //     ...libraryStats,
    //     albumCount,
    //     artistCount,
    //     songCount,
    //   });
    // };
    // getLibraryStats();
  }, []);

  return (
    <main className={` ${styles.homePage}`}>
      {!isAuthenticated ? (
        <section className={styles.section}>
          <Container className={styles.container}>
            <article className={styles.article}>
              <h2 className={styles.heading}>
                <span className={styles.accent}>Music</span>
                Library
              </h2>
              <p className={styles.subtitle}>
                A single place to organize your music collection.
              </p>
              <Button className={styles.button}>
                <Link to={API_ROUTES.auth.signIn}>Sign Up</Link>
              </Button>
            </article>
          </Container>
        </section>
      ) : (
        <section className={styles.section}>
          <Container className={styles.container}>
            <article className={styles.article}>
              <h3 className={styles.heading}>
                Welcome Back,{' '}
                <span className={styles.accent}> {user.username}</span>
              </h3>
              <div className={styles.libraryDetails}>
                <p className={styles.stat}>
                  Artists: {libraryStats.artistCount}
                </p>
                <p className={styles.stat}>
                  {`Albums:  ${libraryStats.albumCount}`}
                </p>
                <p className={styles.stat}>
                  {`Songs:  ${libraryStats.songCount}`}
                </p>
              </div>
              <Button className={styles.button}>
                <Link to={ROUTES.library.url}>Library</Link>
              </Button>
            </article>
          </Container>
        </section>
        // <section className={styles.welcomeBack}>
        //   <h3 className={styles.heading}>Welcome Back, {user.username}!</h3>
        //   <div className={styles.libraryDetails}>
        //     <h4 className={styles.subHeading}>Library Stats</h4>
        //     <p
        //       className={styles.stat}
        //     >{`Artists: ${libraryStats.artistCount}`}</p>
        //     <p
        //       className={styles.stat}
        //     >{`Albums:  ${libraryStats.albumCount}`}</p>
        //     <p className={styles.stat}>{`Songs:  ${libraryStats.songCount}`}</p>
        //   </div>
        // </section>
      )}
    </main>
  );
};

export default HomePage;
