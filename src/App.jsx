import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import useWeather from "./hooks/useWeather";

export default function App() {
  const {
    weather,
    forecast,
    status,
    error,
    units,
    searchCity,
    setUnits,
    useLocation,
  } = useWeather();

  function getDailyForecast(list) {
    const days = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!days[date]) {
        days[date] = item;
      }
    });

    return Object.values(days).slice(0, 5);
  }

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <h1>Weather App</h1>
          <UnitToggle units={units} onChange={setUnits} />
        </div>

        <SearchBar onSearch={searchCity} />

        <button onClick={useLocation}>Use my location</button>

        {status === "loading" && <p>Loading…</p>}
        {status === "error" && <p role="alert" style={{color:"crimson"}}>Error: {error}</p>}

        {status === "success" && weather && (
          <div className="weather">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <div>
              <div className="temp">
                {Math.round(weather.main.temp)}
                {units === "metric" ? "°C" : "°F"}
              </div>
              <div className="desc">{weather.weather[0].description}</div>
            </div>
          </div>
        )}

        {forecast.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>5-Day Forecast</h3>

            <div style={{ display: "flex", gap: 12 }}>
              {getDailyForecast(forecast).map((day) => (
                <div key={day.dt} style={{ textAlign: "center" }}>
                  <div>
                    {new Date(day.dt_txt).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>

                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />

                  <div>
                    {Math.round(day.main.temp)}
                    {units === "metric" ? "°C" : "°F"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

