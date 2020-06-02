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
import onChangeText from '../functions/onChangeText.js'
import AsyncStorage from '@react-native-community/async-storage';
BBS = true
BSC = false
FCT = true
export default () => {
    const [bbs, setBbs] = React.useState(BBS);
    const [bsc, setBsc] = React.useState(BSC);
    const [tDval, setTDval] = React.useState(toDecimalVal === 1 ? true : false);
    const [mDval, setMDval] = React.useState(MoreDVal===1 ? true : false);
    const [toRad, setToRad] = React.useState(DegRad === 1 ? true : false);
    const [toFact, setToFact] = React.useState(FCT);
    
    const setSaveData = async (item, val) => {
      await AsyncStorage.setItem(item, val);
    }
    
    return (
      <>
        <StatusBar backgroundColor="#f4511e" barStyle="default" />
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
                    setSaveData("@bbs",BBS?'0':'1')
                    setSaveData("@bsc",BBS?'1':'0')
                    BSC = bbs
                    setBsc(bbs);
                    setBbs(!bbs);
                    BBS = !BBS
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml)
                  }}
                />

                <CheckBox
                  title={strToLang('configCheck01')}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={bsc}
                  onPress={() => {
                    setSaveData("@bsc",BSC?'0':'1')
                    setSaveData("@bbs",BSC?'1':'0')
                    BBS = bsc
                    setBbs(bsc);
                    setBsc(!bsc);
                    BSC = !BSC
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml)
                  }}
                />
                <Divider style={{ backgroundColor: 'blue' }} />
                <Text style={styles.sectionText1} h4>{strToLang("configText01")}</Text>
                <CheckBox
                  title={strToLang('configCheck02')}
                  checked={tDval}
                  onPress={() => {
                    toDecimalVal = toDecimalVal === 0 ? 1 : 0
                    setSaveData('@tDval', `${toDecimalVal}`);
                    setTDval(!tDval)
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml)
                  }}
                />
                <CheckBox
                  title={strToLang('configCheck03')}
                  checked={mDval}
                  onPress={() => {
                    MoreDVal = MoreDVal === 0 ? 1:0
                    setSaveData('@mDval', `${MoreDVal}`);
                    setMDval(!mDval)
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml)
                  }}
                />
                <CheckBox
                  title={strToLang('configCheck04')}
                  checked={toRad}
                  onPress={() => {
                    DegRad = DegRad === 0 ? 1 : 0
                    setSaveData('@toRad', `${DegRad}`);
                    setToRad(!toRad)
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml)
                  }}
                />
                <Divider style={{ backgroundColor: 'blue' }} />
                <Text style={styles.sectionText1} h4>{strToLang("configText02")}</Text>
                <CheckBox
                  title={strToLang('configCheck05')}
                  checked={toFact}
                  onPress={() => {
                    //BSC = bbs
                    //setBsc(bbs);
                    setSaveData("@fct", FCT ? '0' : '1');
                    FCT = !FCT
                    setToFact(FCT);
                    
                    onChangeText(txtGExp, stacksetGHtml[nameStack].setGHtml);
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