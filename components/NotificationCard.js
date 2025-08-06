import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Package, DollarSign, TriangleAlert as AlertTriangle, Info } from 'lucide-react-native';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function NotificationCard({ notification, onPress, delay = 0 }) {
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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return Package;
      case 'payment':
        return DollarSign;
      case 'alert':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return theme.colors.primary;
      case 'payment':
        return theme.colors.success;
      case 'alert':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const NotificationIcon = getNotificationIcon(notification.type);
  const iconColor = getNotificationColor(notification.type);

  const styles = createStyles(theme);

  return (
    <AnimatedTouchableOpacity
      entering={FadeInRight.delay(delay).duration(600)}
      style={[styles.container, animatedStyle, !notification.read && styles.unread]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <NotificationIcon size={20} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </AnimatedTouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
  },
});