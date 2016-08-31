import React, { Component } from 'react';
import './css/signup.css';


const MenteeForm = props =>
  <div id="menteeFields">
    <div className="field-label">Grade</div>
    <input type="text"
           className="input-text-field"
           name="grade"
    />
    <div className="field-label">Interests</div>
    <input type="text"
           className="input-text-field"
           name="interest"
    />
    <div className="field-label">Stem Field</div>
    <StemFieldSelect />
    <div className="field-label">Bio</div>
    <textarea type="text"
           className="input-text-field"
           name="bio"
           rows="6"
    ></textarea>
    <SignUpButtons {...props}/>
  </div>

const MentorForm = props =>
  <div id="mentorFields">
    <div className="field-label">School</div>
    <input type="text" className="input-text-field" name="school"/>
    <div className="field-label">Grad Year</div>
    <input type="text" className="input-text-field" name="grad_year"/>
    <div className="field-label">Major</div>
    <input type="text" className="input-text-field" name="major"/>
    <div className="field-label">Stem Field</div>
    <StemFieldSelect />
    <div className="field-label">Skills</div>
    <input type="text" className="input-text-field" name="skills"/>
    <div className="field-label">Bio</div>
    <textarea rows="6" type="text" className="input-text-field" name="bio"></textarea>
    <SignUpButtons {...props}/>
  </div>

class StemFieldSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }

    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect (e) {
    this.setState({ selected: e.target.value})
  }
  render() {
    return (
      <select type="text"
              value={this.state.selected}
              onChange={this.handleSelect}
              className="input-text-field"
              name="stem_tags"
      >
        <option value="" disabled>Select your option</option>
        <option value="sciene">Science</option>
        <option value="technology">Technology</option>
        <option value="engineering">Engineering</option>
        <option value="mathematics">Mathmatics</option>
      </select>
    )
  }

}
const SignUpButtons = props =>
  <div className="signup-buttons">
      <span onClick={props.closePortal} className="signup-button">cancel</span>
     <span onClick={props.handleSubmit} className="signup-button">submit</span>
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
        return <MenteeForm {...this.props}/>;
      case 'mentor':
        return <MentorForm {...this.props}/>;
      default:
        return null;
    }
  }

  showForm (e) {
    this.setState({
      type: e.target.value
    });
  }

  handleChange() {

  }
  render() {
    return (
      <form id="form" onChange={(e) => this.props.handleFormChanges(e)}>
        <img className="profile-pic" src={this.props.values.image_url} role='presentation'/>
        <div className="field-label">First Name</div>
        <input type="text" className="input-text-field" name="first_name" defaultValue={this.props.values.first_name}/>
        <div className="field-label">Last Name</div>
        <input type="text" className="input-text-field" name="last_name" defaultValue={this.props.values.last_name}/>
        <div className="field-label">Email</div>
        <input type="text" className="input-text-field" name="email" defaultValue={this.props.values.email}/>
        <div style={{textAlign: 'center', margin: '10px 0px'}}>
          <span className="input-radio-field">
            <input type="radio" name="user_type" value="mentee" onClick={this.showForm}/> Mentee
          </span>
          <span className="input-radio-field">
            <input type="radio" name="user_type" value="mentor" onClick={this.showForm}/> Mentor
          </span>
        </div>
        {this.formType()}
      </form>
    );
  }
}





export default SignUp;
