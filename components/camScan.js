import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    Button,
    StatusBar,
    Animated
  //  BackHandler,
} from 'react-native';
import {
  Text,
  Icon
} from 'react-native-elements'
import {RNCamera} from 'react-native-camera';
import onChangeText from '../functions/onChangeText.js'
bandOpt = false;
export default ({navigation}) => {
  const [txt, setTxt] = React.useState('');
  const [bounds, setBounds] = React.useState({origin: {x: 0, y: 0 }, size: {width: 0, height: 0}});
  const pan = useRef(new Animated.ValueXY()).current;
  const camRef = useRef();
  //const [styleOpt, setStyleOpt] = React.useState([styles.modalView,{opacity: 0}]);
  const fadeAnim = useRef(new Animated.Value(0)).current
  //let bandOpt = false;
  const toSteps = () => {
    const txtS = txt
    navigation.navigate(nameStack);
    if(txtS!==''){
      //setGTxtExp(txtS)
      stackGTxtExp[nameStack].setGTxtExp(txtS)
      onChangeText(txtS, stacksetGHtml[nameStack].setGHtml)
    }
  }
  
  const takePhoto = async () => {
    if (camRef.current) {
      const options = {
        quality: 0.8,
        base64: false
      };
      const data = await camRef.current.takePictureAsync(options);
      console.log(data.uri);
      const uri = data.uri
      imageG.uri = {uri};
      navigationG.navigate("PixelScan");
      if (setUriPixel !== null) {
        setUriPixel(imageG);
      }
      cropLast();
    }
  };

  const toggleOptions = () => {
    let toValue = 1;
    let toY = 20;
    console.log(bandOpt);
    if (bandOpt) {
      toValue=0;
      toY=7;
    }
    bandOpt = !bandOpt
    Animated.timing(
      fadeAnim, {
        toValue: toValue,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();

    Animated.spring(pan, {
      toValue: {
        x: 0,
        y: toY,
      },
      useNativeDriver: true,
    }).start();
    
  }


    return (
      <>
        <StatusBar backgroundColor="green" barStyle="default" />
        <View style={styles.body}>
          <RNCamera
            ref={camRef}
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
               // }
              }else{
                setBounds({origin: {x: 0, y: 0 }, size: {width: 0, height: 0}})
              }
            }}
            /*onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}*/
          />
          <View style={{ position: 'absolute', borderWidth: 1, borderColor: 'red', borderRadius: 5, 
                        left: bounds.origin.x, top: bounds.origin.y, 
                        height: bounds.size.height, width: bounds.size.width 
                      }} 
          />
          <View style={styles.props} >
            <Icon
            name = 'bars'
            type = 'font-awesome'
            color = 'white'
            onPress = {
                toggleOptions
            } />
          </View>
          <Animated.View
            style={[ styles.modalView, {transform: [{ translateX: pan.x }, { translateY: pan.y }], opacity: fadeAnim} ]}
          >
            <Icon
            name = 'edit'
            type = 'font-awesome'
            color = 'white'
            onPress = {toSteps}
            />
            <Icon
            name = 'file-photo-o'
            type = 'font-awesome'
            color = 'white'
            onPress = {takePhoto}
            />
          </Animated.View>
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
    top: 0,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    height: '100%',
    width: '100%',
  },
  modalView: {
    // ...StyleSheet.absoluteFill,
    //  width: 100,
    //height: 100,
    position: 'absolute',
    top: 50,
    right: 22,
    zIndex: 998
  },
  props:{
     position: 'absolute',
      width: 50,
      height: 50,
      top: 10,
      right: 10,
      opacity: 0.5,
      borderRadius: 50,
      borderColor: 'white',
      borderWidth: 3,
      backgroundColor: 'black',
      bottom: 1,
      textAlignVertical: 'center',
      paddingTop: 8
  }
});