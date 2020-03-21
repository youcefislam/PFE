import 'react-native-gesture-handler';
import React, { useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyAddress } from './address';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  ToastAndroid
} from 'react-native';

import Welcome from './Screens/Welcome';
import Signin from './Screens/Signin';
import SignUp from './Screens/SignUp';
import MoreAboutMe from './Screens/MoreAboutMe';
import Home from './Screens/Home';
import Post from "./Screens/Post";
import SousSpecialite from "./Screens/SousSpecialite"
import ListeDocument from "./Screens/ListeDocument"
import SplashScreen from './Screens/SplashScreen'
import ForgotPassword from './Screens/ForgotPassword';
import ValidateCode from './Screens/ValidateCode';
import ResetPassword from './Screens/ResetPassword';

export const AuthContext = React.createContext();    // this will be used in the other screens to change data here (used to control the app view)
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



  useEffect(() => {    // First Enter 

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {         // verify the token validity

        userToken = await AsyncStorage.getItem('Token');
        
        if (userToken !== null) {   // if the token exist
          fetch(MyAddress + '/specialite', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + userToken
            },
          })
            .then((response) => {
              if (response.status !== 403) {  // if token is valid
                ToastAndroid.show('Welcome back !', ToastAndroid.SHORT);
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
              }
              else {     // if Token is Not valid 
                dispatch({ type: 'SIGN_OUT' });
              }
            })
            .catch((error) => {
              console.error(error);
            })
        }
        else {   // if the token doesn't exist
          dispatch({ type: 'SIGN_OUT' });
        }
      } catch (e) {
        console.error(e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(      //check whether the user is sign in or not to display the right screens
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),     // function that handel Sign Out
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: '' });
      },
    }),
    []
  );


  if (state.isLoading) {   // display this screen when we are checking the token validity
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.userToken === null ? (    // if the token is not verified
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="MoreAboutMe" component={MoreAboutMe} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ValidateCode" component={ValidateCode} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
              </>
            ) : (                         // if the token is verified
                <>
                  <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerTitleAlign: "center" }} />
                  <Stack.Screen name="SousSpecialite" component={SousSpecialite} />
                  <Stack.Screen name="ListeDocument" component={ListeDocument} />
                  <Stack.Screen name="post" component={Post} />
                  <Stack.Screen name="MoreAboutMe" component={MoreAboutMe} />
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
