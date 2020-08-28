import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import {requestSavedPost } from '../address';
import { AuthContext } from '../App';


//SVG
import HeartSvg from '../Img/SVG/svg29.svg';
import QuizzSvg from '../Img/SVG/svg30.svg';
import ViewsSvg from '../Img/SVG/svg31.svg';
import CommentsSvg from '../Img/SVG/svg32.svg';



const DocumentView = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={styles.ItemCard} activeOpacity={0.8} onPress={() => { navigation.navigate("post", { documentid: item.id_document, title: item.titre }) }} >
            <View style={styles.DocumentContainer}>
                <View style={styles.NameContainer}>
                    <Text style={styles.itemCardName}>{item.titre}</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.itemCarddesc}>{'\t' + item.description.substr(0, 200) + "..."}</Text>
                </View>
                <View style={styles.LearnMore}>
                    <View style={styles.QuizzSvgContainer}>
                        <QuizzSvg />
                        <Text style={styles.QuizzSvgTxt}>{item.nbr_quizz}</Text>
                    </View>
                    <View style={styles.Svg}>
                        <View style={[styles.SvgContainer, { marginRight: 6 }]}>
                            <HeartSvg />
                            <Text style={styles.SvgTxt}>{item.nbr_like}</Text>
                        </View>
                        <View style={[styles.SvgContainer, { marginRight: 6 }]}>
                            <CommentsSvg />
                            <Text style={styles.SvgTxt}>{item.nbr_commentaire}</Text>
                        </View>
                        <View style={styles.SvgContainer}>
                            <ViewsSvg />
                            <Text style={styles.SvgTxt}>{item.nbr_views}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}



const SavedScreen = ({ route, navigation }) => {


    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setisLoading] = useState(true);
    const [ListeDocument, setListeDocument] = useState([])


    useEffect(() => {
        return navigation.addListener('focus',()=>{
            requestSavedPost(setListeDocument,setisLoading,signOut)
        })
    }, [navigation])


    return (
        <View style={styles.container} >
            {/* TODO Search Bar */}
            <View style={{flex:0.2,justifyContent:'center',marginLeft:20}}>
                <Text style={{fontSize:25,color:'white',fontWeight:'bold'}}>
                    Your Saved Document
                </Text>
            </View>
            <View style={styles.SSListContainer}>
                {
                    isLoading ? (
                        <View style={styles.ActivityIndicatorContainer}>
                            <ActivityIndicator size={40} color='#5F33EC' />
                        </View>
                    ) : (
                            <>
                                
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


export default React.memo(SavedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F33EC',
        justifyContent: 'flex-end'
    },
    SSListContainer: {
        flex: 0.8,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
        paddingTop: 40
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
    
})