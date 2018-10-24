import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'
import Moment from 'react-moment';
import 'moment-timezone';
import TextButton from './TextButton'
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white, my_green, green, gray, red, purple, orange, blue, my_blue, lightPurp, black, pink } from '../utils/colors'
import { getUserPosts, getUserPostsSuccess, getUserPostsFailure } from '../actions/userposts'
import { getUserPlants, getUserPlantsSuccess, getUserPlantsFailure } from '../actions/userplants'
import { getUser, getUserSuccess, getUserFailure } from '../actions/user'
import { showFollowers, hideFollowers } from '../actions/followers'
import { showFollowed, hideFollowed } from '../actions/followed'
import Followers from './followers'
import Followed from './followed'
import UserPosts from './userposts'
import UserPlants from './userplants'


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
    console.log('PROFILE   ', token);
    /*try {
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
    }*/
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

  toggleFollowers = (e) => {
    const { dispatch, showingFollowers } = this.props
    showingFollowers
    ? dispatch(hideFollowers())
    : dispatch(showFollowers())
    e.preventDefault();
  }

  toggleFollowed = (e) => {
    const { dispatch, showingFollowed } = this.props
    showingFollowed
    ? dispatch(hideFollowed())
    : dispatch(showFollowed())
    e.preventDefault();
  }


  render() {
    const { user, fetching, fetched_user, showingFollowers, showingFollowed, followers, length } = this.props

    if (fetched_user == true) {
      //console.log('User', user)
      //console.log('Avatar', user._links['avatar'])
      // console.log("Showing Followers?", showingFollowers)
      // console.log("Showing Followed?", showingFollowed)
      //console.log('Followers', followers, length)
      let imgSrc = user._links['avatar'];
      return (
        <View>
          <MapView
            initialRegion={{
              latitude: 45.487292,
              longitude: -122.635435,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <ScrollView>
            <View style = {styles.postplantscontainer}>
              <View style = {styles.profileTitleContainer}>
                <Text style = {styles.profileText}>{user.username}s Profile Page!</Text>
              </View>
              <View style = {styles.userProfileContainer}>
                <View style = {styles.avatarContainer}>
                  <Image
                    style={{width: 110, height: 110}}
                    source={{uri: imgSrc}}
                  />
                </View>
                <View style = {styles.profileInfoContainer}>
                  <Text style = {styles.text}>
                    <TextButton onPress={this.toggleFollowed}>
                      Following: {user.followed_count}
                    </TextButton>
                  </Text>
                  <Text style = {styles.text}>
                    <TextButton onPress={this.toggleFollowers}>
                      Followers: {user.follower_count}
                    </TextButton>
                  </Text>
                  <Text style = {styles.text}>{user.post_count} posts</Text>
                  <Text style = {styles.text}>
                    Last seen <Moment element={Text} fromNow>{user.last_seen}</Moment>
                  </Text>
                </View>
              </View>
              <TextButton style={styles.profileText} onPress={this.toMap}>
                Map
              </TextButton>
              {showingFollowed == true
                ? <View style = {styles.followerscontainer}>
                    <Followed />
                  </View>
                : console.log('FOLLOWED ARE NOT BEING SHOWN.')
              }
              {showingFollowers == true
                ? <View style = {styles.followerscontainer}>
                    <Followers />
                  </View>
                : console.log('FOLLOWERS ARE NOT BEING SHOWN.')
              }
              <View>
                <UserPosts />
                <UserPlants />
              </View>
            </View>
          </ScrollView>
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
      fetched_user: state.user.fetched,
      fetched_posts: state.userposts.fetched,
      fetched_plants: state.userplants.fetched,
      user: state.user.user,
      post_items: state.userposts.items,
      plant_items: state.userplants.items,
      token: state.auth.token,
      showingFollowers: state.followers.showingFollowers,
      showingFollowed: state.followed.showingFollowed,
      followers: state.followers,
      length: state.followers.items.length,
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
   gardenPlantListContainer: {
      flex: 8,
      flexDirection: 'row',
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   postPlantsContainer: {
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
   profileTitleContainer: {
      padding: 0,
      marginTop: 0,
      alignItems: 'center',
   },
   userProfileContainer: {
      flex: 1,
      flexDirection: 'row',
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   profileInfoContainer: {
      flex: 28,
      padding: 0,
      marginTop: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   avatarContainer: {
      flex: 12,
      padding: 0,
      marginTop: 0,
   },
   followerscontainer: {
      padding: 8,
      marginTop: 5,
   },
   text: {
     fontSize: 16,
      color: '#4f603c'
   },
   profileText: {
     fontSize: 24,
      color: my_green
   }
})
