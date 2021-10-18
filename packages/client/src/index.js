import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from 'appRouter';

//state
import { ProvideAuth } from 'hooks/useAuth';

import './index.css';

//components
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <AppRouter>
        <App />
      </AppRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
