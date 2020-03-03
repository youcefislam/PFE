import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
const Register = () => {
    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(true)
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true)
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(true)


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
        if(reg.test(email)){
            alert("email valid")
            setValidEmail(true)
        }
        else { 
            alert("email error");
            setValidEmail(false)}
    }
    const handleUsername = () => {
        const reg =/^(?![0-9])[a-zA-Z0-9](?=.{8,})/;
        if(reg.test(username)){
            setValidUsername(true);
            alert("valid username");
            return;
        }
        alert("invalid username");
        setValidUsername(false);
    }
    const handlePassword = () => {
        const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(reg.test(password)){
            setValidPassword(true);
            alert("password vlid")
            return;
        }else{
        alert("password invlid")
        setValidPassword(false);
        }
    }
    const handlePasswordConfirm = () => {
        if(password==passwordConfirm){
            alert("passwordconfirmed");
            setValidPasswordConfirm(true);
            return;
        }
        alert("password not confirmed")
        setValidPasswordConfirm(false);
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="position">
            <View style={{marginTop:"50%"}}>
                <TextInput
                    style={validEmail ?styles.input:styles.inputError}
                    onEndEditing={()=> handleEmail()}
                    placeholder="Email"
                    autoCompleteType="email"
                    onChangeText={(val) => setEmail(val)} />
                <TextInput
                    style={styles.input}
                    autoCompleteType="username"
                    onEndEditing={()=> handleUsername()}
                    placeholder="Username"
                    onChangeText={(val) => setUsername(val)} />
                <TextInput
                    secureTextEntry
                    autoCompleteType="password"
                    onEndEditing={()=> handlePassword()}
                    style={styles.input}
                    placeholder="password"
                    onChangeText={(val) => setPassword(val)} />
                <TextInput
                    secureTextEntry
                    autoCompleteType="password"
                    onEndEditing={()=> handlePasswordConfirm()}
                    style={styles.input}
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