import type { CurrentWeather } from "../types/weather";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

interface GeocodingResponse {
  results?: {
    name: string;
    country_code: string;
    latitude: number;
    longitude: number;
  }[];
}

interface ForecastResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: "clear sky", icon: "☀️" },
  1: { description: "mainly clear", icon: "🌤️" },
  2: { description: "partly cloudy", icon: "⛅" },
  3: { description: "overcast", icon: "☁️" },
  45: { description: "fog", icon: "🌫️" },
  48: { description: "depositing rime fog", icon: "🌫️" },
  51: { description: "light drizzle", icon: "🌦️" },
  53: { description: "moderate drizzle", icon: "🌦️" },
  55: { description: "dense drizzle", icon: "🌧️" },
  56: { description: "light freezing drizzle", icon: "🌧️" },
  57: { description: "dense freezing drizzle", icon: "🌧️" },
  61: { description: "slight rain", icon: "🌦️" },
  63: { description: "moderate rain", icon: "🌧️" },
  65: { description: "heavy rain", icon: "🌧️" },
  66: { description: "light freezing rain", icon: "🌧️" },
  67: { description: "heavy freezing rain", icon: "🌧️" },
  71: { description: "slight snow fall", icon: "🌨️" },
  73: { description: "moderate snow fall", icon: "🌨️" },
  75: { description: "heavy snow fall", icon: "❄️" },
  77: { description: "snow grains", icon: "❄️" },
  80: { description: "slight rain showers", icon: "🌦️" },
  81: { description: "moderate rain showers", icon: "🌧️" },
  82: { description: "violent rain showers", icon: "⛈️" },
  85: { description: "slight snow showers", icon: "🌨️" },
  86: { description: "heavy snow showers", icon: "❄️" },
  95: { description: "thunderstorm", icon: "⛈️" },
  96: { description: "thunderstorm with slight hail", icon: "⛈️" },
  99: { description: "thunderstorm with heavy hail", icon: "⛈️" },
};

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const geoUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Failed to look up the city. Please try again.");
  }

  const geoData: GeocodingResponse = await geoResponse.json();
  const location = geoData.results?.[0];

  if (!location) {
    throw new Error(`No results found for "${city}".`);
  }

  const forecastUrl =
    `${FORECAST_URL}?latitude=${location.latitude}&longitude=${location.longitude}` +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code" +
    "&daily=temperature_2m_max,temperature_2m_min" +
    "&timezone=auto";
  const forecastResponse = await fetch(forecastUrl);

  if (!forecastResponse.ok) {
    throw new Error("Failed to fetch weather data. Please try again.");
  }

  const data: ForecastResponse = await forecastResponse.json();
  const weatherInfo = WEATHER_CODES[data.current.weather_code] ?? {
    description: "unknown",
    icon: "🌡️",
  };

  return {
    cityName: location.name,
    country: location.country_code,
    temp: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    tempMin: data.daily.temperature_2m_min[0],
    tempMax: data.daily.temperature_2m_max[0],
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    description: weatherInfo.description,
    icon: weatherInfo.icon,
  };
}
