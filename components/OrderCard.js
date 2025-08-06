import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Clock, DollarSign } from 'lucide-react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function OrderCard({ order, onPress, delay = 0 }) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      case 'pending':
        return theme.colors.primary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

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
        <Text style={styles.orderId}>#{order.id}</Text>
        <View style={[styles.status, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.route}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.pickupDot]} />
          <Text style={styles.routeText}>{order.pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.dropDot]} />
          <Text style={styles.routeText}>{order.dropoff}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.amount}>
          <DollarSign size={16} color={theme.colors.success} />
          <Text style={styles.amountText}>₹{order.amount}</Text>
        </View>
        <View style={styles.time}>
          <Clock size={16} color={theme.colors.textSecondary} />
          <Text style={styles.timeText}>{order.time}</Text>
        </View>
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
  orderId: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  route: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  pickupDot: {
    backgroundColor: theme.colors.primary,
  },
  dropDot: {
    backgroundColor: theme.colors.success,
  },
  routeText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    flex: 1,
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.border,
    marginLeft: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.success,
    marginLeft: 4,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});