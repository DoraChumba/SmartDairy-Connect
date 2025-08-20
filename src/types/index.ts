import { UserRole } from "@prisma/client";
// User Types
// Modify the User interface to use imported UserRole:
export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: UserRole; // from Prisma client now
  cooperativeId?: string;
  cooperative?: Cooperative;
  createdAt: Date;
  updatedAt: Date;

export enum UserRole {
  FARMER = "FARMER",
  COOPERATIVE_STAFF = "COOPERATIVE_STAFF",
  ADMIN = "ADMIN",
  VETERINARIAN = "VETERINARIAN",
}

// Cooperative Types
export interface Cooperative {
  id: string;
  name: string;
  location: string;
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  website?: string;
}

// Milk Record Types
export interface MilkRecord {
  id: string;
  farmerId: string;
  farmer: User;
  cooperativeId: string;
  cooperative: Cooperative;
  quantity: number;
  quality: number;
  fatContent?: number;
  proteinContent?: number;
  deliveryDate: Date;
  collectionTime: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  farmerId: string;
  farmer: User;
  cooperativeId: string;
  cooperative: Cooperative;
  amount: number;
  currency: string;
  paymentType: PaymentType;
  status: PaymentStatus;
  paymentDate?: Date;
  reference?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentType {
  MILK_PAYMENT = "MILK_PAYMENT",
  SERVICE_FEE = "SERVICE_FEE",
  MEMBERSHIP_FEE = "MEMBERSHIP_FEE",
  OTHER = "OTHER",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

// Service Request Types
export interface ServiceRequest {
  id: string;
  farmerId: string;
  farmer: User;
  type: ServiceType;
  title: string;
  description: string;
  status: RequestStatus;
  priority: Priority;
  assignedTo?: string;
  scheduledDate?: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum ServiceType {
  VETERINARY = "VETERINARY",
  FEED_SUPPLY = "FEED_SUPPLY",
  TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
  TRAINING = "TRAINING",
  OTHER = "OTHER",
}

export enum RequestStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

// Announcement Types
export interface Announcement {
  id: string;
  cooperativeId: string;
  cooperative: Cooperative;
  title: string;
  content: string;
  priority: Priority;
  isActive: boolean;
  publishedAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  sender: User;
  content: string;
  type: MessageType;
  status: MessageStatus;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum MessageType {
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
  IN_APP = "IN_APP",
  PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
}

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED",
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Types
export interface DashboardStats {
  totalMilkDelivered: number;
  totalPayments: number;
  pendingRequests: number;
  recentAnnouncements: Announcement[];
}

export interface MilkDeliveryChart {
  date: string;
  quantity: number;
  quality: number;
}

export interface PaymentChart {
  month: string;
  amount: number;
  count: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  cooperativeId?: string;
  password: string;
  confirmPassword: string;
}

export interface ServiceRequestForm {
  type: ServiceType;
  title: string;
  description: string;
  priority: Priority;
  scheduledDate?: Date;
}
