import type { DailyForecast } from "../types/weather";

interface ForecastListProps {
  forecast: DailyForecast[];
}

function formatDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}

export function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="grid w-full max-w-md grid-cols-5 gap-2">
      {forecast.map((day) => (
        <div
          key={day.date}
          className="flex flex-col items-center gap-1 rounded-xl bg-white/10 px-2 py-3 text-center text-white backdrop-blur-sm"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-white/70">
            {formatDay(day.date)}
          </p>
          <span className="text-2xl" role="img" aria-label={day.description}>
            {day.icon}
          </span>
          <p className="text-sm font-medium">{Math.round(day.tempMax)}°</p>
          <p className="text-xs text-white/60">{Math.round(day.tempMin)}°</p>
        </div>
      ))}
    </div>
  );
}
