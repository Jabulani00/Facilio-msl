# Facilio Property Management App - Architecture Documentation

## Overview
Facilio is a comprehensive property management application built with React Native and Expo Router. The app serves three primary user types: Property Managers, Tenants, and Maintenance Staff, each with tailored interfaces and functionality.

## Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe development
- **React Native Paper**: Material Design 3 UI components
- **React Navigation**: Navigation system (bottom tabs)

### Key Dependencies
- `expo-router`: File-based routing
- `react-native-paper`: UI component library
- `react-native-vector-icons`: Icon system
- `react-native-safe-area-context`: Safe area handling
- `expo-image-picker`: Image selection functionality

## Project Structure

```
facilio/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout with PaperProvider
│   ├── index.tsx                # Welcome/landing screen
│   ├── auth/                    # Authentication module
│   │   ├── _layout.tsx          # Auth stack navigator
│   │   ├── login.tsx            # Login screen
│   │   ├── register.tsx         # Registration screen
│   │   ├── otp-verification.tsx # OTP verification
│   │   └── tenant-invitation.tsx# Tenant invitation flow
│   ├── dashboard/               # User dashboards
│   │   ├── _layout.tsx          # Dashboard stack navigator
│   │   ├── tenant.tsx           # Tenant dashboard (tab navigator)
│   │   ├── property-manager.tsx # Property manager dashboard
│   │   └── maintenance.tsx      # Maintenance staff dashboard
│   ├── access-control/          # Access control features
│   │   ├── _layout.tsx          # Access control navigator
│   │   └── tenant-access-portal.tsx
│   ├── booking-amenities/       # Amenity booking system
│   │   ├── _layout.tsx
│   │   └── amenity-booking.tsx
│   ├── communication/           # Communication features
│   │   ├── _layout.tsx
│   │   ├── announcements.tsx
│   │   └── maintenance-request-form.tsx
│   ├── payment-management/      # Payment processing
│   │   ├── _layout.tsx
│   │   ├── rent-collection.tsx
│   │   └── tenant-payment-portal.tsx
│   ├── property-management/     # Property management
│   │   ├── _layout.tsx
│   │   ├── portfolio.tsx
│   │   ├── tenant-assignment.tsx
│   │   └── unit-management.tsx
│   └── status-reporting/        # Reporting features
│       ├── _layout.tsx
│       └── tenant-status-dashboard.tsx
├── constants/
│   └── theme.ts                 # Theme configuration
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── tsconfig.json               # TypeScript configuration
```

## Navigation Architecture

### Navigation Hierarchy
```
Root Layout (_layout.tsx)
├── Welcome Screen (index.tsx)
├── Auth Stack
│   ├── Login
│   ├── Register
│   ├── OTP Verification
│   └── Tenant Invitation
├── Dashboard Stack
│   ├── Tenant Dashboard (Tab Navigator)
│   │   ├── Home
│   │   ├── Payments
│   │   ├── Bookings
│   │   ├── Messages
│   │   └── Profile
│   ├── Property Manager Dashboard (Tab Navigator)
│   │   ├── Properties
│   │   ├── Payments
│   │   ├── Bookings
│   │   ├── Communications
│   │   └── Reports
│   └── Maintenance Dashboard (Tab Navigator)
│       ├── Requests
│       ├── Schedule
│       ├── Completed
│       ├── Inventory
│       └── Profile
└── Feature Modules (Access Control, Booking, Communication, etc.)
```

### Navigation Patterns
- **File-based Routing**: Uses Expo Router for automatic route generation
- **Stack Navigation**: Each module has its own stack navigator
- **Tab Navigation**: Dashboards use React Navigation bottom tabs
- **No Nested NavigationContainers**: Single container at root level

## Component Architecture

### Screen Components

#### 1. Welcome Screen (`app/index.tsx`)
```typescript
interface WelcomeScreenProps {}
```
- **Purpose**: Landing page with app introduction
- **Features**: 
  - Decorative background elements
  - Quick access buttons
  - Navigation to auth flows
