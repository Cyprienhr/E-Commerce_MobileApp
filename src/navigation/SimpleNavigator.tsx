import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();

// Simple test navigator to verify setup
const SimpleNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Test" 
          component={TestScreen}
          options={{
            title: 'E-Commerce Test',
            headerStyle: { backgroundColor: COLORS.WHITE },
            headerTintColor: COLORS.BLACK,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        E-Commerce App
      </Text>
      <Text style={styles.subtitle}>
        Using FakeStoreAPI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontSize: 24,
    color: COLORS.BLACK,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.ACCENT,
  },
});

export default SimpleNavigator;
