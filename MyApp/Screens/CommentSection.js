import React, { useState,useEffect } from 'react'
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {MyAddress} from '../address';
import { AuthContext } from '../App';



const CommentSection = (props) => {

    const {signOut} = React.useContext(AuthContext);
    const requestReplies = async (comment) => {

        const token = await AsyncStorage.getItem('Token');
        fetch(MyAddress+'/reponses', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',                
                'authorization' : 'Bearer '+token
            },
            body: JSON.stringify({comment:comment}),
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
            setReplies(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    const [replies, setReplies] = useState()
    useEffect(() => {
        requestReplies(props.idComment);
    },[])
    return (
        <View style={{ paddingLeft: "5%", borderLeftColor: "#ac1111", borderLeftWidth: 3 }}>
            <FlatList
                data={replies}
                keyExtractor= {(item)=> item.id_reponse.toString()}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Text>{item.contenu}</Text> 
                            <CommentSection idComment={item.id_reponse}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default CommentSection
