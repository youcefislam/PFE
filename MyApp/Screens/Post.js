import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {MyAddress} from '../address';
import CommentSection from './CommentSection'
import { AuthContext } from '../App';



const Post = ({ route, navigation }) => {

    const {signOut} = React.useContext(AuthContext);
    const requestPost = (Documentid) => {
        
        fetch(MyAddress + '/post', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ Documentid: Documentid }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json();
                }
                else {
                    alert('You are not sign In');
                    signOut();
                }
            })
            .then((responseJSON) => {
                console.log(responseJSON)
                setPost(responseJSON)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const requestComments = async (Documentid) => {

        const token = await AsyncStorage.getItem('Token');
        fetch(MyAddress + '/commentaires', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ Documentid: Documentid }),
        })
            .then((response) => {
                if (response.status !== 403) {
                    return response.json();
                }
                else {
                    alert('You are not sign In');
                    signOut();
                }
            })
            .then((responseJSON) => {
                setComments(responseJSON);
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const document = route.params;
    useEffect(() => {
        requestComments(document.documentid)
    }, [])
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