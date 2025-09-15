# Enhanced Facilio Architecture - Models, Services & Improvements

## Core Data Models

### User Management Models

```typescript
// Base User Interface
interface BaseUser {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: 'property-manager' | 'tenant' | 'maintenance' | 'admin';
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  twoFactorEnabled: boolean;
  deviceTokens: string[]; // For push notifications
}

interface UserPreferences {
  language: 'en' | 'af' | 'zu' | 'xh'; // South African languages
  timezone: string;
  currency: 'ZAR' | 'USD' | 'EUR';
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'auto';
  accessibilitySettings: AccessibilitySettings;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  paymentReminders: boolean;
  maintenanceUpdates: boolean;
  bookingConfirmations: boolean;
  announcements: boolean;
  accessAlerts: boolean;
}

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
}

// Property Manager Model
interface PropertyManager extends BaseUser {
  role: 'property-manager';
  companyName: string;
  businessRegistration: string;
  taxNumber: string;
  businessAddress: Address;
  bankingDetails: BankingDetails;
  portfolioStats: PortfolioStats;
  subscription: SubscriptionPlan;
  managedProperties: string[]; // Property IDs
}

interface PortfolioStats {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  monthlyRevenue: number;
  averageRent: number;
  maintenanceRequests: {
    pending: number;
    inProgress: number;
    completed: number;
  };
}

// Tenant Model
interface Tenant extends BaseUser {
  role: 'tenant';
  idNumber: string; // SA ID Number
  emergencyContact: EmergencyContact;
  employmentDetails: EmploymentDetails;
  leaseAgreements: LeaseAgreement[];
  currentUnit?: string; // Unit ID
  paymentProfile: PaymentProfile;
  accessCards: AccessCard[];
  backgroundCheck?: BackgroundCheckResult;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

interface EmploymentDetails {
  employer: string;
  position: string;
  monthlyIncome: number;
  employmentLetter?: string; // File URL
  payslips: string[]; // File URLs
  verified: boolean;
  verifiedAt?: Date;
}

// Maintenance Staff Model
interface MaintenanceStaff extends BaseUser {
  role: 'maintenance';
  employeeId: string;
  skills: MaintenanceSkill[];
  certifications: Certification[];
  availability: AvailabilitySchedule;
  performanceMetrics: MaintenancePerformance;
  assignedProperties: string[]; // Property IDs
  currentTasks: string[]; // Maintenance Request IDs
}

interface MaintenanceSkill {
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'landscaping' | 'security' | 'general';
  level: 'basic' | 'intermediate' | 'expert';
  certified: boolean;
}

interface Certification {
  name: string;
  issuedBy: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateUrl: string;
  verified: boolean;
}

interface AvailabilitySchedule {
  workingHours: {
    [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: {
      start: string; // "09:00"
      end: string; // "17:00"
      available: boolean;
    }
  };
  emergencyAvailable: boolean;
  currentCapacity: number; // Current active tasks
  maxCapacity: number; // Maximum concurrent tasks
}

interface MaintenancePerformance {
  averageResponseTime: number; // hours
  averageCompletionTime: number; // hours
  completionRate: number; // percentage
  tenantSatisfactionRating: number; // 1-5 scale
  totalTasksCompleted: number;
  onTimeCompletionRate: number;
}
```

### Property & Unit Models

```typescript
interface Property {
  id: string;
  name: string;
  type: 'apartment' | 'house' | 'townhouse' | 'commercial' | 'mixed-use';
  address: Address;
  coordinates: GeoCoordinates;
  description: string;
  images: PropertyImage[];
  floorPlans: FloorPlan[];
  amenities: Amenity[];
  units: Unit[];
  managerId: string; // Property Manager ID
  buildYear: number;
  totalArea: number; // square meters
  parkingSpaces: number;
  securityFeatures: SecurityFeature[];
  utilities: UtilityInfo[];
  rules: PropertyRule[];
  emergencyContacts: EmergencyContact[];
  insuranceDetails: InsuranceDetails;
  financialInfo: PropertyFinancials;
  maintenanceSchedule: MaintenanceSchedule[];
  accessControlSystem: AccessControlSystem;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  street: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  addressLine2?: string;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface PropertyImage {
  id: string;
  url: string;
  thumbnail: string;
  category: 'exterior' | 'interior' | 'amenity' | 'floor-plan' | 'parking' | 'other';
  description?: string;
  isPrimary: boolean;
  uploadedAt: Date;
}

interface Unit {
  id: string;
  unitNumber: string;
  type: 'studio' | '1-bedroom' | '2-bedroom' | '3-bedroom' | '4-bedroom+' | 'penthouse';
  floor: number;
  area: number; // square meters
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  parkingSpaces: number;
  rentAmount: number;
  deposit: number;
  utilities: UtilityIncluded[];
  furnishing: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
  status: 'available' | 'occupied' | 'maintenance' | 'renovation';
  images: PropertyImage[];
  features: UnitFeature[];
  currentTenant?: string; // Tenant ID
  leaseAgreement?: string; // Lease Agreement ID
  keyLocation: string;
  lastInspection?: Date;
  nextInspection: Date;
  maintenanceHistory: MaintenanceRecord[];
  energyRating?: string;
}

interface Amenity {
  id: string;
  name: string;
  type: 'gym' | 'pool' | 'braai-area' | 'playground' | 'laundry' | 'clubhouse' | 'garden' | 'parking' | 'security';
  description: string;
  images: string[];
  isBookable: boolean;
  bookingRules?: BookingRules;
  operatingHours: OperatingHours;
  capacity?: number;
  cost?: number; // ZAR
  maintenanceSchedule: MaintenanceSchedule[];
  currentStatus: 'available' | 'maintenance' | 'closed';
}

interface BookingRules {
  maxDuration: number; // hours
  advanceBookingLimit: number; // days
  maxBookingsPerMonth: number;
  requiresApproval: boolean;
  deposit?: number;
  cancellationPolicy: string;
  restrictions: string[];
}

interface OperatingHours {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: {
    open: string; // "06:00"
    close: string; // "22:00"
    closed: boolean;
  }
}
```

