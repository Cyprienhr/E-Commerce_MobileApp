import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Mock auth service for now
const mockAuthService = {
  isAuthenticated: () => false, // Start with login screen
  getCurrentUser: () => null,
  logout: () => {},
};

const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Cart':
      return 'shopping-cart';
    case 'Profile':
      return 'person';
    default:
      return 'home';
  }
};

const tabScreenOptions = ({ route }: { route: { name: string } }) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    const iconName = getTabIcon(route.name);
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: COLORS.ACCENT,
  tabBarInactiveTintColor: COLORS.BLACK,
  tabBarStyle: {
    backgroundColor: COLORS.WHITE,
    borderTopColor: COLORS.BLACK,
    borderTopWidth: 1,
  },
  headerShown: false,
});

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const WorkingRootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status
    const authenticated = mockAuthService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default WorkingRootNavigator;
