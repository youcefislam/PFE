import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home'
import Post from "./Screens/Post"
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="post" component={Post}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
