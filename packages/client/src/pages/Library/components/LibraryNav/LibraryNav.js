import React, { useMemo, useState } from 'react';
import {
  useParams,
  useRouteMatch,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

//constants
import { LIBRARY_ROUTES } from 'util/constants';

//components
import Filter from './Filter';

// styles
import styles from './LibraryNav.module.css';

const LibraryNav = () => {
  let { path, url } = useRouteMatch();

  return (
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
      <Filter />
    </div>
  );
};

export default LibraryNav;