### Access Control Models

```typescript
interface AccessControlSystem {
  id: string;
  propertyId: string;
  type: 'card' | 'biometric' | 'mobile' | 'hybrid';
  brand: string;
  model: string;
  installationDate: Date;
  lastMaintenance: Date;
  nextMaintenance: Date;
  accessPoints: AccessPoint[];
  settings: AccessControlSettings;
  logs: AccessLog[];
  isActive: boolean;
}

interface AccessPoint {
  id: string;
  name: string;
  location: string;
  type: 'main-entrance' | 'garage' | 'amenity' | 'unit' | 'service';
  accessMethods: AccessMethod[];
  operatingHours: OperatingHours;
  emergencyOverride: boolean;
  lastActivity: Date;
  status: 'online' | 'offline' | 'maintenance';
  permissions: AccessPermission[];
}

interface AccessMethod {
  type: 'card' | 'pin' | 'biometric' | 'mobile' | 'intercom';
  enabled: boolean;
  settings: Record<string, any>;
}

interface AccessCard {
  id: string;
  cardNumber: string;
  type: 'permanent' | 'temporary' | 'guest' | 'service';
  holderId: string; // User ID
  holderType: 'tenant' | 'staff' | 'visitor' | 'contractor';
  isActive: boolean;
  issueDate: Date;
  expiryDate?: Date;
  permissions: AccessPermission[];
  lastUsed?: Date;
  usageCount: number;
  status: 'active' | 'suspended' | 'expired' | 'lost' | 'damaged';
  replacementOf?: string; // Previous card ID
  cost: number;
}

interface AccessPermission {
  accessPointId: string;
  startDate: Date;
  endDate?: Date;
  timeRestrictions: TimeRestriction[];
  dayRestrictions: string[]; // Days of week
  isActive: boolean;
  grantedBy: string; // User ID who granted access
  grantedAt: Date;
}

interface TimeRestriction {
  startTime: string; // "08:00"
  endTime: string; // "18:00"
  daysOfWeek: number[]; // 0-6, Sunday to Saturday
}

interface AccessLog {
  id: string;
  accessPointId: string;
  userId?: string;
  cardId?: string;
  timestamp: Date;
  action: 'granted' | 'denied' | 'forced' | 'emergency';
  method: 'card' | 'pin' | 'biometric' | 'mobile' | 'manual';
  reason?: string;
  ipAddress?: string;
  deviceInfo?: string;
  images?: string[]; // Security camera captures
  location: GeoCoordinates;
}

interface DigitalKey {
  id: string;
  userId: string;
  accessPointIds: string[];
  keyCode: string; // Encrypted
  qrCode: string; // QR code data
  bluetoothToken: string; // For BLE access
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
  usageLimit?: number;
  usageCount: number;
  lastUsed?: Date;
  deviceRestrictions: DeviceRestriction[];
}

interface DeviceRestriction {
  deviceId: string;
  deviceName: string;
  platform: 'ios' | 'android';
  isAuthorized: boolean;
  authorizedAt: Date;
}
```

### Payment & Financial Models

```typescript
interface PaymentProfile {
  id: string;
  tenantId: string;
  preferredMethod: 'bank-transfer' | 'debit-card' | 'credit-card' | 'eft' | 'cash';
  bankingDetails?: BankingDetails;
  cardDetails?: CardDetails;
  paymentHistory: Payment[];
  creditScore?: number;
  paymentBehavior: PaymentBehavior;
  defaultPaymentMethod: string;
}

interface BankingDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
  accountType: 'current' | 'savings';
  isVerified: boolean;
  verificationDate?: Date;
}

interface Payment {
  id: string;
  tenantId: string;
  unitId: string;
  amount: number;
  currency: string;
  type: 'rent' | 'deposit' | 'utility' | 'penalty' | 'amenity' | 'other';
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'failed';
  paymentMethod: string;
  reference: string;
  description: string;
  attachments: string[];
  reminders: PaymentReminder[];
  penaltyApplied?: number;
  penaltyRate?: number;
  recurringPayment: boolean;
  nextDueDate?: Date;
}

interface PaymentBehavior {
  averagePaymentDelay: number; // days
  onTimePaymentRate: number; // percentage
  totalPayments: number;
  totalLatePayments: number;
  lastPaymentDate?: Date;
  creditLimit: number;
  riskScore: number; // 1-10 scale
}

interface LeaseAgreement {
  id: string;
  tenantId: string;
  unitId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  deposit: number;
  leaseType: 'fixed-term' | 'month-to-month' | 'periodic';
  renewalOptions: RenewalOption[];
  terms: LeaseTerms;
  documents: LeaseDocument[];
  status: 'draft' | 'active' | 'terminated' | 'expired' | 'renewed';
  signedDate?: Date;
  terminationNotice?: TerminationNotice;
  renewalHistory: LeaseRenewal[];
}

interface LeaseTerms {
  rentEscalation: number; // annual percentage
  utilityResponsibilities: UtilityResponsibility[];
  petPolicy: PetPolicy;
  parkingIncluded: number;
  maintenanceResponsibilities: MaintenanceResponsibility[];
  restrictions: string[];
  additionalClauses: string[];
}
```

