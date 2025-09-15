import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons, DatePickerModal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TenantAssignmentScreen() {
  const [formData, setFormData] = useState({
    tenantType: 'existing',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    leaseStartDate: new Date(),
    leaseEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    monthlyRent: '',
    deposit: '',
    utilities: false,
    parking: false,
    storage: false,
  });
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const existingTenants = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+27 82 123 4567' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+27 82 234 5678' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '+27 82 345 6789' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.tenantType === 'new') {
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
      
      if (!formData.idNumber) {
        newErrors.idNumber = 'ID number is required';
      }
    }
    
    if (!formData.monthlyRent) {
      newErrors.monthlyRent = 'Monthly rent is required';
    }
    
    if (!formData.deposit) {
      newErrors.deposit = 'Deposit amount is required';
    }
    
    if (formData.leaseStartDate >= formData.leaseEndDate) {
      newErrors.leaseEndDate = 'Lease end date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAssign = () => {
    if (validateForm()) {
      // Process tenant assignment
      router.back();
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calculateDeposit = () => {
    const rent = parseFloat(formData.monthlyRent) || 0;
    const deposit = rent * 2; // 2 months rent as deposit
    updateFormData('deposit', deposit.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium" style={styles.title}>
              Assign Tenant to Unit
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Unit 2B - Garden Complex
            </Text>

            {/* Tenant Type Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Tenant Type
              </Text>
              <SegmentedButtons
                value={formData.tenantType}
                onValueChange={(value) => updateFormData('tenantType', value)}
                buttons={[
                  { value: 'existing', label: 'Existing Tenant' },
                  { value: 'new', label: 'New Tenant' },
                ]}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Existing Tenant Selection */}
            {formData.tenantType === 'existing' && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Select Existing Tenant
                </Text>
                {existingTenants.map((tenant) => (
                  <Card 
                    key={tenant.id} 
                    style={styles.tenantCard}
                    onPress={() => {
                      updateFormData('firstName', tenant.name.split(' ')[0]);
                      updateFormData('lastName', tenant.name.split(' ')[1]);
                      updateFormData('email', tenant.email);
                      updateFormData('phone', tenant.phone);
                    }}
                  >
                    <Card.Content>
                      <Text variant="titleMedium">{tenant.name}</Text>
                      <Text variant="bodyMedium" style={styles.tenantInfo}>
                        {tenant.email}
                      </Text>
                      <Text variant="bodyMedium" style={styles.tenantInfo}>
                        {tenant.phone}
                      </Text>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            )}

            {/* New Tenant Form */}
            {formData.tenantType === 'new' && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Tenant Information
                </Text>
                
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
                    label="ID Number"
                    value={formData.idNumber}
                    onChangeText={(value) => updateFormData('idNumber', value)}
                    mode="outlined"
                    error={!!errors.idNumber}
                    style={styles.input}
                  />
                  <HelperText type="error" visible={!!errors.idNumber}>
                    {errors.idNumber}
                  </HelperText>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    label="Emergency Contact Name"
                    value={formData.emergencyContact}
                    onChangeText={(value) => updateFormData('emergencyContact', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    label="Emergency Contact Phone"
                    value={formData.emergencyPhone}
                    onChangeText={(value) => updateFormData('emergencyPhone', value)}
                    mode="outlined"
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </View>
              </View>
            )}

            {/* Lease Information */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Lease Information
              </Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Monthly Rent (R)"
                  value={formData.monthlyRent}
                  onChangeText={(value) => updateFormData('monthlyRent', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.monthlyRent}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.monthlyRent}>
                  {errors.monthlyRent}
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Deposit (R)"
                  value={formData.deposit}
                  onChangeText={(value) => updateFormData('deposit', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.deposit}
                  style={styles.input}
                  right={
                    <TextInput.Icon
                      icon="calculator"
                      onPress={calculateDeposit}
                    />
                  }
                />
                <HelperText type="error" visible={!!errors.deposit}>
                  {errors.deposit}
                </HelperText>
                <HelperText type="info" visible={true}>
                  Typically 2 months rent
                </HelperText>
              </View>

              <View style={styles.dateContainer}>
                <Button
                  mode="outlined"
                  onPress={() => setShowStartDatePicker(true)}
                  style={styles.dateButton}
                >
                  Lease Start: {formData.leaseStartDate.toLocaleDateString()}
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => setShowEndDatePicker(true)}
                  style={styles.dateButton}
                >
                  Lease End: {formData.leaseEndDate.toLocaleDateString()}
                </Button>
              </View>
            </View>

            {/* Additional Services */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Additional Services
              </Text>
              
              <View style={styles.servicesContainer}>
                <Button
                  mode={formData.utilities ? "contained" : "outlined"}
                  onPress={() => updateFormData('utilities', !formData.utilities)}
                  style={styles.serviceButton}
                >
                  Utilities Included
                </Button>
                
                <Button
                  mode={formData.parking ? "contained" : "outlined"}
                  onPress={() => updateFormData('parking', !formData.parking)}
                  style={styles.serviceButton}
                >
                  Parking Space
                </Button>
                
                <Button
                  mode={formData.storage ? "contained" : "outlined"}
                  onPress={() => updateFormData('storage', !formData.storage)}
                  style={styles.serviceButton}
                >
                  Storage Unit
                </Button>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => router.back()}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Cancel
              </Button>
              
              <Button
                mode="contained"
                onPress={handleAssign}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Assign Tenant
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={showStartDatePicker}
        onDismiss={() => setShowStartDatePicker(false)}
        date={formData.leaseStartDate}
        onConfirm={(params) => {
          setShowStartDatePicker(false);
          updateFormData('leaseStartDate', params.date);
        }}
      />

      <DatePickerModal
        locale="en"
        mode="single"
        visible={showEndDatePicker}
        onDismiss={() => setShowEndDatePicker(false)}
        date={formData.leaseEndDate}
        onConfirm={(params) => {
          setShowEndDatePicker(false);
          updateFormData('leaseEndDate', params.date);
        }}
      />
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
  },
  cardContent: {
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  segmentedButtons: {
    borderRadius: 12,
  },
  tenantCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8,
  },
  tenantInfo: {
    color: '#64748b',
    marginTop: 4,
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
  dateContainer: {
    gap: 12,
  },
  dateButton: {
    borderRadius: 8,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceButton: {
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
