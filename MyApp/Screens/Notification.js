import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { requestNotification } from '../address'
import { AuthContext } from '../App';


const NotificationView = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={{ width: '90%', alignSelf: 'center' }} onPress={() => item.id_commentaire ? navigation.navigate('commentSection', {  title: item.title_doc, Notified: item.id_commentaire, id_notification : item.id_notification,documentid:{documentid:item.id_document,title:item.title_doc} }) : navigation.navigate("post", { documentid: item.id_document, title: item.title })}>
            <Text style={{ fontSize: 15 }}>
                {item.id_commentaire?'Votre commentaire a recu une reponse':'greate'}
            </Text>
        </TouchableOpacity>
    )

}


const NotificationScreen = ({ navigation }) => {


    const { signOut } = React.useContext(AuthContext);
    const [Notification, setNotification] = useState([]);
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            return requestNotification(setNotification, setisLoading, signOut)
        })
    }, [navigation])

    return (
        <View style={styles.container} >
            {/* TODO Search Bar */}
            <View style={{ flex: 0.2, justifyContent: 'center', marginLeft: 20 }}>
                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                    Notifications
                </Text>
            </View>
            <View style={styles.SSListContainer}>
                {
                    isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size={50} color="#5F33EC" />
                        </View>
                    ) : (
                            Notification.length > 0 ? (

                                <FlatList
                                    style={{ flex: 1, width: '100%' }}
                                    numColumns={1}
                                    data={Notification}
                                    keyExtractor={(item) => item.id_notification.toString()}
                                    renderItem={({ item }) => <NotificationView item={item} navigation={navigation} />}
                                    contentContainerStyle={{}}
                                    ItemSeparatorComponent={() => <View style={{ borderWidth: 1, marginVertical: 20, width: '90%', alignSelf: 'center', borderColor: '#A6A6A6' }}></View>}
                                />
                            ) : (
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{fontSize: 20,fontWeight: 'bold',color: "#BBBBBB"}}>
                                            Notification is Empty
                                        </Text>
                                    </View>
                                )
                        )
                }
            </View>
        </View>
    )

}

export default NotificationScreen;


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
        paddingTop: 40,
        alignItems: 'center',
        overflow: 'hidden'
    },
})