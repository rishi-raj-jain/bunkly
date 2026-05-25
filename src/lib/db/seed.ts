import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { slugify } from "../utils";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ── Seed Data ──

const PROPERTIES = [
  {
    name: "The Grand Bunkly NYC",
    propertyType: "hotel" as const,
    starRating: 5,
    city: "New York",
    state: "New York",
    country: "United States",
    addressLine1: "455 Madison Avenue",
    zipCode: "10022",
    latitude: "40.76120000",
    longitude: "-73.97440000",
    description:
      "A landmark five-star hotel in the heart of Midtown Manhattan, steps from Central Park and Fifth Avenue shopping. Elegant rooms blend classic sophistication with modern amenities.",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "moderate" as const,
    amenities: [
      "pool",
      "breakfast",
      "parking",
      "fitness",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "business_center",
      "bar",
    ] as const,
    roomTypes: [
      {
        name: "Standard King",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 350,
        baseRate: "299.00",
        description:
          "Comfortable room with city views, king bed, marble bathroom, and work desk.",
        amenities: ["wifi", "minibar", "safe", "iron", "coffee maker"],
      },
      {
        name: "Deluxe Double",
        category: "deluxe" as const,
        maxOccupancy: 4,
        maxAdults: 4,
        maxChildren: 2,
        bedConfig: [{ type: "queen", count: 2 }],
        sizeSqft: 450,
        baseRate: "399.00",
        description:
          "Spacious room with two queen beds, city or park views, and premium bath amenities.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "iron",
          "coffee maker",
          "bathrobes",
        ],
      },
      {
        name: "Executive Suite",
        category: "suite" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 2,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 700,
        baseRate: "699.00",
        description:
          "Luxurious suite with separate living area, dining space, Central Park views, and butler service.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "iron",
          "coffee maker",
          "bathrobes",
          "living room",
          "dining area",
        ],
      },
      {
        name: "Accessible Standard",
        category: "accessible" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 400,
        baseRate: "299.00",
        isAccessible: true,
        description:
          "ADA-compliant room with roll-in shower, grab bars, lowered fixtures, and visual alerts.",
        amenities: ["wifi", "minibar", "safe", "iron", "coffee maker"],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Boutique Paris",
    propertyType: "boutique" as const,
    starRating: 4,
    city: "Paris",
    state: "Ile-de-France",
    country: "France",
    addressLine1: "12 Rue de Rivoli",
    zipCode: "75004",
    latitude: "48.85600000",
    longitude: "2.35220000",
    description:
      "A chic boutique hotel in Le Marais, Paris. Blending 18th-century architecture with contemporary design, each room tells a unique story. Walking distance to the Louvre and Notre-Dame.",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "free" as const,
    amenities: [
      "breakfast",
      "wifi",
      "ac",
      "room_service",
      "bar",
      "restaurant",
    ] as const,
    roomTypes: [
      {
        name: "Chambre Classique",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 0,
        bedConfig: [{ type: "queen", count: 1 }],
        sizeSqft: 250,
        baseRate: "220.00",
        description:
          "Intimate room with Parisian courtyard views, antique furnishings, and rain shower.",
        amenities: ["wifi", "minibar", "safe", "bathrobes"],
      },
      {
        name: "Suite Eiffel",
        category: "suite" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 550,
        baseRate: "520.00",
        description:
          "Corner suite with Eiffel Tower glimpses, freestanding bathtub, and private balcony.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "balcony",
          "bathtub",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d7a612a0d?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Resort & Spa Bali",
    propertyType: "resort" as const,
    starRating: 5,
    city: "Ubud",
    state: "Bali",
    country: "Indonesia",
    addressLine1: "Jl. Raya Ubud No. 88",
    zipCode: "80571",
    latitude: "-8.50690000",
    longitude: "115.26240000",
    description:
      "Nestled among Bali's iconic rice terraces, this luxury resort offers private pool villas, world-class spa treatments, and authentic Balinese hospitality. A true tropical paradise.",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "moderate" as const,
    amenities: [
      "pool",
      "breakfast",
      "parking",
      "fitness",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "bar",
      "pet_friendly",
    ] as const,
    roomTypes: [
      {
        name: "Garden Villa",
        category: "deluxe" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 600,
        baseRate: "350.00",
        description:
          "Private villa surrounded by tropical gardens with outdoor shower and daybed.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "garden",
          "outdoor shower",
        ],
      },
      {
        name: "Pool Villa",
        category: "suite" as const,
        maxOccupancy: 4,
        maxAdults: 2,
        maxChildren: 2,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 900,
        baseRate: "650.00",
        description:
          "Stunning villa with private infinity pool overlooking rice terraces and open-air bathroom.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "private pool",
          "rice terrace view",
        ],
      },
      {
        name: "Royal Penthouse Villa",
        category: "penthouse" as const,
        maxOccupancy: 4,
        maxAdults: 2,
        maxChildren: 2,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 1500,
        baseRate: "1200.00",
        description:
          "The ultimate Bali experience: two-story villa with rooftop pool, private chef kitchen, and panoramic valley views.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "private pool",
          "rooftop",
          "kitchen",
          "butler",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Lodge Tokyo",
    propertyType: "hotel" as const,
    starRating: 4,
    city: "Tokyo",
    state: "Kanto",
    country: "Japan",
    addressLine1: "2-1-1 Nihonbashi, Chuo-ku",
    zipCode: "103-0027",
    latitude: "35.68390000",
    longitude: "139.77440000",
    description:
      "Modern Japanese hospitality meets cutting-edge design in the heart of Tokyo. Features an onsen-inspired spa, rooftop bar with Skytree views, and Michelin-starred dining.",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "strict" as const,
    amenities: [
      "breakfast",
      "fitness",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "bar",
      "laundry",
      "business_center",
    ] as const,
    roomTypes: [
      {
        name: "Compact Single",
        category: "standard" as const,
        maxOccupancy: 1,
        maxAdults: 1,
        maxChildren: 0,
        bedConfig: [{ type: "single", count: 1 }],
        sizeSqft: 180,
        baseRate: "150.00",
        description:
          "Efficiently designed room with signature Japanese minimalism, rain shower, and smart controls.",
        amenities: ["wifi", "safe", "yukata", "green tea set"],
      },
      {
        name: "Superior Twin",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "twin", count: 2 }],
        sizeSqft: 300,
        baseRate: "250.00",
        description:
          "Bright room with two twin beds, workspace, and views of the Tokyo skyline.",
        amenities: ["wifi", "minibar", "safe", "yukata", "green tea set"],
      },
      {
        name: "Sakura Suite",
        category: "suite" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 600,
        baseRate: "480.00",
        description:
          "Japanese-modern suite with tatami lounge, soaking tub, and Skytree panorama.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "yukata",
          "soaking tub",
          "tatami",
          "Skytree view",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Beach House Barcelona",
    propertyType: "boutique" as const,
    starRating: 4,
    city: "Barcelona",
    state: "Catalonia",
    country: "Spain",
    addressLine1: "Passeig del Mare Nostrum 15",
    zipCode: "08039",
    latitude: "41.37690000",
    longitude: "2.18940000",
    description:
      "Mediterranean beachfront boutique hotel in Barceloneta. Rooftop terrace with infinity pool, tapas bar, and panoramic sea views. Steps from the beach and Gothic Quarter.",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "free" as const,
    amenities: [
      "pool",
      "breakfast",
      "parking",
      "fitness",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "bar",
      "pet_friendly",
    ] as const,
    roomTypes: [
      {
        name: "Sea View Room",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "queen", count: 1 }],
        sizeSqft: 280,
        baseRate: "195.00",
        description:
          "Bright Mediterranean room with private balcony overlooking the sea, terracotta tiles, and linen curtains.",
        amenities: ["wifi", "minibar", "safe", "balcony", "sea view"],
      },
      {
        name: "Penthouse Terrace Suite",
        category: "penthouse" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 800,
        baseRate: "550.00",
        description:
          "Top-floor suite with wraparound terrace, outdoor dining, daybeds, and unobstructed views of the Mediterranean and Sagrada Familia.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "terrace",
          "outdoor dining",
          "Sagrada Familia view",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Harbour Hotel Sydney",
    propertyType: "hotel" as const,
    starRating: 5,
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    addressLine1: "7 Hickson Road, The Rocks",
    zipCode: "2000",
    latitude: "-33.85880000",
    longitude: "151.20930000",
    description:
      "Iconic waterfront hotel at The Rocks with Opera House and Harbour Bridge views. Award-winning restaurants, infinity pool, and direct harbor access for sailing excursions.",
    checkInTime: "15:00",
    checkOutTime: "10:00",
    cancellationPolicy: "moderate" as const,
    amenities: [
      "pool",
      "breakfast",
      "parking",
      "fitness",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "business_center",
      "bar",
      "laundry",
    ] as const,
    roomTypes: [
      {
        name: "Harbour View Room",
        category: "deluxe" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 380,
        baseRate: "420.00",
        description:
          "Premium room with floor-to-ceiling harbour views, rain shower, and Nespresso machine.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "harbour view",
          "Nespresso",
        ],
      },
      {
        name: "Opera House Suite",
        category: "suite" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 2,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 750,
        baseRate: "890.00",
        description:
          "Corner suite with direct Opera House sightline, deep soaking tub, and private dining terrace.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "Opera House view",
          "soaking tub",
          "terrace",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Mountain Lodge Aspen",
    propertyType: "resort" as const,
    starRating: 5,
    city: "Aspen",
    state: "Colorado",
    country: "United States",
    addressLine1: "315 E Dean Street",
    zipCode: "81611",
    latitude: "39.18710000",
    longitude: "-106.81830000",
    description:
      "Rustic luxury ski-in/ski-out resort at the base of Aspen Mountain. Featuring après-ski lounge with fireplace, outdoor heated pool, and farm-to-table dining.",
    checkInTime: "16:00",
    checkOutTime: "11:00",
    cancellationPolicy: "strict" as const,
    amenities: [
      "pool",
      "breakfast",
      "parking",
      "fitness",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "bar",
      "pet_friendly",
    ] as const,
    roomTypes: [
      {
        name: "Mountain View King",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 400,
        baseRate: "450.00",
        description:
          "Cozy alpine room with mountain panorama, stone fireplace, heated floors, and ski storage.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "fireplace",
          "heated floors",
          "ski storage",
        ],
      },
      {
        name: "Family Cabin Suite",
        category: "suite" as const,
        maxOccupancy: 6,
        maxAdults: 4,
        maxChildren: 4,
        bedConfig: [
          { type: "king", count: 1 },
          { type: "bunk", count: 2 },
        ],
        sizeSqft: 950,
        baseRate: "850.00",
        description:
          "Two-bedroom cabin-style suite with bunk room for kids, full kitchen, and private hot tub on the deck.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "fireplace",
          "kitchen",
          "hot tub",
          "ski storage",
          "bunk beds",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly B&B Cotswolds",
    propertyType: "bnb" as const,
    starRating: 3,
    city: "London",
    state: "England",
    country: "United Kingdom",
    addressLine1: "47 Gloucester Place",
    zipCode: "W1U 8JE",
    latitude: "51.52020000",
    longitude: "-0.15350000",
    description:
      "Charming bed and breakfast in a Georgian townhouse near Hyde Park. Homemade English breakfast, cozy reading room, and individually decorated bedrooms with period features.",
    checkInTime: "14:00",
    checkOutTime: "10:30",
    cancellationPolicy: "free" as const,
    amenities: ["breakfast", "wifi", "ac", "laundry"] as const,
    roomTypes: [
      {
        name: "Classic Double",
        category: "standard" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 0,
        bedConfig: [{ type: "double", count: 1 }],
        sizeSqft: 200,
        baseRate: "135.00",
        description:
          "Quaint room with antique furnishings, floral wallpaper, and en-suite shower room.",
        amenities: ["wifi", "tea & coffee", "toiletries"],
      },
      {
        name: "Superior King",
        category: "deluxe" as const,
        maxOccupancy: 2,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 300,
        baseRate: "195.00",
        description:
          "Larger room with king bed, garden views, freestanding bathtub, and seating area.",
        amenities: ["wifi", "tea & coffee", "toiletries", "bathtub", "garden view"],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Capsule Tokyo Station",
    propertyType: "hostel" as const,
    starRating: 2,
    city: "Tokyo",
    state: "Kanto",
    country: "Japan",
    addressLine1: "1-9-1 Marunouchi, Chiyoda-ku",
    zipCode: "100-0005",
    latitude: "35.68120000",
    longitude: "139.76710000",
    description:
      "High-tech capsule hotel steps from Tokyo Station. Premium pods with personal entertainment, USB charging, blackout curtains, and 24-hour lounge with manga library.",
    checkInTime: "16:00",
    checkOutTime: "10:00",
    cancellationPolicy: "free" as const,
    amenities: ["wifi", "ac", "laundry", "business_center"] as const,
    roomTypes: [
      {
        name: "Standard Pod",
        category: "standard" as const,
        maxOccupancy: 1,
        maxAdults: 1,
        maxChildren: 0,
        bedConfig: [{ type: "pod", count: 1 }],
        sizeSqft: 40,
        baseRate: "45.00",
        description:
          "Personal sleeping pod with ventilation, reading light, USB charging, and privacy screen.",
        amenities: ["wifi", "USB charging", "reading light"],
      },
      {
        name: "Premium Pod",
        category: "deluxe" as const,
        maxOccupancy: 1,
        maxAdults: 1,
        maxChildren: 0,
        bedConfig: [{ type: "pod", count: 1 }],
        sizeSqft: 55,
        baseRate: "65.00",
        description:
          "Wider pod with personal TV, noise-canceling headphones, power outlets, and premium mattress.",
        amenities: ["wifi", "TV", "headphones", "USB charging", "reading light"],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d7a612a0d?w=800&h=600&fit=crop",
    ],
  },
  {
    name: "Bunkly Beachfront Villa Maldives",
    propertyType: "vacation_rental" as const,
    starRating: 5,
    city: "Male",
    state: "Kaafu Atoll",
    country: "Maldives",
    addressLine1: "North Male Atoll",
    zipCode: "08840",
    latitude: "4.17550000",
    longitude: "73.50930000",
    description:
      "Exclusive overwater villa in the Maldives. Glass floor panels reveal coral reefs below. Private butler, direct ocean access, and sunset dining on your personal deck.",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "non_refundable" as const,
    amenities: [
      "pool",
      "breakfast",
      "spa",
      "restaurant",
      "wifi",
      "ac",
      "room_service",
      "bar",
    ] as const,
    roomTypes: [
      {
        name: "Overwater Villa",
        category: "suite" as const,
        maxOccupancy: 3,
        maxAdults: 2,
        maxChildren: 1,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 1100,
        baseRate: "1500.00",
        description:
          "Stunning overwater villa with glass floor, infinity plunge pool, outdoor rain shower, and direct lagoon access.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "plunge pool",
          "glass floor",
          "ocean access",
          "butler",
        ],
      },
      {
        name: "Sunset Presidential Suite",
        category: "penthouse" as const,
        maxOccupancy: 4,
        maxAdults: 2,
        maxChildren: 2,
        bedConfig: [{ type: "king", count: 1 }],
        sizeSqft: 2200,
        baseRate: "3500.00",
        description:
          "The pinnacle of Maldivian luxury: two bedrooms, private 20m pool, wine cellar, sunset-facing deck, and personal chef.",
        amenities: [
          "wifi",
          "minibar",
          "safe",
          "bathrobes",
          "private pool",
          "wine cellar",
          "personal chef",
          "butler",
          "sunset view",
        ],
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    ],
  },
];

const SEED_USERS = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    passwordHash: "password123",
    role: "guest" as const,
  },
  {
    name: "Marcus Johnson",
    email: "marcus@example.com",
    passwordHash: "password123",
    role: "guest" as const,
  },
  {
    name: "Emily Watson",
    email: "emily@example.com",
    passwordHash: "password123",
    role: "guest" as const,
  },
  {
    name: "Hotel Manager",
    email: "admin@example.com",
    passwordHash: "admin123",
    role: "admin" as const,
  },
  {
    name: "Property Host",
    email: "host@example.com",
    passwordHash: "host123",
    role: "host" as const,
  },
];

async function seed() {
  console.log("Seeding database...\n");

  // Clear existing data so the seed is idempotent
  await sql`
    TRUNCATE TABLE
      "review", "review_vote", "checkin_record", "folio", "service_request",
      "message", "conversation_participant", "conversation",
      "notification", "notification_preference",
      "points_transaction", "loyalty_member",
      "wishlist_item", "wishlist", "price_alert", "search_history",
      "booking_modification", "booking_addon", "refund", "payment",
      "booking", "booking_group",
      "room", "room_inventory", "room_type_image", "room_type",
      "property_amenity", "property_image", "property",
      "guest_profile", "payment_method", "session", "account", "verification_token",
      "user"
    CASCADE
  `;

  // 1. Create users
  console.log("Creating users...");
  const createdUsers = await db
    .insert(schema.users)
    .values(SEED_USERS)
    .returning();

  const hostUser = createdUsers.find((u) => u.role === "host")!;
  const guestUsers = createdUsers.filter((u) => u.role === "guest");
  console.log(`  Created ${createdUsers.length} users`);

  // 2. Create properties
  console.log("Creating properties...");
  for (const prop of PROPERTIES) {
    const slug = slugify(prop.name);
    const { amenities, roomTypes, images, ...propertyData } = prop;

    const [property] = await db
      .insert(schema.properties)
      .values({
        ...propertyData,
        slug,
        hostId: hostUser.id,
        avgRating: (3.5 + Math.random() * 1.5).toFixed(2),
        reviewCount: Math.floor(Math.random() * 200) + 10,
      })
      .returning();

    console.log(`  Created property: ${property.name}`);

    // Amenities
    if (amenities.length > 0) {
      await db.insert(schema.propertyAmenities).values(
        amenities.map((a) => ({
          propertyId: property.id,
          amenity: a,
        }))
      );
    }

    // Images
    if (images.length > 0) {
      await db.insert(schema.propertyImages).values(
        images.map((url, i) => ({
          propertyId: property.id,
          url,
          altText: `${property.name} - Photo ${i + 1}`,
          sortOrder: i,
          isPrimary: i === 0,
        }))
      );
    }

    // Room types + inventory
    let roomOffset = 0;
    for (const rt of roomTypes) {
      const rtSlug = slugify(rt.name);
      const [roomType] = await db
        .insert(schema.roomTypes)
        .values({
          propertyId: property.id,
          slug: rtSlug,
          ...rt,
        })
        .returning();

      // Generate 365 days of inventory starting today
      const today = new Date();
      const inventoryRows = [];
      const totalRooms = Math.floor(Math.random() * 8) + 3; // 3-10 rooms per type

      for (let d = 0; d < 365; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() + d);
        const dateStr = date.toISOString().split("T")[0];

        // Dynamic pricing: weekends +20%, holidays +40%, off-season -15%
        const dayOfWeek = date.getDay();
        const month = date.getMonth();
        let rateMultiplier = 1.0;
        if (dayOfWeek === 5 || dayOfWeek === 6) rateMultiplier = 1.2;
        if (month === 11 || month === 6 || month === 7) rateMultiplier *= 1.3;
        if (month === 1 || month === 2) rateMultiplier *= 0.85;

        // Random bookings (30-70% occupancy)
        const bookedRooms = Math.floor(
          Math.random() * totalRooms * 0.4 + totalRooms * 0.3
        );

        inventoryRows.push({
          roomTypeId: roomType.id,
          date: dateStr,
          totalRooms,
          bookedRooms: Math.min(bookedRooms, totalRooms),
          rate: (parseFloat(rt.baseRate) * rateMultiplier).toFixed(2),
          status: "available" as const,
        });
      }

      // Insert in batches of 100
      for (let i = 0; i < inventoryRows.length; i += 100) {
        await db
          .insert(schema.roomInventory)
          .values(inventoryRows.slice(i, i + 100));
      }

      // Create physical rooms
      const roomRows = [];
      for (let r = 1; r <= totalRooms; r++) {
        const floor = Math.floor(r / 3) + 1;
        roomRows.push({
          propertyId: property.id,
          roomTypeId: roomType.id,
          roomNumber: `${floor}${String(roomOffset + r).padStart(2, "0")}`,
          floor,
          status: "clean" as const,
          isAccessible: ("isAccessible" in rt ? rt.isAccessible : false) || r === 1,
        });
      }
      await db.insert(schema.rooms).values(roomRows);
      roomOffset += totalRooms;
    }
  }

  // 3. Create sample bookings
  console.log("Creating sample bookings...");
  const allProperties = await db
    .select()
    .from(schema.properties)
    .limit(5);

  const allRoomTypes = await db.select().from(schema.roomTypes);

  for (let i = 0; i < 15; i++) {
    const guest = guestUsers[i % guestUsers.length];
    const property = allProperties[i % allProperties.length];
    const propertyRoomTypes = allRoomTypes.filter(
      (rt) => rt.propertyId === property.id
    );
    const roomType =
      propertyRoomTypes[Math.floor(Math.random() * propertyRoomTypes.length)];

    const checkInOffset = Math.floor(Math.random() * 60) + 1;
    const stayLength = Math.floor(Math.random() * 5) + 1;
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + checkInOffset);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + stayLength);

    const nightlyRate = parseFloat(roomType.baseRate);
    const subtotal = nightlyRate * stayLength;
    const taxes = subtotal * 0.12;
    const total = subtotal + taxes;

    const confirmationNo = `BC-${String(100000 + i).slice(-6)}`;

    await db.insert(schema.bookings).values({
      confirmationNo,
      userId: guest.id,
      propertyId: property.id,
      roomTypeId: roomType.id,
      status: i < 3 ? "confirmed" : i < 5 ? "pending" : "confirmed",
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      adults: Math.floor(Math.random() * 2) + 1,
      children: Math.floor(Math.random() * 2),
      guestName: guest.name!,
      guestEmail: guest.email,
      guestPhone: "+1-555-" + String(Math.floor(Math.random() * 9000) + 1000),
      subtotal: subtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      total: total.toFixed(2),
      currency: "USD",
      cancellationPolicy: property.cancellationPolicy,
    });
  }
  console.log("  Created 15 sample bookings");

  // Past booking for sarah — required for write-review tests
  const sarah = guestUsers[0];
  const pastProperty = allProperties[0];
  const pastRoomTypes = allRoomTypes.filter((rt) => rt.propertyId === pastProperty.id);
  const pastRoomType = pastRoomTypes[0];
  const pastCheckIn = new Date();
  pastCheckIn.setDate(pastCheckIn.getDate() - 10);
  const pastCheckOut = new Date(pastCheckIn);
  pastCheckOut.setDate(pastCheckOut.getDate() + 3);
  const pastNightlyRate = parseFloat(pastRoomType.baseRate);
  const pastSubtotal = pastNightlyRate * 3;
  const pastTaxes = pastSubtotal * 0.12;

  await db.insert(schema.bookings).values({
    confirmationNo: "BC-PAST01",
    userId: sarah.id,
    propertyId: pastProperty.id,
    roomTypeId: pastRoomType.id,
    status: "checked_out",
    checkIn: pastCheckIn.toISOString().split("T")[0],
    checkOut: pastCheckOut.toISOString().split("T")[0],
    adults: 2,
    children: 0,
    guestName: sarah.name!,
    guestEmail: sarah.email,
    guestPhone: "+1-555-0100",
    subtotal: pastSubtotal.toFixed(2),
    taxes: pastTaxes.toFixed(2),
    total: (pastSubtotal + pastTaxes).toFixed(2),
    currency: "USD",
    cancellationPolicy: pastProperty.cancellationPolicy,
  });
  console.log("  Created past booking BC-PAST01 for sarah (checked_out)");

  // 4. Create sample reviews
  console.log("Creating sample reviews...");
  const allBookings = await db
    .select()
    .from(schema.bookings)
    .limit(8);

  const reviewTexts = [
    {
      title: "Absolutely stunning property",
      body: "From the moment we arrived, everything was perfect. The room was immaculate, staff was incredibly attentive, and the location couldn't be better. Will definitely return!",
      rating: 5,
    },
    {
      title: "Great stay, minor issues",
      body: "Overall a wonderful experience. The room was beautiful and the breakfast was excellent. Only downside was some noise from nearby construction, but staff provided earplugs promptly.",
      rating: 4,
    },
    {
      title: "Exceeded expectations",
      body: "The photos don't do this place justice. Upgraded us to a suite on arrival, the spa was world-class, and the restaurant deserves its Michelin star. A truly memorable stay.",
      rating: 5,
    },
    {
      title: "Comfortable and convenient",
      body: "Clean rooms, friendly staff, great location for sightseeing. The breakfast buffet had a nice variety. Room could use some updating but was perfectly comfortable.",
      rating: 4,
    },
    {
      title: "Good value for the price",
      body: "Solid hotel at a fair price point. Nothing fancy but everything works well. The bed was very comfortable and the shower had great water pressure.",
      rating: 3,
    },
    {
      title: "Wonderful boutique experience",
      body: "Such a charming property with real character. Each room is uniquely decorated and the attention to detail is impressive. The homemade pastries at breakfast were divine.",
      rating: 5,
    },
    {
      title: "Perfect for families",
      body: "Kids loved the pool and the kids club kept them entertained for hours. The family suite was spacious and well-equipped. Staff went above and beyond to make our children feel welcome.",
      rating: 5,
    },
    {
      title: "Decent but overpriced",
      body: "The location is unbeatable and the views are spectacular, but for the price I expected more. Room was smaller than advertised and some amenities were under maintenance during our stay.",
      rating: 3,
    },
  ];

  for (let i = 0; i < allBookings.length; i++) {
    const booking = allBookings[i];
    const review = reviewTexts[i % reviewTexts.length];
    await db.insert(schema.reviews).values({
      bookingId: booking.id,
      userId: booking.userId!,
      propertyId: booking.propertyId,
      rating: review.rating,
      title: review.title,
      body: review.body,
      helpfulCount: Math.floor(Math.random() * 25),
    });
  }
  console.log(`  Created ${allBookings.length} sample reviews`);

  // 5. Create sample conversations for sarah with a property host
  console.log("Creating sample conversations...");
  const conversationProperty = allProperties[0]; // The Grand Bunkly NYC

  const [conversation] = await db
    .insert(schema.conversations)
    .values({
      propertyId: conversationProperty.id,
      lastMessageAt: new Date(),
    })
    .returning();

  await db.insert(schema.conversationParticipants).values([
    {
      conversationId: conversation.id,
      userId: sarah.id,
      role: "guest",
      lastReadAt: new Date(),
    },
    {
      conversationId: conversation.id,
      userId: hostUser.id,
      role: "host",
      lastReadAt: new Date(),
    },
  ]);

  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const thirtyMinsAgo = new Date(now.getTime() - 30 * 60 * 1000);

  await db.insert(schema.messages).values([
    {
      conversationId: conversation.id,
      senderId: sarah.id,
      body: "Hi, I have a question about early check-in. Is it possible to check in at noon instead of 3pm?",
      messageType: "text",
      createdAt: twoHoursAgo,
    },
    {
      conversationId: conversation.id,
      senderId: hostUser.id,
      body: "Hi Sarah! We'll do our best to accommodate an early check-in. It depends on room availability that day. I'll check and get back to you by tomorrow morning.",
      messageType: "text",
      createdAt: oneHourAgo,
    },
    {
      conversationId: conversation.id,
      senderId: sarah.id,
      body: "Thank you! That would be amazing. Looking forward to my stay.",
      messageType: "text",
      createdAt: thirtyMinsAgo,
    },
  ]);

  console.log("  Created 1 conversation with 3 messages for sarah");

  console.log("\nSeed complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
