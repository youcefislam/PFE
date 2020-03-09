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
  const [state, setstate] = useState({
    isLoading:true
  }),
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
              // User is signed in
              <>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="post" component={Post} />
              </>
            )
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
