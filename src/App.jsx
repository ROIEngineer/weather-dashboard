import SearchBar from "./components/SearchBar";

export default function App() {

  function handleSearch(cityName) {
    console.log("User searched for:", cityName);
  }

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
