import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, MapPin, Truck } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ProfileHeader({ user, onEditPress }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.onlineIndicator} />
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Star size={16} color={theme.colors.white} />
            <Text style={styles.statValue}>{user.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Truck size={16} color={theme.colors.white} />
            <Text style={styles.statValue}>{user.totalDeliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  gradient: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});