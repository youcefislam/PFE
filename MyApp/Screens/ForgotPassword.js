import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MyAddress } from '../address';
import { Body } from 'node-fetch';


const ForgotPassword = ({ navigation }) => {

    const [Email, setEmail] = useState('');
    const [VerifCode, setVerifCode] = useState();

    const SendVerifCode = () => {

        
        if (handleEmail()) {
            fetch(MyAddress + '/users/ForgotPoassword', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: Email }),
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert('Please Try again')
                }
            }).then((responseJSON) => {
                alert(responseJSON.message);
                if (!responseJSON.errors) {
                    setVerifCode(responseJSON.code);
                    navigation.navigate('ValidateCode', { VerifCode, Email });
                }
            })
        }else alert('Email must be Valid ')

    };

    const handleEmail = () => {    // Regular expression for the email 
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(Email);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'white', margin: 10 }}
                placeholder="Enter Your Email"
                onChangeText={(value) => setEmail(value)}
            />
            <TouchableOpacity onPress={SendVerifCode}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Send Verifecation Code</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0762D9',
    },
    button: {
        margin: 20,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'red',
        fontSize: 18,
    }

});

export default ForgotPassword;
