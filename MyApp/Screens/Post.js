import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { requestComments } from '../address';
import CommentSection from './CommentSection'
import { AuthContext } from '../App';



const Post = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);



    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const document = route.params;


    useEffect(() => {

        requestComments(document.documentid,setComments,signOut)

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