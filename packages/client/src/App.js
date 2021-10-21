import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//constants
import { ROUTES, AUTH_ROUTES, LIBRARY_ROUTES } from 'util/constants';

// components
import HomePage from 'pages/HomePage/HomePage';
import Library from 'pages/Library/Library';
import SignIn from 'pages/SignIn/SignIn';
import Register from 'pages/Register/Register';
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

  console.log(useAuth());
  console.log(isAuthenticated);

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
            <Route path={AUTH_ROUTES.signIn.url}>
              <SignIn />
            </Route>
            <Route path={AUTH_ROUTES.register.url}>
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
