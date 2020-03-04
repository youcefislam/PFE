import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const handleRegister = () => {
        const data = { username : username , password : password , email : email};
        

        fetch('http://192.168.43.82:3000/users/r', {
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
    const handleEmail = () => {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
    const handleUsername = () => {
        const reg =/^(?![0-9])[a-zA-Z0-9](?=.{8,})/;
        return reg.test(username);
    }
    const handlePassword = () => {
        const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return reg.test(password);
    }
    const handlePasswordConfirm = () => {
        return password==passwordConfirm;
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="position">
            <View style={{marginTop:"50%"}}>
                <TextInput
                    style={handleEmail() ?styles.input:styles.inputError}
                    //onEndEditing={()=> handleEmail()}
                    placeholder="Email"
                    autoCompleteType="email"
                    onChangeText={(val) => setEmail(val)} />
                <TextInput
                    style={handleUsername() ?styles.input:styles.inputError}
                    autoCompleteType="username"
                    onEndEditing={()=> handleUsername()}
                    placeholder="Username"
                    onChangeText={(val) => setUsername(val)} />
                <TextInput
                    style={handlePassword() ?styles.input:styles.inputError}
                    secureTextEntry
                    autoCompleteType="password"
                    onEndEditing={()=> handlePassword()}
                    placeholder="password"
                    onChangeText={(val) => setPassword(val)} />
                <TextInput
                    style={handlePasswordConfirm()?styles.input:styles.inputError}
                    secureTextEntry
                    autoCompleteType="password"
                    onEndEditing={()=> handlePasswordConfirm()}
                    placeholder="confirm password"
                    onChangeText={(val) => setPasswordConfirm(val)} />
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={handleRegister}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: '#777',
        width: 150,
    },
    inputError:{
        marginBottom: 20,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: 'red',
        width: 150,
    },
    button: {
        backgroundColor: '#8c1515',
        margin: 20,
    },
    buttonText: {
        fontSize: 20,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },
});
export default Register;