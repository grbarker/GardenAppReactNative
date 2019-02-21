import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { AsyncStorage } from "react-native";
import TextButton from './TextButton';
import { login } from '../actions/auth';
import {
  white, my_green, green, gray4, red, purple, orange, blue, my_blue,
  lightPurp, black, pink
} from '../utils/colors'

const api = "http://54.245.49.118/catalog/mobilelogin/JSON"


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            route: 'Login',
            username: "",
            password: "",
            token: "",
            error: ""
        };
    }
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Login'
      }
    }

    toHome = () => {
      this.props.navigation.navigate('Home', {
        isLoggedIn: true
      });
    }

    async userLogin (e) {
        const { dispatch } = this.props
        const { username, password } = this.state
        e.preventDefault();
        try {
          let response = await fetch(
            `http://${username}:${password}@34.221.120.52/api/tokens`, {
              method: 'POST',
            }
          );
          let responseJSON = await response.json();
          console.log(responseJSON);
          let token = responseJSON.token;
          dispatch(login(username, password, token));
          this.toHome()
        } catch (error) {
          console.error(error);
        }
    }

    async userSignup (e) {
        const { dispatch } = this.props
        const { username, password } = this.state
        e.preventDefault();
        try {
          let response = await fetch(
            `http://34.221.120.52/api/users`, {
              method: 'POST',
              body: {
                "username": `${username}`,
                "email": `${email}`,
                "password": `${password}`,
              }
            }
          );
          let responseJSON = await response.json();
          console.log(responseJSON);
          let token = responseJSON.token;
          dispatch(signup(username, email, password));
          this.toHome()
        } catch (error) {
          console.error(error);
        }
    }



    toggleRoute (e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render () {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27, color: my_green}}>{this.state.route}</Text>
                <TextInput
                    style={styles.loginInputField}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    style={styles.loginInputField}
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                {(this.state.route === 'Login')
                  ? <Button onPress={(e) => this.userLogin(e)} title={this.state.route}/>
                  : <Button onPress={(e) => this.userSignup(e)} title={this.state.route}/>
                }
                <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.toggleRoute(e)}>{alt}</Text>
                <TextButton style={{margin: 20}} onPress={this.toPublicHome}>
                  Skip Login
                </TextButton>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}


export default connect(mapStateToProps)(Login);


const styles = StyleSheet.create ({
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
  loginInputField: {
    marginTop: 5,
    fontSize: 37,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 1,
    backgroundColor: '#ffffff',
    borderColor: my_green,
    borderWidth: 2,
    borderRadius: 5,
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
