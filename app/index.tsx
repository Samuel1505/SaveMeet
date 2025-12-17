import { useAuth } from '@/context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/login' as any);
    }
  }, [user, loading, router]);
  
  // Get user's name from metadata (full_name is set during registration)
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const firstName = userName.split(' ')[0]; // Get first name only
  
  if (loading || !user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  // Mock data - replace with actual data from your backend
  const contributionBalance = 15000.00;
  const contributionAmount = 7000.00;
  const quickSavingsAmount = 4500.00;
  const rewardsAmount = 3500.00;
  const netWorth = contributionBalance;

  const pieChartData = [
    {
      name: 'Contribution',
      amount: contributionAmount,
      color: '#FF9800',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Quick Savings',
      amount: quickSavingsAmount,
      color: '#9C27B0',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Rewards',
      amount: rewardsAmount,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>{firstName.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.greeting}>Hi, {firstName}</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <MaterialIcons name="notifications" size={24} color="#333" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Contribution Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Contribution Balance</Text>
          <Text style={styles.balanceAmount}>₦{contributionBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          <TouchableOpacity style={styles.startContributionButton}>
            <MaterialIcons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.startContributionText}>Start Contribution</Text>
          </TouchableOpacity>
          {/* Carousel dots */}
          <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Action Icons */}
        <View style={styles.actionIcons}>
          <TouchableOpacity style={styles.actionIcon}>
            <View style={styles.actionIconCircle}>
              <MaterialIcons name="account-balance-wallet" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.actionIconLabel}>CONTRIBUTIONS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionIcon}>
            <View style={styles.actionIconCircle}>
              <MaterialIcons name="payment" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.actionIconLabel}>PAY BILL</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionIcon}>
            <View style={styles.actionIconCircle}>
              <MaterialIcons name="card-giftcard" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.actionIconLabel}>REFERRAL</Text>
          </TouchableOpacity>
        </View>

        {/* Financial Overview */}
        <View style={styles.chartContainer}>
          <PieChart
            data={pieChartData}
            width={width - 48}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          
          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Contribution</Text>
              <Text style={styles.legendAmount}>₦{contributionAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#9C27B0' }]} />
              <Text style={styles.legendText}>Quick Savings</Text>
              <Text style={styles.legendAmount}>₦{quickSavingsAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Rewards</Text>
              <Text style={styles.legendAmount}>₦{rewardsAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>
          
          <View style={styles.netWorthContainer}>
            <Text style={styles.netWorthLabel}>Net Worth</Text>
            <Text style={styles.netWorthAmount}>₦{netWorth.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
        </View>

        {/* TO-DO List */}
        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>TO-DO List</Text>
          <View style={styles.todoItem}>
            <View style={styles.todoContent}>
              <Text style={styles.todoItemTitle}>Complete setup</Text>
              <Text style={styles.todoItemDescription}>Get the most out of your Cloud Cooperative account</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#4CAF50" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="savings" size={24} color="#9E9E9E" />
          <Text style={styles.navLabel}>SAVINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="account-balance" size={24} color="#9E9E9E" />
          <Text style={styles.navLabel}>LOAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color="#9E9E9E" />
          <Text style={styles.navLabel}>SETTINGS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  notificationIcon: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startContributionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startContributionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  carouselDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionIcon: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconLabel: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  legend: {
    marginTop: 20,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  netWorthContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  netWorthLabel: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  netWorthAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  todoContainer: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  todoContent: {
    flex: 1,
  },
  todoItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  todoItemDescription: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  navLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
