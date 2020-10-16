import React from 'react';
import { View, Button,StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-player';

const VideoPlayerScreen = ({route , navigation}) => {

    const document = route.params.post;
    console.log(document)
   


    return (
        <View style={{backgroundColor:'#000', flex :1, justifyContent:'center'}} >
            <VideoPlayer
                video={{ uri: 'http://192.168.1.9:3000/public/Video/doc1.mp4' }}
                videoWidth={1600}
                videoHeight={1200}
                thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            />
            
        </View>
    )
}

export default VideoPlayerScreen;
const Styles = StyleSheet.create({

})