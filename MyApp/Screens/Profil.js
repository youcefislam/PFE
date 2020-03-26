import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Modal, TouchableHighlight, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import {
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleImagePicker
} from '../address'


const Profil = ({ navigation }) => {

    const [Info, setInfo] = useState({
        username: 'youcefefef', email: 'exemple@gmail.com',
        FirstName: 'hamaidi', SecondName: 'youcef', Sex: "Male",
        BirthDay: '26-1-1998', Profession: 'Student', University: 'USTHB',
        Specialty: 'Informatique', subspecialty: 'ISIL', MyProfile: true
    })
    const [Edit, setEdit] = useState(false);
    const [myProfile, setmyProfile] = useState(Info.MyProfile);
    const [username, setUsername] = useState("");
    const [FirstName, setFirstName] = useState(Info.FirstName);
    const [SecondName, setSecondName] = useState(Info.SecondName);
    const [Sex, setSex] = useState(Info.Sex);
    const [BirthDay, setBirthDay] = useState(Info.BirthDay);
    const [Profession, setProfession] = useState(Info.Profession);
    const [University, setUniversity] = useState(Info.University);
    const [Specialty, setSpecialty] = useState(Info.Specialty);
    const [subspecialty, setsubspecialty] = useState(Info.subspecialty)
    const [state, setState] = useState({ "srcImg": { "uri": "file:///storage/emulated/0/Pictures/images/image-876d4081-5e0e-417e-82d1-9d468e6d304a.jpg" } })    // the User Photo Detail
    const [States, setStates] = useState(false)

    //Screen Messages
    const BirthDayPlaceHolder = 'Please Enter Your Birthday';


    // DatePicker Initialization
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    return (
        <SafeAreaView style={{}}>
            <ScrollView contentContainerStyle={style.scrollView} >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={States}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={{ flex: 2 ,backgroundColor:"#514f57b7"}}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{setStates(false);}}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 2}}>
                        <View style={{flex:1,alignItems:'center',paddingTop:10}}>
                            <Text style={{}}>Hello World!</Text>

                            <TouchableHighlight
                                style={{ backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setStates(false);
                                }}
                            >
                                <Text style={{}}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Text style={style.FieldContent}>{Info.username}</Text>
                {

                    Edit ? (
                        <TouchableOpacity onPress={() => handleImagePicker(ImagePicker, setState)}>
                            <Image source={state.srcImg} style={style.ProfilImage} />
                        </TouchableOpacity>) :
                        (<Image source={state.srcImg} style={style.ProfilImage} />)
                }
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>FirstName :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.FirstName}</Text>) :
                            (<TextInput style={style.input} value={FirstName} onChangeText={(val) => setFirstName(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>SecondName :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.SecondName}</Text>) :
                            (<TextInput style={style.input} value={SecondName} onChangeText={(val) => setSecondName(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>Sex :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.Sex}</Text>) :
                            (<RadioForm
                                radio_props={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'female' }]}
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
                                onPress={(value) => setSex(value)}
                            />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>BirthDay : </Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.BirthDay}</Text>) :
                            (<>
                                <TouchableOpacity onPress={() => showDatePicker(setDatePickerVisibility)}>
                                    <Text style={style.input}>{BirthDay ? (BirthDay) : (BirthDayPlaceHolder)}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    style={style.input}
                                    onConfirm={(date) => handleConfirm(date, hideDatePicker, setDatePickerVisibility, setBirthDay)}
                                    onCancel={() => hideDatePicker(setDatePickerVisibility)}
                                    maximumDate={new Date('2010-12-31')}
                                    minimumDate={new Date(1950, 0, 1)}
                                />
                            </>)
                    }
                </View>
                {
                    myProfile && !Edit ? (
                        <View style={style.ElementView}>
                            <Text style={style.FieldName}>Email : </Text>
                            <Text style={style.FieldContent}>{Info.email}</Text>
                        </View>
                    ) : (null)
                }

                <View style={style.ElementView}>
                    <Text style={style.FieldName}>Profession :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.Profession}</Text>) :
                            (<TextInput style={style.input} value={Profession} onChangeText={(val) => setProfession(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>University :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.University}</Text>) :
                            (<TextInput style={style.input} value={University} onChangeText={(val) => setUniversity(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>Specialty :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.Specialty}</Text>) :
                            (<TextInput style={style.input} value={Specialty} onChangeText={(val) => setSpecialty(val)} />)
                    }
                </View>
                <View style={style.ElementView}>
                    <Text style={style.FieldName}>subspecialty :</Text>
                    {
                        !Edit ? (<Text style={style.FieldContent}>{Info.subspecialty}</Text>) :
                            (<TextInput style={style.input} value={subspecialty} onChangeText={(val) => setsubspecialty(val)} />)
                    }
                </View>
                {
                    Edit ? (
                        <TouchableOpacity style={style.MarksBtn} onPress={() => setEdit(false)}>
                            <Text style={style.MarksBtnText}>Submit Edition</Text>
                        </TouchableOpacity>) :
                        myProfile ? (
                            <>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => { navigation.navigate('MyMarks') }}>
                                    <Text style={style.MarksBtnText}>Show My Marks</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => setEdit(true)}>
                                    <Text style={style.MarksBtnText}>Edit Profil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => { setStates(true); }}>
                                    <Text style={style.MarksBtnText}>Change username</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => { }}>
                                    <Text style={style.MarksBtnText}>Change password</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.MarksBtn} onPress={() => { }}>
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
    }
});

