import MapView from 'react-native-maps';
import React, {Component} from "react";
import PreviewScrollItem from './PreviewScrollItem';
import SearchBar from 'react-native-searchbar'
import Icon from "react-native-vector-icons/MaterialIcons"
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

const previewBlockHeight = 75;
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
    this.setState({region});
  }

  componentWillMount(){
    //this.render()
  }

  componentDidMount(){
    //this.searchbar.show();
  }

  render() {
    const {
      markers,
    } = this.state;

    return (
      <View style = {styles.container}>
          <SearchBar
            ref={(ref) => this.searchbar = ref}
            placeholder='Search Food Trucks'
          />
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
        <View
          style = {{
            top: 20,
            left: screen.width-50,
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
          }}
        >
          <Icon.Button size={35} style={{height: 50}}name="search" backgroundColor="#3b5998" onPress={() => {this.searchbar.show()}}/>
        </View>
        <FlatList
          style = {{
            top: screen.height - 100,
            position: 'absolute',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
          }}
          horizontal={true}
          data={markers}

          renderItem={({ marker }) => (
            <PreviewScrollItem style = {{top: 0}}/>
          )}
        />
      </View>
    );
  }
}
