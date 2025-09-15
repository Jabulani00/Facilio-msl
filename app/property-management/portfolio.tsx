import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function PropertyPortfolioScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Ocean Drive, Cape Town',
      units: 14,
      occupied: 12,
      occupancyRate: 85.7,
      monthlyRevenue: 102000,
      status: 'active',
    },
    {
      id: 2,
      name: 'Garden Complex',
      address: '456 Garden Street, Johannesburg',
      units: 8,
      occupied: 8,
      occupancyRate: 100,
      monthlyRevenue: 68000,
      status: 'active',
    },
    {
      id: 3,
      name: 'Mountain View',
      address: '789 Mountain Road, Durban',
      units: 20,
      occupied: 18,
      occupancyRate: 90,
      monthlyRevenue: 144000,
      status: 'active',
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [280000, 290000, 310000, 300000, 320000, 314000],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const occupancyData = {
    labels: ['Occupied', 'Vacant'],
    data: [38, 4],
    colors: ['#059669', '#dc2626'],
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
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2563eb',
    },
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || property.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = properties.reduce((sum, property) => sum + property.monthlyRevenue, 0);
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
  const totalOccupied = properties.reduce((sum, property) => sum + property.occupied, 0);
  const overallOccupancy = (totalOccupied / totalUnits) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Total Revenue
              </Text>
              <Text variant="headlineMedium" style={styles.summaryValue}>
                R {totalRevenue.toLocaleString()}
              </Text>
              <Text variant="bodySmall" style={styles.summarySubtext}>
                This month
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Occupancy Rate
              </Text>
              <Text variant="headlineMedium" style={styles.summaryValue}>
                {overallOccupancy.toFixed(1)}%
              </Text>
              <Text variant="bodySmall" style={styles.summarySubtext}>
                {totalOccupied}/{totalUnits} units
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Charts */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Revenue Trend
            </Text>
            <LineChart
              data={chartData}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Occupancy Overview
            </Text>
            <PieChart
              data={occupancyData}
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
            placeholder="Search properties..."
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
            All Properties
          </Chip>
          <Chip
            selected={selectedFilter === 'active'}
            onPress={() => setSelectedFilter('active')}
            style={styles.filterChip}
          >
            Active
          </Chip>
          <Chip
            selected={selectedFilter === 'maintenance'}
            onPress={() => setSelectedFilter('maintenance')}
            style={styles.filterChip}
          >
            Under Maintenance
          </Chip>
        </View>

        {/* Properties List */}
        <View style={styles.propertiesContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Properties ({filteredProperties.length})
          </Text>
          
          {filteredProperties.map((property) => (
            <Card key={property.id} style={styles.propertyCard}>
              <Card.Content>
                <View style={styles.propertyHeader}>
                  <Text variant="titleMedium" style={styles.propertyName}>
                    {property.name}
                  </Text>
                  <Chip 
                    mode="outlined" 
                    style={[
                      styles.statusChip,
                      property.status === 'active' ? styles.activeChip : styles.maintenanceChip
                    ]}
                  >
                    {property.status}
                  </Chip>
                </View>
                
                <Text variant="bodyMedium" style={styles.propertyAddress}>
                  {property.address}
                </Text>
                
                <View style={styles.propertyStats}>
                  <View style={styles.statItem}>
                    <Text variant="bodySmall" style={styles.statLabel}>
                      Units
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {property.occupied}/{property.units}
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text variant="bodySmall" style={styles.statLabel}>
                      Occupancy
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {property.occupancyRate}%
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text variant="bodySmall" style={styles.statLabel}>
                      Revenue
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      R {property.monthlyRevenue.toLocaleString()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.propertyActions}>
                  <Button
                    mode="outlined"
                    onPress={() => router.push(`/property-management/property-details?id=${property.id}`)}
                    style={styles.actionButton}
                  >
                    View Details
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => router.push('/property-management/unit-management')}
                    style={styles.actionButton}
                  >
                    Manage Units
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
        onPress={() => router.push('/property-management/unit-management')}
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
  },
  filterChip: {
    borderRadius: 20,
  },
  propertiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  propertyCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyName: {
    color: '#1e293b',
    fontWeight: 'bold',
    flex: 1,
  },
  propertyAddress: {
    color: '#64748b',
    marginBottom: 16,
  },
  statusChip: {
    borderRadius: 16,
  },
  activeChip: {
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  maintenanceChip: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  propertyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  propertyActions: {
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
