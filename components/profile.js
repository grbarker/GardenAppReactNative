import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'
import Moment from 'react-moment';
import 'moment-timezone';
import TextButton from './TextButton'
import { MapView } from 'expo';
import Followers from './followers'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { getUserPosts, getUserPostsSuccess, getUserPostsFailure } from '../actions/userposts'
import { getUserPlants, getUserPlantsSuccess, getUserPlantsFailure } from '../actions/userplants'
import { getUser, getUserSuccess, getUserFailure } from '../actions/user'

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Profile',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Auth')}
          title="Logout"
          color= {white}
        />
      )
    }
  }

  async componentDidMount() {
    const { dispatch, token } = this.props
    console.log(token);
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
      //console.log(responseJSON)
      dispatch(getUserPostsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
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
      //console.log(responseJSON)
      dispatch(getUserPlantsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      //console.log(responseJSON)
      dispatch(getUserSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }


  toMap = () => {
    this.props.navigation.navigate('Map');
  }


  toHome = () => {
    this.props.navigation.navigate('Home');
  }



  render() {
    const { user, post_items, plant_items, fetching, fetched_posts, fetched_plants, fetched_user } = this.props

    if (fetched_posts == true && (fetched_plants == true && fetched_user == true)) {
      console.log(user)
      console.log(user._links['avatar'])
      let imgsrc = user._links['avatar'];
      return (
        <ScrollView>
          <View>
            <MapView
              style={{ flex: 5}}
              initialRegion={{
                latitude: 45.487292,
                longitude: -122.635435,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
          <View style = {styles.postplantscontainer}>
            <View style = {{flex: 1, flexDirection: 'row'}}>
              <View style = {styles.avatarcontainer}>
                <Image
                  style={{width: 150, height: 150}}
                  source={{uri: imgsrc}}
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
            <View style = {styles.container}>
              <Text style = {styles.text}>{user.username}s Profile Page!</Text>
            </View>
            <TextButton style={{margin: 20}} onPress={this.toMap}>
              Map
            </TextButton>
            <View>
              {post_items.map((post_item, index) => (
                <View key = {post_item.id} style = {styles.container}>
                  <Text style = {styles.text}>{post_item.user}: </Text>
                  <Text style = {styles.text}>{post_item.body}</Text>
                  <Text style = {styles.text}>
                    Posted by <Moment element={Text} fromNow>{plant_item.timestamp}</Moment>
                  </Text>
                </View>
              ))}
            </View>
            <View>
              {plant_items.map((plant_item, index) => (
                <View key = {plant_item.id} style = {styles.container}>
                  <Text style = {styles.text}>{plant_item.name}</Text>
                  <Text style = {styles.text}>Grow by {plant_item.grower}</Text>
                  <Text style = {styles.text}>
                    Planted by <Moment element={Text} fromNow>{plant_item.timestamp}</Moment>
                  </Text>
                </View>
              ))}
            </View>
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
      fetched_user: state.user.fetched,
      fetched_posts: state.userposts.fetched,
      fetched_plants: state.userplants.fetched,
      user: state.user.user,
      post_items: state.userposts.items,
      plant_items: state.userplants.items,
      token: state.auth.token
    };
}


export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   postplantscontainer: {
      flex: 2,
      padding: 2,
      marginTop: 1,
      backgroundColor: '#d9f9b1',
      justifyContent: 'space-evenly',
   },
   userpanecontainer: {
      flex: 2,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
      justifyContent: 'space-evenly',
   },
   userinfocontainer: {
      flex: 2,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   avatarcontainer: {
      flex: 2,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   text: {
     fontSize: 12,
      color: '#4f603c'
   }
})
