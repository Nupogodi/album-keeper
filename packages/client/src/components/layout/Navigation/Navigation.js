import React from 'react';
import { NavLink } from 'react-router-dom';

// constants
import { ROUTES, AUTH_ROUTES } from 'util/constants';

// hooks
import { useAuth, useProvideAuth } from 'hooks/useAuth';

// components
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import Container from 'components/wrappers/Container/Container';

// Styles
import styles from './Navigation.module.css';

const Navigation = () => {
  const { signout } = useProvideAuth();
  const {
    state: { isAuthenticated },
  } = useAuth();

  // Mobile Nav Drawer
  // const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <nav className={`${styles.nav} radShadow surface4`}>
      <Container className={styles.flexContainer}>
        <NavLink className={styles.link} exact to={ROUTES.home.url}>
          <h2 className={styles.logo}>Album Keeper</h2>
        </NavLink>
        <ul className={styles.navList}>
          {/* eslint-disable-next-line */}
          {Object.entries({ ...ROUTES, ...AUTH_ROUTES }).map(([key, value]) => {
            if (
              (!isAuthenticated &&
                value.private &&
                // eslint-disable-next-line
                value.hasOwnProperty('private')) ||
              (isAuthenticated &&
                !value.private &&
                // eslint-disable-next-line
                value.hasOwnProperty('private'))
            ) {
              return null;
            }

            if (isAuthenticated && value.url === '/signout') {
              return (
                <li className={styles.navItem} key={key}>
                  <ButtonWrapper
                    className={`${styles.link} ${styles.btnOutline}`}
                    onClick={() => signout()}
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
      </Container>
    </nav>
  );
};

export default Navigation;
