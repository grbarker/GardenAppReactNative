import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Platform, StatusBar} from 'react-native'
import { Provider, connect } from 'react-redux'
import rootReducer from './reducers/index.js'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createStackNavigator } from '@react-navigation/stack';
import { my_green, white } from './utils/colors'
import { Constants } from 'expo-constants'
import Login from './components/login'
import AuthLoadingScreen from './components/authLoadingScreen'
import Home from './components/home2'
import Map from './components/mapwithmarkers'
import Profile from './components/profile'
import Location from './components/location'
import AddressCheck from './components/addressCheck'

function GardenStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
    ),
  );
  return createStore(rootReducer, initialState, enhancer);
}
const store = configureStore({});

const Stack = createStackNavigator();

//DONE: Stack navigator created. Routes conditionally rendered based on login status.
//
//TODO: Add dynamic titles like used in flash-cards app

function MainStack() {
  return (
    <Stack.Navigator>
      {this.props.token ? (
        <>
        <Stack.Screen
          name="Home"
          component={DeckList}
          options={{
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }}}
          />
        <Stack.Screen
          name="Map"
          component={Map}
          options={({ route }) => ({
            title: "Map",
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            title: "Profile"",
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={({ route }) => ({
            title: "Location",
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        <Stack.Screen
          name="AddressCheck"
          component={AddressCheck}
          options={({ route }) => ({
            title: "Check An Address ",
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        </>
      ) : (
        <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ route }) => ({
            title: "Login",
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        <Stack.Screen
          name="Sign up"
          component={Signup}
          options={({ route }) => ({
            title: "Sign up",
            headerTintColor: white,
            headerStyle: {
              backgroundColor: my_green,
          }})}
        />
        </>
      )}
    </Stack.Navigator>
  );
}


class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <View style={{flex: 1}}>
            <GardenStatusBar backgroundColor={my_green} barStyle="light-content" />
            <MainStack />
          </View>
        </Provider>
      </NavigationContainer>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
    };
}


export default connect(mapStateToProps)(App);
