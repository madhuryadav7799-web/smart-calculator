import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, getTheme } from '../utils/colors';

interface ProgressBarProps {
  percentage: number;
  darkMode: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  darkMode,
  size = 'medium',
}) => {
  const theme = getTheme(darkMode);

  const sizeConfig = {
    small: { height: 4, labelSize: 12 },
    medium: { height: 8, labelSize: 14 },
    large: { height: 12, labelSize: 16 },
  };

  const config = sizeConfig[size];

  return (
    <View>
      <View
        style={{
          height: config.height,
          backgroundColor: theme.bgTertiary,
          borderRadius: config.height / 2,
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: COLORS.primary,
            borderRadius: config.height / 2,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: config.labelSize,
          color: theme.textSecondary,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {percentage}% Complete
      </Text>
    </View>
  );
};
