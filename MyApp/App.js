import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bootstrapAsync, getNotification } from './address';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import {
  StyleSheet,
  ToastAndroid,
  BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";



//Screens
import Welcome from './Screens/Welcome';
import Signin from './Screens/Signin';
import SignUp from './Screens/SignUp';
import PersonalInformation from './Screens/PersonalInformation';
import Home from './Screens/Home';
import Post from "./Screens/Post";
import SousSpecialite from "./Screens/SousSpecialite";
import ListeDocument from "./Screens/ListeDocument";
import SplashScreen from './Screens/SplashScreen'
import ForgotPassword from './Screens/ForgotPassword';
import ValidateCode from './Screens/ValidateCode';
import ResetPassword from './Screens/ResetPassword';
import quizz from './Screens/quizz';
import Profil from "./Screens/Profil";
import MyMarks from './Screens/MyMarks'
import ResultQuizz from './Screens/ResultQuizz'
import CommentSection from './Screens/CommentSection';
import QuizzAnswer from './Screens/QuizzAnswer';
import SavedScreen from './Screens/SavedDocuments';
import SettingScreen from './Screens/Settings';
import AboutScreen from './Screens/About';
import sendFeedBackScreen from './Screens/SendFeedBack';
import NotificationScreen from './Screens/Notification';


//SVG
import HomeSvg from './Img/SVG/svg10.svg';
import HomeActiveSvg from './Img/SVG/svg19.svg';
import ProfilSvg from './Img/SVG/svg13.svg';
import ProfilActiveSvg from './Img/SVG/svg17.svg';
import SettingsSvg from './Img/SVG/svg12.svg';
import SettingsActiveSvg from './Img/SVG/svg18.svg';
import SavedSvg from './Img/SVG/svg14.svg';
import SavedActiveSvg from './Img/SVG/svg15.svg';
import NotificationSvg from './Img/SVG/svg11.svg';
import NotificationActiveSvg from './Img/SVG/svg16.svg';

export const AuthContext = React.createContext();    // this will be used in the other screens to change data here (used to control the app view)
const Stack = createStackNavigator();


//Notification configuration
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  senderID: "YOUR GCM SENDER ID",
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});



const translationGetters = {
  en: () => require("./android/app/src/translations/en.json"),
  fr: () => require("./android/app/src/translations/fr.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setTransulation = (lang) => {
  AsyncStorage.setItem("language", lang);
  i18n.locale = { languageTag: lang, isRTL: false };
  BackHandler.exitApp();
}

export const setI18nConfig = async () => {
  const lang = await AsyncStorage.getItem("language");

  const fallback = { languageTag: lang ? lang : "fr", isRTL: false };

  const { languageTag, isRTL } = fallback;

  translate.cache.clear();
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};


const HomeStack = createStackNavigator();

function HomeStackScreen() {

  const [NotifBadge, setNotifBadge] = useState(0)

  const testPush = (message) => {
    PushNotification.localNotification({
      title:"Tredoc",
      bigPictureUrl:require('./Img/Tredoc.png'),
      smallIcon:require('./Img/Tredoc.png'),
      largeIcon:require('./Img/Tredoc.png'),
      message: message, // (required)
    });
  }

  useEffect(() => {
    getNotification(setNotifBadge, testPush);
  }, [])
  
  return (
    <Tab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: 'rgba(39, 96, 244, 0.6)', keyboardHidesTabBar: true, tabStyle: { height: 50, paddingVertical: 5 } }}  >
      <Tab.Screen name="Settings" component={SettingStackScreens} options={{ tabBarIcon: ({ focused }) => focused ? <SettingsActiveSvg /> : <SettingsSvg />, tabBarLabel: translate("SettingsLable") }} />
      <Tab.Screen name="Notifications" component={NotificationScreen} options={{ tabBarBadge: NotifBadge, tabBarIcon: ({ focused }) => focused ? <NotificationActiveSvg /> : <NotificationSvg /> }} />
      <Tab.Screen name="Home" component={HomeScreensScreen} options={{ tabBarIcon: ({ focused }) => focused ? <HomeActiveSvg /> : <HomeSvg />, tabBarLabel: translate("HomeLable") }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ tabBarIcon: ({ focused }) => focused ? <SavedActiveSvg /> : <SavedSvg />, tabBarLabel: translate("SavedLable") }} />
      <Tab.Screen name="Profil" component={ProfileStackScreen} options={{ tabBarIcon: ({ focused }) => focused ? <ProfilActiveSvg /> : <ProfilSvg />, tabBarLabel: translate("ProfilLable") }} />
    </Tab.Navigator>
  );
}

