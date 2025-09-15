import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons, HelperText, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';
import { useAuth } from '../../services/auth-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('property-manager');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await login(email, password);
      router.push(`/dashboard/${userType}`);
    } catch (e) {
      setErrors({ email: '', password: 'Invalid email or password' });
    } finally {
      setSubmitting(false);
    }
  };

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
              {/* Welcome text inside card */}
              <View style={styles.welcomeContainer}>
                <Text variant="headlineMedium" style={styles.welcomeTitle}>
                  Welcome Back
                </Text>
                <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
                  Sign in to your Facilio account
                </Text>
              </View>

              <View style={styles.segmentedContainer}>
                <SegmentedButtons
                  value={userType}
                  onValueChange={setUserType}
                  buttons={[
                    { 
                      value: 'property-manager', 
                      label: 'Manager',
                      icon: 'account-tie'
                    },
                    { 
                      value: 'tenant', 
                      label: 'Tenant',
                      icon: 'home-account'
                    },
                    { 
                      value: 'maintenance', 
                      label: 'Maintenance',
                      icon: 'tools'
                    },
                  ]}
                  style={styles.segmentedButtons}
                />
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

              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
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

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                icon="arrow-right"
                loading={submitting}
                disabled={submitting}
                labelStyle={styles.buttonLabel}
              >
                Sign In
              </Button>

              <View style={styles.forgotPasswordContainer}>
                <Button
                  mode="text"
                  onPress={() => router.push('/auth/forgot-password')}
                  compact
                  textColor={colors.primary}
                  labelStyle={styles.linkLabel}
                >
                  Forgot Password?
                </Button>
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
                  Don't have an account?{' '}
                </Text>
                <Button
                  mode="text"
                  onPress={() => router.push('/auth/register')}
                  compact
                  textColor={colors.primary}
                  labelStyle={styles.linkLabel}
                >
                  Sign Up
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
  // Welcome text inside card
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 16,
    letterSpacing: 0.3,
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
  segmentedContainer: {
    marginBottom: 28,
  },
  segmentedButtons: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  // Elegant smaller login button
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
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
