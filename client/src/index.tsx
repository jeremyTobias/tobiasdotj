import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';

import App from './main/app';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
      <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
