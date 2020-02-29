import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    return (
        <View style={styles.container}>
            
            <View style={{ flex: 1, marginTop : 100 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(val) => setEmail(val)} />
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
            <View style={{ flex: 1, }}>
                <TouchableOpacity onPress={handleRegister}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
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
    button: {
        backgroundColor: '#2196F3',
        margin: 20,
    },
    buttonText: {
        backgroundColor: '#8c1515',
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