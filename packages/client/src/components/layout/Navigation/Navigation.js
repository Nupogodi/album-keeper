import React from 'react';
import { Link } from 'react-router-dom';

//constants
import { ROUTES } from 'util/constants';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>
          <Link className={styles.link} to='/'>
            Album Keeper
          </Link>
        </h2>
        <ul className={styles.navList}>
          {Object.entries(ROUTES).map(([key, value]) => {
            return (
              <li className={styles.navItem} key={key}>
                <Link className={styles.link} to={value.url}>
                  {value.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
