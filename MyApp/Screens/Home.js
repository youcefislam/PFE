import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { requestSpecialite } from '../address';
import { AuthContext } from '../App';

const Home = ({ navigation }) => {


    const { signOut } = React.useContext(AuthContext);
    const [specialities, setSpecialities] = useState([]);

    
    useEffect(() => {
        requestSpecialite(setSpecialities,signOut);
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