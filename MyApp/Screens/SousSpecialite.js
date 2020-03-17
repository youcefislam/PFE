import React,{useState,useEffect} from 'react';
import { View,Text,FlatList, StyleSheet,TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {MyAddress} from '../address';
import { AuthContext } from '../App';


const Home = ({route,navigation}) => {

    const {signOut} = React.useContext(AuthContext);

    const requestSousSpecialite = async (idSpecialite) => {
        
        const token = await AsyncStorage.getItem('Token');
        fetch(MyAddress+'/SousSpecialite', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : 'Bearer '+token
            },
            body: JSON.stringify({idSpecialite:idSpecialite}),
        })
            .then((response) =>{
                if(response.status !== 403) {
                    return response.json();   
                }
                else{
                    alert('You are not sign In');
                    signOut();
                }
            })
            .then((responseJSON)=>{
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
            <FlatList style={{flex:1}}
                numColumns={2}
                data={SousSpecialities}
                keyExtractor= {(item)=> item.id_sous_specialite.toString()}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("ListeDocument",{SousSpecialiteid:item.id_sous_specialite})}}>
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