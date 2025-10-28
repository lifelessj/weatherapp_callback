import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function App() {
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch('${WEATHER_API_URL}/weather?lat=${lat}');
    
  };

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather
        data={{ city: "London", temperature: 15, description: "Sunny" }}
      />
    </div>
  );
}

export default App;
