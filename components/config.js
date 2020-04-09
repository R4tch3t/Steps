import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { CheckBox } from 'react-native-elements'
BBS = true
BSC = false
export default () => {
    const [bbs, setBbs] = React.useState(true);
    const [bsc, setBsc] = React.useState(false);
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/*<Header />*/}

            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                
                <CheckBox
                  title="Braket Solved"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={bbs}
                  onPress={() => {
                    BSC = bbs
                    setBsc(bbs);
                    setBbs(!bbs);
                    BBS = !BBS
                  }}
                />

                <CheckBox
                  title="Sign Changed"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={bsc}
                  onPress={() => {
                    BBS = bsc
                    setBbs(bsc);
                    setBsc(!bsc);
                    BSC = !BSC
                  }}
                />

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );

}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});