import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Phone, MapPin, Truck, FileText, Star, Award, Calendar, Edit } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import ProfileHeader from '@/components/ProfileHeader';

export default function ProfileTab() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const styles = createStyles(theme);

  const userData = {
    name: 'Rajesh Kumar',
    phone: '+91 9902190190',
    location: 'Bangalore, Karnataka',
    rating: '4.8',
    totalDeliveries: '1,247',
    experience: '2 years',
    vehicleNumber: 'KA51D1944',
    vehicleType: '2W - Scooter',
    joinDate: 'January 2023',
  };

  const achievements = [
    { id: 1, title: 'Top Performer', description: 'Completed 100+ deliveries this month', icon: Award, color: theme.colors.warning },
    { id: 2, title: 'Customer Favorite', description: 'Maintained 4.8+ rating for 6 months', icon: Star, color: theme.colors.success },
    { id: 3, title: 'Reliable Partner', description: 'Zero cancellations this month', icon: Truck, color: theme.colors.primary },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality would be implemented here');
  };

  const handleAchievementPress = (achievement) => {
    Alert.alert(achievement.title, achievement.description);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <ProfileHeader user={userData} onEditPress={handleEditProfile} />

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Truck size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Vehicle Number</Text>
                <Text style={styles.infoValue}>{userData.vehicleNumber}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <FileText size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Vehicle Type</Text>
                <Text style={styles.infoValue}>{userData.vehicleType}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Calendar size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Partner Since</Text>
                <Text style={styles.infoValue}>{userData.joinDate}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => {
              const AchievementIcon = achievement.icon;
              return (
                <TouchableOpacity
                  key={achievement.id}
                  style={styles.achievementCard}
                  onPress={() => handleAchievementPress(achievement)}
                >
                  <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                    <AchievementIcon size={24} color={achievement.color} />
                  </View>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={20} color={theme.colors.primary} />
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FileText size={20} color={theme.colors.primary} />
              <Text style={styles.actionText}>Update Documents</Text>
            </TouchableOpacity>
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
    paddingBottom: 20,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
    marginLeft: 8,
  },
});