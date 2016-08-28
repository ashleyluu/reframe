import React, { Component } from 'react';
import './App.css';


const MenteeForm = props =>
  <div id="menteeFields">
    grade: <input type="text" id="grade"/>
    interests: <input type="text" id="interest"/>
    stem field: <input type="text" id="stem-tags"/>
    bio: <input type="text" id="bio"/>
  </div>

const MentorForm = props =>
  <div id="mentorFields">
    school: <input type="text" id="school"/>
    grad year: <input type="text" id="grad-year"/>
    major: <input type="text" id="major"/>
    stem field: <input type="text" id="stem-tags"/>
    skills: <input type="text" id="skills"/>
    bio: <input type="text" id="bio"/>
  </div>

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: '',
    }

    this.formType = this.formType.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  formType () {
    switch (this.state.type) {
      case 'mentee':
        return <MenteeForm values={this.props.values}/>;
      case 'mentor':
        return <MentorForm values={this.props.values}/>;
      default:
        return null;
    }
  }

  showForm (e) {
    this.setState({
      type: e.target.value
    });
  }

  render() {
    return (
      <form id="form">
        <img className="profile-pic" src={this.props.values.image_url} role='presentation'/>
        first name: <input type="text" id="fname" defaultValue={this.props.values.first_name}/>
        last name: <input type="text" id="lname" defaultValue={this.props.values.last_name}/>
        email address: <input type="text" id="email" defaultValue={this.props.values.email}/>
        <input type="radio" name="profileType" value="mentee" onClick={this.showForm}/> Mentee
        <input type="radio" name="profileType" value="mentor" onClick={this.showForm}/> Mentor
        {this.formType()}
      </form>
    );
  }
}





export default SignUp;
