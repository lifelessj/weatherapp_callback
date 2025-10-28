import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="current-weather">
        <div className="weather-info">
          <h2 className="city">{data.city}</h2>
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
        <img
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
        />
      </div>
      <div className="weather-details">
        <div className="weather-humidity">
          <span className="humidity">Humidity: {data.main.humidity}%</span>
        </div>
        <div className="weather-pressure">
          <span className="pressure">Pressure: {data.main.pressure} hPa</span>
        </div>
        <div className="weather-wind-speed">
          <span className="wind-speed">Wind Speed: {data.wind.speed} m/s</span>
        </div>
        <div className="weather-description">
          <span className="label">
            Its a {data.weather[0].description} weather
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
