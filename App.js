import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import LandingScreen from './components/auth/Landing.js'
import RegisterScreen from './components/auth/Register.js'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDxsA63C4nRHKKKG0hpKYMPGo5oW4-o-Y",
  authDomain: "instaclone-dev-66d0d.firebaseapp.com",
  projectId: "instaclone-dev-66d0d",
  storageBucket: "instaclone-dev-66d0d.appspot.com",
  messagingSenderId: "305599131677",
  appId: "1:305599131677:web:5ee46e13fe58d59e64d6f4",
  measurementId: "G-8GLGMGBC12"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      loaded: false,

    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        }) 
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded) {
      return (
        <View>
          <Text style={{ flex: 1, justifyContent: 'center'}}>
            Loading
          </Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Add' component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
