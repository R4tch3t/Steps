import React from 'react';
import {View} from 'react-native'
import {Icon} from 'react-native-elements'
import setObjSave from '../functions/setObjSave'

addStack = (bandP, txt) => {
    bandRotate = true;
    nameStack = `Steps ${stacksG.length+1}`
    stacksG.push({
        name: `Steps ${stacksG.length+1}`
    })

    setObjSave("@stacksNames", stacksG)
    new Promise((resolve, reject) => {
        setBandNewG(true)
        setStacksG(stacksG)
        resolve(1)
    }).then(()=>{
        if (bandP===true) {
               //const instertChar = char => {
                // const countC = char.length;
                 stacksfocusG[nameStack].focusG();
                 txtGExp = txt;
                 bandRotate=false;
                 stackevalGlobal[nameStack].evalGlobal(txtGExp);
                 /*if (startIndex < endIndex) {
                   endIndex = startIndex;
                 }
                 startIndex += countC;
                 endIndex += countC;
                 stackchangeRangeSelG[
                   nameStack
                 ].changeRangeSelG();*/
              // };
        }
    })
    
}
export default (navigation) => {
    

    return (
        <View style={{flexDirection: 'row'}}  > 
            <Icon
            raised
            name = 'bars'
            type = 'font-awesome'
            color = 'red'
            onPress = {
                () => {
                    if (stacktextInput[nameStack]){
                        stacktextInput[nameStack]._textInput.blur()
                    }
                    navigation.toggleDrawer()
                }
            } />
            <Icon
            raised
            name = 'plus'
            type = 'font-awesome'
            color = 'red'
            onPress = {addStack} />
        </View>
    )
}