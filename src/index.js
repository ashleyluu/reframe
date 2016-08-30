import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import SignUp from './SignUp';
import Testing from './Testing';
import Profile from './Profile';

import rootReducer from './reducers';

import './css/index.css';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

let store = createStore(rootReducer, persistedState,compose(
  applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path="/sign_up" component={SignUp}/>
        <Route path="/profile" component={Profile}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
