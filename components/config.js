import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  CheckBox,
  Divider,
  Text
} from 'react-native-elements'
BBS = true
BSC = false
export default () => {
    const [bbs, setBbs] = React.useState(true);
    const [bsc, setBsc] = React.useState(false);
    const [tDval, setTDval] = React.useState(true)
    const [mDval, setMDval] = React.useState(false)
    const [toRad, setToRad] = React.useState(false)
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
                <Text style={styles.sectionText1} h4>{strToLang('configText00')}</Text>
                <CheckBox
                  title={strToLang('configCheck00')}
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
                  title={strToLang('configCheck01')}
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
                <Divider style={{ backgroundColor: 'blue' }} />
                <Text style={styles.sectionText1} h4>{strToLang("configText01")}</Text>
                <CheckBox
                  title={strToLang('configCheck02')}
                  checked={tDval}
                  onPress={() => {
                    toDecimalVal = toDecimalVal === 0 ? 1 : 0
                    setTDval(!tDval)
                  }}
                />
                <CheckBox
                  title={strToLang('configCheck03')}
                  checked={mDval}
                  onPress={() => {
                    MoreDVal = MoreDVal === 0 ? 1:0
                    setMDval(!mDval)
                  }}
                />
                <CheckBox
                  title={strToLang('configCheck04')}
                  checked={toRad}
                  onPress={() => {
                    DegRad = DegRad === 0 ? 1 : 0
                    setToRad(!toRad)
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
        marginTop: 10,
        paddingHorizontal: 24,
    },
    sectionText1: {
      textAlign: 'center'
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