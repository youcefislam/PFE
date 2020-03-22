import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MyAddress } from '../address';


const Home = ({ navigation }) => {


    const [specialities, setSpecialities] = useState([]);

    useEffect(() => {

        const requestSpecialite = async () => {

            const token = await AsyncStorage.getItem('Token');

            return fetch(MyAddress + '/specialite', {           //fetch Speciality List from the server
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
            })
                .then((response) => {
                    if (response.status !== 403) {   // if token verified
                        return response.json();
                    }
                    else {
                        alert('You are not sign In');
                        signOut();
                    }
                })
                .then((responseJSON) => {
                    setSpecialities(responseJSON);
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        requestSpecialite()
    }, [])
    return (
        <View style={{ flex: 1 }} >
            <FlatList style={{ flex: 1 }}
                numColumns={2}
                data={specialities}
                keyExtractor={(item) => item.id_specialite.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={() => { navigation.navigate("SousSpecialite", { specialiteid: item.id_specialite, title: item.nom }) }}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.nom}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                }}
            />
        </View>
    )

}

export default Home
const Styles = StyleSheet.create({
    flex: { flex: 1 },
    specialityCard: {
        borderRadius: 6,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: "#ac1111",
        width: '48%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialityCardContent: {
        fontSize: 25,
        color: "white"
    }
});