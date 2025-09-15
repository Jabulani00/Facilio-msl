import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function AnnouncementsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState({});

  const announcements = [
    {
      id: 1,
      title: 'New Year Community Party',
      content: 'Join us for our annual New Year celebration in the common area on January 1st at 6 PM. Food and drinks will be provided.',
      type: 'event',
      priority: 'normal',
      author: 'Property Management',
      date: '2024-01-15',
      read: false,
      attachments: ['party-flyer.pdf'],
    },
    {
      id: 2,
      title: 'Elevator Maintenance Schedule',
      content: 'The elevator will be under maintenance on January 20th from 8 AM to 2 PM. Please use the stairs during this time.',
      type: 'maintenance',
      priority: 'high',
      author: 'Maintenance Team',
      date: '2024-01-10',
      read: true,
      attachments: [],
    },
    {
      id: 3,
      title: 'Updated Parking Rules',
      content: 'Please note that visitor parking is limited to 2 hours. Unauthorized vehicles will be towed at owner\'s expense.',
      type: 'policy',
      priority: 'normal',
      author: 'Property Management',
      date: '2024-01-08',
      read: true,
      attachments: ['parking-rules.pdf'],
    },
    {
      id: 4,
      title: 'Water Supply Interruption',
      content: 'Water supply will be temporarily interrupted on January 25th from 9 AM to 12 PM for pipe maintenance.',
      type: 'maintenance',
      priority: 'urgent',
      author: 'Maintenance Team',
      date: '2024-01-12',
      read: false,
      attachments: [],
    },
    {
      id: 5,
      title: 'Gym Equipment Upgrade',
      content: 'New cardio equipment has been installed in the gym. Please familiarize yourself with the new machines.',
      type: 'improvement',
      priority: 'normal',
      author: 'Property Management',
      date: '2024-01-05',
      read: true,
      attachments: ['gym-guide.pdf'],
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || announcement.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#d97706';
      case 'normal': return '#059669';
      default: return '#64748b';
    }
  };

  const getPriorityChipStyle = (priority) => {
    switch (priority) {
      case 'urgent':
        return { backgroundColor: '#fef2f2', borderColor: '#dc2626' };
      case 'high':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      case 'normal':
        return { backgroundColor: '#d1fae5', borderColor: '#059669' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#64748b' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event': return '🎉';
      case 'maintenance': return '🔧';
      case 'policy': return '📋';
      case 'improvement': return '✨';
      default: return '📢';
    }
  };

  const toggleMenu = (announcementId) => {
    setMenuVisible(prev => ({
      ...prev,
      [announcementId]: !prev[announcementId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search announcements..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>

        <View style={styles.filterContainer}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={selectedFilter === 'event'}
            onPress={() => setSelectedFilter('event')}
            style={styles.filterChip}
          >
            Events
          </Chip>
          <Chip
            selected={selectedFilter === 'maintenance'}
            onPress={() => setSelectedFilter('maintenance')}
            style={styles.filterChip}
          >
            Maintenance
          </Chip>
          <Chip
            selected={selectedFilter === 'policy'}
            onPress={() => setSelectedFilter('policy')}
            style={styles.filterChip}
          >
            Policy
          </Chip>
        </View>

        {/* Unread Count */}
        <View style={styles.unreadContainer}>
          <Text variant="titleMedium" style={styles.unreadText}>
            {announcements.filter(a => !a.read).length} unread announcements
          </Text>
        </View>

        {/* Announcements List */}
        <View style={styles.announcementsContainer}>
          {filteredAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              style={[
                styles.announcementCard,
                !announcement.read && styles.unreadCard
              ]}
            >
              <Card.Content>
                <View style={styles.announcementHeader}>
                  <View style={styles.announcementInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.typeIcon}>
                        {getTypeIcon(announcement.type)}
                      </Text>
                      <Text variant="titleMedium" style={[
                        styles.announcementTitle,
                        !announcement.read && styles.unreadTitle
                      ]}>
                        {announcement.title}
                      </Text>
                    </View>
                    <Text variant="bodySmall" style={styles.announcementMeta}>
                      By {announcement.author} • {formatDate(announcement.date)}
                    </Text>
                  </View>
                  
                  <View style={styles.announcementActions}>
                    <Chip 
                      mode="outlined" 
                      style={[styles.priorityChip, getPriorityChipStyle(announcement.priority)]}
                    >
                      {announcement.priority}
                    </Chip>
                    
                    <Menu
                      visible={menuVisible[announcement.id] || false}
                      onDismiss={() => toggleMenu(announcement.id)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          onPress={() => toggleMenu(announcement.id)}
                        />
                      }
                    >
                      <Menu.Item onPress={() => {}} title="Mark as Read" />
                      <Menu.Item onPress={() => {}} title="Share" />
                      <Menu.Item onPress={() => {}} title="Archive" />
                    </Menu>
                  </View>
                </View>
                
                <Text variant="bodyMedium" style={styles.announcementContent}>
                  {announcement.content}
                </Text>
                
                {announcement.attachments.length > 0 && (
                  <View style={styles.attachmentsContainer}>
                    <Text variant="bodySmall" style={styles.attachmentsLabel}>
                      Attachments:
                    </Text>
                    {announcement.attachments.map((attachment, index) => (
                      <Chip key={index} mode="outlined" style={styles.attachmentChip}>
                        📎 {attachment}
                      </Chip>
                    ))}
                  </View>
                )}
                
                <View style={styles.announcementActions}>
                  <Button
                    mode="outlined"
                    onPress={() => {}}
                    style={styles.actionButton}
                    compact
                  >
                    View Details
                  </Button>
                  
                  {!announcement.read && (
                    <Button
                      mode="contained"
                      onPress={() => {}}
                      style={styles.actionButton}
                      compact
                    >
                      Mark as Read
                    </Button>
                  )}
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {filteredAnnouncements.length === 0 && (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                No announcements found
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Try adjusting your search or filter criteria
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/communication/create-announcement')}
        label="New Announcement"
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
    padding: 20,
    paddingBottom: 100,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchbar: {
    elevation: 2,
    borderRadius: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterChip: {
    borderRadius: 20,
  },
  unreadContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  unreadText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  announcementsContainer: {
    marginBottom: 20,
  },
  announcementCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    backgroundColor: '#f8fafc',
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  announcementInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  announcementTitle: {
    color: '#1e293b',
    fontWeight: 'bold',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  announcementMeta: {
    color: '#64748b',
  },
  announcementActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityChip: {
    borderRadius: 16,
    marginRight: 8,
  },
  announcementContent: {
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  attachmentsContainer: {
    marginBottom: 12,
  },
  attachmentsLabel: {
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },
  attachmentChip: {
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    marginBottom: 4,
  },
  announcementActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  emptyCard: {
    elevation: 2,
    borderRadius: 12,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#9ca3af',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2563eb',
  },
});
