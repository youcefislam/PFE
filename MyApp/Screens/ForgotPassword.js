import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SendVerifCode } from '../address';

const ForgotPassword = ({ navigation }) => {

    const [Email, setEmail] = useState('');


    return (
        <View style={styles.container}>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'white', margin: 10 }}
                placeholder="Enter Your Email"
                onChangeText={(value) => setEmail(value)}
            />
            <TouchableOpacity onPress={()=>SendVerifCode(Email,navigation)}>
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
