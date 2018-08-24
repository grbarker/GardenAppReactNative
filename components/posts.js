import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux'
import axios from 'axios';
import { white } from '../utils/colors'
import { getPosts, getPostsSuccess, getPostsFailure, getMorePostsSuccess, getMorePostsFailure } from '../actions/posts'

class Posts extends Component {


  nextPosts = (token, uri) => {
    const { dispatch } = this.props
    console.log("Dispatching getPosts")
    dispatch(getPosts(dispatch, token, uri))
  }

  showState = () => {
    console.log(this.props.state.posts)
  }

  async componentDidMount() {
    const { dispatch, token, page } = this.props
    console.log(page);
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      console.log('FIRST API CALL RESPONSEJSON....', responseJSON)
      dispatch(getPostsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const {  links, post_items, fetching, fetched_posts, token, error, state } = this.props
    //TRYING TO SET UP A 'NEXT' Button
    //TRYING TO PASS THE 'NEXT' LINK DOWN TO THE TextButton
    //AND THEN FIGURE OUT HOW TO dispatch getPosts
    console.log("Here's the token!.....", token)
    console.log("Fetching the next set of posts.")
    if (fetched_posts == true) {
      let uri = '/api/posts'
      //console.log("Here are the links!.....", links.next)
      if (links.next) {
        uri = links.next;
      }
      //console.log(state)
      console.log("Trying to get the uri.....", uri)
      return (
        <ScrollView>
          <View>
            {post_items.map((post_item, index) => (
              <View key = {post_item.id} style = {styles.container}>
                <Text style = {styles.text}>{post_item.user}: </Text>
                <Text style = {styles.text}>{post_item.body}</Text>
              </View>
            ))}
          </View>
          {(links.next) ?
            <TextButton style={{margin: 20}} onPress={e => this.nextPosts(token, uri)}>
              More Posts
            </TextButton>
            : null
          }
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
      fetched_posts: state.posts.fetched,
      page: state.posts.page,
      post_items: state.posts.items,
      links: state.posts.links,
      token: state.auth.token,
      error: state.posts.error,
      state: state
    };
}


export default connect(mapStateToProps)(Posts);

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
