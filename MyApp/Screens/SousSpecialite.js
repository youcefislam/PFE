import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { requestSousSpecialite } from '../address';
import { AuthContext } from '../App';
import { BoxShadow } from 'react-native-shadow';




//  SVG
import DocumentSVG from '../Img/SVG/svg25.svg'
import FollowrsSvg from '../Img/SVG/svg26.svg';
import ArrowSvg from '../Img/SVG/svg20.svg';
import FollowedSvg from '../Img/SVG/svg27.svg';
import NotFollowedSvg from '../Img/SVG/svg28.svg';



const SousSpecialityView = ({ item, navigation,specialiteid }) => {

    const shadowOpt = {
        width: 288,
        height: 135,
        color: "#000000",
        border: 10,
        radius: 15,
        opacity: 0.22,
        x: 0,
        y: 0,
        style: { marginVertical: 14 }
    }

    return (
        <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={Styles.specialityCard} onPress={() => { navigation.navigate("ListeDocument", {specialiteid:specialiteid.specialiteid, SousSpecialiteid: item.id_sous_specialite, title: item.nom,isFollowed:item.isFollowed }) }} activeOpacity={0.8}>
                <View style={Styles.SpecialityImage}>
                    <View style={{ position: 'absolute', top: 10, right: 20 }}>
                        {/* <NotFollowedSvg /> */}
                        {
                            item.isFollowed ? (<NotFollowedSvg />) : (<FollowedSvg />)
                        }
                    </View>
                </View>
                <View style={Styles.SpecilaityHeader} >
                    <View style={{ flex: 0.7 }}>
                        <Text style={Styles.specialityCardContent}>{item.nom.length > 105 ? item.nom.substr(0, 105) + ".." : item.nom}</Text>
                    </View>
                    <View style={Styles.SpecialitySvgs}>
                        <View style={Styles.SpecialityInfoSvgContainer}>
                            <DocumentSVG />
                            <Text style={Styles.InfoTxt}>{item.nbr_document}</Text>
                        </View>
                        <View style={Styles.SpecialityInfoSvgContainer}>
                            <FollowrsSvg />
                            <Text style={Styles.InfoTxt}>{item.nbr_Followers}</Text>
                        </View>
                        <View style={[Styles.SpecialityArrowSvgContainer,]}>
                            <ArrowSvg height={14} width={6} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </BoxShadow>
    )
}


const Home = ({ route, navigation }) => {

    const { signOut } = React.useContext(AuthContext);

    const specialite = route.params;  // The Speciality info (used to fetch the List Of it subSpeciality from the server)              
    const [SousSpecialities, setSousSpecialities] = useState([]);
    const [FollowOnly, setFollowOnly] = useState(false);
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        return navigation.addListener('focus',()=>{
            requestSousSpecialite(specialite.specialiteid, setSousSpecialities,setisLoading, signOut);
        })
    }, [navigation])

    return (
        <View style={Styles.container} >
            <View style={Styles.SSListContainer}>
                <View style={Styles.SwitchContainer}>
                    <Text style={{ fontSize: 12 }} >Followed Only</Text>
                    <Switch
                        style={Styles.SwitchComponent}
                        trackColor={{ false: "#d9d9d9", true: "#b3d9ff" }}
                        thumbColor={FollowOnly ? "#66b3ff" : "#f4f3f4"}
                        onValueChange={() => setFollowOnly(previousState => !previousState)}
                        value={FollowOnly} />

                </View>
                {
                    isLoading ? (
                        <View style={{flex:1,justifyContent:'center'}}>
                            <ActivityIndicator size={40} color='#5F33EC' />
                        </View>
                    ) : (
                            <FlatList
                                numColumns={1}
                                data={FollowOnly ? SousSpecialities.filter(x => x.isFollowed == true) : SousSpecialities}
                                keyExtractor={(item) => item.id_sous_specialite.toString()}
                                renderItem={({ item }) => <SousSpecialityView item={item} navigation={navigation} specialiteid={specialite} />}
                                contentContainerStyle={{ alignItems: 'center' }}
                            />
                        )
                }
            </View>
        </View>
    )
}

export default React.memo(Home)
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F33EC',
        justifyContent: 'flex-end'
    },
    specialityCard: {
        width: 288,
        height: 135,
    },
    specialityCardContent: {
        fontSize: 10,
        color: "#767676",
        marginLeft: 10,

    },
    InfoTxt: {
        fontSize: 10,
        alignItems: 'center',
        marginLeft: 3,
        color: '#999999'
    },
    SpecialityInfoSvgContainer: {
        flexDirection: "row",
        marginLeft: 4,
        width: 33,
        justifyContent: 'center'
    },
    SSListContainer: {
        flex: 0.90,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white'
    },
    SwitchContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "90%",
        paddingVertical: 20,
        flexDirection: 'row'
    },
    SwitchComponent: {
        transform: [
            { scaleX: .8 },
            { scaleY: .8 }
        ]
    },
    SpecialityImage: {
        height: 94,
        width: 286,
        backgroundColor: '#C4C4C4',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    SpecilaityHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: 286,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    SpecialitySvgs: {
        flexDirection: 'row',
        flex: 0.4,
        justifyContent: 'flex-end'
    },
    SpecialityArrowSvgContainer: {
        flexDirection: "row",
        marginLeft: 4,
        width: 33,
        justifyContent: 'flex-end',
        paddingRight: 15
    }
});