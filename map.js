import MapView from 'react-native-maps';
import React, {Component} from "react";
import MapViewPanController from './MapViewPanController'
//import PreviewPanController from './PreviewPanController'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    FlatList
} from "react-native";

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const screen = Dimensions.get('window');

const previewBlockHeight = 100;
const previewBlockWidth = screen.width*7/10;
const previewBlockSpacing = 10;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },

  previewBlockContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: screen.height - previewBlockHeight,
  },

  previewBlock: {
    width: previewBlockWidth,
    height: screen.height,
    marginHorizontal: previewBlockSpacing,
    backgroundColor: 'green',
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
  },
});

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
      markers,
      scrollX_bool: true,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  onRegionChange(region) {
    this.setState({region})
  }

  onStartShouldSetPanResponder = (e) => {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { pageY } = e.nativeEvent;
    const topOfPreviewBlock = previewBlockHeight;
    const topOfTap = screen.height - pageY;
    return topOfTap < topOfPreviewBlock;
  }

  onMoveShouldSetPanResponder = (e) => {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { pageY } = e.nativeEvent;
    const topOfPreviewBlock = previewBlockHeight;
    const topOfTap = screen.height - pageY;
    return topOfTap < topOfPreviewBlock;
  }

  render() {
    const {
      markers,
    } = this.state;

    return (
      <View style = {styles.container}>
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
          <FlatList
            horizontal={true}
            data={markers}
            renderItem={({ marker }) => (
              <MapViewPanController/>
            )}
          />
      </View>
    );
  }
}
