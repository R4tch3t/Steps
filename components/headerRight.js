import React from 'react';
import { Icon } from 'react-native-elements'
export default (navigation) => {
    return ( 
        <Icon
        raised
        name = 'camera'
        type = 'font-awesome'
        color = '#f50'
        onPress = {
            () => navigation.navigate('CamScan')
        } />
    )
}