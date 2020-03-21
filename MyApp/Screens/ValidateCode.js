import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';



const ValidateCode = ({ route, navigation }) => {

    const [ValidCode, setValidCode] = useState(route.params.ValidCode);
    const [VerifCode, setVerifCode] = useState();
    const [ReTypeTex, setReTypeTex] = useState('');

    const verfyCode = () => {
        console.log(ValidCode == VerifCode)
        VerifCode ? ValidCode == VerifCode  ? (navigation.navigate('ResetPassword', { Email: route.params.Email })) : (setReTypeTex('The Code You Entered Is Wrong')) : (setReTypeTex('Please Enter The Verify Code That You Recieved'))
    };

    return (
        <View style={styles.container}>
            {ReTypeTex ? (<Text style={{}}>{ReTypeTex}</Text>) : (null)}
            <TextInput
                style={{ borderWidth: 1, borderColor: 'white', margin: 10 }}
                placeholder='xxx-xxx'
                autoFocus={true}
                maxLength={6}
                keyboardType='numeric'
                returnKeyType='send'
                onChangeText={(value) => setVerifCode(value)}
            />
            <TouchableOpacity style={styles.button} onPress={() => { verfyCode() }}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack() }}>
                <Text style={{}}>Didn't recieve any Validation code ?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ValidateCode;

const styles = StyleSheet.create({
    container: {
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