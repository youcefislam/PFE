import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { requestComments,MyAddress } from '../address';
import { AuthContext, translate } from '../App';
import RepliesSection from './RepliesSection';
import { sendComment, sendReply } from "../address"


const CommentView = ({ document, pressed, item, click, signOut, setPressed, isSending, setisSending, BannedWords }) => {
    const [text, settext] = useState("")
    const [ShowReply, setShowReply] = useState(false)
    let ReplyInput = <View style={styles.AddReplyContainer}>
        {
            (pressed === item.id_reponse) ? (
                <View style={styles.AddReplyInputContainer}>
                    <TextInput
                        numberOfLines={2}
                        placeholder={translate("AddaReply")}
                        onChangeText={text => settext(text)}
                        value={text}
                        autoFocus={true}
                        multiline={true}
                        style={styles.AddReplyInput} />
                    <View style={styles.SendCommentBtn}>
                        {
                            isSending ? (
                                <ActivityIndicator />
                            ) : (
                            <Text onPress={() => { setisSending(true); sendReply(item.id_reponse, item.id_author, document.title, document.documentid, text, settext, setPressed, setisSending, BannedWords, signOut) }} style={styles.SendCommentBtnTxt}>{translate("Send")}</Text>
                                )
                        }
                    </View>
                </View>
            ) : (null)
        }
    </View>
    return (
        <View style={styles.CommentContainer}>
            <View style={styles.CommentHeader}>
                <View style={styles.UserImgContainer}>
                    <Image source={{ "uri": MyAddress + item.Photo }} style={styles.ProfilImage} />
                </View>
                <Text style={styles.userNameTxt}>{item.username}</Text>
            </View>
            <Text style={{ padding: 10 }}>{'\t' + item.contenu}</Text>
            <Text onPress={() => click(item.id_reponse)} style={styles.ReplyBtn} >
                {translate("Reply")}
            </Text>
            {ReplyInput}
            {
                ShowReply ? (
                    <>
                        <RepliesSection document={document} idComment={item.id_reponse} pressed={pressed} click={click} setPressed={setPressed} BannedWords={BannedWords} />
                        <Text onPress={() => setShowReply(false)} style={styles.HideShowReplyBtn}>
                            {translate("HideReplies")}
                        </Text>
                    </>
                ) : item.HaveAnswer ? (
                    <Text style={styles.HideShowReplyBtn} onPress={() => setShowReply(true)}>
                        {translate("ShowReplies")}
                    </Text>
                ) : (null)
            }

        </View>
    )
}


const CommentSection = ({ route, navigation }) => {

    //TODO UPDATE NUMBER OF COMMENTS ON THE API WHEN ADDING A COMMENT


    const { signOut } = React.useContext(AuthContext);
    const [comments, setComments] = useState([])
    const [pressed, setPressed] = useState(-1)
    const [text, setText] = useState("")
    const document = route.params;
    const [isSending, setisSending] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [BannedWords, setBannedWords] = useState([]);
    var IntervalId = 0

    useEffect(() => {
        IntervalId = setInterval(() => {
            requestComments(document, setComments, setisLoading, setBannedWords, signOut)
        }, 2000);
        navigation.addListener('blur', () => {
            clearInterval(IntervalId)
        })
        return navigation.addListener('focus', () => {
            return requestComments(document, setComments, setisLoading, setBannedWords, signOut)
        })

    }, [navigation])

    const click = (id) => {
        setPressed(id);
        setText("");
    }
    return (
        <View style={styles.container} >
            {
                !document.Notified ? (
                    <View style={styles.AddCommentContainer}>
                        <View style={styles.AddCommentInConatiner}>
                            <TextInput
                                placeholder={translate("AddComment")}
                                numberOfLines={2}
                                onChangeText={text => setText(text)}
                                value={text}
                                multiline={true}
                                onFocus={() => click(-1)}
                                style={styles.CommentInput} />
                            <View style={styles.SendCommentBtn}>
                                {
                                    isSending ? (
                                        <ActivityIndicator size={50} color="#5F33EC" />
                                    ) : (

                                            <Text onPress={() => { setisSending(true); sendComment(document.documentid, text, setText, setisSending, BannedWords, signOut) }} style={styles.SendCommentBtnTxt}>
                                                {translate("Send")}
                                            </Text>
                                        )
                                }
                            </View>
                        </View>
                    </View>) : null
            }
            {
                isLoading ? (
                    <View style={styles.activIndicatorContainer}>
                        <ActivityIndicator size={50} color='#5F33EC' />
                    </View>
                ) : (
                        comments.length > 0 ? (
                            <FlatList
                                style={styles.commentFlatList}
                                data={comments}
                                keyExtractor={(item) => item.id_reponse.toString()}
                                renderItem={({ item }) => <CommentView document={document.documentid} pressed={pressed} item={item} click={click} signOut={signOut} setPressed={setPressed} isSending={isSending} setisSending={setisSending} BannedWords={BannedWords} />}
                                removeClippedSubviews={false}
                                refreshing={true}
                            />
                        ) : (
                                <View style={styles.NoResultContainer}>
                                    <Text style={styles.NoResultTxt}>
                                        {translate("NoComment")}
                                    </Text>
                                </View>
                            )
                    )
            }
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        backgroundColor: 'white'
    },
    AddCommentContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    AddCommentInConatiner: {
        flexDirection: 'row',
        width: '85%',
        height: '90%'
    },
    CommentInput: {
        borderWidth: 1,
        borderColor: "#DADADA",
        height: '100%',
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingLeft: 10,
        paddingRight: 45,
        borderRadius: 6
    },
    SendCommentBtn: {
        position: "absolute",
        right: 10,
        alignSelf: "center"
    },
    SendCommentBtnTxt: {
        fontWeight: 'bold',
        color: '#5891E7'
    },
    activIndicatorContainer: {
        justifyContent: "center",
        flex: 1
    },
    commentFlatList: {
        flex: 0.8,
        marginLeft: '2%'
    },
    NoResultContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NoResultTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#BBBBBB"
    },
    AddReplyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
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
    CommentContainer: {
        width: '90%',
        marginBottom: 10
    },
    CommentHeader: {
        flexDirection: 'row'
    },
    UserImgContainer: {
        width: 35,
        height: 35,
        borderRadius: 200
    },
    ProfilImage:{
        width: 35,
        height: 35,
        borderRadius: 200
    },
    userNameTxt: {
        marginLeft: 8,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    ReplyBtn: {
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    HideShowReplyBtn: {
        width: '90%',
        textAlign: 'center',
        color: "#AFAFAF",
        borderWidth: 1,
        borderColor: "#AFAFAF",
        alignSelf: "center",
        marginVertical: 4
    },
    AddReplyInputContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
})

export default CommentSection
