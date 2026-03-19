import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

interface AgentStatus {
  youtube: boolean;
  jarvis: boolean;
  browser: boolean;
}

export default function Agents() {
  const [agents, setAgents] = useState<AgentStatus>({
    youtube: false,
    jarvis: false,
    browser: false,
  });
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchAgentStatus = async () => {
    const status = await apiService.getSystemStatus();
    setAgents(status.agents);
  };

  const handleAgentToggle = async (agentName: 'youtube' | 'jarvis' | 'browser') => {
    setLoading({ ...loading, [agentName]: true });

    const isActive = agents[agentName];
    const success = isActive
      ? await apiService.stopAgent(agentName)
      : await apiService.startAgent(agentName);

    if (success) {
      setAgents({
        ...agents,
        [agentName]: !isActive,
      });
      const action = isActive ? 'बंद किया' : 'शुरू किया';
      Alert.alert('सफल', `${agentName} ${action} गया! ✓`);
    } else {
      Alert.alert('त्रुटि', `${agentName} को नियंत्रित करने में विफल। कृपया दोबारा प्रयास करें।`);
    }

    setLoading({ ...loading, [agentName]: false });
  };

  const AgentCard = ({
    name,
    icon,
    isActive,
    agentKey,
  }: {
    name: string;
    icon: string;
    isActive: boolean;
    agentKey: 'youtube' | 'jarvis' | 'browser';
  }) => (
    <View style={styles.agentCard}>
      <View style={styles.agentCardHeader}>
        <MaterialIcons name={icon as any} size={36} color="#00d9ff" />
        <Text style={styles.agentName}>{name}</Text>
      </View>

      <View style={styles.agentStatusSection}>
        <View style={[styles.statusBadge, isActive && styles.statusBadgeActive]}>
          <Text style={styles.statusText}>{isActive ? 'चल रहा है' : 'बंद'}</Text>
        </View>
        <Text style={styles.statusDescription}>
          {isActive ? '✓ Active' : '✗ Inactive'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.controlButton,
          isActive ? styles.stopButton : styles.startButton,
          loading[agentKey] && styles.buttonDisabled,
        ]}
        onPress={() => handleAgentToggle(agentKey)}
        disabled={loading[agentKey]}
      >
        {loading[agentKey] ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialIcons
              name={isActive ? 'stop' : 'play-arrow'}
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>{isActive ? 'बंद करें' : 'शुरू करें'}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>एजेंट्स को नियंत्रित करें</Text>
          <Text style={styles.subtitle}>Manage Your Intelligent Agents</Text>
        </View>

        {/* Agent Cards */}
        <View style={styles.cardsContainer}>
          <AgentCard
            name="YouTube Agent"
            icon="play-circle"
            isActive={agents.youtube}
            agentKey="youtube"
          />
          <AgentCard
            name="Jarvis AI"
            icon="smart-toy"
            isActive={agents.jarvis}
            agentKey="jarvis"
          />
          <AgentCard
            name="Browser Bot"
            icon="language"
            isActive={agents.browser}
            agentKey="browser"
          />
        </View>

        {/* Safety Info */}
        <View style={styles.safetyBox}>
          <MaterialIcons name="security" size={20} color="#ffaa00" />
          <Text style={styles.safetyText}>
            केवल localhost:3000 से जुड़ता है। कोई बाहरी डेटा नहीं।
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Tip: Dashboard में real-time status देखें।
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d9ff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  agentCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  agentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  agentStatusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
  },
  statusBadgeActive: {
    backgroundColor: '#004d4d',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00d9ff',
  },
  statusDescription: {
    fontSize: 12,
    color: '#666',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#004d99',
  },
  stopButton: {
    backgroundColor: '#990000',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  safetyBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#333300',
  },
  safetyText: {
    flex: 1,
    fontSize: 12,
    color: '#ffaa00',
  },
  footer: {
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});
