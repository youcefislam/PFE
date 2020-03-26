import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { ChangePassword, passwordMsg, passwordConfirmationMsg, handlePasswordConfirm, handlePassword } from '../address';


const ResetPassword = ({ route, navigation }) => {

    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    // const Email = route.params.Email;
    let secondInput;

    return (
        <View style={styles.conatiner}>
            <TextInput
                secureTextEntry
                style={{ margin: 5, borderWidth: 2, borderColor: 'white' }}
                placeholder='New Password'
                returnKeyType='next'
                onChangeText={(value) => setPassword(value)}
                onSubmitEditing={() => { handlePassword(Password) ? secondInput.focus() : alert(passwordMsg) }}
            />
            <TextInput
                ref={ref => { secondInput = ref; }}
                secureTextEntry
                style={{ margin: 5, borderWidth: 2, borderColor: 'white' }}
                placeholder='Confirm New Password'
                onChangeText={(value) => setConfirmPassword(value)}
                onSubmitEditing={() => handlePasswordConfirm(Password,ConfirmPassword) ? (null) : (alert(passwordConfirmationMsg))}
            />
            <TouchableOpacity style={styles.button} onPress={()=>ChangePassword(Email, Password, ConfirmPassword, navigation)} >
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );

};

export default ResetPassword;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#0762D9'
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
})