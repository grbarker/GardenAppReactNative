import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import TextButton from './TextButton';
import { login } from '../actions/auth';

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

    toggleRoute (e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render () {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>{this.state.route}</Text>
                <TextInput
                    style={{fontSize: 37}}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    style={{fontSize: 37}}
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userLogin(e)} title={this.state.route}/>
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
