import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from '../components/TabIcon';
import { COLORS } from '../constants';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    return <TabIcon name={iconName} color={color} size={size} />;
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
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen as any}
        options={{
          headerShown: true,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: COLORS.WHITE,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.BLACK,
          },
          headerTintColor: COLORS.BLACK,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
        }}
      />
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

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const AppRootNavigator = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default AppRootNavigator;
