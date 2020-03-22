import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, SafeAreaView, StatusBarIOS } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-community/async-storage';
import { MyAddress } from '../address'
const quizz = ({ route, naavigation }) => {



    const [ListOfQuestion, setListOfQuestion] = useState([])
    const [progressing, setprogressing] = useState(0)
    const [progressBar, setprogressBar] = useState(0)
    const [question, setquestion] = useState('');
    const [CurrentQuestion, setCurrentQuestion] = useState(0);
    const [ListOfAnswers, setListOfAnswers] = useState([]);
    const [CurrentQuestionText, setCurrentQuestionText] = useState('1/' + ListOfQuestion.length);
    const [UsersAnswer, setUsersAnswer] = useState([])
    const Params = route.params;
    const [isLoading, setisLoading] = useState(true)

    const GoToResultQuiz = () => {


        navigation.navigate('ResultQuizz', { mark, quizzid: Params.quizzid })
    }


    const SubmitAnswer = (answer) => {

        if (CurrentQuestion < ListOfQuestion.length) {
            setListOfAnswers(ListOfQuestion[CurrentQuestion].answers);
            setprogressBar(progressBar + progressing)
            setquestion(ListOfQuestion[CurrentQuestion].question);
            setCurrentQuestion(CurrentQuestion + 1);
            setCurrentQuestionText((CurrentQuestion + 1) + '/' + ListOfQuestion.length)
        }
        if (CurrentQuestion <= ListOfQuestion.length) {
            if (answer == ListOfAnswers[ListOfQuestion[CurrentQuestion - 1].correct - 1]["answer"]) {
                setUsersAnswer(UsersAnswer => ([...UsersAnswer, true]));
            }else setUsersAnswer(UsersAnswer => ([...UsersAnswer, false]));
            setCurrentQuestion(CurrentQuestion + 1);
        }else console.log(UsersAnswer);
    }

    useEffect(() => {

        const InitQuestions = async () => {


            const token = await AsyncStorage.getItem('Token');
            const data = { quizzid: 1 }


            return fetch(MyAddress + '/quizz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'quthorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            })
                .then((Response) => {
                    if (Response.status === 200) {
                        if (Response.status !== 403) {   // if the token is valide
                            return Response.json();
                        }
                        else {
                            alert('You are not sign In');
                            signOut();
                        }
                    }
                    else alert('something went wrong on the server')
                })
                .then((ResponseJSON) => {
                    setListOfQuestion(ResponseJSON);
                    setisLoading(false);
                })
        }

        

        InitQuestions();
        // setListOfAnswers(prevAnswers => ([...prevAnswers, ListOfQuestion["reponse_1"],ListOfQuestion["reponse_2"]]));
        // setquestion(ListOfQuestion[CurrentQuestion]['question_text']);
        // setCurrentQuestion(CurrentQuestion + 1);
        // setCurrentQuestionText((CurrentQuestion + 1) + '/' + ListOfQuestion.length)
    }, [])

    
    if(!isLoading)
    {
        setquestion(ListOfQuestion[CurrentQuestion]['question_text']);
        setprogressing( 1 / ListOfQuestion.length);
        setCurrentQuestionText((CurrentQuestion + 1) + '/' + ListOfQuestion.length)
        setprogressBar(progressBar + progressing)
        setCurrentQuestion(CurrentQuestion + 1);
        setisLoading(true);
        setListOfAnswers(prevAnswers => ([...prevAnswers,{answer :ListOfQuestion[CurrentQuestion]["reponse_1"]},{answer :ListOfQuestion[CurrentQuestion]["reponse_2"]} ]));
        
        // setquestion(ListOfQuestion[CurrentQuestion]['question_text']);
        // setCurrentQuestion(CurrentQuestion + 1);
        // setprogressing( 1 / ListOfQuestion.length);
        // setCurrentQuestionText((CurrentQuestion + 1) + '/' + ListOfQuestion.length)
    }

    return (
        <View style={style.container}>
            <View style={style.topPart}>
                <View style={style.progressBar}>
                    <Progress.Bar progress={progressBar} width={330} height={20} color="#F25C69" unfilledColor="#F2F2F2" />
                    <Text style={{ color: 'white', paddingRight: 10 }}>Question : {CurrentQuestionText}</Text>
                </View>
                <SafeAreaView style={style.questionView}>
                    <ScrollView contentContainerStyle={style.scrollView} >
                        <Text style={style.questionText}>{question}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={style.passButton} onPress={() =>  {setisLoading(false)}} activeOpacity={0.5}>
                    <Text style={{ color: '#79AEF2' }}>Pass This Question</Text>
                </TouchableOpacity>
                <FlatList style={style.bottomPart}
                    contentContainerStyle={style.AnswerView}
                    numColumns={1}
                    data={ListOfAnswers}
                    keyExtractor={(item) => item['answer']}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={style.answerCard} onPress={() => SubmitAnswer(item['answer'])} activeOpacity={0.5}>
                                <Text style={style.answerCardContent}>{item['answer']}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    );

}


export default quizz;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#79AEF2"
    },
    answerCard: {
        backgroundColor: "#548fdb",
        borderWidth: 0.2,
        width: 340,
        padding: 15,
    },
    answerCardContent: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#F2F2F2",
    },
    topPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomPart: {
        width: '100%',
    },
    progressBar: {
        marginTop: 10,
        alignItems: 'flex-end'
    },
    passButton: {
        borderWidth: 2,
        borderColor: '#79AEF2',
        backgroundColor: "#F2F2F2",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        margin: 5,
        padding: 10
    },
    questionView: {
        flex: 4,
        marginHorizontal: 5,
    },
    scrollView: {
        justifyContent: 'center',
        padding: 10
    },
    questionText: {
        color: '#F2F2F2',
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 17
    },
    AnswerView: {
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 5
    }
}); 