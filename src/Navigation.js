import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FBLoginButton from './FBLoginButton';

import './css/navigation.css'

import { Link } from 'react-router';

// class Navigation extends Component {
//   render() {
//     return (
//       <div className="">
//       </div>
//     );
//   }
// }

const Navigation = (props) =>
  <div className='navigation'>
      { props.auth.facebook_id ? <LoggedInLinks {...props}/> : <LoggedOutLinks {...props} /> }
  </div>

const LoggedInLinks = (props) =>
  <div className="nav-links">
      {props.profile.user_type === 'mentor' ?
        <div className='nav-links-left'>
          <Link to="/profile" className="nav-link" activeClassName="nav-link-active">My Account</Link>
          <Link to="/applicants" className="nav-link" activeClassName="nav-link-active">Applicants</Link>
        </div> :
        <div className='nav-links-left'>
          <Link to="/profile" className="nav-link" activeClassName="nav-link-active">My Account</Link>
          <Link to="/my-mentors" className="nav-link" activeClassName="nav-link-active">My Mentors</Link>
          <Link to="/mentors" className="nav-link" activeClassName="nav-link-active">Mentors</Link>
        </div>

      }
    <div className="nav-links-right">
      <div className="nav-link" onClick={() => {
          localStorage.removeItem("reduxStore");
          props.dispatch({type: 'CLEAR_AUTH'});
          browserHistory.push("/")
        }}
      >
        Log out
      </div>
    </div>
  </div>

const LoggedOutLinks = (props) =>
  <div className="nav-links">
    <div className='nav-links-left'>
      <Link className="nav-link" activeClassName="nav-link-active" to="/testing">About</Link>
      <Link className="nav-link" activeClassName="nav-link-active" to="/contact">Contact</Link>
    </div>
    <div className="nav-links-right">
      <FBLoginButton {...props}/>
    </div>
  </div>

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Navigation);
