// storage.ts (or storage.js for JS projects)
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = {
    set: async (key: string, value: any): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('AsyncStorage set error:', e);
        }
    },

    get: async <T = any>(key: string): Promise<T | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('AsyncStorage get error:', e);
            return null;
        }
    },

    remove: async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('AsyncStorage remove error:', e);
        }
    },

    clear: async (): Promise<void> => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error('AsyncStorage clear error:', e);
        }
    },

    has: async (key: string): Promise<boolean> => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null;
        } catch (e) {
            console.error('AsyncStorage has error:', e);
            return false;
        }
    },

    keys: async (): Promise<readonly string[]> => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (e) {
            console.error('AsyncStorage keys error:', e);
            return [];
        }
    },
};

export default LocalStorage;
