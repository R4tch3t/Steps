import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    TextInput,
    Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ModalLeft from "./modalLeft"
import ModalRight from "./modalRight"
import { captureScreen } from "react-native-view-shot";

const IsIOS = Platform.OS === 'ios';
startIndex = 0;
endIndex = 0;

export default (props) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [styleFun, setStyleFun] = React.useState([styles.styleFun, styles.styleFunAct2])
    //const [styleFun2, setStyleFun2] = React.useState(styles.styleFun2)
    const [styleTextFun, setStyleTextFun] = React.useState([{color: 'black', fontWeight: "bold"}, 
                                                            {color: 'white', fontWeight: "bold"}])
    //const [styleTextFun2, setStyleTextFun2] = React.useState({})
    const [styleKey, setStyleKey] = React.useState(styles.styleKey)
    const [styleTextKey, setStyleTextKey] = React.useState(styles.textStyle)
    const [isModal, setIsModal] = React.useState(false)
    const [isPixel, setIsPixel] = React.useState(false)
    const [isDataLoad, setIsDataLoad] = React.useState(false)
    const [txtExp, setTxtExp] = React.useState('');
    const stackName = props.route.name

    stackGTxtExp[stackName]={setGTxtExp: setTxtExp}

    const getSaveData = async () => {
        try{
            let value = await AsyncStorage.getItem('@isModal');
            stackIsModal = value !== null ? JSON.parse(value) : {};
            if (stackIsModal[stackName] !== undefined) {
                if (stackIsModal[stackName].isModal === 1) {
                    //const newStyle = styleFun
                    styleFun[0] = styles.styleFunAct
                    setStyleFun(styleFun)
                    setIsModal(true)
                    //setModalVisible(true)
                    styleTextFun[0] = styles.textStyle
                    setStyleTextFun(styleTextFun)
                    stacktextInput[stackName]._textInput.setNativeProps({
                        showSoftInputOnFocus: false
                    })
                }else{
                    styleTextFun[0] = {color: 'black', fontWeight: "bold"}
                    setStyleTextFun(styleTextFun)
                }
            }
        }catch(e){

        }
    }

    const setObjSave = async (item, val) => {
        try {
            const jsonValue = JSON.stringify(val)
            await AsyncStorage.setItem(item, jsonValue);
        } catch (e) {

        }
    }
    
    if (!isDataLoad) {
        setIsDataLoad(true)
        getSaveData()  
    }

    const showMathFunctions=()=>{
        new Promise((resolve, reject)=>{
            if (!isModal) {
                //stacksfocusG[stackName].focusG()
                styleFun[0] = styles.styleFunAct
                setStyleFun(styleFun)
                //setStyleFun(styles.styleFunAct)
                setIsModal(true)
                setModalVisible(true)
                styleTextFun[0] = styles.textStyle
                //setStyleTextFun(styles.textStyle)
                setStyleTextFun(styleTextFun)
                stackIsModal[stackName]={isModal: 1}
                setObjSave('@isModal', stackIsModal)
            // setSaveData('@isModal', '1')
            }else{
                styleFun[0] = styles.styleFun
                setStyleFun(styleFun)
                //setStyleFun(styles.styleFun)
                setIsModal(false)
                setModalVisible(false)
                styleTextFun[0] = {color: 'black', fontWeight: "bold"};
                setStyleTextFun(styleTextFun)
                stackIsModal[stackName]={isModal: 0}
                setObjSave('@isModal', stackIsModal)
                //setSaveData('@isModal', '0')
            }
            resolve(1)
        }).then(() => _focusText())
        
        
    }

    const showPixelScan = () => {
        /*if (!isPixel) {
            //stacksfocusG[stackName].focusG()
            styleFun[1] = styles.styleFunAct
            setStyleFun(styleFun)
            //setStyleFun(styles.styleFunAct)
            setIsPixel(true)
            //setModalVisible(true)
            styleTextFun[1] = styles.textStyle
            //setStyleTextFun(styles.textStyle)
            setStyleTextFun(styleTextFun)
            
            //setObjSave('@isModal', stackIsModal)
            // setSaveData('@isModal', '1')
        } else {
            styleFun[1] = styles.styleFun
            setStyleFun(styleFun)
            //setStyleFun(styles.styleFun)
            setIsPixel(false)
            //setModalVisible(false)
            styleTextFun[1] = {
                color: "black"
            }
            setStyleTextFun(styleTextFun)
            //setSaveData('@isModal', '0')
        }*/
        captureScreen({
            format: "jpg",
            quality: 1
        }).then(
            uri => {
                console.log("Image saved to", uri)
                nameStack = "PixelScan"
                imageG.uri = {uri};
                //setBandNewG(true)
                /*if (pixelG.length===0){
                    pixelG=[{name: "PixelScan"}]
                    //setPixelSG(pixelG)
                    //new Promise((resolve, reject) => {
                    setBandNewG(true)
                    setPixelSG(pixelG)
                }else{*/
                    //setBandNewG(true)
                    navigationG.navigate("PixelScan")
                    if (setUriPixel !== null) {
                        /*urisPixels.push(imageG);
                        setUrisPixels(urisPixels);*/
                        setUriPixel(imageG);
                    }
                    cropLast();
                    
                //}
                  //  resolve(1)
               // })
            },
            error => console.error("Oops, snapshot failed", error)
        );
    }

    const delStack = async () => {
        await (new Promise((resolve, reject) => {
            let auxStack = [{name: 'Steps'}]
            const auxVars = JSON.parse(JSON.stringify(stacksVars))
            nameStack = 'Steps'
            let count = 1
            let newCount = 2
            let delCount = 0
            let bandChange = false
                
            if (stackName==='Steps'){
                count=2
                if (stacksG.length>1){
                    stacksVars[`Steps`]={txtGExp: stacksVars[`Steps 2`].txtGExp}
                }
                bandChange = true
            }//else{
                
            while (count < stacksG.length){
                if (stacksG[count].name !== stackName){
                    auxStack.push({name: `Steps ${newCount}`})
                    newCount++
                    if(bandChange){
                        stacksVars[`Steps ${newCount-1}`]={txtGExp: stacksVars[`Steps ${newCount}`].txtGExp}
                    }
                    //nameStack = stacksG[count].name
                }else{
                    if (count === stacksG.length - 1){
                        delCount = count - 1
                        if (stacksG.length>2){
                            stacksVars[`Steps ${count}`]={txtGExp: auxVars[`Steps ${count}`].txtGExp}                    
                        }
                    }else{
                        delCount = count
                    }
                    bandChange=true
                }
                count++
            }

            nameStack = auxStack[delCount].name
            stacksG = auxStack

            setObjSave("@evalObject", stacksVars)
            setObjSave("@stacksNames", stacksG)

            resolve(1)
        }).then(() => new Promise((resolve, reject) => {
            setBandNewG(true)
            setStacksG(stacksG)
            resolve(1)
        })))
        
    }

    const getToolbarButtons = () => {
        return [{
                text: 'MathString',
                testID: 'show1',
                style: styleFun[0],
                styleText: styleTextFun[0],
                onPress: () => showMathFunctions(),
            },
            {
                text: 'PixelScan',
                testID: 'showP',
                style: [styleFun[1], {
                    marginLeft: 15
                }],
                styleText: styleTextFun[1],
                onPress: () => showPixelScan(),
            },
            {
                text: 'Gboard',
                testID: 'reset',
                style: [styleKey, {backgroundColor: "green"}],
                styleText: styleTextKey,
                onPress: () => Linking.openURL("market://details?id=com.google.android.inputmethod.latin"),
            },
            
        ];
    }
    /*replaceRange(s, start, end, substitute) {
        return s.substring(0, start) + substitute + s.substring(end);
    }*/
    _onKeyPress=(e)=>{
        switch (e.nativeEvent.key){
            case 'Enter':
                heightFix+=20
            break;
            case 'Backspace':
                startIndex--
                endIndex--
                this.changeRangeSel()
            break;
            default:
                if(startIndex===0&&endIndex===0){
                    startIndex++
                    endIndex++
                 //   _textInput.shouldApplyNativeSettings()
                }
                changeRangeSel()
            break;
        }
    }
    
    changeRangeSel = () => {
        try {
                stacktextInput[stackName]._textInput.setNativeProps({
                    selection:{
                        start: startIndex,
                        end: endIndex
                    }
                })

            } catch (e) {
        }
    }
    stackchangeRangeSelG[stackName]={changeRangeSelG: changeRangeSel}

    _focusText = () => {
        stacktextInput[stackName]._textInput.blur()
        stacktextInput[stackName]._textInput.setNativeProps({
            showSoftInputOnFocus: !modalVisible
        })
        //_textInput.blur()
        setTimeout(stacktextInput[stackName]._textInput.focus, 250)
    }

    _focusTxt = () => {
        
        stacktextInput[stackName]._textInput.focus()
    }
    stacksfocusG[stackName]={focusG: _focusTxt}
    
    _onSelectionChange=(e)=>{
        startIndex = e.nativeEvent.selection.start
        endIndex = e.nativeEvent.selection.end
    }

        return(<View>
                
                    <TextInput
                        style={props.style}
                        onTextInput = {
                            (e) => {
                                bandRotate = false;
                                let rangeStart = e.nativeEvent.range.start;
                                let rangeEnd = e.nativeEvent.range.end;
                                let txt = e.nativeEvent.text;
                                if(txt===''){
                                    startIndex = rangeStart;
                                    endIndex = rangeStart;
                                }else{
                                    if (txt.length>1) {
                                        rangeEnd = txt.length - 1
                                        rangeStart = rangeEnd
                                    } else if (rangeStart < rangeEnd) {
                                        rangeEnd = rangeStart
                                    }
                                    startIndex = rangeStart + 1;
                                    endIndex = rangeEnd + 1;
                                }
                                changeRangeSel()
                            }
                        }
                        onBlur = {
                            () => {
                                bandRotate = false;
                                setModalVisible(false)
                            }
                        }
                        onFocus = {
                            () => {
                                bandRotate = false;
                               // txtGExp = stacksVars[nameStack].txtGExp === undefined ? '' : stacksVars[nameStack].txtGExp
                                if (isModal) {
                                    setModalVisible(true)
                                }else{
                                    stacktextInput[stackName]._textInput.setNativeProps({
                                        showSoftInputOnFocus: true
                                    })
                                }
                            }
                        }

                        onChangeText={props.onChangeText}
                        onSelectionChange={_onSelectionChange}
                        
                        placeholder={props.placeholder}
                        multiline={true}
                        ref={component => stacktextInput[stackName]={_textInput: component} }
                        defaultValue={txtExp}
                    />
                
                <View style={{flexDirection: 'row'}}>
                    {
                    getToolbarButtons().map((button, index) =>
                        <TouchableOpacity
                            onPress={button.onPress}
                            style={button.style}
                            key={index}
                            testID={button.testID}
                        >
                            <Text style={button.styleText}>{button.text}</Text>

                        </TouchableOpacity>)
                    }
                </View>
                   <ModalLeft modalVisible={modalVisible} ></ModalLeft>    
                   <ModalRight modalVisible={modalVisible} ></ModalRight>    
                 
            </View>)
        
    }
    

const styles = StyleSheet.create({
    
    styleFun: {
        padding: 3,
        borderRadius: 30,
        //elevation: 2,
    },
    styleFun2: {
        padding: 3,
        borderRadius: 30,
        marginLeft: 15
        //elevation: 2,
    },
    styleKey: {
        marginLeft: 15,
        padding: 3,
        borderRadius: 30,
        elevation: 2,
    },
    styleFunAct: {
        padding: 3,
        borderRadius: 30,
        elevation: 2,
        backgroundColor: "#2196F3"
    },
    styleFunAct2: {
        padding: 3,
        borderRadius: 30,
        elevation: 2,
        backgroundColor: "blueviolet"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        ...StyleSheet.absoluteFill,
        width: 100,
        height: 100,
        margin: 120,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    box2: {
        ...StyleSheet.absoluteFill,
        width: 100,
        height: 100,
        top: 250,
        zIndex: 999999,
        backgroundColor: 'blue'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})