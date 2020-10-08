import React from 'react';
import { translate } from '../App';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Text,
    ImageBackground,
} from 'react-native';

import { BoxShadow } from 'react-native-shadow';
import SignInSvg from '../Img/SVG/svg1.svg';
import SignUpSvg from '../Img/SVG/svg2.svg'

const Welcome = ({ navigation }) => {

    const shadowOpt = {
        width: 166,
        height: 50,
        color: "#5B4DA9",
        border: 10,
        radius: 15,
        opacity: 0.42,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ImageBackground source={require('../Img/img1.png')} style={styles.image}>
                <BoxShadow setting={shadowOpt}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Signin") }} activeOpacity={0.8} >
                        <View style={styles.buttonSignIn}>
                            <View style={styles.BtnSvgHundle}>
                                <SignInSvg />
                            </View>
                            <View style={styles.BtnTextHundle}>
                                <Text style={styles.buttonSignInText}>
                                    {translate("SignIn")}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }} activeOpacity={0.8}>
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
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    title: {
        color: '#F6CF42',
        fontSize: 40,
    },
    BtnSvgHundle: {
        alignItems: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',

    },
    buttonSignIn: {
        flexDirection: 'row',
        width: 166,
        height: 50,
        backgroundColor: "#fff",
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonSignUp: {
        flexDirection: 'row',
        width: 166,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#5B4DA9',
    },
    BtnTextHundle: {
        width: 90,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSignInText: {
        color: '#5B4DA9',
        fontSize: 15,
    },
    buttonSignUPText: {
        color: '#F2EEF8',
        fontSize: 15,
        position: 'relative',
        left: 0
    }

});

export default Welcome;