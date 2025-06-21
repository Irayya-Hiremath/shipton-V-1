import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import CustomButton from '@/components/CustomButton';
import CountrySelector from '@/components/CountrySelector';

export default function PhoneVerification() {
  const router = useRouter();
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToTDS, setAgreedToTDS] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳'
  });

  const styles = createStyles(theme);

  const handleLogin = () => {
    if (phoneNumber.length === 10 && agreedToTerms && agreedToTDS) {
      router.push('/otp-verification');
    }
  };

  const isFormValid = phoneNumber.length === 10 && agreedToTerms && agreedToTDS;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.brandText}>shipton</Text>
            <Text style={styles.partnerText}>Partner</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.form}>
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />

          <View style={styles.phoneContainer}>
            <Text style={styles.label}>Mobile number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>{selectedCountry.dialCode}</Text>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter mobile number"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                I have read and agreed to{' '}
                <Text style={styles.linkText}>Terms and Conditions</Text>
                {' '}and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgreedToTDS(!agreedToTDS)}
            >
              <View style={[styles.checkboxBox, agreedToTDS && styles.checkboxChecked]}>
                {agreedToTDS && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                I have read and hereby provide my consent on the{' '}
                <Text style={styles.linkText}>TDS Declaration</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="LOGIN"
            onPress={handleLogin}
            disabled={!isFormValid}
            style={styles.loginButton}
          />

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Need help? Contact our support team for assistance with registration.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  brandText: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  partnerText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  form: {
    // flex: 1,
    paddingLeft:20,
    width:'100%',
  },
  phoneContainer: {
    marginVertical: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
    paddingBottom: 8,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginRight: 12,
    minWidth: 40,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    paddingVertical: 8,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    lineHeight: 20,
  },
  linkText: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 24,
  },
  helpContainer: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});