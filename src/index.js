import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import SignUp from './SignUp';
import Profile from './Profile';
import OtherProfile from './OtherProfile';
import Mentors from './Mentors';
import MyMentors from './MyMentors';
import Applicants from './Applicants';
import ComingSoon from './ComingSoon';
import About from './About';
import Contact from './Contact';
import Home from './Home';
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
        <IndexRoute component={Home}/>
        <Route path="sign_up" component={SignUp}/>
        <Route path="/profile" component={Profile}/>
        <Route path="profile/:id" component={OtherProfile} />
        <Route path="mentors" component={Mentors}/>
        <Route path="my-mentors" component={MyMentors}/>
        <Route path="applicants" component={Applicants}/>
        <Route path="coming-soon" component={ComingSoon}/>
        <Route path="about" component={About}/>
        <Route path="contact" component={Contact}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
