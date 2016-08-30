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
    <div className="link">My Account</div>
    <div className="nav-link" onClick={() => {
        localStorage.removeItem("reduxStore");
        props.dispatch({type: 'CLEAR_AUTH'});
        browserHistory.push("/")
      }}
      >Log out</div>
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
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navigation);
