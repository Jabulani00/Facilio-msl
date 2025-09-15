import { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, Checkbox, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';
import { useAuth } from '../../services/auth-context';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.contactPerson) {
      newErrors.contactPerson = 'Contact person is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await register({
        email: formData.email,
        password: formData.password,
        role: 'property-manager',
        firstName: formData.contactPerson,
        phone: formData.phone,
      });
      router.push('/auth/otp-verification');
    } catch (e) {
      setErrors((prev) => ({ ...prev, email: 'Registration failed. Try a different email.' }));
    } finally {
      setSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
                  Create Account
                </Text>
                <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
                  Join Facilio and start managing properties efficiently
                </Text>
              </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Company Name"
                value={formData.companyName}
                onChangeText={(value) => updateFormData('companyName', value)}
                mode="outlined"
                error={!!errors.companyName}
                style={styles.input}
                left={<TextInput.Icon icon="office-building" />}
              />
              <HelperText type="error" visible={!!errors.companyName}>
                {errors.companyName}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Contact Person"
                value={formData.contactPerson}
                onChangeText={(value) => updateFormData('contactPerson', value)}
                mode="outlined"
                error={!!errors.contactPerson}
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />
              <HelperText type="error" visible={!!errors.contactPerson}>
                {errors.contactPerson}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Email Address"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
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
                label="Phone Number"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                mode="outlined"
                keyboardType="phone-pad"
                error={!!errors.phone}
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
              />
              <HelperText type="error" visible={!!errors.phone}>
                {errors.phone}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Business Address"
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
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
                label="Confirm Password"
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

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={formData.agreeToTerms ? 'checked' : 'unchecked'}
                onPress={() => updateFormData('agreeToTerms', !formData.agreeToTerms)}
              />
              <Text variant="bodySmall" style={styles.checkboxText}>
                I agree to the Terms and Conditions and Privacy Policy
              </Text>
            </View>
            {errors.agreeToTerms && (
              <HelperText type="error" visible={true}>
                {errors.agreeToTerms}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
              icon="account-plus"
              loading={submitting}
              disabled={submitting}
            >
              Create Account
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
                Already have an account?{' '}
              </Text>
              <Button
                mode="text"
                onPress={() => router.push('/auth/login')}
                compact
                textColor={colors.primary}
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSecondary,
  },
});
