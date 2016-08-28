import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import Portal from 'react-portal';
import SignUp from './SignUp';

import './App.css';

class FBLoginButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
        facebook_id: '',
        image_url: '',
        first_name: '',
        last_name: '',
        email: '',
        school:'',
        gradYear: '',
        major: '',
        skills: '',
        bio: '',
        grade: '',
        interest: '',
        stem_tags: ''
    }

    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.getUserFacebookId = this.getUserFacebookId.bind(this);
    this.registration = this.registration.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount () {

    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1780855752130945',
        xfbml      : true,
        version    : 'v2.7'
      });

      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));

    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
  // Facebook callback
  statusChangeCallback (response) {
    if (response.status === 'connected') {
      this.getUserFacebookId(response);
      console.log('connected')
    } else if (response.status === 'not_authorized') {
      console.log('no auth')
    } else {
      console.log('other');
    }
  }

  checkLoginState () {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

    // Verify if user is new, then prompt registration
  getUserFacebookId(response) {
      var uid = response.authResponse.userID;
      return fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId&facebook_id=${uid}`)
      .then(response=> response.json())
      .then(json => {
        if( json[0].status === '0') {
          this.registration();
        } else {
          // browserHistory.push("/profile");
        }
      });
    }

  // Get user data from Facebook API
  registration () {
    window.FB.api('/me', {fields: 'first_name,last_name,email,id'}, function(response) {
      const { first_name, last_name, email, id} = response;
      this.setState({
        first_name: first_name,
        last_name: last_name,
        email: email,
        facebook_id: id,
      });
      window.FB.api('/me/picture?type=large', function (image) {
        this.setState({
          image_url: image.data.url
        });
      }.bind(this));

      this.refs.signUpModal.openPortal();
    }.bind(this));
  }

  handleClick () {
    window.FB.login(this.checkLoginState, {scope: 'public_profile,email'});
  }
    render () {
      return (
        <div onClick={this.handleClick}>
          Login
          <Portal className="modal-container" ref="signUpModal" closeOnEsc closeOnOutsideClick>
            <div className="modal-content">
              <SignUp values={this.state}/>
            </div>
          </Portal>
        </div>
      )
    }
}


export default FBLoginButton;
