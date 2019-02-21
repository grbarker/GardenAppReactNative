import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white, black, gray, purple, green, blue, my_green, my_blue, pink, lightPurp, red, orange} from '../utils/colors'
import Posts  from './posts'
import Plants from './plants'
import PostInput from './postInput'
import { Constants, Location, Permissions } from 'expo';

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
  state = {
    locationResult: null
  }

  toMap = () => {
    this.props.navigation.navigate('Map');
  }

  toProfile = () => {
    this.props.navigation.navigate('Profile',
      { user: null }
    );
  }


  _getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      locationResult: 'Permission to access location was denied',
    });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({
    locationResult: JSON.stringify(location)
  });
  alert(this.state.locationResult)
  };


  render() {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <Text style = {styles.text}>Home Page!</Text>
        </View>
        <View>
          <PostInput />
        </View>
        <TextButton style={{margin: 10}} onPress={this.toMap}>
          Map
        </TextButton>
        <TextButton style={{margin: 10}} onPress={this.toProfile}>
          Profile
        </TextButton>
        <View>
          <Posts />
          <Plants />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      token: state.auth.token
    };
}


export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#f0f4f0',
      alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: black
   }
})