### Maintenance & Service Models

```typescript
interface MaintenanceRequest {
  id: string;
  tenantId: string;
  unitId: string;
  propertyId: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'security' | 'landscaping' | 'other';
  priority: 'emergency' | 'urgent' | 'high' | 'normal' | 'low';
  status: 'submitted' | 'acknowledged' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
  images: RequestImage[];
  preferredTime: 'anytime' | 'morning' | 'afternoon' | 'evening' | 'weekend';
  contactPhone: string;
  accessInstructions: string;
  estimatedCost?: number;
  actualCost?: number;
  warranty: boolean;
  assignedTo?: string; // Maintenance Staff ID
  assignedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  workLog: WorkLogEntry[];
  materials: MaterialUsed[];
  beforeImages: string[];
  afterImages: string[];
  tenantSignature?: string;
  rating?: TenantRating;
  followUpRequired: boolean;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkLogEntry {
  id: string;
  staffId: string;
  timestamp: Date;
  action: string;
  description: string;
  timeSpent: number; // minutes
  images?: string[];
}

interface MaterialUsed {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier: string;
  invoiceNumber?: string;
}

interface TenantRating {
  overall: number; // 1-5 scale
  timeliness: number;
  quality: number;
  communication: number;
  cleanliness: number;
  comment?: string;
  ratedAt: Date;
}

interface MaintenanceSchedule {
  id: string;
  propertyId?: string;
  unitId?: string;
  amenityId?: string;
  title: string;
  description: string;
  type: 'preventive' | 'inspection' | 'compliance' | 'warranty';
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'custom';
  nextDue: Date;
  lastCompleted?: Date;
  assignedTo: string[];
  estimatedDuration: number; // hours
  cost: number;
  supplier?: string;
  isActive: boolean;
  completionHistory: ScheduledMaintenanceRecord[];
}
```

### Communication & Notification Models

```typescript
interface Announcement {
  id: string;
  propertyId: string;
  authorId: string; // Property Manager ID
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'emergency' | 'event' | 'policy';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'tenants' | 'maintenance' | 'specific';
  specificRecipients?: string[]; // User IDs
  channels: NotificationChannel[];
  attachments: AnnouncementAttachment[];
  scheduledFor?: Date;
  expiresAt?: Date;
  tags: string[];
  readBy: AnnouncementRead[];
  status: 'draft' | 'scheduled' | 'published' | 'expired' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface NotificationChannel {
  type: 'push' | 'email' | 'sms' | 'in-app';
  enabled: boolean;
  deliveryStatus: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: Date;
  deliveredAt?: Date;
}

interface Notification {
  id: string;
  userId: string;
  type: 'announcement' | 'payment' | 'maintenance' | 'booking' | 'access' | 'system';
  title: string;
  body: string;
  data?: Record<string, any>;
  priority: 'low' | 'medium' | 'high';
  channels: NotificationChannel[];
  isRead: boolean;
  readAt?: Date;
  actionTaken?: string;
  expiresAt?: Date;
  createdAt: Date;
}
```

## Enhanced Service Layer Architecture

### Authentication & User Management Service

```typescript
interface AuthService {
  // Authentication
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  verifyOTP(phone: string, code: string): Promise<boolean>;
  
  // Two-Factor Authentication
  enableTwoFactor(userId: string): Promise<TwoFactorSetup>;
  disableTwoFactor(userId: string): Promise<void>;
  verifyTwoFactor(userId: string, code: string): Promise<boolean>;
  
  // User Management
  getCurrentUser(): Promise<BaseUser>;
  updateProfile(userId: string, updates: Partial<BaseUser>): Promise<BaseUser>;
  uploadProfileImage(userId: string, image: File): Promise<string>;
  deactivateAccount(userId: string): Promise<void>;
  
  // Role Management
  switchRole(userId: string, newRole: string): Promise<AuthResult>;
  validatePermissions(userId: string, resource: string, action: string): Promise<boolean>;
}

interface UserManagementService {
  // Tenant Management
  inviteTenant(invitation: TenantInvitation): Promise<string>;
  acceptInvitation(invitationId: string, userData: Partial<Tenant>): Promise<Tenant>;
  getTenantDetails(tenantId: string): Promise<Tenant>;
  updateTenant(tenantId: string, updates: Partial<Tenant>): Promise<Tenant>;
  verifyEmployment(tenantId: string, documents: EmploymentDocument[]): Promise<boolean>;
  
  // Staff Management
  createMaintenanceStaff(staffData: Partial<MaintenanceStaff>): Promise<MaintenanceStaff>;
  updateAvailability(staffId: string, schedule: AvailabilitySchedule): Promise<void>;
  assignSkills(staffId: string, skills: MaintenanceSkill[]): Promise<void>;
  updatePerformanceMetrics(staffId: string): Promise<MaintenancePerformance>;
  
  // Document Management
  uploadDocument(userId: string, document: DocumentUpload): Promise<string>;
  verifyDocument(documentId: string, verified: boolean): Promise<void>;
  getDocuments(userId: string, type?: string): Promise<Document[]>;
}
```

