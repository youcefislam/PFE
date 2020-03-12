import React,{useState,useEffect} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'


const Home = ({navigation}) => {

    const requestSpecialite = () => {
        //return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    
        return fetch('http://192.168.43.5:3000/specialite', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) =>{
                const resu = response.json();
                 return resu;})
            .then((responseJSON)=>{
            setSpecialities(responseJSON);
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const [specialities, setSpecialities] = useState([]);
    useEffect(() => {
        requestSpecialite()
    },[])
    return (
        <View style={{ flex: 1 }} >
            <FlatList style={{ flex: 1 }}
                numColumns={2}
                data={specialities}
                keyExtractor= {(item)=> item.id_specialite}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("sousSpecialite",{specialiteid:item.id_specialite,title:item.nom})}}>
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