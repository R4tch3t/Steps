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
  TextInput,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import onChangeText from './functions/onChangeText.js'
//import loading from './html/Loading.html'
import install, {label} from './functions/install.js'
import loading from './functions/loading.js'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Steps from './components/steps.js'
import Config from './components/config.js'
//import {} from './functions/clean/clean'
import {} from './functions/evaluate/expresion'
import {} from './functions/lang'
const {width, height} = Dimensions.get('window');
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
strltx = ''
strDevelopment = 'I love my dog! Dogs are great'
StepsC = 0
toDecimalVal = 0
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

  const stackSteps = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Steps" component={Steps}
          options={{
            title: 'Steps',
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

  const stackConfig = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Config" component={Config}
          options={{
            title: 'Config',
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

  if (bandIns === null) {
    if (html === null){
      installFiles();
    }
  return (
    <>
    <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body} > 
            <Text style={[styles.sectionTitle,{color: 'green'}]}>{label}</Text> 
          </View>
        </ScrollView>
    </SafeAreaView>
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
            <Text style={[styles.sectionTitle, {color: 'red'}]}>ERROR AL INSTALAR ARCHIVOS...</Text> 
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
         <Drawer.Screen name="Config" 
          component={stackConfig}
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
