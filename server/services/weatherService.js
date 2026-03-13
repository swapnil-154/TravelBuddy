const axios = require('axios');

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

// Map WMO weather codes to human-readable conditions and icons
const weatherCodeMap = {
  0: { condition: 'Clear Sky', icon: '☀️' },
  1: { condition: 'Mainly Clear', icon: '🌤️' },
  2: { condition: 'Partly Cloudy', icon: '⛅' },
  3: { condition: 'Overcast', icon: '☁️' },
  45: { condition: 'Foggy', icon: '🌫️' },
  48: { condition: 'Depositing Rime Fog', icon: '🌫️' },
  51: { condition: 'Light Drizzle', icon: '🌦️' },
  53: { condition: 'Moderate Drizzle', icon: '🌦️' },
  55: { condition: 'Dense Drizzle', icon: '🌧️' },
  61: { condition: 'Slight Rain', icon: '🌦️' },
  63: { condition: 'Moderate Rain', icon: '🌧️' },
  65: { condition: 'Heavy Rain', icon: '🌧️' },
  71: { condition: 'Slight Snowfall', icon: '🌨️' },
  73: { condition: 'Moderate Snowfall', icon: '❄️' },
  75: { condition: 'Heavy Snowfall', icon: '❄️' },
  77: { condition: 'Snow Grains', icon: '❄️' },
  80: { condition: 'Slight Rain Showers', icon: '🌦️' },
  81: { condition: 'Moderate Rain Showers', icon: '🌧️' },
  82: { condition: 'Violent Rain Showers', icon: '🌧️' },
  85: { condition: 'Slight Snow Showers', icon: '🌨️' },
  86: { condition: 'Heavy Snow Showers', icon: '❄️' },
  95: { condition: 'Thunderstorm', icon: '⛈️' },
  96: { condition: 'Thunderstorm with Slight Hail', icon: '⛈️' },
  99: { condition: 'Thunderstorm with Heavy Hail', icon: '⛈️' },
};

const getWeatherInfo = (code) => {
  return weatherCodeMap[code] || { condition: 'Unknown', icon: '🌡️' };
};

exports.getWeather = async (destination) => {
  // Step 1: Geocode the destination name to get coordinates
  const geoResponse = await axios.get(GEOCODING_API, {
    params: { name: destination, count: 1, language: 'en' },
    timeout: 10000,
  });

  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    throw new Error(`Location "${destination}" not found`);
  }

  const { latitude, longitude, name } = geoResponse.data.results[0];

  // Step 2: Fetch current weather and 7-day forecast
  const weatherResponse = await axios.get(WEATHER_API, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: 7,
    },
    timeout: 10000,
  });

  const { current, daily } = weatherResponse.data;
  const currentWeather = getWeatherInfo(current.weather_code);
  const tempCelsius = Math.round(current.temperature_2m);

  return {
    destination: name,
    temperature: {
      celsius: tempCelsius,
      fahrenheit: Math.round((tempCelsius * 9) / 5 + 32),
    },
    condition: currentWeather.condition,
    icon: currentWeather.icon,
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    forecast: daily.time.map((dateStr, i) => {
      const forecastWeather = getWeatherInfo(daily.weather_code[i]);
      const date = new Date(dateStr);
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        high: Math.round(daily.temperature_2m_max[i]),
        low: Math.round(daily.temperature_2m_min[i]),
        condition: forecastWeather.condition,
        icon: forecastWeather.icon,
      };
    }),
    lastUpdated: new Date().toISOString(),
  };
};
