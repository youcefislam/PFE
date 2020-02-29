import 'react-native-gesture-handler';
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
} from 'react-native';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = () => {

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
        if (responseJson.stat == 'success') alert("Logged In");
        else alert("Username or Password is incorrect. ");
      })
      .catch((error) => {
        console.error(error);
      })};
  
  return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>place holder for title/logo</Text>
        </View>
        <View style={{ flex: 1, }}>
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
        <View style={{ flex: 1, flexDirection: "row", }}>
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

      </View>
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
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: "space-between",
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