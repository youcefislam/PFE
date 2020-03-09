import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    navigation.navigate("home");
    return;
    const data = { username : username , password : password};

    fetch('http://192.168.43.82:3000/users/l', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.stat == 'success') {navigation.navigate("home")}
        else alert("Username or Password is incorrect. ");
      })
      .catch((error) => {
        console.error(error);
      })};
  
  return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.title}>
          <Text>place holder for title/logo</Text>
        </View>
        <View style={{}}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(val) => setUsername(val)} />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="password"
            onChangeText={(val) => setPassword(val)} />
        </View>
        <View style={{flexDirection: "row", }}>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>register</Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    );
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#8c1515',
      margin: 20,
    },
    buttonText: {
      fontSize: 20,
      paddingHorizontal: 10,
    },
    title: {
      justifyContent: 'center',
      marginBottom: "30%"
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: "center",
    },
    input: {
      marginBottom: 20,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: '#777',
      width: 150,
    },
  });

  export default Login;