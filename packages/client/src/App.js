import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//constants
import { ROUTES, LIBRARY_ROUTES } from 'util/constants';

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

import './index.css';

const App = () => {
  const isAuthenticated = useAuth();

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
              <Library />
            </Route>
            <Route path={ROUTES.signIn.url} component={SignIn} />
            <Route path={ROUTES.register.url} component={Register} />
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
