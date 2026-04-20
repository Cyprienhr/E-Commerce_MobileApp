import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = COLORS.ACCENT;
        break;
      case 'secondary':
        baseStyle.backgroundColor = COLORS.WHITE;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = COLORS.BLACK;
        break;
      case 'danger':
        baseStyle.backgroundColor = '#ff4444';
        break;
    }

    switch (size) {
      case 'small':
        baseStyle.paddingVertical = 8;
        baseStyle.paddingHorizontal = 16;
        break;
      case 'medium':
        baseStyle.paddingVertical = 12;
        baseStyle.paddingHorizontal = 24;
        break;
      case 'large':
        baseStyle.paddingVertical = 16;
        baseStyle.paddingHorizontal = 32;
        break;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    switch (variant) {
      case 'primary':
        baseStyle.color = COLORS.WHITE;
        break;
      case 'secondary':
        baseStyle.color = COLORS.BLACK;
        break;
      case 'danger':
        baseStyle.color = COLORS.WHITE;
        break;
    }

    switch (size) {
      case 'small':
        baseStyle.fontSize = 14;
        break;
      case 'medium':
        baseStyle.fontSize = 16;
        break;
      case 'large':
        baseStyle.fontSize = 18;
        break;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.WHITE} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
