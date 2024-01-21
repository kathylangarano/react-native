import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigation from './App/Screen/LoginScreen/Navigations/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';



SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {
  
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_c2FmZS1vcG9zc3VtLTU1LmNsZXJrLmFjY291bnRzLmRldiQ'}>
    <View style={styles.container} onLayout={onLayoutRootView}>
   
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
          </SignedIn>
        <SignedOut>
          <LoginScreen/>
        </SignedOut>
      <StatusBar style="auto" />
     
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25
  },
});
