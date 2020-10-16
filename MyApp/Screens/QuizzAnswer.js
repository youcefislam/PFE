import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {translate} from "../App"

const QuizzAnswer = ({ route, navigation }) => {


    const temp = route.params.items;

    return (
        <View style={style.container}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ alignItems: 'center' }}
                numColumns={1}
                keyExtractor={(item) => item["id"].toString()}
                data={temp}
                renderItem={({ item }) =>
                    (
                        <View style={{ marginBottom: 10, width: 333, backgroundColor: 'white',  padding: 10, borderRadius: 15 }}>
                            <View style={{flex: 0.3}}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Question:
                                </Text>
                            </View>
                            <View style={{flex: 0.6 }}>
                                <Text style={{fontSize: 12 }}>
                                    {'\t' + item.question}
                                </Text>
                            </View>
                            <View style={{flex: 0.3}}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {translate("YourAnswer") + item.answer}
                                </Text>
                            </View>
                            <View style={{flex: 0.3,}}>
                                <Text style={{ color: '#28C025' }}>
                                    {translate("CorrectAnswer") + item.correctAnswer}
                                </Text>
                            </View>
                        </View>
                    )
                }
            />
            <TouchableOpacity style={[style.Buttons,{width:150,alignSelf:'center'}]} onPress={()=>navigation.goBack()}>
                <Text style={style.ButtonsText}>
                    {translate("Back")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default QuizzAnswer;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#548fdb",
    },
    Buttons: {
        borderWidth: 2,
        borderColor: '#79AEF2',
        backgroundColor: "#F2F2F2",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        margin: 5,
        padding: 10
    },
    ButtonsText: {
        color: '#79AEF2'
    }
});