import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  decimal,
  date,
  time,
  jsonb,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Enums ──

export const userRoleEnum = pgEnum("user_role", ["guest", "host", "admin"]);

export const propertyTypeEnum = pgEnum("property_type", [
  "hotel",
  "resort",
  "boutique",
  "bnb",
  "hostel",
  "vacation_rental",
]);

export const cancellationPolicyEnum = pgEnum("cancellation_policy", [
  "free",
  "moderate",
  "strict",
  "non_refundable",
]);

export const propertyStatusEnum = pgEnum("property_status", [
  "active",
  "inactive",
  "pending",
]);

export const roomCategoryEnum = pgEnum("room_category", [
  "standard",
  "deluxe",
  "suite",
  "penthouse",
  "accessible",
  "connecting",
]);

export const roomStatusEnum = pgEnum("room_status", [
  "clean",
  "dirty",
  "inspected",
  "out_of_order",
  "occupied",
]);

export const inventoryStatusEnum = pgEnum("inventory_status", [
  "available",
  "closed",
  "hold",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "no_show",
  "waitlisted",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
  "partially_refunded",
]);

export const paymentMethodEnum = pgEnum("payment_method_type", [
  "credit_card",
  "debit_card",
  "apple_pay",
  "google_pay",
  "bank_transfer",
  "gift_card",
  "loyalty_points",
]);

export const refundStatusEnum = pgEnum("refund_status", [
  "pending",
  "completed",
  "failed",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "published",
  "pending_moderation",
  "flagged",
  "removed",
]);

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "system",
  "auto_reply",
  "escalation",
]);

export const conversationRoleEnum = pgEnum("conversation_role", [
  "guest",
  "host",
  "staff",
]);

export const notificationChannelEnum = pgEnum("notification_channel", [
  "in_app",
  "email",
  "push",
  "sms",
]);

export const loyaltyTierEnum = pgEnum("loyalty_tier", [
  "base",
  "silver",
  "gold",
  "platinum",
]);

export const checkinMethodEnum = pgEnum("checkin_method", [
  "online",
  "mobile",
  "kiosk",
  "front_desk",
]);

export const amenityEnum = pgEnum("amenity_type", [
  "pool",
  "breakfast",
  "parking",
  "fitness",
  "spa",
  "restaurant",
  "wifi",
  "ac",
  "pet_friendly",
  "room_service",
  "business_center",
  "laundry",
  "bar",
  "ev_charging",
]);

// ── Users & Auth ──

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  passwordHash: text("password_hash"),
  name: text("name"),
  phone: text("phone"),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").default("guest").notNull(),
  locale: text("locale").default("en"),
  currency: text("currency").default("USD"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable("account", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
});

export const sessions = pgTable("session", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_token", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ── Guest Profile ──

export const guestProfiles = pgTable("guest_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  dateOfBirth: date("date_of_birth"),
  nationality: text("nationality"),
  idDocumentUrl: text("id_document_url"),
  dietaryPrefs: jsonb("dietary_prefs").$type<string[]>(),
  accessibility: jsonb("accessibility").$type<string[]>(),
  preferences: jsonb("preferences").$type<Record<string, string>>(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ── Property ──

export const properties = pgTable(
  "property",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hostId: uuid("host_id")
      .notNull()
      .references(() => users.id),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    propertyType: propertyTypeEnum("property_type").notNull(),
    starRating: integer("star_rating"),
    addressLine1: text("address_line1"),
    addressLine2: text("address_line2"),
    city: text("city").notNull(),
    state: text("state"),
    country: text("country").notNull(),
    zipCode: text("zip_code"),
    latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
    timezone: text("timezone"),
    checkInTime: time("check_in_time").default("15:00"),
    checkOutTime: time("check_out_time").default("11:00"),
    petPolicy: jsonb("pet_policy"),
    cancellationPolicy: cancellationPolicyEnum("cancellation_policy")
      .default("moderate")
      .notNull(),
    status: propertyStatusEnum("status").default("active").notNull(),
    avgRating: decimal("avg_rating", { precision: 3, scale: 2 }),
    reviewCount: integer("review_count").default(0).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("property_city_idx").on(table.city),
    index("property_country_idx").on(table.country),
    index("property_status_idx").on(table.status),
  ]
);

export const propertyAmenities = pgTable("property_amenity", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  amenity: amenityEnum("amenity").notNull(),
  details: text("details"),
});

export const propertyImages = pgTable("property_image", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").default(0),
  isPrimary: boolean("is_primary").default(false),
});

