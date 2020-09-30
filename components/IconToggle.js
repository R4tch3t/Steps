import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
//import { COLOR, Toolbar, Icon } from '../react-native-material-ui';
import {Icon} from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen';
// ...

export default (props) =>{
    const [maxOpacity, setMaxOpacity] = React.useState(0.12); 
    const [scaleValue, setScaleValue] = React.useState(new Animated.Value(0.01));
    const [opacityValue, setOpacityValue] = React.useState(new Animated.Value(0.12));
    let viewRef = React.useRef();
   /* const BoxShadow = styles.view `
  border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
  margin-left: 5;
  margin-right: 5;
  margin-top: 10;
`*/
    
    /*constructor(props, context) {
        super(props, context);

        const maxOpacity = 0.12;

        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity),
        };

        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }*/
    const onPressedIn = () => {
        console.log('pressedIn')
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: true
        }).start(()=>{
         // onPressedOut()
        });
    }
    const onPressedOut=() => {
        Animated.timing(opacityValue, {
            toValue: 0,
            useNativeDriver: true
        }).start(() => {
            setScaleValue(new Animated.Value(0.01));
            setOpacityValue(new Animated.Value(maxOpacity));
        });
    }
    const renderRippleView = () => {
        const { size } = props;
        //const { scaleValue, opacityValue } = this.state;

        const rippleSize = size * 2;

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: rippleSize,
                    height: rippleSize,
                    borderRadius: rippleSize / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: 'black',
                    zIndex: 9999
                }}
            />
        );
    }
    //render() {
        const { name, size, type, color, onPress } = props;
        const containerSize = size * 2;
        const iconContainer = { width: containerSize, height: containerSize };
        
        return (
            <>
            
            <View style={[styles.iconContainer, iconContainer]}>
                    <View ref={component => viewRef = component} style={[styles.view]} >
                        {/*renderRippleView()*/}
                        <Icon onLayout={()=>{
                            console.log(`viewRef ${viewRef}`)
                            console.log(viewRef)
                            //viewRef.current.style.width=1000
                            viewRef.setNativeProps({style: {width: 800, height: 400}});
                        }} activeOpacity={1} borderRadius={5} containerStyle={{borderRadius: 5}} iconProps={{borderRadius: 5}} iconStyle={{borderRadius: 5}} style={{borderRadius: 5}} name={name} size={size} type={type} color={color} size={size} onPress={onPress} >
                        
                        </Icon>
                    </View>
                </View>
            </>
        );
//    }
}
const styles = StyleSheet.create({
    iconContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        zIndex: -999
        
    },
    view:{
        borderWidth:0,
        borderRadius: 30,
        paddingTop: 40,
        shadowColor: 'black',
        backgroundColor: 'white',
        elevation: 2
        //shadowOffset: {Width: 5,height: 5},
       // shadowRadius: 0.6,
        //shadowOpacity: 1,

    },
     containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
});