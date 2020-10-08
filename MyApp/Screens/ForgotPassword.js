import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { SendVerifCode } from '../address';
import { translate } from "../App"

import { useDimensions } from '@react-native-community/hooks';
import { BoxShadow } from 'react-native-shadow';
import SendBtnSvg from '../Img/SVG/svg8.svg';


const ForgotPassword = ({ navigation }) => {

    const [Email, setEmail] = useState('');
    const screenHeight = useDimensions().screen.height;
    const shadowOpt = {
        width: 179,
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
        <View style={styles.container}>
            <ImageBackground source={require('../Img/img7.png')} style={{ height: screenHeight - StatusBar.currentHeight }}>
                <View style={styles.contentStyle}>
                    <View style={styles.centerAlign}>
                        <Text style={styles.HeaderTxt}>
                            {translate("TextForgot1")}
                        </Text>
                        <Text style={styles.HeaderTxt}>
                            {translate("TextForgot2")}
                        </Text>
                    </View>
                    <View style={styles.centerAlign}>
                        <TextInput
                            style={styles.Input}
                            placeholder={translate("TextForgot3")}
                            placeholderTextColor="#5A4CA7"
                            autoCorrect={false}
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                    <View>
                        <BoxShadow setting={shadowOpt}>
                            <TouchableOpacity style={styles.sendBtn} onPress={() => SendVerifCode(Email, navigation)} activeOpacity={0.6}>
                                <View style={styles.BtnTextHundle}>
                                    <Text style={styles.sendBtnTxt}>
                                        {translate("TextForgot4")}
                                    </Text>
                                </View>
                                <View style={styles.BtnSvgHundle}>
                                    <SendBtnSvg />
                                </View>
                            </TouchableOpacity>
                        </BoxShadow>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    centerAlign: {
        alignItems: 'center'
    },
    HeaderTxt: {
        color: '#5B4DA9',
        fontSize: 13
    },
    Input: {
        borderWidth: 1,
        borderColor: '#5B4DA9',
        borderRadius: 15,
        paddingHorizontal: 20,
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
        width: 179,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendBtnTxt: {
        textAlign: 'center',
        color: '#5B4DA9',
        fontSize: 12
    },
    BtnSvgHundle: {
        alignItems: 'center'
    },
    BtnTextHundle: {
        width: 140,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ForgotPassword;
