import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DisplayProps {
  value: string;
  memory: number;
  isDarkMode: boolean;
}

export const Display: React.FC<DisplayProps> = ({ value, memory, isDarkMode }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      paddingHorizontal: 20,
      paddingVertical: 24,
      marginBottom: 12,
      borderRadius: 12,
    },
    memoryIndicator: {
      fontSize: 12,
      color: isDarkMode ? '#888' : '#666',
      marginBottom: 4,
    },
    display: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      textAlign: 'right',
      minHeight: 60,
    },
  });

  return (
    <View style={styles.container}>
      {memory !== 0 && (
        <Text style={styles.memoryIndicator}>
          M: {memory.toFixed(2)}
        </Text>
      )}
      <Text style={styles.display} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};
