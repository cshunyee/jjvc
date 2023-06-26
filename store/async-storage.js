import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  const newValue = value instanceof Object ? JSON.stringify(value) : value;

  try {
    await AsyncStorage.setItem(key, newValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const newValue = (value != null && value instanceof Object) ? JSON.parse(value) : value;
    return newValue != null ? newValue : null;
  } catch (e) {
    // error reading value
  }
};