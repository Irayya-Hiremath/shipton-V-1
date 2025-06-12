import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function CustomButton({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle
}) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const styles = createStyles(theme, variant, size, disabled || loading);

  return (
    <AnimatedTouchableOpacity
      style={[styles.button, animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={styles.text.color} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

const createStyles = (theme, variant, size, disabled) => {
  const variants = {
    primary: {
      backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
      textColor: theme.colors.white,
    },
    secondary: {
      backgroundColor: disabled ? theme.colors.border : theme.colors.secondary,
      textColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
    },
    success: {
      backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.success,
      textColor: theme.colors.white,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? theme.colors.border : theme.colors.primary,
      textColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
    }
  };

  const sizes = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 },
  };

  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  return StyleSheet.create({
    button: {
      backgroundColor: variantStyle.backgroundColor,
      borderWidth: variantStyle.borderWidth || 0,
      borderColor: variantStyle.borderColor || 'transparent',
      paddingVertical: sizeStyle.paddingVertical,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    text: {
      fontSize: sizeStyle.fontSize,
      fontFamily: theme.fonts.semiBold,
      color: variantStyle.textColor,
      letterSpacing: 0.5,
    },
  });
};