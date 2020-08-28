import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import { InitQuestions } from '../address'
import { AuthContext } from '../App';


const quizz = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const document = route.params.id_document;
    const [quizzid, setquizzid] = useState(route.params.id_quiz)
    const [ListOfQuestion, setListOfQuestion] = useState([])
    const [progressBar, setprogressBar] = useState(0);
    const [progressing, setprogressing] = useState(0)
    const [question, setquestion] = useState('');
    const [CurrentQuestion, setCurrentQuestion] = useState(0);
    const [ListOfAnswers, setListOfAnswers] = useState([]);
    const [CurrentQuestionText, setCurrentQuestionText] = useState('1/' + ListOfQuestion.length);
    const [UsersAnswer, setUsersAnswer] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [Ready, setReady] = useState(false);
    const [isLoadingScreen, setisLoadingScreen] = useState(true)
    const [YouAreDone, setYouAreDone] = useState(false)

    const GoToResultQuiz = () => {

        var TrueAnswer = 0;
        let i = 0;
        let items = []
        for (x of UsersAnswer) {
            if (x === ListOfQuestion[i].answers[ListOfQuestion[i].correct - 1]['answer']) {
                TrueAnswer++;
            }
            items.push({
                id: i,
                question: ListOfQuestion[i].question,
                answer: x,
                correctAnswer: ListOfQuestion[i].answers[ListOfQuestion[i].correct - 1]['answer']
            })
            i++;
        }
        const mark = TrueAnswer * 10 / ListOfQuestion.length;
        navigation.navigate('ResultQuizz', { document, mark: mark.toFixed(2), quizzid, items })
    }


    const update = () => {
        setListOfAnswers(ListOfQuestion[CurrentQuestion].answers);
        setprogressBar(progressBar + progressing)
        setquestion(ListOfQuestion[CurrentQuestion].question);
        setCurrentQuestion(CurrentQuestion + 1);
        setCurrentQuestionText((CurrentQuestion + 1) + '/' + ListOfQuestion.length);
    }

    const SubmitAnswer = (answer) => {
        if (CurrentQuestion < ListOfQuestion.length) update()
        if (CurrentQuestion <= ListOfQuestion.length) {
            setUsersAnswer(UsersAnswer => ([...UsersAnswer, answer]))
            setCurrentQuestion(CurrentQuestion + 1);
            if (CurrentQuestion == ListOfQuestion.length) setYouAreDone(true)
        }
    }

    if (Ready) {
        update()
        setReady(false);
    }


    if (!isLoading) {
        setprogressing(1 / ListOfQuestion.length);
        setReady(true);
        setisLoadingScreen(false);
        setisLoading(true);
    }


    useEffect(() => {
        InitQuestions(quizzid, setListOfQuestion, setisLoading, signOut);
    }, [])


    return (
        <View style={style.container}>
            {
                isLoadingScreen ?
                    (
                        <ActivityIndicator size="large" color="white" />
                    ) : (
                        !YouAreDone ? (
                            <>
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
                                    <TouchableOpacity style={style.passButton} onPress={() => SubmitAnswer('')} activeOpacity={0.5}>
                                        <Text style={{ color: '#79AEF2' }}>Pass This Question</Text>
                                    </TouchableOpacity>
                                    <FlatList style={style.bottomPart}
                                        contentContainerStyle={style.AnswerView}
                                        numColumns={1}
                                        data={ListOfAnswers}
                                        keyExtractor={(item, index) => (item['answer'] + index).toString()}
                                        renderItem={({ item }) => {
                                            if (item['answer']) return (
                                                <TouchableOpacity style={style.answerCard} onPress={() => SubmitAnswer(item['answer'])} activeOpacity={0.5}>
                                                    <Text style={style.answerCardContent}>{item['answer']}</Text>
                                                </TouchableOpacity>
                                            )
                                            else return null
                                        }}
                                    />
                                </View>
                            </>) : (
                                <>
                                    <View style={{ flex: 0.4, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 23, color: 'white' }}>
                                            Congrat's You're Done
                                        </Text>
                                        <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, alignItems: 'center', justifyContent: 'center', }} onPress={GoToResultQuiz}>
                                            <Text style={{ color: "#79AEF2" }}>
                                                Show My Result
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                    )
            }
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