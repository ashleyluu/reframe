import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Layout} from './Profile';

class OtherProfile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      relationship: {
        status: '0'
      }
    }
    this.handleApply = this.handleApply.bind(this);
  }

  componentDidMount () {
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId&facebook_id=${this.props.params.id}`)
    .then( response => response.json() )
    .then( function (json){ this.setState({
      profile: json[0]
    })
      return json[0];
    }.bind(this))

    .then(function(json) {
      if(json.user_type ==='mentor') {
        fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getRelationship&mentor_id=${json.user_id}&mentee_id=${this.props.profile.user_id}`).then(response => response.json()).then(json=> this.setState({relationship: json[0]}))
      }
    }.bind(this))


  }

  handleApply () {
    fetch(`http://reframe.modernrockstar.com/lib/api.php?action=applyForMentorship&mentor_id=${this.state.profile.user_id}&mentee_id=${this.props.profile.user_id}`)
    .then(response => console.log(response))
    .then(function(){return fetch(`http://reframe.modernrockstar.com/lib/api.php?action=getRelationship&mentor_id=${this.state.profile.user_id}&mentee_id=${this.props.profile.user_id}`)
  }.bind(this))
    .then(response => response.json())
    .then(function(json){ this.setState({relationship: json[0]})}.bind(this))
  }

  render () {
    let button;
    if(this.state.relationship.relationship === 'accepted'){
      button = (<div className="button button-invert">Accepted</div>);
    } else if(this.state.relationship.relationship === 'applied') {
      button = (<div className="button button-yellow">Pending</div>);
    }
    else {
      button = (<div className="button" onClick={this.handleApply}>Apply</div>);
    }
    return (
      <Layout {...this.state.profile}>
        {button}
        <div className="button">follow</div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(OtherProfile);
