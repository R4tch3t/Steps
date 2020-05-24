import AsyncStorage from '@react-native-community/async-storage';

export default async (item, val) => {
    try {
        const jsonValue = JSON.stringify(val)
        await AsyncStorage.setItem(item, jsonValue);
    } catch (e) {

    }
}
