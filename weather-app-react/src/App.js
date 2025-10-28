import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [cityid, lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const WeatherForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([CurrentWeatherFetch, WeatherForecastFetch])
      .then(async (responses) => {
        const currentWeatherData = await responses[0].json();
        const weatherForecastData = await responses[1].json();

        setCurrentWeather({ city: searchData.label, ...currentWeatherData });
        setForecast({ city: searchData.label, ...weatherForecastData });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };
  console.log("Current Weather Data:", currentWeather);
  console.log("Weather Forecast Data:", forecast);

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
