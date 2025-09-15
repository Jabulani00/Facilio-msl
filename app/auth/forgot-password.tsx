import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSendResetEmail = async () => {
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      // TODO: Implement actual password reset email sending
      // await sendPasswordResetEmail(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmailSent(true);
    } catch (e) {
      setErrors({ email: 'Failed to send reset email. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  if (emailSent) {
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
          
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Card style={styles.card} elevation={16}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.successContainer}>
                  <View style={styles.successIcon}>
                    <Text style={styles.successIconText}>✓</Text>
                  </View>
                  <Text variant="headlineMedium" style={styles.successTitle}>
                    Email Sent!
                  </Text>
                  <Text variant="bodyMedium" style={styles.successSubtitle}>
                    We've sent a password reset link to {email}
                  </Text>
                  <Text variant="bodySmall" style={styles.instructionText}>
                    Please check your email and follow the instructions to reset your password. The link will expire in 1 hour.
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={handleBackToLogin}
                  style={styles.backButton}
                  contentStyle={styles.buttonContent}
                  icon="arrow-left"
                  labelStyle={styles.buttonLabel}
                >
                  Back to Login
                </Button>

                <View style={styles.footer}>
                  <Text variant="bodySmall" style={styles.footerText}>
                    Didn't receive the email?{' '}
                  </Text>
                  <Button
                    mode="text"
                    onPress={() => setEmailSent(false)}
                    compact
                    textColor={colors.primary}
                    labelStyle={styles.linkLabel}
                  >
                    Try Again
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

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
        

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card} elevation={16}>
            <Card.Content style={styles.cardContent}>
              {/* Header text */}
              <View style={styles.headerContainer}>
                <Text variant="headlineMedium" style={styles.headerTitle}>
                  Forgot Password?
                </Text>
                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  style={styles.input}
                  left={<TextInput.Icon icon="email" />}
                />
                <HelperText type="error" visible={!!errors.email}>
                  {errors.email}
                </HelperText>
              </View>

              <Button
                mode="contained"
                onPress={handleSendResetEmail}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
                icon="send"
                loading={submitting}
                disabled={submitting}
                labelStyle={styles.buttonLabel}
              >
                Send Reset Link
              </Button>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text variant="bodySmall" style={styles.dividerText}>
                  OR
                </Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.footer}>
                <Text variant="bodySmall" style={styles.footerText}>
                  Remember your password?{' '}
                </Text>
                <Button
                  mode="text"
                  onPress={handleBackToLogin}
                  compact
                  textColor={colors.primary}
                  labelStyle={styles.linkLabel}
                >
                  Sign In
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
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
  // Luxury decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: colors.accent,
    opacity: 0.08,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -180,
    left: -180,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: colors.primary,
    opacity: 0.06,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.2,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    zIndex: 1,
  },
  // Header text
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  // Success screen styles
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  successIconText: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  successSubtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.textSecondary,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  instructionText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  // Luxury glassmorphism card
  card: {
    elevation: 20,
    borderRadius: 28,
    backgroundColor: colors.glassBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  cardContent: {
    padding: 36,
  },
  inputContainer: {
    marginBottom: 28,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resetButton: {
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
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
  linkLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 20,
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.2,
  },
});
