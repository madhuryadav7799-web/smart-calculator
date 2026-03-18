import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Calculator from '../utils/calculator';
import { Display } from '../components/Display';
import { KeyPad } from '../components/KeyPad';
import { History } from '../components/History';

export default function App() {
  const calculator = Calculator.getInstance();
  
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScientificMode, setIsScientificMode] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [history, setHistory] = useState(calculator.getHistory());

  const updateDisplay = () => {
    const state = calculator.getState();
    setDisplay(state.display);
    setMemory(state.memory);
    setHistory(calculator.getHistory());
  };

  const handleNumberPress = (num: string) => {
    calculator.inputNumber(num);
    updateDisplay();
  };

  const handleOperationPress = (op: string) => {
    calculator.handleOperation(op);
    updateDisplay();
  };

  const handleEqualsPress = () => {
    calculator.handleEquals();
    updateDisplay();
  };

  const handleScientificPress = (func: string) => {
    switch (func) {
      case 'sin':
        calculator.sin();
        break;
      case 'cos':
        calculator.cos();
        break;
      case 'tan':
        calculator.tan();
        break;
      case 'log':
        calculator.log();
        break;
      case 'ln':
        calculator.ln();
        break;
      case 'sqrt':
        calculator.sqrt();
        break;
      case 'square':
        calculator.square();
        break;
      case 'cube':
        calculator.cube();
        break;
      case 'toggle':
        calculator.toggleSign();
        break;
    }
    updateDisplay();
  };

  const handleMemoryPress = (action: string) => {
    const currentMemory = calculator.getMemory();
    switch (action) {
      case 'add':
        calculator.memoryAdd();
        Alert.alert('Memory', `M+ completed`);
        break;
      case 'subtract':
        calculator.memorySubtract();
        Alert.alert('Memory', `M- completed`);
        break;
      case 'recall':
        calculator.memoryRecall();
        break;
      case 'clear':
        calculator.memoryClear();
        Alert.alert('Memory', 'Memory cleared');
        break;
    }
    updateDisplay();
  };

  const handleClear = () => {
    calculator.clear();
    updateDisplay();
  };

  const handleDelete = () => {
    calculator.delete();
    updateDisplay();
  };

  const handleDecimal = () => {
    calculator.inputDecimal();
    updateDisplay();
  };

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(display);
    Alert.alert('Copied', `"${display}" copied to clipboard`);
  };

  const handleClearHistory = () => {
    calculator.clearHistory();
    setHistory([]);
  };

  const handleSelectHistoryItem = (value: string) => {
    calculator.clear();
    const parts = value.split('.');
    calculator.inputNumber(parts[0]);
    if (parts.length > 1) {
      calculator.inputDecimal();
      calculator.inputNumber(parts[1]);
    }
    updateDisplay();
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    calculator.toggleTheme();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    },
    headerButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    display: {
      flex: 0.15,
    },
    keypad: {
      flex: 0.85,
    },
    copyButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    },
    copyButtonText: {
      fontSize: 12,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SmartCalc</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsScientificMode(!isScientificMode)}
            >
              <Text style={styles.headerButtonText}>
                {isScientificMode ? 'Basic' : 'Sci'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={toggleTheme}
            >
              <Text style={styles.headerButtonText}>
                {isDarkMode ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyToClipboard}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.display}>
          <Display
            value={display}
            memory={memory}
            isDarkMode={isDarkMode}
          />
        </View>

        <View style={styles.keypad}>
          <KeyPad
            onNumberPress={handleNumberPress}
            onOperationPress={handleOperationPress}
            onEqualsPress={handleEqualsPress}
            onScientificPress={handleScientificPress}
            onMemoryPress={handleMemoryPress}
            onClear={handleClear}
            onDelete={handleDelete}
            onDecimal={handleDecimal}
            isDarkMode={isDarkMode}
            isScientificMode={isScientificMode}
            showHistory={() => setShowHistoryModal(true)}
          />
        </View>

        <History
          visible={showHistoryModal}
          history={history}
          isDarkMode={isDarkMode}
          onClose={() => setShowHistoryModal(false)}
          onSelectItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
        />
      </SafeAreaView>
    </View>
  );
}
