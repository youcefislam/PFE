import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const MyMarks = () => {

    const [state, setstate] = useState([{ mark: 7, quizzid: 1, titre: 'application Lineare' },
    { mark: 5, quizzid: 2, titre: 'application dsqdsdqsd' }, { mark: 2, quizzid: 3, titre: 'application azezaae' },
    { mark: 4, quizzid: 4, titre: 'application dsqdsqdsqd' }, { mark: 10, quizzid: 5, titre: 'dsqdsqdsd Lineare' },
    { mark: 10, quizzid: 6, titre: 'S/QD%Q¨ Lineare' }, { mark: 10, quizzid: 7, titre: '233EZAD Lineare' }])


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
                data={state}
                keyExtractor={(item) => item.quizzid.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={style.MarkView} >
                            <Text style={style.title}>{item.titre}</Text>
                            <Text style={style.mark}>{item.mark}</Text>
                            <TouchableOpacity style={style.retakebtn}>
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