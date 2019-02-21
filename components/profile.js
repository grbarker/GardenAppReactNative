import React, { Component } from 'react'
import { Picker, PickerIOS, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Moment from 'react-moment';
import 'moment-timezone';
import AlteredTextButton from './AlteredTextButton'
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white, my_green, green, gray, red, purple, orange, blue, my_blue, lightPurp, black, pink } from '../utils/colors'
import { getUserPosts, getUserPostsSuccess, getUserPostsFailure } from '../actions/userposts'
import { getUserPlants, getUserPlantsSuccess, getUserPlantsFailure, hidePlantInput, showPlantInput } from '../actions/userplants'
import { updatePicker } from '../actions/usergardens'
import { getUser, getUserSuccess, getUserFailure } from '../actions/user'
import { showFollowers, hideFollowers } from '../actions/followers'
import { showFollowed, hideFollowed } from '../actions/followed'
import PostInput from './postInput'
import Followers from './followers'
import Followed from './followed'
import UserPosts from './userposts'
import UserPlants from './userplants'
import UserGardens from './usergardens'
import PlantInput from './plantInput'


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
  state = {
    selectedGarden: {},
    gardenName: '',
    gardenID: 0

  }

  async fetchCurrentUser(){
    const { dispatch, token } = this.props
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
      console.log(responseJSON)
      dispatch(getUserSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser(user){
    const { dispatch, token } = this.props
    try {
      let response = await fetch(
        `http://@34.221.120.52/api/users/${user.id}`, {
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

  componentDidMount() {
    const { dispatch, token, gardenChoice } = this.props
    const { user } = this.props.navigation.state.params
    console.log('PROFILE   ', token);
    (user) ? (this.fetchUser(user) && console.log(user)) : (this.fetchCurrentUser() && console.log('No User'))
    this.setState({
      selectedGarden: gardenChoice,
      gardenName: gardenChoice.name,
      gardenID: gardenChoice.id
    })
  }


  toMap = () => {
    this.props.navigation.navigate('Map');
  }
  toHome = () => {
    this.props.navigation.navigate('Home');
  }

  togglePlantInput = (e) => {
    const { dispatch, showingPlantInput } = this.props
    showingPlantInput
    ? dispatch(hidePlantInput())
    : dispatch(showPlantInput())
    e.preventDefault();
  }

  toggleFollowers = (e) => {
    const { dispatch, showingFollowers } = this.props
    showingFollowers
    ? dispatch(hideFollowers())
    : dispatch(showFollowers()) && dispatch(hideFollowed())
    e.preventDefault();
  }

  toggleFollowed = (e) => {
    const { dispatch, showingFollowed } = this.props
    showingFollowed
    ? dispatch(hideFollowed())
    : dispatch(showFollowed()) && dispatch(hideFollowers())
    e.preventDefault();
  }

  render() {
    const { dispatch, user, fetching, fetched_user, showingFollowers,
      showingFollowed, showingPlantInput, followers, length,
      fetched_usergardens, usergarden_items, gardenChoice
    } = this.props
    const { selectedGarden, gardenName, gardenID } = this.state

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
                <Text style = {styles.profileText}>{user.username}'s Profile Page!</Text>
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
                    <AlteredTextButton onPress={this.toggleFollowed}>
                      Following: {user.followed_count}
                    </AlteredTextButton>
                  </Text>
                  <Text style = {styles.text}>
                    <AlteredTextButton onPress={this.toggleFollowers}>
                      Followers: {user.follower_count}
                    </AlteredTextButton>
                  </Text>
                  <Text style = {styles.text}>{user.post_count} posts</Text>
                  <Text style = {styles.text}>
                    Last seen <Moment element={Text} fromNow>{user.last_seen}</Moment>
                  </Text>
                </View>
              </View>
              <AlteredTextButton style={styles.myGreenTextButton} textStyle={styles.profileText} onPress={this.toMap}>
                Map
              </AlteredTextButton>
              {showingFollowed == true
                ? <View style = {styles.followerscontainer}>
                    <Followed />
                  </View>
                : console.log('FOLLOWED ARE NOT BEING SHOWN.')
              }
              {showingFollowers == true
                ? <View style = {styles.followerscontainer}>
                    <Followers navigation={ this.props.navigation }/>
                  </View>
                : console.log('FOLLOWERS ARE NOT BEING SHOWN.')
              }
              <View>
                <PostInput />
                <AlteredTextButton style={styles.myGreenTextButton} textStyle={styles.profileText} onPress={this.togglePlantInput}>
                  Add a plant
                </AlteredTextButton>
                {showingPlantInput == true
                  ? <PlantInput />
                  : null
                }
                <UserPlants />
                <UserPosts />
                <UserGardens />
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
      fetched_usergardens: state.usergardens.fetched,
      user: state.user.user,
      post_items: state.userposts.items,
      plant_items: state.userplants.items,
      usergarden_items: state.usergardens.items,
      gardenChoice: state.usergardens.gardenChoice,
      token: state.auth.token,
      showingFollowers: state.followers.showingFollowers,
      showingFollowed: state.followed.showingFollowed,
      showingPlantInput: state.userplants.showingPlantInput,
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
  myGreenTextButton: {
    padding: 5,
    borderColor: my_green,
    borderWidth: 2,
    borderRadius: 5
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
