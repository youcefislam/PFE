import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import {requestSousSpecialite } from '../address';
import { AuthContext } from '../App';


const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);

    const specialite = route.params;  // The Speciality info (used to fetch the List Of it subSpeciality from the server)              
    const [SousSpecialities, setSousSpecialities] = useState([]);

    useEffect(() => {

        
        requestSousSpecialite(specialite.specialiteid,setSousSpecialities,signOut);
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