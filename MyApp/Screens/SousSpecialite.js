import React,{useState,useEffect} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'
const Home = ({route,navigation}) => {
    const requestSousSpecialite = (idSpecialite) => {
        fetch('http://192.168.43.5:3000/SousSpecialite', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idSpecialite:idSpecialite}),
        })
            .then((response) =>{
                console.log("response "+response.body)
                const resu = response.json();
                return resu;
            })
            .then((responseJSON)=>{
                console.log("responseJSON" +responseJSON)
                setSousSpecialities(responseJSON);
                })
            .catch((error) => {
                console.error(error);
            })
    }
    const specialite = route.params;
    const [SousSpecialities, setSousSpecialities] = useState([]);
    useEffect(() => {
        requestSousSpecialite(specialite.specialiteid)
    },[])
    return (
        <View style={{flex:1}} >
            <View><Text>smthn {specialite.title}</Text></View>
            <FlatList style={{flex:1}}
                numColumns={2}
                data={SousSpecialities}
                keyExtractor= {(item)=> item.id_sous_specialite}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("document",{SousSpecialiteid:item.id_sous_specialite})}}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.nom}</Text>
                            </View>
                        </TouchableHighlight>
                        )}}
            />
        </View>
    )
}

export default Home
const Styles=StyleSheet.create({
    flex:{flex:1},
    specialityCard:{
        borderRadius: 6,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor:"#ac1111",
        width: '48%',
        height:200,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    specialityCardContent:{
       fontSize:25,
       color:"white"
    }
});