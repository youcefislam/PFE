import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  SplashScreen
} from 'react-native';
import Welcome from './Screens/Welcome';
import Signin from './Screens/Signin';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home'
import Post from "./Screens/Post"
import SousSpecialite from "./Screens/SousSpecialite"
import ListeDocument from "./Screens/ListeDocument"
const Stack = createStackNavigator();

const App = () => {
  
  


  return (
    <NavigationContainer>
      <Stack.Navigator>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="SousSpecialite" component={SousSpecialite} />
              <Stack.Screen name="ListeDocument" component={ListeDocument} />
              <Stack.Screen name="post" component={Post} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

const styles = StyleSheet.create({

});

export default App;
