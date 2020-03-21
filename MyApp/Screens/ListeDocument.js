import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MyAddress } from '../address';
import { AuthContext } from '../App';


const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const SousSpecialite = route.params;

    const [ListeDocument, setListeDocument] = useState([]);

    useEffect(() => {

        const requestListeDocument = async (SousSpecialiteid) => {

            const token = await AsyncStorage.getItem('Token');

            fetch(MyAddress + '/document', {        //get Document List From The Server
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ SousSpecialiteid: SousSpecialiteid }),
            })
                .then((response) => {
                    if (response.status !== 403) {      //If the Token ss Valide
                        return response.json();
                    }
                    else {
                        alert('You are not signed In');
                        signOut();
                    }
                })
                .then((responseJSON) => {
                    setListeDocument(responseJSON)
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        requestListeDocument(SousSpecialite.SousSpecialiteid)

    }, [])

    return (
        <View style={{ flex: 1 }} >
            <FlatList style={{ flex: 1 }}
                numColumns={1}
                data={ListeDocument}
                keyExtractor={(item) => item.id_document.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={() => { navigation.navigate("post", { documentid: item.id_document }) }}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.titre}</Text>
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
        height: 100,
        backgroundColor: "#ac1111",
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialityCardContent: {
        fontSize: 25,
        color: "white"
    }
});