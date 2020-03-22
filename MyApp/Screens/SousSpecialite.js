import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MyAddress } from '../address';
import { AuthContext } from '../App';


const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);

    const specialite = route.params;  // The Speciality info (used to fetch the List Of it subSpeciality from the server)              
    const [SousSpecialities, setSousSpecialities] = useState([]);

    useEffect(() => {

        const requestSousSpecialite = async (idSpecialite) => {     //get the subSpeciality List From The Server

            const token = await AsyncStorage.getItem('Token');   //check token

            fetch(MyAddress + '/SousSpecialite', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ idSpecialite: idSpecialite }),
            })
                .then((response) => {
                    if (Response.status === 200) {
                        if (response.status !== 403) {  // if the token is verified
                            return response.json();
                        }
                        else {
                            alert('You are not signed In');
                            signOut();
                        }
                    }
                    else alert('something went wrong on the server')
                })
                .then((responseJSON) => {
                    setSousSpecialities(responseJSON);      //Set subSpeciality List
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        requestSousSpecialite(specialite.specialiteid);
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <FlatList style={{ flex: 1 }}
                numColumns={2}
                data={SousSpecialities}
                keyExtractor={(item) => item.id_sous_specialite.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={() => { navigation.navigate("ListeDocument", { SousSpecialiteid: item.id_sous_specialite }) }}>
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