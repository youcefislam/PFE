import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator,Image } from 'react-native';
import { requestSpecialite } from '../address';
import { AuthContext, translate } from '../App';
import { useDimensions } from '@react-native-community/hooks';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';


// SVG
import NextBtnSvg from '../Img/SVG/svg20.svg';
import SousSSvg from '../Img/SVG/svg21.svg'
import DocumentSVG from '../Img/SVG/svg22.svg'
import FollowrsSvg from '../Img/SVG/svg23.svg';
let prevIndex = 0;


const DocumentCarousel = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={Styles.ItemCard} onPress={() => navigation.navigate('post', { documentid: item.id_document, title: item.titre })} activeOpacity={0.8} >
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flex: 0.2 }}>
                    <Text style={Styles.itemCardName}>{item.titre}</Text>
                </View>
                <View style={{ flex: 0.7 }}>
                    <Text style={Styles.itemCarddesc}>{'\t' + item.description.substr(0, 200) + "..."}</Text>
                </View>
                <View style={Styles.LearnMore}>
                    <Text style={Styles.LearnMoreTxt} >
                        {translate("LearnMore")}
                    </Text>
                    <NextBtnSvg height={12} width={12} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const SpeciaList = ({ item, index, navigation }) => {
    const ColorArr = [{
        BGColor: "#E9EC4E",
        LinearColor: '#9FA130'
    }, {
        BGColor: "#4EEC8D",
        LinearColor: '#30A142'
    }, {
        BGColor: "#EC4E76",
        LinearColor: '#A13096'
    }, {
        BGColor: "#4EECEC",
        LinearColor: '#309BA1'
    }]
    if (index === prevIndex && index === 3) index -= 1
    else if (index === prevIndex) index += 1
    prevIndex = index;


    return (
        <TouchableOpacity style={{ margin: 10 }} onPress={() => { navigation.navigate("SousSpecialite", { specialiteid: item.id, title: item.name }) }} activeOpacity={0.8}>
            <View style={[Styles.specialityCard, { backgroundColor: ColorArr[index].BGColor }]} >
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                    locations={[0, 1]}
                    colors={[ColorArr[index].LinearColor, "rgba(255, 255, 255, 0)"]}
                    style={Styles.LinearFirstDiago}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        locations={[0, 0.9]}
                        colors={['#2F398C', "rgba(255, 255, 255, 0)"]}
                        style={Styles.LinearSecondDiago}
                    >
                        <View style={Styles.SpecialityNameContainer}>
                            <Text style={Styles.SpecialityNameTxt}>
                                {(item.name.length > 23) ? (item.name.substr(0, 23) + "..") : (item.name)}
                            </Text>
                        </View>
                        <View style={Styles.SpecialityInfoContainer}>
                            <View style={Styles.SScontainer}>
                                <SousSSvg />
                                <Text style={Styles.InfoTxt}>{item.nbrSS}</Text>
                            </View>
                            <View style={Styles.SpecialityInfoSvgContainer}>
                                <DocumentSVG />
                                <Text style={Styles.InfoTxt}>{item.nbrDoc}</Text>
                            </View>
                            <View style={Styles.SpecialityInfoSvgContainer}>
                                <FollowrsSvg />
                                <Text style={Styles.InfoTxt}>{item.nbrFlw}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}


const Home = ({ navigation }) => {


    const { signOut } = React.useContext(AuthContext);
    const [specialities, setSpecialities] = useState([]);
    const screenWidth = useDimensions().screen.width;
    const [ActiveItem, setActiveItem] = useState(0);
    const [Documents, setDocuments] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [User, setUser] = useState({})

    let CarouselRef;


    useEffect(() => {
        return navigation.addListener('focus', () => {
            requestSpecialite(setSpecialities, setDocuments, setisLoading,setUser, signOut);
        })
    }, [navigation])




    return (
        <View style={Styles.container}>
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator color="#ffffff" size={100} />
                    </View>

                ) : (
                        <>
                                <View style={Styles.TopPartStyle}>
                                <View style={{ flexGrow: 1 }}>
                                    <Text style={Styles.UserHeader}>
                                        {translate("HelloUser") + " "+ User.FirstName}
                                    </Text>
                                    <Text style={Styles.DocumentSuggestions}>
                                        {translate("PopularDoc")}
                                    </Text>
                                </View>
                                <View style={{ marginTop: 50, marginRight: 10 }}>
                                    <Image source={User.srcImg} style={Styles.ProfilImage} />
                                    {/* <View style={{ width: 43, height: 43, borderRadius: 15 }}></View> */}
                                </View>
                            </View>
                            <View style={Styles.SuggestionHundler} >
                                <Carousel
                                    ref={(ref) => CarouselRef = ref}
                                    data={Documents}
                                    renderItem={({ item }) => <DocumentCarousel item={item} navigation={navigation} />}
                                    sliderWidth={screenWidth}
                                    itemWidth={300}
                                    onSnapToItem={(e) => setActiveItem(e)}
                                    autoplay={true}
                                />
                                <View style={Styles.progress}>
                                    {
                                        Documents.map((item, index) =>
                                            <View style={[Styles.progressElem, ActiveItem === index ? Styles.activeElem : Styles.inactive]} key={item.id_document}></View>
                                        )
                                    }
                                </View>
                                <View style={Styles.NxtBtn}>
                                    <TouchableOpacity onPress={() => CarouselRef.snapToNext()} activeOpacity={0.9}>
                                        <NextBtnSvg />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Styles.SpecialitiesContainer}>
                                <FlatList
                                    contentContainerStyle={Styles.SpecialitiesList}
                                    numColumns={2}
                                    data={specialities}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        const index = Math.floor(Math.random() * 4);
                                        return (
                                            <SpeciaList item={item} index={index} navigation={navigation} />
                                        )
                                    }}
                                />
                            </View>
                        </>
                    )
            }
        </View >
    )

}

