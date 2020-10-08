import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { handleLogin } from '../address';
import { AuthContext } from '../App';       // AuthContext to control the screens
import { translate } from '../App';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar
} from 'react-native';


//hooks
import { useDimensions } from '@react-native-community/hooks';


//SVG 
import SignInSvg from '../Img/SVG/svg1.svg';
import UserNamepSvg from '../Img/SVG/svg3.svg';
import PasswordSvg from '../Img/SVG/svg4.svg';



const Signin = ({ navigation }) => {


  const { signIn } = React.useContext(AuthContext);    //Use the Sign In function From AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RememberUserInfo, setRememberUserInfo] = useState(false);
  let secondInput;
  const screenHeight = useDimensions().screen.height;


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Img/img2.png')} style={[styles.image, { height: screenHeight - StatusBar.currentHeight }]}>
        <View style={styles.TopPart}>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.InputHundler}>
              <TextInput
                style={styles.input}
                placeholder={translate("username")}
                placeholderTextColor="#5A4CA7"
                returnKeyType="next"
                onSubmitEditing={() => secondInput.focus()}
                onChangeText={(val) => setUsername(val)} />
              <View style={styles.userSvg}>
                <UserNamepSvg />
              </View>
            </View>
            <View style={styles.InputHundler}>
              <TextInput
                ref={ref => { secondInput = ref }}
                secureTextEntry
                style={styles.input}
                placeholder={translate("password")}
                placeholderTextColor="#5A4CA7"
                onChangeText={(val) => setPassword(val)} />
              <View style={styles.passSvg}>
                <PasswordSvg />
              </View>
            </View>
            <View style={styles.Adds}>
              <View style={styles.RememberMestyle}>
                {/* TODO Handle Remember Info */}
                <CheckBox
                  value={RememberUserInfo}
                  tintColors={{ true: '#5A4CA7', false: '#5A4CA7' }}
                  onChange={() => { RememberUserInfo ? setRememberUserInfo(false) : setRememberUserInfo(true) }} />
                <TouchableOpacity onPress={() => { RememberUserInfo ? setRememberUserInfo(false) : setRememberUserInfo(true) }} activeOpacity={1} >
                  <Text style={styles.RememberMetext}>{translate("RememberMe")}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <View>
                  <Text style={styles.ForgotPassText}>{translate("ForgotPassword")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity onPress={() => handleLogin(username, password, signIn)} activeOpacity={0.8} >
          <View style={styles.buttonSignIn}>
            <View style={styles.BtnSvgHundle}>
              <SignInSvg />
            </View>
            <View style={styles.BtnTextHundle}>
              <Text style={styles.buttonSignInText}>
                {translate("SignUp")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.GoSignUp}>
          <Text style={{ color: 'white', fontSize: 11 }}>{translate("NoAccount")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <View>
              <Text style={styles.GoToSignUp}>{translate("SignUp")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttonSignIn: {
    flexDirection: 'row',
    width: 166,
    height: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonSignInText: {
    color: '#5B4DA9',
    fontSize: 20,
  },
  BtnSvgHundle: {
    alignItems: 'center'
  },
  BtnTextHundle: {
    width: 90,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 270,
    height: 50,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 35,
    backgroundColor: "#fff",
    color: '#5A4CA7',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#5A4CA7',
  },
  RememberMestyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RememberMetext: {
    color: '#5A4CA7',
    fontSize: 9
  },
  GoToSignUp: {
    color: 'white',
    fontStyle: "italic",
    textDecorationLine: 'underline',
    fontSize: 11
  },
  Adds: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  GoSignUp: {
    flexDirection: 'row',
    marginTop: 30
  },
  ForgotPassText: {
    color: 'white',
    fontSize: 11
  },
  passSvg: {
    position: 'absolute',
    right: 14, top: 16
  },
  InputHundler: {
    flexDirection: 'row',
    position: 'relative'
  },
  TopPart: {
    height: '65%',
    justifyContent: 'center',
    marginTop: 30
  },
  userSvg: {
    position: 'absolute',
    right: 10,
    top: 13
  }

});

export default Signin;