import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//constants
import { ROUTES } from 'util/constants';

// components
import HomePage from 'pages/HomePage/HomePage';
import Library from 'pages/Library/Library';
import ErrorBoundary from 'components/ErrorBoundary';

//hooks
import { useAuth } from 'hooks/useAuth';

//components
import Navigation from 'components/layout/Navigation/Navigation';

import 'assets/styles/main.css';

const App = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <div className='App'>
      <ErrorBoundary>
        <ToastContainer />
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path={ROUTES.home.url}>
              <HomePage />
            </Route>
            <Route path={ROUTES.library.url}>
              {isAuthenticated ? (
                <Library />
              ) : (
                <Redirect to={ROUTES.home.url} />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
