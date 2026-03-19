import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Task } from '../stores/plannerStore';
import { COLORS, getTheme } from '../utils/colors';

interface TaskCardProps {
  task: Task;
  darkMode: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  darkMode,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const theme = getTheme(darkMode);

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => onDelete(task.id),
        style: 'destructive',
      },
    ]);
  };

  const priorityColor =
    task.priority === 'high'
      ? COLORS.danger
      : task.priority === 'medium'
      ? COLORS.warning
      : COLORS.success;

  return (
    <View
      style={{
        backgroundColor: theme.bgSecondary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: priorityColor,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            backgroundColor: task.completed ? COLORS.primary : theme.bgTertiary,
            borderWidth: 2,
            borderColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {task.completed && (
            <Text style={{ color: '#000', fontWeight: 'bold' }}>✓</Text>
          )}
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
              textDecorationLine: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text
              style={{
                fontSize: 14,
                color: theme.textSecondary,
                marginTop: 4,
              }}
            >
              {task.description}
            </Text>
          )}
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => onEdit(task)}
            style={{
              padding: 8,
              backgroundColor: theme.bgTertiary,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: COLORS.primary, fontWeight: '600' }}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              padding: 8,
              backgroundColor: theme.bgTertiary,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: COLORS.danger, fontWeight: '600' }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
