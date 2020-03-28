import React, { useState, useEffect } from 'react'
import { View, Text, FlatList,TextInput } from 'react-native';
import { requestComments } from '../address';
import { AuthContext } from '../App';
import RepliesSection from './RepliesSection';
import Icon from 'react-native-vector-icons/Feather';
import {sendComment} from "../address"


const CommentSection = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const [comments, setComments] = useState([])
    const [pressed, setPressed] = useState(-1)
    const [text, setText] = useState("")
    const document = route.params;
    useEffect(() => {

        requestComments(document.documentid,setComments,signOut)

    }, [])
    let smthn;
    const click = (id)=>{
        setPressed(id);
        setText("");
    }
    return (
        <View style={{}} >
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id_reponse.toString()}
                ListHeaderComponent={
                    <View>
                        <TextInput
                        onChangeText={text => setText(text)}
                        value={text}
                        onFocus={()=>click(-1)}
                        style={{borderWidth:2,borderColor:"red"}}/>
                        <Icon onPress={()=>sendComment(document.documentid,text)} name="send" size={30} color="#900" />
                    </View>
                }
                renderItem={({ item }) => {
                    if(pressed==item.id_reponse){
                        smthn = <View >
                                    <TextInput 
                                        onChangeText={text => setText(text)}
                                        value={text}
                                        autoFocus={true}
                                        style={{borderColor:"red",borderWidth:2}}
                                    />
                                    <Icon onPress={()=>sendReply(item.id_reponse)} name="send" size={30} color="#900" />
                                </View>
                    }
                    else{
                        smthn = <View></View>
                    }
                    return (
                        <View>
                            <Text onPress={()=>click(item.id_reponse)}>{item.contenu}</Text>
                            {smthn}
                            <RepliesSection idComment={item.id_reponse} pressed={pressed} click={click}/>
                        </View>
                    )
                    
                }}
            />
        </View>
    )
    
}

export default CommentSection
