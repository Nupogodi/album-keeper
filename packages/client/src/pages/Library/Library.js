import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

//constants
import { LIBRARY_ROUTES, SONG_GRID_VIEWS } from 'util/constants';

//components
import AlbumsGrid from './components/sections/Albums/AlbumsGrid/AlbumsGrid';
import AlbumDetails from './components/sections/Albums/AlbumDetails/AlbumDetails';
import ArtistsGrid from './components/sections/Artists/ArtistsGrid/ArtistsGrid';
import SongsGrid from './components/sections/Songs/SongsGrid/SongsGrid';
import LibraryNav from './components/LibraryNav/LibraryNav';
import ArtistDetails from './components/sections/Artists/ArtistDetails/ArtistDetails';

// styles
import 'index.css';

const Library = () => {
  return (
    <div className='container'>
      <LibraryNav />
      <Switch>
        <Route exact path='/library/albums'>
          <AlbumsGrid />
        </Route>
        <Route exact path='/library/albums/:id'>
          <AlbumDetails />
        </Route>
        <Route exact path='/library/artists'>
          <ArtistsGrid />
        </Route>
        <Route exact path='/library/artists/:id'>
          <ArtistDetails />
        </Route>
        <Route exact path='/library/songs'>
          <SongsGrid view={SONG_GRID_VIEWS.songsPageView} />
        </Route>
      </Switch>
    </div>
  );
};

export default Library;

// const withGlobalContext = ({ children }) => {
//   return <GlobalState>{"KEK"}</GlobalState>;
// };
// export default withGlobalContext(Library);
