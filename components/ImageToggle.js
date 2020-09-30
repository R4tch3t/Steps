import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableHighlight,TouchableOpacity, Animated, Easing } from 'react-native';
//import { COLOR, Toolbar, Icon } from '../react-native-material-ui';
import {Image} from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen';
// ...

export default (props) =>{
    const [maxOpacity, setMaxOpacity] = React.useState(0.12); 
    const [scaleValue, setScaleValue] = React.useState(new Animated.Value(0.01));
    const [opacityValue, setOpacityValue] = React.useState(new Animated.Value(0.12));
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
    const onPressedOut=(cropIt) => {
        Animated.timing(opacityValue, {
            toValue: 0,
            useNativeDriver: true
        }).start(() => {
            setScaleValue(new Animated.Value(0.01));
            setOpacityValue(new Animated.Value(maxOpacity));
            //cropIt()
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
        const { uri, size, onPress } = props;
        const containerSize = size * 2;
        const iconContainer = { width: containerSize, height: containerSize };

        return (
          <>
            <View style={[styles.iconContainer, iconContainer]}>
              {renderRippleView()}
              
                {/*<TouchableHighlight onPressIn={onPressedIn} onPressOut={onPressedOut} >
                            <Image source={uri}  style={styles.img}/>
        </TouchableHighlight>*/}
                <TouchableOpacity
                  style={styles.button}
                  onPressIn={onPressedIn}
                  onPressOut={()=>{onPressedOut()}}
                  onPress={onPress}
                  >
                  <Text>Edit</Text>
                  <View style={{elevation: 2,width: 100,
        height: 100,}}>
                  <Image source={uri} borderRadius={10} elevation={2} style={styles.img} />
                  </View>
                </TouchableOpacity>
              
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
        borderRadius: 5,
        
        
    },
    img:{
       alignItems: 'center',
        width: 100,
        height: 100,
        overflow: "hidden",
        //borderRadius: 60,
        
    },
    button: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 6,
  }
});