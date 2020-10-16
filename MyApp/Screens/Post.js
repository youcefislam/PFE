import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoxShadow } from 'react-native-shadow';
import { AuthContext, translate } from '../App';


import {
    requestPost,
    LikeUnlikeRequest,
    SaveUnsaveRequest,
    DownloadFile
} from '../address'


//SVG
import InSaved from '../Img/SVG/svg33.svg';
import Saved from '../Img/SVG/svg34.svg';
import Downlaod from '../Img/SVG/svg35.svg';
import Heart from '../Img/SVG/svg36.svg';
import Like from '../Img/SVG/svg37.svg';
import Comments from '../Img/SVG/svg38.svg';
import Stars from '../Img/SVG/svg39.svg';
import Video from '../Img/SVG/svg54.svg';
import Audio from '../Img/SVG/svg55.svg';

const QuizzView = ({ document, item, navigation }) => {

    const shadowOpt = {
        width: 310,
        height: 48,
        color: "#6E95FA",
        border: 15,
        radius: 15,
        opacity: 0.29,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    }

    return (<BoxShadow setting={shadowOpt}>
        <TouchableOpacity onPress={() => navigation.navigate("quizz", { id_document: document, id_quiz: item.id_quiz })} key={item.id_quiz} style={styles.QuizzBtn}>
            <View style={styles.QuizzName}>
                <Text style={styles.QuizzNameTxt}>{item.nom_quiz}</Text>
            </View>
            <View style={styles.QuizzRate}>
                <Text style={styles.QuizzRateTxt}>{item.rate || 'N/A'}</Text>
                <Stars />
            </View>
        </TouchableOpacity>
    </BoxShadow>)
}




