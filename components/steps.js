import 'react-native-get-random-values';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Dimensions,
    useWindowDimensions
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
    WebView
} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import onChangeText from '../functions/onChangeText.js'

//import loading from '../functions/loading.js'
import AsciiTab from './asciiTab.js'
//import PixelScan from './pixelScan.js'
txtGExp=''
heightFix = 160
let stateRotated = 0;
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
let firstRotate = true
setStepsWidth = null
setStepsHeight = null
bandRotate = false
export default (props) => {
    let {width, height} = Dimensions.get('window');
    const window = useWindowDimensions();
    const [html, setHtml] = React.useState('');
    const [txtExp, setTxtExp] = React.useState('');
    let [Wwidth, setWidth] = React.useState(boundsStep.width);
    let [Wheight, setHeight] = React.useState(boundsStep.height);
    //let Wwidth = window.width
    //let Wheight = window.height
    setStepsWidth = setWidth;
    setStepsHeight = setHeight;
    const [backgroundColor, setBackground] = React.useState('green');
    const stackName = props.route.name
    //let [bandRotate, setBandRotate] = React.useState(false);
    let webRef = React.useRef();
    const [dimensions, setDimensions] = React.useState({ window, screen });
  

    stacksetGHtml[stackName]={setGHtml: setHtml}
    stackGTxtExp[stackName]={setGTxtExp: setTxtExp}
    
    const evaluating = text => {
        /*new Promise((resolve, reject) => {
            setHtml(loading())
            resolve(1)
        }).then(() => {
            new Promise((resolve, reject) => {*/
              //stateRotated=0
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
            //setBandRotate(true)
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
    
    /*const onChange = ({ window, screen }) => {
      console.log(`onChange: `)
     // console.log(window)
      bandRotate=false
      console.log(`bandRotate_1: ${bandRotate}`)
      setDimensions({ window, screen });
    };

    React.useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);
      };
    });*/

    return(
     <>
      <StatusBar backgroundColor = {backgroundColor} barStyle = "default" />
      <SafeAreaView>
         <ScrollView
          scrollEnabled={false}
          //contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
         // keyboardDismissMode="none"
         
          keyboardShouldPersistTaps='handled'
          
          onLayout={()=>{
            txtGExp = stacksVars[stackName].txtGExp === undefined ? '' : stacksVars[stackName].txtGExp
            
            const cWidth = Dimensions.get('window').width;
            const cHeight = Dimensions.get('window').height;
           // const window = useWindowDimensions();
           console.log(`bandRotate: ${bandRotate} cWidth ${cWidth} cHeight: ${cHeight} `);
           
           new Promise(async (resolve, reject) => {
             if (bandRotate) {
              
              if (stateRotated===0){
                boundsStep = {width: boundsStep.height, height: boundsStep.width}
                width=boundsStep.width
                height = boundsStep.height
                stateRotated=1
              } else if (stateRotated<1) {
                stateRotated++
              }else{
                stateRotated=0
              }
              
              //setWidth(width)
            }else{
              bandRotate=true
              //reloadHtml()
            }
             resolve(1)
           }).then(()=>{
            reloadHtml()
           })
            
            
            //console.log(width)
           // console.log(height)
          // setBandRotate(false)
           // if (stateRotated===0) {
             // stateRotated = 1
             //if (webRef.setNativeProps) {
               
              //webRef.setProps({style: {width: width, height: height}});
             //}
             
            // if (stateRotated===1) {

               console.log(`_onLayoutSteps: boundsStep.width: ${boundsStep.width} === Wwidth ${Wwidth} firstRotate: ${firstRotate}`);
              if(!firstRotate){

                //boundsStep = {width: boundsStep.height, height: boundsStep.width}
                //setObjSave("@boundsStep", boundsStep);
                //Wwidth = boundsStep.width
                //Wheight = boundsStep.height
               /*if (boundsStep.width <= boundsStep.height) {
                boundsStep = {width: boundsStep.height, height: boundsStep.width}
                setObjSave("@boundsStep", boundsStep);
                Wwidth = boundsStep.width
                Wheight = boundsStep.height
              }else  
                if (boundsStep.width >= boundsStep.height) {
                  boundsStep = {width: boundsStep.height, height: boundsStep.width}
                  setObjSave("@boundsStep", boundsStep);
                  Wwidth = boundsStep.width
                  Wheight = boundsStep.height
                }*/

            }
            firstRotate=false
              /*else if (boundsStep.width === Wwidth){
                if (Wwidth>=Wheight){
                  boundsStep = {width: Wheight, height: Wwidth}
                  //boundsStep = {width: Wwidth, height: Wheight}
                }else{
                  boundsStep = {width: Wwidth, height: Wheight}
                  
                }
                boundsStep = {width: Wheight, height: Wwidth}
                setObjSave("@boundsStep", boundsStep);
                Wwidth = boundsStep.width
                Wheight = boundsStep.height
              }*/
               /* if (boundsStep.width === Wwidth){
                boundsStep = {width: Wheight, height: Wwidth};  
                setObjSave("@boundsStep", boundsStep);
                const aux = Wheight
                Wheight = Wwidth
                Wwidth=aux;
                //setWidth(Wheight);
                //setHeight(Wwidth);
               }else{
                
                if (boundsStep.width <= Wwidth) {
                  Wwidth = boundsStep.width
                  Wheight = boundsStep.height
                }else{
                 Wwidth = window.width
                 Wheight = window.height
                }
                //setWidth(Wheight);
                //setHeight(Wwidth);
                console.log(`Wwidth: ${Wwidth}`)
                console.log(`Wheight: ${Wheight}`)
                boundsStep = {width: Wwidth, height: Wheight};  
                setObjSave("@boundsStep", boundsStep);
               }*/
               //else if ()
             //}else if(stateRotated===0) {
              
               //boundsStep = {width: cWidth,height: cHeight};
               // setObjSave("@boundsStep", boundsStep);

            // }
              
             /*if (boundsStep.width !== height){
                boundsStep = {width: height,height: width};
                setObjSave("@boundsStep", boundsStep);
             }*/
             /*if (firstRotate) {
              if (width === Wheight) {
                boundsStep = {width: width, height: height};  
                setObjSave("@boundsStep", boundsStep);
                setWidth(boundsStep.width);
                setHeight(boundsStep.height);
                
              // stateRotated=1
              } else {
                console.log(`webRef: ${webRef.state}`)
                console.log(webRef.state)
                console.log(webRef)
                boundsStep = {width: height, height: width};  
                setObjSave("@boundsStep", boundsStep);
                setWidth(boundsStep.width);
                setHeight(boundsStep.height);
                //stateRotated = 0
              }
             //   stateRotated=0
            }else{
              //setWidth(width);
              //setHeight(height);
              //const {width, height} = Dimensions.get('window');
              //boundsStep = {width: cWidth, cHeight: height};
              firstRotate = true
            }*/

            
            /*}else{
              stateRotated = 0
              setWidth(width)
              setHeight(height)
              reloadHtml()
              
            }*/
            
            /*
            setWidth(width)
            setHeight(height)
            reloadHtml()*/
           // setBackground(backgroundColor)
          }}>
            
          {
            /*<Header />*/}
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <AsciiTab
                style={styles.asciiTab}
                onChangeText={text => {
                  bandRotate = false;
                  new Promise((resolve, reject) => {
                    const auxStart=startIndex;
                    const auxEnd = endIndex;
                    startIndex = 0;
                    endIndex = 0;
                    stackchangeRangeSelG[stackName].changeRangeSelG()
                    startIndex = auxStart;
                    endIndex = auxEnd;
                  // console.log(`changeText: ${text}`)
                    resolve(1)
                  }).then(() => evaluating(text));
                  
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
              ref={component =>  webRef = component}
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
              style={[styles.webView,{width: boundsStep.width, height: boundsStep.height - heightFix}]}
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
