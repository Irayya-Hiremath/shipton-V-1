import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { DollarSign, TrendingUp, Calendar, Download, Filter } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import EarningsCard from '@/components/EarningsCard';

export default function EarningsTab() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const styles = createStyles(theme);

  const earningsData = [
    { period: 'Today', amount: '850', change: '+12%', trend: 'up' },
    { period: 'This Week', amount: '4,250', change: '+8%', trend: 'up' },
    { period: 'This Month', amount: '18,500', change: '-3%', trend: 'down' },
    { period: 'Last Month', amount: '19,100', change: '+15%', trend: 'up' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleEarningsPress = (period) => {
    console.log('View detailed earnings for:', period);
  };

  const handleDownloadReport = () => {
    console.log('Download earnings report');
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
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <View style={styles.titleContainer}>
            <DollarSign size={24} color={theme.colors.success} />
            <Text style={styles.title}>Earnings</Text>
          </View>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadReport}>
            <Download size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Total Earnings</Text>
            <View style={styles.trendContainer}>
              <TrendingUp size={16} color={theme.colors.success} />
              <Text style={styles.trendText}>+8% this week</Text>
            </View>
          </View>
          <Text style={styles.totalAmount}>₹4,250</Text>
          <Text style={styles.summarySubtitle}>This week • 12 deliveries completed</Text>
        </Animated.View>

        <View style={styles.earningsContainer}>
          <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
          {earningsData.map((earning, index) => (
            <EarningsCard
              key={earning.period}
              period={earning.period}
              amount={earning.amount}
              change={earning.change}
              trend={earning.trend}
              onPress={() => handleEarningsPress(earning.period)}
              delay={600 + index * 100}
            />
          ))}
        </View>

        <Animated.View entering={FadeInUp.delay(1000).duration(600)} style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Peak Hours</Text>
            <Text style={styles.insightText}>
              You earn most between 6-9 PM. Consider staying online during these hours for maximum earnings.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Weekly Goal</Text>
            <Text style={styles.insightText}>
              You're 85% towards your weekly goal of ₹5,000. Just ₹750 more to go!
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
  downloadButton: {
    backgroundColor: theme.colors.secondary,
    padding: 12,
    borderRadius: 24,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.success}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.success,
    marginLeft: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  earningsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 16,
  },
  insightsContainer: {
    marginBottom: 24,
  },
  insightCard: {
    backgroundColor: theme.colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});