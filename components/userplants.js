import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import axios from 'axios';
import { white } from '../utils/colors'
import {
  getUserPlants, lessUserPlants, getUserPlantsSuccess, getUserPlantsFailure,
  getMoreUserPlantsSuccess, getMoreUserPlantsFailure
} from '../actions/userplants'

class UserPlants extends Component {


  nextUserPlants = (token, uri) => {
    const { dispatch } = this.props
    console.log("Dispatching getUserPlants")
    dispatch(getUserPlants(dispatch, token, uri))
  }

  lessUserPlants = () => {
    const { dispatch } = this.props
    console.log("Dispatching lessUserPlants")
    dispatch(lessUserPlants())
  }

  showState = () => {
    console.log(this.props.state.userplants)
  }

  async componentDidMount() {
    const { dispatch, token, page } = this.props
    console.log(page);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/user/plants`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      //console.log('FIRST API CALL RESPONSEJSON....', responseJSON)
      dispatch(getUserPlantsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const {  links, userplant_items, fetching, fetched_userplants, token, error, state, page } = this.props
    //TRYING TO SET UP A 'NEXT' Button
    //TRYING TO PASS THE 'NEXT' LINK DOWN TO THE TextButton
    //AND THEN FIGURE OUT HOW TO dispatch getUsers
    //console.log("Here's the token!.....", token)
    //console.log("Fetching the next set of userplants.")
    if (fetched_userplants == true) {
      console.log(page);
      let uri = '/api/user/plants'
      //console.log("Here are the links!.....", links.next)
      if (links.next) {
        uri = links.next;
      }
      //console.log(state)
      //console.log("Trying to get the uri.....", uri)
      return (
        <ScrollView>
          <View>
            {userplant_items.map((userplant_item, index) => (
              <View key = {userplant_item.id} style = {styles.container}>
                <Text style = {styles.text}>{userplant_item.grower} planted {userplant_item.name}: </Text>
                <Text style = {styles.text}>
                  <Moment element={Text} fromNow>{userplant_item.timestamp}</Moment>
                </Text>
              </View>
            ))}
          </View>
          {(links.next) ?
            <TextButton style={{margin: 20}} onPress={e => this.nextUserPlants(token, uri)}>
              More Plants
            </TextButton>
            : null
          }
          <TextButton style={{margin: 20}} onPress={e => this.lessUserPlants()}>
            Less Plants
          </TextButton>
        </ScrollView>
      )
    } else if (error) {
      return (
        <View style = {styles.errorContainer}>
          <Text style = {styles.text}>{error}</Text>
        </View>
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
      fetched_userplants: state.userplants.fetched,
      page: state.userplants.page,
      userplant_items: state.userplants.items,
      links: state.userplants.links,
      token: state.auth.token,
      error: state.userplants.error,
      state: state
    };
}


export default connect(mapStateToProps)(UserPlants);

const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   errorContainer: {
      padding: 5,
      marginTop: 3,
      marginBottom: 30,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
