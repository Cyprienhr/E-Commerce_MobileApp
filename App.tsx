/**
 * E-Commerce React Native App
 * Using FakeStoreAPI for backend
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRootNavigator from './src/navigation/AppRootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppRootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
