import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from './Button';

interface KeyPadProps {
  onNumberPress: (num: string) => void;
  onOperationPress: (op: string) => void;
  onEqualsPress: () => void;
  onScientificPress: (func: string) => void;
  onMemoryPress: (action: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onDecimal: () => void;
  isDarkMode: boolean;
  isScientificMode: boolean;
  showHistory: () => void;
}

export const KeyPad: React.FC<KeyPadProps> = ({
  onNumberPress,
  onOperationPress,
  onEqualsPress,
  onScientificPress,
  onMemoryPress,
  onClear,
  onDelete,
  onDecimal,
  isDarkMode,
  isScientificMode,
  showHistory,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    scientificSection: {
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#ddd',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 12,
    },
  });

  if (isScientificMode) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.scientificSection}>
          <View style={styles.row}>
            <Button
              label="sin"
              onPress={() => onScientificPress('sin')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="cos"
              onPress={() => onScientificPress('cos')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="tan"
              onPress={() => onScientificPress('tan')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="log"
              onPress={() => onScientificPress('log')}
              type="function"
              isDarkMode={isDarkMode}
            />
          </View>
          <View style={styles.row}>
            <Button
              label="ln"
              onPress={() => onScientificPress('ln')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="√"
              onPress={() => onScientificPress('sqrt')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="x²"
              onPress={() => onScientificPress('square')}
              type="function"
              isDarkMode={isDarkMode}
            />
            <Button
              label="x³"
              onPress={() => onScientificPress('cube')}
              type="function"
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        <View style={styles.scientificSection}>
          <View style={styles.row}>
            <Button
              label="M+"
              onPress={() => onMemoryPress('add')}
              type="memory"
              isDarkMode={isDarkMode}
            />
            <Button
              label="M-"
              onPress={() => onMemoryPress('subtract')}
              type="memory"
              isDarkMode={isDarkMode}
            />
            <Button
              label="MR"
              onPress={() => onMemoryPress('recall')}
              type="memory"
              isDarkMode={isDarkMode}
            />
            <Button
              label="MC"
              onPress={() => onMemoryPress('clear')}
              type="memory"
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Button
            label="C"
            onPress={onClear}
            type="function"
            isDarkMode={isDarkMode}
          />
          <Button
            label="⌫"
            onPress={onDelete}
            type="function"
            isDarkMode={isDarkMode}
          />
          <Button
            label="Hist"
            onPress={showHistory}
            type="function"
            isDarkMode={isDarkMode}
          />
          <Button
            label="÷"
            onPress={() => onOperationPress('÷')}
            type="operator"
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.row}>
          <Button
            label="7"
            onPress={() => onNumberPress('7')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="8"
            onPress={() => onNumberPress('8')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="9"
            onPress={() => onNumberPress('9')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="×"
            onPress={() => onOperationPress('×')}
            type="operator"
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.row}>
          <Button
            label="4"
            onPress={() => onNumberPress('4')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="5"
            onPress={() => onNumberPress('5')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="6"
            onPress={() => onNumberPress('6')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="-"
            onPress={() => onOperationPress('-')}
            type="operator"
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.row}>
          <Button
            label="1"
            onPress={() => onNumberPress('1')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="2"
            onPress={() => onNumberPress('2')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="3"
            onPress={() => onNumberPress('3')}
            isDarkMode={isDarkMode}
          />
          <Button
            label="+"
            onPress={() => onOperationPress('+')}
            type="operator"
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.row}>
          <Button
            label="0"
            onPress={() => onNumberPress('0')}
            isDarkMode={isDarkMode}
            wide
          />
          <Button
            label="."
            onPress={onDecimal}
            isDarkMode={isDarkMode}
          />
          <Button
            label="="
            onPress={onEqualsPress}
            type="equals"
            isDarkMode={isDarkMode}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          label="C"
          onPress={onClear}
          type="function"
          isDarkMode={isDarkMode}
        />
        <Button
          label="⌫"
          onPress={onDelete}
          type="function"
          isDarkMode={isDarkMode}
        />
        <Button
          label="±"
          onPress={() => onScientificPress('toggle')}
          type="function"
          isDarkMode={isDarkMode}
        />
        <Button
          label="÷"
          onPress={() => onOperationPress('÷')}
          type="operator"
          isDarkMode={isDarkMode}
        />
      </View>
      <View style={styles.row}>
        <Button
          label="7"
          onPress={() => onNumberPress('7')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="8"
          onPress={() => onNumberPress('8')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="9"
          onPress={() => onNumberPress('9')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="×"
          onPress={() => onOperationPress('×')}
          type="operator"
          isDarkMode={isDarkMode}
        />
      </View>
      <View style={styles.row}>
        <Button
          label="4"
          onPress={() => onNumberPress('4')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="5"
          onPress={() => onNumberPress('5')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="6"
          onPress={() => onNumberPress('6')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="-"
          onPress={() => onOperationPress('-')}
          type="operator"
          isDarkMode={isDarkMode}
        />
      </View>
      <View style={styles.row}>
        <Button
          label="1"
          onPress={() => onNumberPress('1')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="2"
          onPress={() => onNumberPress('2')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="3"
          onPress={() => onNumberPress('3')}
          isDarkMode={isDarkMode}
        />
        <Button
          label="+"
          onPress={() => onOperationPress('+')}
          type="operator"
          isDarkMode={isDarkMode}
        />
      </View>
      <View style={styles.row}>
        <Button
          label="0"
          onPress={() => onNumberPress('0')}
          isDarkMode={isDarkMode}
          wide
        />
        <Button
          label="."
          onPress={onDecimal}
          isDarkMode={isDarkMode}
        />
        <Button
          label="="
          onPress={onEqualsPress}
          type="equals"
          isDarkMode={isDarkMode}
        />
      </View>
    </View>
  );
};
