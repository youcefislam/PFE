import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { requestComments } from '../address';
import CommentSection from './CommentSection'
import { AuthContext } from '../App';
import Icon from 'react-native-vector-icons/EvilIcons';

const Post = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const [post, setPost] = useState({})
    const document = route.params;
    return (
        <View style={{}} >
            <View style={{flexDirection:"row-reverse"}}>
                        <Icon onPress={() => { navigation.navigate("comment section",{documentid:document.documentid})}} name="comment" size={30} color="#900" />
                    </View>
        </View>
    )
}

export default Post