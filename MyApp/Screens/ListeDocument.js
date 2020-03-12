import React,{useState,useEffect} from 'react'
import { View,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'
const Home = ({route,navigation}) => {
    const requestListeDocument = (SousSpecialiteid) => {
        fetch('http://192.168.43.5:3000/document', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({SousSpecialiteid:SousSpecialiteid}),
        })
        .then((response) =>{
            const resu = response.json();
            return resu;})
        .then((responseJSON)=>{
            console.log(responseJSON)
            setListeDocument(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
    const SousSpecialite = route.params;
    const [ListeDocument, setListeDocument] = useState([]);
    useEffect(() => {
        requestListeDocument(SousSpecialite.SousSpecialiteid)
    },[])
    return (
        <View style={{flex:1}} >
            <View><Text>smthn {SousSpecialite.SousSpecialiteid}</Text></View>
            <FlatList style={{flex:1}}
                numColumns={2}
                data={ListeDocument}
                keyExtractor= {(item)=> item.id_document}
                renderItem={({item}) => {
                        return (
                        <TouchableHighlight style={Styles.specialityCard} onPress={()=>{navigation.navigate("post",{documentid:item.id_document})}}>
                            <View  >
                                <Text style={Styles.specialityCardContent}>{item.titre}</Text>
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