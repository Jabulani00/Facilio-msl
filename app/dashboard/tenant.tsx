import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, Surface, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// Enhanced Home Screen with luxury design
function HomeScreen() {
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
                  Good Morning, John! 👋
                </Text>
                <Text variant="bodyMedium" style={styles.dateText}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              <Surface style={styles.avatarContainer} elevation={4}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  style={styles.avatarGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="account" size={28} color={colors.surface} />
                </LinearGradient>
              </Surface>
            </View>
          </View>

        {/* Unit Information Card */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="home-city" size={20} color={colors.primary} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Unit 4A - Sunset Apartments
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Lease expires: March 15, 2024
            </Text>
            <View style={styles.chipContainer}>
              <Chip 
                mode="outlined" 
                style={styles.statusChip}
                icon="check-circle"
                textStyle={styles.chipText}
              >
                Current
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Rent Payment Card */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="credit-card" size={20} color={colors.error} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Rent Due
              </Text>
            </View>
            <Text variant="headlineMedium" style={styles.amount}>
              R 8,500
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Due: January 1, 2024
            </Text>
            <Button 
              mode="contained" 
              style={styles.payButton}
              contentStyle={styles.buttonContent}
              icon="arrow-right"
              labelStyle={styles.buttonLabel}
            >
              Pay Now
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
                style={styles.actionButton}
                icon="calendar-plus"
                contentStyle={styles.actionButtonContent}
                labelStyle={styles.buttonLabel}
              >
                Book Amenity
              </Button>
              <Button 
                mode="outlined" 
                style={styles.actionButton}
                icon="alert-circle"
                contentStyle={styles.actionButtonContent}
                labelStyle={styles.buttonLabel}
              >
                Report Issue
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.card} elevation={12}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Surface style={styles.iconContainer} elevation={4}>
                <Icon name="history" size={20} color={colors.info} />
              </Surface>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Recent Activity
              </Text>
            </View>
            <View style={styles.activityItem}>
              <Surface style={styles.activityIcon} elevation={2}>
                <Icon name="check-circle" size={16} color={colors.success} />
              </Surface>
              <Text variant="bodyMedium" style={styles.activityText}>
                Rent payment received - Dec 1, 2023
              </Text>
            </View>
            <View style={styles.activityItem}>
              <Surface style={styles.activityIcon} elevation={2}>
                <Icon name="calendar-check" size={16} color={colors.info} />
              </Surface>
              <Text variant="bodyMedium" style={styles.activityText}>
                Gym booking confirmed - Today 6:00 PM
              </Text>
            </View>
            <View style={styles.activityItem}>
              <Surface style={styles.activityIcon} elevation={2}>
                <Icon name="message" size={16} color={colors.warning} />
              </Surface>
              <Text variant="bodyMedium" style={styles.activityText}>
                New maintenance notice posted
              </Text>
            </View>
          </Card.Content>
        </Card>
        </ScrollView>
        
        {/* Floating Action Button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {}}
          label="Quick Action"
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
          Payment History
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">December 2023</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Paid: R 8,500 • Date: Dec 1, 2023
            </Text>
            <Chip mode="outlined" style={styles.paidChip}>
              Paid
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">November 2023</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Paid: R 8,500 • Date: Nov 1, 2023
            </Text>
            <Chip mode="outlined" style={styles.paidChip}>
              Paid
            </Chip>
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.payButton}>
          Make Payment
        </Button>
      </View>
    </SafeAreaView>
  );
}

function BookingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Book Amenities
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Gym</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Available slots today: 2:00 PM, 4:00 PM, 6:00 PM
            </Text>
            <Button mode="outlined" style={styles.bookButton}>
              Book Now
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Pool</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Available slots today: 1:00 PM, 3:00 PM, 5:00 PM
            </Text>
            <Button mode="outlined" style={styles.bookButton}>
              Book Now
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Braai Area</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Available slots today: 12:00 PM, 2:00 PM, 4:00 PM
            </Text>
            <Button mode="outlined" style={styles.bookButton}>
              Book Now
            </Button>
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
          Messages & Updates
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Maintenance Schedule</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Elevator maintenance scheduled for Jan 15, 2024
            </Text>
            <Chip mode="outlined" style={styles.infoChip}>
              Info
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">New Year Party</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Community New Year party in the common area
            </Text>
            <Chip mode="outlined" style={styles.eventChip}>
              Event
            </Chip>
          </Card.Content>
        </Card>

        <Button mode="outlined" style={styles.reportButton}>
          Report Maintenance Issue
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
              John Doe • john.doe@email.com
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              +27 82 123 4567
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Lease Information</Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Unit: 4A • Lease Start: March 15, 2023
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtext}>
              Lease End: March 15, 2024
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

export default function TenantDashboard() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Payments') {
              iconName = focused ? 'credit-card' : 'credit-card-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'message' : 'message-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Messages" component={CommunicationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
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
    marginBottom: 12,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  chipContainer: {
    marginTop: 8,
  },
  statusChip: {
    backgroundColor: colors.successContainer,
    borderColor: colors.success,
    borderRadius: 16,
  },
  chipText: {
    color: colors.success,
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  amount: {
    color: colors.error,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
    fontSize: 28,
    letterSpacing: 0.5,
  },
  paidChip: {
    marginTop: 8,
    backgroundColor: colors.successContainer,
    borderRadius: 16,
  },
  infoChip: {
    marginTop: 8,
    backgroundColor: colors.info + '20',
    borderRadius: 16,
  },
  eventChip: {
    marginTop: 8,
    backgroundColor: colors.warningContainer,
    borderRadius: 16,
  },
  // Elegant smaller buttons
  payButton: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButton: {
    marginTop: 12,
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  reportButton: {
    marginTop: 16,
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    marginTop: 16,
    borderRadius: 20,
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
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    borderColor: colors.primary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityText: {
    marginLeft: 16,
    color: colors.textSecondary,
    flex: 1,
    fontSize: 14,
    letterSpacing: 0.2,
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
