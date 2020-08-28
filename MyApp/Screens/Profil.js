import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Keyboard, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RadioForm from 'react-native-simple-radio-button';

//SVG 
import PasswordSvg from '../Img/SVG/svg41.svg';


import {
    handleUsername,
    handleImagePicker,
    UsernameMsg,
    changeUserNames,
    changeEmails,
    handleEmail,
    EmailMsg,
    changePasswords,
    passwordMsg,
    handlePassword,
    GetInfo,
    passwordConfirmationMsg,
    SubmitEditing
} from '../address'
import { AuthContext } from '../App';


const Profil = ({ route,navigation }) => {

    const [Info, setInfo] = useState({})
    const InfoUserId = route.params?route.params.id:null;
    const [Edit, setEdit] = useState(false);
    const [myProfile, setmyProfile] = useState(Info.myProfile);
    const [username, setUsername] = useState(Info.username);
    const [NewUsername, setNewUsername] = useState('')
    const [email, setemail] = useState(Info.email)
    const [FirstName, setFirstName] = useState(Info.FirstName);
    const [NewFirstName, setNewFirstName] = useState("")
    const [SecondName, setSecondName] = useState(Info.SecondName);
    const [NewSecondName, setNewSecondName] = useState("")
    const [Sex, setSex] = useState(Info.Sex);
    const [NewSex, setNewSex] = useState("")
    const [CurrentPassword, setCurrentPassword] = useState("")
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [ChangeEmail, setChangeEmail] = useState(false);
    const [ChangeUserName, setChangeUserName] = useState(false);
    const [ChangePassword, setChangePassword] = useState(false);
    const [ProfilImage, setProfilImage] = useState({})    // the User Photo Detail
    const [NewProfilImage, setNewProfilImage] = useState({})
    const [States, setStates] = useState(false)
    const { signOut } = React.useContext(AuthContext);
    const [isLoadingScreen, setisLoadingScreen] = useState(true);
    const [KeyBoardShown, setKeyBoardShown] = useState(false)


    useEffect(() => {

        // TODO ANIMATION
        Keyboard.addListener("keyboardDidShow", () => { setKeyBoardShown(true) });
        Keyboard.addListener("keyboardDidHide", () => { setKeyBoardShown(false) });
        navigation.addListener('blur', () => {
            Keyboard.removeListener("keyboardDidShow", () => { setKeyBoardShown(true) })
            Keyboard.removeListener("keyboardDidHide", () => { setKeyBoardShown(false) });
        })
        return navigation.addListener('focus', () => {
            GetInfo(InfoUserId, setisLoadingScreen, setInfo, setmyProfile, setUsername, setFirstName, setSecondName, setSex, setemail, setProfilImage, setNewProfilImage, signOut);
        })
    }, [navigation])


    const CancelChanges = () => {
        setStates(false); ChangeUserName ? setChangeUserName(false) : ChangeEmail ? setChangeEmail(false) : ChangePassword ? setChangePassword(false) : (null)
    }

    const SubmitChanges = () => {
        ChangeUserName ? (changeUserNames(NewUsername, setUsername, setStates, signOut), setChangeUserName(false)) : ChangeEmail ? (changeEmails(NewEmail, setemail, setStates, signOut), setChangeEmail(false)) : ChangePassword ? (changePasswords(CurrentPassword, Password, ConfirmPassword, setStates, signOut), setChangePassword(false)) : (null)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#5F33EC' }}>
            <View style={{ flex: 0.2, justifyContent: 'center', marginLeft: 20 }}>
                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                    Votre Profile!
                </Text>
            </View>
            <View style={{ flex: 0.85, backgroundColor: 'white', borderTopLeftRadius: 80, borderTopRightRadius: 80, overflow: 'hidden' }}>
                {
                    isLoadingScreen ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator size={40} color="#5F33EC" />
                        </View>
                    ) : (
                            <>
                                <ScrollView contentContainerStyle={style.scrollView} >
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={States}
                                        onRequestClose={() => {
                                            setStates(false);
                                        }}
                                    >
                                        <View style={{ flex: 2, backgroundColor: "#514f57b7" }}>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => CancelChanges()}>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: ChangePassword ? (KeyBoardShown ? "90%" : '60%') : '40%', borderTopLeftRadius: 68, borderTopRightRadius: 68, width: '100%', backgroundColor: 'white', position: 'absolute', bottom: 0 }}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-between", paddingVertical: 20 }}>
                                                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                                                    {
                                                        ChangeUserName ? (
                                                            <TextInput
                                                                //style={handleUsername() ? styles.input : styles.inputError}
                                                                style={style.inputImportant}
                                                                autoCompleteType="username"
                                                                placeholder="New Username"
                                                                placeholderTextColor="#969696"
                                                                onSubmitEditing={() => handleUsername(NewUsername) ? (null) : (alert(UsernameMsg))}
                                                                onChangeText={(val) => setNewUsername(val)} />
                                                        ) : ChangeEmail ? (
                                                            <TextInput
                                                                style={style.inputImportant}
                                                                placeholder="New Email"
                                                                autoCompleteType="email"
                                                                placeholderTextColor="#969696"
                                                                onSubmitEditing={() => handleEmail(NewEmail) ? (null) : (alert(EmailMsg))}
                                                                onChangeText={(val) => setNewEmail(val)}
                                                            />

                                                        ) : ChangePassword ? (
                                                            <>
                                                                <View style={style.InputHundler}>
                                                                    <TextInput
                                                                        style={style.inputImportant}
                                                                        secureTextEntry
                                                                        autoCompleteType="password"
                                                                        placeholder="*Current Password"
                                                                        placeholderTextColor="#969696"
                                                                        onChangeText={(val) => setCurrentPassword(val)} />
                                                                    <View style={style.passSvg}>
                                                                        <PasswordSvg />
                                                                    </View>
                                                                </View>
                                                                <View style={{ borderWidth: 1, marginBottom: 20, borderColor: '#969696' }} />
                                                                <View style={style.InputHundler}>
                                                                    <TextInput
                                                                        style={style.inputImportant}
                                                                        secureTextEntry
                                                                        autoCompleteType="password"
                                                                        placeholder="New Password"
                                                                        placeholderTextColor="#969696"
                                                                        onSubmitEditing={() => handlePassword(Password) ? (null) : alert(passwordMsg)}
                                                                        onChangeText={(val) => setPassword(val)} />
                                                                    <View style={style.passSvg}>
                                                                        <PasswordSvg />
                                                                    </View>
                                                                </View>
                                                                <View style={style.InputHundler}>
                                                                    <TextInput
                                                                        style={style.inputImportant}
                                                                        secureTextEntry
                                                                        autoCompleteType="password"
                                                                        placeholder="Confirm New Password"
                                                                        placeholderTextColor="#969696"
                                                                        onSubmitEditing={() => handlePassword(Password) ? (null) : alert(passwordConfirmationMsg)}
                                                                        onChangeText={(val) => setConfirmPassword(val)} />
                                                                    <View style={style.passSvg}>
                                                                        <PasswordSvg />
                                                                    </View>
                                                                </View>

                                                            </>
                                                        ) : (null)
                                                    }
                                                </View>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={style.ConfirmBtn} onPress={() => SubmitChanges()}>
                                                        <Text style={style.MarksBtnText}>Submit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.ConfirmBtn} onPress={() => CancelChanges()}>
                                                        <Text style={style.MarksBtnText}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Text style={style.FieldContent}>{username}</Text>
                                    {

                                        Edit ? (
                                            <TouchableOpacity style={style.ProfilImagConatiner} onPress={() => handleImagePicker(ImagePicker, setNewProfilImage)}>
                                                <Image source={NewProfilImage.srcImg} style={style.ProfilImage} />
                                            </TouchableOpacity>) :
                                            (<Image source={ProfilImage.srcImg} style={style.ProfilImage} />)
                                    }
                                    <View style={style.ElementView}>
                                        {
                                            !Edit ? (<Text style={style.FieldContent}>{'FirstName : ' + FirstName}</Text>) :
                                                (<TextInput style={style.input} autoFocus={true} placeholder={'FirstName : ' + FirstName} onChangeText={(val) => setNewFirstName(val)} />)
                                        }
                                    </View>
                                    <View style={style.ElementView}>
                                        {
                                            !Edit ? (<Text style={style.FieldContent}>{'SecondName :' + SecondName}</Text>) :
                                                (<TextInput style={style.input} placeholder={'SecondName : ' + SecondName} onChangeText={(val) => setNewSecondName(val)} />)
                                        }
                                    </View>
                                    <View style={style.ElementView}>
                                        {
                                            !Edit ? (<Text style={style.FieldContent}>{'Sex : ' + Sex}</Text>) :
                                                (<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text>Sex :</Text>
                                                    <RadioForm
                                                        radio_props={[
                                                            { label: 'Male', value: 'Male' },
                                                            { label: 'Female', value: 'Female' }]}
                                                        formHorizontal={true}
                                                        animation={false}
                                                        buttonColor={'#535151'}
                                                        selectedButtonColor={'#535151'}
                                                        labelColor={'#535151'}
                                                        selectedLabelColor={'#535151'}
                                                        buttonSize={7}
                                                        labelStyle={{ marginRight: 10 }}
                                                        buttonOuterSize={20}
                                                        initial={Sex == 'Male' ? (0) : (1)}
                                                        onPress={(value) => setNewSex(value)}
                                                    />
                                                </View>
                                                )
                                        }
                                    </View>
                                    {
                                        Edit ? (
                                            <>
                                                <TouchableOpacity style={style.MarksBtn} onPress={() => { setEdit(false); SubmitEditing(NewFirstName, NewSecondName, NewSex, NewProfilImage, setFirstName, setSecondName, setSex, setProfilImage, signOut) }}>
                                                    <Text style={style.MarksBtnText}>Submit Edition</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.MarksBtn} onPress={() => setEdit(false)}>
                                                    <Text style={style.MarksBtnText}>Cancel</Text>
                                                </TouchableOpacity>
                                            </>) :
                                            Info.myProfile ? (
                                                <>
                                                    <View style={style.ElementView}>
                                                        <Text style={style.FieldContent}>{'Email :' + email}</Text>
                                                    </View>
                                                    <TouchableOpacity style={style.MarksBtn} onPress={() => { navigation.navigate('MyMarks', { title: "My Marks" }) }}>
                                                        <Text style={style.MarksBtnText}>Show My Marks</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.MarksBtn} onPress={() => setEdit(true)}>
                                                        <Text style={style.MarksBtnText}>Edit Profil</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.MarksBtn} onPress={() => { setChangeUserName(true); setStates(true); }}>
                                                        <Text style={style.MarksBtnText}>Change username</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.MarksBtn} onPress={() => { setChangePassword(true); setStates(true); }}>
                                                        <Text style={style.MarksBtnText}>Change password</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.MarksBtn} onPress={() => { setChangeEmail(true); setStates(true); }}>
                                                        <Text style={style.MarksBtnText}>Change Email</Text>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (null)
                                    }
                                </ScrollView>
                            </>
                        )
                }
            </View>
        </View>
    );



}

export default Profil;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#548fdb'
    },
    scrollView: {
        width: "100%",
        padding: 10,
    },
    ProfilImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 200,
        alignSelf: "center"
    }, ProfilImagConatiner: {
        width: 200,
        height: 200,
        borderRadius: 200,
        alignSelf: "center"
    },
    FieldName: {
        textAlign: "center",
        fontSize: 10,
        padding: 1
    },
    FieldContent: {
        textAlign: "center",
        fontSize: 15,
        marginHorizontal: 15,
    },
    ElementView: {
        alignItems: 'baseline',
        marginVertical: 10,

    },
    MarksBtn: {
        borderWidth: 1,
        borderColor: '#3F87DB',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 10,
        height: 40,
    },
    MarksBtnText: {
        color: '#3F87DB'
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: "#626262"
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
    ConfirmBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3F87DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 10,
        paddingHorizontal: 25,
    },
    passSvg: {
        position: 'absolute',
        right: 14, top: 16
    },
    InputHundler: {
        flexDirection: 'row',
        position: 'relative'
    },
});

