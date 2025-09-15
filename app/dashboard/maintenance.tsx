import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, Chip, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// Placeholder components for each tab
function RequestsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Maintenance Requests
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text variant="titleMedium">Unit 4A - Leaking Tap</Text>
              <Chip mode="outlined" style={styles.urgentChip}>
                Urgent
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Reported by: John Doe • 2 hours ago
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Kitchen tap is leaking continuously. Water damage to cabinet below.
            </Text>
            <View style={styles.buttonRow}>
              <Button mode="contained" style={styles.acceptButton}>
                Accept
              </Button>
              <Button mode="outlined" style={styles.viewButton}>
                View Details
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text variant="titleMedium">Unit 2B - Broken Light</Text>
              <Chip mode="outlined" style={styles.normalChip}>
                Normal
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Reported by: Jane Smith • 1 day ago
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Living room light fixture not working. Bulb replacement needed.
            </Text>
            <View style={styles.buttonRow}>
              <Button mode="contained" style={styles.acceptButton}>
                Accept
              </Button>
              <Button mode="outlined" style={styles.viewButton}>
                View Details
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text variant="titleMedium">Common Area - Elevator</Text>
              <Chip mode="outlined" style={styles.urgentChip}>
                Urgent
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Reported by: Building Manager • 30 minutes ago
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Elevator stuck between floors. Emergency response needed.
            </Text>
            <View style={styles.buttonRow}>
              <Button mode="contained" style={styles.acceptButton}>
                Accept
              </Button>
              <Button mode="outlined" style={styles.viewButton}>
                View Details
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Today's Schedule
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">9:00 AM - Unit 3C</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Air conditioning repair
            </Text>
            <Chip mode="outlined" style={styles.scheduledChip}>
              Scheduled
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">11:00 AM - Common Area</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Gym equipment maintenance
            </Text>
            <Chip mode="outlined" style={styles.scheduledChip}>
              Scheduled
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">2:00 PM - Unit 1A</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Door lock replacement
            </Text>
            <Chip mode="outlined" style={styles.scheduledChip}>
              Scheduled
            </Chip>
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.addButton}>
          Add New Task
        </Button>
      </View>
    </SafeAreaView>
  );
}

function CompletedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Completed Tasks
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Unit 5B - Plumbing</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Completed: Yesterday at 3:30 PM
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Fixed blocked drain in bathroom. Replaced pipe section.
            </Text>
            <Chip mode="outlined" style={styles.completedChip}>
              Completed
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Unit 2A - Electrical</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Completed: 2 days ago at 10:15 AM
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Replaced faulty electrical outlet in kitchen.
            </Text>
            <Chip mode="outlined" style={styles.completedChip}>
              Completed
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Common Area - Cleaning</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Completed: 3 days ago at 2:00 PM
            </Text>
            <Text variant="bodySmall" style={styles.description}>
              Deep cleaning of lobby and common areas.
            </Text>
            <Chip mode="outlined" style={styles.completedChip}>
              Completed
            </Chip>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

function InventoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Inventory & Supplies
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Electrical Supplies</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Light bulbs: 15 • Outlets: 8 • Switches: 12
            </Text>
            <Chip mode="outlined" style={styles.stockChip}>
              In Stock
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Plumbing Supplies</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Pipes: 5 • Fittings: 20 • Tools: 8
            </Text>
            <Chip mode="outlined" style={styles.lowStockChip}>
              Low Stock
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Cleaning Supplies</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Detergents: 12 • Tools: 15 • Equipment: 6
            </Text>
            <Chip mode="outlined" style={styles.stockChip}>
              In Stock
            </Chip>
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.orderButton}>
          Order Supplies
        </Button>
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          My Profile
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Personal Information</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Mike Johnson • mike.johnson@facilio.com
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              +27 82 987 6543
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Work Information</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Maintenance Staff • ID: MT001
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Specializations: Electrical, Plumbing, General
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Performance Stats</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Tasks Completed This Month: 24
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Average Response Time: 2.5 hours
            </Text>
          </Card.Content>
        </Card>

        <Button mode="outlined" style={styles.editButton}>
          Edit Profile
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default function MaintenanceDashboard() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Requests') {
              iconName = focused ? 'toolbox' : 'toolbox-outline';
            } else if (route.name === 'Schedule') {
              iconName = focused ? 'calendar-clock' : 'calendar-clock-outline';
            } else if (route.name === 'Completed') {
              iconName = focused ? 'check-circle' : 'check-circle-outline';
            } else if (route.name === 'Inventory') {
              iconName = focused ? 'package-variant' : 'package-variant-closed';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-hard-hat' : 'account-hard-hat-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Completed" component={CompletedScreen} />
        <Tab.Screen name="Inventory" component={InventoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardSubtext: {
    color: '#64748b',
    marginTop: 4,
  },
  description: {
    color: '#64748b',
    marginTop: 8,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  urgentChip: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  normalChip: {
    backgroundColor: '#f0f9ff',
    borderColor: '#2563eb',
  },
  scheduledChip: {
    backgroundColor: '#fef3c7',
    borderColor: '#d97706',
  },
  completedChip: {
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  stockChip: {
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  lowStockChip: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 8,
  },
  viewButton: {
    flex: 1,
    borderRadius: 8,
  },
  addButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  orderButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  editButton: {
    marginTop: 16,
    borderRadius: 8,
  },
});