### Property & Unit Management Service

```typescript
interface PropertyManagementService {
  // Property Management
  createProperty(propertyData: Partial<Property>): Promise<Property>;
  updateProperty(propertyId: string, updates: Partial<Property>): Promise<Property>;
  deleteProperty(propertyId: string): Promise<void>;
  getProperties(managerId: string, filters?: PropertyFilter): Promise<Property[]>;
  getPropertyDetails(propertyId: string): Promise<Property>;
  
  // Unit Management
  createUnit(propertyId: string, unitData: Partial<Unit>): Promise<Unit>;
  updateUnit(unitId: string, updates: Partial<Unit>): Promise<Unit>;
  getUnits(propertyId: string, filters?: UnitFilter): Promise<Unit[]>;
  assignTenant(unitId: string, tenantId: string, leaseData: Partial<LeaseAgreement>): Promise<void>;
  
  // Media Management
  uploadPropertyImages(propertyId: string, images: File[]): Promise<PropertyImage[]>;
  uploadFloorPlan(propertyId: string, floorPlan: File): Promise<string>;
  updateImageOrder(propertyId: string, imageIds: string[]): Promise<void>;
  
  // Analytics
  getOccupancyReport(propertyId: string, period: DateRange): Promise<OccupancyReport>;
  getFinancialReport(propertyId: string, period: DateRange): Promise<FinancialReport>;
  getMaintenanceReport(propertyId: string, period: DateRange): Promise<MaintenanceReport>;
}

interface UnitManagementService {
  // Inspection Management
  scheduleInspection(unitId: string, inspectionData: InspectionSchedule): Promise<string>;
  completeInspection(inspectionId: string, report: InspectionReport): Promise<void>;
  getInspectionHistory(unitId: string): Promise<InspectionReport[]>;
  
  // Inventory Management
  updateInventory(unitId: string, inventory: UnitInventory): Promise<void>;
  trackDamages(unitId: string, damages: DamageReport[]): Promise<void>;
  calculateRepairCosts(unitId: string): Promise<RepairEstimate>;
}
```

### Access Control Service

```typescript
interface AccessControlService {
  // Card Management
  issueAccessCard(cardData: Partial<AccessCard>): Promise<AccessCard>;
  activateCard(cardId: string): Promise<void>;
  deactivateCard(cardId: string, reason: string): Promise<void>;
  replaceCard(oldCardId: string, reason: string): Promise<AccessCard>;
  bulkCardOperation(operation: BulkCardOperation): Promise<BulkOperationResult>;
  
  // Permission Management
  grantAccess(userId: string, permissions: AccessPermission[]): Promise<void>;
  revokeAccess(userId: string, accessPointIds: string[]): Promise<void>;
  updatePermissions(userId: string, permissions: AccessPermission[]): Promise<void>;
  getPermissions(userId: string): Promise<AccessPermission[]>;
  
  // Digital Key Management
  generateDigitalKey(userId: string, accessPointIds: string[], options: DigitalKeyOptions): Promise<DigitalKey>;
  authorizeDevice(keyId: string, deviceInfo: DeviceInfo): Promise<void>;
  revokeDigitalKey(keyId: string): Promise<void>;
  validateDigitalKey(keyCode: string, accessPointId: string): Promise<boolean>;
  
  // Access Monitoring
  getAccessLogs(filters: AccessLogFilter): Promise<AccessLog[]>;
  getRealTimeAccess(): Observable<AccessLog>;
  generateAccessReport(propertyId: string, period: DateRange): Promise<AccessReport>;
  
  // Visitor Management
  createVisitorAccess(visitorData: VisitorAccess): Promise<TemporaryAccess>;
  approveVisitorAccess(accessId: string): Promise<void>;
  extendVisitorAccess(accessId: string, newEndTime: Date): Promise<void>;
  getActiveVisitors(propertyId: string): Promise<VisitorAccess[]>;
  
  // Emergency Features
  triggerEmergencyAccess(propertyId: string, reason: string): Promise<void>;
  lockdownProperty(propertyId: string, reason: string): Promise<void>;
  generateEmergencyCode(unitId: string, requestedBy: string): Promise<EmergencyAccess>;
}

interface VisitorAccess {
  id: string;
  visitorName: string;
  visitorPhone: string;
  hostUserId: string;
  propertyId: string;
  accessPointIds: string[];
  startTime: Date;
  endTime: Date;
  purpose: string;
  accessCode: string;
  qrCode: string;
  status: 'pending' | 'approved' | 'active' | 'expired' | 'cancelled';
  actualArrival?: Date;
  actualDeparture?: Date;
  vehicleInfo?: VehicleInfo;
}

interface VehicleInfo {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingSpot?: string;
}
```

