/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions
} from 'react-native';
//import loading from './html/Loading.html'
import install from './functions/install.js'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements'
import headerLeft from './components/headerLeft'
import headerRight from './components/headerRight'
import Steps from './components/steps.js'
import PixelScan from './components/pixelScan.js'
import Config from './components/config.js'
import CamScan from './components/camScan.js'
import NewDelStack from './components/newDelStack.js'
import * as RNLocalize from 'react-native-localize';

import {} from './functions/animation/animation'
import {} from './functions/clean/clean'
import {} from './functions/clean/cleanFactor'
import {} from './functions/clean/cleanstrD'
import {} from './functions/clean/stepLatex'
import {} from './functions/clean/stepsFrac'
import {} from './functions/clean/stepsFactor'
import {} from './functions/evaluate/evalSum'
import {} from './functions/evaluate/evalMinus'
import {} from './functions/evaluate/evalPlux'
import {} from './functions/evaluate/evalDiv'
import {} from './functions/evaluate/evalSqrt'
import {} from './functions/evaluate/evalPow'
import {} from './functions/evaluate/evalLn'
import {} from './functions/evaluate/evalLog10'
import {} from './functions/evaluate/evalLog2'
import {} from './functions/evaluate/evalCos'
import {} from './functions/evaluate/evalSen'
import {} from './functions/evaluate/evalTan'
import {} from './functions/evaluate/evalPercent'
import {} from './functions/evaluate/factorSum'
import {} from './functions/evaluate/factorPow'
import {} from './functions/evaluate/evaluate'
import {} from './functions/evaluate/expresion'
import {} from './functions/mathString/divideStr'
import {} from './functions/mathString/evaluateFrac'
import {} from './functions/mathString/forStr'
import {} from './functions/mathString/mathString'
import {} from './functions/mathString/minusStr'
import {} from './functions/mathString/plusStr'
import {} from './functions/process/preProcess'
import {} from './functions/process/createHtml'
import {} from './functions/lang'
import {} from './functions/handleRotate'

import {enableScreens} from 'react-native-screens';

