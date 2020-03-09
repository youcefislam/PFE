import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'





const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const handleRegister = () => {
        const data = { username: username, password: password, email: email };


        fetch('http://192.168.43.82:3000/users/registre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.stat == 'success') alert("your account has been created");
                else alert("your account has not been created");
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const handleEmail = () => {    // Regular expression for the email 
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
    const handleUsername = () => { // Regular expression for the username 
        const reg = /^(?![0-9])[a-zA-Z0-9](?=.{8,})/;
        return reg.test(username);
    }
    const handlePassword = () => {  // Regular expression for the password 
        const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return reg.test(password);
    }
    const handlePasswordConfirm = () => {  //confermation of the password 
        return password == passwordConfirm;
    }
    return (
        <View style={styles.container}>
            <View style={{width:'100%'}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TextInput
                    //style={handleEmail() ? styles.input : styles.inputError}
                    //onEndEditing={()=> handleEmail()}
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#F2EEF8"
                    autoCompleteType="email"
                    onChangeText={(val) => setEmail(val)} />
                <TextInput
                    //style={handleUsername() ? styles.input : styles.inputError}
                    style={styles.input}
                    autoCompleteType="username"
                    onEndEditing={() => handleUsername()}
                    placeholder="Username"
                    placeholderTextColor="#F2EEF8"
                    onChangeText={(val) => setUsername(val)} />
                <TextInput
                    //style={handlePassword() ? styles.input : styles.inputError}
                    style={styles.input}
                    secureTextEntry
                    autoCompleteType="password"
                    placeholderTextColor="#F2EEF8"
                    onEndEditing={() => handlePassword()}
                    placeholder="Password"
                    onChangeText={(val) => setPassword(val)} />
                <TextInput
                    //style={handlePasswordConfirm() ? styles.input : styles.inputError}
                    style={styles.input}
                    secureTextEntry
                    autoCompleteType="password"
                    onEndEditing={() => handlePasswordConfirm()}
                    placeholder="Confirm password"
                    placeholderTextColor="#F2EEF8"
                    onChangeText={(val) => setPasswordConfirm(val)} />
            </ScrollView>
            </View>            
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <View style={{}}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{}} onPress={() => navigation.navigate("Signin")}>
                    <View style={{}}>
                        <Text style={{ color: 'white', textDecorationLine: 'underline' }}>already have account ?</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1155',
        alignItems: 'center',
        justifyContent: "center",
    },

    input: {
        width: 260,
        height: 50,
        marginBottom: 30,
        backgroundColor: "transparent",
        color: '#F2EEF8',
        fontSize: 15,
        borderWidth: 2,
        borderColor: '#F2EEF8',
        borderRadius: 15,
        paddingLeft: 20,
    },
    inputError: {
        width: 150,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: 'red',
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
        paddingHorizontal: 10,
    },
});
export default SignUp;