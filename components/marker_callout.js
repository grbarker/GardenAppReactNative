import React, { Component } from 'react';
import { ScrollView, ListView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { MapView, Marker } from 'expo';
import { connect } from 'react-redux'
import { white, grey, my_blue, purple } from '../utils/colors'

class CalloutView extends Component {

  alertMarkerInfo = (location) => {
   alert(location.address)
  }

  render() {
    const { location } = this.props

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end'
        }}>
        <View style = {styles.popupcontainer}>
          <Text style={{fontSize: 16, color: 'grey'}}>{location.address}</Text>
          <Text style={{fontSize: 16, color: 'grey'}}>---------------------------------</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <View>
              <Text style={{fontSize: 18, color: 'grey'}}>{location.gardens.length + ' gardens'}</Text>
              {location.gardens.map((garden, index) => {
                return (
                  <Text key={index} style={{fontSize: 16, color: 'grey'}}>{garden}</Text>
                )
              })}
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'grey'}}>{location.plants.length + ' plants'}</Text>
              {location.plants.map((plant, index) => {
                return (
                  <Text key={index} style={{fontSize: 16, color: 'grey'}}>{plant}</Text>
                )
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
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
