import React from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CheckBox,
  Divider,
  Text
} from 'react-native-elements'

export default ({navigation}) => {
    return (
      <>
            <View style={styles.body} >
              <Text style={{ fontSize: 30 }}>This is a modal!</Text>
              <Button onPress={() => navigation.navigate('Steps')} title="Dismiss" />  
            </View>
      </>
    );

}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});