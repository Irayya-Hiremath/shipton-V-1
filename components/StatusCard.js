import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Circle } from 'lucide-react-native';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function StatusCard({ isOnline, onToggle, location }) {
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

  const styles = createStyles(theme);

  return (
    <Animated.View entering={FadeInRight.delay(400).duration(600)} style={styles.container}>
      <View style={styles.statusHeader}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusIndicator, { backgroundColor: isOnline ? theme.colors.success : theme.colors.error }]} />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            style={[styles.toggleButton, { borderColor: isOnline ? theme.colors.error : theme.colors.success }]}
            onPress={onToggle}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={[styles.toggleText, { color: isOnline ? theme.colors.error : theme.colors.success }]}>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.locationContainer}>
        <MapPin size={16} color={theme.colors.textSecondary} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </Animated.View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});