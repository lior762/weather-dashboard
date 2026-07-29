import type { CurrentWeather } from "../types/weather";

interface WeatherCardProps {
  weather: CurrentWeather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-6 text-white backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {weather.cityName}, {weather.country}
          </h2>
          <p className="capitalize text-white/70">{weather.description}</p>
        </div>
        <span className="-my-4 text-7xl" role="img" aria-label={weather.description}>
          {weather.icon}
        </span>
      </div>

      <p className="mt-2 text-6xl font-bold">{Math.round(weather.temp)}°C</p>
      <p className="text-white/70">Feels like {Math.round(weather.feelsLike)}°C</p>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Min / Max</p>
          <p className="mt-1 font-medium">
            {Math.round(weather.tempMin)}° / {Math.round(weather.tempMax)}°
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Humidity</p>
          <p className="mt-1 font-medium">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Wind</p>
          <p className="mt-1 font-medium">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}
