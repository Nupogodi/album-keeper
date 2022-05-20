import React from 'react';
import ReactDOM from 'react-dom';

// state
import { ProvideAuth } from 'hooks/useAuth';

// components
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
