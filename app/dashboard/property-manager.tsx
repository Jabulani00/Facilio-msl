import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, FAB, Surface, Chip, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// Enhanced Properties Screen with luxury design
function PropertiesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={colors.gradientBackground}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Luxury decorative elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text variant="headlineSmall" style={styles.greeting}>
                  Property Portfolio 📊
                </Text>
                <Text variant="bodyMedium" style={styles.dateText}>
                  Manage your properties efficiently
                </Text>
              </View>
              <Surface style={styles.avatarContainer} elevation={4}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  style={styles.avatarGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="account-tie" size={28} color={colors.surface} />
                </LinearGradient>
              </Surface>
            </View>
          </View>

        {/* Portfolio Overview */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="chart-pie" size={20} color={colors.primary} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Portfolio Overview
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  2
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Properties
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  22
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Total Units
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  91%
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Occupancy
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Property Cards */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="home-city" size={20} color={colors.primary} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Sunset Apartments
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              14 units • Built 2020 • Premium Location
            </Text>
            <View style={styles.propertyStats}>
              <Chip 
                mode="outlined" 
                style={styles.occupancyChip}
                icon="home"
                textStyle={styles.chipText}
              >
                85% Occupied
              </Chip>
              <Chip 
                mode="outlined" 
                style={styles.revenueChip}
                icon="currency-usd"
                textStyle={styles.chipText}
              >
                R 119,000/mo
              </Chip>
            </View>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="arrow-right"
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              View Details
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="home-group" size={20} color={colors.primary} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Garden Complex
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              8 units • Built 2018 • Family Friendly
            </Text>
            <View style={styles.propertyStats}>
              <Chip 
                mode="outlined" 
                style={styles.occupancyChip}
                icon="home"
                textStyle={styles.chipText}
              >
                100% Occupied
              </Chip>
              <Chip 
                mode="outlined" 
                style={styles.revenueChip}
                icon="currency-usd"
                textStyle={styles.chipText}
              >
                R 68,000/mo
              </Chip>
            </View>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="arrow-right"
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              View Details
            </Button>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="lightning-bolt" size={20} color={colors.accent} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Quick Actions
              </Text>
            </View>
            <View style={styles.quickActions}>
              <Button 
                mode="outlined" 
                style={styles.quickActionButton}
                icon="plus"
                contentStyle={styles.quickActionContent}
                labelStyle={styles.buttonLabel}
              >
                Add Property
              </Button>
              <Button 
                mode="outlined" 
                style={styles.quickActionButton}
                icon="account-plus"
                contentStyle={styles.quickActionContent}
                labelStyle={styles.buttonLabel}
              >
                Add Tenant
              </Button>
            </View>
          </Card.Content>
        </Card>
        </ScrollView>
        
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {}}
          label="Add Property"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

function PaymentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Rent Collection
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Total Collected This Month</Text>
            <Text variant="headlineSmall" style={styles.amount}>
              R 45,200
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Outstanding Payments</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              3 tenants with overdue payments
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

function BookingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Amenity Bookings
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Today's Bookings</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Gym: 2 bookings • Pool: 1 booking
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

function CommunicationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Communications
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Recent Announcements</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              2 announcements sent this week
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Maintenance Requests</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              5 pending requests
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

function ReportsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Reports & Analytics
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Financial Summary</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              View monthly and yearly reports
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Property Performance</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Occupancy rates and trends
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

export default function PropertyManagerDashboard() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Properties') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Payments') {
              iconName = focused ? 'credit-card' : 'credit-card-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Communications') {
              iconName = focused ? 'message' : 'message-outline';
            } else if (route.name === 'Reports') {
              iconName = focused ? 'chart-line' : 'chart-line-variant';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
            borderRadius: 0,
            elevation: 8,
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 4,
          },
          headerTintColor: colors.surface,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen name="Properties" component={PropertiesScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Communications" component={CommunicationsScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
    position: 'relative',
  },
  // Luxury decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent,
    opacity: 0.08,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.primary,
    opacity: 0.06,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.3,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 4,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatarGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  // Luxury glassmorphism cards
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 16,
    borderRadius: 24,
    backgroundColor: colors.glassBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    marginLeft: 16,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.3,
  },
  cardSubtext: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: colors.primary,
    fontWeight: '800',
    marginBottom: 6,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  propertyStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  occupancyChip: {
    backgroundColor: colors.successContainer,
    borderColor: colors.success,
    borderRadius: 16,
  },
  revenueChip: {
    backgroundColor: colors.info + '20',
    borderColor: colors.info,
    borderRadius: 16,
  },
  chipText: {
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  // Elegant smaller buttons
  actionButton: {
    borderRadius: 20,
    borderColor: colors.primary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 20,
    borderColor: colors.primary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  amount: {
    color: colors.success,
    fontWeight: '800',
    marginTop: 8,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 90,
    backgroundColor: colors.primary,
    borderRadius: 28,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
});
