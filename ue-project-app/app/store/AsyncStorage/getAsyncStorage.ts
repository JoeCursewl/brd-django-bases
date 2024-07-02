import AsyncStorage from "@react-native-async-storage/async-storage";
export const getAsyncStorage = async (storedValue: string) => {
    try {
      const value = await AsyncStorage.getItem(storedValue);
      if (value !== null) {
        return { token: value };
      }

      throw new Error("El token no existe o no fue encontrado");
    } catch (e: any) {
      return { errorStorage: e.message };
    }
  };