// ── Room Types ──

export const roomTypes = pgTable("room_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug"),
  description: text("description"),
  category: roomCategoryEnum("category").notNull(),
  maxOccupancy: integer("max_occupancy").notNull(),
  maxAdults: integer("max_adults").notNull(),
  maxChildren: integer("max_children"),
  bedConfig: jsonb("bed_config").$type<
    { type: string; count: number }[]
  >(),
  sizeSqft: integer("size_sqft"),
  baseRate: decimal("base_rate", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  isAccessible: boolean("is_accessible").default(false),
  amenities: jsonb("amenities").$type<string[]>(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const roomTypeImages = pgTable("room_type_image", {
  id: uuid("id").defaultRandom().primaryKey(),
  roomTypeId: uuid("room_type_id")
    .notNull()
    .references(() => roomTypes.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").default(0),
});

// ── Inventory / Availability ──

export const roomInventory = pgTable(
  "room_inventory",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roomTypeId: uuid("room_type_id")
      .notNull()
      .references(() => roomTypes.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    totalRooms: integer("total_rooms").notNull(),
    bookedRooms: integer("booked_rooms").default(0).notNull(),
    rate: decimal("rate", { precision: 10, scale: 2 }).notNull(),
    minStay: integer("min_stay").default(1),
    status: inventoryStatusEnum("status").default("available").notNull(),
  },
  (table) => [
    uniqueIndex("room_inventory_unique").on(table.roomTypeId, table.date),
    index("room_inventory_date_idx").on(table.date),
  ]
);

// ── Physical Rooms ──

export const rooms = pgTable(
  "room",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    roomTypeId: uuid("room_type_id")
      .notNull()
      .references(() => roomTypes.id),
    roomNumber: text("room_number").notNull(),
    floor: integer("floor"),
    status: roomStatusEnum("status").default("clean").notNull(),
    isAccessible: boolean("is_accessible").default(false),
  },
  (table) => [
    uniqueIndex("room_number_unique").on(table.propertyId, table.roomNumber),
  ]
);

// ── Booking ──

export const bookingGroups = pgTable("booking_group", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizerId: uuid("organizer_id")
    .notNull()
    .references(() => users.id),
  name: text("name"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const bookings = pgTable(
  "booking",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    confirmationNo: text("confirmation_no").notNull().unique(),
    userId: uuid("user_id").references(() => users.id),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id),
    roomTypeId: uuid("room_type_id")
      .notNull()
      .references(() => roomTypes.id),
    roomId: uuid("room_id").references(() => rooms.id),
    status: bookingStatusEnum("status").default("pending").notNull(),
    checkIn: date("check_in").notNull(),
    checkOut: date("check_out").notNull(),
    adults: integer("adults").default(1).notNull(),
    children: integer("children").default(0),
    infants: integer("infants").default(0),
    pets: integer("pets").default(0),
    petDetails: jsonb("pet_details"),
    specialRequests: text("special_requests"),
    accessibility: jsonb("accessibility").$type<string[]>(),
    guestName: text("guest_name").notNull(),
    guestEmail: text("guest_email").notNull(),
    guestPhone: text("guest_phone"),
    bookerUserId: uuid("booker_user_id").references(() => users.id),
    groupId: uuid("group_id").references(() => bookingGroups.id),
    corporateCode: text("corporate_code"),
    promoCode: text("promo_code"),
    nightlyRates: jsonb("nightly_rates").$type<
      { date: string; rate: number }[]
    >(),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }),
    taxes: decimal("taxes", { precision: 10, scale: 2 }),
    fees: decimal("fees", { precision: 10, scale: 2 }),
    discount: decimal("discount", { precision: 10, scale: 2 }),
    total: decimal("total", { precision: 10, scale: 2 }),
    currency: text("currency").default("USD"),
    loyaltyPointsEarned: integer("loyalty_points_earned").default(0),
    loyaltyPointsRedeemed: integer("loyalty_points_redeemed").default(0),
    cancellationPolicy: cancellationPolicyEnum("booking_cancellation_policy"),
    cancelledAt: timestamp("cancelled_at", { mode: "date" }),
    cancellationReason: text("cancellation_reason"),
    checkedInAt: timestamp("checked_in_at", { mode: "date" }),
    checkedOutAt: timestamp("checked_out_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("booking_user_idx").on(table.userId),
    index("booking_property_idx").on(table.propertyId),
    index("booking_status_idx").on(table.status),
    index("booking_checkin_idx").on(table.checkIn),
  ]
);

export const bookingAddons = pgTable("booking_addon", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  addonType: text("addon_type").notNull(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").default(1),
  details: jsonb("details"),
});

export const bookingModifications = pgTable("booking_modification", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  fieldChanged: text("field_changed").notNull(),
  oldValue: jsonb("old_value"),
  newValue: jsonb("new_value"),
  priceDiff: decimal("price_diff", { precision: 10, scale: 2 }),
  modifiedBy: uuid("modified_by").references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ── Payments ──

export const payments = pgTable("payment", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  status: paymentStatusEnum("status").default("pending").notNull(),
  paymentMethod: paymentMethodEnum("payment_method"),
  cardBrand: text("card_brand"),
  cardLast4: text("card_last4"),
  isSplit: boolean("is_split").default(false),
  splitIndex: integer("split_index"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const paymentMethods = pgTable("payment_method", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripePaymentMethodId: text("stripe_pm_id").notNull(),
  type: text("type"),
  cardBrand: text("card_brand"),
  cardLast4: text("card_last4"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const refunds = pgTable("refund", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id")
    .notNull()
    .references(() => payments.id),
  stripeRefundId: text("stripe_refund_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  reason: text("reason"),
  status: refundStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ── Reviews ──

export const reviews = pgTable(
  "review",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id")
      .notNull()
      .unique()
      .references(() => bookings.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id),
    rating: integer("rating").notNull(),
    title: text("title"),
    body: text("body"),
    photos: jsonb("photos").$type<string[]>(),
    status: reviewStatusEnum("status").default("published").notNull(),
    helpfulCount: integer("helpful_count").default(0),
    hostResponse: text("host_response"),
    hostRespondedAt: timestamp("host_responded_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("review_property_idx").on(table.propertyId),
    index("review_user_idx").on(table.userId),
  ]
);

export const reviewVotes = pgTable(
  "review_vote",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reviewId: uuid("review_id")
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    isHelpful: boolean("is_helpful").notNull(),
  },
  (table) => [
    uniqueIndex("review_vote_unique").on(table.reviewId, table.userId),
  ]
);

// ── Messaging ──

export const conversations = pgTable("conversation", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id").references(() => bookings.id),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => properties.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { mode: "date" }),
  lastMessageAt: timestamp("last_message_at", { mode: "date" }),
});

export const conversationParticipants = pgTable("conversation_participant", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  role: conversationRoleEnum("role").notNull(),
  lastReadAt: timestamp("last_read_at", { mode: "date" }),
  isMuted: boolean("is_muted").default(false),
});

export const messages = pgTable(
  "message",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id").references(() => users.id),
    body: text("body").notNull(),
    messageType: messageTypeEnum("message_type").default("text").notNull(),
    isUrgent: boolean("is_urgent").default(false),
    isPinned: boolean("is_pinned").default(false),
    attachments: jsonb("attachments"),
    originalLang: text("original_lang"),
    translations: jsonb("translations"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("message_conversation_idx").on(table.conversationId)]
);

// ── Notifications ──

export const notifications = pgTable(
  "notification",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    data: jsonb("data"),
    channel: notificationChannelEnum("channel").default("in_app").notNull(),
    isRead: boolean("is_read").default(false),
    readAt: timestamp("read_at", { mode: "date" }),
    groupKey: text("group_key"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("notification_user_idx").on(table.userId),
    index("notification_read_idx").on(table.isRead),
  ]
);

export const notificationPreferences = pgTable("notification_preference", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  emailEnabled: boolean("email_enabled").default(true),
  pushEnabled: boolean("push_enabled").default(true),
  smsEnabled: boolean("sms_enabled").default(false),
  quietStart: time("quiet_start"),
  quietEnd: time("quiet_end"),
});

// ── Wishlist ──

export const wishlists = pgTable("wishlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isShared: boolean("is_shared").default(false),
  shareToken: text("share_token").unique(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const wishlistItems = pgTable(
  "wishlist_item",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    wishlistId: uuid("wishlist_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("wishlist_item_unique").on(table.wishlistId, table.propertyId),
  ]
);

// ── Price Alerts ──

export const priceAlerts = pgTable("price_alert", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  propertyId: uuid("property_id").references(() => properties.id),
  destination: text("destination"),
  targetPrice: decimal("target_price", { precision: 10, scale: 2 }),
  checkIn: date("check_in"),
  checkOut: date("check_out"),
  isActive: boolean("is_active").default(true),
  lastTriggered: timestamp("last_triggered", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ── Search History ──

export const searchHistory = pgTable(
  "search_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    destination: text("destination"),
    checkIn: date("check_in"),
    checkOut: date("check_out"),
    guests: jsonb("guests"),
    filters: jsonb("filters"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("search_history_user_idx").on(table.userId)]
);

// ── Loyalty ──

export const loyaltyMembers = pgTable("loyalty_member", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  memberNumber: text("member_number").notNull().unique(),
  tier: loyaltyTierEnum("tier").default("base").notNull(),
  pointsBalance: integer("points_balance").default(0).notNull(),
  lifetimePoints: integer("lifetime_points").default(0).notNull(),
  qualifyingStays: integer("qualifying_stays").default(0).notNull(),
  tierExpires: date("tier_expires"),
  pointsExpire: date("points_expire"),
  enrolledAt: timestamp("enrolled_at", { mode: "date" }).defaultNow().notNull(),
});

export const pointsTransactions = pgTable("points_transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id")
    .notNull()
    .references(() => loyaltyMembers.id, { onDelete: "cascade" }),
  bookingId: uuid("booking_id").references(() => bookings.id),
  type: text("type").notNull(),
  points: integer("points").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ── Check-in / Check-out ──

export const checkinRecords = pgTable("checkin_record", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .unique()
    .references(() => bookings.id),
  method: checkinMethodEnum("method").notNull(),
  idVerified: boolean("id_verified").default(false),
  idDocumentUrl: text("id_document_url"),
  arrivalTime: time("arrival_time"),
  roomPreferences: jsonb("room_preferences"),
  digitalKeyActivated: boolean("digital_key_activated").default(false),
  checkedInAt: timestamp("checked_in_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export const folios = pgTable("folio", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .unique()
    .references(() => bookings.id),
  charges: jsonb("charges").$type<
    { description: string; amount: number; date: string; category: string }[]
  >(),
  total: decimal("total", { precision: 10, scale: 2 }),
  settled: boolean("settled").default(false),
  settledAt: timestamp("settled_at", { mode: "date" }),
});

// ── Service Requests (Tier 2 prep) ──

export const serviceRequests = pgTable("service_request", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id),
  type: text("type").notNull(),
  status: text("request_status").default("pending").notNull(),
  details: jsonb("details"),
  priority: text("priority").default("normal"),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at", { mode: "date" }),
});

// ── Relations ──

export const usersRelations = relations(users, ({ many, one }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
  wishlists: many(wishlists),
  notifications: many(notifications),
  guestProfile: one(guestProfiles),
  loyaltyMember: one(loyaltyMembers),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  host: one(users, { fields: [properties.hostId], references: [users.id] }),
  amenities: many(propertyAmenities),
  images: many(propertyImages),
  roomTypes: many(roomTypes),
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const roomTypesRelations = relations(roomTypes, ({ one, many }) => ({
  property: one(properties, {
    fields: [roomTypes.propertyId],
    references: [properties.id],
  }),
  images: many(roomTypeImages),
  inventory: many(roomInventory),
  rooms: many(rooms),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  property: one(properties, {
    fields: [bookings.propertyId],
    references: [properties.id],
  }),
  roomType: one(roomTypes, {
    fields: [bookings.roomTypeId],
    references: [roomTypes.id],
  }),
  room: one(rooms, { fields: [bookings.roomId], references: [rooms.id] }),
  group: one(bookingGroups, {
    fields: [bookings.groupId],
    references: [bookingGroups.id],
  }),
  addons: many(bookingAddons),
  modifications: many(bookingModifications),
  payments: many(payments),
  review: one(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  property: one(properties, {
    fields: [reviews.propertyId],
    references: [properties.id],
  }),
  votes: many(reviewVotes),
}));

export const conversationsRelations = relations(
  conversations,
  ({ many, one }) => ({
    participants: many(conversationParticipants),
    messages: many(messages),
    booking: one(bookings, {
      fields: [conversations.bookingId],
      references: [bookings.id],
    }),
    property: one(properties, {
      fields: [conversations.propertyId],
      references: [properties.id],
    }),
  })
);
