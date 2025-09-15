import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TenantInvitationScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.unitNumber) {
      newErrors.unitNumber = 'Unit number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetup = () => {
    if (validateForm()) {
      // Navigate to tenant dashboard
      router.push('/dashboard/tenant');
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.header}>
              <Avatar.Icon size={64} icon="home" style={styles.avatar} />
              <Text variant="headlineMedium" style={styles.title}>
                Welcome to Your New Home
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Complete your tenant profile to get started
              </Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <TextInput
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  mode="outlined"
                  error={!!errors.firstName}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.firstName}>
                  {errors.firstName}
                </HelperText>
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <TextInput
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                  mode="outlined"
                  error={!!errors.lastName}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.lastName}>
                  {errors.lastName}
                </HelperText>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
                style={styles.input}
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
              />
              <HelperText type="error" visible={!!errors.phone}>
                {errors.phone}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Unit Number"
                value={formData.unitNumber}
                onChangeText={(value) => updateFormData('unitNumber', value)}
                mode="outlined"
                error={!!errors.unitNumber}
                style={styles.input}
              />
              <HelperText type="error" visible={!!errors.unitNumber}>
                {errors.unitNumber}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                mode="outlined"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                error={!!errors.password}
                style={styles.input}
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
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                error={!!errors.confirmPassword}
                style={styles.input}
              />
              <HelperText type="error" visible={!!errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            </View>

            <Button
              mode="contained"
              onPress={handleSetup}
              style={styles.setupButton}
              contentStyle={styles.buttonContent}
            >
              Complete Setup
            </Button>

            <View style={styles.infoCard}>
              <Text variant="bodySmall" style={styles.infoText}>
                🏠 You'll be able to access your unit details, make payments, and book amenities once your setup is complete.
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    elevation: 4,
    borderRadius: 16,
    marginTop: 20,
  },
  cardContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#2563eb',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
  },
  setupButton: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  infoCard: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  infoText: {
    color: '#1e40af',
    lineHeight: 20,
  },
});
