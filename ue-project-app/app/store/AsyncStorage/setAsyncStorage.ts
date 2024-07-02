import AsyncStorage from '@react-native-async-storage/async-storage';
export const setAsyncStorage = async (storeName: string, value: string) => {
    try {
      await AsyncStorage.setItem(storeName, value);
    } catch (e: any) {
      return e.message;
    }
  };