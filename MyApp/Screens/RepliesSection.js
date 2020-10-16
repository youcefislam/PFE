import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { requestReplies,MyAddress } from '../address';
import { AuthContext, translate } from '../App';
import { sendReply } from "../address"


const ReplyView = ({ document, pressed, item, click, signOut, setPressed, isSending, setisSending, BannedWords }) => {
    const [ShowMore, setShowMore] = useState(false)
    const [TextReply, setTextReply] = useState("")

    let smthn = <View style={styles.AddReplyContainer}>
        {
            (pressed === item.id_reponse) ? (
                <View style={styles.AddReplyInputContainer}>
                    <TextInput
                        numberOfLines={2}
                        onChangeText={text => setTextReply(text)}
                        placeholder={translate("AddaReply")}
                        value={TextReply}
                        autoFocus={true}
                        multiline={true}
                        style={styles.AddReplyInput} />
                    <View style={styles.sendBtnContainer}>
                        {
                            isSending ? (
                                <ActivityIndicator />
                            ) : (
                                    <Text onPress={() => { setisSending(true); sendReply(item.id_reponse, item.id_author, document.title, document.documentid, TextReply, setTextReply, setPressed, setisSending, BannedWords, signOut) }} style={styles.sendBtnTxt}>{translate("Send")}</Text>
                                )
                        }
                    </View>
                </View>
            ) : (null)
        }
    </View>
    return (
        <View style={styles.ReplyContainer}>
            <View style={styles.ReplyHeader}>
                <View style={styles.UserImgContainer}>
                    <Image source={{ "uri": MyAddress + item.Photo }} style={styles.ProfilImage} />
                </View>
                <Text style={styles.usernameTxt}>{item.username}</Text>
            </View>
            <Text style={{ padding: 10, fontSize: 12 }}>{'\t' + item.contenu}</Text>
            <Text onPress={() => click(item.id_reponse)} style={styles.ReplyBtn}>{translate("Reply")}</Text>
            {smthn}
            {ShowMore ? (
                <>
                    <RepliesSection document={document} idComment={item.id_reponse} pressed={pressed} click={click} setPressed={setPressed} BannedWords={BannedWords} />
                    <Text style={styles.showLessMoreBtn} onPress={() => setShowMore(false)}>{translate("ShowLess")}</Text>
                </>
            ) : item.HaveAnswer ? (
                <Text style={styles.showLessMoreBtn} onPress={() => setShowMore(true)}>{translate("ShowMore")}</Text>
            ) : (null)
            }
        </View>
    )
}


const RepliesSection = (props) => {
    const { signOut } = React.useContext(AuthContext);
    const [isSending, setisSending] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [replies, setReplies] = useState();
    const BannedWords = props.BannedWords;

    useEffect(() => {
        requestReplies(props.idComment, setReplies, setisLoading, signOut);
    }, [])

    const click = props.click
    const pressed = props.pressed
    const setPressed = props.setPressed;
    const document = props.document;
    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <ActivityIndicator size={20} color='#5F33EC' />
                ) : (
                        <FlatList
                            data={replies}
                            keyExtractor={(item) => item.id_reponse.toString()}
                            renderItem={({ item }) => <ReplyView document={document} pressed={pressed} item={item} click={click} signOut={signOut} setPressed={setPressed} isSending={isSending} setisSending={setisSending} BannedWords={BannedWords} />}
                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "5%",
        borderLeftColor: "#B7B7B7",
        borderLeftWidth: 1
    },
    AddReplyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    AddReplyInputContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
    AddReplyInput: {
        borderWidth: 1,
        borderColor: "#DADADA",
        height: '100%',
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingLeft: 10,
        paddingRight: 45
    },
    sendBtnContainer: {
        position: "absolute",
        right: 10,
        alignSelf: "center"
    },
    sendBtnTxt: {
        fontWeight: 'bold',
        color: '#5891E7'
    },
    ReplyContainer: {
        width: '100%',
        marginBottom: 10
    },
    ReplyHeader: {
        flexDirection: 'row'
    },
    UserImgContainer: {
        width: 35,
        height: 35,
        borderRadius: 200
    },
    ProfilImage: {
        width: 35,
        height: 35,
        borderRadius: 200
    },
    usernameTxt: {
        marginLeft: 3,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    ReplyBtn: {
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    showLessMoreBtn: {
        width: '90%',
        textAlign: 'center',
        color: "#AFAFAF",
        borderWidth: 1,
        borderColor: "#AFAFAF",
        alignSelf: "center",
        marginVertical: 4
    }










})

export default RepliesSection