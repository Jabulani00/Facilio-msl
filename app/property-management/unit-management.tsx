import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function UnitManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState({});

  const units = [
    {
      id: 1,
      unitNumber: '1A',
      property: 'Sunset Apartments',
      type: '2 Bedroom',
      size: '85 sqm',
      rent: 8500,
      status: 'occupied',
      tenant: 'John Doe',
      leaseEnd: '2024-03-15',
      amenities: ['Parking', 'Balcony', 'Storage'],
    },
    {
      id: 2,
      unitNumber: '1B',
      property: 'Sunset Apartments',
      type: '1 Bedroom',
      size: '65 sqm',
      rent: 6500,
      status: 'vacant',
      tenant: null,
      leaseEnd: null,
      amenities: ['Parking'],
    },
    {
      id: 3,
      unitNumber: '2A',
      property: 'Sunset Apartments',
      type: '3 Bedroom',
      size: '110 sqm',
      rent: 12000,
      status: 'occupied',
      tenant: 'Jane Smith',
      leaseEnd: '2024-06-20',
      amenities: ['Parking', 'Balcony', 'Storage', 'Garden'],
    },
    {
      id: 4,
      unitNumber: '2B',
      property: 'Sunset Apartments',
      type: '2 Bedroom',
      size: '85 sqm',
      rent: 8500,
      status: 'maintenance',
      tenant: null,
      leaseEnd: null,
      amenities: ['Parking', 'Balcony'],
    },
    {
      id: 5,
      unitNumber: '3A',
      property: 'Garden Complex',
      type: '2 Bedroom',
      size: '90 sqm',
      rent: 9000,
      status: 'occupied',
      tenant: 'Mike Johnson',
      leaseEnd: '2024-12-10',
      amenities: ['Parking', 'Garden', 'Storage'],
    },
    {
      id: 6,
      unitNumber: '3B',
      property: 'Garden Complex',
      type: '1 Bedroom',
      size: '70 sqm',
      rent: 7000,
      status: 'vacant',
      tenant: null,
      leaseEnd: null,
      amenities: ['Parking'],
    },
  ];

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         unit.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (unit.tenant && unit.tenant.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || unit.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return '#059669';
      case 'vacant': return '#dc2626';
      case 'maintenance': return '#d97706';
      default: return '#64748b';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'occupied':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      case 'vacant':
        return { backgroundColor: '#fef2f2', borderColor: '#dc2626' };
      case 'maintenance':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#64748b' };
    }
  };

  const toggleMenu = (unitId) => {
    setMenuVisible(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="titleMedium" style={styles.statTitle}>
                Total Units
              </Text>
              <Text variant="headlineMedium" style={styles.statValue}>
                {units.length}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="titleMedium" style={styles.statTitle}>
                Occupied
              </Text>
              <Text variant="headlineMedium" style={[styles.statValue, { color: '#059669' }]}>
                {units.filter(u => u.status === 'occupied').length}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="titleMedium" style={styles.statTitle}>
                Vacant
              </Text>
              <Text variant="headlineMedium" style={[styles.statValue, { color: '#dc2626' }]}>
                {units.filter(u => u.status === 'vacant').length}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search units, properties, or tenants..."
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
            All Units
          </Chip>
          <Chip
            selected={selectedFilter === 'occupied'}
            onPress={() => setSelectedFilter('occupied')}
            style={styles.filterChip}
          >
            Occupied
          </Chip>
          <Chip
            selected={selectedFilter === 'vacant'}
            onPress={() => setSelectedFilter('vacant')}
            style={styles.filterChip}
          >
            Vacant
          </Chip>
          <Chip
            selected={selectedFilter === 'maintenance'}
            onPress={() => setSelectedFilter('maintenance')}
            style={styles.filterChip}
          >
            Maintenance
          </Chip>
        </View>

        {/* Units List */}
        <View style={styles.unitsContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Units ({filteredUnits.length})
          </Text>
          
          {filteredUnits.map((unit) => (
            <Card key={unit.id} style={styles.unitCard}>
              <Card.Content>
                <View style={styles.unitHeader}>
                  <View style={styles.unitInfo}>
                    <Text variant="titleMedium" style={styles.unitNumber}>
                      Unit {unit.unitNumber}
                    </Text>
                    <Text variant="bodyMedium" style={styles.propertyName}>
                      {unit.property}
                    </Text>
                  </View>
                  
                  <View style={styles.unitActions}>
                    <Chip 
                      mode="outlined" 
                      style={[styles.statusChip, getStatusChipStyle(unit.status)]}
                    >
                      {unit.status}
                    </Chip>
                    
                    <Menu
                      visible={menuVisible[unit.id] || false}
                      onDismiss={() => toggleMenu(unit.id)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          onPress={() => toggleMenu(unit.id)}
                        />
                      }
                    >
                      <Menu.Item onPress={() => {}} title="Edit Unit" />
                      <Menu.Item onPress={() => {}} title="View Details" />
                      <Menu.Item onPress={() => {}} title="Assign Tenant" />
                      <Menu.Item onPress={() => {}} title="Generate Report" />
                    </Menu>
                  </View>
                </View>
                
                <View style={styles.unitDetails}>
                  <View style={styles.detailRow}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Type:
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      {unit.type} • {unit.size}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Rent:
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      R {unit.rent.toLocaleString()}/month
                    </Text>
                  </View>
                  
                  {unit.tenant && (
                    <View style={styles.detailRow}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Tenant:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {unit.tenant}
                      </Text>
                    </View>
                  )}
                  
                  {unit.leaseEnd && (
                    <View style={styles.detailRow}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Lease Ends:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {new Date(unit.leaseEnd).toLocaleDateString()}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.amenitiesContainer}>
                  <Text variant="bodySmall" style={styles.amenitiesLabel}>
                    Amenities:
                  </Text>
                  <View style={styles.amenitiesList}>
                    {unit.amenities.map((amenity, index) => (
                      <Chip key={index} mode="outlined" style={styles.amenityChip}>
                        {amenity}
                      </Chip>
                    ))}
                  </View>
                </View>
                
                <View style={styles.unitActions}>
                  <Button
                    mode="outlined"
                    onPress={() => router.push(`/property-management/tenant-assignment?unitId=${unit.id}`)}
                    style={styles.actionButton}
                  >
                    {unit.status === 'vacant' ? 'Assign Tenant' : 'Manage Tenant'}
                  </Button>
                  <Button
                    mode="contained"
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
        onPress={() => {}}
        label="Add Unit"
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
  },
  statContent: {
    alignItems: 'center',
    padding: 16,
  },
  statTitle: {
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    color: '#1e293b',
    fontWeight: 'bold',
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
  unitsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  unitCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  unitInfo: {
    flex: 1,
  },
  unitNumber: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  propertyName: {
    color: '#64748b',
    marginTop: 2,
  },
  unitActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    borderRadius: 16,
    marginRight: 8,
  },
  unitDetails: {
    marginBottom: 12,
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
  amenitiesContainer: {
    marginBottom: 16,
  },
  amenitiesLabel: {
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  unitActions: {
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
