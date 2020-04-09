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
import onChangeText from '../functions/onChangeText.js'
const {
    width,
    height
} = Dimensions.get('window');
import loading from '../functions/loading.js'
export default () => {
    const [html, setHtml] = React.useState('DIGITA UNA EXPRESIÓN...');
    const evaluating = text => {
        new Promise((resolve, reject) => {
            setHtml(loading())
            resolve(1)
        }).then(() => {
            new Promise((resolve, reject) => {
                onChangeText(text, setHtml)
                resolve(1)
            })

        })
    };
    return(
     <>
     
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/*<Header />*/}
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => {
                  
                  evaluating(text)

                  }}
                placeholder={'Digita una expresion'}
                //defaultValue={'Digita una expresion'}
              />

              {/*<Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>*/}
            </View>
            <WebView
              //injectedJavaScript={'true'}
              domStorageEnabled={true}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              // originWhitelist={['*']}
              source={{html: html}}
              //source={{html: require('./html/Loading.html')}}
              //source={{uri: loading()}} 
              //automaticallyAdjustContentInsets={true}
              //scrollEnabled={true}
              style={{
                flex: 1,
                display: 'flex',
                width: width,
                height: height,
              }}
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
