import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Constants
import { ROUTES, AUTH_ROUTES } from 'util/constants';

// Pages
import HomePage from 'pages/HomePage/HomePage';
import Library from 'pages/Library/Library';
import AuthPage from 'pages/Auth/Auth';

// Hooks
import { useAuth } from 'hooks/useAuth';

// Components
import Navigation from 'components/layout/Navigation/Navigation';
import Footer from 'components/layout/Footer/Footer';
import ErrorBoundary from 'components/ErrorBoundary';

// styles
import styles from './App.module.css';
import 'assets/styles/main.css';

const App = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <div className={styles.App}>
      <ToastContainer />
      <ErrorBoundary>
        <BrowserRouter>
          <nav className={styles.nav}>
            <Navigation />
          </nav>
          <main className={`${styles.content}`}>
            <Switch>
              <Route exact path={ROUTES.home.url}>
                <HomePage />
              </Route>
              <Route exact path={AUTH_ROUTES.signIn.url}>
                <AuthPage />
              </Route>
              <Route path={ROUTES.library.url}>
                {isAuthenticated ? (
                  <Library />
                ) : (
                  <Redirect to={ROUTES.home.url} />
                )}
              </Route>
            </Switch>
          </main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
