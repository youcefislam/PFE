import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SendFeedBack } from '../address';
import { AuthContext, translate } from '../App';



const sendFeedBackScreen = ({ navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const [text, settext] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.TopPartContainer}>
                <Text style={styles.TopPartTxt}>
                    {translate("SendFeedBack")}
                </Text>
            </View>
            <View style={styles.InputContaier}>
                <TextInput
                    style={{ borderWidth: 1, padding: 20, borderRadius: 15, borderColor: "#848484", height: '70%', width: '80%', textAlignVertical: "top" }}
                    placeholder={translate("WiteFeedBack")}
                    placeholderTextColor="#848484"
                    multiline={true}
                    selectionColor='#5F33ECFF'
                    val={text}
                    autoFocus={true}
                    onChangeText={text => settext(text)}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => SendFeedBack(text, signOut)}>
                        <Text style={styles.MarksBtnText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.MarksBtnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default sendFeedBackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#5F33EC',
        justifyContent: 'flex-end'
    },
    TopPartContainer: {
        flex: 0.3,
        justifyContent: 'center',
        marginLeft: '8%'
    },
    TopPartTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    InputContaier: {
        flex: 0.8,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    MarksBtnText: {
        color: '#3F87DB'
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
})