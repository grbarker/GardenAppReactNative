import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { getPlants, getPlantsSuccess, getPlantsFailure } from '../actions/plants'

class Plants extends Component {

  async componentDidMount() {
    const { dispatch, token } = this.props
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/plants`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      //console.log(responseJSON)
      dispatch(getPlantsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { plant_items, fetching, fetched_plants } = this.props
    if (fetched_plants == true) {
      return (
        <ScrollView>
          <View>
            {plant_items.map((plant_item, index) => (
              <View key = {plant_item.id} style = {styles.container}>
                <Text style = {styles.text}>{plant_item.name}</Text>
                <Text style = {styles.text}>Grown by {plant_item.grower}</Text>
                <Text style = {styles.text}>
                  Planted <Moment element={Text} fromNow>{plant_item.timestamp}</Moment>
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View>
          <Text>Hello broseph</Text>
        </View>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      fetched_plants: state.plants.fetched,
      plant_items: state.plants.items,
      token: state.auth.token
    };
}


export default connect(mapStateToProps)(Plants);

const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
