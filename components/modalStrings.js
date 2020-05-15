import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, TouchableOpacity } from "react-native";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current; 
  /*const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    })
  ).current;*/
    Animated.spring(pan, { toValue: { x: 100, y: 0 } }).start();
  return (
    
      <Animated.View
        style={[ styles.modalView, {transform: [{ translateX: pan.x }, { translateY: pan.y }]}]}
       // {...panResponder.panHandlers}
       onPress={()=>{console.log('click+')}}
      >
        <View style={styles.box} onPress={()=>{console.log('click+')}} >
            <TouchableOpacity
                        onPress={()=>{console.log('click+')}}
                        style={styles.openButton}
                        //key={index}
                        >
                        <Text>+</Text>
            </TouchableOpacity>
        </View>    
      </Animated.View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
      zIndex: 999,
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
  modalView: {
     // ...StyleSheet.absoluteFill,
  //  width: 100,
    //height: 100,
    position: 'absolute',
    top: 100,
    left: -250,
    zIndex: 998
  },
  openButton: {
      zIndex: 999,
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
  }
});
