import React,{useState} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'
const requestSousSpecialite = (idSpecialite) => {
    return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    

    fetch('http://192.168.43.82:3000/SousSpecialite', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idSpecialite),
    })
        .then((response) =>{ return response;})
        .catch((error) => {
            console.error(error);
        })
}
const Home = ({route,navigation}) => {
    const specialite = route.params;
    const [SousSpecialities, setSousSpecialities] = useState(requestSousSpecialite(specialite.idSpecialite));
    return (
        <View style={{flex:1}} >
            <View><Text>smthn {specialite.title}</Text></View>
            <FlatList style={{flex:1}}
                numColumns={2}
                data={SousSpecialities}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("document",{SousSpecialiteid:item.id})}}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.title}</Text>
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