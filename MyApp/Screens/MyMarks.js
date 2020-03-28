import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {GetMyMarks }from '../address'; 
import { AuthContext } from '../App';

const MyMarks = ({navigation}) => {

    const { signOut } = React.useContext(AuthContext);
    const [Marks, setMarks] = useState([])


    useEffect(() => {
        
        GetMyMarks(setMarks,signOut);
    }, [])

    return (
        <View style={style.container}>
            <View style={style.MarkView} >
                <Text style={style.title}>Course</Text>
                <Text style={style.mark}>Mark</Text>
                <Text style={style.retake}>Retake</Text>
            </View>
            <FlatList
                style={{}}
                numColumns={1}
                data={Marks}
                keyExtractor={(item) => item.quizzid.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={style.MarkView} >
                            <Text style={style.title}>{item.titre}</Text>
                            <Text style={style.mark}>{item.mark}</Text>
                            <TouchableOpacity style={style.retakebtn} onPress={()=>navigation.navigate("quizz",{quizzid:item.quizzid})}>
                                <Text style={style.retake}>Retake</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
}

export default MyMarks;

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    MarkView: {
        borderBottomWidth: 1,
        borderColor: 'black',
        marginRight: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        flex: 4
    },
    mark: {
        flex: 1,
    },
    retake: {

        marginRight: 3,
    },
})