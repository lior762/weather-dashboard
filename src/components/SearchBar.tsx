import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const city = value.trim();
    if (city) {
      onSearch(city);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a city..."
        className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 outline-none focus:border-white/50"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white/90 px-4 py-2 font-medium text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
