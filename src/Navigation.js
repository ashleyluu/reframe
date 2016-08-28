import React from 'react';
import FBLoginButton from './FBLoginButton';

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
    <div className="logo">Reframe</div>
      { props.is_authed ? <LoggedInLinks /> : <LoggedOutLinks /> }
  </div>

const LoggedInLinks = () =>
  <div className="nav-links">
    <div className="link">My Account</div>
    <div className="link">Log out</div>
  </div>

const LoggedOutLinks = () =>
  <div className="nav-links">
    <FBLoginButton/>
  </div>



export default Navigation;
