import React,{Component} from 'react'
import { connect } from 'react-redux';

import { setProfile } from './actions';

import './css/profile.css';

class Profile extends Component {
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
    {profile.children && profile.user_type === 'mentor' ? <div>{profile.children}</div> : null }
    {
      profile.user_type === 'mentor' ? <section id="mentor-basic-info">
      <div className="section">
        <div className="flex">
          <div className="section-flex">
            <div className="section-label">Major</div>
            <div className="section-content">
              {profile.major}
            </div>
          </div>
          <div className="section-flex">
            <div className="section-label">College</div>
            <div className="section-content">
              {profile.school}
            </div>
          </div>
          <div className="section-flex">
            <div className="section-label">Year</div>
            <div className="section-content">
              {profile.grad_year}
            </div>
          </div>
        </div>
      </div>
      </section> : <div>
        <section id="mentee-basic-info">
          <div className="headers" id="grade">Grade: {profile.grade}</div>
        </section>

        <section id="mentee-additional-info">
          <div className="headers" id="interest">Interests: {profile.interest}</div>
        </section>
      </div>
    }

    <div className="section" style={{marginBottom: '30px'}}>
      <div className="section-label">Bio</div>
      <div className="section-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        {profile.bio}
      </div>
    </div>
    {/*
            <section id="mentor-additional-info">

              <div className="headers" id="achievements">Achievements</div>
              <div className="headers" id="skills">Skills</div>
            </section> */}


    <section className="stem gray-background">
      <div className="section-headers">Stem Field</div>
      <div className={`stem-icons stem-${profile.stem_tags === 'science' ?  true : false}`}>
        <div className="stem-icon-wrapper">
          <i className="fa fa-flask" aria-hidden="true"></i>
          <span className="stem-icon-label">Science</span>
        </div>
      </div>
      <div className={`stem-icons stem-${profile.stem_tags === 'mathematic' ?  true : false}`}>
        <div className="stem-icon-wrapper">
          <i className="fa fa-calculator" aria-hidden="true"></i>
          <span className="stem-icon-label">Mathematics</span>
        </div>
      </div>
      <div className={`stem-icons stem-${profile.stem_tags === 'engineering' ?  true : false}`}>
        <div className="stem-icon-wrapper">
          <i className="fa fa-cog" aria-hidden="true"></i>
          <span className="stem-icon-label">Engineering</span>
        </div>
      </div>
      <div className={`stem-icons stem-${profile.stem_tags === 'technology' ?  true : false}`}>
        <div className="stem-icon-wrapper">
          <i className="fa fa-laptop" aria-hidden="true"></i>
          <span className="stem-icon-label">Technology</span>
        </div>
      </div>
    </section>

    <section className="network">
      <div className="section-headers">Followers</div>
      <div className="follower"></div>
      <div className="follower"></div>
      <div className="follower"></div>
      <div className="follower"></div>
    </section>

    {/* <section id="references" className="gray-background">
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
    </section> */}
  </center>

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile);

export {Layout};