const Post = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const [post, setPost] = useState({})
    const document = route.params;
    const [isLoading, setisLoading] = useState(true);
    const [isLiking, setisLiking] = useState(false);
    const [isSaving, setisSaving] = useState(false)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            requestPost(document.documentid, setPost, setisLoading, signOut);
        })
    }, [])


    const LikeUnlike = () => {
        setisLiking(true)
        LikeUnlikeRequest(setPost, post, document, setisLiking, signOut);
    }

    const SaveUnsave = () => {
        setisSaving(true);
        SaveUnsaveRequest(setPost, post, document, setisSaving, signOut);
    }


    return (
        <View style={styles.container} >
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={50} color="#5F33EC" />
                    </View>
                ) : (
                        <>
                            <View style={styles.post}>
                                <View style={styles.PostTitle}>
                                    <View style={styles.Wrap}></View>
                                    <View style={styles.DocTitle}>
                                        <Text style={styles.DocTitleTxt}>
                                            {post.titre}
                                        </Text>
                                    </View>
                                    <View style={[styles.Wrap]}>
                                        <TouchableOpacity onPress={SaveUnsave}>
                                            {
                                                isSaving ? (
                                                    <ActivityIndicator color='#2C63B6' />
                                                ) : (
                                                        post.isSaved ? (<Saved />) : (<InSaved />)
                                                    )
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.DocDesc}>
                                    <Text style={styles.DocDescTxt}>
                                        {post.description}
                                    </Text>
                                </View>
                                <View style={styles.DownladBtnContainer}>
                                    {
                                        post.doc_path ?
                                            <TouchableOpacity activeOpacity={0.7} style={styles.DownladBtn} onPress={() => DownloadFile(post.doc_path, document.title)}>
                                                <Text style={styles.DownladBtnTxt}>
                                                    Document
                                                </Text>
                                                <View style={{ flex: 0.3 }}>
                                                    <Downlaod />
                                                </View>
                                            </TouchableOpacity>
                                            : null
                                    }
                                    {
                                        post.video_path ?
                                            <TouchableOpacity activeOpacity={0.7} style={styles.WatchBtn} onPress={() => navigation.navigate("VideoPlayerScreen", { post: post })} >
                                                <Text style={styles.WatchBtnTxt}>
                                                    {translate("Video")}
                                                </Text>
                                                <View style={{ flex: 0.3 }}>
                                                    <Video />
                                                </View>
                                            </TouchableOpacity>
                                            : null
                                    }
                                    {
                                        post.audio_path ?
                                            <TouchableOpacity activeOpacity={0.7} style={styles.ListenBtn} onPress={() => navigation.navigate("AudioPlayerScreen", { post: post })} >
                                                <Text style={styles.ListenBtnTxt}>
                                                    Audio
                                                </Text>
                                                <View style={{ flex: 0.3 }}>
                                                    <Audio />
                                                </View>
                                            </TouchableOpacity>
                                            : null
                                    }
                                </View>
                            </View>
                            <View style={styles.DocStatusContainer}>
                                <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                                    <Text style={{ fontSize: 10, color: "#767676" }}>
                                        {post.Date ? post.Date.substr(0, 10) : null}
                                    </Text>
                                </View>
                                <View style={styles.DocStatus}>
                                    <View style={styles.DocStatusSvg}>
                                        <TouchableOpacity onPress={LikeUnlike}>
                                            {
                                                isLiking ? (
                                                    <ActivityIndicator color='#FF7070' />
                                                ) : (
                                                        post.isLiked ? (<Like />) : (<Heart />)
                                                    )
                                            }
                                        </TouchableOpacity>
                                        <Text style={styles.DocStatusTxt}>
                                            {post.nbr_like}
                                        </Text>
                                    </View>
                                    <View style={styles.DocStatusSvg}>
                                        <TouchableOpacity onPress={() => { navigation.navigate("commentSection", { documentid: document, title: route.params.title }) }}>
                                            <Comments />
                                        </TouchableOpacity>
                                        <Text style={styles.DocStatusTxt}>
                                            {post.nbr_commentaire}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.Line}></View>
                            </View>
                            <View style={styles.QuizzContainer}>
                                <Text style={styles.QuizzContainerTitle}>
                                    Quiz
                                </Text>
                                <FlatList
                                    data={post.quizz}
                                    numColumns={1}
                                    keyExtractor={(item) => item.id_quiz.toString()}
                                    renderItem={({ item }) => <QuizzView document={document} item={item} navigation={navigation} />}
                                    style={styles.QuizzListStyle}
                                    contentContainerStyle={styles.QuizzListContainerStyle}
                                />
                            </View>
                        </>
                    )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    post: {
        flex: 0.6
    },
    PostTitle: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 20
    },
    Wrap: {
        flex: 1
    },
    DocTitle: {
        flex: 8,
        alignItems: "center"
    },
    DocTitleTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    DocDesc: {
        flex: 0.8,
        width: '90%',
        alignSelf: 'center',
        justifyContent: "center"
    },
    DocDescTxt: {
        textAlign: 'center',
        fontSize: 12
    },
    DownladBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    DownladBtn: {
        width: 100,
        height: 49,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#6E95FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    DownladBtnTxt: {
        color: '#6E95FA',
        fontWeight: 'bold',
        flex: 0.9,
        textAlign: 'center'
    },
    WatchBtn: {
        width: 100,
        height: 49,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#AE29CF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    WatchBtnTxt: {
        color: '#AE29CF',
        fontWeight: 'bold',
        flex: 0.9,
        textAlign: 'center'
    },
    ListenBtn: {
        width: 100,
        height: 49,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#F35050',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    ListenBtnTxt: {
        color: '#F35050',
        fontWeight: 'bold',
        flex: 0.9,
        textAlign: 'center'
    },
    DocStatusContainer: {
        flex: 0.1,
        alignItems: 'center'
    },
    DocStatus: {
        marginVertical: 8,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    DocStatusSvg: {
        flexDirection: 'row'
    },
    DocStatusTxt: {
        color: '#7C7C7C',
        justifyContent: 'center',
        marginLeft: 2
    },
    Line: {
        width: '100%',
        height: 1,
        backgroundColor: '#B4B4B4'
    },
    QuizzContainer: {
        alignItems: 'center',
        flex: 0.4,
        width: '100%'
    },
    QuizzContainerTitle: {
        color: '#565656',
        fontSize: 18,
        marginVertical: 6
    },
    QuizzBtn: {
        width: 310,
        height: 48,
        flexDirection: 'row',
        backgroundColor: '#6E95FA',
        alignItems: 'center',
        borderRadius: 10
    },
    QuizzName: {
        flex: 0.8
    },
    QuizzNameTxt: {
        color: 'white',
        padding: 10,
        fontSize: 18
    },
    QuizzRate: {
        flex: 0.2,
        alignItems: 'center'
    },
    QuizzRateTxt: {
        color: 'white',
        fontSize: 10
    },
    QuizzListStyle: {
        width: '100%',
        marginTop: 10
    },
    QuizzListContainerStyle: {
        alignItems: 'center'
    }
})

export default Post