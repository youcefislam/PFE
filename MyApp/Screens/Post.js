import React, { useState } from 'react'
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import CommentSection from './CommentSection'

const requestPost = (Documentid) => {
    return [{content:"first",id:"1"},{content:"second",id:"2"}];
    fetch('http://192.168.43.82:3000/post', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Documentid),
    })
        .then((response) =>{ return response;})
        .catch((error) => {
            console.error(error);
        })
}
const requestComments = (Documentid) => {
    return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    

    fetch('http://192.168.43.82:3000/comment', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Documentid),
    })
        .then((response) =>{ return response;})
        .catch((error) => {
            console.error(error);
        })
}
const Post = ({navigation}) => {
    const [comments, setComments] = useState(requestPost())
    const [post, setPost] = useState(requestComments())
    return (
        <View style={{}} >

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<View style={{ height: 700, borderBottomColor: "#ac1111", borderBottomWidth: 5 }}></View>}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.content}</Text>
                            <CommentSection idComment={item.id} />
                        </View>
                    )
                }}
            />
            <CommentSection idPost={1} />

        </View>
    )
}

export default Post