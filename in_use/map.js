import MapView from 'react-native-maps';
import React, {Component} from "react";
import TruckView from './truck_view';
import SearchBar from 'react-native-searchbar';
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from 'react-native-modal';
//import PreviewPanController from './PreviewPanController'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    FlatList,
    TouchableOpacity
} from "react-native";

const GREEN = '#4fc29f'
const ORANGE = '#ffc33d'
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const screen = Dimensions.get('window');

const previewBlockHeight = 75;
const previewBlockWidth = screen.width*7/10;
const previewBlockSpacing = 10;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
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
      justifyContent: 'center',
      width: previewBlockWidth,
      height: previewBlockHeight,
      marginHorizontal: previewBlockSpacing,
      backgroundColor: GREEN,
      overflow: 'hidden',
      borderRadius: 3,
      borderColor: '#000',
  },
});

export default class MapPage extends Component {
  constructor(props) {
    super(props);
    truckData = [
      {name: 'Burreato', cuisine:'mexican', price:1, waitTime:10,
        'menu':[{item:'burrito', price: 7, id:0}, {item:'taco', price: 3, id:1},{item:'combo', price: 10, id:2}]},
      {name: 'The Wok', cuisine:'chinese', price:2, waitTime:5,
        'menu':[{item:'dumplings', price: 3, id:0}, {item:'lo mein', price: 7, id:1},{item:'combo', price: 10, id:2}]},
      {name: 'Get Phat Here', cuisine:'american', price:4, waitTime:15,
        'menu':[{item:'burger', price: 7, id:0}, {item:'fries', price: 3, id:1},{item:'combo', price: 10, id:2}]}
    ];
    markers = [
      {
        key:0,
        title: '1',
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
      },
      {
        key:1,
        title: '2',
        coordinate: {
          latitude: LATITUDE + 0.004,
          longitude: LONGITUDE - 0.004,
        },
      },
      {
        key:2,
        title: '3',
        coordinate: {
          latitude: LATITUDE - 0.004,
          longitude: LONGITUDE - 0.004,
        },
      },
    ];

    region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    modalOpen = false
    this.state = {
      truckIndex: null,
      modalOpen,
      region,
      markers,
      showMyLocation: false,
    }
  }

  onRegionChange = (reg) => {
    if (this.state.showMyLocation == true){
      this.showCurrentLocation();
    }

    this.setState({region: reg, showMyLocation: false});
  }

  componentWillMount(){
    this.setState({modalOpen: false})
  }

  componentDidMount = () => {

  }

  showCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
      {
        this.setState({
          region:
          {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0922
          },
        });
    });
  }


  render() {
    const {
      markers,
    } = this.state;

    return (
      <View style = {styles.container}>
      <Modal isVisible={this.state.modalOpen} style = {{top: 0}}>
        <TruckView
          truckName = {this.state.truckIndex === null ? null : truckData[this.state.truckIndex]['name']}
          onPress = {() => {this.setState({modalOpen: false})}}
          menu = {this.state.truckIndex === null ? null : truckData[this.state.truckIndex]['menu']}/>
      </Modal>
        <SearchBar
          ref={(ref) => this.searchbar = ref}
          placeholder='Search Food Trucks'
        />
        <MapView
        ref={map => this.map = map}
          showsUserLocation
          style={ styles.map }
          region={this.state.region}
          onRegionChange={() => {this.onRegionChange()}}
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
          <Icon.Button size={35} style={{height: 50}} name="search" backgroundColor="#3b5998"
            onPress={() => {this.searchbar.show()}}
          />
        </View>
        <View
          style = {{
            top: 40,
            left: screen.width-50,
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
          }}
        >
          <Icon.Button size={35} style={{height: 50}} name="my-location" backgroundColor="#3b5998"
            onPress={() => {
              this.setState({
                showMyLocation: true,
              });
            }}
          />
        </View>
        <FlatList
          style = {{
            top: screen.height - 100,
            position: 'absolute',
          }}
          horizontal={true}
          data={markers}

          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => {this.setState({modalOpen: true, truckIndex: item.key})}}
              style = {styles.previewBlock}>
                <Text style = {{alignSelf: 'center', fontSize: 20}}> {truckData[item.key].name} </Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}
