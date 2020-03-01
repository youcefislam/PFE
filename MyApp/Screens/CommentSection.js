import React, { useState } from 'react'
import { View,Text,FlatList } from 'react-native'
import Test from './Test'

const CommentSection = (props) => {
    const [replies, setReplies] = useState([{content:"reply",id:"1"}])
    return (
        <View style={{paddingLeft:"5%",borderLeftColor:"#ac1111", borderLeftWidth:3}}>
            <FlatList
                data={replies}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        //replaceTest with Comment when making the right  select in the state
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