const HomeScreens = createStackNavigator();

function HomeScreensScreen() {
  return (
    <HomeScreens.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreens.Screen name="Home" component={Home} />
      <HomeScreens.Screen name="SousSpecialite" component={SousSpecialite}
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerTintColor: '#5B4DA9' })}
        navigationOptions={() => ({
          headerLeft: (<HeaderBackButton />)
        })} />
      <HomeScreens.Screen name="ListeDocument" component={ListeDocument}
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerTintColor: '#5B4DA9' })}
        navigationOptions={() => ({
          headerLeft: (<HeaderBackButton />)
        })} />
      <HomeScreens.Screen name="post" component={Post}
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerTintColor: '#5B4DA9' })}
        navigationOptions={() => ({
          headerLeft: (<HeaderBackButton />)
        })} />
      <HomeScreens.Screen name="commentSection" component={CommentSection}
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerTintColor: '#5B4DA9' })} />
    </HomeScreens.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name='Profil' component={Profil} />
      <ProfileStack.Screen name='MyMarks' component={MyMarks} options={({ route }) => ({ title: route.params.title, headerShown: true, headerTintColor: '#5B4DA9' })} />
    </ProfileStack.Navigator>
  );
}

const SettingStack = createStackNavigator();

function SettingStackScreens() {
  return (
    <SettingStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingStack.Screen name='settings' component={SettingScreen} />
      <SettingStack.Screen name='About' component={AboutScreen} />
      <SettingStack.Screen name='FeedBack' component={sendFeedBackScreen} />
    </SettingStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

const App = ({ navigation }) => {

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

  
  useEffect(() => {
    // testPush();
    setI18nConfig();
    bootstrapAsync(authContext);
    
  }, []);

  const authContext = useMemo(      //check whether the user is sign in or not to display the right screens
    () => ({
      signIn: async (data) => {
        ToastAndroid.show('Welcome !', ToastAndroid.SHORT);
        dispatch({ type: 'SIGN_IN', token: data });
      },
      restoreToken: (data) => {
        ToastAndroid.show('Welcome !', ToastAndroid.SHORT);
        dispatch({ type: 'RESTORE_TOKEN', token: data });
      }
      ,
      signOut: async () => {   // function that handel Sign Out
        await AsyncStorage.removeItem('Token')
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  );


  if (state.isLoading) {
    // display this screen when we are checking the token validity
    return <SplashScreen />;
  }


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          state.userToken === null ? (    // if the token is not verified
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="SignUp" component={SignUp}
                navigationOptions={() => ({
                  headerLeft: (<HeaderBackButton />)
                })}
                options={{
                  headerTitle: '',
                  headerShown: true,
                  headerTransparent: true,
                  headerTintColor: 'white'
                }} />
              <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                navigationOptions={() => ({
                  headerLeft: (<HeaderBackButton />)
                })}
                options={{
                  headerTitle: '',
                  headerShown: true,
                  headerTransparent: true,
                  headerTintColor: '#5B4DA9'
                }} />
              <Stack.Screen name="ValidateCode" component={ValidateCode} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
          ) : (                         // if the token is verified
              <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="HomeStack" component={HomeStackScreen} />
                <HomeStack.Screen name='quizz' component={quizz} />
                <HomeStack.Screen name='ResultQuizz' component={ResultQuizz} />
                <HomeStack.Screen name='QuizzAnswer' component={QuizzAnswer} />
              </HomeStack.Navigator>
            )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;
