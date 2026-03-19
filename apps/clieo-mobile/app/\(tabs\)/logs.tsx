import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

interface Log {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    const data = await apiService.getLogs(50);
    setLogs(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return 'error';
      case 'warn':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#ff4444';
      case 'warn':
        return '#ffaa00';
      default:
        return '#00d9ff';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const LogEntry = ({ log }: { log: Log }) => (
    <View style={styles.logEntry}>
      <MaterialIcons name={getLogIcon(log.level) as any} size={20} color={getLogColor(log.level)} />
      <View style={styles.logContent}>
        <Text style={styles.logTime}>{formatTime(log.timestamp)}</Text>
        <Text style={styles.logMessage}>{log.message}</Text>
      </View>
      <View style={[styles.logBadge, { borderColor: getLogColor(log.level) }]}>
        <Text style={[styles.logLevel, { color: getLogColor(log.level) }]}>
          {log.level.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <View style={styles.header}>
        <Text style={styles.title}>System Logs</Text>
        <Text style={styles.subtitle}>सभी गतिविधियां और alerts</Text>
      </View>

      {logs.length > 0 ? (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LogEntry log={item} />}
          contentContainerStyle={styles.logsList}
          scrollEnabled={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyState}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <MaterialIcons name="inbox" size={48} color="#666" />
          <Text style={styles.emptyText}>कोई logs नहीं</Text>
          <Text style={styles.emptySubtext}>
            सभी agents के logs यहाँ दिखेंगे
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d9ff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  logsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  logEntry: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  logContent: {
    flex: 1,
  },
  logTime: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  logMessage: {
    fontSize: 13,
    color: '#ddd',
    lineHeight: 18,
  },
  logBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  logLevel: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});
