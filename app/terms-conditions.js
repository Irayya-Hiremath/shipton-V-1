import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, FileText } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import CustomButton from '@/components/CustomButton';

export default function TermsConditions() {
  const router = useRouter();
  const { theme } = useTheme();
  const [agreed, setAgreed] = useState(false);

  const styles = createStyles(theme);

  const handleContinue = () => {
    if (agreed) {
      router.push('/owner-details');
    }
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
        <View style={styles.titleContainer}>
          <FileText size={32} color={theme.colors.primary} />
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.subtitle}>
            Please read and accept our terms and conditions to continue with your registration
          </Text>
        </View>

        <ScrollView style={styles.termsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.termsContent}>
            <Text style={styles.sectionTitle}>SERVICES AGREEMENT</Text>
            
            <Text style={styles.termsText}>
              This Services Agreement ("Agreement") is made and executed between shipton and the Service Provider.
            </Text>

            <Text style={styles.sectionTitle}>1. DEFINITIONS</Text>
            <Text style={styles.termsText}>
              • "shipton" refers to the logistics platform operated by Smartshift Info Marketing Services Private Limited{'\n'}
              • "Service Provider" refers to the vehicle owner/driver who provides delivery services{'\n'}
              • "Platform" refers to the shipton mobile application and web platform
            </Text>

            <Text style={styles.sectionTitle}>2. SCOPE OF SERVICES</Text>
            <Text style={styles.termsText}>
              The Service Provider agrees to:{'\n'}
              • Provide transportation and delivery services through the shipton platform{'\n'}
              • Maintain valid licenses, insurance, and vehicle documentation{'\n'}
              • Comply with all applicable laws and regulations{'\n'}
              • Provide professional and courteous service to customers
            </Text>

            <Text style={styles.sectionTitle}>3. REQUIREMENTS</Text>
            <Text style={styles.termsText}>
              Service Provider must:{'\n'}
              • Possess valid driving license and vehicle registration{'\n'}
              • Maintain comprehensive vehicle insurance{'\n'}
              • Ensure vehicle is in good working condition{'\n'}
              • Complete identity verification process
            </Text>

            <Text style={styles.sectionTitle}>4. PAYMENT TERMS</Text>
            <Text style={styles.termsText}>
              • Payments will be processed according to shipton's payment schedule{'\n'}
              • Service fees and commissions will be deducted as per agreed rates{'\n'}
              • Tax obligations are the responsibility of the Service Provider
            </Text>

            <Text style={styles.sectionTitle}>5. TERMINATION</Text>
            <Text style={styles.termsText}>
              Either party may terminate this agreement with appropriate notice. shipton reserves the right to suspend or terminate services for violations of terms.
            </Text>

            <Text style={styles.sectionTitle}>6. LIABILITY</Text>
            <Text style={styles.termsText}>
              Service Provider is responsible for any damages or losses during service delivery. Adequate insurance coverage is mandatory.
            </Text>

            <Text style={styles.sectionTitle}>7. DATA PROTECTION</Text>
            <Text style={styles.termsText}>
              shipton is committed to protecting your personal data in accordance with applicable privacy laws. Your information will be used solely for service provision and platform operations.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.agreementContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkboxBox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I have read and agree to the{' '}
              <Text style={styles.linkText}>Terms and Conditions</Text>
              {' '}and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Accept and Continue"
          onPress={handleContinue}
          disabled={!agreed}
          style={styles.continueButton}
        />
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: 20,
    maxHeight: 300,
  },
  termsContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  termsText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  agreementContainer: {
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
  continueButton: {
    marginBottom: 20,
  },
});