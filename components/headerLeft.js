import React from 'react';
import {View} from 'react-native'
import {Icon} from 'react-native-elements'
import setObjSave from '../functions/setObjSave'
export default (navigation) => {
    
    const addStack = () => {
        nameStack = `Steps ${stacksG.length+1}`
        stacksG.push({
            name: `Steps ${stacksG.length+1}`
        })
        
        setObjSave("@stacksNames", stacksG)
        new Promise((resolve, reject) => {
            setBandNewG(true)
            setStacksG(stacksG)
            resolve(1)
        })
    }
    return (
        <View style={{flexDirection: 'row'}}  > 
            <Icon
            raised
            name = 'bars'
            type = 'font-awesome'
            color = '#f50'
            onPress = {
                () => navigation.toggleDrawer()
            } />
            <Icon
            raised
            name = 'plus'
            type = 'font-awesome'
            color = '#f50'
            onPress = {addStack} />
        </View>
    )
}