const BASE = "https://api.openweathermap.org/data/2.5/weather";
const KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

// Fetch weather by city
export async function fetchWeatherByCity(city, units = "metric") {
  if (!KEY) throw new Error("Missing OpenWeatherMap API key (VITE_OPENWEATHER_KEY)");

  const q = encodeURIComponent(city);
  const url = `${BASE}?q=${q}&units=${units}&appid=${KEY}`;

  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = body?.message || res.statusText || "Unknown error";
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return body;
}

// Fetch weather by coordinates
export async function fetchWeatherByCoords(lat, lon, units = "metric") {
  if (!KEY) throw new Error("Missing OpenWeatherMap API key");

  const url = `${BASE}?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`;
  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = body?.message || res.statusText;
    throw new Error(msg);
  }

  return body;
}

export async function fetchForecastByCity(city, units = "metric") {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}`;

  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body?.message || "Failed to fetch forecast");
  }

  return body;
}
