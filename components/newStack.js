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
  const [Wwidth, setWidth] = React.useState(0);
  const [Wheight, setHeight] = React.useState(0);

  const setObjSave = async (item, val) => {
    try{
      const jsonValue = JSON.stringify(val)
      console.log(`saveObj: ${jsonValue}`)
      await AsyncStorage.setItem(item, jsonValue);
    }catch(e){

    }
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
              nameStack = `Steps ${stacksG.length+1}`
              stacksG.push({name: `Steps ${stacksG.length+1}`})
              //const stacksP=[{name: 'steps9'}]
              setObjSave("@stacksNames", stacksG)
              new Promise((resolve, reject)=>{
                setBandNewG(true)
                setStacksG(stacksG)
                resolve(1)
              })//.then(() => navigation.navigate('steps9'))
              
              console.log(stacksG)
              console.log(props)
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
