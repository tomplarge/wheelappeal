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

import MapPage from './in_use/map'
import TitlePage from './in_use/title'
import TruckView from './in_use/truck_view'

class wheelappeal extends Component {

  animationStyle = (props) => {
    const { layout, position, scene } = props;

    const direction = (scene.navigationState && scene.navigationState.direction) ?
      scene.navigationState.direction : 'horizontal';

    const index = scene.index;

    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const height = layout.initHeight;

    const opacity = position.interpolate({
      inputRange,
      outputRange: [1, 1, 1], //This will prevent the scene from Fading out
    });

    const scale = position.interpolate({
      inputRange,
      outputRange: [1, 1, 1], //This will keep the scale the same
    });

    let translateX = 0;
    let translateY = 0;

    switch (direction) {
      case 'horizontal':
        translateX = position.interpolate({
          inputRange,
          outputRange: [0, 0, 0],
        });
        break;
      case 'vertical':
        translateY = position.interpolate({
          inputRange,
          outputRange: [0, 0, 0],
        });
        break;
    }

    return {
      opacity,
      backgroundColor: 'transparent', // Fixes white border
      transform: [
        { scale },
        { translateX },
        { translateY },
      ],
    };
  };

  render() {
    return (
      <Router>
        <Scene key = 'root'>
          <Scene key = 'title'  component = {(props) => <TitlePage {...props}/>} hideNavBar/>
          <Scene key = 'mappage'  component = {(props) => <MapPage {...props}/>}  animationStyle={this.animationStyle} hideNavBar/>
          <Scene key = 'truck_view' component = {(props) => <TruckView {...props}/>} direction = 'vertical' hideNavBar/>
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('wheelappeal', () => wheelappeal)
