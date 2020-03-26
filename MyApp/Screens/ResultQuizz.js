import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { HandelNow, AddRating } from "../address";


const ResultQuizz = ({ route, navigation }) => {

    const mark = route.params.mark;
    const quizzid = route.params.quizzid;
    let note = mark < 5 ? ('You Have To Work More') : mark < 7 ? ('Good Job !') : ('Greate Job !');

    const [Rating, setRating] = useState(3);
    const [DidRate, setDidRate] = useState(false)

    useEffect(() => {
        HandelNow(quizzid, mark);
    }, [])


    return (
        <View style={style.container}>
            {
                !DidRate ? (
                    <View style={style.RateView}>
                        <Text>Rate This Course </Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                            defaultRating={Rating}
                            size={30}
                            reviewSize={30}
                            onFinishRating={(rating) => setRating(rating)}
                        />
                        <TouchableOpacity style={style.Buttons} activeOpacity={0.5} onPress={() => { setDidRate(true); AddRating(quizzid, Rating); }}>
                            <Text style={style.ButtonsText} >Submit</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <>
                            <Text style={style.NoteText}>{note}</Text>
                            <View style={style.NoteView}>
                                <Text style={style.MarkText}>Your Mark is: </Text>
                                <Text style={style.Mark}>{mark}/10</Text>
                            </View>
                            <View style={style.buttonView}>
                                <TouchableOpacity style={style.Buttons} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText} >Go Back To The Course</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.Buttons} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText} >Go Back To Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.Buttons} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText}>Go To The Comment Section</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
            }
        </View>
    );
}

export default ResultQuizz;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#548fdb",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    NoteView: {

    },
    NoteText: {
        color: 'white',
        fontSize: 40,
        fontWeight: "700",
        textAlign: 'center'
    },
    MarkText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10
    },
    Mark: {
        color: '#F25C69',
        fontSize: 50,
        padding: 50,
        margin: 10,
        fontWeight: "700",
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 100
    },
    RateText: {

    },
    RateView: {

    },
    buttonView: {

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
    },
});