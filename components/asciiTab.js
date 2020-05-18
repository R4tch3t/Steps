import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    PixelRatio,
    Platform,
    TextInput,
    Keyboard,
    Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import './mathKeyboard';
import ModalLeft from "./modalLeft"
import ModalRight from "./modalRight"

const IsIOS = Platform.OS === 'ios';
startIndex = 0;
endIndex = 0;
changeRangeSelG = null
focusG = null
isDataLoad = false

export default (props) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [styleFun, setStyleFun] = React.useState(styles.styleFun)
    const [styleTextFun, setStyleTextFun] = React.useState({})
    const [styleKey, setStyleKey] = React.useState(styles.styleKey)
    const [styleTextKey, setStyleTextKey] = React.useState(styles.textStyle)
    const [stateStart, setStateStart] = React.useState(0)
    const [stateEnd, setStateEnd] = React.useState(0)
    const [isModal, setIsModal] = React.useState(false)
    const getSaveData = async () => {
        let value = await AsyncStorage.getItem('@isModal');
        if (value !== null) {
            if(value==='1'){
                setStyleFun(styles.styleFunAct)
                setIsModal(true)
                //setModalVisible(true)
                setStyleTextFun(styles.textStyle)
                _textInput.setNativeProps({
                    showSoftInputOnFocus: false
                })
            }
        }
    }
    const setSaveData = async (item, val) => {
        await AsyncStorage.setItem(item, val);
    }

    if (!isDataLoad){
        isDataLoad=true;
        getSaveData()  
    }
    //getSaveData()
    const showMathFunctions=()=>{
        if (!isModal) {
            setStyleFun(styles.styleFunAct)
            setIsModal(true)
            setModalVisible(true)
            setStyleTextFun(styles.textStyle)
            setSaveData('@isModal', '1')
        }else{
            setStyleFun(styles.styleFun)
            setIsModal(false)
            setModalVisible(false)
            setStyleTextFun({})
            setSaveData('@isModal', '0')
        }
        _focusText()
        
    }

    const getToolbarButtons = () => {
        return [{
                text: 'MathString',
                testID: 'show1',
                style: styleFun,
                styleText: styleTextFun,
                onPress: () => showMathFunctions(),
            },
           /* {
                text: 'show2',
                testID: 'show2',
                onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
            },*/
            {
                text: 'Gboard',
                testID: 'reset',
                style: styleKey,
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
                _textInput.setNativeProps({
                    selection:{
                        start: startIndex,
                        end: endIndex
                    }
                })

            } catch (e) {
        }
    }
    changeRangeSelG = changeRangeSel
    
    _focusText = ()=>{
        _textInput.blur()
        _textInput.setNativeProps({
            showSoftInputOnFocus: modalVisible
        })
        //_textInput.blur()
        setTimeout(_textInput.focus, 250)
        //_textInput.focus()
        //_textInput.forceUpdate()
    }

    _focusTxt = () => {
        _textInput.focus()
    }

    focusG = _focusTxt
    _onSelectionChange=(e)=>{
        startIndex = e.nativeEvent.selection.start
        endIndex = e.nativeEvent.selection.end
        /*this.setState({
            selection:{
                start: startIndex,
                end: endIndex
            }
        })*/
      // changeRangeSel()
    }

        return(<View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false} >
                    <TextInput
                        style={props.style}
                        onTextInput = {
                            (e) => {
                                let rangeStart = e.nativeEvent.range.start;
                                let rangeEnd = e.nativeEvent.range.end;
                                let txt = e.nativeEvent.text;
                                if(txt===''){
                                    startIndex = rangeStart;
                                    endIndex = rangeStart;
                                }else{
                                    if (rangeStart < rangeEnd) {
                                        rangeEnd = rangeStart
                                    }
                                    startIndex = rangeStart + 1;
                                    endIndex = rangeEnd + 1;
                                }
                                changeRangeSel()
                            }
                        }
                        onBlur={()=>{ setModalVisible(false) }}
                        onFocus = {
                            () => {
                                if (isModal) {
                                    setModalVisible(true)
                                }else{
                                    _textInput.setNativeProps({
                                        showSoftInputOnFocus: true
                                    })
                                }
                            }
                        }
                        //onTouchEnd={props.onTouchEnd}
                        //showSoftInputOnFocus={!modalVisible}
                        onChangeText={props.onChangeText}
                        onSelectionChange={_onSelectionChange}
                       //onKeyPress={_onKeyPress}
                        /*onChange = {
                            (e) => {
                                startIndex = 0;
                                endIndex = 0;
                                changeRangeSel()
                            }
                        }*/
                        
                        placeholder={props.placeholder}
                        multiline={true}
                       // selection={selection}
                        //keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                     //keyboardType={null}
                        //selectTextOnFocus={true}
                        ref={component => _textInput = component }
                        /*ref = {
                            (r) => {
                                this.textInputRef = r;
                                r.shouldComponentUpdate
                            }
                        }*/
                        defaultValue={props.defaultValue}
                       // onFocus={() => this.resetKeyboardView()}
                    />
                </TouchableWithoutFeedback>
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
    styleKey: {
        marginLeft: 15,
        padding: 3,
        borderRadius: 30,
        elevation: 2,
        backgroundColor: "green"
    },
    styleFunAct: {
        padding: 3,
        borderRadius: 30,
        elevation: 2,
        backgroundColor: "#2196F3"
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