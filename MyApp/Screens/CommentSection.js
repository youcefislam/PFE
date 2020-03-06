import React, { useState } from 'react'
import { View,Text,FlatList } from 'react-native'
import Test from './Test'
const requestReplies = (Commentid) => {
    return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    

    fetch('http://192.168.43.82:3000/replies', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Commentid),
    })
        .then((response) =>{ return response;})
        .catch((error) => {
            console.error(error);
        })
}

const CommentSection = (props) => {
    const [replies, setReplies] = useState(requestReplies())
    return (
        <View style={{paddingLeft:"5%",borderLeftColor:"#ac1111", borderLeftWidth:3}}>
            <FlatList
                data={replies}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        //replaceTest with Comment when making the right  select in the state
                        //<CommentSection idComment={item.id}/>
                    return (
                        <View>
                            <Text>{item.content}</Text> 
                            <Test idComment={item.id}/>
                        </View>
                        )}}
            />
        </View>
    )
}

export default CommentSection
