import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="current-weather">
        <div className="weather-info">
          <h2 className="city">{data.city}</h2>
          <p className="temperature">{data.temperature}°C</p>
          <p className="description">{data.description}</p>
        </div>
        <img
          className="weather-icon"
          src="icons/01d.png"
          alt={data.description}
        />
      </div>
      <div className="weather-details">
        <p className="humidity">Humidity: {data.humidity}%</p>
        <p className="wind-speed">Wind Speed: {data.windSpeed} m/s</p>
        <div>
            <span className="label">Its a {data.description} weather</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
