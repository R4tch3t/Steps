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
import {
    WebView
} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import onChangeText from '../functions/onChangeText.js'

import loading from '../functions/loading.js'
import AsciiTab from './asciiTab.js'

txtGExp=''
heightFix = 160

export default (props) => {
    const [html, setHtml] = React.useState('');
    const [txtExp, setTxtExp] = React.useState('');
    const [Wwidth, setWidth] = React.useState(0);
    const [Wheight, setHeight] = React.useState(0);
    const stackName = props.route.name

    stacksetGHtml[stackName]={setGHtml: setHtml}
    stackGTxtExp[stackName]={setGTxtExp: setTxtExp}
    
    const evaluating = text => {
        /*new Promise((resolve, reject) => {
            setHtml(loading())
            resolve(1)
        }).then(() => {
            new Promise((resolve, reject) => {*/
                setSaveData("@evalString", text)
                stacksVars[stackName]={txtGExp: text}
                
                setObjSave("@evalObject", stacksVars)
                setTxtExp(text)
                onChangeText(text, setHtml)
               // resolve(1)
            //})
        //})
    };

    const reloadHtml = () => {
        new Promise((resolve, reject) => {
            setHtml('')
            resolve(1)
        }).then(() => {
            new Promise((resolve, reject) => {
                evaluating(txtGExp)
                resolve(1)
            })
        })
    };
    
    
    stackevalGlobal[stackName]={evalGlobal: evaluating}
    const setSaveData = async (item, val) => {
      try{
        await AsyncStorage.setItem(item, val);
      }catch(e){

      }
    }

    const setObjSave = async (item, val) => {
      try{
        const jsonValue = JSON.stringify(val)
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
            txtGExp = stacksVars[stackName].txtGExp === undefined ? '' : stacksVars[stackName].txtGExp
            if (width !== Wwidth || height !== Wheight) {
              setWidth(width)
              setHeight(height)
              reloadHtml()
              
            }
          }}>
          {/*<Header />*/}
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <AsciiTab
                style={styles.asciiTab}
                onChangeText={text => {
                new Promise((resolve, reject) => {
                  const auxStart=startIndex;
                  const auxEnd = endIndex;
                  startIndex = 0;
                  endIndex = 0;
                  stackchangeRangeSelG[stackName].changeRangeSelG()
                  startIndex = auxStart;
                  endIndex = auxEnd;
                  console.log(startIndex)
                  resolve(1)
                }).then(() => evaluating(text))
                  
                }}
                placeholder={strToLang('typeAnPH')}
                //keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                //selectTextOnFocus={true}
                defaultValue={txtExp}
                route={props.route}
              />

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
