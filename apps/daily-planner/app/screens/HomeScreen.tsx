import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { usePlannerStore } from '../stores/plannerStore';
import { ProgressBar } from '../components/ProgressBar';
import { QuoteCard } from '../components/QuoteCard';
import { COLORS, getTheme } from '../utils/colors';
import { getDailyQuote } from '../utils/quotes';

export const HomeScreen: React.FC = () => {
  const {
    tasks,
    darkMode,
    loadTasks,
    getTodaysTasks,
    getCompletionPercentage,
  } = usePlannerStore();

  useEffect(() => {
    loadTasks();
  }, []);

  const todaysTasks = getTodaysTasks();
  const completionPercentage = getCompletionPercentage();
  const quote = getDailyQuote();
  const theme = getTheme(darkMode);

  const completedCount = todaysTasks.filter((t) => t.completed).length;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've completed ${completedCount} out of ${todaysTasks.length} tasks today! 🎯 Aaj ke tasks poore kiye! 💪 #DailyPlanner #Hinglish`,
        title: 'Daily Planner Progress',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.bg,
      }}
    >
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 4,
            }}
          >
            आज का दिन 🌅
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.textSecondary,
            }}
          >
            {new Date().toLocaleDateString('hi-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Completion Stats */}
        <View
          style={{
            backgroundColor: theme.bgSecondary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: theme.text,
              }}
            >
              आज का Progress
            </Text>
            {todaysTasks.length > 0 && (
              <TouchableOpacity
                onPress={handleShare}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: COLORS.primary,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '600',
                    fontSize: 12,
                  }}
                >
                  Share ✨
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <ProgressBar percentage={completionPercentage} darkMode={darkMode} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: theme.border,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: COLORS.primary,
                }}
              >
                {completedCount}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.textSecondary,
                  marginTop: 4,
                }}
              >
                Complete
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: COLORS.warning,
                }}
              >
                {todaysTasks.length - completedCount}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.textSecondary,
                  marginTop: 4,
                }}
              >
                Pending
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: COLORS.success,
                }}
              >
                {todaysTasks.length}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.textSecondary,
                  marginTop: 4,
                }}
              >
                Total
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Quote */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 12,
            }}
          >
            आज की प्रेरणा 💪
          </Text>
          <QuoteCard
            text={quote.text}
            author={quote.author}
            darkMode={darkMode}
          />
        </View>

        {/* Today's Tasks Preview */}
        {todaysTasks.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: theme.text,
                marginBottom: 12,
              }}
            >
              आज के Tasks ({todaysTasks.length})
            </Text>
            {todaysTasks.slice(0, 3).map((task) => (
              <View
                key={task.id}
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    backgroundColor: task.completed
                      ? COLORS.primary
                      : theme.bgTertiary,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: theme.text,
                    textDecorationLine: task.completed
                      ? 'line-through'
                      : 'none',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  {task.title}
                </Text>
              </View>
            ))}
            {todaysTasks.length > 3 && (
              <Text
                style={{
                  fontSize: 12,
                  color: theme.textSecondary,
                  marginTop: 8,
                }}
              >
                +{todaysTasks.length - 3} more tasks
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
