import React, { Component } from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux';

import './css/mentors.css'

class Mentors extends Component {
  constructor (props) {
    super(props);
    this.state = {mentors: []}
  }

  componentDidMount () {
    fetch('http://reframe.modernrockstar.com/lib/api.php?action=getAllMentorsWithStemTag')
    .then(response => response.json())
    .then(function(json){this.setState({mentors: json})}.bind(this))
  }

  render () {
    return (
      <div id='list'>
        <h1>Mentors List</h1>
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
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Mentors);
