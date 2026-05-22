import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);

  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('isOnboarded');

      if (value === 'true') {
        setIsOnboarded(true);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  setIsOnboarded={setIsOnboarded}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Profile">
              {(props) => (
                <ProfileScreen
                  {...props}
                  setIsOnboarded={setIsOnboarded}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => (
              <OnboardingScreen
                {...props}
                setIsOnboarded={setIsOnboarded}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}