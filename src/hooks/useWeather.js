import { useEffect, useState } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCity } from "../api/weather";

export default function useWeather() {
  const [city, setCity] = useState(
    localStorage.getItem("weather:city") || ""
  );
  const [coords, setCoords] = useState(null);
  const [units, setUnits] = useState(
    localStorage.getItem("weather:units") || "metric"
  );

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      if (!city && !coords) return;

      setStatus("loading");
      setError(null);

      try {
        let current;

        if (coords) {
          current = await fetchWeatherByCoords(coords.lat, coords.lon, units);
        } else {
          current = await fetchWeatherByCity(city, units);
        }

        setWeather(current);

        if (city) {
          const forecastData = await fetchForecastByCity(city, units);
          setForecast(forecastData.list);
        } else {
          setForecast([]);
        }

        setStatus("success");

        if (city) localStorage.setItem("weather:city", city);
        localStorage.setItem("weather:units", units);
      } catch (err) {
        setError(err.message || "Failed to fetch weather");
        setStatus("error");
      }
    }

    loadWeather();
  }, [city, coords, units]);

  function searchCity(newCity) {
    setCoords(null); // city takes priority
    setCity(newCity);
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setCity("");
      },
      () => setError("Location permission denied")
    );
  }

  return {
    weather,
    forecast,
    status,
    error,
    units,
    searchCity,
    setUnits,
    useLocation,
  };
}