### Payment & Financial Service

```typescript
interface PaymentService {
  // Payment Processing
  processPayment(paymentData: PaymentRequest): Promise<PaymentResult>;
  setupRecurringPayment(recurringData: RecurringPaymentSetup): Promise<string>;
  cancelRecurringPayment(paymentId: string): Promise<void>;
  refundPayment(paymentId: string, amount?: number, reason?: string): Promise<RefundResult>;
  
  // Payment Methods
  addPaymentMethod(userId: string, paymentMethod: PaymentMethodData): Promise<PaymentMethod>;
  updatePaymentMethod(methodId: string, updates: Partial<PaymentMethodData>): Promise<PaymentMethod>;
  deletePaymentMethod(methodId: string): Promise<void>;
  setDefaultPaymentMethod(userId: string, methodId: string): Promise<void>;
  
  // South African Specific
  processBankTransfer(transferData: BankTransferData): Promise<TransferResult>;
  validateBankAccount(accountDetails: BankingDetails): Promise<BankValidationResult>;
  processEFT(eftData: EFTData): Promise<EFTResult>;
  
  // Payment Analytics
  getPaymentHistory(userId: string, filters?: PaymentFilter): Promise<Payment[]>;
  generatePaymentReport(propertyId: string, period: DateRange): Promise<PaymentReport>;
  calculateLatePaymentPenalties(tenantId: string): Promise<PenaltyCalculation>;
  
  // Collections
  sendPaymentReminder(paymentId: string, reminderType: ReminderType): Promise<void>;
  escalateOverduePayment(paymentId: string): Promise<void>;
  createPaymentPlan(tenantId: string, planData: PaymentPlanData): Promise<PaymentPlan>;
}

interface FinancialService {
  // Revenue Management
  calculateMonthlyRevenue(propertyId: string, month: string): Promise<RevenueCalculation>;
  generateIncomeStatement(propertyId: string, period: DateRange): Promise<IncomeStatement>;
  trackExpenses(propertyId: string, expenses: Expense[]): Promise<void>;
  
  // Tax Management
  generateTaxDocuments(managerId: string, taxYear: number): Promise<TaxDocument[]>;
  calculateVATLiability(propertyId: string, period: DateRange): Promise<VATCalculation>;
  
  // Budgeting
  createBudget(propertyId: string, budgetData: BudgetData): Promise<Budget>;
  trackBudgetPerformance(budgetId: string): Promise<BudgetPerformance>;
  forecastRevenue(propertyId: string, periods: number): Promise<RevenueForcast[]>;
}
```

### Maintenance Service

```typescript
interface MaintenanceService {
  // Request Management
  submitMaintenanceRequest(requestData: Partial<MaintenanceRequest>): Promise<MaintenanceRequest>;
  assignMaintenanceRequest(requestId: string, staffId: string): Promise<void>;
  updateRequestStatus(requestId: string, status: string, notes?: string): Promise<void>;
  getMaintenanceRequests(filters: MaintenanceFilter): Promise<MaintenanceRequest[]>;
  
  // Work Order Management
  createWorkOrder(requestId: string, workOrderData: WorkOrderData): Promise<WorkOrder>;
  updateWorkLog(requestId: string, logEntry: WorkLogEntry): Promise<void>;
  uploadWorkImages(requestId: string, images: File[], type: 'before' | 'during' | 'after'): Promise<string[]>;
  completeWorkOrder(requestId: string, completionData: WorkOrderCompletion): Promise<void>;
  
  // Scheduling
  scheduleAppointment(requestId: string, appointmentData: AppointmentData): Promise<Appointment>;
  rescheduleAppointment(appointmentId: string, newDateTime: Date): Promise<void>;
  getStaffSchedule(staffId: string, dateRange: DateRange): Promise<ScheduleEntry[]>;
  
  // Preventive Maintenance
  createMaintenanceSchedule(scheduleData: Partial<MaintenanceSchedule>): Promise<MaintenanceSchedule>;
  executeScheduledMaintenance(scheduleId: string): Promise<void>;
  updateMaintenanceSchedule(scheduleId: string, updates: Partial<MaintenanceSchedule>): Promise<void>;
  
  // Inventory Management
  trackMaterialUsage(requestId: string, materials: MaterialUsed[]): Promise<void>;
  updateInventoryLevels(propertyId: string, inventory: InventoryItem[]): Promise<void>;
  generateInventoryReport(propertyId: string): Promise<InventoryReport>;
  
  // Performance Analytics
  calculateStaffPerformance(staffId: string, period: DateRange): Promise<MaintenancePerformance>;
  getMaintenanceMetrics(propertyId: string, period: DateRange): Promise<MaintenanceMetrics>;
  generateMaintenanceReport(filters: MaintenanceReportFilter): Promise<MaintenanceReport>;
}

interface BookingService {
  // Amenity Booking
  getAvailableSlots(amenityId: string, date: Date): Promise<TimeSlot[]>;
  createBooking(bookingData: BookingRequest): Promise<Booking>;
  cancelBooking(bookingId: string, reason?: string): Promise<void>;
  rescheduleBooking(bookingId: string, newDateTime: Date): Promise<Booking>;
  
  // Booking Management
  getUserBookings(userId: string, status?: BookingStatus): Promise<Booking[]>;
  getAmenityBookings(amenityId: string, dateRange: DateRange): Promise<Booking[]>;
  approveBooking(bookingId: string): Promise<void>;
  
  // Booking Rules & Validation
  validateBookingRules(amenityId: string, bookingData: BookingRequest): Promise<ValidationResult>;
  calculateBookingCost(amenityId: string, duration: number): Promise<number>;
  checkBookingConflicts(amenityId: string, timeSlot: TimeSlot): Promise<Booking[]>;
  
  // Notifications
  sendBookingConfirmation(bookingId: string): Promise<void>;
  sendBookingReminders(): Promise<void>;
  notifyBookingChanges(bookingId: string, change: BookingChange): Promise<void>;
}
```

