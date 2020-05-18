import 'react-native-get-random-values';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Dimensions,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
    WebView
} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import onChangeText from '../functions/onChangeText.js'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/*const {
    width,
    height
} = Dimensions.get('window');
*/
import loading from '../functions/loading.js'
import AsciiTab from './asciiTab.js'

setGHtml=null
setGTxtExp=null
txtGExp=''
heightFix = 160
evalGlobal=null
export default () => {
    const [html, setHtml] = React.useState('');
    const [txtExp, setTxtExp] = React.useState('');
    const [Wwidth, setWidth] = React.useState(0);
    const [Wheight, setHeight] = React.useState(0);
    setGHtml = setHtml
    setGTxtExp = setTxtExp
    const evaluating = text => {
        new Promise((resolve, reject) => {
            setHtml(loading())
            resolve(1)
        }).then(() => {
            new Promise((resolve, reject) => {
                //txtGExp = text
                setSaveData("@evalString", text)
                setTxtExp(text)
                onChangeText(text, setHtml)
                resolve(1)
            })
        })
    };
    evalGlobal = evaluating
    const getSaveData = async () => {
      let value = await AsyncStorage.getItem('@evalString');
      if (value !== null) {
        evaluating(value)
        //txtGExp = value
      }else{
       // evaluating('')
      }
    }
    const setSaveData = async (item, val) => {
      await AsyncStorage.setItem(item, val);
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
              //getSaveData()
              setWidth(width)
              setHeight(height)
              evaluating(txtGExp)
              //getSaveData()
            }
            /*if(html===""){*/// onChangeText(txtGExp, setHtml)//}
          }}>
          {/*<Header />*/}
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <AsciiTab
                style={styles.asciiTab}
                onChangeText={text => {
                  startIndex = 0;
                  endIndex = 0;
                  changeRangeSelG();
                  evaluating(text)
                }}
                placeholder={strToLang('typeAnPH')}
                //keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                //selectTextOnFocus={true}
                defaultValue={txtExp}
              />

              {/*<Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>*/}
            </View>
            <WebView
              //injectedJavaScript={'true'}
              //domStorageEnabled={true}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              // originWhitelist={['*']}
              scalesPageToFit={true}
            
              /*onNavigationStateChange = {
                onNavigationStateChange.bind(this)
              }*/
              source={{html: html}}
              //source={{html: require('./html/Loading.html')}}
              //source={{uri: loading()}} 
              //automaticallyAdjustContentInsets={true}
              //scrollEnabled={true}
              style={[styles.webView,{width: Wwidth, height: Wheight - heightFix}]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
      scrollView: {
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
          marginTop: 10,
          paddingHorizontal: 24,
      },
      asciiTab: {
        flex: 1,
        height: 40,
        marginTop: 3,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50
      },
      webView: {
        //  marginTop: 10
      },
      sectionDescription: {
          marginTop: 8,
          fontSize: 18,
          fontWeight: '400',
          color: Colors.dark,
      },
      highlight: {
          fontWeight: '700',
      },
      footer: {
          color: Colors.dark,
          fontSize: 12,
          fontWeight: '600',
          padding: 4,
          paddingRight: 12,
          textAlign: 'right',
      },
});
