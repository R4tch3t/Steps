import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
    utils
} from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import ViewShot from 'react-native-view-shot';
setUriPixel=null
export default () => {
    const [uri, setUri] = React.useState(null)
    setUriPixel=setUri
    /*const [uri, setUri] = React.useState({uri: "file:///data/user/0/com.adonaysoft.steps/cache/images.jpeg"})
    console.log('hi?')
    const onCapture = uri => {
      console.log('do something with ', uri);
      setUri({uri})
    };
    //file:///data/user/0/com.adonaysoft.steps/cache/
    //file:///data/data/com.adonaysoft.steps/cache/
    return (
        <>
            <ViewShot
            style={{width: 300, height: 300}}
            onCapture={onCapture}
            options={{format: 'jpg', quality: 0.9}}
            captureMode="mount">
                <Text>...Something to rasterize...</Text>
            </ViewShot>
            <Image style={{width: 600, height: 600}} source={uri} />
            
        </>    
    );*/
   // const [source, setSource] = useState(null);
  //const onCapture = useCallback(uri => setSource({ uri }), []);
 /* return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#ccc',
      }}
    >
      <ViewShot onCapture={onCapture} captureMode="mount" style={{ position: 'absolute', left:10, top: -40, width: 100, height: 100 }}>
        <View
          style={{
            borderRadius: 50,
            padding: 10,
            width: 100,
            height: 100,
           // backgroundColor: 'transparent'
            backgroundColor: 'cyan',
            borderWidth: 2,
            borderColor: 'blue',
          }}
        />
      </ViewShot>
      <View
        style={{
          backgroundColor: '#f00',
          width: 150,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image fadeDuration={0} source={source} style={{ width: 100, height: 100 }} />
      </View>
    </View>
  );*/
  return(
     <>
      <StatusBar backgroundColor="#f4511e" barStyle="default" />
      <SafeAreaView>
        <ScrollView>
          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Image fadeDuration={0} source={uri} style={{ width: 500, height: 500 }} />

            </View>
            
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