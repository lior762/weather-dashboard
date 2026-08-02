export interface CurrentWeather {
  cityName: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: DailyForecast[];
}
