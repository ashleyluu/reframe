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
        <Navigation history={this.props.history}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
