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
        <div className="headers" id="major">Major: {profile.major}</div>
        <div className="headers" id="college">College: {profile.school}</div>
        <div className="headers" id="year">Year: {profile.grad_year}</div>
      </section> : <div>
        <section id="mentee-basic-info">
          <div className="headers" id="grade">Grade: {profile.grade}</div>
        </section>

        <section id="mentee-additional-info">
          <div className="headers" id="interest">Interests: {profile.interest}</div>
        </section>
      </div>
    }

    {/*
            <section id="mentor-additional-info">
              <div className="headers" id="bio">Bio</div>
              <div className="headers" id="achievements">Achievements</div>
              <div className="headers" id="skills">Skills</div>
            </section> */}


    <section className="stem gray-background">
      <div className="section-headers">Stem Field</div>
      <i className={`fa fa-flask stem-icons stem-${profile.stem_tags === 'science' ?  true : false}`} aria-hidden="true"></i>
      <i className={`fa fa-calculator stem-icons stem-${profile.stem_tags === 'mathematics' ?  true : false}`} aria-hidden="true"></i>
      <i className={`fa fa-cog stem-icons stem-${profile.stem_tags === 'engineering' ?  true : false }`} aria-hidden="true"></i>
      <i className={`fa fa-laptop stem-icons stem-${profile.stem_tags === 'technology' ?  true : false }`} aria-hidden="true"></i>
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
