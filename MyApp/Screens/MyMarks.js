import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GetMyMarks } from '../address';
import { AuthContext } from '../App';



//SVG
import Retake from '../Img/SVG/svg40.svg';



const MarkItemContainer = ({ item, navigation }) => {


    return (
        <View style={style.MarkView} >
            <View style={style.MarkInfo}>
                <Text style={style.title}><Text style={style.InfoTitle}>Specialite : </Text>{item.specialite}</Text>
                <Text style={style.title}><Text style={style.InfoTitle}>Sous Specialite : </Text>{item.sous_specialites}</Text>
                <Text style={style.title}><Text style={style.InfoTitle}>Document : </Text>{item.document}</Text>
            </View>
            <Text style={style.mark}>{item.mark + "/10"}</Text>
            <TouchableOpacity style={style.retakebtn} onPress={() => navigation.navigate("quizz", { id_quiz: item.quizzid })}>
                <Retake />
            </TouchableOpacity>
        </View>
    )
}


const MyMarks = ({ navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const [Marks, setMarks] = useState([])


    useEffect(() => {
        return navigation.addListener('focus',()=>{
            GetMyMarks(setMarks, signOut)
        }) 
    }, [navigation])

    return (
        <View style={style.contContainer}>
            <View style={style.container}>
                <FlatList
                    numColumns={1}
                    data={Marks}
                    keyExtractor={(item) => item.quizzid.toString()}
                    renderItem={({ item }) => <MarkItemContainer item={item} navigation={navigation} />}
                    contentContainerStyle={{ alignItems: 'center' }}
                />
            </View>
        </View>
    );
}

export default MyMarks;

const style = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: 'white',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        paddingTop: 40,
        width: '100%'
    },
    MarkView: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#616161',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 10,
        padding: 10
    },
    title: {
        color: '#616161',
        fontSize: 11
    },
    mark: {
        fontSize: 12,
        flex: 1,
        color: "#3644C6"
    },
    retake: {
    },
    MarkInfo:{flex: 4},
    InfoTitle:{fontWeight:'bold'},
    contContainer:{ 
        flex: 1, 
        justifyContent: 'flex-end', 
        backgroundColor: '#5F33EC' 
    }
})