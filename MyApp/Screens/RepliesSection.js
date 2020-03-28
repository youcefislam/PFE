import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native';
import { requestReplies } from '../address';
import { AuthContext } from '../App';
import Icon from 'react-native-vector-icons/Feather';
import {sendReply} from "../address"

const RepliesSection = (props) => {
    const { signOut } = React.useContext(AuthContext);

    const [replies, setReplies] = useState()
    const [text, setText] = useState("")
    useEffect(() => {
        requestReplies(props.idComment,setReplies,signOut);
    }, [])
    const click = props.click
    const pressed = props.pressed
    let smthn 
    return (
        <View style={{ paddingLeft: "5%", borderLeftColor: "#ac1111", borderLeftWidth: 3 }}>
            <FlatList
                data={replies}
                keyExtractor={(item) => item.id_reponse.toString()}
                renderItem={({ item }) => {
                    if(pressed==item.id_reponse){
                        smthn = <View>
                                    <TextInput 
                                    onChangeText={text => setText(text)}
                                    value={text}
                                    autoFocus={true}
                                    style={{borderColor:"red",borderWidth:2}}/>
                                    <Icon onPress={()=>sendReply(item.id_reponse,text)} name="send" size={30} color="#900" />
                                </View>
                    }
                    else{
                        smthn = <View></View>
                    }
                    return (
                        <View>
                            <Text onPress={()=>click(item.id_reponse)}>{item.contenu}</Text>
                            {smthn}
                            <RepliesSection idComment={item.id_reponse} pressed={pressed} click={click} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default RepliesSection