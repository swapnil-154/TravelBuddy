const mockWeatherData = {
  sunny: { condition: 'Sunny', icon: '☀️', humidity: 45, wind: 12 },
  cloudy: { condition: 'Partly Cloudy', icon: '⛅', humidity: 65, wind: 18 },
  rainy: { condition: 'Rainy', icon: '🌧️', humidity: 85, wind: 22 },
  snowy: { condition: 'Snowy', icon: '❄️', humidity: 70, wind: 15 },
  stormy: { condition: 'Thunderstorm', icon: '⛈️', humidity: 90, wind: 35 },
};

const conditions = Object.values(mockWeatherData);

exports.getWeather = async (destination) => {
  // Simulate API call with mock data
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = Math.floor(Math.random() * 30) + 10; // 10-40°C

  return {
    destination,
    temperature: {
      celsius: temp,
      fahrenheit: Math.round((temp * 9) / 5 + 32),
    },
    condition: randomCondition.condition,
    icon: randomCondition.icon,
    humidity: randomCondition.humidity,
    windSpeed: randomCondition.wind,
    forecast: Array.from({ length: 7 }, (_, i) => {
      const forecastCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const forecastTemp = Math.floor(Math.random() * 30) + 10;
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        high: forecastTemp + 3,
        low: forecastTemp - 3,
        condition: forecastCondition.condition,
        icon: forecastCondition.icon,
      };
    }),
    lastUpdated: new Date().toISOString(),
  };
};
