import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import createReducer from '@funnyfoo/create-reducer-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

export const Types = {
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS'
};

export const fetchTodos = () => (dispatch, getState) => {
  fetch('http://localhost:4000/todos')
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: Types.FETCH_TODOS_SUCCESS,
        payload: data
      })
    );
};

const todoReducer = createReducer(
  [
    [
      Types.FETCH_TODOS_SUCCESS,
      (state, { payload }) => ({ ...state, todos: payload })
    ]
  ],
  { todos: [] }
);

const store = createStore(
  combineReducers({ todos: todoReducer }),
  {},
  applyMiddleware(reduxThunk, createLogger())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
