import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { Text, Card, Button, Chip, FAB, IconButton, Dialog, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TenantAccessPortalScreen() {
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const [guestCode, setGuestCode] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestDuration, setGuestDuration] = useState('2');

  const accessCards = [
    {
      id: 1,
      name: 'Main Entrance',
      type: 'building',
      status: 'active',
      lastUsed: '2024-01-15T08:30:00',
      icon: '🏢',
    },
    {
      id: 2,
      name: 'Gym Access',
      type: 'amenity',
      status: 'active',
      lastUsed: '2024-01-14T18:00:00',
      icon: '🏋️',
    },
    {
      id: 3,
      name: 'Pool Area',
      type: 'amenity',
      status: 'active',
      lastUsed: '2024-01-13T16:30:00',
      icon: '🏊',
    },
    {
      id: 4,
      name: 'Parking Garage',
      type: 'parking',
      status: 'active',
      lastUsed: '2024-01-15T09:15:00',
      icon: '🚗',
    },
  ];

  const recentAccess = [
    {
      id: 1,
      location: 'Main Entrance',
      time: '2024-01-15T08:30:00',
      type: 'entry',
      method: 'Digital Card',
    },
    {
      id: 2,
      location: 'Parking Garage',
      time: '2024-01-15T09:15:00',
      type: 'entry',
      method: 'Digital Card',
    },
    {
      id: 3,
      location: 'Gym Access',
      time: '2024-01-14T18:00:00',
      type: 'entry',
      method: 'Digital Card',
    },
    {
      id: 4,
      location: 'Main Entrance',
      time: '2024-01-14T19:30:00',
      type: 'exit',
      method: 'Digital Card',
    },
  ];

  const guestCodes = [
    {
      id: 1,
      code: 'GUEST123',
      name: 'John Smith',
      created: '2024-01-15T10:00:00',
      expires: '2024-01-15T12:00:00',
      used: false,
    },
    {
      id: 2,
      code: 'GUEST456',
      name: 'Sarah Johnson',
      created: '2024-01-14T14:00:00',
      expires: '2024-01-14T18:00:00',
      used: true,
    },
  ];

  const generateGuestCode = () => {
    if (!guestName.trim()) {
      Alert.alert('Error', 'Please enter guest name');
      return;
    }

    const code = 'GUEST' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setGuestCode(code);
    
    Alert.alert(
      'Guest Code Generated',
      `Code: ${code}\nValid for ${guestDuration} hours`,
      [{ text: 'OK', onPress: () => setShowGuestDialog(false) }]
    );
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-ZA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#059669';
      case 'inactive': return '#dc2626';
      case 'expired': return '#d97706';
      default: return '#64748b';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      case 'inactive':
        return { backgroundColor: '#fef2f2', borderColor: '#dc2626' };
      case 'expired':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#64748b' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Digital Access Card */}
        <Card style={styles.accessCard}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Digital Access Card
              </Text>
              <Chip mode="outlined" style={styles.activeChip}>
                Active
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.cardSubtitle}>
              Tap to use your phone as an access card
            </Text>
            
            <View style={styles.cardVisual}>
              <Text style={styles.cardIcon}>📱</Text>
              <Text variant="titleMedium" style={styles.cardNumber}>
                Unit 4A - John Doe
              </Text>
            </View>
            
            <Button
              mode="contained"
              onPress={() => Alert.alert('Access', 'Digital card activated!')}
              style={styles.activateButton}
            >
              Activate Card
            </Button>
          </Card.Content>
        </Card>

        {/* Access Permissions */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Access Permissions
          </Text>
          
          {accessCards.map((card) => (
            <Card key={card.id} style={styles.permissionCard}>
              <Card.Content>
                <View style={styles.permissionHeader}>
                  <View style={styles.permissionInfo}>
                    <Text style={styles.permissionIcon}>{card.icon}</Text>
                    <View>
                      <Text variant="titleMedium" style={styles.permissionName}>
                        {card.name}
                      </Text>
                      <Text variant="bodySmall" style={styles.permissionType}>
                        {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <Chip 
                    mode="outlined" 
                    style={[styles.statusChip, getStatusChipStyle(card.status)]}
                  >
                    {card.status}
                  </Chip>
                </View>
                
                <Text variant="bodySmall" style={styles.lastUsed}>
                  Last used: {formatDateTime(card.lastUsed)}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Recent Access */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recent Access
          </Text>
          
          {recentAccess.map((access) => (
            <Card key={access.id} style={styles.accessLogCard}>
              <Card.Content>
                <View style={styles.accessLogHeader}>
                  <View style={styles.accessLogInfo}>
                    <Text variant="titleMedium" style={styles.accessLocation}>
                      {access.location}
                    </Text>
                    <Text variant="bodySmall" style={styles.accessTime}>
                      {formatDateTime(access.time)}
                    </Text>
                  </View>
                  
                  <View style={styles.accessLogActions}>
                    <Chip 
                      mode="outlined" 
                      style={[
                        styles.typeChip,
                        access.type === 'entry' ? styles.entryChip : styles.exitChip
                      ]}
                    >
                      {access.type}
                    </Chip>
                  </View>
                </View>
                
                <Text variant="bodySmall" style={styles.accessMethod}>
                  Method: {access.method}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Guest Access */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Guest Access Codes
          </Text>
          
          {guestCodes.map((code) => (
            <Card key={code.id} style={styles.guestCodeCard}>
              <Card.Content>
                <View style={styles.guestCodeHeader}>
                  <View style={styles.guestCodeInfo}>
                    <Text variant="titleMedium" style={styles.guestCodeName}>
                      {code.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.guestCodeCode}>
                      Code: {code.code}
                    </Text>
                  </View>
                  
                  <Chip 
                    mode="outlined" 
                    style={[
                      styles.statusChip,
                      code.used ? styles.usedChip : styles.activeChip
                    ]}
                  >
                    {code.used ? 'Used' : 'Active'}
                  </Chip>
                </View>
                
                <Text variant="bodySmall" style={styles.guestCodeExpiry}>
                  Expires: {formatDateTime(code.expires)}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowGuestDialog(true)}
        label="Guest Code"
      />

      <Portal>
        <Dialog visible={showGuestDialog} onDismiss={() => setShowGuestDialog(false)}>
          <Dialog.Title>Generate Guest Access Code</Dialog.Title>
          <Dialog.Content>
            <View style={styles.dialogContent}>
              <Text variant="bodyMedium" style={styles.dialogLabel}>
                Guest Name
              </Text>
              <TextInput
                value={guestName}
                onChangeText={setGuestName}
                mode="outlined"
                placeholder="Enter guest name"
                style={styles.dialogInput}
              />
              
              <Text variant="bodyMedium" style={styles.dialogLabel}>
                Duration (hours)
              </Text>
              <View style={styles.durationButtons}>
                {['1', '2', '4', '8'].map((duration) => (
                  <Button
                    key={duration}
                    mode={guestDuration === duration ? 'contained' : 'outlined'}
                    onPress={() => setGuestDuration(duration)}
                    style={styles.durationButton}
                  >
                    {duration}h
                  </Button>
                ))}
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowGuestDialog(false)}>Cancel</Button>
            <Button onPress={generateGuestCode}>Generate</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  accessCard: {
    marginBottom: 24,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: '#1e40af',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#dbeafe',
    marginBottom: 20,
  },
  activeChip: {
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  cardVisual: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activateButton: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  permissionCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  permissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  permissionName: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  permissionType: {
    color: '#64748b',
  },
  statusChip: {
    borderRadius: 16,
  },
  lastUsed: {
    color: '#64748b',
  },
  accessLogCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  accessLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accessLogInfo: {
    flex: 1,
  },
  accessLocation: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  accessTime: {
    color: '#64748b',
  },
  accessLogActions: {
    flexDirection: 'row',
  },
  typeChip: {
    borderRadius: 16,
  },
  entryChip: {
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  exitChip: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  accessMethod: {
    color: '#64748b',
  },
  guestCodeCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  guestCodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  guestCodeInfo: {
    flex: 1,
  },
  guestCodeName: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  guestCodeCode: {
    color: '#64748b',
  },
  usedChip: {
    backgroundColor: '#f1f5f9',
    borderColor: '#64748b',
  },
  guestCodeExpiry: {
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2563eb',
  },
  dialogContent: {
    gap: 16,
  },
  dialogLabel: {
    color: '#1e293b',
    fontWeight: '500',
  },
  dialogInput: {
    backgroundColor: 'transparent',
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    flex: 1,
    borderRadius: 8,
  },
});
