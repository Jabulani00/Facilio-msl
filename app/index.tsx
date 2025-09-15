import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Card, Surface, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
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
        <View style={styles.decorativeCircle4} />
        <View style={styles.decorativeCircle5} />
        
        {/* Small login button in top corner */}
        <View style={styles.topButtonContainer}>
          <Button
            mode="outlined"
            onPress={() => router.push('/auth/login')}
            style={styles.topButton}
            contentStyle={styles.topButtonContent}
            icon="login"
            labelStyle={styles.topButtonLabel}
            compact
          >
            Sign In
          </Button>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Clean header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon name="home-city" size={40} color={colors.primary} />
            </View>
            <Text style={styles.title}>
              Facilio
            </Text>
            <Text style={styles.tagline}>
              Property Management
            </Text>
          </View>

          {/* Simple welcome message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>
              Smart Property Management
            </Text>
            <Text style={styles.subtitle}>
              Streamline operations with digital access, maintenance tracking, and seamless payments.
            </Text>
          </View>

          {/* Clean feature cards */}
          <View style={styles.cardsContainer}>
            <View style={styles.featureCard}>
              <View style={styles.cardIconContainer}>
                <Icon name="key" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Access Control</Text>
                <Text style={styles.cardDescription}>Digital keys and secure access</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.cardIconContainer}>
                <Icon name="wrench" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Maintenance</Text>
                <Text style={styles.cardDescription}>Request and track issues</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.cardIconContainer}>
                <Icon name="credit-card" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Payments</Text>
                <Text style={styles.cardDescription}>Seamless rent and utility payments</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.cardIconContainer}>
                <Icon name="calendar-check" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Amenities</Text>
                <Text style={styles.cardDescription}>Book gym, pool, and facilities</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        
        {/* Floating Action Button */}
        <FAB
          icon="login"
          style={styles.fab}
          onPress={() => router.push('/auth/login')}
          size="small"
          customSize={40}
        />
      </LinearGradient>
    </SafeAreaView>
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
  // Subtle decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primary,
    opacity: 0.03,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent,
    opacity: 0.04,
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.3,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondary,
    opacity: 0.05,
  },
  decorativeCircle4: {
    position: 'absolute',
    top: height * 0.7,
    left: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    opacity: 0.06,
  },
  decorativeCircle5: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.2,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    opacity: 0.08,
  },
  // Scrollable content
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for FAB
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '300',
    marginBottom: 4,
    fontSize: 28,
    letterSpacing: 2,
  },
  tagline: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 1,
  },
  // Top corner button - smaller
  topButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  topButton: {
    borderRadius: 12,
    borderColor: colors.primary,
    backgroundColor: colors.glassBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  topButtonContent: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  topButtonLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  // Welcome container
  welcomeContainer: {
    paddingHorizontal: 32,
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 12,
    color: colors.primary,
    fontWeight: '300',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: 15,
    letterSpacing: 0.3,
    fontWeight: '400',
  },
  // Cards container
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  // Clean feature cards
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2,
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 60,
    height: 40,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
