import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    BackHandler,
    StatusBar
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CheckBox,
  Divider,
  Text
} from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import onChangeText from '../functions/onChangeText.js'
const {
  width,
  height
} = Dimensions.get('window');
export default ({navigation}) => {
  const [txt, setTxt] = React.useState('')
  const [bounds, setBounds] = React.useState({origin: {x: 0, y: 0 }, size: {width: 0, height: 0}})
  const toSteps = () => {
    const txtS = txt
    navigation.navigate('Steps');
    if(txtS!==''){
      setGTxtExp(txtS)
      onChangeText(txtS, setGHtml)
    }
  }
  const onBackPress = () => {
    //toSteps()
    navigation.navigate('Steps');
    return true
  };
  useFocusEffect(
    React.useCallback(() => {     
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    }//, [isSelectionModeEnabled, disableSelectionMode]
    )
  );
    return (
      <>
        <StatusBar backgroundColor="#f4511e" barStyle="default" />
        <View style={styles.body}>
          <RNCamera
            /*ref={ref => {
              this.camera = ref;
            }}*/
            //autoFocus={RNCamera.Constants.AutoFocus.off}
            //focusDepth={1.0}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            ratio="16:9"
            defaultVideoQuality={RNCamera.Constants.VideoQuality["288p"]}
            focusDepth={0.1}
            whiteBalance='auto'
            //forceUpOrientation={RNCamera.Constants.Orientation.landscapeLeft}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onTextRecognized={({textBlocks})=>{
              //console.log(textBlocks)
              if(textBlocks.length>0){
                //console.log(textBlocks[0].bounds.origin)
                //if (textBlocks[0].bounds.origin.y<(middleH+100)&&textBlocks[0].bounds.origin.y>(middleH-100)){
                  //textBlocks[0].bounds
                  setBounds(textBlocks[0].bounds)
                  setTxt(textBlocks[0].value)
                  //onChangeText(textBlocks[0].value, setGHtml)
               // }
              }else{
                setBounds({origin: {x: 0, y: 0 }, size: {width: 0, height: 0}})
              }
            }}
            /*onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}*/
          />
          <View style={{ position: 'absolute', borderWidth: 1, borderColor: 'red', 
                        left: bounds.origin.x, top: bounds.origin.y, 
                        height: bounds.size.height, width: bounds.size.width 
                      }} 
          />
          <View style={styles.viewResults} >
            <Text style={styles.txtResult}>{txt}</Text>
            <Button
              onPress={toSteps}
              title={strToLang('camBtn00')}
            />
          </View>
        </View>
      </>
    );

}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewResults: {
    position: 'absolute',
    width: '100%',
    bottom: 1
  },
  txtResult: {
    fontSize: 30,
    textAlign: 'center',
    color: 'red'  
  },
  preview: {
    flex: 1,
    display: 'flex',
    left: 0,
    top: 10,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    height: '100%',
    width: '100%',
  },
});