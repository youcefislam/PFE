import React,{useState} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight, AsyncStorage } from 'react-native'
const requestSpecialite = () => {
    return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    
    fetch('http://192.168.43.82:3000/specialite', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
    })
        .then((response) =>{ 
            alert(response.json());
        })
        .catch((error) => {
            console.error(error);
        })
}
const Home = ({navigation}) => {
    const [specialities, setSpecialities] = useState(requestSpecialite);

    return (
        <View style={{ flex: 1 }} >
            <FlatList style={{ flex: 1 }}
                numColumns={2}
                data={specialities}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("SousSpecialite",{specialiteid:item.id,title:item.title})}}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.title}</Text>
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