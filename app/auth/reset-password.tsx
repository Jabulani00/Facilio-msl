import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const { token, email } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' };
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      // TODO: Implement actual password reset
      // await resetPassword(token, formData.password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetSuccess(true);
    } catch (e) {
      setErrors({ password: 'Failed to reset password. Please try again.', confirmPassword: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (resetSuccess) {
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
                    Password Reset!
                  </Text>
                  <Text variant="bodyMedium" style={styles.successSubtitle}>
                    Your password has been successfully updated
                  </Text>
                  <Text variant="bodySmall" style={styles.instructionText}>
                    You can now sign in with your new password.
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={handleBackToLogin}
                  style={styles.loginButton}
                  contentStyle={styles.buttonContent}
                  icon="login"
                  labelStyle={styles.buttonLabel}
                >
                  Sign In Now
                </Button>
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
                  Reset Password
                </Text>
                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                  Enter your new password below
                </Text>
                {email && (
                  <Text variant="bodySmall" style={styles.emailText}>
                    For: {email}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="New Password"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  error={!!errors.password}
                  style={styles.input}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password}
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Confirm New Password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  mode="outlined"
                  secureTextEntry={!showConfirmPassword}
                  error={!!errors.confirmPassword}
                  style={styles.input}
                  left={<TextInput.Icon icon="lock-check" />}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                />
                <HelperText type="error" visible={!!errors.confirmPassword}>
                  {errors.confirmPassword}
                </HelperText>
              </View>

              <Button
                mode="contained"
                onPress={handleResetPassword}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
                icon="check"
                loading={submitting}
                disabled={submitting}
                labelStyle={styles.buttonLabel}
              >
                Reset Password
              </Button>

              <View style={styles.passwordRequirements}>
                <Text variant="bodySmall" style={styles.requirementsTitle}>
                  Password Requirements:
                </Text>
                <Text variant="bodySmall" style={styles.requirement}>
                  • At least 8 characters long
                </Text>
                <Text variant="bodySmall" style={styles.requirement}>
                  • Mix of letters, numbers, and symbols recommended
                </Text>
              </View>

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
    marginBottom: 8,
  },
  emailText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
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
    marginBottom: 20,
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
  loginButton: {
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
  passwordRequirements: {
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  requirementsTitle: {
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  requirement: {
    color: colors.textSecondary,
    marginBottom: 4,
    fontSize: 13,
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
