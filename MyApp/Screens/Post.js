import React, { useState,useEffect } from 'react'
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import CommentSection from './CommentSection'

const Post = ({route,navigation}) => {
    const requestPost = (Documentid) => {
        //return [{content:"first",id:"1"},{content:"second",id:"2"}];
        fetch('http://192.168.43.5:3000/post', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Documentid:Documentid}),
        })
        .then((response) =>{
            const resu = response.json();
            return resu;})
        .then((responseJSON)=>{
            console.log(responseJSON)
            setPost(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    const requestComments = (Documentid) => {
        //return[{title:"informatique",id:"1"},{title:"biologie",id:"2"},{title:"chimie",id:"3"},{title:"mathematiques",id:"4"},{title:"phisique",id:"5"},{title:"genie civil",id:"6"}];    
    
        fetch('http://192.168.43.5:3000/commentaires', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Documentid:Documentid}),
        })
        .then((response) =>{
            console.log(response)
            const resu = response.json();
            return resu;})
        .then((responseJSON)=>{
            console.log(responseJSON)
            setComments(responseJSON)
        })
          .catch((error) => {
            console.error(error);
        })
    }
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const document= route.params;
    useEffect(() => {
        requestComments(document.documentid)
    },[])
    return (
        <View style={{}} >

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id_reponse.toString()}
                ListHeaderComponent={<View style={{ height: 700, borderBottomColor: "#ac1111", borderBottomWidth: 5 }}></View>}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.contenu}</Text>
                            <CommentSection idComment={item.id_reponse} />
                        </View>
                    )
                }}
            />

        </View>
    )
}

export default Post