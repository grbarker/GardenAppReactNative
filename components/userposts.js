import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import AlteredTextButton from './AlteredTextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import axios from 'axios';
import {
  white, my_green, green, gray4, red, purple, orange, blue, my_blue,
  lightPurp, black, pink
} from '../utils/colors'
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

  inactiveButton = () => {
    var inactiveButtonPressed = true
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
    //TRYING TO PASS THE 'NEXT' LINK DOWN TO THE AlteredTextButton
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
        <ScrollView style={styles.scrollViewAsContainer}>
          <View style = {styles.scrollViewHeaderContainer}>
            <Text style = {styles.scrollViewHeaderText}>Here are you're most recent posts</Text>
          </View>
          <View>
            {userpost_items.map((userpost_item, index) => (
              <View key = {userpost_item.id} style = {styles.container}>
                <Text style = {styles.myGreenText}>{userpost_item.user}: </Text>
                <Text style = {styles.text}>{userpost_item.body}</Text>
              </View>
            ))}
          </View>
          <View style={styles.moreLessButtonsContainer}>
            {(links.prev) ?
              <AlteredTextButton
                style={styles.filledTextButton}
                textStyle={styles.whiteText}
                onPress={e => this.lessUserPosts()}>
                Less Posts
              </AlteredTextButton>
              :
                <AlteredTextButton
                  style={styles.inactiveFilledTextButton}
                  textStyle={styles.whiteText}
                  onPress={this.inactiveButton}>
                  Less Posts
                </AlteredTextButton>
            }
            {(links.next) ?
              <AlteredTextButton
                style={styles.filledTextButton}
                textStyle={styles.whiteText}
                onPress={e => this.nextUserPosts(token, uri)}
              >
                More Posts
                </AlteredTextButton>
              :
                <AlteredTextButton
                  style={styles.inactiveFilledTextButton}
                  textStyle={styles.whiteText}
                  onPress={this.inactiveButton}
                >
                  More Posts
                </AlteredTextButton>
            }
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
  scrollViewAsContainer: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: my_green,
    marginTop: 3,
  },
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#f0f4f0',
      alignItems: 'center',
   },
   scrollViewHeaderContainer: {
     backgroundColor: my_green,
   },
   moreLessButtonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 5,
      margin: 3,
      backgroundColor: '#f0f4f0',
      borderTopWidth: 2,
      borderTopColor: my_green,
   },
   errorContainer: {
      padding: 5,
      marginTop: 3,
      marginBottom: 30,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   textButton: {
     padding: 5,
     color: white,
     backgroundColor: my_green,
     borderColor: white,
     borderWidth: 2,
     borderRadius: 5
   },
   inactiveTextButton: {
     padding: 5,
     borderColor: gray4,
     borderWidth: 2,
     borderRadius: 5
   },
   filledTextButton: {
     padding: 5,
     backgroundColor: my_green,
     borderColor: my_green,
     borderWidth: 2,
     borderRadius: 5
   },
   inactiveFilledTextButton: {
     padding: 5,
     backgroundColor: gray4,
     borderColor: gray4,
     borderWidth: 2,
     borderRadius: 5
   },
   text: {
     fontSize: 20,
     color: black
   },
   whiteText: {
     fontSize: 16,
     color: white
   },
   myGreenText: {
     fontSize: 16,
     color: my_green
   },
   gray4Text: {
     fontSize: 16,
     color: gray4
   }
})
