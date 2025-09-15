import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, SegmentedButtons, DatePickerModal, TimePickerModal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function AmenityBookingScreen() {
  const [selectedAmenity, setSelectedAmenity] = useState('gym');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bookingDuration, setBookingDuration] = useState('1');

  const amenities = [
    {
      id: 'gym',
      name: 'Gym',
      description: 'Fully equipped fitness center with cardio and weight training equipment',
      capacity: 8,
      hourlyRate: 0,
      image: '🏋️',
      rules: ['Bring your own towel', 'Wipe down equipment after use', 'No food or drinks'],
    },
    {
      id: 'pool',
      name: 'Swimming Pool',
      description: 'Outdoor swimming pool with changing facilities',
      capacity: 12,
      hourlyRate: 0,
      image: '🏊',
      rules: ['Shower before entering', 'No diving in shallow end', 'Children must be supervised'],
    },
    {
      id: 'braai',
      name: 'Braai Area',
      description: 'Outdoor braai area with seating and tables',
      capacity: 20,
      hourlyRate: 0,
      image: '🔥',
      rules: ['Clean up after use', 'No loud music after 10 PM', 'Bring your own charcoal'],
    },
    {
      id: 'tennis',
      name: 'Tennis Court',
      description: 'Professional tennis court with lighting',
      capacity: 4,
      hourlyRate: 50,
      image: '🎾',
      rules: ['Bring your own equipment', 'Book in advance', 'No shoes with black soles'],
    },
    {
      id: 'meeting',
      name: 'Meeting Room',
      description: 'Conference room with projector and seating for 12',
      capacity: 12,
      hourlyRate: 100,
      image: '🏢',
      rules: ['No food or drinks', 'Clean up after use', 'Return keys to reception'],
    },
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const durations = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '3', label: '3 Hours' },
    { value: '4', label: '4 Hours' },
  ];

  const selectedAmenityData = amenities.find(a => a.id === selectedAmenity);
  const totalCost = selectedAmenityData ? selectedAmenityData.hourlyRate * parseInt(bookingDuration) : 0;

  const getAvailableSlots = () => {
    // Mock data - in real app, this would come from API
    const bookedSlots = ['09:00', '10:00', '14:00', '15:00'];
    return timeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const handleBooking = () => {
    if (selectedTimeSlot) {
      // Process booking
      router.push('/booking-amenities/booking-details');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium" style={styles.title}>
              Book Amenities
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Reserve your time at our facilities
            </Text>

            {/* Amenity Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Select Amenity
              </Text>
              <SegmentedButtons
                value={selectedAmenity}
                onValueChange={setSelectedAmenity}
                buttons={amenities.map(amenity => ({
                  value: amenity.id,
                  label: amenity.name,
                }))}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Selected Amenity Details */}
            {selectedAmenityData && (
              <Card style={styles.amenityCard}>
                <Card.Content>
                  <View style={styles.amenityHeader}>
                    <Text style={styles.amenityIcon}>{selectedAmenityData.image}</Text>
                    <View style={styles.amenityInfo}>
                      <Text variant="titleMedium" style={styles.amenityName}>
                        {selectedAmenityData.name}
                      </Text>
                      <Text variant="bodyMedium" style={styles.amenityDescription}>
                        {selectedAmenityData.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.amenityDetails}>
                    <View style={styles.detailItem}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Capacity:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {selectedAmenityData.capacity} people
                      </Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text variant="bodySmall" style={styles.detailLabel}>
                        Rate:
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        {selectedAmenityData.hourlyRate === 0 ? 'Free' : `R ${selectedAmenityData.hourlyRate}/hour`}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}

            {/* Date Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Select Date
              </Text>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
                icon="calendar"
              >
                {formatDate(selectedDate)}
              </Button>
            </View>

            {/* Duration Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Duration
              </Text>
              <SegmentedButtons
                value={bookingDuration}
                onValueChange={setBookingDuration}
                buttons={durations}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Time Slot Selection */}
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Available Time Slots
              </Text>
              <View style={styles.timeSlotsContainer}>
                {getAvailableSlots().map((slot) => (
                  <Chip
                    key={slot}
                    selected={selectedTimeSlot === slot}
                    onPress={() => setSelectedTimeSlot(slot)}
                    style={[
                      styles.timeSlotChip,
                      selectedTimeSlot === slot && styles.selectedTimeSlot
                    ]}
                  >
                    {slot}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Rules and Guidelines */}
            {selectedAmenityData && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Rules & Guidelines
                </Text>
                <Card style={styles.rulesCard}>
                  <Card.Content>
                    {selectedAmenityData.rules.map((rule, index) => (
                      <Text key={index} variant="bodySmall" style={styles.ruleItem}>
                        • {rule}
                      </Text>
                    ))}
                  </Card.Content>
                </Card>
              </View>
            )}

            {/* Booking Summary */}
            {selectedTimeSlot && (
              <Card style={styles.summaryCard}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.summaryTitle}>
                    Booking Summary
                  </Text>
                  <View style={styles.summaryRow}>
                    <Text variant="bodyMedium">Amenity:</Text>
                    <Text variant="bodyMedium" style={styles.summaryValue}>
                      {selectedAmenityData?.name}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text variant="bodyMedium">Date:</Text>
                    <Text variant="bodyMedium" style={styles.summaryValue}>
                      {formatDate(selectedDate)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text variant="bodyMedium">Time:</Text>
                    <Text variant="bodyMedium" style={styles.summaryValue}>
                      {selectedTimeSlot} - {parseInt(selectedTimeSlot) + parseInt(bookingDuration)}:00
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text variant="bodyMedium">Duration:</Text>
                    <Text variant="bodyMedium" style={styles.summaryValue}>
                      {bookingDuration} hour{parseInt(bookingDuration) > 1 ? 's' : ''}
                    </Text>
                  </View>
                  {totalCost > 0 && (
                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text variant="titleMedium" style={styles.totalLabel}>
                        Total Cost:
                      </Text>
                      <Text variant="titleLarge" style={styles.totalAmount}>
                        R {totalCost}
                      </Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            )}

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
                onPress={handleBooking}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={!selectedTimeSlot}
              >
                Confirm Booking
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        date={selectedDate}
        onConfirm={(params) => {
          setShowDatePicker(false);
          setSelectedDate(params.date);
          setSelectedTimeSlot(''); // Reset time slot when date changes
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
  amenityCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  amenityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  amenityInfo: {
    flex: 1,
  },
  amenityName: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  amenityDescription: {
    color: '#64748b',
    marginTop: 4,
  },
  amenityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#64748b',
    marginBottom: 4,
  },
  detailValue: {
    color: '#1e293b',
    fontWeight: '500',
  },
  dateButton: {
    borderRadius: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlotChip: {
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  selectedTimeSlot: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  rulesCard: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
  },
  ruleItem: {
    color: '#92400e',
    marginBottom: 4,
  },
  summaryCard: {
    backgroundColor: '#d1fae5',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  summaryTitle: {
    marginBottom: 12,
    color: '#065f46',
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#a7f3d0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    color: '#065f46',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#065f46',
    fontWeight: 'bold',
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
