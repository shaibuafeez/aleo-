// Export Prisma client singleton
export { default as prisma } from './client'

// Re-export Prisma types for convenience
export type {
  User,
  UserStats,
  UserProgress,
  Achievement,
  AnalyticsEvent,
  Class,
  ClassBooking,
  ClassMessage,
  ClassDonation,
  ClassStatus,
  BookingStatus,
  MessageType,
  DonationStatus,
} from '@prisma/client'
