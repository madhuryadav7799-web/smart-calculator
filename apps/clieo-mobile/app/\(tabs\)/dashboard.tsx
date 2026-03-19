import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

interface SystemStatus {
  cpu: number;
  memory: number;
  agents: {
    youtube: boolean;
    jarvis: boolean;
    browser: boolean;
  };
  timestamp: number;
}

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    cpu: 0,
    memory: 0,
    agents: { youtube: false, jarvis: false, browser: false },
    timestamp: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    const data = await apiService.getSystemStatus();
    setStatus(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStatus();
    setRefreshing(false);
  };

  const StatBox = ({
    label,
    value,
    unit,
    icon,
  }: {
    label: string;
    value: number;
    unit: string;
    icon: string;
  }) => (
    <View style={styles.statBox}>
      <MaterialIcons name={icon as any} size={32} color="#00d9ff" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>
        {value}
        <Text style={styles.statUnit}>{unit}</Text>
      </Text>
    </View>
  );

  const AgentStatus = ({ name, isActive }: { name: string; isActive: boolean }) => (
    <View style={styles.agentStatusBox}>
      <View style={styles.agentStatusContent}>
        <Text style={styles.agentName}>{name}</Text>
        <Text style={styles.agentStatus}>
          {isActive ? '🟢 चल रहा है' : '⚫ बंद है'}
        </Text>
      </View>
      <View style={[styles.statusDot, isActive && styles.statusDotActive]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Clieo 2.0</Text>
          <Text style={styles.subtitle}>Status Dashboard</Text>
        </View>

        {/* System Status Cards */}
        <View style={styles.statsContainer}>
          <StatBox label="CPU Usage" value={status.cpu} unit="%" icon="speed" />
          <StatBox label="Memory" value={status.memory} unit="%" icon="memory" />
        </View>

        {/* Agents Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>एजेंट्स की स्थिति</Text>
          <View style={styles.agentsContainer}>
            <AgentStatus name="🎥 YouTube Agent" isActive={status.agents.youtube} />
            <AgentStatus name="🤖 Jarvis AI" isActive={status.agents.jarvis} />
            <AgentStatus name="🌐 Browser Bot" isActive={status.agents.browser} />
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#00d9ff" />
          <Text style={styles.infoText}>
            Real-time updates हर 5 सेकंड में। Pull करके refresh करें।
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d9ff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statUnit: {
    fontSize: 14,
    color: '#00d9ff',
    marginLeft: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d9ff',
    marginBottom: 12,
  },
  agentsContainer: {
    gap: 8,
  },
  agentStatusBox: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  agentStatusContent: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  agentStatus: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555',
  },
  statusDotActive: {
    backgroundColor: '#00d9ff',
  },
  infoBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#888',
  },
});
