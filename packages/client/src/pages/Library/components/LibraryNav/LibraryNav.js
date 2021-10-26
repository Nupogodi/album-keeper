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
import { LIBRARY_ROUTES } from 'util/constants';

//context
import AddItemContext from 'context/addItem/addItemContext';

//components
import Filter from './Filtrer/Filter';
import ViewControls from './ViewControls/ViewControls';

// styles
import styles from './LibraryNav.module.css';

const LibraryNav = () => {
  const addItemContext = useContext(AddItemContext);
  const [currentAddItemType, setCurrentAddItemType] = useState(null);

  let { path, url } = useRouteMatch();

  let {pathname} = useLocation()

  const onAddItem = useCallback(() => {

    
    console.log(pathname, 'OnAddItem')


  }, [pathname]);

  console.log(useLocation())
  
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
