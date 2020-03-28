import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import RadioForm from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import {
    uploadInfo,
    handleImagePicker
} from '../address';
import { AuthContext } from '../App';


const PersonalInformation = () => {

    const { signIn, signOut } = React.useContext(AuthContext);    //Use the Sign In function From AuthContext

    const [FirstName, setFirstName] = useState("");
    const [SecondName, setSecondName] = useState("");
    const [Sex, setSex] = useState("Male");
    const [state, setState] = useState({ srcImg: {}, uri: '', fileName: '' })    // the User Photo Detail
    let secondInput;





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
                </View>
            </View>
            <View key="2" style={styles.view}>
                <Image source={state.srcImg} style={styles.ProfilImage} />
                <TouchableOpacity style={styles.buttonView} onPress={() => handleImagePicker(ImagePicker, setState)}>
                    <Text style={styles.ButtonText}>Choose your Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={() => uploadInfo(state, FirstName, SecondName, Sex,  signOut, signIn)}>
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
    ButtonText: {
        padding: 5,
        color: 'white'
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

