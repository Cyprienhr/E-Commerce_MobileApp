import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../constants';

type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>E-Commerce</Text>
          <Text style={styles.tagline}>Your Shopping Destination</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.featureTitle}>Welcome!</Text>
          <Text style={styles.featureDescription}>
            Browse products from our store and enjoy a seamless shopping experience.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={navigateToSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  features: {
    alignItems: 'center',
    marginBottom: 48,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 16,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signupButtonText: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
