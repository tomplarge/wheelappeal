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

import MapPage from './map'
class wheelappeal extends Component {

  render() {
    return (
      <Router>
        <Scene key = 'root'>
          <Scene key = 'mappage' title="MapPage" component = {(props) => <MapPage {...props}/>} hideNavBar = {true}  />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('wheelappeal', () => wheelappeal)
