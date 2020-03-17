import React from 'react';
import { View,ActivityIndicator} from 'react-native';


const SplashScreen = ()=>{
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="red" />
          </View>
    )
}

export default SplashScreen;