- **Navigation**: Routes to `/auth/login` and `/auth/register`

#### 2. Login Screen (`app/auth/login.tsx`)
```typescript
interface LoginScreenState {
  email: string;
  password: string;
  userType: 'property-manager' | 'tenant' | 'maintenance';
  showPassword: boolean;
  errors: { email: string; password: string };
}
```
- **Purpose**: User authentication with role selection
- **Features**:
  - Segmented buttons for user type selection
  - Form validation
  - Password visibility toggle
  - Dynamic navigation based on user type
- **Validation**: Email format, password length
- **Navigation**: Routes to `/dashboard/{userType}`

#### 3. Dashboard Components

##### Tenant Dashboard (`app/dashboard/tenant.tsx`)
```typescript
interface TenantDashboardProps {}

// Tab Screens
interface HomeScreenProps {}
interface PaymentsScreenProps {}
interface BookingsScreenProps {}
interface CommunicationsScreenProps {}
interface ProfileScreenProps {}
```
- **Features**:
  - Unit information display
  - Rent payment status
  - Quick actions (book amenity, report issue)
  - Recent activity feed
  - Floating Action Button (FAB)

##### Property Manager Dashboard (`app/dashboard/property-manager.tsx`)
```typescript
interface PropertyManagerDashboardProps {}

// Tab Screens
interface PropertiesScreenProps {}
interface PaymentsScreenProps {}
interface BookingsScreenProps {}
interface CommunicationsScreenProps {}
interface ReportsScreenProps {}
```
- **Features**:
  - Portfolio overview with statistics
  - Property cards with occupancy data
  - Quick actions (add property, add tenant)
  - Revenue tracking
  - FAB for adding properties

##### Maintenance Dashboard (`app/dashboard/maintenance.tsx`)
```typescript
interface MaintenanceDashboardProps {}

// Tab Screens
interface RequestsScreenProps {}
interface ScheduleScreenProps {}
interface CompletedScreenProps {}
interface InventoryScreenProps {}
interface ProfileScreenProps {}
```
- **Features**:
  - Maintenance request management
  - Task scheduling
  - Completed work tracking
  - Inventory management
  - Performance statistics

#### 4. Maintenance Request Form (`app/communication/maintenance-request-form.tsx`)
```typescript
interface MaintenanceRequestFormState {
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  title: string;
  description: string;
  location: string;
  unitNumber: string;
  contactPhone: string;
  preferredTime: 'anytime' | 'morning' | 'afternoon' | 'evening';
  images: ImagePicker.Asset[];
  errors: Record<string, string>;
  isSubmitting: boolean;
}
```
- **Purpose**: Comprehensive maintenance request submission
- **Features**:
  - Category selection with icons
  - Priority level selection with color coding
  - Detailed issue description
  - Contact information
  - Image upload capability
  - Form validation
  - Time preference selection

## Theme System

### Theme Configuration (`constants/theme.ts`)
```typescript
interface Theme {
  colors: {
    primary: string;           // #9f1861 (deep magenta)
    secondary: string;         // #631357 (darker magenta)
    tertiary: string;          // #efe94b (golden yellow)
    accent: string;            // #efe94b (golden yellow)
    background: string;        // #f9f9f9 (light background)
    surface: string;           // #ffffff (white)
    error: string;             // #dc2626 (red)
    success: string;           // #059669 (green)
    warning: string;           // #d97706 (orange)
    info: string;              // #2563eb (blue)
    text: string;              // #631357 (dark text)
    textSecondary: string;     // #666666 (secondary text)
    border: string;            // #e0e0e0 (light border)
  };
  roundness: number;           // 16 (border radius)
  fonts: {
    headlineLarge: FontConfig;
    headlineMedium: FontConfig;
    titleLarge: FontConfig;
  };
}
```

