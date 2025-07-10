import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UserLayout from '../../Layouts/UserLayout';
import TextUI from '../../Components/ui/TextUI';
import theme from '../../config/theme';
import SQLiteService from '../../Functions/SQLiteService';
import H1 from '../../Components/ui/H1';
import ButtonUi from '../../Components/ui/ButtonUi';
import screenNames from '../../config/screenNames';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null); // Replace `any` with proper User type if available

  const navigation = useNavigation();
  const getUser = async () => {
    try {
      const res = await SQLiteService.getActiveUser();
      setIsLoading(false);
      if (Array.isArray(res) && res.length > 0) {
        setIsLoggedIn(true);
        setUserData(res[0]);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  if (isLoading) {
    return (
      <UserLayout style={styles.loading}>
        <TextUI>Loading...</TextUI>
      </UserLayout>
    );
  }

  if (!isLoggedIn) {
    return (
      <UserLayout
        style={[
          styles.loading,
          {
            rowGap: theme.radius * 5,
          },
        ]}>
        <H1>Please Login</H1>
        <ButtonUi
          pressableProps={{
            onPress: () => {
              navigation.navigate(screenNames.LoginScreen, {});
            },
          }}
          contentContainerStyle={{
            width: '50%',
          }}>
          Login
        </ButtonUi>
      </UserLayout>
    );
  }

  return (
    <UserLayout style={styles.container}>
      <H1>Welcome, {userData?.name || 'User'}!</H1>
      <TextUI>Email: {userData?.email}</TextUI>
      <TextUI>Role: {userData?.role}</TextUI>
      <TextUI>{JSON.stringify(userData)}</TextUI>
    </UserLayout>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
});
