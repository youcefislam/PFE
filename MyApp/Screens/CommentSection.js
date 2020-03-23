import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native';
import { requestReplies } from '../address';
import { AuthContext } from '../App';



const CommentSection = (props) => {

    const { signOut } = React.useContext(AuthContext);

    const [replies, setReplies] = useState()

    useEffect(() => {
        requestReplies(props.idComment,setReplies,signOut);
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