## Advanced Utility Services

```typescript
interface NotificationService {
  // Push Notifications
  sendPushNotification(userId: string, notification: PushNotificationData): Promise<void>;
  sendBulkPushNotifications(userIds: string[], notification: PushNotificationData): Promise<BulkNotificationResult>;
  scheduleNotification(notification: ScheduledNotification): Promise<string>;
  cancelScheduledNotification(notificationId: string): Promise<void>;
  
  // Multi-channel Notifications
  sendMultiChannelNotification(userId: string, notification: MultiChannelNotification): Promise<void>;
  createNotificationTemplate(template: NotificationTemplate): Promise<string>;
  personalizeNotification(templateId: string, userData: Record<string, any>): Promise<NotificationData>;
  
  // Notification Preferences
  updateNotificationPreferences(userId: string, preferences: NotificationPreferences): Promise<void>;
  getNotificationHistory(userId: string, filters?: NotificationFilter): Promise<Notification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  
  // Analytics
  getNotificationMetrics(propertyId: string, period: DateRange): Promise<NotificationMetrics>;
  trackNotificationEngagement(notificationId: string, action: string): Promise<void>;
}

interface AnalyticsService {
  // Property Analytics
  getOccupancyTrends(propertyId: string, period: DateRange): Promise<OccupancyTrend[]>;
  getRentTrends(propertyId: string, period: DateRange): Promise<RentTrend[]>;
  getTenantSatisfactionMetrics(propertyId: string): Promise<SatisfactionMetrics>;
  
  // Financial Analytics
  getRevenueAnalytics(propertyId: string, period: DateRange): Promise<RevenueAnalytics>;
  getCostAnalytics(propertyId: string, period: DateRange): Promise<CostAnalytics>;
  getProfitabilityAnalysis(propertyId: string, period: DateRange): Promise<ProfitabilityAnalysis>;
  
  // Maintenance Analytics
  getMaintenanceAnalytics(propertyId: string, period: DateRange): Promise<MaintenanceAnalytics>;
  predictMaintenanceNeeds(propertyId: string): Promise<MaintenancePrediction[]>;
  
  // Tenant Analytics
  getTenantBehaviorAnalytics(propertyId: string): Promise<TenantBehaviorAnalytics>;
  getChurnAnalysis(propertyId: string, period: DateRange): Promise<ChurnAnalysis>;
  
  // Access Analytics
  getAccessPatterns(propertyId: string, period: DateRange): Promise<AccessPattern[]>;
  getSecurityMetrics(propertyId: string, period: DateRange): Promise<SecurityMetrics>;
}

interface DocumentService {
  // Document Management
  uploadDocument(document: DocumentUpload): Promise<Document>;
  downloadDocument(documentId: string): Promise<Blob>;
  shareDocument(documentId: string, shareData: DocumentShare): Promise<string>;
  deleteDocument(documentId: string): Promise<void>;
  
  // Document Generation
  generateLeaseAgreement(leaseData: LeaseAgreementData): Promise<string>;
  generateInvoice(paymentData: PaymentData): Promise<string>;
  generateMaintenanceReport(requestId: string): Promise<string>;
  generatePropertyReport(propertyId: string, period: DateRange): Promise<string>;
  
  // Digital Signatures
  prepareDocumentForSigning(documentId: string, signers: DocumentSigner[]): Promise<SigningSession>;
  signDocument(sessionId: string, signatureData: DigitalSignature): Promise<void>;
  getSigningStatus(sessionId: string): Promise<SigningStatus>;
  
  // Compliance
  validateDocumentCompliance(documentId: string, regulations: string[]): Promise<ComplianceResult>;
  trackDocumentRetention(documentId: string): Promise<RetentionPolicy>;
}
```

## Enhanced Features & Improvements

### 1. Advanced Security Features

