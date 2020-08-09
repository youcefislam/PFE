import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { verfyCode } from '../address';

import { useDimensions } from '@react-native-community/hooks';
import { BoxShadow } from 'react-native-shadow';
import SendBtnSvg from '../Img/SVG/svg8.svg';



const ValidateCode = ({ route, navigation }) => {

    const [ValidCode, setValidCode] = useState(route.params.VerifCode);
    const [VerifCode, setVerifCode] = useState();
    const [ReTypeTex, setReTypeTex] = useState('');
    const screenHeight = useDimensions().screen.height;
    const Email = route.params.Email;
    const shadowOpt = {
        width: 169,
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
            <ImageBackground source={require('../Img/img8.png')} style={{ height: screenHeight - StatusBar.currentHeight }}>
                <View style={styles.contentStyle}>
                    {ReTypeTex ? (<Text style={{}}>{ReTypeTex}</Text>) : (null)}
                    <View style={styles.centerAlign}>
                        <Text style={styles.HeaderTxt}>
                            Check Your Email, and Enter the validation
                        </Text>
                        <Text style={styles.HeaderTxt}>
                            code that you recieved
                        </Text>
                    </View>
                    <View style={styles.centerAlign}>
                        <TextInput
                            style={styles.Input}
                            placeholder='xxx-xxx'
                            placeholderTextColor="#5A4CA7"
                            autoFocus={true}
                            autoCorrect={false}
                            maxLength={6}
                            keyboardType='numeric'
                            returnKeyType='send'
                            onChangeText={(value) => setVerifCode(value)}
                        />
                    </View>
                    <View style={styles.centerAlign}>
                        <Text style={styles.HeaderTxt}>
                            Didn’t recieve any code ?
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} activeOpacity={0.6}>
                            <Text style={styles.ResendTxt}>
                                Please re-enter your email
                        </Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <BoxShadow setting={shadowOpt}>
                            <TouchableOpacity style={styles.sendBtn} onPress={() => { verfyCode(Email, VerifCode, ValidCode, setReTypeTex, navigation) }} activeOpacity={0.6}>
                                <View style={styles.BtnTextHundle}>
                                    <Text style={styles.sendBtnTxt}>Verify</Text>
                                </View>
                                <View style={styles.BtnSvgHundle}>
                                    <SendBtnSvg />
                                </View>
                            </TouchableOpacity>
                        </BoxShadow>
                    </View>
                </View>
                {/* <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack() }}>
                    <Text style={{}}>Didn't recieve any Validation code ?</Text>
                </TouchableOpacity> */}
            </ImageBackground>
        </View>
    );
};

export default ValidateCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    centerAlign: {
        alignItems: 'center'
    },
    HeaderTxt: {
        color: '#5B4DA9',
        fontSize: 14,
        marginBottom:5,
        fontWeight:"bold",
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
        paddingHorizontal: 20,
        margin: 10,
        width: 183,
        height: 46,
        color: '#5A4CA7',
        textAlign: 'center'
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
        width: 169,
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
        width: 140,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})