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

import ModalLeft from "./modalLeft"
import ModalRight from "./modalRight"

const IsIOS = Platform.OS === 'ios';
startIndex = 0;
endIndex = 0;
//changeRangeSelG = null
//focusG = null
//isDataLoad = {}
export default (props) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [styleFun, setStyleFun] = React.useState(styles.styleFun)
    const [styleTextFun, setStyleTextFun] = React.useState({})
    const [styleKey, setStyleKey] = React.useState(styles.styleKey)
    const [styleTextKey, setStyleTextKey] = React.useState(styles.textStyle)
    const [isModal, setIsModal] = React.useState(false)
    const [isDataLoad, setIsDataLoad] = React.useState(false)
    const stackName = props.route.name
    //isDataLoad[stackName]={band: false}
    //console.log(props.route.name)
    const getSaveData = async () => {
        try{
            let value = await AsyncStorage.getItem('@isModal');
            console.log(value)
            stackIsModal = value !== null ? JSON.parse(value) : {};
            if (stackIsModal[stackName] !== undefined) {
                if (stackIsModal[stackName].isModal === 1) {
                    setStyleFun(styles.styleFunAct)
                    setIsModal(true)
                    //setModalVisible(true)
                    setStyleTextFun(styles.textStyle)
                    stacktextInput[stackName]._textInput.setNativeProps({
                        showSoftInputOnFocus: false
                    })
                }
            }
        }catch(e){

        }
    }
    /*const setSaveData = async (item, val) => {
        try{
            await AsyncStorage.setItem(item, val);
        }catch(e){

        }
    }*/

    const setObjSave = async (item, val) => {
        try {
            const jsonValue = JSON.stringify(val)
            console.log(`saveObj: ${jsonValue}`)
            await AsyncStorage.setItem(item, jsonValue);
        } catch (e) {

        }
    }
    console.log(isDataLoad)
    if (!isDataLoad) {
        setIsDataLoad(true)
        getSaveData()  
    }
    //getSaveData()
    const showMathFunctions=()=>{
        new Promise((resolve, reject)=>{
            if (!isModal) {
                //stacksfocusG[stackName].focusG()
                setStyleFun(styles.styleFunAct)
                setIsModal(true)
                setModalVisible(true)
                setStyleTextFun(styles.textStyle)
                stackIsModal[stackName]={isModal: 1}
                setObjSave('@isModal', stackIsModal)
            // setSaveData('@isModal', '1')
            }else{
                setStyleFun(styles.styleFun)
                setIsModal(false)
                setModalVisible(false)
                setStyleTextFun({})
                stackIsModal[stackName]={isModal: 0}
                setObjSave('@isModal', stackIsModal)
                //setSaveData('@isModal', '0')
            }
            resolve(1)
        }).then(() => _focusText())
        
        
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
                
            console.log(auxVars)
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

            /*if(delCount===stacksG.length){

            }*/

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
                style: styleFun,
                styleText: styleTextFun,
                onPress: () => showMathFunctions(),
            },
            {
                text: 'Gboard',
                testID: 'reset',
                style: [styleKey, {backgroundColor: "green"}],
                styleText: styleTextKey,
                onPress: () => Linking.openURL("market://details?id=com.google.android.inputmethod.latin"),
            },
            {
                text: strToLang('delStack'),
                testID: 'reset',
                style: [styleKey, {backgroundColor: "red"}],
                styleText: styleTextKey,
                onPress: delStack,
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
        console.log('focus')
        stacktextInput[stackName]._textInput.blur()
        stacktextInput[stackName]._textInput.setNativeProps({
            showSoftInputOnFocus: !modalVisible
        })
        //_textInput.blur()
        setTimeout(stacktextInput[stackName]._textInput.focus, 250)
        //_textInput.focus()
        //_textInput.forceUpdate()
    }

    _focusTxt = () => {
        /*stacktextInput[stackName]._textInput.setNativeProps({
            showSoftInputOnFocus: false
        })*/
        stacktextInput[stackName]._textInput.focus()
    }
    stacksfocusG[stackName]={focusG: _focusTxt}
    
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
                        //autoFocus={true}
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
                        ref={component => stacktextInput[stackName]={_textInput: component} }
                        /*ref = {
                            (r) => {
                                this.textInputRef = r;
                                r.shouldComponentUpdate
                            }
                        }*/
                        defaultValue={props.defaultValue}
                       // onFocus={() => this.resetKeyboardView()}
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