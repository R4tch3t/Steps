import 'react-native-get-random-values';
import React from 'react';

import {
    WebView
} from 'react-native-webview';
export default (props) => {
    //const [html, setHtml] = React.useState('');
    const {html, difDimensions, styles, heightFix, stackName} = props
    //stacksetGHtml[stackName]={setGHtml: setHtml}
    return (
        <>
        <WebView
              
              //injectedJavaScript={'true'}
              //domStorageEnabled={true}
            //  ref={component =>  webRef = component}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              // originWhitelist={['*']}
              scalesPageToFit={true}
              
            
              /*onNavigationStateChange = {
                onNavigationStateChange.bind(this)
              }*/
              source={{html: html}}
              //automaticallyAdjustContentInsets={true}
              //scrollEnabled={true}
              style={[styles.webView,{width: '100%', height: difDimensions.height - heightFix}]}
             // style={[styles.webView,{width: difDimensions.width, height: difDimensions.height - heightFix}]}
            />
        </>
    )
}