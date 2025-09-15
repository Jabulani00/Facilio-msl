import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function RentCollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState({});

  const payments = [
    {
      id: 1,
      tenantName: 'John Doe',
      unit: 'Unit 1A',
      property: 'Sunset Apartments',
      amount: 8500,
      dueDate: '2024-01-01',
      status: 'paid',
      paidDate: '2023-12-28',
      method: 'Bank Transfer',
    },
    {
      id: 2,
      tenantName: 'Jane Smith',
      unit: 'Unit 2A',
      property: 'Sunset Apartments',
      amount: 12000,
      dueDate: '2024-01-01',
      status: 'overdue',
      paidDate: null,
      method: null,
    },
    {
      id: 3,
      tenantName: 'Mike Johnson',
      unit: 'Unit 3A',
      property: 'Garden Complex',
      amount: 9000,
      dueDate: '2024-01-01',
      status: 'pending',
      paidDate: null,
      method: null,
    },
    {
      id: 4,
      tenantName: 'Sarah Wilson',
      unit: 'Unit 1B',
      property: 'Sunset Apartments',
      amount: 6500,
      dueDate: '2024-01-01',
      status: 'paid',
      paidDate: '2023-12-30',
      method: 'EFT',
    },
    {
      id: 5,
      tenantName: 'David Brown',
      unit: 'Unit 2B',
      property: 'Sunset Apartments',
      amount: 8500,
      dueDate: '2024-01-01',
      status: 'overdue',
      paidDate: null,
      method: null,
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [280000, 290000, 310000, 300000, 320000, 314000],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
      },
    ],
  };

  const statusData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    data: [2, 1, 2],
    colors: ['#059669', '#d97706', '#dc2626'],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || payment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalCollected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#059669';
      case 'pending': return '#d97706';
      case 'overdue': return '#dc2626';
      default: return '#64748b';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'paid':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      case 'pending':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      case 'overdue':
        return { backgroundColor: '#fef2f2', borderColor: '#dc2626' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#64748b' };
    }
  };

  const toggleMenu = (paymentId) => {
    setMenuVisible(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Total Collected
              </Text>
              <Text variant="headlineMedium" style={[styles.summaryValue, { color: '#059669' }]}>
                R {totalCollected.toLocaleString()}
              </Text>
              <Text variant="bodySmall" style={styles.summarySubtext}>
                {payments.filter(p => p.status === 'paid').length} payments
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Pending
              </Text>
              <Text variant="headlineMedium" style={[styles.summaryValue, { color: '#d97706' }]}>
                R {totalPending.toLocaleString()}
              </Text>
              <Text variant="bodySmall" style={styles.summarySubtext}>
                {payments.filter(p => p.status === 'pending').length} payments
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Overdue
              </Text>
              <Text variant="headlineMedium" style={[styles.summaryValue, { color: '#dc2626' }]}>
                R {totalOverdue.toLocaleString()}
              </Text>
              <Text variant="bodySmall" style={styles.summarySubtext}>
                {payments.filter(p => p.status === 'overdue').length} payments
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Charts */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Collection Trend
            </Text>
            <BarChart
              data={chartData}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Payment Status
            </Text>
            <PieChart
              data={statusData}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              accessor="data"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search tenants, units, or properties..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>

        <View style={styles.filterContainer}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All Payments
          </Chip>
          <Chip
            selected={selectedFilter === 'paid'}
            onPress={() => setSelectedFilter('paid')}
            style={styles.filterChip}
          >
            Paid
          </Chip>
          <Chip
            selected={selectedFilter === 'pending'}
            onPress={() => setSelectedFilter('pending')}
            style={styles.filterChip}
          >
            Pending
          </Chip>
          <Chip
            selected={selectedFilter === 'overdue'}
            onPress={() => setSelectedFilter('overdue')}
            style={styles.filterChip}
          >
            Overdue
          </Chip>
        </View>

        {/* Payments List */}
        <View style={styles.paymentsContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Payments ({filteredPayments.length})
          </Text>
          
          {filteredPayments.map((payment) => (
            <Card key={payment.id} style={styles.paymentCard}>
              <Card.Content>
                <View style={styles.paymentHeader}>
                  <View style={styles.paymentInfo}>
                    <Text variant="titleMedium" style={styles.tenantName}>
                      {payment.tenantName}
                    </Text>
                    <Text variant="bodyMedium" style={styles.unitInfo}>
                      {payment.unit} • {payment.property}
                    </Text>
                  </View>
                  
                  <View style={styles.paymentActions}>
                    <Chip 
                      mode="outlined" 
                      style={[styles.statusChip, getStatusChipStyle(payment.status)]}
                    >
                      {payment.status}
                    </Chip>
                    
                    <Menu
                      visible={menuVisible[payment.id] || false}
                      onDismiss={() => toggleMenu(payment.id)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          onPress={() => toggleMenu(payment.id)}
                        />
                      }
                    >
                      <Menu.Item onPress={() => {}} title="View Details" />
                      <Menu.Item onPress={() => {}} title="Send Reminder" />
                      <Menu.Item onPress={() => {}} title="Mark as Paid" />
                      <Menu.Item onPress={() => {}} title="Generate Receipt" />
                    </Menu>
                  </View>
                </View>
                
                <View style={styles.paymentDetails}>
                  <View style={styles.amountContainer}>
                    <Text variant="headlineSmall" style={styles.amount}>
                      R {payment.amount.toLocaleString()}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Due Date:
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  {payment.paidDate && (
                    <View style={styles.detailRow}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Paid Date:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {new Date(payment.paidDate).toLocaleDateString()}
                      </Text>
                    </View>
                  )}
                  
                  {payment.method && (
                    <View style={styles.detailRow}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Method:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {payment.method}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.paymentActions}>
                  {payment.status === 'overdue' && (
                    <Button
                      mode="contained"
                      onPress={() => {}}
                      style={[styles.actionButton, { backgroundColor: '#dc2626' }]}
                    >
                      Send Reminder
                    </Button>
                  )}
                  
                  {payment.status === 'pending' && (
                    <Button
                      mode="contained"
                      onPress={() => {}}
                      style={styles.actionButton}
                    >
                      Mark as Paid
                    </Button>
                  )}
                  
                  <Button
                    mode="outlined"
                    onPress={() => {}}
                    style={styles.actionButton}
                  >
                    View Details
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/payment-management/payment-reminders')}
        label="Send Reminders"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
  },
  summaryContent: {
    alignItems: 'center',
    padding: 16,
  },
  summaryTitle: {
    color: '#64748b',
    marginBottom: 8,
  },
  summaryValue: {
    color: '#1e293b',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summarySubtext: {
    color: '#64748b',
  },
  chartCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  chartTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchbar: {
    elevation: 2,
    borderRadius: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterChip: {
    borderRadius: 20,
  },
  paymentsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  paymentCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  tenantName: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  unitInfo: {
    color: '#64748b',
    marginTop: 2,
  },
  paymentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    borderRadius: 16,
    marginRight: 8,
  },
  paymentDetails: {
    marginBottom: 16,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    color: '#1e293b',
  },
  paymentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2563eb',
  },
});
