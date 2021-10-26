import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

//constants
import { ROUTES, LIBRARY_ROUTES, SONG_GRID_VIEWS } from 'util/constants';

//context
import AddItemState from 'context/addItem/AddItemState';

//hooks
import { useRequireAuth } from 'hooks/useRequireAuth';
import { useProvideAuth } from 'hooks/useAuth';

//components
import AlbumsGrid from './components/sections/Albums/AlbumsGrid/AlbumsGrid';
import AlbumDetails from './components/sections/Albums/AlbumDetails/AlbumDetails';
import ArtistsGrid from './components/sections/Artists/ArtistsGrid/ArtistsGrid';
import SongsGrid from './components/sections/Songs/SongsGrid/SongsGrid';
import LibraryNav from './components/LibraryNav/LibraryNav';
import ArtistDetails from './components/sections/Artists/ArtistDetails/ArtistDetails';

//styles
import styles from './Library.module.css';

const Library = () => {
  const { state } = useProvideAuth();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  return (
    <AddItemState>
      <div className={styles.mainBg}>
        <div className='container'>
          <LibraryNav />
          <div className={styles.content}>
            <Switch>
              <Route
                exact
                path={`${ROUTES.library.url}${LIBRARY_ROUTES.albums.url}`}
              >
                <AlbumsGrid />
              </Route>
              <Route
                exact
                path={`${ROUTES.library.url}${LIBRARY_ROUTES.albums.url}/:id`}
              >
                <AlbumDetails />
              </Route>
              <Route
                exact
                path={`${ROUTES.library.url}${LIBRARY_ROUTES.artists.url}`}
              >
                <ArtistsGrid />
              </Route>
              <Route
                exact
                path={`${ROUTES.library.url}${LIBRARY_ROUTES.artists.url}/:id`}
              >
                <ArtistDetails />
              </Route>
              <Route
                exact
                path={`${ROUTES.library.url}${LIBRARY_ROUTES.songs.url}`}
              >
                <SongsGrid view={SONG_GRID_VIEWS.songsPageView} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </AddItemState>
  );
};

export default Library;

// const withGlobalContext = ({ children }) => {
//   return <GlobalState>{"KEK"}</GlobalState>;
// };
// export default withGlobalContext(Library);