```typescript
interface SecurityEnhancement {
  // Biometric Authentication
  biometricLogin: {
    fingerprint: boolean;
    faceId: boolean;
    voiceRecognition: boolean;
    palmPrint: boolean; // For high-security properties
  };
  
  // Advanced Access Control
  geofencing: {
    enabled: boolean;
    radius: number; // meters
    notifications: boolean;
    restrictions: GeofenceRestriction[];
  };
  
  // AI-Powered Security
  behaviorAnalysis: {
    enabled: boolean;
    alertThresholds: BehaviorThreshold[];
    learningPeriod: number; // days
  };
  
  // Emergency Features
  panicButton: {
    enabled: boolean;
    emergencyContacts: string[];
    autoLocationShare: boolean;
    silentAlarm: boolean;
  };
}

interface GeofenceRestriction {
  accessPointId: string;
  requiredProximity: number; // meters
  gracePeriod: number; // minutes
  bypassRoles: string[]; // User roles that can bypass
}

interface BehaviorThreshold {
  type: 'unusual_access_time' | 'multiple_failed_attempts' | 'location_mismatch' | 'speed_analysis';
  threshold: number;
  action: 'log' | 'alert' | 'restrict' | 'escalate';
}
```

### 2. Smart Home Integration

```typescript
interface SmartHomeIntegration {
  // IoT Device Management
  supportedDevices: {
    thermostats: boolean;
    smartLocks: boolean;
    securityCameras: boolean;
    smokeDetectors: boolean;
    waterLeakSensors: boolean;
    airQualityMonitors: boolean;
  };
  
  // Automation Rules
  automationRules: AutomationRule[];
  
  // Energy Management
  energyMonitoring: {
    realTimeUsage: boolean;
    costTracking: boolean;
    efficiencyRecommendations: boolean;
    demandResponsePrograms: boolean;
  };
  
  // Predictive Maintenance
  predictiveMaintenance: {
    enabled: boolean;
    algorithms: PredictiveAlgorithm[];
    alertThresholds: MaintenanceThreshold[];
  };
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  isActive: boolean;
  priority: number;
}

interface AutomationTrigger {
  type: 'time' | 'sensor' | 'user_action' | 'system_event';
  parameters: Record<string, any>;
}
```

### 3. AI-Powered Features

```typescript
interface AIFeatures {
  // Intelligent Maintenance Scheduling
  smartScheduling: {
    enabled: boolean;
    factors: SchedulingFactor[];
    optimization: 'cost' | 'time' | 'tenant_satisfaction' | 'balanced';
  };
  
  // Predictive Analytics
  predictions: {
    maintenanceNeeds: boolean;
    tenantChurn: boolean;
    paymentDefaults: boolean;
    marketTrends: boolean;
  };
  
  // Natural Language Processing
  nlpFeatures: {
    maintenanceRequestClassification: boolean;
    sentimentAnalysis: boolean;
    automaticTagging: boolean;
    intelligentRouting: boolean;
  };
  
  // Computer Vision
  visionFeatures: {
    damageAssessment: boolean;
    progressTracking: boolean;
    complianceChecking: boolean;
    securityAnalysis: boolean;
  };
}

interface SchedulingFactor {
  factor: 'urgency' | 'skill_match' | 'proximity' | 'workload' | 'cost' | 'tenant_preference';
  weight: number; // 0-1
  enabled: boolean;
}
```

### 4. Enhanced Communication System

```typescript
interface CommunicationEnhancement {
  // Multi-language Support
  languages: {
    english: boolean;
    afrikaans: boolean;
    zulu: boolean;
    xhosa: boolean;
    sotho: boolean;
    tswana: boolean;
    // Additional SA languages
  };
  
  // Advanced Messaging
  messaging: {
    realTimeChat: boolean;
    voiceMessages: boolean;
    videoMessages: boolean;
    fileSharing: boolean;
    messageTranslation: boolean;
    readReceipts: boolean;
    messageRetention: number; // days
  };
  
  // Community Features
  community: {
    tenantForum: boolean;
    eventCalendar: boolean;
    marketPlace: boolean;
    skillSharing: boolean;
    carpoolBoard: boolean;
  };
  
  // Emergency Communication
  emergencyComm: {
    massNotifications: boolean;
    evacuationProcedures: boolean;
    emergencyContacts: boolean;
    incidentReporting: boolean;
  };
}
```

### 5. Financial Management Enhancements

```typescript
interface FinancialEnhancement {
  // South African Specific
  saSpecific: {
    vatCalculation: boolean;
    paieTax: boolean;
    uifCompliance: boolean;
    eftProcessing: boolean;
    nedBankIntegration: boolean;
    absaIntegration: boolean;
    fnbIntegration: boolean;
    standardBankIntegration: boolean;
  };
  
  // Advanced Payment Features
  advancedPayments: {
    paymentPlans: boolean;
    automaticEscalation: boolean;
    creditScoring: boolean;
    riskAssessment: boolean;
    collectionAgency: boolean;
    legalProcessing: boolean;
  };
  
  // Investment Analytics
  investmentAnalytics: {
    roiCalculation: boolean;
    cashFlowAnalysis: boolean;
    marketComparisons: boolean;
    propertyValuation: boolean;
    portfolioOptimization: boolean;
  };
  
  // Insurance Integration
  insuranceIntegration: {
    claimProcessing: boolean;
    riskAssessment: boolean;
    premiumCalculation: boolean;
    incidentReporting: boolean;
  };
}
```

### 6. Mobile App Enhancements

