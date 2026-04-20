import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../constants';
import { useAuth } from '../../context/AuthContext';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      // Navigation will be handled by the root navigator
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Navigation will be handled by the root navigator
    } catch {
      Alert.alert('Google Sign-In Failed', 'Please try again');
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIconText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupLink} onPress={navigateToSignup}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLinkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: COLORS.WHITE,
  },
  loginButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  googleButtonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.WHITE,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  eyeIconText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  signupLink: {
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLinkText: {
    color: COLORS.ACCENT,
    fontWeight: '600',
  },
});

export default LoginScreen;
