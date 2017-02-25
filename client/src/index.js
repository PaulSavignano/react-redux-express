import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router'

import configureStore from './store/configureStore'
import App from './components/App';
import './index.css';

import { setTodoSearch, todoAdd, toggleShowCompleted, todoToggle } from './actions/index'
const store = configureStore()

store.subscribe(() => {
  console.log('New state', store.getState())
})

store.dispatch(todoAdd('Build the table'))
store.dispatch(setTodoSearch('table'))
store.dispatch(toggleShowCompleted())

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
