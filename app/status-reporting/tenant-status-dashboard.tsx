import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, ProgressBar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TenantStatusDashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const accountStatus = {
    paymentStatus: 'current',
    nextDueDate: '2024-02-01',
    amountDue: 8500,
    daysUntilDue: 17,
    paymentHistory: [
      { month: 'December 2023', amount: 8500, status: 'paid', date: '2023-12-01' },
      { month: 'November 2023', amount: 8500, status: 'paid', date: '2023-11-01' },
      { month: 'October 2023', amount: 8500, status: 'paid', date: '2023-10-01' },
    ],
  };

  const leaseInfo = {
    startDate: '2023-03-15',
    endDate: '2024-03-15',
    monthlyRent: 8500,
    deposit: 17000,
    status: 'active',
    renewalDate: '2024-02-15',
  };

  const maintenanceRequests = [
    {
      id: 1,
      title: 'Kitchen tap leaking',
      status: 'completed',
      date: '2024-01-10',
      priority: 'normal',
    },
    {
      id: 2,
      title: 'Light fixture not working',
      status: 'in-progress',
      date: '2024-01-12',
      priority: 'normal',
    },
    {
      id: 3,
      title: 'Air conditioning repair',
      status: 'pending',
      date: '2024-01-14',
      priority: 'high',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Lease Renewal Due',
      date: '2024-02-15',
      type: 'lease',
      urgent: true,
    },
    {
      id: 2,
      title: 'Property Inspection',
      date: '2024-02-20',
      type: 'inspection',
      urgent: false,
    },
    {
      id: 3,
      title: 'Community Meeting',
      date: '2024-02-25',
      type: 'event',
      urgent: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return '#059669';
      case 'overdue': return '#dc2626';
      case 'pending': return '#d97706';
      case 'completed': return '#059669';
      case 'in-progress': return '#2563eb';
      default: return '#64748b';
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status) {
      case 'current':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      case 'overdue':
        return { backgroundColor: '#fef2f2', borderColor: '#dc2626' };
      case 'pending':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      case 'completed':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      case 'in-progress':
        return { backgroundColor: '#dbeafe', borderColor: '#2563eb' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#64748b' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#d97706';
      case 'normal': return '#059669';
      default: return '#64748b';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateLeaseProgress = () => {
    const start = new Date(leaseInfo.startDate);
    const end = new Date(leaseInfo.endDate);
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Status Overview */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <Text variant="titleLarge" style={styles.statusTitle}>
                Account Status
              </Text>
              <Chip 
                mode="outlined" 
                style={[styles.statusChip, getStatusChipStyle(accountStatus.paymentStatus)]}
              >
                {accountStatus.paymentStatus}
              </Chip>
            </View>
            
            <View style={styles.statusDetails}>
              <View style={styles.statusItem}>
                <Text variant="bodySmall" style={styles.statusLabel}>
                  Next Payment Due
                </Text>
                <Text variant="titleMedium" style={styles.statusValue}>
                  {formatDate(accountStatus.nextDueDate)}
                </Text>
                <Text variant="bodySmall" style={styles.statusSubtext}>
                  {accountStatus.daysUntilDue} days remaining
                </Text>
              </View>
              
              <View style={styles.statusItem}>
                <Text variant="bodySmall" style={styles.statusLabel}>
                  Amount Due
                </Text>
                <Text variant="titleLarge" style={styles.amountValue}>
                  R {accountStatus.amountDue.toLocaleString()}
                </Text>
              </View>
            </View>
            
            <Button
              mode="contained"
              onPress={() => router.push('/payment-management/tenant-payment-portal')}
              style={styles.payButton}
            >
              Make Payment
            </Button>
          </Card.Content>
        </Card>

        {/* Lease Information */}
        <Card style={styles.leaseCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.leaseTitle}>
              Lease Information
            </Text>
            
            <View style={styles.leaseProgress}>
              <Text variant="bodyMedium" style={styles.progressLabel}>
                Lease Progress
              </Text>
              <ProgressBar 
                progress={calculateLeaseProgress() / 100} 
                color="#2563eb"
                style={styles.progressBar}
              />
              <Text variant="bodySmall" style={styles.progressText}>
                {calculateLeaseProgress().toFixed(1)}% complete
              </Text>
            </View>
            
            <View style={styles.leaseDetails}>
              <View style={styles.leaseRow}>
                <Text variant="bodyMedium">Start Date:</Text>
                <Text variant="bodyMedium" style={styles.leaseValue}>
                  {formatDate(leaseInfo.startDate)}
                </Text>
              </View>
              
              <View style={styles.leaseRow}>
                <Text variant="bodyMedium">End Date:</Text>
                <Text variant="bodyMedium" style={styles.leaseValue}>
                  {formatDate(leaseInfo.endDate)}
                </Text>
              </View>
              
              <View style={styles.leaseRow}>
                <Text variant="bodyMedium">Monthly Rent:</Text>
                <Text variant="bodyMedium" style={styles.leaseValue}>
                  R {leaseInfo.monthlyRent.toLocaleString()}
                </Text>
              </View>
              
              <View style={styles.leaseRow}>
                <Text variant="bodyMedium">Deposit:</Text>
                <Text variant="bodyMedium" style={styles.leaseValue}>
                  R {leaseInfo.deposit.toLocaleString()}
                </Text>
              </View>
            </View>
            
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.leaseButton}
            >
              View Lease Agreement
            </Button>
          </Card.Content>
        </Card>

        {/* Maintenance Requests */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Maintenance Requests
          </Text>
          
          {maintenanceRequests.map((request) => (
            <Card key={request.id} style={styles.requestCard}>
              <Card.Content>
                <View style={styles.requestHeader}>
                  <Text variant="titleMedium" style={styles.requestTitle}>
                    {request.title}
                  </Text>
                  <Chip 
                    mode="outlined" 
                    style={[styles.statusChip, getStatusChipStyle(request.status)]}
                  >
                    {request.status}
                  </Chip>
                </View>
                
                <View style={styles.requestDetails}>
                  <Text variant="bodySmall" style={styles.requestDate}>
                    Submitted: {formatDate(request.date)}
                  </Text>
                  <Text variant="bodySmall" style={styles.requestPriority}>
                    Priority: {request.priority}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
          
          <Button
            mode="outlined"
            onPress={() => router.push('/communication/maintenance-request-form')}
            style={styles.newRequestButton}
            icon="plus"
          >
            New Request
          </Button>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Upcoming Events
          </Text>
          
          {upcomingEvents.map((event) => (
            <Card key={event.id} style={styles.eventCard}>
              <Card.Content>
                <View style={styles.eventHeader}>
                  <View style={styles.eventInfo}>
                    <Text variant="titleMedium" style={styles.eventTitle}>
                      {event.title}
                    </Text>
                    <Text variant="bodyMedium" style={styles.eventDate}>
                      {formatDate(event.date)}
                    </Text>
                  </View>
                  
                  {event.urgent && (
                    <Chip mode="outlined" style={styles.urgentChip}>
                      Urgent
                    </Chip>
                  )}
                </View>
                
                <Text variant="bodySmall" style={styles.eventType}>
                  Type: {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.actionsTitle}>
              Quick Actions
            </Text>
            
            <View style={styles.actionsGrid}>
              <Button
                mode="outlined"
                onPress={() => router.push('/booking-amenities/amenity-booking')}
                style={styles.actionButton}
                icon="calendar"
              >
                Book Amenity
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => router.push('/communication/maintenance-request-form')}
                style={styles.actionButton}
                icon="toolbox"
              >
                Report Issue
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => router.push('/access-control/tenant-access-portal')}
                style={styles.actionButton}
                icon="key"
              >
                Access Control
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => router.push('/communication/tenant-communication')}
                style={styles.actionButton}
                icon="message"
              >
                Messages
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
    padding: 20,
  },
  statusCard: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: '#dbeafe',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    color: '#1e40af',
    fontWeight: 'bold',
  },
  statusChip: {
    borderRadius: 16,
  },
  statusDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusLabel: {
    color: '#64748b',
    marginBottom: 4,
  },
  statusValue: {
    color: '#1e293b',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusSubtext: {
    color: '#64748b',
  },
  amountValue: {
    color: '#1e40af',
    fontWeight: 'bold',
  },
  payButton: {
    borderRadius: 12,
    backgroundColor: '#1e40af',
  },
  leaseCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  leaseTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  leaseProgress: {
    marginBottom: 16,
  },
  progressLabel: {
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    color: '#64748b',
    textAlign: 'center',
  },
  leaseDetails: {
    marginBottom: 16,
  },
  leaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leaseValue: {
    fontWeight: '500',
  },
  leaseButton: {
    borderRadius: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  requestCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestTitle: {
    color: '#1e293b',
    fontWeight: 'bold',
    flex: 1,
  },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  requestDate: {
    color: '#64748b',
  },
  requestPriority: {
    color: '#64748b',
  },
  newRequestButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
  eventDate: {
    color: '#64748b',
  },
  urgentChip: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
  },
  eventType: {
    color: '#64748b',
  },
  actionsCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  actionsTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 8,
  },
});
