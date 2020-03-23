import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { handleLogin } from '../address';
import { AuthContext } from '../App';       // AuthContext to control the screens

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';



const Signin = ({ navigation }) => {


  const { signIn } = React.useContext(AuthContext);    //Use the Sign In function From AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RememberUserInfo, setRememberUserInfo] = useState(false);
  let secondInput;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#F2EEF8"
          returnKeyType="next"
          onSubmitEditing={() => secondInput.focus()}
          onChangeText={(val) => setUsername(val)} />
        <TextInput
          ref={ref => { secondInput = ref }}
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#F2EEF8"
          onChangeText={(val) => setPassword(val)} />
        <View style={styles.Adds}>
          <View style={styles.RememberMestyle}>
            <CheckBox
              value={RememberUserInfo}
              tintColors={{ true: '#F6CF42', false: 'white' }}
              onChange={() => { RememberUserInfo ? setRememberUserInfo(false) : setRememberUserInfo(true) }} />
            <TouchableOpacity onPress={() => { RememberUserInfo ? setRememberUserInfo(false) : setRememberUserInfo(true) }} activeOpacity={1} >
              <Text style={styles.RememberMetext}>Remember Me</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => navigation.navigate('ForgotPassword')}>
            <View>
              <Text style={{ color: 'white', fontSize: 11 }}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={() => handleLogin(username, password, signIn)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'white' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <View>
            <Text style={styles.GoToSignUp}> Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0829',
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  button: {
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#F2EEF8',
  },
  buttonText: {
    fontSize: 20,
  },
  title: {
    justifyContent: 'center',
    marginBottom: "30%"
  },
  input: {
    width: 260,
    height: 50,
    marginBottom: 20,
    paddingLeft: 20,
    backgroundColor: "transparent",
    color: '#F2EEF8',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#F2EEF8',
  },
  RememberMestyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RememberMetext: {
    color: 'white',
    fontSize: 13
  },
  GoToSignUp: {
    color: 'white',
    fontStyle: "italic",
    textDecorationLine: 'underline'
  },
  Adds: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },

});

export default Signin;