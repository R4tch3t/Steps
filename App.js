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
} from 'react-native';
//import loading from './html/Loading.html'
import install from './functions/install.js'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import headerLeft from './components/headerLeft'
import Steps from './components/steps.js'
import Config from './components/config.js'
import CamScan from './components/camScan.js'
import * as RNLocalize from 'react-native-localize';

import {} from './functions/animation/animation'
import {} from './functions/clean/clean'
import {} from './functions/clean/cleanstrD'
import {} from './functions/clean/stepLatex'
import {} from './functions/clean/stepsFrac'
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

const App: () => React$Node = () => { 
  const [bandIns, setBandIns] = React.useState(null);
  const [html, setHtml] = React.useState(null);
  const installFiles = () => {
    install().then((band) => {
      setBandIns(band)
    }).catch((error) => {
      setBandIns(false)
      console.log('Error  ' + error);
    });
  };

  /*const effectSteps = ({navigation}) => {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => ( 
        <Button onPress = {
            () => console.log('clickR')
          }
          title = "Update count" />
        ),
      });
    }, [navigation, setCount]);
  } */

  const stackSteps = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Steps" component={Steps}
          options={{
            title: 'Steps',
            headerLeft: ()=>headerLeft(navigation),
            headerStyle: {
              backgroundColor: '#f4511e',
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
            title: strToLang('configLabel'),
            headerLeft: ()=>headerLeft(navigation),
            headerStyle: {
              backgroundColor: '#f4511e',
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

  const stackCamScan = () => {
    return (
      <Stack.Navigator mode="modal">
        <Stack.Screen name="CamScan" component={CamScan}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  if (bandIns === null) {
    if (html === null){
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
  if (bandIns === true)
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Steps">
          <Drawer.Screen name="Steps" 
          component={stackSteps}
         />
         <Drawer.Screen name={strToLang('configLabel')} 
          component={stackConfig}
         />
         <Drawer.Screen name="CamScan" 
          component={stackCamScan}
         />
        </Drawer.Navigator>
      </NavigationContainer>
    );

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
