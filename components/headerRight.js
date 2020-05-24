import React from 'react';
import {View} from 'react-native'
import {Icon} from 'react-native-elements'
import setObjSave from '../functions/setObjSave'
export default (navigation) => {
    const delStack = async () => {
        await (new Promise((resolve, reject) => {
            const stackName = nameStack
            let auxStack = [{name: 'Steps'}]
            const auxVars = JSON.parse(JSON.stringify(stacksVars))
            nameStack = 'Steps'
            let count = 1
            let newCount = 2
            let delCount = 0
            let bandChange = false
            startIndex = 0
            endIndex = 0

            if (stackName==='Steps'){
                count=2
                if (stacksG.length>1){
                    stacksVars[`Steps`]={txtGExp: stacksVars[`Steps 2`].txtGExp}
                }
                if (stacksG.length===1){
                    stacksVars[`Steps`]={txtGExp: ''}
                }
                bandChange = true
            }//else{
                
            while (count < stacksG.length){
                if (stacksG[count].name !== stackName){
                    auxStack.push({name: `Steps ${newCount}`})
                    newCount++
                    if(bandChange){
                        stacksVars[`Steps ${newCount-1}`]={txtGExp: stacksVars[`Steps ${newCount}`].txtGExp}
                    }
                    //nameStack = stacksG[count].name
                }else{
                    if (count === stacksG.length - 1){
                        delCount = count - 1
                        if (stacksG.length>2){
                            stacksVars[`Steps ${count}`]={txtGExp: auxVars[`Steps ${count}`].txtGExp}                    
                        }
                    }else{
                        delCount = count
                    }
                    bandChange=true
                }
                count++
            }

            /*if(delCount===stacksG.length){

            }*/

            nameStack = auxStack[delCount].name
            stacksG = auxStack

            setObjSave("@evalObject", stacksVars)
            setObjSave("@stacksNames", stacksG)

            resolve(1)
        }).then(() => new Promise((resolve, reject) => {
            setBandNewG(true)
            setStacksG(stacksG)
            resolve(1)
        })))
        
    }
    return ( 
        <View style={{flexDirection: 'row'}} >
            <Icon
            raised
            name = 'trash'
            type = 'font-awesome'
            color = '#f50'
            onPress = {delStack} />
            <Icon
            raised
            name = 'camera'
            type = 'font-awesome'
            color = '#f50'
            onPress = {
                () => navigation.navigate('CamScan')
            } />
        </View>
    )
}