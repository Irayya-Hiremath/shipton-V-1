import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Check } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const languages = [
  { code: 'hi', name: 'हिंदी', native: 'Hindi' },
  { code: 'kn', name: 'ಕನ್ನಡ', native: 'Kannada' },
  { code: 'ta', name: 'தமிழ்', native: 'Tamil' },
  { code: 'te', name: 'తెలుగు', native: 'Telugu' },
  { code: 'mr', name: 'मराठी', native: 'Marathi' },
  { code: 'ml', name: 'മലയാളം', native: 'Malayalam' },
  { code: 'en', name: 'English', native: 'English' },
];

export default function LanguageSelection() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const styles = createStyles(theme);

  const handleContinue = () => {
    router.push('/terms-conditions');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.brandText}>shipton</Text>
          <Text style={styles.partnerText}>Partner</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.content}>
        <Text style={styles.title}>Select your app language</Text>

        <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.code && styles.languageItemSelected
              ]}
              onPress={() => setSelectedLanguage(language.code)}
            >
              <View style={styles.languageContent}>
                <Text style={styles.languageName}>{language.name}</Text>
                {language.native !== language.name && (
                  <Text style={styles.languageNative}>({language.native})</Text>
                )}
              </View>
              {selectedLanguage === language.code && (
                <Check size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  brandText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  partnerText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  languageList: {
    flex: 1,
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 1,
    backgroundColor: theme.colors.surface,
  },
  languageItemSelected: {
    backgroundColor: theme.colors.secondary,
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
  },
  languageNative: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
});