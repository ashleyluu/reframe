import React,{Component} from 'react'
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { setProfile } from './actions';

import './css/profile.css';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      people: [{
        status: '0'
      }]
    }
  }
  componentDidMount () {
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId&facebook_id=${this.props.auth.facebook_id}`)
    .then( response => response.json() )
    .then( function(json) {
      this.props.dispatch(setProfile(json[0]))
      return json[0]
    }.bind(this))
    .then(function (user) {
      fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getAll${user.user_type ==='mentee' ? 'Mentors' : 'Mentees'}For${user.user_type ==='mentee' ? 'Mentee' : 'Mentor'}&${user.user_type ==='mentee' ? 'mentee_id' : 'mentor_id'}=${user.user_id}&relationship=accepted`)
      .then(response => response.json())
      .then(function(json){
        this.setState({people: json});
      }.bind(this));
    }.bind(this))
  }

  render () {
    const {profile, auth} = this.props;
    return (
      <div>
        { auth.facebook_id ? <Layout people={this.state.people} auth={auth} {...profile} /> : <div className="logged-out"> Sorry you are not logged in. Please login to view your profile.</div>}
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
        {profile.bio}
      </div>
    </div>

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
    {
      profile.people[0].status == 0 ? null :
      <section className="network">
        <div>
          <div className="section-headers">{profile.user_type === 'mentee' ? 'My Mentors' : 'My Mentees'}</div>
            {
              profile.people.map((person,id) => (
                <Link key={id} to={profile.auth.facebook_id === person.facebook_id ? '/profile' : `/profile/${person.facebook_id}`}>
                  <div className="follower" style={{backgroundImage: `url(${person.image_url})`}}>
                      {console.log(profile)}
                  </div>
                </Link>
              ))
            }
        </div>
      </section>
    }
  </center>

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile);

export {Layout};
