// Core User Types
export interface User {
  id: string;
  address: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  farcasterId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  organizer: User;
  venue: Venue;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
  tags: string[];
  images: string[];
  ticketTypes: TicketType[];
  capacity: number;
  soldTickets: number;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity: number;
  amenities: string[];
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  sold: number;
  benefits: string[];
  maxPerUser: number;
}

export enum EventCategory {
  CONFERENCE = 'conference',
  CONCERT = 'concert',
  FESTIVAL = 'festival',
  WORKSHOP = 'workshop',
  NETWORKING = 'networking',
  SPORTS = 'sports',
  ART = 'art',
  FOOD = 'food',
  OTHER = 'other'
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ON_SALE = 'on_sale',
  SOLD_OUT = 'sold_out',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// Ticket Types
export interface Ticket {
  id: string;
  eventId: string;
  event: Event;
  ticketTypeId: string;
  ticketType: TicketType;
  ownerId: string;
  owner: User;
  tokenId?: string; // NFT token ID
  status: TicketStatus;
  purchasedAt: Date;
  usedAt?: Date;
}

export enum TicketStatus {
  ACTIVE = 'active',
  USED = 'used',
  TRANSFERRED = 'transferred',
  REFUNDED = 'refunded'
}

// Media Types
export interface Media {
  id: string;
  eventId: string;
  event: Event;
  creatorId: string;
  creator: User;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  ipfsHash?: string;
  metadata: MediaMetadata;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface MediaMetadata {
  title?: string;
  description?: string;
  tags: string[];
  location?: {
    lat: number;
    lng: number;
  };
  camera?: {
    make: string;
    model: string;
    settings: Record<string, any>;
  };
}

export enum MediaType {
  PHOTO = 'photo',
  VIDEO = 'video'
}

export interface Comment {
  id: string;
  mediaId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
}

// Reward Types
export interface Reward {
  id: string;
  userId: string;
  user: User;
  type: RewardType;
  amount: number;
  reason: string;
  eventId?: string;
  mediaId?: string;
  status: RewardStatus;
  claimedAt?: Date;
  createdAt: Date;
}

export enum RewardType {
  EVENT_ATTENDANCE = 'event_attendance',
  CONTENT_CREATION = 'content_creation',
  SOCIAL_ENGAGEMENT = 'social_engagement',
  REFERRAL = 'referral',
  COMMUNITY_BUILDING = 'community_building'
}

export enum RewardStatus {
  PENDING = 'pending',
  CLAIMED = 'claimed',
  EXPIRED = 'expired'
}

// Authentication Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  wallet: WalletInfo | null;
}

export interface WalletInfo {
  address: string;
  chainId: number;
  connector: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
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

// Form Types
export interface CreateEventForm {
  title: string;
  description: string;
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
  };
  startDate: string;
  endDate: string;
  category: EventCategory;
  tags: string[];
  images: File[];
  ticketTypes: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    benefits: string[];
    maxPerUser: number;
  }[];
}

export interface PurchaseTicketForm {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  paymentMethod: 'crypto' | 'fiat';
}
