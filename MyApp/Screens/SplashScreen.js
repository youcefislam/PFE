import React from 'react';
import { View,ActivityIndicator,Image,Text} from 'react-native';


const SplashScreen = ()=>{
    return(
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Image style={{width: 350, height: 220,margin:40}} source={require('../Img/Tredoc.png')} />
            <ActivityIndicator size={50} color="#5F33EC" />
            <Text style={{flex:0.1,fontSize:18}}>
                Welcome
            </Text>
          </View>
    )
}
export default SplashScreen;



