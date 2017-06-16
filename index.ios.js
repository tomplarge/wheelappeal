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
import MapPage from './map'
import AnimatedMap from './animated_map'
class wheelappeal extends Component {

  render() {
    return (
      <Router>
        <Scene key = 'root'>
          <Scene key = 'animatedmap' title="AnimatedMap" component = {(props) => <AnimatedMap {...props}/>} hideNavBar = {true} />
          <Scene key = 'home' title="Home" component = {(props) => <Home {...props}/>} hideNavBar = {true} initial = {true}/>
          <Scene key = 'mappage' title="MapPage" component = {(props) => <MapPage {...props}/>} hideNavBar = {true}  />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('wheelappeal', () => wheelappeal)
