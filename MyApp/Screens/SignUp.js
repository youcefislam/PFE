import React, { useState } from 'react'
import { translate } from '../App';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    StatusBar,

} from 'react-native';

import {
    passwordMsg,
    passwordConfirmationMsg,
    EmailMsg,
    UsernameMsg,
    handlePasswordConfirm,
    handlePassword,
    handleUsername,
    handleEmail,
    handleRegister,
    ShowPattern
} from '../address';

import { useDimensions } from '@react-native-community/hooks';
import { BoxShadow } from 'react-native-shadow';

//SVG
import SignUpSvg from '../Img/SVG/svg5.svg'
import InputSvg from '../Img/SVG/svg6.svg'


const SignUp = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")
    let secondInput, thirdInput, forthInput;
    const screenHeight = useDimensions().screen.height;
    const shadowOpt = {
        width: 146,
        height: 44,
        color: "#5B4DA9",
        border: 10,
        radius: 15,
        opacity: 0.42,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    }



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../Img/img3.png')} style={{ height: screenHeight - StatusBar.currentHeight }}>
                <KeyboardAvoidingView behavior='position' contentContainerStyle={{ marginTop: 60, alignItems: 'center' }} keyboardVerticalOffset={20} >
                    <View style={styles.InputHundler}>
                        <TextInput
                            //style={handleEmail() ? styles.input : styles.inputError}
                            // autoFocus={true}
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#5A4CA7"
                            autoCompleteType="email"
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => handleEmail(Email) ? (secondInput.focus()) : (alert(translate("EmailMsg")))}
                            onChangeText={(val) => setEmail(val)} />
                        <View style={styles.inputSvg}>
                            <InputSvg />
                        </View>
                    </View>
                    <View style={styles.InputHundler}>
                        <TextInput
                            //style={handleUsername() ? styles.input : styles.inputError}
                            ref={ref => { secondInput = ref }}
                            style={styles.input}
                            autoCompleteType="username"
                            placeholder={translate("username")}
                            maxLength={16}
                            placeholderTextColor="#5A4CA7"
                            autoCorrect={false}
                            returnKeyType="next"
                            onSubmitEditing={() => handleUsername(username) ? (thirdInput.focus()) : (alert(translate("UsernameMsg")))}
                            onChangeText={(val) => setUsername(val)} />
                        <View style={styles.inputSvg}>
                            <InputSvg />
                        </View>
                    </View>
                    <View style={styles.InputHundler}>
                        <TextInput
                            //style={handlePassword() ? styles.input : styles.inputError}
                            ref={ref => { thirdInput = ref; }}
                            style={styles.input}
                            secureTextEntry
                            autoCompleteType="password"
                            placeholderTextColor="#5A4CA7"
                            placeholder={translate("password")}
                            returnKeyType="next"
                            onSubmitEditing={() => handlePassword(Password) ? forthInput.focus() : alert(translate("PasswordMsg"))}
                            onChangeText={(val) => setPassword(val)} />
                        <View style={styles.inputSvg}>
                            <InputSvg />
                        </View>
                    </View>
                    <View style={styles.InputHundler}>
                        <TextInput
                            //style={handlePasswordConfirm() ? styles.input : styles.inputError}
                            ref={ref => { forthInput = ref; }}
                            style={styles.input}
                            secureTextEntry
                            autoCompleteType="password"
                            placeholder={translate("confirmPass")}
                            placeholderTextColor="#5A4CA7"
                            onSubmitEditing={() => handlePasswordConfirm(Password, ConfirmPassword) ? (null) : (alert(translate("passwordConfirmationMsg")))}
                            onChangeText={(val) => setConfirmPassword(val)} />
                        <View style={styles.inputSvg}>
                            <InputSvg />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => ShowPattern()}>
                        <Text style={styles.TextBtn}>
                            {translate("patterns")}
                        </Text>
                    </TouchableOpacity>
                    <BoxShadow setting={shadowOpt}>
                        <TouchableOpacity onPress={() => handleRegister(username, Password, ConfirmPassword, Email, navigation)} activeOpacity={0.8}>
                            <View style={styles.buttonSignUp}>
                                <View style={styles.BtnSvgHundle}>
                                    <SignUpSvg />
                                </View>
                                <View style={styles.BtnTextHundle}>
                                    <Text style={styles.buttonSignUPText}>
                                        {translate("SignUp")}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </BoxShadow>
                </KeyboardAvoidingView>

            </ImageBackground>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: 230,
        height: 46,
        marginTop: 12,
        backgroundColor: "#fff",
        color: '#5A4CA7',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#5A4CA7',
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 33
    },
    InputHundler: {
        flexDirection: 'row',
        position: 'relative'
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
        margin: 10,
        fontSize: 12
    },
    buttonSignUp: {
        flexDirection: 'row',
        width: 146,
        height: 44,
        backgroundColor: "#fff",
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    BtnTextHundle: {
        width: 90,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSignUPText: {
        color: '#5B4DA9',
        fontSize: 15,
    },
    BtnSvgHundle: {
        alignItems: 'center'
    },
    inputSvg: {
        position: 'absolute',
        right: 10,
        top: 25
    }
});
export default SignUp;