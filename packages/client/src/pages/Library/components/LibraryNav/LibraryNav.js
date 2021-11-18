import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';

// constants
import { LIBRARY_ROUTES, ADD_ITEM_PATHNAME_TYPES } from 'util/constants';

// context
import AddItemContext from 'context/addItem/addItemContext';

// components
import Filter from './Filter/Filter';
import ViewControls from './ViewControls/ViewControls';

// styles
import styles from './LibraryNav.module.css';

const LibraryNav = () => {
  const addItemContext = useContext(AddItemContext);
  const [showItem, setShowItem] = useState(false);

  const { url } = useRouteMatch();

  const { pathname } = useLocation();

  const onAddItem = useCallback(() => {
    addItemContext.setCurrentActiveFormPathname(pathname);
  }, [pathname]);

  useEffect(() => {
    if (Object.values(ADD_ITEM_PATHNAME_TYPES).includes(pathname)) {
      setShowItem(true);
    } else {
      setShowItem(false);
    }
  }, [pathname]);

  return (
    <div className="pageFixer">
      <div className={styles.libraryNav}>
        <ul className={styles.linksWrapper}>
          {Object.entries(LIBRARY_ROUTES).map(([key, value]) => (
            <Link key={key} className={styles.link} to={`${url}${value.url}`}>
              <li className={styles.linkItem}>
                {' '}
                {value.title}
                {' '}
              </li>
            </Link>
          ))}
        </ul>
        <ViewControls showItem={showItem} onAddItem={onAddItem} />
        <Filter showItem={showItem} />
      </div>
    </div>
  );
};

export default LibraryNav;
