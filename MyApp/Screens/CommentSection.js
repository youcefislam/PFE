import React, { useState,useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import Test from './Test'

const CommentSection = (props) => {
    const requestReplies = (Comment) => {
        //return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    
    
        fetch('http://192.168.43.5:3000/reponses', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Comment),
        })
        .then((response) =>{
            const resu = response.json();
            return resu;})
        .then((responseJSON)=>{
            console.log(responseJSON)
            setReplies(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    const [replies, setReplies] = useState(requestReplies())
    useEffect(() => {
        requestReplies(props)
    },[])
    return (
        <View style={{ paddingLeft: "5%", borderLeftColor: "#ac1111", borderLeftWidth: 3 }}>
            <FlatList
                data={replies}
                keyExtractor= {(item)=> item.id_reponse.toString()}
                renderItem={({item}) => {
                        //replaceTest with Comment when making the right  select in the state
                        //<CommentSection idComment={item.id}/>
                    return (
                        <View>
                            <Text>{item.contenu}</Text> 
                            <Test idComment={item.id_reponse}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default CommentSection