### Color Palette
- **Primary**: Deep magenta (#9f1861) - Main brand color
- **Secondary**: Darker magenta (#631357) - Text and accents
- **Accent**: Golden yellow (#efe94b) - Highlights and CTAs
- **Background**: Light gray (#f9f9f9) - App background
- **Surface**: White (#ffffff) - Card backgrounds

### Design System
- **Material Design 3**: Based on React Native Paper's MD3 implementation
- **Consistent Spacing**: 8px grid system
- **Typography**: Hierarchical text styles with defined weights
- **Border Radius**: 16px standard for cards and buttons
- **Elevation**: Consistent shadow system for depth

## State Management

### Local State Patterns
- **useState**: For form inputs, UI state, and component-specific data
- **Form Validation**: Custom validation functions with error state
- **Image Handling**: Array-based image state for uploads

### State Structure Examples
```typescript
// Login Form State
const [formState, setFormState] = useState({
  email: '',
  password: '',
  userType: 'property-manager',
  showPassword: false,
  errors: {}
});

// Maintenance Request State
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
  errors: {},
  isSubmitting: false
});
```

## User Interface Patterns

### Common UI Components
- **Cards**: Primary content containers with elevation
- **Buttons**: Consistent styling with icons and loading states
- **TextInput**: Outlined mode with validation and helper text
- **Chips**: Category selection and status indicators
- **Segmented Buttons**: Multi-option selection
- **FAB**: Floating action buttons for primary actions

### Layout Patterns
- **SafeAreaView**: Consistent safe area handling
- **ScrollView**: Scrollable content with proper styling
- **Flexbox**: Responsive layouts with proper spacing
- **Absolute Positioning**: Decorative elements and FABs

### Responsive Design
- **Dimensions API**: Screen size awareness
- **Flexible Layouts**: Adapts to different screen sizes
- **Consistent Spacing**: 20px standard padding/margins

## Form Handling

### Validation Patterns
```typescript
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
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Form Submission
- **Async Handling**: Loading states during submission
- **Error Management**: Clear error messages and validation
- **Success Feedback**: Alert dialogs for successful submissions
- **Navigation**: Automatic navigation after successful actions

## Image Handling

### Image Picker Integration
```typescript
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
```

### Image Management Features
- **Permission Handling**: Automatic permission requests
- **Image Editing**: Built-in crop functionality
- **Quality Control**: Optimized image quality (0.8)
- **Multiple Images**: Support for up to 5 images per request
- **Remove Functionality**: Individual image removal

## Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed images with quality control
- **Efficient Rendering**: Proper key props and memoization opportunities
- **Bundle Size**: Selective imports from libraries

### Memory Management
- **Image Cleanup**: Proper disposal of image assets
- **State Cleanup**: Clearing form state after submission
- **Component Unmounting**: Proper cleanup in useEffect

## Security Considerations

### Input Validation
- **Client-side Validation**: Real-time form validation
- **Sanitization**: Proper input sanitization (to be implemented)
- **Error Handling**: Secure error messages without sensitive data

### Authentication Flow
- **Role-based Access**: Different dashboards based on user type
- **Form Security**: Protected routes and session management (to be implemented)

## Future Enhancements

### Planned Features
- **Backend Integration**: API connections for data persistence
- **Real-time Updates**: WebSocket connections for live data
- **Push Notifications**: Maintenance updates and announcements
- **Offline Support**: Local data caching and sync
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

### Technical Improvements
- **State Management**: Redux or Zustand for global state
- **Testing**: Unit and integration test coverage
- **Performance Monitoring**: Analytics and crash reporting
- **Code Splitting**: Dynamic imports for better performance
- **Type Safety**: Enhanced TypeScript interfaces and types

## Development Guidelines

### Code Standards
- **TypeScript**: Strict type checking enabled
- **Component Structure**: Consistent component organization
- **Styling**: StyleSheet.create for all styles
- **Naming**: PascalCase for components, camelCase for functions
- **Comments**: JSDoc comments for complex functions

### File Organization
- **Feature-based**: Modules organized by functionality
- **Co-location**: Related files grouped together
- **Consistent Naming**: Predictable file naming conventions
- **Layout Files**: Separate layout files for navigation structure

This architecture provides a solid foundation for a scalable property management application with clear separation of concerns, consistent UI patterns, and maintainable code structure.
