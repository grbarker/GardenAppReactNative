import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import axios from 'axios';
import { white } from '../utils/colors'
import {
  getUserPosts, lessUserPosts, getUserPostsSuccess, getUserPostsFailure,
  getMoreUserPostsSuccess, getMoreUserPostsFailure
} from '../actions/userposts'

class UserPosts extends Component {


  nextUserPosts = (token, uri) => {
    const { dispatch } = this.props
    console.log("Dispatching getUsers")
    dispatch(getUserPosts(dispatch, token, uri))
  }

  lessUserPosts = () => {
    const { dispatch } = this.props
    console.log("Dispatching lessUserPosts")
    dispatch(lessUserPosts())
  }

  showState = () => {
    console.log(this.props.state.userposts)
  }

  async componentDidMount() {
    const { dispatch, token, page } = this.props
    console.log(page);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/user/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      //console.log('FIRST API CALL RESPONSEJSON....', responseJSON)
      dispatch(getUserPostsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const {  links, userpost_items, fetching, fetched_userposts, token, error, state, page } = this.props
    //TRYING TO SET UP A 'NEXT' Button
    //TRYING TO PASS THE 'NEXT' LINK DOWN TO THE TextButton
    //AND THEN FIGURE OUT HOW TO dispatch getUsers
    //console.log("Here's the token!.....", token)
    //console.log("Fetching the next set of userposts.")
    if (fetched_userposts == true) {
      console.log(page);
      let uri = '/api/user/posts'
      //console.log("Here are the links!.....", links.next)
      if (links.next) {
        uri = links.next;
      }
      //console.log(state)
      //console.log("Trying to get the uri.....", uri)
      return (
        <ScrollView>
          <View>
            {userpost_items.map((userpost_item, index) => (
              <View key = {userpost_item.id} style = {styles.container}>
                <Text style = {styles.text}>{userpost_item.user}: </Text>
                <Text style = {styles.text}>{userpost_item.body}</Text>
              </View>
            ))}
          </View>
          {(links.next) ?
            <TextButton style={{margin: 20}} onPress={e => this.nextUserPosts(token, uri)}>
              More Posts
            </TextButton>
            : null
          }
          <TextButton style={{margin: 20}} onPress={e => this.lessUserPosts()}>
            Less Posts
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
      fetched_userposts: state.userposts.fetched,
      page: state.userposts.page,
      userpost_items: state.userposts.items,
      links: state.userposts.links,
      token: state.auth.token,
      error: state.userposts.error,
      state: state
    };
}


export default connect(mapStateToProps)(UserPosts);

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
