import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import MapView from 'react-native-maps';
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { getPosts, getPostsSuccess, getPostsFailure } from '../actions/posts'
import { getPlants, getPlantsSuccess, getPlantsFailure } from '../actions/plants'

class Home extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Home',
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
        `http://@34.221.120.52/api/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseJSON = await response.json();
      console.log(responseJSON)
      dispatch(getPostsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
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
      console.log(responseJSON)
      dispatch(getPlantsSuccess(responseJSON))
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { post_items, plant_items, fetching, fetched_posts, fetched_plants } = this.props
    if (fetched_posts == true && fetched_plants == true) {
      return (
        <ScrollView>
          <View style = {styles.container}>
            <Text style = {styles.text}>Home Page!</Text>
          </View>
          <View>
            {post_items.map((post_item, index) => (
              <View key = {post_item.id} style = {styles.container}>
                <Text style = {styles.text}>Post:</Text>
                <Text style = {styles.text}>{post_item.user}</Text>
                <Text style = {styles.text}>{post_item.body}</Text>
              </View>
            ))}
          </View>
          <View>
            {plant_items.map((plant_item, index) => (
              <View key = {plant_item.id} style = {styles.container}>
                <Text style = {styles.text}>Plant: {plant_item.name}</Text>
                <Text style = {styles.text}>Grower: {plant_item.grower}</Text>
                <Text style = {styles.text}>Planted: {plant_item.timestamp}</Text>
              </View>
            ))}
          </View>
          <MapView
            initialRegion={{
              latitude: 45.487292,
              longitude: -122.635435,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
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
      fetched_posts: state.posts.fetched,
      fetched_plants: state.plants.fetched,
      post_items: state.posts.items,
      plant_items: state.plants.items,
      token: state.auth.token
    };
}


export default connect(mapStateToProps)(Home);

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
