import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Router, IndexRoute, hashHistory } from 'react-router'

import configureStore from './store/configureStore'
import App from './components/App';
import './index.css';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
