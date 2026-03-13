const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Destination = require('../models/Destination');
const User = require('../models/User');
const Blog = require('../models/Blog');

const connectDB = require('../config/db');

const destinations = [
  {
    name: 'Bali',
    country: 'Indonesia',
    description:
      'Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Immerse yourself in its lush jungles, terraced rice paddies, stunning temples, and world-class surf breaks. Experience the rich Balinese culture through traditional dances, temple ceremonies, and local cuisine.',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    ],
    coordinates: { lat: -8.3405, lng: 115.092 },
    popularActivities: ['Surfing', 'Temple Tours', 'Rice Terrace Trekking', 'Spa & Wellness', 'Cooking Classes'],
    averageCost: 1200,
    currency: 'USD',
    bestTimeToVisit: 'April to October',
    rating: 4.8,
    numReviews: 1250,
    climate: 'Tropical',
    category: 'beach',
    featured: true,
  },
  {
    name: 'Paris',
    country: 'France',
    description:
      'The City of Light captivates visitors with its iconic landmarks, world-class cuisine, and unparalleled art and culture. From the Eiffel Tower to the Louvre, Paris is a city that must be experienced at least once in a lifetime.',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    popularActivities: ['Eiffel Tower Visit', 'Louvre Museum', 'Seine River Cruise', 'Montmartre Walk', 'Fine Dining'],
    averageCost: 2500,
    currency: 'EUR',
    bestTimeToVisit: 'April to June, September to November',
    rating: 4.7,
    numReviews: 2100,
    climate: 'Temperate',
    category: 'city',
    featured: true,
  },
  {
    name: 'Santorini',
    country: 'Greece',
    description:
      'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its stunning views, the blue-domed churches, white-washed buildings, and beautiful sunsets over the Aegean Sea.',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800',
    ],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    popularActivities: ['Sunset Watching', 'Wine Tasting', 'Caldera Tour', 'Beach Hopping', 'Archaeological Sites'],
    averageCost: 2200,
    currency: 'EUR',
    bestTimeToVisit: 'April to November',
    rating: 4.9,
    numReviews: 890,
    climate: 'Mediterranean',
    category: 'beach',
    featured: true,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description:
      'Tokyo is Japan\'s busy capital, mixing the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. It offers an unparalleled blend of innovation, culture, cuisine, and entertainment.',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800',
    ],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    popularActivities: ['Temple Visits', 'Sushi Making', 'Anime Districts', 'Cherry Blossom Viewing', 'Tech Shopping'],
    averageCost: 2800,
    currency: 'JPY',
    bestTimeToVisit: 'March to May, September to November',
    rating: 4.8,
    numReviews: 1800,
    climate: 'Temperate',
    category: 'city',
    featured: true,
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    description:
      'The Maldives is a tropical nation in the Indian Ocean, composed of 26 ring-shaped atolls with over 1,000 coral islands. It\'s famous for its crystal-clear waters, overwater bungalows, and spectacular marine life.',
    images: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      'https://images.unsplash.com/photo-1581404917879-53e19259fdde?w=800',
    ],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    popularActivities: ['Snorkeling', 'Diving', 'Overwater Bungalow Stay', 'Dolphin Watching', 'Spa Treatments'],
    averageCost: 4500,
    currency: 'USD',
    bestTimeToVisit: 'November to April',
    rating: 4.9,
    numReviews: 650,
    climate: 'Tropical',
    category: 'beach',
    featured: true,
  },
  {
    name: 'New York City',
    country: 'USA',
    description:
      'New York City is the most populous city in the United States, home to iconic landmarks including the Statue of Liberty, Times Square, Central Park, and some of the world\'s greatest museums and cultural institutions.',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800',
    ],
    coordinates: { lat: 40.7128, lng: -74.006 },
    popularActivities: ['Times Square', 'Central Park', 'Broadway Shows', 'Museum of Modern Art', 'Statue of Liberty'],
    averageCost: 3500,
    currency: 'USD',
    bestTimeToVisit: 'April to June, September to November',
    rating: 4.6,
    numReviews: 3200,
    climate: 'Humid Continental',
    category: 'city',
    featured: false,
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    description:
      'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru. Built in the 15th century and later abandoned, it\'s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.',
    images: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800',
    ],
    coordinates: { lat: -13.1631, lng: -72.545 },
    popularActivities: ['Inca Trail Hike', 'Sun Gate Trek', 'Guided Tours', 'Photography', 'Llama Encounters'],
    averageCost: 1800,
    currency: 'USD',
    bestTimeToVisit: 'April to October',
    rating: 4.9,
    numReviews: 980,
    climate: 'Highland Tropical',
    category: 'adventure',
    featured: true,
  },
  {
    name: 'Safari in Serengeti',
    country: 'Tanzania',
    description:
      'The Serengeti National Park is home to the greatest wildlife spectacle on Earth — the Great Migration. Witness millions of wildebeest, zebras, and gazelles traverse the plains in an endless cycle of life.',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
    ],
    coordinates: { lat: -2.3333, lng: 34.8333 },
    popularActivities: ['Safari Game Drives', 'Hot Air Balloon', 'Great Migration', 'Bird Watching', 'Cultural Visits'],
    averageCost: 3800,
    currency: 'USD',
    bestTimeToVisit: 'June to October',
    rating: 4.8,
    numReviews: 420,
    climate: 'Tropical Savanna',
    category: 'wildlife',
    featured: true,
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    description:
      'The Swiss Alps offer breathtaking mountain scenery, world-class skiing, charming villages, and pristine alpine lakes. From the Matterhorn to Jungfraujoch, Switzerland\'s mountain landscape is unrivaled.',
    images: [
      'https://images.unsplash.com/photo-1531804056776-1be3e5da2361?w=800',
      'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    coordinates: { lat: 46.8182, lng: 8.2275 },
    popularActivities: ['Skiing', 'Hiking', 'Paragliding', 'Mountain Railways', 'Alpine Villages'],
    averageCost: 3200,
    currency: 'CHF',
    bestTimeToVisit: 'December to March (skiing), June to September (hiking)',
    rating: 4.8,
    numReviews: 760,
    climate: 'Alpine',
    category: 'mountain',
    featured: false,
  },
  {
    name: 'Angkor Wat',
    country: 'Cambodia',
    description:
      'Angkor Wat is a temple complex in Cambodia and the largest religious monument in the world. Built in the early 12th century, it is a stunning example of Khmer architecture and a UNESCO World Heritage Site.',
    images: [
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800',
      'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=800',
      'https://images.unsplash.com/photo-1569162823991-98df0c61be73?w=800',
    ],
    coordinates: { lat: 13.4125, lng: 103.867 },
    popularActivities: ['Sunrise Tours', 'Temple Exploration', 'Cycling', 'Cultural Shows', 'Local Food Tours'],
    averageCost: 900,
    currency: 'USD',
    bestTimeToVisit: 'November to March',
    rating: 4.7,
    numReviews: 550,
    climate: 'Tropical',
    category: 'cultural',
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Destination.deleteMany({});
    console.log('Cleared destinations');

    // Insert destinations
    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`Seeded ${createdDestinations.length} destinations`);

    // Create admin user from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@travelbuddy.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('Admin user created:', admin.email);

      // Create a sample blog post
      await Blog.create({
        author: admin._id,
        title: 'Top 10 Must-Visit Destinations in 2024',
        content: `
          Traveling opens our minds, broadens our perspectives, and creates memories that last a lifetime.
          In 2024, the world is full of incredible destinations waiting to be explored...

          ## 1. Bali, Indonesia
          Known as the Island of Gods, Bali continues to enchant travelers with its spiritual energy,
          stunning landscapes, and vibrant culture. From the sacred monkey forest to the terraced rice fields
          of Ubud, every corner of Bali tells a story.

          ## 2. Santorini, Greece
          With its iconic blue-domed churches and whitewashed buildings perched on volcanic cliffs,
          Santorini is one of the most photogenic destinations on Earth. The sunsets from Oia are legendary.

          ## 3. Tokyo, Japan
          A city of contrasts where ancient temples stand alongside futuristic skyscrapers. Tokyo's
          culinary scene is unmatched, with more Michelin stars than any other city in the world.

          Happy travels to all adventurers!
        `,
        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        destination: createdDestinations[0]._id,
        destinationName: 'Bali',
        tags: ['travel', 'destinations', '2024', 'adventure'],
        published: true,
        readTime: 8,
      });
      console.log('Sample blog post created');
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin login: Use ADMIN_EMAIL and ADMIN_PASSWORD from your .env file');

    const agentEmail = process.env.AGENT_EMAIL || 'agent@travelbuddy.com';
    const agentPassword = process.env.AGENT_PASSWORD || 'Agent@123';
    const agentExists = await User.findOne({ email: agentEmail });
    if (!agentExists) {
      const agent = await User.create({
        name: 'Agent User',
        email: agentEmail,
        password: agentPassword,
        role: 'agent',
      });
      console.log('Agent user created:', agent.email);
    }
    console.log('Agent login: Use AGENT_EMAIL and AGENT_PASSWORD from your .env file');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
