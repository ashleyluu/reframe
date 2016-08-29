import React,{Component} from 'react'
import { connect } from 'react-redux';

import { setProfile } from './actions';

import './css/profile.css';

class Profile extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId&facebook_id=${this.props.auth.facebook_id}`)
    .then( response => response.json() )
    .then( json => this.props.dispatch(setProfile(json[0])));
  }

  render () {
    const {profile, auth} = this.props;
    return (
      <div>
        { auth.facebook_id ? <Layout {...profile} /> : <div className="logged-out"> Sorry you are not logged in. Please login to view your profile.</div>}
      </div>
    )
  }
}

const Layout = (profile) =>
  <center>
    <img src={profile.image_url} alt="" className="photo" />
    <div className="name">{profile.first_name} {profile.last_name}</div>
    <a href="#">
      <div className="button">apply</div>
    </a>
    <a href="#">
      <div className="button">follow</div>
    </a>

    <section id="mentor-basic-info">
      <div className="headers" id="major">Major: {profile.major}</div>
      <div className="headers" id="college">College: {profile.school}</div>
      <div className="headers" id="year">Year: {profile.grad_year}</div>
    </section>

    {/* <section id="mentee-basic-info">
      <div className="headers" id="grade">Grade:</div>
    </section>

    <section id="mentee-additional-info">
      <div className="headers" id="bio">Bio</div>
      <div className="headers" id="interest">Interests</div>
    </section>

    <section id="mentor-additional-info">
      <div className="headers" id="bio">Bio</div>
      <div className="headers" id="achievements">Achievements</div>
      <div className="headers" id="skills">Skills</div>
    </section> */}

    <section className="stem gray-background">
      <div className="section-headers">Stem Field</div>
      <i className="fa fa-flask stem-icons" aria-hidden="true"></i>
      <i className="fa fa-calculator stem-icons" aria-hidden="true"></i>
      <i className="fa fa-cog stem-icons" aria-hidden="true"></i>
      <i className="fa fa-laptop stem-icons" aria-hidden="true"></i>
    </section>

    <section className="network">
      <div className="section-headers">Followers</div>
      <div className="follower"></div>
      <div className="follower"></div>
      <div className="follower"></div>
      <div className="follower"></div>
    </section>

    <section id="references" className="gray-background">
      <div className="section-headers">References</div>
      <div className="column-container">
        <div className="column">
          <div className="review"></div>
          <div className="review"></div>
        </div>
        <div className="column">
          <div className="review"></div>
          <div className="review"></div>
        </div>
      </div>
    </section>
  </center>

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile);
