import React from 'react';
import { View,ActivityIndicator,Image} from 'react-native';


const SplashScreen = ()=>{
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 250, height: 220,margin:40}} source={require('../Img/Ccuizzy.png')} />
            <ActivityIndicator size="large" color="red" />
          </View>
    )
}
export default SplashScreen;



