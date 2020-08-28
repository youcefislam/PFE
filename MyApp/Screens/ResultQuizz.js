import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { HandelNow, AddRating } from "../address";
import { AuthContext } from '../App';


const ResultQuizz = ({ route, navigation }) => {

    const mark = route.params.mark;
    const quizzid = route.params.quizzid;
    const document =route.params.document;
    let note = mark < 5 ? ('You Have To Work More') : mark < 7 ? ('Good Job !') : ('Greate Job !');

    const { signOut } = React.useContext(AuthContext);
    const [Rating, setRating] = useState(3);
    const [DidRate, setDidRate] = useState()
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        HandelNow(quizzid, setDidRate, setisLoading, mark, signOut);
    }, [])


    if (isLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }



    return (
        <View style={style.container}>
            {
                !DidRate ? (
                    <View>
                        <Text style={style.RateThisTxt} >What you think about the questions ?</Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                            defaultRating={Rating}
                            size={30}
                            reviewSize={30}
                            onFinishRating={(rating) => setRating(rating)}
                        />
                        <TouchableOpacity style={style.Buttons} activeOpacity={0.5} onPress={() => { setDidRate(true); AddRating(quizzid, Rating, signOut); }}>
                            <Text style={style.ButtonsText} >Submit</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <>
                            <Text style={style.NoteText}>{note}</Text>
                            <View >
                                <Text style={style.MarkText}>Your Mark is: </Text>
                                <Text style={style.Mark}>{mark}/10</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={style.Buttons} onPress={()=>navigation.navigate('post',{documentid: document.id_document, title: document.name})} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText} >Go Back To The Course</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.Buttons} onPress={() => { navigation.navigate("commentSection", { documentid: document.documentid }) }} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText}>Go To The Comment Section</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.Buttons,{width:150,alignSelf:'center'}]} onPress={()=>navigation.navigate('QuizzAnswer',{items:route.params.items})} activeOpacity={0.5}>
                                    <Text style={style.ButtonsText}>Show Answers</Text>
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
    RateThisTxt:{
        color:'white',
        fontSize:18,
        textAlign:'center'
    },
});