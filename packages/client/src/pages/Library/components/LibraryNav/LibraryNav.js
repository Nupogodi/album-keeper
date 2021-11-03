import React, { useMemo, useState, useCallback, useContext } from 'react';
import {
  useParams,
  useRouteMatch,
  useLocation,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

//constants
import { LIBRARY_ROUTES, ROUTES, ADD_ITEM_CONTEXT_TYPES, ADD_ITEM_PATHNAME_TYPES } from 'util/constants';

//context
import AddItemContext from 'context/addItem/addItemContext';

//components
import Filter from './Filtrer/Filter';
import ViewControls from './ViewControls/ViewControls';

import AlbumEditForm from '../sections/Albums/AlbumEditForm/AlbumEditForm';
import ArtistForm from '../sections/Artists/ArtistEditForm/ArtistEditForm';
// import EditForm from '../EditForm/EditForm';
// import SongForm from '../sections/Songs/SongForm/SongForm'

// styles
import styles from './LibraryNav.module.css';

const LibraryNav = () => {
  const addItemContext = useContext(AddItemContext);
  const [currentActiveForm, setCurrentActiveForm] = useState(null);
  

  let { path, url } = useRouteMatch();

  let {pathname} = useLocation()

  const onAddItem = useCallback(() => {
    console.log(addItemContext)
    // configurate setCurrentActiveForm
    addItemContext.setCurrentActiveFormPathname(pathname);
    console.log(pathname)

  }, [pathname]);

  
  return (
    <div className='page-fixer'>
      <div className={styles.libraryNav}>
        <ul className={styles.linksWrapper}>
          {Object.entries(LIBRARY_ROUTES).map(([key, value]) => {
            return (
              <Link key={key} className={styles.link} to={`${url}${value.url}`}>
                <li className={styles.linkItem}> {value.title} </li>
              </Link>
            );
          })}
        </ul>
        <ViewControls onAddItem={onAddItem} />
        <Filter />
      </div>
    </div>
  );
};

export default LibraryNav;
