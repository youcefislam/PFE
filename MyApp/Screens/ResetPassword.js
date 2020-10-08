import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { ChangePassword, passwordMsg, passwordConfirmationMsg, handlePasswordConfirm, handlePassword } from '../address';
import { translate } from '../App';
import { useDimensions } from '@react-native-community/hooks';
import { BoxShadow } from 'react-native-shadow';
import DoneBtnSvg from '../Img/SVG/svg9.svg';
import PasswordSvg from '../Img/SVG/svg4.svg';


const ResetPassword = ({ route, navigation }) => {

    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const Email = route.params.Email;
    const screenHeight = useDimensions().screen.height;
    let secondInput;
    const shadowOpt = {
        width: 90,
        height: 36,
        color: "#5B4DA9",
        border: 10,
        radius: 15,
        opacity: 0.42,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    };

    return (
        <View style={styles.conatiner}>
            <ImageBackground source={require('../Img/img9.png')} style={{ height: screenHeight - StatusBar.currentHeight }}>
                <View style={styles.contentStyle}>
                    <View style={styles.centerAlign}>
                        <Text style={styles.HeaderTxt}>
                            {translate("TextReset1")}
                        </Text>
                    </View>
                    <View style={styles.centerAlign}>
                        <View style={styles.InputHundler}>
                            <TextInput
                                style={styles.Input}
                                secureTextEntry
                                placeholder={translate("TextReset2")}
                                placeholderTextColor="#5A4CA7"
                                returnKeyType='next'
                                autoFocus={true}
                                onChangeText={(value) => setPassword(value)}
                                onSubmitEditing={() => { handlePassword(Password) ? secondInput.focus() : alert(passwordMsg) }}
                            />
                            <View style={styles.passSvg}>
                                <PasswordSvg />
                            </View>
                        </View>
                        <View style={styles.InputHundler}>
                            <TextInput
                                ref={ref => { secondInput = ref; }}
                                style={styles.Input}
                                secureTextEntry
                                placeholder={translate("TextReset3")}
                                placeholderTextColor="#5A4CA7"
                                returnKeyType='done'
                                onChangeText={(value) => setConfirmPassword(value)}
                                onSubmitEditing={() => handlePasswordConfirm(Password, ConfirmPassword) ? (null) : (alert(passwordConfirmationMsg))}
                            />
                            <View style={styles.passSvg}>
                                <PasswordSvg />
                            </View>
                        </View>
                    </View>
                    <View>
                        <BoxShadow setting={shadowOpt}>
                            <TouchableOpacity style={styles.sendBtn} onPress={() => ChangePassword(Email, Password, ConfirmPassword, navigation)} activeOpacity={0.6}>
                                <View style={styles.BtnTextHundle}>
                                    <Text style={styles.sendBtnTxt}>Done</Text>
                                </View>
                                <View style={styles.BtnSvgHundle}>
                                    <DoneBtnSvg />
                                </View>
                            </TouchableOpacity>
                        </BoxShadow>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

};

export default ResetPassword;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#fff'
    },
    centerAlign: {
        alignItems: 'center'
    },
    HeaderTxt: {
        color: '#5B4DA9',
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold",
    },
    ResendTxt: {
        color: '#5B4DA9',
        fontSize: 12,
        textDecorationLine: 'underline'
    },
    Input: {
        borderWidth: 1,
        borderColor: '#5B4DA9',
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 40,
        margin: 10,
        width: 289,
        height: 46,
        color: '#5A4CA7'
    },
    contentStyle: {
        flex: 0.6,
        justifyContent: 'space-evenly',
        marginTop: '15%',
        alignItems: 'center'
    },
    sendBtn: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#9BA3EB',
        borderRadius: 15,
        width: 90,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendBtnTxt: {
        color: '#5B4DA9',
        fontSize: 13
    },
    BtnSvgHundle: {
        alignItems: 'center'
    },
    BtnTextHundle: {
        width: 45,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    InputHundler: {
        flexDirection: 'row',
        position: 'relative'
    },
    passSvg: {
        position: 'absolute',
        right: 24,
        top: 23
    },
})