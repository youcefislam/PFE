import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { requestListeDocument, FollowUnfollowRequest } from '../address';
import { AuthContext } from '../App';


//SVG
import HeartSvg from '../Img/SVG/svg29.svg';
import QuizzSvg from '../Img/SVG/svg30.svg';
import ViewsSvg from '../Img/SVG/svg31.svg';
import CommentsSvg from '../Img/SVG/svg32.svg';


const DocumentView = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={Styles.ItemCard} activeOpacity={0.8} onPress={() => { navigation.navigate("post", { documentid: item.id_document, title: item.titre }) }} >
            <View style={Styles.DocumentContainer}>
                <View style={Styles.NameContainer}>
                    <Text style={Styles.itemCardName}>{item.titre}</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={Styles.itemCarddesc}>{'\t' + item.description.substr(0, 200) + "..."}</Text>
                </View>
                <View style={Styles.LearnMore}>
                    <View style={Styles.QuizzSvgContainer}>
                        <QuizzSvg />
                        <Text style={Styles.QuizzSvgTxt}>{item.nbr_quizz}</Text>
                    </View>
                    <View style={Styles.Svg}>
                        <View style={[Styles.SvgContainer, { marginRight: 6 }]}>
                            <HeartSvg />
                            <Text style={Styles.SvgTxt}>{item.nbr_like}</Text>
                        </View>
                        <View style={[Styles.SvgContainer, { marginRight: 6 }]}>
                            <CommentsSvg />
                            <Text style={Styles.SvgTxt}>{item.nbr_commentaire}</Text>
                        </View>
                        <View style={Styles.SvgContainer}>
                            <ViewsSvg />
                            <Text style={Styles.SvgTxt}>{item.nbr_views}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);
    const SousSpecialite = route.params.SousSpecialiteid;
    const specialiteid=route.params.specialiteid;
    const [isFollowed, setisFollowed] = useState(route.params.isFollowed)
    const [ListeDocument, setListeDocument] = useState([]);
    const [isSending, setisSending] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        return navigation.addListener('focus',()=>{
            requestListeDocument(SousSpecialite, setListeDocument, setisLoading, signOut)
        })
    }, [navigation])

    const follow = () => {
        setisSending(prev => !prev)
        FollowUnfollowRequest(SousSpecialite, setisFollowed, setisSending,specialiteid, signOut);
    }

    return (
        <View style={Styles.container} >
            {/* TODO Search Bar */}
            <View style={Styles.SSListContainer}>
                {
                    isLoading ? (
                        <View style={Styles.ActivityIndicatorContainer}>
                            <ActivityIndicator size={40} color='#5F33EC' />
                        </View>
                    ) : (
                            <>
                                <View style={Styles.FollowBtnContainer}>
                                    {
                                        isSending ? (
                                            <ActivityIndicator size={20} color='#6892DD' />
                                        ) : (
                                                <TouchableOpacity onPress={follow} style={[Styles.FollowBtn, { borderColor: isFollowed ? "#E06767" : "#5F33EC" }]} >
                                                    <Text style={[Styles.FollowBtnTxt, { color: isFollowed ? "#E06767" : "#5F33EC" }]}>
                                                        {isFollowed ? 'unfollow' : 'Follow'}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                    }
                                </View>
                                <FlatList
                                    style={{ flex: 1 }}
                                    numColumns={1}
                                    data={ListeDocument}
                                    keyExtractor={(item) => item.id_document.toString()}
                                    renderItem={({ item }) => <DocumentView item={item} navigation={navigation} />}
                                    contentContainerStyle={{ alignItems: 'center' }}
                                />
                            </>
                        )
                }
            </View >
        </View >
    )
}

export default Home

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F33EC',
        justifyContent: 'flex-end'
    },
    SSListContainer: {
        flex: 0.9,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
        paddingTop: 40
    },
    specialityCard: {
        borderRadius: 6,
        marginHorizontal: 4,
        marginVertical: 6,
        height: 100,
        backgroundColor: "#ac1111",
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialityCardContent: {
        fontSize: 25,
        color: "white"
    },
    itemCardName: {
        fontSize: 19,
        color: "black",
        fontWeight: 'bold'
    },
    itemCarddesc: {
        marginVertical: 2,
        fontSize: 11,
        color: "#757474"
    },
    ItemCard: {
        borderRadius: 3,
        backgroundColor: "#fff",
        width: 300,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C0C0C0',
        padding: 12,
        marginVertical: 14
    },
    LearnMore: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    LearnMoreTxt: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#8A90B0',
        marginRight: 4
    },
    DocumentContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    },
    NameContainer: {
        flex: 0.3
    },
    QuizzSvgContainer: {
        flex: 0.9,
        flexDirection: 'row'
    },
    QuizzSvgTxt: {
        fontSize: 10,
        marginLeft: 2,
        color: '#6892DD'
    },
    SvgTxt: {
        fontSize: 9,
        marginLeft: 1,
        color: '#9D9D9D'
    },
    SvgContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Svg: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ActivityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    FollowBtnContainer: {
        alignItems: 'center'
    },
    FollowBtn: {
        width: 100,
        borderWidth: 1,
        borderRadius: 15
    },
    FollowBtnTxt: {
        textAlign: 'center'
    },

});
