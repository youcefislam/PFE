import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';


const ResultQuizz = ({ route, navigation }) => {

    let note = 'Great Job !';
    const mark = route.params.mark;
    const [Rating, setRating] = useState(3)

    return (
        <View style={style.container}>
            <View style={style.NoteView}>
                <Text style={style.NoteText}>{note}</Text>
                <Text style={style.MarkText}>Your Mark is: </Text>
                <Text style={style.Mark}>{mark}/10</Text>
            </View>
            <View style={style.RateView}>
                <View style={{}}>
                    {/*here goes the rating */}
                    <AirbnbRating
                        count={5}
                        reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                        defaultRating={Rating}
                        size={30}
                        reviewSize={30}
                        onFinishRating={(rating) => setRating(rating)}
                    />
                </View>
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