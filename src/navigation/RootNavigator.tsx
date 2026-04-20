import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import authService from '../services/auth';

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
