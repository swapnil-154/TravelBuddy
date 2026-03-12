const airlines = ['SkyWings', 'AirGlobe', 'StarFlight', 'BlueSky Airlines', 'Pacific Air'];
const classes = ['Economy', 'Business', 'First'];

exports.searchFlights = async ({ from, to, date, passengers = 1, cabinClass = 'Economy' }) => {
  const numResults = Math.floor(Math.random() * 5) + 3;
  const flights = [];

  for (let i = 0; i < numResults; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightClass = cabinClass || classes[Math.floor(Math.random() * classes.length)];
    const basePrice = Math.floor(Math.random() * 800) + 200;
    const multiplier = flightClass === 'First' ? 4 : flightClass === 'Business' ? 2.5 : 1;
    const price = Math.round(basePrice * multiplier);
    const departureHour = Math.floor(Math.random() * 20) + 4;
    const durationHours = Math.floor(Math.random() * 10) + 2;

    flights.push({
      id: `FL${Date.now()}${i}`,
      airline,
      flightNumber: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
      from,
      to,
      departureTime: `${String(departureHour).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
      arrivalTime: `${String((departureHour + durationHours) % 24).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
      duration: `${durationHours}h ${Math.random() > 0.5 ? '30' : '00'}m`,
      date,
      class: flightClass,
      passengers: Number(passengers),
      price,
      totalPrice: price * Number(passengers),
      currency: 'USD',
      stops: Math.random() > 0.6 ? 0 : 1,
      seatsAvailable: Math.floor(Math.random() * 50) + 5,
      baggage: flightClass === 'Economy' ? '23kg' : '32kg',
      meal: flightClass !== 'Economy',
    });
  }

  return flights.sort((a, b) => a.price - b.price);
};
