import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';
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
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: COLORS.WHITE,
          },
          headerTintColor: COLORS.BLACK,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
