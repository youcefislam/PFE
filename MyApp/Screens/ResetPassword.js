import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MyAddress } from '../address';


const ResetPassword = ({ route, navigation }) => {

    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    let secondInput, ValidationButton;


    //Screen Messages
    const passwordMsg = "Password need to :" +
        "\n   1-Be at least 8 characters long." +
        "\n   2-Include at least one of this characters ( !@#$%^&* )." +
        "\n   (note : other special characters are not allowed)" +
        "\n   3-Include at least one number." +
        "\n   4-Include at least one character.";
    const passwordConfirmationMsg = "Ops, Your password Confirmation should match your password"


    const ChangePassword = () => {
        if (handlePassword()) {
            if (Password === ConfirmPassword) {

                const data = {
                    email: route.params.Email,
                    password: Password
                };

                fetch(MyAddress + '/users/ResetPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                    .then((Response) => {
                        if(Response.status === 200)
                        {
                            return Response.json();
                        }else alert('something went wrong on the Server');
                    })
                    .then((responseJSON)=>{
                        alert(responseJSON.message);
                        if(!responseJSON.errors)
                        {
                            navigation.navigate('Signin');
                        }
                    })

            } else alert(passwordConfirmationMsg);
        } else alert(passwordMsg)
    }

    const handlePassword = () => {  // Regular expression for the password 
        const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return reg.test(Password);
    }

    return (
        <View style={styles.conatiner}>
            <TextInput
                secureTextEntry
                style={{ margin: 5, borderWidth: 2, borderColor: 'white' }}
                placeholder='New Password'
                returnKeyType='next'
                onChangeText={(value) => setPassword(value)}
                onSubmitEditing={() => { handlePassword() ? secondInput.focus() : alert(PasswordMsg) }}
            />
            <TextInput
                ref={ref => { secondInput = ref; }}
                secureTextEntry
                style={{ margin: 5, borderWidth: 2, borderColor: 'white' }}
                placeholder='Confirm New Password'
                onChangeText={(value) => setConfirmPassword(value)}
                onSubmitEditing={() => handlePasswordConfirm() ? (null) : (alert(passwordConfirmationMsg))}
            />
            <TouchableOpacity ref={ref => { ValidationButton = ref }} style={styles.button} onPress={ChangePassword} >
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