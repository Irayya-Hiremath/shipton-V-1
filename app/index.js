import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/phone-verification');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.brandText}>shipton</Text>
          <Text style={styles.partnerText}>Partner</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.taglineContainer}>
          <Text style={styles.tagline}>Your delivery partner journey starts here</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  brandText: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  partnerText: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  taglineContainer: {
    paddingHorizontal: 40,
  },
  tagline: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
});