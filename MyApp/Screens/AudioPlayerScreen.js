import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text,Image } from 'react-native';
import SoundPlayer from 'react-native-sound-player'


import Play from '../Img/SVG/svg49.svg';
import Pause from '../Img/SVG/svg50.svg';
import Forward from '../Img/SVG/svg51.svg';
import Replay from '../Img/SVG/svg53.svg';

const AudioPlayerScreen = ({ route, navigation }) => {

    // const document = route.params.post;
    // console.log(document)
    const [Played, setPlayed] = useState(true);
    const [Duration, setDuration] = useState(0);
    const [Current, setCurrent] = useState(0);
    var IntervalId = 0;

    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    useEffect(() => {
        navigation.addListener('blur', () => {
            try {
                SoundPlayer.stop()
                clearInterval(IntervalId);
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        })
        return navigation.addListener('focus', async () => {
            try {
                SoundPlayer.playUrl('http://192.168.1.9:3000/public/Audio/doc1.m4a')
                try {
                    const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
                    var DurMinutes = Math.floor(info.duration / 60);
                    var DurSreconds = Math.floor(info.duration) - DurMinutes * 60;
                    setDuration(str_pad_left(DurMinutes, '0', 2) + ':' + str_pad_left(DurSreconds, '0', 2));
                    var CurMinutes = Math.floor(info.currentTime / 60);
                    var CurSreconds = Math.floor(info.currentTime) - CurMinutes * 60;
                    setCurrent(str_pad_left(CurMinutes, '0', 2) + ":" + str_pad_left(CurSreconds, '0', 2));
                    IntervalId = setInterval(async () => {
                        const infoNow = await SoundPlayer.getInfo();
                        var CurMinutes = Math.floor(infoNow.currentTime / 60);
                        var CurSreconds = Math.floor(infoNow.currentTime) - CurMinutes * 60;
                        setCurrent(str_pad_left(CurMinutes, '0', 2) + ":" + str_pad_left(CurSreconds, '0', 2));
                    }, 1000);
                } catch (e) {
                    console.log('There is no song playing', e)
                }
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        })
    }, [])

    const play = () => {
        try {
            SoundPlayer.resume()
            setPlayed(true)
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    const pause = () => {
        try {
            SoundPlayer.pause()
            setPlayed(false)
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }


    const forward = async () => { // You need the keyword `async`
        const infoNow = await SoundPlayer.getInfo();
        SoundPlayer.seek(infoNow.currentTime + 5);
    }
    const replay = async () => { // You need the keyword `async`
        const infoNow = await SoundPlayer.getInfo();
        SoundPlayer.seek(infoNow.currentTime - 5);
    }

    return (
        <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Image source={require('../Img/AudioPlayer.png')}/>
            <Text style={{ color: '#fff',marginTop:20}}>
                {
                    Current + '/' + Duration
                }
            </Text>
            <View style={{flexDirection:'row',marginVertical:10 }} >
                <TouchableOpacity onPress={forward}  style={{marginHorizontal:10}}>
                    <Forward />
                </TouchableOpacity>
                {
                    Played ?
                        <TouchableOpacity onPress={pause}>
                            <Pause />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={play}>
                            <Play />
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={replay} style={{marginHorizontal:10}}>
                    <Replay />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AudioPlayerScreen;
const Styles = StyleSheet.create({

})