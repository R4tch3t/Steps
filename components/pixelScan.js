import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  NativeModules
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
    utils
} from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import ViewShot from 'react-native-view-shot';
import ImagePicker from 'react-native-image-crop-picker';
//import StaticServer from 'react-native-static-server';
setUriPixel=null

cropLast = null
const {width, height} = Dimensions.get('window');
imageG = {
  uri: null,
  width: width,
  height: height,
  mime: 'jpg',
};
//processDocument=null
export default () => {
    //const [uri, setUri] = React.useState(uriPixel);
    const [image, setIm] = React.useState(imageG);
    
    setUriPixel = setIm;
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
  const powNumbers = ['⁰','¹','²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  const cleanBlock = text0 => {
    //let text0 = processed.blocks[0].text;
    text0 = text0.split(text0[text0.length - 1]).join('');
    text0 = text0.split('–').join('-');
    text0 = text0.split('²').join('^2');
    //processed.blocks[0].text = processed.blocks[0].text.split('–').join('-');
    let auxChar = text0.match(/[aA-zZ][0-9]/gi);
    let replace = null;
    let c = 0;
    if (auxChar) {
      while (c < auxChar.length) {
        const txtr = auxChar[c][0] + '' + auxChar[c][1];
        replace = auxChar[c][0] + '^' + auxChar[c][1];
        text0 = text0.split(txtr).join(replace);
        c++;
      }
    }
    return text0;
  };

  const processDocument=async (localPath) => {
    //const processed = await vision().textRecognizerProcessImage(localPath);
    //const processed = await vision().imageLabelerProcessImage(localPath);
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(localPath);
    //const processed = await vision().cloudTextRecognizerProcessImage(localPath);

    console.log('Found text in document: ', processed.text);
    
    processed.blocks[0].text = cleanBlock(processed.blocks[0].text);
    if (processed.blocks.length===1){
      processed.text = cleanBlock(processed.text);
      
      text0 = processed.text;
      text0 = text0.split(text0[text0.length - 1]).join(''); 
      text0 = text0.split('–').join('-');
      let auxChar = text0.match(/[aA-zZ][0-9]/gi);
      //let replace = auxChar[0] + '^' + auxChar[1];
      c = 0;
      if(auxChar){
        while (c < auxChar.length) {
          const txtr = auxChar[c][0] + '' + auxChar[c][1];
          replace = auxChar[c][0] + '^' + auxChar[c][1];
          text0 = text0.split(txtr).join(replace);
          c++;
        }
      }
      addStack(true, text0); 
    }else{
      addStack(true, processed.blocks[0].text); 
    }
    processed.blocks.forEach(block => {
      console.log('Found block with text: ', block.text);
      console.log('Confidence in block: ', block.confidence);
      console.log('Languages found in block: ', block.recognizedLanguages);
    });
  }

const processDocument2 = async fileName => {
  const sendUri = 'https://api.mathpix.com/v3/text';
  const bodyJSON = {
    src: fileName,
    formats: ['text', 'data', 'html'],
    data_options: {
      include_asciimath: true,
      include_latex: true,
    },
  };
  const response = await fetch(sendUri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_id: 'bebetovictor_gmail_com_624c02',
      app_key: '95cbf36020ce3e06f9a9',
    },
    body: JSON.stringify(bodyJSON),
  });

  const responseJson = await response.json().then(r => {
    console.log("responseD: ")
    console.log(r);
    addStack(true, r.data[0].value);
  });
  /*
try{
  var httpServer = require('react-native-http-server');
  var options = {
    port: 1234, // note that 80 is reserved on Android - an exception will be thrown
  };

  // initalise the server (now accessible via localhost:1234)
  httpServer.create(options, async (request, send) => {
    // interpret the url
    let url = request.url.split('/');
    let ext = url[1];
    let data = JSON.stringify({data: 'hello world!', extension: ext});

    //Build our response object (you can specify status, mime_type (type), data, and response headers)
    let res = {};
    res.status = 'OK';
    res.type = 'application/json';
    res.data = data;
    res.headers = {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':
        'Authorization, Content-Type, Accept, Origin, User-Agent, Cache-Control, Keep-Alive, If-Modified-Since, If-None-Match',
      'Access-Control-Allow-Methods': 'GET, HEAD',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers':
        'Content-Type, Cache-Control, ETag, Expires, Last-Modified, Content-Length',
      'Access-Control-Max-Age': '3000',
      'Cache-Control': 'max-age=300',
      Connection: 'keep-alive',
      'Content-Encoding': 'gzip',
      'Content-Length': data.length.toString(),
      Date: new Date().toUTCString(),
      'Last-Modified': new Date().toUTCString(),
      Server: 'Fastly',
      Vary: 'Accept-Encoding',
    };
    
    
    send(res);
  });

  /*
        let server = new StaticServer(8080);

        // Start the server
        server.start().then(url => {
          console.log('Serving at URL', url);
        });

        // Stop the server
        server.stop();

        // Check if native server running
        const isRunning = await server.isRunning();
    }catch(e){
      console.log(e);
    }*/
        // isRunning - true/false
        /*
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Read a local image as a text document
  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`Full text: ${fullTextAnnotation.text}`);
  fullTextAnnotation.pages.forEach(page => {
    page.blocks.forEach(block => {
      console.log(`Block confidence: ${block.confidence}`);
      block.paragraphs.forEach(paragraph => {
        console.log(`Paragraph confidence: ${paragraph.confidence}`);
        paragraph.words.forEach(word => {
          const wordText = word.symbols.map(s => s.text).join('');
          console.log(`Word text: ${wordText}`);
          console.log(`Word confidence: ${word.confidence}`);
          word.symbols.forEach(symbol => {
            console.log(`Symbol text: ${symbol.text}`);
            console.log(`Symbol confidence: ${symbol.confidence}`);
          });
        });
      });
    });
  });
  */
      };;

  const pickSingle=(cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
      forceJpg: true,
      freeStyleCropEnabled: true
    })
      .then((image) => {
        console.log('received image', image);
        setIm({
          uri: {uri: image.path},
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        /*this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });*/
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  cropLast = () => {
    console.log('???')
    if (!image.uri) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image'
      );
    }
    
    ImagePicker.openCropper({
      path: image.uri.uri,
      //width: 1800,
      //height: 400,
      //compressImageMaxWidth: 1000,
      //compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      freeStyleCropEnabled: true,
      includeExif: true,
      enableRotationGesture: false,
      includeBase64: true
     // avoidEmptySpaceAroundImage: false,
      //showCropGuidelines: false
    })
      .then(image => {
        //console.log('received cropped image', image);
        console.log(image.path.split('file://').join(''));
        //processDocument(image.path);
        image.data = `data:image/jpeg;base64,${image.data}`;
        processDocument2(image.data);
        /*NativeModules.Bitmap.getPixels(image.path.split('file://').join(''))
          .then(image => {
            console.log(image.path);
            console.log(image.height);
            console.log(image.hasAlpha);

            for (let x = 0; x < image.width; x++) {
              for (let y = 0; y < image.height; y++) {
                const offset = image.width * y + x;
                const pixel = image.pixels[offset];
              }
            }
            processDocument(image.path);
          })
          .catch(err => {
            console.error(err);
          });*/

        setIm({
          uri: {uri: image.path},
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  return (
    <>
      <StatusBar backgroundColor="green" barStyle="default" />
      <SafeAreaView>
        <View View style={styles.preview}>
          <Image
            fadeDuration={0}
            source={image.uri}
            style={{height: image.height, width: image.width}}
          />
        </View>
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
    preview: {
        flex: 1,
        display: 'flex',
        left: 0,
        alignContent: 'stretch',
        alignItems: 'stretch',
        width: '100%',
        height: '100%'
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
    camera: {
        //flex: 1,
        //display: 'flex',
        height: height,
        width: width,
    },
});