// Uncomment next line to see it working
enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
locaLang = RNLocalize.getLocales();
strOrigin=''
strltx = ''
strDevelopment = ''
StepsC = 0
toDecimalVal = 1
MoreDVal = 0
DegRad = 0
setStacksG=null
setPixelSG=null
stacksG = [{name: 'Steps'}]
pixelG = [{name: 'PixelScan'}]
stackLength=2
//setBandInsG=null
setBandNewG=null
stacksVars={}
nameStack='Steps'
stacksetGHtml={}
stackGTxtExp={}
stackevalGlobal={}
stackchangeRangeSelG={}
stacksfocusG={}
stacktextInput={}
stackIsModal = {}
navigationG = null
urisPixels = [];
boundsStep = null;
boundsStack = {}
bandChangeOut = false;
bandRotate = false;
stateRotated = 0;
stateRotated2 = 0;
rotateOut = false
isRotate = false
stackIsOpen={}
const getSaveData = async () => {
try{  
  let value = await AsyncStorage.getItem('@evalObject')
  stacksVars = value !== null ? JSON.parse(value) : {};
  console.log(`getSaveData: ${stacksVars} `)
  value = await AsyncStorage.getItem('@evalString');
  if (value !== null) {
    txtGExp = value
  }
  value = await AsyncStorage.getItem('@bbs');
  if (value !== null) {
    BBS = value === '1' ? true : false
    // value previously stored
    //BBS = value ? 1 : 0;
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@bsc');
  if (value !== null) {
    BSC = value === '1' ? true : false
    // value previously stored
    //BBS = value ? 1 : 0;
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@tDval');
  if (value !== null) {
    value = value === '1' ? true : false
    // value previously stored
    toDecimalVal = value ? 1 : 0;
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@mDval');
  if (value !== null) {
    value = value === '1' ? true : false
    // value previously stored
    MoreDVal = value ? 1 : 0;
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@toRad');
  if (value !== null) {
    value = value === '1' ? true : false
    // value previously stored
    DegRad = value ? 1 : 0;
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@fct');
  if (value !== null) {
    // value previously stored
    FCT = value === '1' ? true : false
    //setMDval(value);
  }
  value = await AsyncStorage.getItem('@urisPixels');
  if (value !== null) {
    // value previously stored
    
    //if(value==='{}'||value==='[]'){
      //console.log(`urisPixelsV0: ${value}`);
      //value=[]
    //}else{
      value = JSON.parse(value)
   // }
    urisPixels = value
    console.log(`urisPixelsV: ${value[0]}`);
    console.log(value);
    //setMDval(value);
  }

  if(boundsStep===null){
    /*value = await AsyncStorage.getItem('@boundsStep');
    if (value !== null) {
      value = JSON.parse(value);
      boundsStep = value;

    }else{*/
      const {width, height} = Dimensions.get('window');
      boundsStep={width: width, height:height}
    //}
  }
  stacksVars.init = 1
}catch(e){

}
}
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const App: () => React$Node = () => { 
  const [bandIns, setBandIns] = React.useState(null);
  const [html, setHtml] = React.useState(null);
  let [stacks, setStacks] = React.useState(null);
  const [pixelS, setPixelS] = React.useState(pixelG);
  const [bandNew, setBandNew] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({ window, screen });
  const navigationRef = React.useRef(null);
  setStacksG = setStacks
  setPixelSG = setPixelS
  //const window = useWindowDimensions();
  console.log(`AppWindow:`)
  console.log(window)
  //stacksG=stacks
  //setBandInsG = setBandIns
  setBandNewG = setBandNew
  const installFiles = () => {
    install().then(async (band) => {
        let value = await AsyncStorage.getItem('@stacksNames')
        value = value !== null ? JSON.parse(value) : stacksG;
        stacksG = value
        setBandIns(band)
        setStacks(value)
    
    }).catch((error) => {
      setBandIns(false)
      console.log('Error  ' + error);
    })//.finally(() => setStacks(stacksG));
  };

  const onChange = ({ window, screen }) => {
      console.log(`onChange: `)
      //console.log(window)
     // bandRotate = false
     // bandChange = true
      //stateRotated = 3
      console.log(`bandRotate_1: ${bandRotate}`)
     // boundsStep = {width: window.width, height: window.height}
      //setDimensions({ window, screen });
  };

  React.useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const stateStack = (s) => {
      /*if(bandChange){ 
        bandRotate = false;
        firstRotate = true;
       // stateRotated = 0
      }*/
     // bandRotate = false;
     
      console.log(`stateTack? ${rotateOut} name: ${s.routeNames[s.index]} lastName: ${nameStack}`)
    switch (s.routeNames[s.index]){
      case strToLang('newStack'):
      case strToLang('delStack'):
      case strToLang('configLabel'):
      case 'CamScan':
      case 'PixelScan':
        if(rotateOut){
          //bandRotate = true
        }else{
          //bandRotate = false
          //rotateOut = true
        }
      //rotateOut = false
       /*else{
        bandRotate = false;
      }*/
      
      //nameStack = s.routeNames[s.index]
        return;
      default:
        
        /*if(nameStack.includes("Step")&&nameStack!==s.routeNames[s.index]){
          if(bandRotate){
            bandRotate = false;
            stateRotated = 2;
          }
        }else if(!nameStack.includes("Step")){
          if(rotateOut){
            rotateOut=false
            bandRotate = true;
          }
        }*/

        nameStack = s.routeNames[s.index]
        txtGExp = stacksVars[nameStack].txtGExp
        if(boundsStack[nameStack]){
         // bandRotate = boundsStack[nameStack].width !== boundsStep.width
          if(boundsStack[nameStack].width !== boundsStep.width){
             stacksetGHtml[nameStack].reloadHtml()
          }
        }else{
          if(bandRotate){
           // bandRotate=false
          //  boundsStep={width: boundsStep.height, height: boundsStep.width}
          }
        }
        //stacksfocusG[nameStack].focusG()
        //startIndex = txtGExp !== undefined ? txtGExp.length : 0
        console.log(txtGExp)
        if (txtGExp === undefined) {

        /*if(rotateOut){
          rotateOut=false
          bandRotate = true;
        }else{
          bandRotate = false;
        }*/
          
          startIndex = 0
          endIndex = 0
        } else {
        /*else{
          bandRotate = false;
        }*/  
          startIndex = txtGExp.length
          endIndex = txtGExp.length
        }
        
        break;
    }
    
  }

  const stackSteps = (props) => {
    const {navigation} = props
    console.log(`stacksSteps: ${stacksVars[props.route.name]} `)
    console.log(`rotateOut: ${rotateOut}`)
    /*if(rotateOut){
      bandRotate=true
      rotateOut=false
    }else{*/
      if(!stackIsOpen[props.route.name]){
        firstRotate = true
        bandRotate=true
        stackIsOpen[props.route.name]={b: true}
      }else{
        bandRotate=false
      }
      
    //}
    //firstRotate = true
   // stateRotated = 0;
    //if (stateRotated === 0) {
      /*if(rotateOut){
       // rotateOut=false
        bandRotate = true;
      }else{
        bandRotate = false;
      }*/
      //stateRotated = 0;
      //bandChange = false;
     // firstRotate = true;
    //}
    /*if(!rotateOut){
      rotateOut=true
    } */     
    //bandRotate = false;
    if (stacksVars[props.route.name]===undefined){
      stacksVars[props.route.name]={txtGExp: txtGExp}
    }
    boundsStack[props.route.name]={width: boundsStep.width, height: boundsStep.height}
    navigationG = navigation
    return (
      <Stack.Navigator>
        <Stack.Screen name={props.route.name} component={Steps}
          options={{
            title: 'Steps',
            headerLeft: ()=>headerLeft(navigation),
            headerRight: ()=>headerRight(navigation),
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }} 
        
        />
      </Stack.Navigator>
    );
  }

  const stackPixel = (props) => {
    const {navigation} = props
    console.log(`stacksPixel: ${stacksVars} `)
    console.log(bandRotate)
    /*if (stacksVars[props.route.name]===undefined){
      stacksVars[props.route.name]={txtGExp: txtGExp}
    }*/

    return (
      <Stack.Navigator>
        <Stack.Screen name={props.route.name} component={PixelScan}
          options={{
            title: 'PixelScan',
            headerLeft: ()=>headerLeft(navigation),
            headerRight: ()=>headerRight(navigation),
            headerStyle: {
              backgroundColor: 'blueviolet',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }}
        
        />
      </Stack.Navigator>
    );
  }

  const newStack = (props) => {
    
    const {navigation} = props
    return (
      <Stack.Navigator>
        <Stack.Screen name={props.route.name} component={NewDelStack}
          options={{
            title: 'Steps',
            headerLeft: ()=>headerLeft(navigation),
            headerRight: ()=>headerRight(navigation),
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }}
        
        />
      </Stack.Navigator>
    );
  }

  const stackConfig = ({navigation}) => {
    //bandRotate = false;
    return (
      <Stack.Navigator >
        <Stack.Screen  name={strToLang('configLabel')} component={Config}
          options={{
            title: 'Config',
            headerLeft: ()=>headerLeft(navigation),
            headerRight: ()=>headerRight(navigation),
            headerStyle: {
              backgroundColor: 'blueviolet',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          
          }}
        />
      </Stack.Navigator>
    );
  }
  const onReady = () =>{
  const unsubscribe = navigationRef.current?.addListener('state', (e) => {
  // You can get the raw navigation state (partial state object of the root navigator)
  console.log(e.data.state);

  // Or get the full state object with `getRootState()`
  console.log(navigationRef.current.getCurrentRoute());
});
  }

  const stepsRender = () => {
    console.log(`nameStack: ${nameStack}`)
    if (bandNew) {
      new Promise((resolve, reject)=>{
        resolve(1)
      }).then(() => setBandNew(false))
      return <></>
    } else if (stacks === null){ 
      return <></>
    }else
      return (
        <NavigationContainer  ref={navigationRef} onStateChange={stateStack} >
          <Drawer.Navigator 
         initialRouteName={nameStack}>
          <Drawer.Screen
            name={strToLang('configLabel')} 
            component={stackConfig}
            options={{
              drawerIcon: config => <Icon
                size={23}
                type = 'font-awesome'
                name={Platform.OS === 'android' ? 'briefcase' : 'briefcase'}></Icon>
            }}
          />
          <Drawer.Screen name="CamScan" 
            component={stackCamScan}
            options={{
              drawerIcon: config => <Icon
                size={23}
                type = 'font-awesome'
                name={Platform.OS === 'android' ? 'camera' : 'camera'}></Icon>
            }}
          />
          {
            pixelS.map((stack, index) => 
              <Drawer.Screen key={index}  name={stack.name} 
                component={stackPixel}
                options={{
                  drawerIcon: config => <Icon
                    size={23}
                    type = 'font-awesome'
                    name={Platform.OS === 'android' ? 'photo' : 'photo'}></Icon>
                }}
              />
            )
          }
          {
            stacks.map((stack, index) => 
              <Drawer.Screen key={index}  name={stack.name} 
                component={stackSteps}
                options={{
                  drawerIcon: config => <Icon
                    size={23}
                    type = 'font-awesome'
                    name={Platform.OS === 'android' ? 'edit' : 'edit'}></Icon>
                }}
              />
            )
          }
          <Drawer.Screen name={strToLang('newStack')} 
            component={newStack}
            options={{
              drawerIcon: config => <Icon
                size={23}
                type = 'font-awesome'
                name={Platform.OS === 'android' ? 'plus' : 'plus'}></Icon>
            }}
          />
          <Drawer.Screen name={strToLang('delStack')} 
            component={newStack}
            options={{
              drawerIcon: config => <Icon
                size={23}
                type = 'font-awesome'
                name={Platform.OS === 'android' ? 'trash' : 'trash'}></Icon>
            }}
          /> 
          </Drawer.Navigator>
        </NavigationContainer>
      );
  }

  const stackCamScan = () => {
    //bandOpt = false;
    return (
      <Stack.Navigator mode="modal">
        <Stack.Screen name="CamScan" component={CamScan}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  if (!stacksVars.init) {
    getSaveData();
  } 
  if (bandIns === null) {
    if (html === null){ 
     //getSaveData();
      installFiles();
    }
  return (
    <>
      <View style={styles.body} > 
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </>)
  }
  if (bandIns === false) {
    
  return (
    <>
    <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body} > 
            <Text style={[styles.sectionTitle, {color: 'red'}]}>{strToLang('err00')}</Text> 
          </View>
        </ScrollView>
    </SafeAreaView>
    </>)
  }
  if (bandIns === true){
    
      return stepsRender()
    
  }     
};

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
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

export default App;
