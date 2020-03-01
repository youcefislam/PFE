import React,{useState} from 'react'
import { View,ScrollView,Text,FlatList, StyleSheet,TouchableHighlight } from 'react-native'
import CommentSection from './CommentSection'
const Post = ({navigation}) => {
    const [comments, setComments] = useState([{content:"first",id:"1"},{content:"second",id:"2"}])
    return (
        <View style={{}} >
            
            <FlatList
                data={comments}
                keyExtractor= {(item)=> item.id}
                ListHeaderComponent={<View style={{height:700,borderBottomColor:"#ac1111",borderBottomWidth:5}}></View>}
                renderItem={({item}) => {
                        return (
                        <View>
                            <Text>{item.content}</Text>
                            <CommentSection idComment={item.id}/>
                        </View>
                        )}}
            />
            <CommentSection idPost={1}/>

        </View>
    )
}

export default Post