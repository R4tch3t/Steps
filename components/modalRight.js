import React, { useRef } from "react";
import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export default (props) => {
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
  if (props.modalVisible){
    Animated.spring(pan, { toValue: { x: -250, y: 0 } }).start();
  }else{
    Animated.spring(pan, { toValue: { x: -100, y: 0 } }).start();
  }
  const replaceRange=(s, start, end, substitute) => {
    return s.substring(0, start) + substitute + s.substring(end);
  }
  const instertChar = (char) => {
    const countC = char.length
    stacksfocusG[nameStack].focusG()
    txtGExp = replaceRange(txtGExp, startIndex, endIndex, char);
    stackevalGlobal[nameStack].evalGlobal(txtGExp);
    if (startIndex < endIndex){
        endIndex = startIndex
    }
    startIndex += countC;
    endIndex += countC;
    stackchangeRangeSelG[nameStack].changeRangeSelG();
  }
  
  return (
      
      <Animated.View
        style={[ styles.modalView, {transform: [{ translateX: pan.x }, { translateY: pan.y }]}]}
       // {...panResponder.panHandlers}
      >

        <View style={styles.box} >

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('1')}}
              style={[styles.openButton]}
              //key={index}
            >
              <Text>{"1"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('2')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"2"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('3')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"3"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('4')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"4"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('5')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"5"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('6')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"6"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('7')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('8')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('9')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>9</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('0')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"0"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('.')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('π')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>π</Text>
            </TouchableOpacity>
          </View>

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
      width: 150,
      height: 185,
     // margin: 120,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 12,
     // alignItems: 'flex-end',
      flexDirection: 'column',
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
    top: 80,
    right: -275,
    zIndex: 998
  },
  openButton: {
      zIndex: 999,
      width: 40,
      height: 40,
      marginRight: 2,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "green",
      borderRadius: 20,
      padding: 10,
      elevation: 2
  }
});