```typescript
interface MobileEnhancement {
  // Offline Capabilities
  offline: {
    dataSync: boolean;
    conflictResolution: ConflictResolution;
    essentialDataCaching: string[]; // Data types to cache
    backgroundSync: boolean;
  };
  
  // Performance Optimizations
  performance: {
    imageOptimization: boolean;
    lazyLoading: boolean;
    cacheManagement: boolean;
    bundleOptimization: boolean;
    memoryManagement: boolean;
  };
  
  // Accessibility Features
  accessibility: {
    screenReader: boolean;
    voiceNavigation: boolean;
    highContrast: boolean;
    largeFonts: boolean;
    gestureCustomization: boolean;
    colorBlindSupport: boolean;
  };
  
  // Native Features
  nativeFeatures: {
    cameraIntegration: boolean;
    gpsIntegration: boolean;
    contactsIntegration: boolean;
    calendarIntegration: boolean;
    nfcSupport: boolean;
    bluetoothIntegration: boolean;
  };
}

interface ConflictResolution {
  strategy: 'server_wins' | 'client_wins' | 'last_modified_wins' | 'manual_resolution';
  userNotification: boolean;
  backupConflictedData: boolean;
}
```

### 7. Advanced Booking System

```typescript
interface BookingEnhancement {
  // Dynamic Pricing
  dynamicPricing: {
    enabled: boolean;
    factors: PricingFactor[];
    peakHours: TimeSlot[];
    seasonalRates: SeasonalRate[];
    demandBasedPricing: boolean;
  };
  
  // Advanced Booking Features
  advancedBooking: {
    recurringBookings: boolean;
    groupBookings: boolean;
    waitingList: boolean;
    bookingPackages: boolean;
    membershipTiers: boolean;
    loyaltyRewards: boolean;
  };
  
  // Resource Management
  resourceManagement: {
    equipmentBooking: boolean;
    staffAssignment: boolean;
    setupRequirements: boolean;
    cleaningSchedules: boolean;
    maintenanceBlocking: boolean;
  };
}

interface PricingFactor {
  factor: 'demand' | 'time_of_day' | 'day_of_week' | 'season' | 'amenity_popularity' | 'user_tier';
  multiplier: number;
  enabled: boolean;
}
```

### 8. Reporting & Analytics Enhancements

```typescript
interface ReportingEnhancement {
  // Advanced Reports
  advancedReports: {
    customReports: boolean;
    scheduledReports: boolean;
    interactiveReports: boolean;
    exportFormats: ExportFormat[];
    reportSharing: boolean;
    reportTemplates: boolean;
  };
  
  // Data Visualization
  visualization: {
    charts: ChartType[];
    dashboards: boolean;
    realTimeUpdates: boolean;
    mobileOptimized: boolean;
    interactiveMaps: boolean;
  };
  
  // Compliance Reporting
  complianceReporting: {
    regulatoryReports: string[]; // SA specific regulations
    auditTrails: boolean;
    dataRetention: number; // years
    privacyCompliance: boolean;
  };
  
  // Benchmarking
  benchmarking: {
    industryComparisons: boolean;
    regionalComparisons: boolean;
    performanceMetrics: string[];
    competitiveAnalysis: boolean;
  };
}

interface ExportFormat {
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'xml';
  enabled: boolean;
  customization: boolean;
}

interface ChartType {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'gauge' | 'waterfall';
  enabled: boolean;
}
```

## Implementation Roadmap

### Phase 1: Core Foundation (Months 1-3)
- **User Management & Authentication**
  - Multi-role authentication system
  - OTP verification
  - Basic profile management
  - Role-based permissions

- **Property & Unit Management**
  - Basic property CRUD operations
  - Unit assignment
  - Image upload and management
  - Basic reporting

- **Payment System Foundation**
  - South African payment gateway integration
  - Basic payment processing
  - Payment history tracking

### Phase 2: Core Features (Months 4-6)
- **Maintenance Management**
  - Request submission and tracking
  - Staff assignment
  - Basic workflow management
  - Image documentation

- **Basic Access Control**
  - Card management
  - Permission systems
  - Access logging
  - Basic visitor management

- **Communication System**
  - Announcements
  - Basic messaging
  - Notification system

### Phase 3: Advanced Features (Months 7-9)
- **Smart Access Control**
  - Digital keys
  - Mobile access
  - Biometric integration
  - Advanced visitor management

- **Advanced Booking System**
  - Amenity booking
  - Dynamic pricing
  - Booking rules engine
  - Resource management

- **Enhanced Analytics**
  - Performance dashboards
  - Predictive maintenance
  - Financial analytics

### Phase 4: AI & Automation (Months 10-12)
- **AI-Powered Features**
  - Intelligent scheduling
  - Predictive analytics
  - NLP for request processing
  - Computer vision for assessments

- **Smart Home Integration**
  - IoT device management
  - Automation rules
  - Energy monitoring

- **Advanced Security**
  - Behavior analysis
  - Geofencing
  - Threat detection

### Phase 5: Optimization & Scale (Months 13-15)
- **Performance Optimization**
  - Database optimization
  - Caching strategies
  - Mobile performance
  - Offline capabilities

- **Advanced Integrations**
  - Third-party services
  - Government systems
  - Banking integrations
  - Insurance platforms

This enhanced architecture provides a robust foundation for building a world-class property management platform specifically tailored for the South African market, with advanced features that differentiate it from existing solutions.