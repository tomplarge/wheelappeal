/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';

import Button from 'react-native-animated-button';
import {Actions} from 'react-native-router-flux';

export default class home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style = {{top: 60, justifyContent:'center',alignItems: 'center'}}>
          <Text style={styles.welcome}>
            wheel appeal
          </Text>
          <Text style={styles.subtext}>
            the app you never knew you always needed
          </Text>
          <Button
            style={{marginTop:10,alignSelf:'center', height: 55,width:80, backgroundColor: '#14E53A', borderWidth: 1 / PixelRatio.get(), borderColor: '#0033FF', borderRadius: 5}}
            imageStyle={{height:50,width:50}}
            activeStyle={{marginTop:10,alignSelf:'center',height: 55,width:90, backgroundColor: '#14E53A', borderWidth: 1 / PixelRatio.get(), borderColor: '#0033FF', borderRadius: 5}}
            text="Login"
            animated={true}
            type="iconLeft"
            onLongPress={() => {
          ;
        }}
            onPress={() => {

        }}
            onPressIn={() => {
            console.log("onPressIn...");
        }}
            onPressOut={() => {
          Actions.mappage();
        }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#1789FC",
  },
  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "#14E53A",
  },
  subtext: {
    fontSize: 20,
    color: "white",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});
