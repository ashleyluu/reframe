import React, { Component } from 'react';
import './css/App.css';

import Navigation from './Navigation';

class App extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
        <Navigation {...this.props}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
