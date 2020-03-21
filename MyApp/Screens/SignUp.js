import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MyAddress } from '../address';
import AsyncStorage from '@react-native-community/async-storage';



const SignUp = ({ navigation }) => {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")
    let secondInput, thirdInput, forthInput;

    //Screen Messages
    const passwordMsg = "Password need to :" +
        "\n   1-Be at least 8 characters long." +
        "\n   2-Include at least one of this characters ( !@#$%^&* )." +
        "\n   (note : other special characters are not allowed)" +
        "\n   3-Include at least one number." +
        "\n   4-Include at least one character.";
    const passwordConfirmationMsg = "Ops, Your password Confirmation should match your password";
    const SubmitionErrorMsg = 'Please check your informations again,it should match the required patterns';
    const EmailMsg = 'Email must be a Real & Valid Email.';
    const UsernameMsg = "Username need to :" +
        "\n   1-Be at least 8 Chartcters long." +
        "\n   2-contain Only charcters and Numbers. ";

    const handleRegister = () => {

        const data = { username: username, password: password, email: email };

        if (handlePassword() && handleEmail() && handleUsername() && handlePasswordConfirm()) {
            fetch(MyAddress + '/users/register', {     // send the data to the server 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    if (!responseJson.error){
                        await AsyncStorage.setItem('Token',responseJson.token);
                        navigation.navigate("MoreAboutMe");
                    }
                    alert(responseJson.message);
                })
                .catch((error) => {
                    console.error(error);
                })

        } else alert(SubmitionErrorMsg)
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
    const handlePasswordConfirm = () => {  // Confermation of the password 
        return password == passwordConfirm;
    }


    const ShowPattern = () => {
        alert("A- " +EmailMsg +"\nB- " +UsernameMsg +"\nC- " +passwordMsg +"\nD-Password Confirmation should match your password");
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}  >
                    <TextInput
                        //style={handleEmail() ? styles.input : styles.inputError}
                        onEndEditing={() => handleEmail()}
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#F2EEF8"
                        autoCompleteType="email"
                        returnKeyType="next"
                        onSubmitEditing={() => handleEmail() ? (secondInput.focus()) : (alert(EmailMsg))}
                        onChangeText={(val) => setEmail(val)} />

                    <TextInput
                        //style={handleUsername() ? styles.input : styles.inputError}
                        ref={ref => { secondInput = ref }}
                        style={styles.input}
                        autoCompleteType="username"
                        onEndEditing={() => handleUsername()}
                        placeholder="Username"
                        placeholderTextColor="#F2EEF8"
                        returnKeyType="next"
                        onSubmitEditing={() => handleUsername() ? (thirdInput.focus()) : (alert(UsernameMsg))}
                        onChangeText={(val) => setUsername(val)} />
                    <TextInput
                        //style={handlePassword() ? styles.input : styles.inputError}
                        ref={ref => { thirdInput = ref; }}
                        style={styles.input}
                        secureTextEntry
                        autoCompleteType="password"
                        placeholderTextColor="#F2EEF8"
                        onEndEditing={() => handlePassword()}
                        placeholder="Password"
                        returnKeyType="next"
                        onSubmitEditing={() => handlePassword() ? forthInput.focus() : alert(passwordMsg)}
                        onChangeText={(val) => setPassword(val)} />
                    <TextInput
                        //style={handlePasswordConfirm() ? styles.input : styles.inputError}
                        ref={ref => { forthInput = ref; }}
                        style={styles.input}
                        secureTextEntry
                        autoCompleteType="password"
                        onEndEditing={() => handlePasswordConfirm()}
                        placeholder="Confirm password"
                        placeholderTextColor="#F2EEF8"
                        onSubmitEditing={() => handlePasswordConfirm() ? (null) : (alert(passwordConfirmationMsg))}
                        onChangeText={(val) => setPasswordConfirm(val)} />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <View style={{}}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate("Signin")}>
                        <View style={{}}>
                            <Text style={{ color: 'white', textDecorationLine: 'underline', margin: 10 }}>already have account ?</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={ShowPattern}>
                        <View style={{}}>
                            <Text style={{ color: 'white', textDecorationLine: 'underline', margin: 10 }}>Patterns</Text>
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