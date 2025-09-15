import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Card, Surface } from 'react-native-paper';
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
        
        <View style={styles.content}>
          {/* Header with luxury logo */}
          <View style={styles.header}>
            <Surface style={styles.logoContainer} elevation={8}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="home-city" size={48} color={colors.surface} />
              </LinearGradient>
            </Surface>
            <Text variant="headlineLarge" style={styles.title}>
              Facilio
            </Text>
            <Text variant="titleMedium" style={styles.tagline}>
              Luxury Property Management
            </Text>
          </View>

          {/* Feature highlights with luxury styling */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Surface style={styles.featureIcon} elevation={4}>
                <Icon name="shield-check" size={20} color={colors.accent} />
              </Surface>
              <Text variant="bodySmall" style={styles.featureText}>
                Secure & Reliable
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Surface style={styles.featureIcon} elevation={4}>
                <Icon name="lightning-bolt" size={20} color={colors.accent} />
              </Surface>
              <Text variant="bodySmall" style={styles.featureText}>
                Fast & Efficient
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Surface style={styles.featureIcon} elevation={4}>
                <Icon name="chart-line" size={20} color={colors.accent} />
              </Surface>
              <Text variant="bodySmall" style={styles.featureText}>
                Smart Analytics
              </Text>
            </View>
          </View>

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

          {/* Main content without card */}
          <View style={styles.mainContent}>
            <Text variant="headlineLarge" style={styles.welcomeTitle}>
              Welcome to Excellence
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Experience premium property management with our sophisticated platform designed for discerning clients.
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => router.push('/auth/login')}
                style={styles.primaryButton}
                contentStyle={styles.buttonContent}
                icon="arrow-right"
                labelStyle={styles.buttonLabel}
              >
                Get Started
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => router.push('/auth/register')}
                style={styles.secondaryButton}
                contentStyle={styles.buttonContent}
                icon="account-plus"
                labelStyle={styles.buttonLabel}
              >
                Create Account
              </Button>
            </View>

            {/* Quick access with luxury styling */}
            <View style={styles.quickAccessContainer}>
              <Text variant="bodySmall" style={styles.quickAccessLabel}>
                Quick Access
              </Text>
              <View style={styles.quickAccessButtons}>
                <Button
                  mode="text"
                  onPress={() => router.push('/access-control/tenant-access-portal')}
                  style={styles.quickButton}
                  icon="key"
                  compact
                  labelStyle={styles.quickButtonLabel}
                >
                  Tenant Portal
                </Button>
                <Button
                  mode="text"
                  onPress={() => router.push('/auth/tenant-invitation')}
                  style={styles.quickButton}
                  icon="email"
                  compact
                  labelStyle={styles.quickButtonLabel}
                >
                  Invitation
                </Button>
              </View>
            </View>
          </View>
        </View>
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
  // Luxury decorative elements with enhanced styling
  decorativeCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.accent,
    opacity: 0.08,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -120,
    left: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: colors.primary,
    opacity: 0.06,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.25,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  decorativeCircle4: {
    position: 'absolute',
    top: height * 0.6,
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    opacity: 0.12,
  },
  decorativeCircle5: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.3,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    opacity: 0.15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  logoGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '800',
    marginBottom: 8,
    fontSize: 32,
    letterSpacing: 1,
  },
  tagline: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  featureText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  // Top corner button
  topButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  topButton: {
    borderRadius: 16,
    borderColor: colors.primary,
    backgroundColor: colors.glassBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  topButtonContent: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  topButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  // Main content without card
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 32,
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 36,
    color: colors.textSecondary,
    lineHeight: 26,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 28,
  },
  // Elegant smaller buttons
  primaryButton: {
    borderRadius: 20,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: 'transparent',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  quickAccessContainer: {
    alignItems: 'center',
  },
  quickAccessLabel: {
    color: colors.textSecondary,
    marginBottom: 16,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  quickAccessButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  quickButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  quickButtonLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});
