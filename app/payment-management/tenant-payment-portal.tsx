import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TenantPaymentPortalScreen() {
  const [formData, setFormData] = useState({
    paymentMethod: 'eft',
    amount: '8500',
    reference: '',
    bankAccount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { value: 'eft', label: 'EFT/Bank Transfer', icon: 'bank' },
    { value: 'card', label: 'Credit/Debit Card', icon: 'credit-card' },
    { value: 'snapscan', label: 'SnapScan', icon: 'cellphone' },
    { value: 'zapper', label: 'Zapper', icon: 'cellphone' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.reference) {
      newErrors.reference = 'Payment reference is required';
    }
    
    if (formData.paymentMethod === 'eft') {
      if (!formData.bankAccount) {
        newErrors.bankAccount = 'Bank account number is required';
      }
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      
      if (!formData.nameOnCard) {
        newErrors.nameOnCard = 'Name on card is required';
      }
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        // Navigate to success page or show success message
        router.back();
      }, 3000);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium" style={styles.title}>
              Make Payment
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Unit 4A - Sunset Apartments
            </Text>

            {/* Payment Summary */}
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.summaryTitle}>
                  Payment Summary
                </Text>
                <View style={styles.summaryRow}>
                  <Text variant="bodyMedium">Monthly Rent:</Text>
                  <Text variant="bodyMedium" style={styles.summaryAmount}>
                    R 8,500.00
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text variant="bodyMedium">Due Date:</Text>
                  <Text variant="bodyMedium" style={styles.summaryDate}>
                    January 1, 2024
                  </Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text variant="titleMedium" style={styles.totalLabel}>
                    Total Amount:
                  </Text>
                  <Text variant="titleLarge" style={styles.totalAmount}>
                    R 8,500.00
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {/* Amount Input */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Payment Amount
              </Text>
              <TextInput
                label="Amount (R)"
                value={formData.amount}
                onChangeText={(value) => updateFormData('amount', value)}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.amount}
                style={styles.input}
                right={<TextInput.Affix text=".00" />}
              />
              <HelperText type="error" visible={!!errors.amount}>
                {errors.amount}
              </HelperText>
            </View>

            {/* Payment Method Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Payment Method
              </Text>
              <SegmentedButtons
                value={formData.paymentMethod}
                onValueChange={(value) => updateFormData('paymentMethod', value)}
                buttons={paymentMethods.map(method => ({
                  value: method.value,
                  label: method.label,
                }))}
                style={styles.segmentedButtons}
              />
            </View>

            {/* EFT Payment Details */}
            {formData.paymentMethod === 'eft' && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Bank Transfer Details
                </Text>
                
                <View style={styles.bankDetailsCard}>
                  <Text variant="bodyMedium" style={styles.bankInfo}>
                    <Text style={styles.bankLabel}>Bank:</Text> Standard Bank
                  </Text>
                  <Text variant="bodyMedium" style={styles.bankInfo}>
                    <Text style={styles.bankLabel}>Account:</Text> 1234567890
                  </Text>
                  <Text variant="bodyMedium" style={styles.bankInfo}>
                    <Text style={styles.bankLabel}>Branch:</Text> 051001
                  </Text>
                  <Text variant="bodyMedium" style={styles.bankInfo}>
                    <Text style={styles.bankLabel}>Reference:</Text> {formData.reference || 'Your unit number'}
                  </Text>
                </View>

                <TextInput
                  label="Your Bank Account Number"
                  value={formData.bankAccount}
                  onChangeText={(value) => updateFormData('bankAccount', value)}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.bankAccount}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.bankAccount}>
                  {errors.bankAccount}
                </HelperText>
              </View>
            )}

            {/* Card Payment Details */}
            {formData.paymentMethod === 'card' && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Card Details
                </Text>
                
                <TextInput
                  label="Card Number"
                  value={formData.cardNumber}
                  onChangeText={(value) => updateFormData('cardNumber', formatCardNumber(value))}
                  mode="outlined"
                  keyboardType="numeric"
                  error={!!errors.cardNumber}
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                />
                <HelperText type="error" visible={!!errors.cardNumber}>
                  {errors.cardNumber}
                </HelperText>

                <View style={styles.row}>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <TextInput
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChangeText={(value) => updateFormData('expiryDate', formatExpiryDate(value))}
                      mode="outlined"
                      keyboardType="numeric"
                      error={!!errors.expiryDate}
                      style={styles.input}
                      placeholder="MM/YY"
                    />
                    <HelperText type="error" visible={!!errors.expiryDate}>
                      {errors.expiryDate}
                    </HelperText>
                  </View>

                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <TextInput
                      label="CVV"
                      value={formData.cvv}
                      onChangeText={(value) => updateFormData('cvv', value)}
                      mode="outlined"
                      keyboardType="numeric"
                      secureTextEntry
                      error={!!errors.cvv}
                      style={styles.input}
                      placeholder="123"
                    />
                    <HelperText type="error" visible={!!errors.cvv}>
                      {errors.cvv}
                    </HelperText>
                  </View>
                </View>

                <TextInput
                  label="Name on Card"
                  value={formData.nameOnCard}
                  onChangeText={(value) => updateFormData('nameOnCard', value)}
                  mode="outlined"
                  error={!!errors.nameOnCard}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.nameOnCard}>
                  {errors.nameOnCard}
                </HelperText>
              </View>
            )}

            {/* Mobile Payment Methods */}
            {(formData.paymentMethod === 'snapscan' || formData.paymentMethod === 'zapper') && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  {formData.paymentMethod === 'snapscan' ? 'SnapScan' : 'Zapper'} Payment
                </Text>
                
                <Card style={styles.mobilePaymentCard}>
                  <Card.Content style={styles.mobilePaymentContent}>
                    <Text variant="bodyMedium" style={styles.mobilePaymentText}>
                      You will be redirected to {formData.paymentMethod === 'snapscan' ? 'SnapScan' : 'Zapper'} to complete your payment securely.
                    </Text>
                    <Text variant="bodySmall" style={styles.mobilePaymentSubtext}>
                      Amount: R {formData.amount}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            )}

            {/* Payment Reference */}
            <View style={styles.section}>
              <TextInput
                label="Payment Reference (Optional)"
                value={formData.reference}
                onChangeText={(value) => updateFormData('reference', value)}
                mode="outlined"
                error={!!errors.reference}
                style={styles.input}
                placeholder="e.g., January rent payment"
              />
              <HelperText type="error" visible={!!errors.reference}>
                {errors.reference}
              </HelperText>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <RadioButton
                value="agree"
                status={formData.agreeToTerms ? 'checked' : 'unchecked'}
                onPress={() => updateFormData('agreeToTerms', !formData.agreeToTerms)}
              />
              <Text variant="bodySmall" style={styles.termsText}>
                I agree to the Terms and Conditions and authorize this payment
              </Text>
            </View>
            {errors.agreeToTerms && (
              <HelperText type="error" visible={true}>
                {errors.agreeToTerms}
              </HelperText>
            )}

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => router.back()}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              
              <Button
                mode="contained"
                onPress={handlePayment}
                style={styles.button}
                contentStyle={styles.buttonContent}
                loading={isProcessing}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay R ' + formData.amount}
              </Button>
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
  summaryCard: {
    backgroundColor: '#dbeafe',
    marginBottom: 24,
    borderRadius: 12,
  },
  summaryTitle: {
    marginBottom: 12,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryAmount: {
    fontWeight: '500',
  },
  summaryDate: {
    color: '#64748b',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#93c5fd',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    color: '#1e40af',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#1e40af',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  segmentedButtons: {
    borderRadius: 12,
  },
  bankDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  bankInfo: {
    marginBottom: 4,
  },
  bankLabel: {
    fontWeight: 'bold',
    color: '#1e293b',
  },
  mobilePaymentCard: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
  },
  mobilePaymentContent: {
    padding: 16,
  },
  mobilePaymentText: {
    color: '#0c4a6e',
    marginBottom: 8,
  },
  mobilePaymentSubtext: {
    color: '#0369a1',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    color: '#64748b',
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
