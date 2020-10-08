import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '../App'


const AboutScreen = () => {


    return (
        <View style={styles.container}>
            <View style={styles.TopPartContainer}>
                <Text style={styles.TopPartTxt}>
                    {translate("AboutOurApp")}
                </Text>
            </View>
            <View style={styles.SettingContaier}>
                <View style={{ marginVertical: 7 }}>
                    <Text style={styles.TxtHeader}>
                        {translate("ThisApp")}
                    </Text>
                    <Text style={styles.contentTxt}>
                        {'\t\t' + translate("AboutThisApp")}
                    </Text>
                </View>
                <View style={{ marginVertical: 7 }}>
                    <Text style={styles.TxtHeader}>
                    {translate("WhoAreWe")}
                    </Text>
                    <Text style={styles.contentTxt}>
                        {'\t\t' + translate("AboutThisApp")}
                    </Text>
                </View>
                <View style={styles.AuthorsContainer}>
                    <Text style={styles.Authors}>
                        Hamaidi Youcef islam
                    </Text>
                </View>
                <Text style={{ textAlign: "right", fontSize: 12, marginVertical: 10 }}>
                    U.S.T.H.B 2019-2020
                </Text>
            </View>
        </View>
    )
}

export default AboutScreen;



const styles = StyleSheet.create({
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
    SettingContaier: {
        flex: 0.8,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
        padding: 40,
        justifyContent: 'space-between'
    },
    TxtHeader: {
        fontSize: 20,
        fontWeight: "bold"
    },
    Authors: {
        fontWeight: 'bold'
    },
    contentTxt: {
        fontSize: 13,
        fontWeight: "900"
    },
    AuthorsContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    }
})