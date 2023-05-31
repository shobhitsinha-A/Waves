import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'

import 'resources/styles/styles.css'

import {Provider} from 'react-redux';
import ReduxStore from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
);

