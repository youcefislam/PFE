import React,{useState} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'
const requestListeDocument = (SousSpecialiteid) => {
    return[{title:"Course 1",id:"1"},{title:"Course 2",id:"2"},{title:"Course 3",id:"3"},{title:"Course 4",id:"4"},{title:"Course 5",id:"5"},{title:"Course 6",id:"6"}];    

    fetch('http://192.168.43.82:3000/document', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SousSpecialiteid),
    })
        .then((response) =>{ return response;})
        .catch((error) => {
            console.error(error);
        })
}
const Home = ({route,navigation}) => {
    const SousSpecialite = route.params;
    const [ListeDocument, setListeDocument] = useState(requestListeDocument(SousSpecialite.SousSpecialiteid));
    return (
        <View style={{flex:1}} >
            <FlatList style={{flex:1}}
                numColumns={1}
                data={ListeDocument}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("post",{document:item.id})}}>
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
        height : 100,
        backgroundColor:"#ac1111",
        justifyContent: 'center', 
        alignItems: 'center',
    },
    specialityCardContent:{
       fontSize:25,
       color:"white"
    }
});