import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Modal, TouchableOpacity, Alert, TextInput, DevSettings } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext, translate, setTransulation } from '../App';



//SVG 
import NotificationSvg from '../Img/SVG/svg42.svg';
import LanguageSvg from '../Img/SVG/svg43.svg';
import DeleteAccountSvg from '../Img/SVG/svg44.svg';
import FeedbackSvg from '../Img/SVG/svg45.svg';
import AboutSvg from '../Img/SVG/svg46.svg';
import LogoutSvg from '../Img/SVG/svg47.svg';
import OffNotificationSvg from '../Img/SVG/svg48.svg';
import PasswordSvg from '../Img/SVG/svg41.svg';


const settingScreen = ({ route, navigation }) => {


    const [notification, setnotification] = useState(null);
    const [States, setStates] = useState(false);
    const [DeleteAcount, setDeleteAcount] = useState(false);
    const [confirmed, setconfirmed] = useState(false);
    const [CurrentPassword, setCurrentPassword] = useState('');
    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        const s = async () => {
            setnotification(await AsyncStorage.getItem('Notifcation'))
        }
        s();
    }, [])


    const ChangeLanguage = (la) => {

        Alert.alert("Confirmation", translate("ConfirmText") + (la == 'en' ? 'English' : 'Francais'),
            [
                {
                    text: translate('Yes'),
                    onPress: () => {
                        setTransulation(la);
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        setStates(false)
                    }
                }
            ]
        )
    }

    const notifyMe = async () => {
        if (notification) {
            await AsyncStorage.removeItem('Notifcation');
            setnotification(null);
            ToastAndroid.show('Notification off !', ToastAndroid.SHORT);
        }
        else {
            await AsyncStorage.setItem("Notifcation", "true");
            setnotification(true)
            ToastAndroid.show('Notification on !', ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.3, justifyContent: 'center', marginLeft: 20 }}>
                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                    {translate("SettingsName")}
                </Text>
            </View>
            <View style={styles.SettingContaier}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={States}
                    onRequestClose={() => {
                        setStates(false);
                    }}

                >
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => setStates(false)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: '35%', left: '20%', backgroundColor: '#5F33EC', height: '30%', width: '60%', borderRadius: 15, justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                            Choose a language :
                        </Text>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => ChangeLanguage('fr')}>
                            <Text style={{ color: 'white' }}>
                                francais
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => ChangeLanguage('en')}>
                            <Text style={{ color: 'white' }}>
                                English
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setStates(false)}>
                            <Text style={{ color: 'white' }}>
                                cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={DeleteAcount}
                    onRequestClose={() => {
                        setDeleteAcount(false);
                    }}

                >
                    <View style={{ flex: 1, backgroundColor: "rgba(41, 41, 41, 0.72)" }} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => setDeleteAcount(false)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: '30%', left: '10%', backgroundColor: 'white', height: '40%', width: '80%', borderRadius: 15, justifyContent: 'space-between', padding: 20 }}>
                        {
                            confirmed ? (
                                <>
                                    <View style={styles.InputHundler}>
                                        <TextInput
                                            style={styles.inputImportant}
                                            secureTextEntry
                                            autoCompleteType="password"
                                            placeholder="*Current Password"
                                            placeholderTextColor="#969696"
                                            onChangeText={(val) => setCurrentPassword(val)} />
                                        <View style={styles.passSvg}>
                                            <PasswordSvg />
                                        </View>
                                    </View>
                                </>
                            ) : (
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        Do you really want to Delete Your Account ?
                                    </Text>
                                )}
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10 }} onPress={() => setDeleteAcount(false)}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {confirmed ? 'Cancel' : 'No'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10 }} onPress={() => confirmed ? alert('account deleted !') : setconfirmed(true)}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                    {confirmed ? 'Confirm' : 'Yes'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <View>
                    <TouchableOpacity style={styles.BtnContainer} onPress={() => setStates(true)}>
                        <LanguageSvg />
                        <Text style={styles.text}>
                            {translate("ChangeLanguage")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnContainer} onPress={notifyMe}>
                        {notification ? <OffNotificationSvg /> : <NotificationSvg />}
                        <Text style={styles.text}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnContainer} onPress={() => setDeleteAcount(true)}>
                        <DeleteAccountSvg />
                        <Text style={[styles.text, { color: '#FF7070' }]}>
                            {translate("DeleteMyAccount")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.seperator}></View>
                <View>
                    <TouchableOpacity style={styles.BtnContainer} onPress={() => { navigation.navigate('FeedBack') }}>
                        <FeedbackSvg />
                        <Text style={styles.text} >
                            {translate("SendFeedBack")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnContainer} onPress={() => { navigation.navigate('About') }}>
                        <AboutSvg />
                        <Text style={styles.text}>
                            {translate("About")}

                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.BtnContainer} onPress={() => signOut()}>
                        <LogoutSvg />
                        <Text style={styles.text}>
                            {translate("Logout")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default settingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F33EC',
        justifyContent: 'flex-end'
    },
    SettingContaier: {
        flex: 0.7,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
        padding: 40,
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 20,
        color: "#909090",
        marginLeft: 9
    },
    BtnContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 3
    },
    seperator: {
        borderWidth: 1,
        borderColor: "#909090"
    },
    InputHundler: {
        flexDirection: 'row',
        position: 'relative'
    },
    inputImportant: {
        width: 260,
        height: 50,
        marginBottom: 20,
        backgroundColor: "transparent",
        fontSize: 15,
        borderWidth: 2,
        borderColor: '#969696',
        borderRadius: 15,
        paddingLeft: 20,
    },
    passSvg: {
        position: 'absolute',
        right: 14, top: 16
    },
})
