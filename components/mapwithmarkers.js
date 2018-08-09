import React, { Component } from 'react';
import { ScrollView, ListView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { Callout } from 'react-native-maps';
import { MapView, Marker } from 'expo';
import { connect } from 'react-redux'
import { white, grey, my_blue, purple } from '../utils/colors'
import { LocationInfo } from './location_info'
import CalloutView from './marker_callout'

class Map extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Home',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Auth')}
          title="Logout"
          color= {white}
        />
      )
    }
  }

  state = {
    isLoading: true,
    locations: [],
    infoWindowOpen: false,
    selectedLocation: {}
  };


  alertMarkerInfo = (location) => {
   alert(location.address)
  }


  alertCalloutPress = () => {
   alert("Callout Has Been Pressed!!!")
  }


  openInfoWindow = (location) => {
    this.setState({
     infoWindowOpen: true,
     selectedLocation: location
   })
  }



  closeInfoWindow = (location) => {
    const { infoWindowOpen } = this.state
    if (infoWindowOpen) {
      this.setState({
       infoWindowOpen: false,
       selectedLocation: null
     })
    }
  }


  componentDidMount() {
    this.fetchMarkerData();
  }

  async fetchMarkerData() {
    const { token } = this.props
    const { state } = this.state
    console.log(token);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/locations/maps`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      console.log("This is the response!!!!!", responseJSON )
      this.setState({
        isLoading: false,
        locations: responseJSON
      });
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { isLoading, locations, infoWindowOpen, selectedLocation } = this.state

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end'
        }}>
        <MapView
          style={{
            flex: 5,
            justifyContent: 'flex-end'
          }}
          initialRegion={{
            latitude: 45.487292,
            longitude: -122.635435,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={e => this.closeInfoWindow()}
        >
        {isLoading
          ? null
          : (locations.map((location, index) => {
              console.log(index, location);
              console.log(index, ": INDEX");
              const coord = { latitude: location.latitude, longitude: location.longitude };
              const metadata = `Status: ${location.statusValue}`;
              console.log('coord: ', coord);
              const gardens = location.gardens.toString();
              const plants = location.plants.toString();

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coord}
                  title={location.address}
                  description={gardens +' | ' + plants}
                  onCalloutPress={e => this.alertCalloutPress()}
                >
                  <Callout>
                    <CalloutView location={location} />
                  </Callout>
                </MapView.Marker>
              );
            }))
          }
        </MapView>

        {infoWindowOpen
        ? <View style = {styles.popupcontainer}>
            <Text style={{fontSize: 16, color: 'grey'}}>{selectedLocation.address}</Text>
            <Text style={{fontSize: 16, color: 'grey'}}>---------------------------------</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
              <View>
                <Text style={{fontSize: 18, color: 'grey'}}>{selectedLocation.gardens.length + ' gardens'}</Text>
                {selectedLocation.gardens.map((garden, index) => {
                  return (
                    <Text key={index} style={{fontSize: 16, color: 'grey'}}>{garden}</Text>
                  )
                })}
              </View>
              <View>
                <Text style={{fontSize: 18, color: 'grey'}}>{selectedLocation.plants.length + ' plants'}</Text>
                {selectedLocation.plants.map((plant, index) => {
                  return (
                    <Text key={index} style={{fontSize: 16, color: 'grey'}}>{plant}</Text>
                  )
                })}
              </View>
            </View>
          </View>
        : null
        }
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      token: state.auth.token
    };
}

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create ({
   mapcontainer: {
      padding: 5,
      marginTop: 5,
      backgroundColor: '#d9f9b1',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   popupcontainer: {
      flex: 3,
      padding: 2,
      marginTop: 1,
      backgroundColor: '#d9f9b1',
      justifyContent: 'space-evenly',
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
