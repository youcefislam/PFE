import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyAddress from './address';
import AsyncStorage from '@react-native-community/async-storage';
export const AuthContext = React.createContext();
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';

import Welcome from './Screens/Welcome';
import Signin from './Screens/Signin';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import Post from "./Screens/Post";
import SousSpecialite from "./Screens/SousSpecialite"
import ListeDocument from "./Screens/ListeDocument"
import SplashScreen from './Screens/SplashScreen'
const Stack = createStackNavigator();

const App = () => {


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );



  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {         // verify the token validity
        userToken = await AsyncStorage.getItem('Token');
        if (userToken !== null) {
          fetch(MyAddress + '/specialite', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + userToken
            },
          })
            .then((response) => {
              if (response.status !== 403) {
                ToastAndroid.show('Welcome back !', ToastAndroid.SHORT);
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
              }
              else {
                dispatch({ type: 'SIGN_OUT' });
              }
            })
            .catch((error) => {
              console.error(error);
            })
        }
        else {
          dispatch({ type: 'SIGN_OUT' });
        }
      } catch (e) {
        console.error(e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.userToken === null ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            ) : (
                <>
                  <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerTitleAlign: "center" }} />
                  <Stack.Screen name="SousSpecialite" component={SousSpecialite} />
                  <Stack.Screen name="ListeDocument" component={ListeDocument} />
                  <Stack.Screen name="post" component={Post} />
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
