import "./forecast.css";


const Forecast = ({ data }) => {
  return (
    <div className="forecast">
      {data.list.map((item) => (
        <div key={item.dt} className="forecast-item">
          <p className="date">
            {new Date(item.dt * 1000).toLocaleDateString()}
          </p>
          <p className="temperature">{Math.round(item.main.temp)}°C</p>
          <p className="description">{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;