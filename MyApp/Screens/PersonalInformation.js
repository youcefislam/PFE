import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
    Keyboard
} from 'react-native';

import ViewPager from '@react-native-community/viewpager';
import RadioForm from 'react-native-simple-radio-button';
import { translate } from '../App';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
    uploadInfo,
    handleImagePicker,
} from '../address';
import { AuthContext } from '../App';

//hooks
import { useDimensions } from '@react-native-community/hooks';
import { BoxShadow } from 'react-native-shadow';
import NextBtnSvg from '../Img/SVG/svg8.svg';


const PersonalInformation = () => {

    const { signIn, signOut } = React.useContext(AuthContext);    //Use the Sign In function From AuthContext
    const [FirstName, setFirstName] = useState("");
    const [SecondName, setSecondName] = useState("");
    const [Sex, setSex] = useState("Male");
    const [state, setState] = useState({ srcImg: require('../Img/img6.png'), uri: '', fileName: '' })    // the User Photo Detail
    const [Index, setIndex] = useState(0)
    let secondInput;
    let viewPager = React.useRef(null);
    const screenHeight = useDimensions().screen.height;
    const screenWidth = useDimensions().screen.width;
    const shadowOpt = {
        width: 82,
        height: 36,
        color: "#5B4DA9",
        border: 10,
        radius: 15,
        opacity: 0.42,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    };

    const next = () => {
        setIndex(1);
        viewPager.current.setPage(1)
    };

    const onPageSelected = (e) => {
        setIndex(e.nativeEvent.position);
        Keyboard.dismiss()
    }





    return (
        <View style={{ flex: 1 }}>
            <ViewPager style={styles.viewPager} initialPage={0} ref={viewPager} onPageSelected={(e) => onPageSelected(e)} >
                <View key="1" >
                    <ImageBackground source={require('../Img/img4.png')} style={[styles.image, { height: screenHeight - StatusBar.currentHeight }]}>
                        <View style={styles.InfoView}>
                            <View style={{ marginVertical: 40 }}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setFirstName(text)}
                                    placeholder={translate("FirstName")}
                                    placeholderTextColor="#5A4CA7"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    onSubmitEditing={() => secondInput.focus()}
                                />
                                <TextInput
                                    ref={ref => { secondInput = ref }}
                                    style={styles.input}
                                    onChangeText={text => setSecondName(text)}
                                    placeholder={translate("SecondName")}
                                    placeholderTextColor="#5A4CA7"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                />
                            </View>
                            <RadioForm
                                radio_props={[
                                    { label: translate("Male"), value: 'Male' },
                                    { label: translate("Female"), value: 'female' }]}
                                formHorizontal={true}
                                animation={false}
                                buttonColor={'white'}
                                selectedButtonColor={'white'}
                                labelColor={'white'}
                                selectedLabelColor={'white'}
                                buttonSize={7}
                                labelStyle={{ marginRight: 20 }}
                                buttonOuterSize={20}
                                initial={0}
                                onPress={(value) => setSex(value)}
                            />
                        </View>
                        <View style={styles.nextBtnHundler}>
                            <BoxShadow setting={shadowOpt}>
                                <TouchableOpacity style={styles.nextBtn} onPress={next} activeOpacity={0.6}>
                                    <View style={styles.BtnTextHundle}>
                                        <Text style={styles.nextBtnTxt}>
                                            {translate("Next")}
                                        </Text>
                                    </View>
                                    <View style={styles.BtnSvgHundle}>
                                        <NextBtnSvg />
                                    </View>
                                </TouchableOpacity>
                            </BoxShadow>
                        </View>
                    </ImageBackground>
                </View>
                <View key="2" style={styles.view}>
                    <ImageBackground source={require('../Img/img5.png')} style={[styles.image, { height: screenHeight - StatusBar.currentHeight }]}>
                                <Text style={styles.Header}>{translate("AddPicture")}</Text>
                        <TouchableOpacity style={styles.ImgPicker} onPress={() => handleImagePicker(ImagePicker, setState)}>
                            <Image source={state.srcImg} style={styles.ProfilImage} />
                        </TouchableOpacity>
                        <View style={styles.nextBtnHundler}>
                            <BoxShadow setting={shadowOpt}>
                                <TouchableOpacity style={styles.nextBtn} onPress={() => uploadInfo(state, FirstName, SecondName, Sex, signOut, signIn)} activeOpacity={0.6}>
                                    <View style={styles.BtnTextHundle}>
                                        <Text style={styles.nextBtnTxt}>Done</Text>
                                    </View>
                                    <View style={styles.BtnSvgHundle}>
                                        <NextBtnSvg />
                                    </View>
                                </TouchableOpacity>
                            </BoxShadow>
                        </View>
                    </ImageBackground>
                </View>
            </ViewPager>
            <View style={[styles.progress, { left: screenWidth / 2 - 15 }]}>
                <View style={[styles.progressElem, Index === 0 ? styles.activeElem : styles.inactive]}></View>
                <View style={[styles.progressElem, Index === 1 ? styles.activeElem : styles.inactive]}></View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    image: {
        alignItems: 'center',
    },
    InfoView: {
        marginVertical: 20,
        justifyContent: 'space-around',
        flex: 0.5, alignItems: 'center'
    },
    input: {
        width: 230,
        height: 46,
        marginTop: 12,
        backgroundColor: "#fff",
        color: '#5A4CA7',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#5A4CA7',
        borderRadius: 15,
        paddingHorizontal: 20
    },
    ButtonText: {
        padding: 5,
        color: 'white'
    },
    view: {
        flex: 1,
        justifyContent: "space-around"
    },
    ProfilImage: {
        width: 216,
        height: 216,
        borderRadius: 200,
        resizeMode: 'cover'

    },
    buttonView: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: '50%',
        alignSelf: 'center'
    },
    progress: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        width: 30,
        justifyContent: 'space-between'
    },
    progressElem: {
        borderRadius: 50,
        width: 11,
        height: 11
    },
    activeElem: {
        backgroundColor: '#5B4DA9'
    },
    inactive: {
        borderWidth: 1,
        borderColor: '#5B4DA9'
    },
    nextBtn: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#9BA3EB',
        borderRadius: 15,
        width: 82,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextBtnTxt: {
        color: '#5B4DA9',
        fontSize: 13
    },
    nextBtnHundler: {
        position: 'absolute',
        bottom: 40,
        right: 15,
    },
    BtnSvgHundle: {
        alignItems: 'center'
    },
    BtnTextHundle: {
        width: 45,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImgPicker: {
        marginTop: "20%",
        borderRadius: 200,
        width: 216,
        height: 216,
        backgroundColor: 'white'
    },
    Header: {
        marginTop: "20%",
        fontSize: 20,
        color: '#fff'
    }
});


export default PersonalInformation;