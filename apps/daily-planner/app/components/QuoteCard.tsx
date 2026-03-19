import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, getTheme } from '../utils/colors';

interface QuoteCardProps {
  text: string;
  author: string;
  darkMode: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  text,
  author,
  darkMode,
}) => {
  const theme = getTheme(darkMode);

  return (
    <View
      style={{
        backgroundColor: theme.bgSecondary,
        borderRadius: 16,
        padding: 24,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: theme.text,
          marginBottom: 12,
          lineHeight: 28,
        }}
      >
        "{text}"
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: COLORS.primary,
          fontWeight: '600',
          textAlign: 'right',
        }}
      >
        — {author}
      </Text>
    </View>
  );
};
