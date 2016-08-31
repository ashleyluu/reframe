import React, { Component } from 'react';
// import { Link } from 'react-router';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux';

import './css/mentors.css'

class Applicants extends Component {
  constructor (props) {
    super(props);
    this.state = {mentors: [{status: '0'}]}
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentDidMount () {
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getAllMenteesForMentor&mentor_id=${this.props.profile.user_id}&relationship=applied`)
    .then(response => response.json())
    .then(function(json){this.setState({mentors: json})}.bind(this))
  }
  handleAccept (menteeId) {
    // fetch(`http://reframe.modernrockstar.com/lib/api.php?action=acceptMentee&mentee_id=${menteeId}&mentor_id=${this.props.profile.user_id}`)
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=acceptMentee&mentee_id=${menteeId}&mentor_id=${this.props.profile.user_id}`).then(response => response.json).then(function () {
      fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getAllMenteesForMentor&mentor_id=${this.props.profile.user_id}&relationship=applied`)
      .then(response => response.json())
      .then(function(json){this.setState({mentors: json})}.bind(this))
    }.bind(this))
  }
  render () {
    return (
      <div id='list'>
        <h1>Applicants List</h1>
        {this.state.mentors[0].status == 0 ? <NoMentor/> :
          <div>
          {this.state.mentors.map((mentor, id) =>
            <div className="mentor-flex" key={id}>
              <div className="mentor-flex-child">
                <img src={mentor.image_url} className="mentor_photo" alt="user"/>
                <div>
                  <div className="mentor_text">{mentor.first_name} {mentor.last_name}</div>
                  <div className="text">{mentor.stem_tags}</div>
                </div>
              </div>
              <div className="mentor-flex-child-right mentor_action">
                <div onClick={()=> this.handleAccept(mentor.user_id)}><span className="mentor_button">Accept</span></div>
                <div><span className="mentor_button">Defer</span></div>
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
      Sorry you dont have any new applicants right now.
    </div>
  </div>

const mapStateToProps = (state, props) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Applicants);
