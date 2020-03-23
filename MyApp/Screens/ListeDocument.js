import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { requestListeDocument } from '../address';
import { AuthContext } from '../App';


const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const SousSpecialite = route.params;

    const [ListeDocument, setListeDocument] = useState([]);

    useEffect(() => {

        requestListeDocument(SousSpecialite.SousSpecialiteid,setListeDocument,signOut)

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
                    );
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