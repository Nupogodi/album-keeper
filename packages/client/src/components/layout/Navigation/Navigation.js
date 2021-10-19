import React from 'react';
import { Link, NavLink } from 'react-router-dom';

//constants
import { ROUTES, AUTH_ROUTES } from 'util/constants';

//hooks
import { useAuth, useProvideAuth } from 'hooks/useAuth';

//components
import ButtonWrapper from 'components/wrappers/ButtonWrapper';

//styles
import styles from './Navigation.module.css';

const Navigation = () => {
  const { state, signout } = useProvideAuth();

  console.log(state);
  console.log(signout);

  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <div>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>
          <NavLink className={styles.link} exact to='/'>
            Album Keeper
          </NavLink>
        </h2>
        <ul className={styles.navList}>
          {Object.entries({ ...ROUTES, ...AUTH_ROUTES }).map(([key, value]) => {
            if (
              (!isAuthenticated &&
                value.private &&
                value.hasOwnProperty('private')) ||
              (isAuthenticated &&
                !value.private &&
                value.hasOwnProperty('private'))
            ) {
              return null;
            }

            if (isAuthenticated && value.url === '/signout') {
              return (
                <li className={styles.navItem} key={key}>
                  <ButtonWrapper
                    className={styles.link}
                    action={() => signout()}
                  >
                    {value.title}
                  </ButtonWrapper>
                </li>
              );
            }

            return (
              <li className={styles.navItem} key={key}>
                <NavLink className={styles.link} exact to={value.url}>
                  {value.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
