CREATE TYPE "public"."amenity_type" AS ENUM('pool', 'breakfast', 'parking', 'fitness', 'spa', 'restaurant', 'wifi', 'ac', 'pet_friendly', 'room_service', 'business_center', 'laundry', 'bar', 'ev_charging');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'waitlisted');--> statement-breakpoint
CREATE TYPE "public"."cancellation_policy" AS ENUM('free', 'moderate', 'strict', 'non_refundable');--> statement-breakpoint
CREATE TYPE "public"."checkin_method" AS ENUM('online', 'mobile', 'kiosk', 'front_desk');--> statement-breakpoint
CREATE TYPE "public"."conversation_role" AS ENUM('guest', 'host', 'staff');--> statement-breakpoint
CREATE TYPE "public"."inventory_status" AS ENUM('available', 'closed', 'hold');--> statement-breakpoint
CREATE TYPE "public"."loyalty_tier" AS ENUM('base', 'silver', 'gold', 'platinum');--> statement-breakpoint
CREATE TYPE "public"."message_type" AS ENUM('text', 'system', 'auto_reply', 'escalation');--> statement-breakpoint
CREATE TYPE "public"."notification_channel" AS ENUM('in_app', 'email', 'push', 'sms');--> statement-breakpoint
CREATE TYPE "public"."payment_method_type" AS ENUM('credit_card', 'debit_card', 'apple_pay', 'google_pay', 'bank_transfer', 'gift_card', 'loyalty_points');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('active', 'inactive', 'pending');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('hotel', 'resort', 'boutique', 'bnb', 'hostel', 'vacation_rental');--> statement-breakpoint
CREATE TYPE "public"."refund_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('published', 'pending_moderation', 'flagged', 'removed');--> statement-breakpoint
CREATE TYPE "public"."room_category" AS ENUM('standard', 'deluxe', 'suite', 'penthouse', 'accessible', 'connecting');--> statement-breakpoint
CREATE TYPE "public"."room_status" AS ENUM('clean', 'dirty', 'inspected', 'out_of_order', 'occupied');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('guest', 'host', 'admin');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "booking_addon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"addon_type" text NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1,
	"details" jsonb
);
--> statement-breakpoint
CREATE TABLE "booking_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizer_id" uuid NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking_modification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"field_changed" text NOT NULL,
	"old_value" jsonb,
	"new_value" jsonb,
	"price_diff" numeric(10, 2),
	"modified_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"confirmation_no" text NOT NULL,
	"user_id" uuid,
	"property_id" uuid NOT NULL,
	"room_type_id" uuid NOT NULL,
	"room_id" uuid,
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"check_in" date NOT NULL,
	"check_out" date NOT NULL,
	"adults" integer DEFAULT 1 NOT NULL,
	"children" integer DEFAULT 0,
	"infants" integer DEFAULT 0,
	"pets" integer DEFAULT 0,
	"pet_details" jsonb,
	"special_requests" text,
	"accessibility" jsonb,
	"guest_name" text NOT NULL,
	"guest_email" text NOT NULL,
	"guest_phone" text,
	"booker_user_id" uuid,
	"group_id" uuid,
	"corporate_code" text,
	"promo_code" text,
	"nightly_rates" jsonb,
	"subtotal" numeric(10, 2),
	"taxes" numeric(10, 2),
	"fees" numeric(10, 2),
	"discount" numeric(10, 2),
	"total" numeric(10, 2),
	"currency" text DEFAULT 'USD',
	"loyalty_points_earned" integer DEFAULT 0,
	"loyalty_points_redeemed" integer DEFAULT 0,
	"booking_cancellation_policy" "cancellation_policy",
	"cancelled_at" timestamp,
	"cancellation_reason" text,
	"checked_in_at" timestamp,
	"checked_out_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "booking_confirmation_no_unique" UNIQUE("confirmation_no")
);
--> statement-breakpoint
CREATE TABLE "checkin_record" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"method" "checkin_method" NOT NULL,
	"id_verified" boolean DEFAULT false,
	"id_document_url" text,
	"arrival_time" time,
	"room_preferences" jsonb,
	"digital_key_activated" boolean DEFAULT false,
	"checked_in_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "checkin_record_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE "conversation_participant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "conversation_role" NOT NULL,
	"last_read_at" timestamp,
	"is_muted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"property_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"archived_at" timestamp,
	"last_message_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "folio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"charges" jsonb,
	"total" numeric(10, 2),
	"settled" boolean DEFAULT false,
	"settled_at" timestamp,
	CONSTRAINT "folio_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE "guest_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"date_of_birth" date,
	"nationality" text,
	"id_document_url" text,
	"dietary_prefs" jsonb,
	"accessibility" jsonb,
	"preferences" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "guest_profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "loyalty_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"member_number" text NOT NULL,
	"tier" "loyalty_tier" DEFAULT 'base' NOT NULL,
	"points_balance" integer DEFAULT 0 NOT NULL,
	"lifetime_points" integer DEFAULT 0 NOT NULL,
	"qualifying_stays" integer DEFAULT 0 NOT NULL,
	"tier_expires" date,
	"points_expire" date,
	"enrolled_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "loyalty_member_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "loyalty_member_member_number_unique" UNIQUE("member_number")
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"sender_id" uuid,
	"body" text NOT NULL,
	"message_type" "message_type" DEFAULT 'text' NOT NULL,
	"is_urgent" boolean DEFAULT false,
	"is_pinned" boolean DEFAULT false,
	"attachments" jsonb,
	"original_lang" text,
	"translations" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_preference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category" text NOT NULL,
	"email_enabled" boolean DEFAULT true,
	"push_enabled" boolean DEFAULT true,
	"sms_enabled" boolean DEFAULT false,
	"quiet_start" time,
	"quiet_end" time
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"body" text,
	"data" jsonb,
	"channel" "notification_channel" DEFAULT 'in_app' NOT NULL,
	"is_read" boolean DEFAULT false,
	"read_at" timestamp,
	"group_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_method" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stripe_pm_id" text NOT NULL,
	"type" text,
	"card_brand" text,
	"card_last4" text,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"stripe_payment_intent_id" text,
	"amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"payment_method" "payment_method_type",
	"card_brand" text,
	"card_last4" text,
	"is_split" boolean DEFAULT false,
	"split_index" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "points_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"booking_id" uuid,
	"type" text NOT NULL,
	"points" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "price_alert" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"property_id" uuid,
	"destination" text,
	"target_price" numeric(10, 2),
	"check_in" date,
	"check_out" date,
	"is_active" boolean DEFAULT true,
	"last_triggered" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"host_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"property_type" "property_type" NOT NULL,
	"star_rating" integer,
	"address_line1" text,
	"address_line2" text,
	"city" text NOT NULL,
	"state" text,
	"country" text NOT NULL,
	"zip_code" text,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"timezone" text,
	"check_in_time" time DEFAULT '15:00',
	"check_out_time" time DEFAULT '11:00',
	"pet_policy" jsonb,
	"cancellation_policy" "cancellation_policy" DEFAULT 'moderate' NOT NULL,
	"status" "property_status" DEFAULT 'active' NOT NULL,
	"avg_rating" numeric(3, 2),
	"review_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "property_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "property_amenity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"amenity" "amenity_type" NOT NULL,
	"details" text
);
--> statement-breakpoint
CREATE TABLE "property_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt_text" text,
	"sort_order" integer DEFAULT 0,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "refund" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid NOT NULL,
	"stripe_refund_id" text,
	"amount" numeric(10, 2) NOT NULL,
	"reason" text,
	"status" "refund_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_vote" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"is_helpful" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"title" text,
	"body" text,
	"photos" jsonb,
	"status" "review_status" DEFAULT 'published' NOT NULL,
	"helpful_count" integer DEFAULT 0,
	"host_response" text,
	"host_responded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "review_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE "room_inventory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_type_id" uuid NOT NULL,
	"date" date NOT NULL,
	"total_rooms" integer NOT NULL,
	"booked_rooms" integer DEFAULT 0 NOT NULL,
	"rate" numeric(10, 2) NOT NULL,
	"min_stay" integer DEFAULT 1,
	"status" "inventory_status" DEFAULT 'available' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room_type_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_type_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt_text" text,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "room_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"description" text,
	"category" "room_category" NOT NULL,
	"max_occupancy" integer NOT NULL,
	"max_adults" integer NOT NULL,
	"max_children" integer,
	"bed_config" jsonb,
	"size_sqft" integer,
	"base_rate" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD',
	"is_accessible" boolean DEFAULT false,
	"amenities" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"room_type_id" uuid NOT NULL,
	"room_number" text NOT NULL,
	"floor" integer,
	"status" "room_status" DEFAULT 'clean' NOT NULL,
	"is_accessible" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "search_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"destination" text,
	"check_in" date,
	"check_out" date,
	"guests" jsonb,
	"filters" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"type" text NOT NULL,
	"request_status" text DEFAULT 'pending' NOT NULL,
	"details" jsonb,
	"priority" text DEFAULT 'normal',
	"assigned_to" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" text NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "session_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"password_hash" text,
	"name" text,
	"phone" text,
	"avatar_url" text,
	"role" "user_role" DEFAULT 'guest' NOT NULL,
	"locale" text DEFAULT 'en',
	"currency" text DEFAULT 'USD',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "wishlist_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wishlist_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wishlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_shared" boolean DEFAULT false,
	"share_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wishlist_share_token_unique" UNIQUE("share_token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_addon" ADD CONSTRAINT "booking_addon_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_group" ADD CONSTRAINT "booking_group_organizer_id_user_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_modification" ADD CONSTRAINT "booking_modification_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_modification" ADD CONSTRAINT "booking_modification_modified_by_user_id_fk" FOREIGN KEY ("modified_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_type_id_room_type_id_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_booker_user_id_user_id_fk" FOREIGN KEY ("booker_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_group_id_booking_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."booking_group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkin_record" ADD CONSTRAINT "checkin_record_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folio" ADD CONSTRAINT "folio_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_profile" ADD CONSTRAINT "guest_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loyalty_member" ADD CONSTRAINT "loyalty_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_preference" ADD CONSTRAINT "notification_preference_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "points_transaction" ADD CONSTRAINT "points_transaction_member_id_loyalty_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."loyalty_member"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "points_transaction" ADD CONSTRAINT "points_transaction_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_alert" ADD CONSTRAINT "price_alert_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_alert" ADD CONSTRAINT "price_alert_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_host_id_user_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_amenity" ADD CONSTRAINT "property_amenity_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_image" ADD CONSTRAINT "property_image_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refund" ADD CONSTRAINT "refund_payment_id_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_vote" ADD CONSTRAINT "review_vote_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_vote" ADD CONSTRAINT "review_vote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_inventory" ADD CONSTRAINT "room_inventory_room_type_id_room_type_id_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_type_image" ADD CONSTRAINT "room_type_image_room_type_id_room_type_id_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_type" ADD CONSTRAINT "room_type_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_room_type_id_room_type_id_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_history" ADD CONSTRAINT "search_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_assigned_to_user_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_item" ADD CONSTRAINT "wishlist_item_wishlist_id_wishlist_id_fk" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlist"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_item" ADD CONSTRAINT "wishlist_item_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "booking_user_idx" ON "booking" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "booking_property_idx" ON "booking" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "booking_status_idx" ON "booking" USING btree ("status");--> statement-breakpoint
CREATE INDEX "booking_checkin_idx" ON "booking" USING btree ("check_in");--> statement-breakpoint
CREATE INDEX "message_conversation_idx" ON "message" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "notification_user_idx" ON "notification" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notification_read_idx" ON "notification" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "property_city_idx" ON "property" USING btree ("city");--> statement-breakpoint
CREATE INDEX "property_country_idx" ON "property" USING btree ("country");--> statement-breakpoint
CREATE INDEX "property_status_idx" ON "property" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "review_vote_unique" ON "review_vote" USING btree ("review_id","user_id");--> statement-breakpoint
CREATE INDEX "review_property_idx" ON "review" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "review_user_idx" ON "review" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "room_inventory_unique" ON "room_inventory" USING btree ("room_type_id","date");--> statement-breakpoint
CREATE INDEX "room_inventory_date_idx" ON "room_inventory" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "room_number_unique" ON "room" USING btree ("property_id","room_number");--> statement-breakpoint
CREATE INDEX "search_history_user_idx" ON "search_history" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "wishlist_item_unique" ON "wishlist_item" USING btree ("wishlist_id","property_id");