import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import SignUp from './SignUp';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path="/sign_up" component={SignUp}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
