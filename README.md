# Facilio - Property Management Platform

A comprehensive property management solution built with React Native and Expo, designed specifically for the South African market. Facilio streamlines property management operations, tenant services, and building administration through a modern, mobile-first interface.

## 🏠 Features

### Authentication & Onboarding
- **Property Manager Registration**: Complete business registration with OTP verification
- **Tenant Invitation System**: Streamlined tenant onboarding process
- **Multi-Role Login**: Role-based access for Property Managers, Tenants, and Maintenance Staff
- **Secure Authentication**: Firebase-powered authentication with email verification

### Property & Unit Management
- **Property Portfolio Dashboard**: Comprehensive overview with occupancy rates and financial metrics
- **Unit Management Interface**: Detailed unit information, photos, floor plans, and status tracking
- **Tenant Assignment Workflow**: Intuitive tenant-to-unit assignment with lease validation
- **Real-time Status Updates**: Live occupancy and availability tracking

### Payment Management
- **Rent Collection Dashboard**: Monitor payments across all properties with filtering and search
- **Tenant Payment Portal**: Secure payment processing with multiple South African payment methods
- **Automated Payment Reminders**: Customizable reminder system to reduce late payments
- **Payment History & Reporting**: Complete transaction history and financial reporting

### Booking & Amenities
- **Amenity Booking System**: Book gym, pool, braai areas, and other facilities
- **Booking Management Interface**: Configure amenities, set rules, and manage capacity
- **Real-time Availability**: Live booking calendar with conflict resolution
- **Booking Notifications**: Automated confirmations and reminders

### Communication & Announcements
- **Property Announcements**: Send targeted messages to tenants with rich media support
- **Tenant Communication Hub**: Centralized messaging with priority and read status
- **Maintenance Request System**: Photo-enabled issue reporting with status tracking
- **Delivery Tracking**: Message delivery confirmation and engagement metrics

### Access Control & Security
- **Digital Access Management**: Manage digital access cards and permissions
- **Tenant Access Portal**: Use phone as digital access card with temporary guest codes
- **Access Monitoring Dashboard**: Real-time access logs and security reporting
- **Guest Access System**: Generate temporary access codes for visitors

### Status Tracking & Reporting
- **Property Status Overview**: Real-time property health monitoring
- **Tenant Status Dashboard**: Account status, lease information, and compliance tracking
- **Financial Reporting Interface**: Comprehensive financial analytics and tax reporting
- **Performance Analytics**: Occupancy trends, revenue analysis, and predictive insights

### Mobile-First Design
- **Responsive Interface**: Optimized for mobile devices with touch-friendly controls
- **Offline Capability**: Access critical information even with poor connectivity
- **Push Notifications**: Real-time alerts for payments, maintenance, and bookings
- **Progressive Web App**: Install as native app on mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/facilio.git
   cd facilio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Add your Firebase configuration to `firebase.config.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📱 User Roles

### Property Manager
- Complete property portfolio management
- Tenant assignment and lease management
- Financial reporting and analytics
- Maintenance request oversight
- Communication and announcements

### Tenant
- Account status and payment management
- Amenity booking and reservations
- Maintenance request submission
- Communication with property management
- Digital access control

### Maintenance Staff
- Maintenance request management
- Work scheduling and completion tracking
- Inventory and supply management
- Performance reporting

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **UI Components**: React Native Paper (Material Design 3)
- **State Management**: React Hooks and Context API
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Charts**: React Native Chart Kit
- **Image Handling**: Expo Image Picker
- **Date/Time**: React Native Paper Date/Time Pickers

## 📁 Project Structure

```
facilio/
├── app/                          # Main application screens
│   ├── auth/                     # Authentication screens
│   ├── dashboard/                # Role-based dashboards
│   ├── property-management/      # Property management features
│   ├── payment-management/       # Payment processing
│   ├── booking-amenities/        # Amenity booking system
│   ├── communication/            # Messaging and announcements
│   ├── access-control/           # Digital access management
│   └── status-reporting/         # Analytics and reporting
├── constants/                    # App constants and theme
├── components/                   # Reusable UI components
├── utils/                        # Utility functions
└── assets/                       # Images, fonts, and other assets
```

## 🎨 Design System

The app follows Material Design 3 principles with a custom color palette optimized for property management:

- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Purple (#7c3aed) - Innovation and technology
- **Tertiary**: Green (#059669) - Success and financial health
- **Error**: Red (#dc2626) - Alerts and urgent actions
- **Surface**: Clean whites and light grays for readability

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication with email verification
- **Role-based Access Control**: Granular permissions based on user roles
- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Secure Payment Processing**: PCI-compliant payment handling
- **Access Logging**: Comprehensive audit trails for security monitoring

## 📊 Analytics & Reporting

- **Real-time Dashboards**: Live property and financial metrics
- **Custom Reports**: Generate reports for specific time periods and properties
- **Export Capabilities**: PDF and Excel export for external analysis
- **Performance Tracking**: Occupancy rates, revenue trends, and tenant satisfaction

## 🌍 South African Market Features

- **Local Payment Methods**: EFT, SnapScan, Zapper integration
- **ZAR Currency**: All financial displays in South African Rand
- **Local Regulations**: Compliance with South African rental laws
- **Regional Support**: Time zones and date formats for South Africa

## 🚀 Deployment

### Web Deployment
```bash
npm run deploy
```

### Mobile App Deployment
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@facilio.co.za
- Documentation: [docs.facilio.co.za](https://docs.facilio.co.za)
- Issues: [GitHub Issues](https://github.com/your-username/facilio/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core property management features
- ✅ Payment processing
- ✅ Basic reporting

### Phase 2 (Q2 2024)
- 🔄 Advanced analytics and AI insights
- 🔄 Integration with accounting software
- 🔄 Mobile app store deployment

### Phase 3 (Q3 2024)
- 📋 IoT integration for smart buildings
- 📋 Advanced maintenance scheduling
- 📋 Tenant satisfaction surveys

### Phase 4 (Q4 2024)
- 📋 Multi-language support
- 📋 Advanced security features
- 📋 API for third-party integrations

---

**Facilio** - Transforming property management in South Africa through technology and innovation."# Facilio-msl" 
