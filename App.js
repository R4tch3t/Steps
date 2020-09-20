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

import {enableScreens} from 'react-native-screens';

// Uncomment next line to see it working
enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
locaLang = RNLocalize.getLocales()
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
  stacksVars.init = 1
}catch(e){

}
}

const App: () => React$Node = () => { 
  const [bandIns, setBandIns] = React.useState(null);
  const [html, setHtml] = React.useState(null);
  let [stacks, setStacks] = React.useState(null);
  const [pixelS, setPixelS] = React.useState(pixelG);
  const [bandNew, setBandNew] = React.useState(false)
  setStacksG = setStacks
  setPixelSG = setPixelS
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
  const stateStack = (s) => {
    switch (s.routeNames[s.index]){
      case strToLang('newStack'):
      case strToLang('delStack'):
      case strToLang('configLabel'):
      case 'CamScan':
      case 'PixelScan':
        return;
      default:
        nameStack = s.routeNames[s.index]
        txtGExp = stacksVars[nameStack].txtGExp
        //stacksfocusG[nameStack].focusG()
        //startIndex = txtGExp !== undefined ? txtGExp.length : 0
        if (txtGExp === undefined) {
          startIndex = 0
          endIndex = 0
        } else {
          startIndex = txtGExp.length
          endIndex = txtGExp.length
        }
        break;
    }
    
  }

  const stackSteps = (props) => {
    const {navigation} = props
    console.log(`stacksSteps: ${stacksVars} `)
    console.log(stacksVars)
    if (stacksVars[props.route.name]===undefined){
      stacksVars[props.route.name]={txtGExp: txtGExp}
    }
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
    console.log(`stacksSteps: ${stacksVars} `)
    console.log(stacksVars)
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
    return (
      <Stack.Navigator>
        <Stack.Screen name={strToLang('configLabel')} component={Config}
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
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    );
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
        <NavigationContainer onStateChange={stateStack} >
          <Drawer.Navigator initialRouteName={nameStack}>
          <Drawer.Screen name={strToLang('configLabel')} 
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
    bandOpt = false;
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
