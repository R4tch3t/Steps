import React, {
    Component,
    useCallback 
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    PixelRatio,
    Platform,
    TextInput,
    Modal,
    Keyboard,
    Linking
} from 'react-native';
import {
    AutoGrowingTextInput
} from 'react-native-autogrow-textinput';
import {
    KeyboardAccessoryView,
    KeyboardUtils
} from 'react-native-keyboard-input';
import './mathKeyboard';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

const OpenURLButton = ({ url }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
    //  Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  handlePress()
};

export default class AsciiTab extends Component {
    
    constructor(props) {
            super(props);
            //KeyboardRegistry.registerKeyboard('AsciiTab', () => this);
            this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
            this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
            this.resetKeyboardView = this.resetKeyboardView.bind(this);
            this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

            this.state = {
                styleFun: styles.styleFun,
                styleKey: styles.styleKey,
                styleTextFun: {},
                styleTextKey: styles.textStyle,
                customKeyboard: {
                    component: undefined,
                    initialProps: undefined,
                },
                receivedKeyboardData: undefined,
                modalVisible: false
            };
    }

    onKeyboardItemSelected(keyboardId, params) {
        const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
        this.setState({
            receivedKeyboardData
        });
    }
    
    onKeyboardResigned() {
        this.resetKeyboardView();
    }

    resetKeyboardView() {
        this.setState({
            customKeyboard: {}
        });
    }

    showKeyboardView(component, title) {
        this.setState({
            customKeyboard: {
                component,
                initialProps: {
                    title
                },
            },
        });
    }

    showMathFunctions(){
        const {modalVisible} = this.state
        if(!modalVisible){
            this.setState({styleFun: styles.styleFunAct, 
                modalVisible: !modalVisible,
                styleTextFun: styles.textStyle
            })
        }else{
            this.setState({
                styleFun: styles.styleFun,
                modalVisible: !modalVisible,
                styleTextFun: {}
            })
        }
        //Keyboard.dismiss()

    }

    getToolbarButtons() {
        return [{
                text: 'MathString',
                testID: 'show1',
                style: this.state.styleFun,
                styleText: this.state.styleTextFun,
                onPress: () => this.showMathFunctions(),
            },
           /* {
                text: 'show2',
                testID: 'show2',
                onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
            },*/
            {
                text: 'Gboard',
                testID: 'reset',
                style: this.state.styleKey,
                styleText: this.state.styleTextKey,
                onPress: () => Linking.openURL("market://details?id=com.google.android.inputmethod.latin"),
            },
        ];
    }

    _onKeyPress(e){
        
        console.log(e.nativeEvent.key)
        switch (e.nativeEvent.key){
            case 'Enter':
                heightFix+=20
            break;
            case 'Backspace':
                heightFix -= 20
            break;
        }
    }

    keyboardAccessoryViewContent() {
        const {modalVisible} = this.state
        const displayKey = modalVisible ? 'none' : 'default'
        return(
            <View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false} >
                    <AutoGrowingTextInput
                        style={this.props.style}
                        onChangeText={this.props.onChangeText}
                    // onKeyPress={this._onKeyPress}
                    // onChange={(e)=>{console.log(e)}}
                        placeholder={this.props.placeholder}
                        //keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                     //keyboardType={null}
                        //selectTextOnFocus={true}
                        
                        ref = {
                            (r) => {
                                this.textInputRef = r;
                            }
                        }
                        defaultValue={this.props.defaultValue}
                        onFocus={() => this.resetKeyboardView()}
                    />
                </TouchableWithoutFeedback>
                <View style={{flexDirection: 'row'}}>
                    {
                    this.getToolbarButtons().map((button, index) =>
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
                {modalVisible &&    
                    <View style={[styles.modalView, {}]}  >
                        <Text>2</Text>
                    </View>
                }
                {/*
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                   // Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            this.setState({modalVisible: !modalVisible});
                        }}
                        >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
                */}
            </View>
        )
    }

    /*componentDidMount(){
        console.log(`heightFix: ${this.textInputRef.current.parentElement.clientWidth}`)
    }*/

    render() {
        return this.keyboardAccessoryViewContent()
        /*return(
            <>
            <AutoGrowingTextInput
                style={this.props.style}
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}
                //keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                //selectTextOnFocus={true}
                ref = {
                    (r) => {
                        this.textInputRef = r;
                    }
                }
                defaultValue={this.props.defaultValue}
                onFocus={() => this.resetKeyboardView()}
            />
            </>
        )
        
            return (
               <View>
                <KeyboardAccessoryView
                    renderContent={this.keyboardAccessoryViewContent}
                    onHeightChanged={IsIOS ? height => this.setState({keyboardAccessoryViewHeight: height}) : undefined}
                    trackInteractive={TrackInteractive}
                    kbInputRef={this.textInputRef}
                    kbComponent={this.state.customKeyboard.component}
                    kbInitialProps={this.state.customKeyboard.initialProps}
                    onItemSelected={this.onKeyboardItemSelected}
                    onKeyboardResigned={this.onKeyboardResigned}
                    revealKeyboardInteractive
                />
               </View> 
            ) */
        
    }
    

}

styles = StyleSheet.create({
    
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