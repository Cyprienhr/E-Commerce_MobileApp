import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'shopping-cart':
        return '🛒';
      case 'person':
        return '👤';
      default:
        return '🏠';
    }
  };

  return (
    <Text style={[styles.icon, { color: color || COLORS.BLACK, fontSize: size || 24 }]}>
      {getIcon()}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default TabIcon;