export default React.memo(Home)

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#5F33EC'
    },
    ProfilImage: {
        width: 50, 
        height: 50, 
        borderRadius: 15
    },
    TopPartStyle: {
        flex: 0.3,
        paddingTop: 30,
        flexDirection: 'row'
    },
    UserHeader: {
        color: '#fff',
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: 40,
        paddingHorizontal: 20
    },
    DocumentSuggestions: {
        color: '#fff',
        fontSize: 12,
        paddingTop: 10,
        paddingHorizontal: 20
    },
    SuggestionHundler: {
        position: 'absolute',
        top: "25%",
        width: "100%",
        height: "25%",
        zIndex: 2
    },
    LearnMore: {
        flex: 0.1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    LearnMoreTxt: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#8A90B0',
        marginRight: 4
    },
    NxtBtn: {
        position: 'absolute',
        top: '40%',
        right: 20,
        backgroundColor: 'white',
        height: 27,
        width: 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        borderWidth: 1,
        borderColor: '#9D97B1'
    },
    specialityCard: {
        borderRadius: 15,
        width: 138,
        height: 105,
    },
    SpecialitiesContainer: {
        flex: 0.7,
        paddingTop: 150,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white'
    },
    SpecialitiesList: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ItemCard: {
        borderRadius: 3,
        backgroundColor: "#fff",
        width: 280,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C0C0C0',
        padding: 12
    },
    specialityCardContent: {
        fontSize: 12,
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
        color: "#757474",
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    progressElem: {
        borderRadius: 50,
        width: 8,
        height: 8,
        marginHorizontal: 1
    },
    activeElem: {
        backgroundColor: '#5B4DA9'
    },
    inactive: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.33)'
    },
    LinearFirstDiago: {
        width: 138,
        height: 105,
        borderRadius: 15
    },
    LinearSecondDiago: {
        width: 138,
        height: 105,
        borderRadius: 15,
        justifyContent: 'space-between'
    },
    SpecialityNameContainer: {
        marginTop: 20,
        marginLeft: 7
    },
    SpecialityNameTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    SpecialityInfoContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginLeft: 7
    },
    SScontainer: {
        flexDirection: "row",
        width: 33
    },
    SpecialityInfoSvgContainer: {
        flexDirection: "row",
        marginLeft: 4,
        width: 33
    },
    InfoTxt: {
        fontSize: 10,
        color: '#fff',
        alignItems: 'center',
        marginLeft: 3
    },
    InputHundler: {

    },
    input: {
        height: 40,
        width: 310,
        borderWidth: 1,
        borderColor: "#C1C1C1",
        borderRadius: 15,
        paddingHorizontal: 14,
        color: "#797979"
    }
});