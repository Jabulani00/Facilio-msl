import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function MaintenanceRequestFormScreen() {
  const [formData, setFormData] = useState({
    category: 'plumbing',
    priority: 'normal',
    title: '',
    description: '',
    location: '',
    unitNumber: '4A',
    contactPhone: '',
    preferredTime: 'anytime',
    images: [],
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
    { value: 'electrical', label: 'Electrical', icon: '⚡' },
    { value: 'hvac', label: 'HVAC', icon: '🌡️' },
    { value: 'appliance', label: 'Appliance', icon: '🏠' },
    { value: 'structural', label: 'Structural', icon: '🏗️' },
    { value: 'other', label: 'Other', icon: '❓' },
  ];

  const priorities = [
    { value: 'urgent', label: 'Urgent', description: 'Safety hazard or major damage' },
    { value: 'high', label: 'High', description: 'Significant inconvenience' },
    { value: 'normal', label: 'Normal', description: 'General maintenance' },
    { value: 'low', label: 'Low', description: 'Minor issue' },
  ];

  const timeSlots = [
    { value: 'anytime', label: 'Anytime' },
    { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Please provide more details (at least 10 characters)';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Request Submitted',
          'Your maintenance request has been submitted successfully. You will receive updates via SMS and email.',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      }, 2000);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateFormData('images', [...formData.images, result.assets[0]]);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData('images', newImages);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#d97706';
      case 'normal': return '#059669';
      case 'low': return '#64748b';
      default: return '#64748b';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium" style={styles.title}>
              Report Maintenance Issue
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Describe the issue and we'll get it fixed quickly
            </Text>

            {/* Category Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Issue Category
              </Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <Chip
                    key={category.value}
                    selected={formData.category === category.value}
                    onPress={() => updateFormData('category', category.value)}
                    style={[
                      styles.categoryChip,
                      formData.category === category.value && styles.selectedCategoryChip
                    ]}
                    icon={() => <Text style={styles.categoryIcon}>{category.icon}</Text>}
                  >
                    {category.label}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Priority Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Priority Level
              </Text>
              {priorities.map((priority) => (
                <Card
                  key={priority.value}
                  style={[
                    styles.priorityCard,
                    formData.priority === priority.value && styles.selectedPriorityCard
                  ]}
                  onPress={() => updateFormData('priority', priority.value)}
                >
                  <Card.Content style={styles.priorityContent}>
                    <View style={styles.priorityHeader}>
                      <Text variant="titleMedium" style={styles.priorityLabel}>
                        {priority.label}
                      </Text>
                      <View style={[
                        styles.priorityIndicator,
                        { backgroundColor: getPriorityColor(priority.value) }
                      ]} />
                    </View>
                    <Text variant="bodySmall" style={styles.priorityDescription}>
                      {priority.description}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>

            {/* Issue Details */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Issue Details
              </Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Title"
                  value={formData.title}
                  onChangeText={(value) => updateFormData('title', value)}
                  mode="outlined"
                  error={!!errors.title}
                  style={styles.input}
                  placeholder="Brief description of the issue"
                />
                <HelperText type="error" visible={!!errors.title}>
                  {errors.title}
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Description"
                  value={formData.description}
                  onChangeText={(value) => updateFormData('description', value)}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  error={!!errors.description}
                  style={styles.input}
                  placeholder="Provide detailed information about the issue..."
                />
                <HelperText type="error" visible={!!errors.description}>
                  {errors.description}
                </HelperText>
                <HelperText type="info" visible={true}>
                  Include any relevant details that might help with the repair
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Location"
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                  mode="outlined"
                  error={!!errors.location}
                  style={styles.input}
                  placeholder="e.g., Kitchen, Bathroom, Living Room"
                />
                <HelperText type="error" visible={!!errors.location}>
                  {errors.location}
                </HelperText>
              </View>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Contact Information
              </Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Unit Number"
                  value={formData.unitNumber}
                  onChangeText={(value) => updateFormData('unitNumber', value)}
                  mode="outlined"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Contact Phone"
                  value={formData.contactPhone}
                  onChangeText={(value) => updateFormData('contactPhone', value)}
                  mode="outlined"
                  keyboardType="phone-pad"
                  error={!!errors.contactPhone}
                  style={styles.input}
                  placeholder="+27 82 123 4567"
                />
                <HelperText type="error" visible={!!errors.contactPhone}>
                  {errors.contactPhone}
                </HelperText>
              </View>

              <View style={styles.inputContainer}>
                <Text variant="bodyMedium" style={styles.preferredTimeLabel}>
                  Preferred Time for Maintenance
                </Text>
                <SegmentedButtons
                  value={formData.preferredTime}
                  onValueChange={(value) => updateFormData('preferredTime', value)}
                  buttons={timeSlots}
                  style={styles.segmentedButtons}
                />
              </View>
            </View>

            {/* Photo Upload */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Photos (Optional)
              </Text>
              <Text variant="bodySmall" style={styles.photoSubtext}>
                Add photos to help us understand the issue better
              </Text>
              
              <View style={styles.photoContainer}>
                {formData.images.map((image, index) => (
                  <Card key={index} style={styles.photoCard}>
                    <Card.Content style={styles.photoContent}>
                      <Text variant="bodySmall" style={styles.photoName}>
                        Photo {index + 1}
                      </Text>
                      <Button
                        mode="text"
                        onPress={() => removeImage(index)}
                        compact
                        textColor="#dc2626"
                      >
                        Remove
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
                
                {formData.images.length < 5 && (
                  <Button
                    mode="outlined"
                    onPress={pickImage}
                    style={styles.addPhotoButton}
                    icon="camera"
                  >
                    Add Photo
                  </Button>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => router.back()}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  selectedCategoryChip: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  categoryIcon: {
    fontSize: 16,
  },
  priorityCard: {
    marginBottom: 8,
    elevation: 1,
    borderRadius: 8,
  },
  selectedPriorityCard: {
    borderWidth: 2,
    borderColor: '#2563eb',
    backgroundColor: '#f8fafc',
  },
  priorityContent: {
    padding: 12,
  },
  priorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priorityLabel: {
    color: '#1e293b',
    fontWeight: '500',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityDescription: {
    color: '#64748b',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  preferredTimeLabel: {
    marginBottom: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  segmentedButtons: {
    borderRadius: 12,
  },
  photoSubtext: {
    color: '#64748b',
    marginBottom: 12,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoCard: {
    elevation: 1,
    borderRadius: 8,
  },
  photoContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photoName: {
    color: '#64748b',
  },
  addPhotoButton: {
    borderRadius: 8,
    borderStyle: 'dashed',
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
