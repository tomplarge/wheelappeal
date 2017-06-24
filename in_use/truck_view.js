import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Dimensions
} from 'react-native';

const screen = Dimensions.get('window');
import Button from 'react-native-animated-button';
import {Actions} from 'react-native-router-flux';

export default class TruckView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.titleContainer}>
          <Text style = {styles.titleText}> Truck Awesome </Text>
        </View>
        <View style = {styles.menuContainer}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'orange'
  },
  titleText: {
    fontSize: 40,
    alignSelf:'center'
  },
  titleContainer: {
    height: screen.height/8,
    width: screen.width,
    backgroundColor: 'red'
  },
  menuContainer: {
    height: screen.height/2,
    width: screen.width,
    backgroundColor: 'blue'
  }
});
