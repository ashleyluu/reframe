import React, { Component } from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux';

import './css/mentors.css'

class MyMentors extends Component {
  constructor (props) {
    super(props);
    this.state = {
      mentors: [],
      allMentors: [],
      relationships: []
    }
  }

  componentDidMount () {
    console.log(this.props)
    fetch('http://reframe.modernrockstar.com/lib/api.php?action=getAllMentorsWithStemTag')
    .then(response => response.json())
    .then( allMentors => {

      fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getAllRelationshipsForUser&user_id=${this.props.profile.user_id}&user_type=mentee`).then(response => response.json())
          .then(relationships => {
            const mentors = relationships.map(function(relationship){
              return allMentors.filter(function(mentor){
                return (mentor.user_id === relationship.mentor_id)
              })
            })
            this.setState(
              { mentors: mentors[0]}
            )

      })

    })
  }

  render () {
    return (
      <div id='list'>
        <h1>My Mentors</h1>
        {this.state.mentors.length === 0 ? <NoMentor/> :
          <div>
          {this.state.mentors.map((mentor, id) =>
            <div className="mentor" key={id}>
              <div className="mentor_column">
                <img src={mentor.image_url} className="mentor_photo" alt="user"/>
              </div>
              <div className="mentor_column">
                <div className="mentor_text">{mentor.first_name} {mentor.last_name}</div>
              </div>
              <div className="mentor_column">
                <div className="text">{mentor.stem_tags}</div>
              </div>
              <div className="mentor_column mentor_action">
                <Link to={`profile/${mentor.facebook_id}`} ><span className="mentor_button">profile</span></Link>
              </div>
            </div>
          )}
          </div>
        }
      </div>
    )
  }
}

const NoMentor = () =>
  <div className="mentor" style={{padding: '50px', textAlign: 'center'}}>
    <div className="mentor_text">
      Sorry you dont have any mentors yet. Keep applying to find the perfect fit.
    </div>
  </div>

const mapStateToProps = (state, props) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(MyMentors);
