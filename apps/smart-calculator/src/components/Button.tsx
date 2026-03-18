import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'equals' | 'function' | 'memory';
  isDarkMode: boolean;
  style?: ViewStyle;
  wide?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  type = 'number',
  isDarkMode,
  style,
  wide = false,
}) => {
  const getButtonColor = () => {
    if (isDarkMode) {
      switch (type) {
        case 'operator':
        case 'equals':
          return '#FF9500';
        case 'function':
          return '#5A5A5C';
        case 'memory':
          return '#34C759';
        default:
          return '#3A3A3C';
      }
    } else {
      switch (type) {
        case 'operator':
        case 'equals':
          return '#FF9500';
        case 'function':
          return '#E5E5E7';
        case 'memory':
          return '#34C759';
        default:
          return '#E5E5E7';
      }
    }
  };

  const getTextColor = () => {
    if (isDarkMode) {
      return '#fff';
    } else {
      switch (type) {
        case 'operator':
        case 'equals':
        case 'memory':
          return '#fff';
        default:
          return '#000';
      }
    }
  };

  const styles = StyleSheet.create({
    button: {
      flex: wide ? 2 : 1,
      backgroundColor: getButtonColor(),
      borderRadius: 12,
      padding: 16,
      margin: 6,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 60,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '600',
      color: getTextColor(),
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};
