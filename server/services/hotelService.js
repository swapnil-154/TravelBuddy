const hotelNames = [
  'The Grand Palace', 'Ocean View Resort', 'Mountain Retreat', 'City Center Hotel',
  'Sunset Inn', 'Royal Gardens', 'The Boutique Stay', 'Harbor Lights Hotel',
];
const amenitiesList = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Parking', 'Room Service'];
const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive Suite', 'Penthouse'];

// A curated set of Unsplash hotel images (stable, no source.unsplash.com)
const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c4fe0d0b?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
];

exports.searchHotels = async ({ destination, checkIn, checkOut, guests = 1, rooms = 1 }) => {
  const numResults = Math.floor(Math.random() * 6) + 4;
  const hotels = [];
  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      : 3;

  for (let i = 0; i < numResults; i++) {
    const name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const pricePerNight = Math.floor(Math.random() * 400) + 60;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const numAmenities = Math.floor(Math.random() * 5) + 3;
    const selectedAmenities = [...amenitiesList]
      .sort(() => 0.5 - Math.random())
      .slice(0, numAmenities);

    hotels.push({
      id: `HT${Date.now()}${i}`,
      name,
      destination,
      address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${destination}`,
      checkIn,
      checkOut,
      nights,
      guests: Number(guests),
      rooms: Number(rooms),
      roomType,
      pricePerNight,
      totalPrice: pricePerNight * nights * Number(rooms),
      currency: 'USD',
      rating: Number(rating),
      numReviews: Math.floor(Math.random() * 1000) + 50,
      amenities: selectedAmenities,
      image: hotelImages[i % hotelImages.length],
      stars: Math.floor(Math.random() * 3) + 3,
      freeBreakfast: Math.random() > 0.5,
      freeCancellation: Math.random() > 0.4,
      seatsAvailable: Math.floor(Math.random() * 10) + 1,
    });
  }

  return hotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
};
