import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import { MyAddress } from '../address';


const MoreAboutMe = () => {


    const options = {
        title: 'Select Profile Picture',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'photo'
    };


    const [FirstName, setFirstName] = useState("");
    const [SecondName, setSecondName] = useState("");
    const [Sex, setSex] = useState("Male");
    const [BirthDay, setBirthDay] = useState('please Enter your Birthday');
    const [Profession, setProfession] = useState('');
    const [University, setUniversity] = useState('');
    const [Specialty, setSpecialty] = useState('');
    const [subspecialty, setsubspecialty] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [state, setState] = useState({ avatarSource: {} })

    const showDatePicker = async () => {

    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        hideDatePicker();
        setBirthDay(date.toISOString().slice(0, 10));
    };






    return (
        <ViewPager style={styles.viewPager} initialPage={0}>
            <View key="1" >
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, color: 'white' }}
                    onChangeText={text => setFirstName(text)}
                    placeholder="Username"
                    placeholderTextColor="white"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, color: 'white' }}
                    onChangeText={text => setSecondName(text)}
                    placeholder="Username"
                    placeholderTextColor="white"
                />
                <View>
                    <RadioForm
                        radio_props={[{ label: 'Male', value: 'Male' },
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
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignItems: 'center', borderWidth: 2, borderColor: 'white', width: '50%' }} onPress={showDatePicker}>
                                <Text style={{ padding: 5, color: 'white' }}>{BirthDay}</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date('2010-12-31')}
                            minimumDate={new Date(1950, 0, 1)}
                        />
                    </View>
                </View>
            </View>
            <View key="2">
                <View style={{
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 8,
                    margin: 10
                }}>
                    <RNPickerSelect
                        placeholder={{ label: 'Please enter your profession' }}
                        onValueChange={(value) => setProfession(value)}
                        items={[
                            { label: 'Student', value: 'Student' },
                            { label: 'Teacher', value: 'Teacher' },
                            { label: 'Graduate', value: 'Graduate' },
                        ]}
                    />
                </View>
                {Profession == 'Student' || Profession == 'Teacher' ? (
                    <TextInput
                        style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, color: 'white' }}
                        onChangeText={text => setUniversity(text)}
                        placeholder='Please enter the name of your university'
                        placeholderTextColor="white"
                    />
                ) : (null)
                }
                {
                    Profession == 'Student' ? (
                        <>
                            <TextInput
                                style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, color: 'white' }}
                                onChangeText={text => setSpecialty(text)}
                                placeholder='Please enter the name of your Specialty'
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, color: 'white' }}
                                onChangeText={text => setsubspecialty(text)}
                                placeholder='Please enter the name of your subspecialty'
                                placeholderTextColor="white"
                            />
                        </>
                    ) : (null)
                }
            </View>
            <View key="3" style={{ flex: 1, alignItems: 'center', justifyContent: "space-around" }}>
                <Image source={state.avatarSource} style={{ width: 300, height: 300, borderWidth: 1, borderColor: 'white', borderRadius: 200 }} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ alignItems: 'center', borderWidth: 2, borderColor: 'white', width: '50%' }} onPress={async () => {
                        await ImagePicker.showImagePicker(options, (response) => {
                            const source = { uri: 'data:image/jpeg;base64,' + response.data };
                            setState({
                                avatarSource: source,
                            });
                        })
                    }}>
                        <Text style={{ padding: 5, color: 'white' }}>Choose your Profile Picture</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ViewPager>
    );


}

export default MoreAboutMe;

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: '#0762D9',
    },

});

