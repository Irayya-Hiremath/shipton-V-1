import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, CheckCheck, Filter } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import NotificationCard from '@/components/NotificationCard';

const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Available',
    message: 'A new delivery order is available in your area. Pickup from MG Road.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'You have received ₹120 for order #ORD001234. Amount credited to your account.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Completed',
    message: 'Order #ORD001233 has been successfully completed. Customer rating: 5 stars.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Document Verification',
    message: 'Your driving license verification is pending. Please upload a clear photo.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'payment',
    title: 'Weekly Earnings',
    message: 'Your weekly earnings summary is ready. Total earned: ₹2,450 this week.',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsTab() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, orders, payments

  const styles = createStyles(theme);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification.id);
  };

  const handleMarkAllRead = () => {
    console.log('Mark all as read');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'orders') return notification.type === 'order';
    if (filter === 'payments') return notification.type === 'payment';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

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
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <View style={styles.titleContainer}>
            <Bell size={24} color={theme.colors.primary} />
            <Text style={styles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllRead}>
            <CheckCheck size={20} color={theme.colors.primary} />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'orders', label: 'Orders' },
              { key: 'payments', label: 'Payments' },
            ].map((filterOption) => (
              <TouchableOpacity
                key={filterOption.key}
                style={[
                  styles.filterButton,
                  filter === filterOption.key && styles.filterButtonActive
                ]}
                onPress={() => setFilter(filterOption.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filter === filterOption.key && styles.filterButtonTextActive
                ]}>
                  {filterOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <View style={styles.notificationsContainer}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={() => handleNotificationPress(notification)}
                delay={600 + index * 100}
              />
            ))
          ) : (
            <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.emptyContainer}>
              <Bell size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyMessage}>
                {filter === 'unread' 
                  ? 'All caught up! No unread notifications.' 
                  : 'You have no notifications at the moment.'}
              </Text>
            </Animated.View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginLeft: 12,
  },
  badge: {
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markAllText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScroll: {
    paddingRight: 20,
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  filterButtonTextActive: {
    color: theme.colors.white,
  },
  notificationsContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});