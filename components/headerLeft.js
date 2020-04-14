import React from 'react';
import { Icon } from 'react-native-elements'
export default (navigation) => {
    return ( 
        <Icon
        raised
        name = 'bars'
        type = 'font-awesome'
        color = '#f50'
        onPress = {
            () => navigation.toggleDrawer()
        } />
    )
}