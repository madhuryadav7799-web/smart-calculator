import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, getTheme } from '../utils/colors';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  darkMode: boolean;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  darkMode,
  icon,
}) => {
  const theme = getTheme(darkMode);

  return (
    <View
      style={{
        backgroundColor: theme.bgSecondary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {icon && (
          <Text style={{ fontSize: 32 }}>
            {icon}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: theme.textSecondary,
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: COLORS.primary,
            }}
          >
            {value}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: 12,
                color: theme.textSecondary,
                marginTop: 4,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
