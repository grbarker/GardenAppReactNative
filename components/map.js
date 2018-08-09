import React, { Component } from 'react';
import { Button } from 'react-native'
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white } from '../utils/colors'

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
    plants: []
  };

  componentDidMount() {
    this.fetchMarkerData();
  }

  async fetchMarkerData() {
    const { token } = this.props
    console.log(token);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/plants/map`, {
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
        plants: responseJSON.items
      })
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    var coords = [];
    var locations_for_markers = [];
    var markers = []
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 45.487292,
          longitude: -122.635435,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {this.state.isLoading
        ? null
        : this.state.plants.map((plant, index) => {
          if (plant.lat !== null && plant.lon!== null) {
            const coord = {
              latitude: plant.lat,
              longitude: plant.lon
            };
            if (coords.includes(coord)) {
              index = coords.indexOf(coord);
              locations_for_markers[index].plants.push(plant.name);
            } else {
              coords.push(coord);
              location_for_markers = { 'coord': coord, 'address': plant.address, 'plants': [plant.name] }
              locations_for_markers.push(location_for_markers)
            }
          } else {
            console.log("OOPS!!! NO LOCATION DATA FOR THIS PLANT")
          }
          locations_for_markers.map((location, index) => {
            console.log(location)
            const metadata = `Status: ${location.statusValue}`;
            return (
              <MapView.Marker
                key={index}
                coordinate={location.coord}
                title={location.address}
                description={metadata}
              />
            );
          })
          })}
      </MapView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      token: state.auth.token
    };
}

export default connect(mapStateToProps)(Map);
