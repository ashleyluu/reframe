import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import Portal from 'react-portal';
import SignUp from './SignUp';

import { setAuthentication, setProfile } from './actions';

import './css/navigation.css';
import './css/modal.css';

class FBLoginButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
        facebook_id: '',
        image_url: '',
        first_name: '',
        last_name: '',
        email: '',
        user_type: '',
        stem_tags: '',
        bio: '',
        school:'',
        grad_year: '',
        major: '',
        skills: '',
        grade: '',
        interest: ''
    }

    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.getUserFacebookId = this.getUserFacebookId.bind(this);
    this.registration = this.registration.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
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
  }
  // Facebook callback
  statusChangeCallback (response) {
    if (response.status === 'connected') {
      this.getUserFacebookId(response);
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

      this.props.dispatch(setAuthentication({
        facebook_id: uid,
        status: 'connected'
      }))

      return fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId&facebook_id=${uid}`)
      .then(response=> response.json())
      .then(json => {
        if( json[0].status === '0') {
          this.registration();
        } else {
          this.props.dispatch(setProfile(json[0]))
          browserHistory.push("/profile");
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

  handleFormChanges (e) {
    const newState = Object.assign({}, this.state, {[e.target.name]: e.target.value});
    this.setState(newState);
  }
    render () {
      return (
        <div className="nav-link" onClick={this.handleClick}>
          Login
          <Portal className="modal-container" ref="signUpModal" closeOnEsc>
            <ModalContent values={this.state} handleFormChanges={this.handleFormChanges}/>
          </Portal>
        </div>
      )
    }
}

class ModalContent extends Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit () {
    $.ajax({
      method: 'GET',
      url: 'http://reframe.modernrockstar.com/lib/api.php?action=addNewUser',
      datatype: 'json',
      data: this.props.values
    }).done(function(data) {
      this.props.closePortal();
      browserHistory.push('/profile');
    }.bind(this));
  }
  render () {
    return (
      <div className="modal-content">
        <div className="modal-body">
          <SignUp {...this.props} handleSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  }
}



export default connect()(FBLoginButton);
