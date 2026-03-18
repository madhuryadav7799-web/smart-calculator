import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { HistoryEntry } from '../utils/calculator';
import * as Clipboard from 'expo-clipboard';

interface HistoryProps {
  visible: boolean;
  history: HistoryEntry[];
  isDarkMode: boolean;
  onClose: () => void;
  onSelectItem: (value: string) => void;
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({
  visible,
  history,
  isDarkMode,
  onClose,
  onSelectItem,
  onClearHistory,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#ddd',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 28,
      color: isDarkMode ? '#fff' : '#000',
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
    },
    historyContent: {
      flex: 1,
    },
    expression: {
      fontSize: 16,
      color: isDarkMode ? '#bbb' : '#666',
      marginBottom: 4,
    },
    result: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      padding: 8,
    },
    actionButtonText: {
      fontSize: 14,
      color: '#FF9500',
      fontWeight: '600',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#888' : '#999',
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#ddd',
    },
    clearButton: {
      backgroundColor: '#FF3B30',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    clearButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  const renderItem = ({ item }: { item: HistoryEntry }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => {
        onSelectItem(item.result);
        onClose();
      }}
    >
      <View style={styles.historyContent}>
        <Text style={styles.expression}>{item.expression}</Text>
        <Text style={styles.result}>{item.result}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => copyToClipboard(item.result)}
        >
          <Text style={styles.actionButtonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            onSelectItem(item.result);
            onClose();
          }}
        >
          <Text style={styles.actionButtonText}>Use</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>History</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No calculations yet</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
          />
        )}

        {history.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearHistory}
            >
              <Text style={styles.clearButtonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};
