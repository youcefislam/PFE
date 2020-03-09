import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';


const Welcome = ({ navigation }) => {


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={{}}>
                <Text style={styles.title}>Logo</Text>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => { navigation.navigate("Signin") }}>
                    <View style={styles.buttonSignIn}>
                        <Text style={styles.buttonSignInText}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                    <View style={styles.buttonSignUp}>
                        <Text style={styles.buttonSignUPText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor:'#0D0829'
    },
    title:{
        color:'#F6CF42',
        fontSize:40,
    },

    buttonSignIn: {
        margin:20,
        width: 200,
        height:50,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        backgroundColor: '#F2EEF8',
    },
    buttonSignUp:{
        margin: 20,
        width: 200,
        height:50,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor:'#F2EEF8',
        backgroundColor: '#0D0829',
    },
    buttonSignInText: {
        color: '#0D0829',
        fontSize: 18,
    },
    buttonSignUPText:{
        color:'#F2EEF8',
        fontSize: 18,
    }

});

export default Welcome;