import 'react-native-get-random-values';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Dimensions,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';


export default (props) => {
  const stackN = props.route.name
  const [Wwidth, setWidth] = React.useState(0);
  const [Wheight, setHeight] = React.useState(0);

  const setObjSave = async (item, val) => {
    try{
      const jsonValue = JSON.stringify(val)
      await AsyncStorage.setItem(item, jsonValue);
    }catch(e){

    }
  }
  
   const newStack = () => {
    nameStack = `Steps ${stacksG.length+1}`
    stacksG.push({
      name: `Steps ${stacksG.length+1}`
    })
    //const stacksP=[{name: 'steps9'}]
    setObjSave("@stacksNames", stacksG)
    new Promise((resolve, reject) => {
      setBandNewG(true)
      setStacksG(stacksG)
      resolve(1)
    }) //.then(() => navigation.navigate('steps9'))
  }
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
            }
                
            while (count < stacksG.length){
                if (stacksG[count].name !== stackName){
                    auxStack.push({name: `Steps ${newCount}`})
                    newCount++
                    if(bandChange){
                        stacksVars[`Steps ${newCount-1}`]={txtGExp: stacksVars[`Steps ${newCount}`].txtGExp}
                    }
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
  
  return(
    <>
      <StatusBar backgroundColor="#f4511e" barStyle="default" />
      <SafeAreaView>
        <ScrollView
          scrollEnabled={false}
          //contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          // keyboardDismissMode="none"
          keyboardShouldPersistTaps='handled'
          onLayout={()=>{
            const {width, height} = Dimensions.get('window');
            if (width !== Wwidth || height !== Wheight) {
              if (stackN === strToLang('newStack')){
                newStack()
              }

              if (stackN === strToLang('delStack')) {
                delStack()
              }
              
              setWidth(width)
              setHeight(height)
            }
          }}>
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
      scrollView: {
        flex: 1,
          backgroundColor: Colors.lighter
      },
      engine: {
          position: 'absolute',
          right: 0,
      },
      body: {
          backgroundColor: Colors.white,
      },
      sectionContainer: {
          flex: 1,
          marginTop: 10,
          paddingHorizontal: 24,
      },
      
});
