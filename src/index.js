import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
import { rootReducer } from "./store";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './index.css';

const persistedState = localStorage.getItem('shoes-s')
? JSON.parse(localStorage.getItem('shoes-s'))
: {};

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem(
    'shoes-s',
    JSON.stringify(store.getState())
  );
});

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootEl
);