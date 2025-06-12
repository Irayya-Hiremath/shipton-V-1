import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, MapPin, Truck, Star, Clock, DollarSign } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function HomeTab() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>S</Text>
                </View>
                <View>
                  <Text style={styles.welcomeText}>Welcome back!</Text>
                  <Text style={styles.userName}>shipton Partner</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color={theme.colors.white} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Status Card */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Online</Text>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleText}>Go Offline</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={theme.colors.textSecondary} />
            <Text style={styles.locationText}>Bangalore, Karnataka</Text>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Truck size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Deliveries</Text>
            </View>
            <View style={styles.statCard}>
              <DollarSign size={24} color={theme.colors.success} />
              <Text style={styles.statValue}>₹850</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
            <View style={styles.statCard}>
              <Star size={24} color={theme.colors.warning} />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color={theme.colors.error} />
              <Text style={styles.statValue}>8h</Text>
              <Text style={styles.statLabel}>Online</Text>
            </View>
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>#ORD001234</Text>
              <View style={[styles.orderStatus, styles.completedStatus]}>
                <Text style={styles.orderStatusText}>Completed</Text>
              </View>
            </View>
            <View style={styles.orderRoute}>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, styles.pickupDot]} />
                <Text style={styles.routeText}>MG Road, Bangalore</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, styles.dropDot]} />
                <Text style={styles.routeText}>Electronic City, Bangalore</Text>
              </View>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderAmount}>₹120</Text>
              <Text style={styles.orderTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>#ORD001233</Text>
              <View style={[styles.orderStatus, styles.pendingStatus]}>
                <Text style={styles.orderStatusText}>In Progress</Text>
              </View>
            </View>
            <View style={styles.orderRoute}>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, styles.pickupDot]} />
                <Text style={styles.routeText}>Koramangala, Bangalore</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, styles.dropDot]} />
                <Text style={styles.routeText}>Whitefield, Bangalore</Text>
              </View>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderAmount}>₹180</Text>
              <Text style={styles.orderTime}>Started 1 hour ago</Text>
            </View>
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
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  statusCard: {
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
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 8,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  toggleText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.error,
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
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  ordersContainer: {
    marginHorizontal: 20,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedStatus: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  pendingStatus: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  orderStatusText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.success,
  },
  orderRoute: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  pickupDot: {
    backgroundColor: theme.colors.primary,
  },
  dropDot: {
    backgroundColor: theme.colors.success,
  },
  routeText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.border,
    marginLeft: 4,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.success,
  },
  orderTime: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
});