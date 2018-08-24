import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import Moment from 'react-moment';
import 'moment-timezone';
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import Posts  from './posts'
import Plants from './plants'

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

  toMap = () => {
    this.props.navigation.navigate('Map');
  }

  toProfile = () => {
    this.props.navigation.navigate('Profile');
  }



  render() {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <Text style = {styles.text}>Home Page!</Text>
        </View>
        <TextButton style={{margin: 20}} onPress={this.toMap}>
          Map
        </TextButton>
        <TextButton style={{margin: 20}} onPress={this.toProfile}>
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
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: '#4f603c'
   }
})
