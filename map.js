import MapView from 'react-native-maps';

import React, {Component} from "react";

import {
    Text,
    View,
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

export default class MapPage extends Component {
  constructor(props) {
    super(props);

    const markers = [
      {
        key:0,
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
      },
      {
        key:1,
        coordinate: {
          latitude: LATITUDE + 0.004,
          longitude: LONGITUDE - 0.004,
        },
      },
      {
        key:2,
        coordinate: {
          latitude: LATITUDE - 0.004,
          longitude: LONGITUDE - 0.004,
        },
      },
    ];

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers,
    }
  }

  onRegionChange(region) {
    this.setState({region})
  }

  render() {
    return (
      <MapView
        style={ styles.map }
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key = {marker.key}
            coordinate={marker.coordinate}
            title={marker.key.toString()}
          />
        ))}
      </MapView>
    );
  }
}
