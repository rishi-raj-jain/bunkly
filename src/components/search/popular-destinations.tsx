import Link from "next/link";
import Image from "next/image";

const destinations = [
  {
    name: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    propertyCount: 42,
    slug: "new-york",
  },
  {
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    propertyCount: 38,
    slug: "paris",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    propertyCount: 29,
    slug: "tokyo",
  },
  {
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    propertyCount: 35,
    slug: "london",
  },
  {
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
    propertyCount: 24,
    slug: "barcelona",
  },
  {
    name: "Sydney",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop",
    propertyCount: 18,
    slug: "sydney",
  },
  {
    name: "Florence",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1541370545535-d9b199e398cf?w=600&h=400&fit=crop",
    propertyCount: 14,
    slug: "florence",
  },
  {
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    propertyCount: 11,
    slug: "kyoto",
  },
];

export function PopularDestinations() {
  return (
    <div data-testid="popular-destinations">
      <h2
        className="sr-only"
        data-testid="popular-destinations-title"
      >
        Where to next
      </h2>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/search?destination=${dest.slug}`}
            className="group block text-center"
            data-testid={`destination-card-${dest.slug}`}
          >
            <div className="relative h-56 overflow-hidden border border-brass-deep/40 sm:h-64">
              <Image
                src={dest.image}
                alt={`${dest.name}, ${dest.country}`}
                fill
                className="rosewood-photo-warm object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <h3
              className="mt-5 font-serif text-[26px]"
              style={{ fontWeight: 400 }}
            >
              {dest.name}
            </h3>
            <div
              className="mt-1 font-caslon text-[12px] italic uppercase text-brass-light"
              style={{ letterSpacing: "0.22em" }}
            >
              {dest.country}
            </div>
            <div className="mt-2 font-caslon text-[13px] italic text-body-inverted">
              {dest.propertyCount} houses &amp; residences
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
