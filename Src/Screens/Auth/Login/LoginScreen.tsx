import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import UserLayout from '../../../Layouts/UserLayout';
import H1 from '../../../Components/ui/H1';
import theme from '../../../config/theme';
import TextUI from '../../../Components/ui/TextUI';
import ButtonUi from '../../../Components/ui/ButtonUi';
import TextInputComponent from '../../../Components/ui/TextInputComponent';
import { Ionicons } from '../../../Components/CustomIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import assets from '../../../Assets/assets';
import APIService from '../../../Functions/APIResponses';
import SQLiteService from '../../../Functions/SQLiteService';
import { useNavigation } from '@react-navigation/native';
import LocalStorage from '../../../Functions/asyncStorage';
import asyncStorageNames from '../../../config/asyncStorageNames';

export default function LoginScreen() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [fetchingData, setFetchingData] = useState(false);
  const [isEyeView, setIsEyeView] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'george25@example.org',
    password: 'password',
  });
  const login = async () => {
    try {
      // Call API to log in
      const res = await APIService.auth.login(loginData);
      // console.log(res.data)
      // Ensure response has required fields
      if (!res?.user || !res?.token) {
        throw new Error('Invalid response from server');
      }

      const user = res.user;

      // Insert user into SQLite and mark as active
      const sql = await SQLiteService.loginUser({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        token: res.token,
      })
        .then(sql => {
          LocalStorage.set(asyncStorageNames.BearerToken, res.token)
          navigation.goBack();
          console.log('Login successful and user saved locally:', user, { sql });
        })
        .catch(err => {
          console.error(err);
        });
    } catch (error: any) {
      console.error('Login failed:', error.message || error);
      // Optionally show toast/snackbar to user
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? theme.screenHeight * 0.05 : 0
      }>
      <UserLayout style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <H1 style={styles.title}>Login</H1>

          <TextUI>Good To See You Back</TextUI>
          <TextInputComponent
            textInputProps={{
              placeholder: 'Enter your email here',
              value: loginData.email,
              onChangeText: text => {
                setLoginData(state => ({ ...state, email: text }));
              },
            }}
          />
          <TextInputComponent
            rightIcon={
              <Ionicons
                name={isEyeView ? 'eye' : 'eye-off'}
                color={isDarkMode ? Colors.white : Colors.black}
              />
            }
            onPressRightIcon={() => {
              setIsEyeView(st => !st);
            }}
            rightIconComponentStyle={{
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              paddingVertical: 0,
              paddingRight: theme.screenWidth * 0.035,
            }}
            textInputProps={{
              placeholder: 'Password',
              secureTextEntry: isEyeView,
              value: loginData.password,
              onChangeText: text => {
                setLoginData(state => ({ ...state, password: text }));
              },
            }}
          />

          <ButtonUi
            pressableProps={{
              disabled: fetchingData,
              onPress: () => {
                login();
              },
            }}
            childrenComponent={
              fetchingData && <ActivityIndicator color={theme.card} />
            }
            contentContainerStyle={{
              width: 'auto',
              opacity: fetchingData ? 0.5 : 1,
            }}>
            Login
          </ButtonUi>
        </ScrollView>
      </UserLayout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    rowGap: theme.radius * 2,
  },
  title: {
    fontSize: theme.fontSize['text-5xl'],
    color: theme.primary,
  },
  subtitle: {
    fontWeight: '300',
  },
});
