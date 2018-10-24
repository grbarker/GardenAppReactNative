import React from 'react'
import { View, Platform, StatusBar} from 'react-native'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index.js'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { my_green, white } from './utils/colors'
import { Constants } from 'expo'
import Login from './components/login'
import AuthLoadingScreen from './components/authLoadingScreen'
import Home from './components/home2'
import Map from './components/mapwithmarkers'
import Profile from './components/profile'
import Location from './components/location'

function UdaciStatusBar ({backgroundColor, ...props}) {
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

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: my_green,
      }
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: my_green,
      }
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: my_green,
      }
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: my_green,
      }
    }
  },
  Location: {
    screen: Location,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: my_green,
      }
    }
  }
})


const SwitchNavigatorComponent = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={my_green} barStyle="light-content" />
          <SwitchNavigatorComponent />
        </View>
      </Provider>
    )
  }
}
