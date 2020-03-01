import React, { useState } from 'react'
import { View,Text,FlatList } from 'react-native'

const Test = (props) => {
    const [replies, setReplies] = useState([{content:"reply2",id:"1"}])
    return (
        <View style={{paddingLeft:"5%",borderLeftColor:"#ac1111", borderLeftWidth:3}}>
            <FlatList
                data={replies}
                keyExtractor= {(item)=> item.id}
                renderItem={({item}) => {
                        return (
                        <View>
                            <Text>{item.content}</Text>
                        </View>
                        )}}
            />
        </View>
    )
}

export default Test