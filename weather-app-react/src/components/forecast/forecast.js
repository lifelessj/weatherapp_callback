import "./forecast.css";

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Group forecast data by day
  const groupByDay = () => {
    const days = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!days[date]) {
        days[date] = {
          date: item.dt,
          temps: [],
          humidity: [],
          pressure: [],
          wind: [],
          weather: item.weather[0],
          pop: item.pop || 0,
          rain: 0,
          snow: 0,
        };
      }

      days[date].temps.push(item.main.temp);
      days[date].humidity.push(item.main.humidity);
      days[date].pressure.push(item.main.pressure);
      days[date].wind.push(item.wind.speed);
      days[date].pop = Math.max(days[date].pop, item.pop || 0);

      if (item.rain && item.rain["3h"]) {
        days[date].rain += item.rain["3h"];
      }
      if (item.snow && item.snow["3h"]) {
        days[date].snow += item.snow["3h"];
      }
    });

    return Object.values(days).slice(0, 5); // 5-day forecast
  };

  const dailyData = groupByDay();

  const fmtDate = (unixSec) => {
    const d = new Date(unixSec * 1000);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <section className="forecast">
      <h3 className="forecast-title">
        {data.city?.name || data.city} Forecast
      </h3>
      <div className="forecast-grid">
        {dailyData.map((day, index) => (
          <article
            key={day.date}
            className="forecast-card"
            aria-labelledby={`day-${day.date}`}
          >
            <header className="forecast-card-header">
              <div>
                <p id={`day-${day.date}`} className="date">
                  {fmtDate(day.date)}
                </p>
              </div>
              <img
                src={`icons/${day.weather.icon}.png`}
                alt={day.weather.description}
                className="forecast-icon"
              />
            </header>

            <p className="description">{day.weather.description}</p>

            <div className="temps">
              <div className="temp-avg">
                Avg: {Math.round(avg(day.temps))}°C
              </div>
            </div>

            <div className="minmax">
              <span className="temp-max">
                High: {Math.round(Math.max(...day.temps))}°C
              </span>
              <span className="temp-min">
                Low: {Math.round(Math.min(...day.temps))}°C
              </span>
            </div>

            <div className="details">
              <div>Humidity: {Math.round(avg(day.humidity))}%</div>
              <div>Pressure: {Math.round(avg(day.pressure))} hPa</div>
              <div>Wind: {avg(day.wind).toFixed(1)} m/s</div>
              <div>Rain Chance: {Math.round(day.pop * 100)}%</div>
              {day.rain > 0 && <div>Rain: {day.rain.toFixed(1)} mm</div>}
              {day.snow > 0 && <div>Snow: {day.snow.toFixed(1)} mm</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
