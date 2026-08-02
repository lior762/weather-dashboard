import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastList } from "./components/ForecastList";
import { fetchWeather } from "./api/weather";
import type { WeatherData } from "./types/weather";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(city: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-br from-sky-500 to-indigo-700 px-4 py-16">
      <h1 className="text-4xl font-bold text-white">Weather Dashboard</h1>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <p className="w-full max-w-md rounded-lg bg-red-500/20 px-4 py-3 text-center text-white">
          {error}
        </p>
      )}

      {!error && !weather && !loading && (
        <p className="text-white/70">Search for a city to see the current weather.</p>
      )}

      {weather && (
        <>
          <WeatherCard weather={weather.current} />
          <ForecastList forecast={weather.forecast} />
        </>
      )}
    </div>
  );
}

export default App;
