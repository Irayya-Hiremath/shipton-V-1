import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, MapPin, Truck, Star, Clock, DollarSign } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import StatusCard from '@/components/StatusCard';
import StatCard from '@/components/StatCard';
import OrderCard from '@/components/OrderCard';

export default function HomeTab() {
  const { theme } = useTheme();
  const [isOnline, setIsOnline] = React.useState(true);
  
  const styles = createStyles(theme);

  const todayStats = [
    { icon: Truck, value: '12', label: 'Deliveries', color: theme.colors.primary },
    { icon: DollarSign, value: '₹850', label: 'Earnings', color: theme.colors.success },
    { icon: Star, value: '4.8', label: 'Rating', color: theme.colors.warning },
    { icon: Clock, value: '8h', label: 'Online', color: theme.colors.error },
  ];

  const recentOrders = [
    {
      id: 'ORD001234',
      pickup: 'MG Road, Bangalore',
      dropoff: 'Electronic City, Bangalore',
      amount: '120',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 'ORD001233',
      pickup: 'Koramangala, Bangalore',
      dropoff: 'Whitefield, Bangalore',
      amount: '180',
      time: 'Started 1 hour ago',
      status: 'in_progress'
    },
    {
      id: 'ORD001232',
      pickup: 'Indiranagar, Bangalore',
      dropoff: 'HSR Layout, Bangalore',
      amount: '95',
      time: 'Waiting for pickup',
      status: 'pending'
    }
  ];

  const handleToggleOnline = () => {
    Alert.alert(
      isOnline ? 'Go Offline' : 'Go Online',
      isOnline 
        ? 'You will stop receiving new delivery requests. Are you sure?' 
        : 'You will start receiving delivery requests in your area.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: isOnline ? 'Go Offline' : 'Go Online', 
          onPress: () => setIsOnline(!isOnline)
        },
      ]
    );
  };

  const handleStatPress = (label) => {
    Alert.alert('Statistics', `View detailed ${label.toLowerCase()} analytics`);
  };

  const handleOrderPress = (order) => {
    Alert.alert('Order Details', `View details for order ${order.id}`);
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You have 3 new notifications');
  };
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
        <StatusCard
          isOnline={isOnline}
          onToggle={handleToggleOnline}
          location="Bangalore, Karnataka"
        />

        {/* Quick Stats */}
        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsGrid}>
            {todayStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                onPress={() => handleStatPress(stat.label)}
                delay={600 + index * 100}
              />
            ))}
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={() => handleOrderPress(order)}
              delay={800 + index * 150}
            />
          ))}
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
  ordersContainer: {
    marginHorizontal: 20,
  },
});