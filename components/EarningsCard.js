import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function EarningsCard({ period, amount, change, trend, onPress, delay = 0 }) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? theme.colors.success : theme.colors.error;

  const styles = createStyles(theme);

  return (
    <AnimatedTouchableOpacity
      entering={FadeInUp.delay(delay).duration(600)}
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.periodContainer}>
          <Calendar size={16} color={theme.colors.textSecondary} />
          <Text style={styles.period}>{period}</Text>
        </View>
        <View style={[styles.changeContainer, { backgroundColor: `${trendColor}20` }]}>
          <TrendIcon size={14} color={trendColor} />
          <Text style={[styles.change, { color: trendColor }]}>{change}</Text>
        </View>
      </View>
      
      <View style={styles.amountContainer}>
        <DollarSign size={20} color={theme.colors.primary} />
        <Text style={styles.amount}>₹{amount}</Text>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  period: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  change: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    marginLeft: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginLeft: 8,
  },
});