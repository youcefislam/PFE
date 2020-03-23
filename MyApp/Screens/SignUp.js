import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, ShowPattern } from 'react-native';
import {
    passwordMsg,
    passwordConfirmationMsg,
    EmailMsg,
    UsernameMsg,
    handlePasswordConfirm,
    handlePassword,
    handleUsername,
    handleEmail,
    handleRegister
} from '../address';




const SignUp = ({ navigation }) => {


    const [username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")
    let secondInput, thirdInput, forthInput;

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}  >
                    <TextInput
                        //style={handleEmail() ? styles.input : styles.inputError}
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#F2EEF8"
                        autoCompleteType="email"
                        returnKeyType="next"
                        onSubmitEditing={() => handleEmail(Email) ? (secondInput.focus()) : (alert(EmailMsg))}
                        onChangeText={(val) => setEmail(val)} />

                    <TextInput
                        //style={handleUsername() ? styles.input : styles.inputError}
                        ref={ref => { secondInput = ref }}
                        style={styles.input}
                        autoCompleteType="username"
                        placeholder="Username"
                        placeholderTextColor="#F2EEF8"
                        returnKeyType="next"
                        onSubmitEditing={() => handleUsername(username) ? (thirdInput.focus()) : (alert(UsernameMsg))}
                        onChangeText={(val) => setUsername(val)} />
                    <TextInput
                        //style={handlePassword() ? styles.input : styles.inputError}
                        ref={ref => { thirdInput = ref; }}
                        style={styles.input}
                        secureTextEntry
                        autoCompleteType="password"
                        placeholderTextColor="#F2EEF8"
                        placeholder="Password"
                        returnKeyType="next"
                        onSubmitEditing={() => handlePassword(Password) ? forthInput.focus() : alert(passwordMsg)}
                        onChangeText={(val) => setPassword(val)} />
                    <TextInput
                        //style={handlePasswordConfirm() ? styles.input : styles.inputError}
                        ref={ref => { forthInput = ref; }}
                        style={styles.input}
                        secureTextEntry
                        autoCompleteType="password"
                        placeholder="Confirm password"
                        placeholderTextColor="#F2EEF8"
                        onSubmitEditing={() => handlePasswordConfirm(Password, ConfirmPassword) ? (null) : (alert(passwordConfirmationMsg))}
                        onChangeText={(val) => setConfirmPassword(val)} />
                    <TouchableOpacity style={styles.button} onPress={() => handleRegister(username, Password, ConfirmPassword, Email, navigation)}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                        <View style={{}}>
                            <Text style={styles.TextBtn}>already have account ?</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ShowPattern()}>
                        <View style={{}}>
                            <Text style={styles.TextBtn}>Patterns</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1155',
        alignItems: 'center',
        justifyContent: "space-evenly",
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
    TextBtn: {
        color: 'white',
        textDecorationLine: 'underline',
        margin: 10
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