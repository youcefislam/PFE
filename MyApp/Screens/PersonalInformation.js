import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import {
    uploadInfo,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleImagePicker
} from '../address';
import { AuthContext } from '../App';


const PersonalInformation = () => {

    const { signIn, signOut } = React.useContext(AuthContext);    //Use the Sign In function From AuthContext

    const [FirstName, setFirstName] = useState("");
    const [SecondName, setSecondName] = useState("");
    const [Sex, setSex] = useState("Male");
    const [BirthDay, setBirthDay] = useState('');
    const [Profession, setProfession] = useState('');
    const [University, setUniversity] = useState('');
    const [Specialty, setSpecialty] = useState('');
    const [subspecialty, setsubspecialty] = useState('')
    const [state, setState] = useState({ srcImg: {}, uri: '', fileName: '' })    // the User Photo Detail
    let secondInput, thirdInput, forthInput;


    //Screen Messages
    const BirthDayPlaceHolder = 'Please Enter Your Birthday';


    // DatePicker Initialization
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);




    return (
        <ViewPager style={styles.viewPager} initialPage={0}>
            <View key="1" >
                <TextInput
                    style={styles.TextInput}
                    onChangeText={text => setFirstName(text)}
                    placeholder="First Name"
                    placeholderTextColor="white"
                    returnKeyType="next"
                    onSubmitEditing={() => secondInput.focus()}
                />
                <TextInput
                    red={ref => { secondInput = ref }}
                    style={styles.TextInput}
                    onChangeText={text => setSecondName(text)}
                    placeholder="Second Name"
                    placeholderTextColor="white"
                    returnKeyType="next"
                />
                <View>
                    <RadioForm
                        radio_props={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'female' }]}
                        formHorizontal={true}
                        animation={false}
                        buttonColor={'white'}
                        selectedButtonColor={'white'}
                        labelColor={'white'}
                        selectedLabelColor={'white'}
                        buttonSize={7}
                        labelStyle={{ marginRight: 10 }}
                        buttonOuterSize={20}
                        initial={0}
                        onPress={(value) => setSex(value)}
                    />
                    <View>
                        <TouchableOpacity style={styles.BirthDayButton} onPress={() => showDatePicker(setDatePickerVisibility)}>
                            <Text style={styles.ButtonText}>{BirthDay ? (BirthDay) : (BirthDayPlaceHolder)}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => handleConfirm(date, hideDatePicker, setDatePickerVisibility, setBirthDay)}
                            onCancel={() => hideDatePicker(setDatePickerVisibility)}
                            maximumDate={new Date('2010-12-31')}
                            minimumDate={new Date(1950, 0, 1)}
                        />
                    </View>
                </View>
            </View>
            <View key="2">
                <View style={styles.ProfessionPicker}>
                    <RNPickerSelect
                        placeholder={{ label: 'Please enter your profession' }}
                        onValueChange={(value) => setProfession(value)}
                        items={[
                            { label: 'Student', value: 'Student' },
                            { label: 'Teacher', value: 'Teacher' },
                            { label: 'Graduate', value: 'Graduate' },
                            { label: 'Guardian', value: 'Guardian' },
                        ]}
                    />
                </View>
                {
                    Profession == 'Student' || Profession == 'Teacher' ? (
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setUniversity(text)}
                            placeholder='Please enter the name of your university'
                            placeholderTextColor="white"
                            returnKeyType="next"
                            onSubmitEditing={() => { Profession == 'Student' ? (thirdInput.focus()) : (null) }}
                        />
                    ) : (null)
                }
                {
                    Profession == 'Student' ? (
                        <>
                            <TextInput
                                ref={ref => { thirdInput = ref }}
                                style={styles.TextInput}
                                onChangeText={text => setSpecialty(text)}
                                placeholder='Please enter the name of your Specialty'
                                placeholderTextColor="white"
                                returnKeyType="next"
                                onSubmitEditing={() => { forthInput.focus() }}
                            />
                            <TextInput
                                ref={ref => { forthInput = ref }}
                                style={styles.TextInput}
                                onChangeText={text => setsubspecialty(text)}
                                placeholder='Please enter the name of your subspecialty'
                                placeholderTextColor="white"
                                returnKeyType="next"
                            />
                        </>
                    ) : (null)
                }
            </View>
            <View key="3" style={styles.view}>
                <Image source={state.srcImg} style={styles.ProfilImage} />
                <TouchableOpacity style={styles.buttonView} onPress={() => handleImagePicker(ImagePicker, setState)}>
                    <Text style={styles.ButtonText}>Choose your Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={() => uploadInfo(state, FirstName, SecondName, Sex, BirthDay, Profession, University, Specialty, subspecialty, signOut, signIn)}>
                    <Text style={styles.ButtonText}>Send File</Text>
                </TouchableOpacity>
            </View>
        </ViewPager>
    );


}

export default PersonalInformation;

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: '#0762D9',
    },
    TextInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        margin: 10,
        color: 'white'
    },
    BirthDayButton: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: '50%',
        alignSelf: 'center'
    },
    ButtonText: {
        padding: 5,
        color: 'white'
    },
    ProfessionPicker: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 8,
        margin: 10
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    ProfilImage: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 200
    },
    buttonView: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: '50%',
        alignSelf: 'center'
    },
});

