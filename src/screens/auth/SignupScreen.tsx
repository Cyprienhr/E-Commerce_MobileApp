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
import { SignupData } from '../../types';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!email.trim() || !username.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const signupData: SignupData = {
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
        name: {
          firstname: firstName.trim(),
          lastname: lastName.trim(),
        },
      };

      await signup(signupData);
      // Navigation will be handled by the root navigator
    } catch (error) {
      Alert.alert('Signup Failed', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              placeholderTextColor="#666"
            />
            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              placeholderTextColor="#666"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

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
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginLink} onPress={navigateToLogin}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLinkText}>Sign In</Text>
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
  nameRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
    marginRight: 8,
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
  signupButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  signupButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLinkText: {
    color: COLORS.ACCENT,
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
});

export default SignupScreen;
