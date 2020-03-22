import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MyAddress } from '../address';
import { AuthContext } from '../App';



const CommentSection = (props) => {

    const { signOut } = React.useContext(AuthContext);

    const [replies, setReplies] = useState()

    useEffect(() => {
        
        const requestReplies = async (comment) => {

            const token = await AsyncStorage.getItem('Token');

            fetch(MyAddress + '/reponses', {  // Get Responses From the server
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ comment: comment }),
            })
                .then((response) => {
                    if (Response.status === 200) {
                        if (response.status !== 403) {   //if the token is valide
                            return response.json();
                        }
                        else {
                            alert('You are not sign In');
                            signOut();
                        }
                    }
                    else alert('something went wrong on the server')
                })
                .then((responseJSON) => {
                    setReplies(responseJSON)
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        requestReplies(props.idComment);
    }, [])
    return (
        <View style={{ paddingLeft: "5%", borderLeftColor: "#ac1111", borderLeftWidth: 3 }}>
            <FlatList
                data={replies}
                keyExtractor={(item) => item.id_reponse.toString()}
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

export default CommentSection
