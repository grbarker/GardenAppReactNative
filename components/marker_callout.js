import React, { Component } from 'react';
import { ScrollView, ListView, View, Text, Image, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native'
import { MapView, Marker } from 'expo';
import { connect } from 'react-redux'
import { white, grey, my_blue, purple } from '../utils/colors'
import StreetView from 'react-native-streetview';

class CalloutView extends Component {

  alertMarkerInfo = (location) => {
   alert(location.address)
  }

  //Note: the following function is called for each marker upon rendering them on the map.
  //The CalloutView "Mounts" apparently even when the marker had not been pressed which is
  //what is supposed to trigger the CalloutView to mouunt
  async componentDidMount() {
    const { location } = this.props

    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/streetview?size=200X200&location=${location.address}&key=AIzaSyDhPSBWrhJwAnF7awFAIq2fzba7AWM8AuQ`, {
          method: 'GET',
        }
      );
      //console.log("This is the response to the IMAGE request!!!!!", response)
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { location } = this.props
    const uri = `https://maps.googleapis.com/maps/api/streetview?size=200X200&location=2944 SE Powell Blvd, Portland, OR 97202&key=AIzaSyDhPSBWrhJwAnF7awFAIq2fzba7AWM8AuQ`

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style = {styles.popupcontainer}>
          <Image source={{uri: uri}} style={{width: 220, height: 220}} />
          <Text style={{fontSize: 16, color: 'grey'}}>{location.address}</Text>
          <Text style={{fontSize: 16, color: 'grey'}}>---------------------------------</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <Text style={{fontSize: 18, color: 'grey'}}>{location.gardens.length + ' gardens'}</Text>
              {location.gardens.map((garden, index) => {
                return (
                  <Text key={index} style={{fontSize: 16, color: 'grey'}}>{garden.name}</Text>
                )
              })}
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'grey'}}>plants list length</Text>
              {location.gardens.map((garden, index) => {
                garden.plants.map((plant, index) => {
                  return (
                    <Text key={index} style={{fontSize: 16, color: 'grey'}}>{plant}</Text>
                  )
                })
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      token: state.auth.token,
      location: ownProps.location
    };
}

export default connect(mapStateToProps)(CalloutView);

const styles = StyleSheet.create ({
   mapcontainer: {
      padding: 5,
      marginTop: 5,
      backgroundColor: '#d9f9b1',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   popupcontainer: {
      flex: 1,
      padding: 2,
      marginTop: 1,
      backgroundColor: '#d9f9b1',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
