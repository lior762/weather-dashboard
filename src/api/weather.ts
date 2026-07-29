import type { CurrentWeather } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

interface OpenWeatherResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number };
  weather: { description: string; icon: string }[];
}

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  if (!API_KEY) {
    throw new Error(
      "Missing OpenWeatherMap API key. Add VITE_OPENWEATHER_API_KEY to your .env file.",
    );
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No results found for "${city}".`);
    }
    if (response.status === 401) {
      throw new Error("Invalid API key. Check your VITE_OPENWEATHER_API_KEY.");
    }
    throw new Error("Failed to fetch weather data. Please try again.");
  }

  const data: OpenWeatherResponse = await response.json();

  return {
    cityName: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0]?.description ?? "",
    icon: data.weather[0]?.icon ?? "01d",
  };
}
