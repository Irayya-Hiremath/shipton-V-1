import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Bell, Shield, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight, Moon, Sun, Monitor, Globe, Star } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SettingsTab() {
  const { theme, isDark, themeMode, setThemeMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const styles = createStyles(theme);

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor },
  ];

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const SettingItem = ({ icon: Icon, title, subtitle, onPress, rightElement, noBorder }) => (
    <TouchableOpacity
      style={[styles.settingItem, noBorder && styles.noBorder]}
      onPress={onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Icon size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
          }
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement || <ChevronRight size={20} color={theme.colors.textSecondary} />}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your shipton Partner experience</Text>
        </Animated.View>

        {/* Profile Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
          <SectionHeader title="Profile" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={User}
              title="Personal Information"
              subtitle="Update your profile details"
              onPress={() => console.log('Profile pressed')}
            />
            <SettingItem
              icon={Star}
              title="Rating & Reviews"
              subtitle="View your performance"
              onPress={() => console.log('Rating pressed')}
              noBorder
            />
          </View>
        </Animated.View>

        {/* Theme Section */}
        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
          <SectionHeader title="Appearance" />
          <View style={styles.settingsGroup}>
            <Text style={styles.themeLabel}>Theme</Text>
            <View style={styles.themeOptions}>
              {themeOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.themeOption,
                      themeMode === option.key && styles.themeOptionSelected
                    ]}
                    onPress={() => handleThemeChange(option.key)}
                  >
                    <IconComponent 
                      size={20} 
                      color={themeMode === option.key ? theme.colors.primary : theme.colors.textSecondary} 
                    />
                    <Text style={[
                      styles.themeOptionText,
                      themeMode === option.key && styles.themeOptionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Animated.View>

        {/* Notifications Section */}
        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.section}>
          <SectionHeader title="Notifications" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              subtitle="Order updates and alerts"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={notificationsEnabled ? theme.colors.white : theme.colors.textSecondary}
                />
              }
            />
            <SettingItem
              icon={Globe}
              title="Location Services"
              subtitle="Allow location tracking"
              rightElement={
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={locationEnabled ? theme.colors.white : theme.colors.textSecondary}
                />
              }
              noBorder
            />
          </View>
        </Animated.View>

        {/* Support Section */}
        <Animated.View entering={FadeInUp.delay(1000).duration(600)} style={styles.section}>
          <SectionHeader title="Support" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => console.log('Help pressed')}
            />
            <SettingItem
              icon={FileText}
              title="Terms & Conditions"
              subtitle="Read our terms and policies"
              onPress={() => console.log('Terms pressed')}
            />
            <SettingItem
              icon={Shield}
              title="Privacy Policy"
              subtitle="Learn about data protection"
              onPress={() => console.log('Privacy pressed')}
              noBorder
            />
          </View>
        </Animated.View>

        {/* Logout Section */}
        <Animated.View entering={FadeInUp.delay(1200).duration(600)} style={styles.section}>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={LogOut}
              title="Logout"
              subtitle="Sign out of your account"
              onPress={handleLogout}
              rightElement={<View />}
              noBorder
            />
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.version}>shipton Partner v1.0.0</Text>
        </View>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingsGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  settingRight: {
    marginLeft: 12,
  },
  themeLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    margin: 16,
    marginBottom: 12,
  },
  themeOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: theme.colors.background,
  },
  themeOptionSelected: {
    backgroundColor: theme.colors.secondary,
  },
  themeOptionText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  themeOptionTextSelected: {
    color: theme.colors.primary,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  version: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
});