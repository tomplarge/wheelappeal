/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
import React, { Component} from 'react';
import {
AppRegistry,
Navigator,
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from "./home";
import Second from "./second_view"
class wheelappeal extends Component {

  render() {
    return (
      <Router>
        <Scene key = 'root'>
          <Scene key = 'home' title="Home" component = {(props) => <Home {...props}/>} hideNavBar = {true} />
          <Scene key = 'second' title="Second" component = {(props) => <Second {...props}/>} hideNavBar = {true} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('wheelappeal', () => wheelappeal)
