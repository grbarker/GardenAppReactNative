import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import axios from 'axios';
import { white } from '../utils/colors'
import { getFollowers, lessFollowers, getFollowersSuccess, getFollowersFailure, getMoreFollowersSuccess, getMoreFollowersFailure } from '../actions/followers'

class Followers extends Component {


  nextFollowers = (token, uri) => {
    const { dispatch } = this.props
    console.log("Dispatching getFollowers")
    dispatch(getFollowers(dispatch, token, uri))
  }

  lessFollowers = () => {
    const { dispatch } = this.props
    console.log("Dispatching lessFollowers")
    dispatch(lessFollowers())
  }

  showState = () => {
    console.log(this.props.state.followers)
  }

  async componentDidMount() {
    const { dispatch, token, page } = this.props
    console.log(page);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/user/followers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      console.log('FIRST API CALL RESPONSEJSON....', responseJSON)
      dispatch(getFollowersSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const {  links, follower_items, fetching, fetched_followers, token, error, state } = this.props
    //TRYING TO SET UP A 'NEXT' Button
    //TRYING TO PASS THE 'NEXT' LINK DOWN TO THE TextButton
    //AND THEN FIGURE OUT HOW TO dispatch getFollowers
    console.log("Here's the token!.....", token)
    console.log("Fetching the next set of followers.")
    if (fetched_followers == true) {
      let uri = '/api/followers'
      //console.log("Here are the links!.....", links.next)
      if (links.next) {
        uri = links.next;
      }
      //console.log(state)
      console.log("Trying to get the uri.....", uri)
      return (
        <ScrollView>
          <View>
            {follower_items.map((follower_item, index) => (
              <View key = {index} style = {{flex: 1, flexDirection: 'row'}}>
                <View style = {styles.avatarcontainer}>
                  <Image
                    style={{width: 75, height: 75}}
                    source={{uri: follower_item._links.avatar}}
                  />
                </View>
                <View style = {styles.userinfocontainer}>
                  <Text style = {styles.text}>Following: {user.followed_count}</Text>
                  <Text style = {styles.text}>Followers: {user.follower_count}</Text>
                  <Text style = {styles.text}>{user.post_count} posts</Text>
                  <Text style = {styles.text}>
                    Last seen <Moment element={Text} fromNow>{user.last_seen}</Moment>
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {(links.next) ?
            <TextButton style={{margin: 20}} onPress={e => this.nextFollowers(token, uri)}>
              More Followers
            </TextButton>
            : null
          }
          <TextButton style={{margin: 20}} onPress={e => this.lessFollowers()}>
            Less Followers
          </TextButton>
          <TextButton style={{margin: 20}} onPress={e => this.showState()}>
            Show State
          </TextButton>
            <View>
              {Object.values(links).map((link, index) => (
                <View key = {index} style = {styles.container}>
                  <Text style = {styles.text}>{link}</Text>
                </View>
              ))}
            </View>
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
      fetched_followers: state.followers.fetched,
      page: state.followers.page,
      follower_items: state.followers.items,
      links: state.followers.links,
      token: state.auth.token,
      error: state.followers.error,
      state: state
    };
}


export default connect(mapStateToProps)(Followers);

const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   avatarcontainer: {
      flex: 2,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
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
