import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
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


const Profil = ({ navigation }) => {

    const [Info, setInfo] = useState({})
    const InfoUserId = 20;
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
    const [ProfilImage, setProfilImage] = useState({ })    // the User Photo Detail
    const [NewProfilImage, setNewProfilImage] = useState({ })
    const [States, setStates] = useState(false)
    const { signOut } = React.useContext(AuthContext);
    const [isLoadingScreen, setisLoadingScreen] = useState(true)


    useEffect(() => {

        GetInfo(InfoUserId, setisLoadingScreen, setInfo, setmyProfile, setUsername, setFirstName, setSecondName, setSex, setemail, setProfilImage,setNewProfilImage,signOut);
    }, [])

    if (isLoadingScreen) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    const CancelChanges = () => {
        setStates(false); ChangeUserName ? setChangeUserName(false) : ChangeEmail ? setChangeEmail(false) : ChangePassword ? setChangePassword(false) : (null)
    }

    const SubmitChanges = () => {
        ChangeUserName ? (changeUserNames(NewUsername, setUsername, setStates, signOut), setChangeUserName(false)) : ChangeEmail ? (changeEmails(NewEmail,setemail, setStates, signOut), setChangeEmail(false)) : ChangePassword ? (changePasswords(CurrentPassword, Password, ConfirmPassword, setStates, signOut), setChangePassword(false)) : (null)
    }

    return (
        <SafeAreaView style={{}}>
            <ScrollView contentContainerStyle={style.scrollView} >
                <Modal
                    animationType="fade"
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
                    <View style={{ backgroundColor: 'white', flex: 3 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-between", paddingVertical: 20 }}>
                            
                                {
                                    ChangeUserName ? (
                                        <TextInput
                                            //style={handleUsername() ? styles.input : styles.inputError}
                                            style={style.inputImportant}
                                            autoCompleteType="username"
                                            placeholder="New Username"
                                            placeholderTextColor="black"
                                            onSubmitEditing={() => handleUsername(NewUsername) ? (null) : (alert(UsernameMsg))}
                                            onChangeText={(val) => setNewUsername(val)} />
                                    ) : ChangeEmail ? (
                                        <TextInput
                                            style={style.inputImportant}
                                            placeholder="New Email"
                                            autoCompleteType="email"
                                            placeholderTextColor="black"
                                            onSubmitEditing={() => handleEmail(NewEmail) ? (null) : (alert(EmailMsg))}
                                            onChangeText={(val) => setNewEmail(val)}
                                        />

                                    ) : ChangePassword ? (
                                        <>
                                            <TextInput
                                                style={style.inputImportant}
                                                secureTextEntry
                                                autoCompleteType="password"
                                                placeholder="Current Password"
                                                placeholderTextColor="black"
                                                onChangeText={(val) => setCurrentPassword(val)} />
                                            <TextInput
                                                style={style.inputImportant}
                                                secureTextEntry
                                                autoCompleteType="password"
                                                placeholder="New Password"
                                                placeholderTextColor="black"
                                                onSubmitEditing={() => handlePassword(Password) ? (null) : alert(passwordMsg)}
                                                onChangeText={(val) => setPassword(val)} />
                                            <TextInput
                                                style={style.inputImportant}
                                                secureTextEntry
                                                autoCompleteType="password"
                                                placeholder="Confirm New Password"
                                                placeholderTextColor="black"
                                                onSubmitEditing={() => handlePassword(Password) ? (null) : alert(passwordConfirmationMsg)}
                                                onChangeText={(val) => setConfirmPassword(val)} />
                                        </>
                                    ) :
                                                (null)
                                }
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
                    <Text style={style.FieldName}>FirstName :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{FirstName}</Text>) :
                            (<TextInput style={style.input} placeholder={FirstName} onChangeText={(val) => setNewFirstName(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>SecondName :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{SecondName}</Text>) :
                            (<TextInput style={style.input} placeholder={SecondName} onChangeText={(val) => setNewSecondName(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>Sex :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Sex}</Text>) :
                            (<RadioForm
                                radio_props={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'Female' }]}
                                formHorizontal={true}
                                animation={false}
                                buttonColor={'black'}
                                selectedButtonColor={'black'}
                                labelColor={'black'}
                                selectedLabelColor={'black'}
                                buttonSize={7}
                                labelStyle={{ marginRight: 10 }}
                                buttonOuterSize={20}
                                initial={Sex == 'Male' ? (0) : (1)}
                                onPress={(value) => setNewSex(value)}
                            />)
                    }
                </View>
                {
                    Edit ? (
                        <>
                            <TouchableOpacity style={style.MarksBtn} onPress={() => {setEdit(false);SubmitEditing(NewFirstName,NewSecondName,NewSex,NewProfilImage,setFirstName,setSecondName,setSex,setProfilImage,signOut)}}>
                                <Text style={style.MarksBtnText}>Submit Edition</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.MarksBtn} onPress={() => setEdit(false)}>
                                <Text style={style.MarksBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        </>) :
                        Info.myProfile ? (
                            <>
                                <View style={style.ElementView}>
                                    <Text style={style.FieldName}>Email : </Text>
                                    <Text style={style.FieldContent}>{email}</Text>
                                </View>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => { navigation.navigate('MyMarks') }}>
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
        </SafeAreaView>
    );



}

export default Profil;

const style = StyleSheet.create({
    container: {
        backgroundColor: '#548fdb'
    },
    scrollView: {
        width: "100%",
        padding: 10,
    },
    ProfilImage: {
        width: 200,
        height: 200,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: 'black',
        borderRadius: 200,
        alignSelf: "center"
    },ProfilImagConatiner: {
        width: 200,
        height: 200,
        borderColor: 'black',
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
        fontWeight: "bold",
        fontSize: 17,
        marginHorizontal: 2,
    },
    ElementView: {
        flexDirection: 'column',
        alignItems: 'baseline',
        marginVertical: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginVertical: 5,

    },
    MarksBtn: {
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 10,
        height: 30
    },
    MarksBtnText: {

    },
    input: {
        width: '100%',
        padding: 1,
    },
    inputImportant: {
        width: 260,
        height: 50,
        marginBottom: 20,
        backgroundColor: "transparent",
        fontSize: 15,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        paddingLeft: 20,
    },
    ConfirmBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 10,
        paddingHorizontal: 25,
    },
});

