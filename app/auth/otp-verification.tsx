import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput as RNTextInput, Dimensions } from 'react-native';
import { Text, Button, Card, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';
import { AuthService } from '../../services/auth';

const { width, height } = Dimensions.get('window');

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Clear errors when user starts typing
    if (errors) {
      setErrors('');
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateOTP = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors('Please enter the complete 6-digit OTP');
      return false;
    }
    if (!/^\d{6}$/.test(otpString)) {
      setErrors('OTP must contain only numbers');
      return false;
    }
    return true;
  };

  const handleVerify = async () => {
    if (!validateOTP()) return;
    const ok = await AuthService.verifyOTP('email', otp.join(''));
    if (!ok) {
      setErrors('Invalid code');
      return;
    }
    router.push('/dashboard/property-manager');
  };

  const handleResend = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrors('');
    // Focus first input
    inputRefs.current[0]?.focus();
    await AuthService.sendOTP('email');
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
        
        <View style={styles.content}>
          <Card style={styles.card} elevation={16}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineMedium" style={styles.title}>
                Verify Your Account
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                We've sent a 6-digit verification code to your email address
              </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <RNTextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null,
                    errors ? styles.otpInputError : null,
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {errors ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleVerify}
              style={styles.verifyButton}
              contentStyle={styles.buttonContent}
            >
              Verify Account
            </Button>

            <View style={styles.resendContainer}>
              {canResend ? (
                <Button
                  mode="text"
                  onPress={handleResend}
                  style={styles.resendButton}
                >
                  Resend Code
                </Button>
              ) : (
                <Text variant="bodySmall" style={styles.timerText}>
                  Resend code in {timeLeft}s
                </Text>
              )}
            </View>

            <View style={styles.helpContainer}>
              <Text variant="bodySmall" style={styles.helpText}>
                Didn't receive the code? Check your spam folder or contact support.
              </Text>
            </View>
          </Card.Content>
        </Card>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    zIndex: 1,
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
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 36,
    color: colors.textSecondary,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    backgroundColor: colors.surface,
    textAlign: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryContainer,
  },
  otpInputError: {
    borderColor: colors.error,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  // Elegant smaller buttons
  verifyButton: {
    marginBottom: 28,
    borderRadius: 20,
    minWidth: 200,
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
  resendContainer: {
    marginBottom: 20,
  },
  resendButton: {
    borderRadius: 16,
  },
  timerText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  helpContainer: {
    paddingHorizontal: 24,
  },
  helpText: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    letterSpacing: 0.2,
  },
});
