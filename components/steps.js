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
import onChangeText from '../functions/onChangeText.js'
const {
    width,
    height
} = Dimensions.get('window');
import loading from '../functions/loading.js'

export default () => {
    const [html, setHtml] = React.useState('');
    const [hWeb, setHWeb] = React.useState(100);
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
    const onNavigationStateChange = (navState) => {
      /*this.setState({
        height: navState.title
      });*/
      
      if(Number(navState.title)){
        console.log(navState.title)
        setHWeb(Number(navState.title))
      }
    }
    //onChangeText(html, setHtml)
    return(
     <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          
          onLayout={()=>{if(html===""){onChangeText('', setHtml)}}}>
          {/*<Header />*/}
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => {
                  
                  evaluating(text)

                }}
                placeholder={strToLang('typeAnPH')}
                //defaultValue={'Digita una expresion'}
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
              style={styles.webView}
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
      webView: {
          width: width,
          height: height - 140,
          marginTop: 10
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
