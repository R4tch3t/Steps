import React, { useRef } from "react";
import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, PixelRatio } from "react-native";


export default (props) => {
  const density = (PixelRatio.get() * 160) / 2.54
  const {width, height} = Dimensions.get('window');
  const modalH = (height-density)<400 ? 185 : 265
  const pan = useRef(new Animated.ValueXY()).current; 
  console.log(`density: ${density} / height: ${height} = ${height - density}`)
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
    Animated.spring(pan, { toValue: { x: 225, y: 0 } }).start();
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
  
  const backSpance = () => {
    stacksfocusG[nameStack].focusG()
    if (startIndex > 0 && startIndex===endIndex) {
      startIndex--;
    }
    txtGExp = replaceRange(txtGExp, startIndex, endIndex, '');
    endIndex = startIndex;
    
    stackevalGlobal[nameStack].evalGlobal(txtGExp);
    stackchangeRangeSelG[nameStack].changeRangeSelG();
  }

  const backSpan = () => {    
    stacksfocusG[nameStack].focusG()
    if (endIndex > 0 && endIndex===startIndex) {
      endIndex--;
    }
    if (startIndex > 0){
      startIndex--;
    }
    stackchangeRangeSelG[nameStack].changeRangeSelG();
  }
  const nextSpan = () => {
    stacksfocusG[nameStack].focusG()
    const ltxt = txtGExp.length
    if (ltxt > endIndex && endIndex !== startIndex) {
      endIndex++;
    } else {
      if (ltxt > startIndex) {
        startIndex++;
      }
      if (ltxt > endIndex) {
        endIndex++;
      }
    }
    
    stackchangeRangeSelG[nameStack].changeRangeSelG();
  }
  return (
    
      <Animated.View
        style={[ styles.modalView, {transform: [{ translateX: pan.x }, { translateY: pan.y }]}]}
       // {...panResponder.panHandlers}
      >
        
        <View style={[styles.box,{height: modalH}]} >
        <ScrollView keyboardShouldPersistTaps='handled' >
          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{backSpan()}}
              style={[styles.openButton]}
              //key={index}
            >
              <Text>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{nextSpan()}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{">"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{backSpance()}}
              style={[styles.openButton, {backgroundColor: 'red'}]}
              //key={index}
            >
              <Text>{"|<"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('(')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"("}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar(')')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{")"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('^')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"^"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('+')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('-')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('*')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>*</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('/')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"/"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('√')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>√</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('%')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>%</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('ln(')}}
              style={styles.openButton}
              //key={index}
            >
              <Text>{"ln"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('log2(')}}
              style={[styles.openButton, {padding: 1}]}
              //key={index}
            >
              <Text>log2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('log10(')}}
              style={[styles.openButton, {padding: 1}]}
              //key={index}
            >
              <Text>{"log10"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} >
            <TouchableOpacity
              onPress={()=>{instertChar('cos(')}}
              style={[styles.openButton, {padding: 1}]}
              //key={index}
            >
              <Text >{"cos"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('sen(')}}
              style={[styles.openButton, {padding: 5}]}
              //key={index}
            >
              <Text>{"sen"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{instertChar('tan(')}}
              style={[styles.openButton, {padding: 5}]}
              //key={index}
            >
              <Text>tan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
      height: 265,
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
    left: -250,
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
